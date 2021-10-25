import { getCapacityLabel } from "../util/snippet";
import { FileMeta } from "./FileMeta";
import { getCurTime } from "../util/TimeUtil";


export class FileSenderProps {
    sessionId: string;
    meta: FileMeta;
    fileSendingPanel: HTMLElement; //attach new progress item here
    fileElement: HTMLInputElement; //file source <input type="file">
    addChatItem: (id: string, username: string, message: string, isPrivate: boolean) => {};
    onError: (filename: string, message: string) => {};
    onFinished: (filename: string, message: string) => {}
    sendFileMeta: (meta: FileMeta) => {};
    sendFileData: (sessionId: string, data:ArrayBuffer) => {};
}

export class FileSender {
    props: FileSenderProps;

    //const
    file: File;
    sendingElement: JQuery;
    downloadElement: JQuery;
    sendBuf: ArrayBuffer[] = [];

    constructor(props:FileSenderProps) {
        this.props = props;
    }

    async sendFile() {
        if (this.props.fileElement.files.length <= 0) {
            //this.props.onError("No file", "Please select a file to share");
            return;
        }
        const file = this.props.fileElement.files[0];
        if (file.size <= 0) {
            this.props.onError(file.name, `You choosed empty file`);
            return;
        }

        this.file = file;

        //create ui
        const sendingId = `sending-${this.props.sessionId}`;
        
        const html = `
            <div class="file-progress" id="${sendingId}">
                <div class="fileinfo">
                    ${file.name}(${getCapacityLabel(file.size)})
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>`;
            

        
        $(this.props.fileSendingPanel).append(html);

        this.sendingElement = $("#" + sendingId);
        const $progressElem = this.sendingElement.find(".progress-bar");

        this.props.sendFileMeta({
            name: file.name,
            type: file.type,
            size: file.size,
            sessionId: this.props.sessionId
        });

        const chunkSize = 16384;
        const fileReader = new FileReader();

        let offset = 0;
        fileReader.addEventListener('error', error => {
            this.removeSelf();
            this.props.onError(file.name, "Error happened while reading ");
        });
        fileReader.addEventListener('abort', event => {
            this.removeSelf();
            this.props.onError(file.name, `Reading was aborted`);
        });

        const readSlice = (o:number) => {
            const slice = file.slice(offset, o + chunkSize);
            fileReader.readAsArrayBuffer(slice);
        };

        fileReader.addEventListener('load', e => {
            const blob = e.target.result as ArrayBuffer;
            this.props.sendFileData(this.props.sessionId, blob);
            offset += blob.byteLength;

            //update progress
            const percent = Math.floor((offset * 100) / file.size);
            $progressElem.attr("aria-valuenow", percent);
            $progressElem.css("width", percent + "%");

            if (offset < file.size) {
                setTimeout(_ => {
                    readSlice(offset);
                }, 100);
                //readSlice(offset);
                
            } else {
                this.removeSelf();
                //this.props.onFinished(file.name, `Sending finished`);
                const time = getCurTime();

                var binary = '';
                var bytes = new Uint8Array(blob);
                var len = bytes.byteLength;
                
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                const sender = new Blob(Array.from(binary));
                
                const html = `
                    <div class="chat-message-group local">
                        <div class="chatmessage-wrapper">
                            <div class="chatmessage" >
                                <div class="replywrapper">
                                    <div class="messagecontent">
                                        <div class="fileinfo">
                                            <a href = "${ URL.createObjectURL(sender)}" download = "${this.file.name}" > ${ this.file.name} (${getCapacityLabel(this.file.size) }) </a>
                                        </div>
                                    </div>
                                </div>
                             </div >
                             <div class="timestamp" >${time}</div>
                        </div>
                    </div>
                `;
                
                $("#chatconversation").append(html);
            }
        });

        readSlice(0);
    }

    removeSelf() {
        this.sendingElement.remove();
    }
}