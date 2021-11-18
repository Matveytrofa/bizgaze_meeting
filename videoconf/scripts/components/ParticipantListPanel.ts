import { avatarName, random } from "../util/snippet";
import { VectorIcon } from "./vector_icon";


class ParticipantItemProps {
    jitsiId: string;
    name: string;
    me: boolean;
    isMicDisable: boolean;
    isHostForPermission: boolean;
    isControl: boolean;
    isSetHost: boolean;
    isVideoDisable: boolean;
    muteCamera: boolean;
    muteMic: boolean;
    onMuteCamera: (jitsiId: string, use:boolean, isHost:boolean) => {};
    onMuteMic: (jitsiId: string, use: boolean, isHost: boolean) => {};
    onMuteAll: () => {};
    givePermissionMic: (jitsiId: string, isGivePermission: boolean) => {};
    givePermissionCamera: (jitsiId: string, isGivePermission: boolean) => {};
    setHostControlMic: (jitsiId: string, isSetHostControlMic: boolean) => {};
    setHostControlCamera: (jitsiId: string, isSetHostControlCamera: boolean) => {};
}

class ParticipantItem {
    rootElement: HTMLElement;
    avatarElement: HTMLElement;
    avatarTextElement: SVGTextElement;
    nameElement: HTMLElement;
    cameraButtonElement: HTMLElement;
    micButtonElement: HTMLElement;
    micForHostElement: HTMLElement;
    cameraForHostElement: HTMLElement;
    cameraIconElement: SVGPathElement;
    micIconElement: SVGPathElement;
    micIconForHostElement: SVGPathElement;
    cameraIconForHostElement: SVGPathElement;

    //state
    muteCamera: boolean;
    muteMic: boolean;
    isHost: boolean;
    isPermissionMic: boolean;
    isPermissionCamera: boolean;
    isSetHostControlMic: boolean;
    isSetHostControlCamera: boolean;

    //props
    props: ParticipantItemProps;

    constructor(props: ParticipantItemProps) {
        this.props = props;
        this.muteCamera = this.props.muteCamera;
        this.muteMic = this.props.muteMic;
        this.init();
    }

    init() {
        var body = '';
        if (! this.props.isMicDisable) {
            body = `
                <div class="jitsi-participant">
                    <div class="participant-avatar">
                        <div class="avatar  userAvatar w-40px h-40px" style="background-color: rgba(234, 255, 128, 0.4);">
                            <svg class="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <text dominant-baseline="central" fill="rgba(255,255,255,.6)" font-size="40pt" text-anchor="middle" x="50" y="50">?</text>
                            </svg>
                        </div>
                    </div>
                    <div class="participant-content">
                        <span class="name" class="fs-2 fw-bolder">?</span>
                        <span class="spacer"></span>
                        <div class="jitsi-icon camera-toggle-button">
                            <svg id="camera-disabled" width="20" height="20" viewBox="0 0 20 20">
                                <path d=""></path>
                            </svg>
                        </div>
                        <div class="jitsi-icon mic-toggle-button">
                            <svg id="mic-disabled" width="20" height="20" viewBox="0 0 20 20">
                                <path d=""></path>
                            </svg>
                        </div>
                    </div>
                </div>
            `;
        }
        else {
            body = `
                <div class="jitsi-participant">
                    <div class="participant-avatar">
                        <div class="avatar  userAvatar w-40px h-40px" style="background-color: rgba(234, 255, 128, 0.4);">
                            <svg class="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <text dominant-baseline="central" fill="rgba(255,255,255,.6)" font-size="40pt" text-anchor="middle" x="50" y="50">?</text>
                            </svg>
                        </div>
                    </div>
                    <div class="participant-content">
                        <span class="name" class="fs-2 fw-bolder">?</span>
                        <span class="spacer"></span>
                        <div class="jitsi-icon camera-toggle-button" style="pointer-events: none; opacity: 30%;">
                            <svg id="camera-disabled" width="20" height="20" viewBox="0 0 20 20">
                                <path d=""></path>
                            </svg>
                        </div>
                        <div class="jitsi-icon mic-toggle-button" style="pointer-events: none; opacity: 30%;">
                            <svg id="mic-disabled" width="20" height="20" viewBox="0 0 20 20">
                                <path d=""></path>
                            </svg>
                        </div>
                    </div>
                </div>
            `;
        }

        if (this.props.me && this.props.isControl && this.props.isSetHost) {
            body = `
                <div class="jitsi-participant">
                    <div class="participant-avatar">
                        <div class="avatar  userAvatar w-40px h-40px" style="background-color: rgba(234, 255, 128, 0.4);">
                            <svg class="avatar-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <text dominant-baseline="central" fill="rgba(255,255,255,.6)" font-size="40pt" text-anchor="middle" x="50" y="50">?</text>
                            </svg>
                        </div>
                    </div>
                    <div class="participant-content">
                        <span class="name" class="fs-2 fw-bolder">?</span>
                        <span class="spacer"></span>
                        <div class="jitsi-icon camera-toggle-button cameraowner">
                            <svg id="camera-disabled" width="20" height="20" viewBox="0 0 20 20">
                                <path d=""></path>
                            </svg>
                        </div>
                        <div class="jitsi-icon mic-toggle-button micowner">
                            <svg id="mic-disabled" width="20" height="20" viewBox="0 0 20 20">
                                <path d=""></path>
                            </svg>
                        </div>
                    </div>
                </div>
            `;
        }
        
        const $root = $(body);
        this.rootElement = $root[0];

        this.avatarElement = $root.find(".avatar")[0];
        this.avatarTextElement = $(this.avatarElement).find("text")[0];
        this.nameElement = $root.find(".name")[0];
        this.cameraButtonElement = $root.find(".camera-toggle-button")[0];
        this.micButtonElement = $root.find(".mic-toggle-button")[0];
        this.micForHostElement = $root.find(".micowner")[0];
        this.cameraForHostElement = $root.find(".cameraowner")[0];
        this.cameraIconElement = $(this.cameraButtonElement).find("path")[0];
        this.micIconElement = $(this.micButtonElement).find("path")[0];
        this.micIconForHostElement = $(this.micForHostElement).find("path")[0];
        this.cameraIconForHostElement = $(this.cameraForHostElement).find("path")[0];

        //avatar
        this.avatarTextElement.innerHTML = avatarName(this.props.name);
        const avatarColors = [
            "rgba(234, 255, 128, 0.4)",
            "rgba(114, 91, 60, 1.0)",
            "rgba(63, 65, 113, 1.0)",
            "rgba(56, 105, 91, 1.0)"];
        $(this.avatarElement).css(
            "background-color",
            avatarColors[random(0, avatarColors.length)]);

        //name
        if (this.props.me)
            $(this.nameElement).html(this.props.name + " (Me)");
        else 
            $(this.nameElement).html(this.props.name);

        //icon
        this.updateCameraIcon();
        this.updateMicIcon();

        $(this.cameraButtonElement).on('click', _ => {
            this.onToggleCamera();
        });
        $(this.micButtonElement).on('click', _ => {
            this.onToggleMic();
        });
        
    }

    element(): HTMLElement {
        return this.rootElement;
    }

    removeSelf() {
        $(this.rootElement).remove();
    }

    onToggleCamera() {
        if (this.props.isControl) {
            if (this.isHost && !this.props.me) {
                //alert("2");
                this.muteCamera = !this.muteCamera;
                this.updateCameraIcon();
                this.isPermissionCamera = !this.isPermissionCamera;
                this.props.givePermissionCamera(this.props.jitsiId, this.isPermissionCamera);
            }
            else {
                if (this.props.me && this.props.isSetHost) {
                    this.isSetHostControlCamera = true;
                    this.props.setHostControlCamera(this.props.jitsiId, true);
                }
                else {
                    this.isSetHostControlCamera = false;
                    this.props.setHostControlCamera(this.props.jitsiId, false);
                }

                this.props.onMuteCamera(this.props.jitsiId, !this.muteCamera, this.isHost);
            }
        }
        else {
            this.props.onMuteCamera(this.props.jitsiId, !this.muteCamera, this.isHost);
        }
    }

    onToggleMic() {
        if (this.props.isControl) {
            if (this.isHost && !this.props.me) {
                this.muteMic = !this.muteMic;
                this.updateMicIcon();
                this.isPermissionMic = !this.isPermissionMic;
                this.props.givePermissionMic(this.props.jitsiId, this.isPermissionMic);
            }
            else {
                if (this.props.me && this.props.isSetHost) {
                    this.isSetHostControlMic = true;
                    this.props.setHostControlMic(this.props.jitsiId, true);
                }
                else {
                    this.isSetHostControlMic = false;
                    this.props.setHostControlMic(this.props.jitsiId, false);
                }

                this.props.onMuteMic(this.props.jitsiId, !this.muteMic, this.isHost);
            }
        }
        else {
            //if (!this.isHost)
            //    return;
            this.props.onMuteMic(this.props.jitsiId, !this.muteMic, this.isHost);
        }
    }
    
    blockMic() {
        if (!this.muteMic)
            this.onToggleMic();
    }

    setMuteAudio(use: boolean) {
        this.muteMic = use;
        this.updateMicIcon();
    }

    setMuteVideo(use: boolean) {
        this.muteCamera = use;
        this.updateCameraIcon();
    }

    setRole(isHost: boolean) {
        this.isHost = isHost;
    }

    setPermissionMic(permisssion: boolean) {
        this.isPermissionMic = permisssion;
    }

    setPermissionCamera(permisssion: boolean) {
        this.isPermissionCamera = permisssion;
    }

    updateCameraIcon() {
        if (this.props.isHostForPermission && this.props.isControl && !this.props.me) {
            const icon = VectorIcon.VIDEO_UNMUTE_ICON;
            $(this.cameraIconElement).attr("d", icon);

            const color = this.muteCamera ? "#eb1717a6" : "#09eb1a78";
            $(this.cameraButtonElement).css("background-color", color);
            $(this.cameraButtonElement).css("border-radius", "20%");
        }
        else {
            const icon = this.muteCamera ? VectorIcon.VIDEO_MUTE_ICON : VectorIcon.VIDEO_UNMUTE_ICON;
            $(this.cameraIconElement).attr("d", icon);
        }
    }

    updateMicIcon() {
        if (this.props.isHostForPermission && this.props.isControl && ! this.props.me) {
            const icon = VectorIcon.AUDIO_UNMUTE_ICON;
            $(this.micIconElement).attr("d", icon);

            const color = this.muteMic ? "#eb1717a6" : "#09eb1a78";
            $(this.micButtonElement).css("background-color", color);
            $(this.micButtonElement).css("border-radius", "20%");
        }
        else {
            const icon = this.muteMic ? VectorIcon.AUDIO_MUTE_ICON : VectorIcon.AUDIO_UNMUTE_ICON;
            $(this.micIconElement).attr("d", icon);
        }
    }

    updateMicIconForHost() {
        const icon = this.muteMic ? VectorIcon.AUDIO_MUTE_ICON : VectorIcon.AUDIO_UNMUTE_ICON;
        $(this.micIconForHostElement).attr("d", icon);
    }

    updateCameraIconForHost() {
        const icon = this.muteCamera ? VectorIcon.VIDEO_MUTE_ICON : VectorIcon.VIDEO_UNMUTE_ICON;
        $(this.cameraIconForHostElement).attr("d", icon);
    }

}

export class ParticipantListPanelProps {
    onMuteCamera: (jitsiId: string, use: boolean, isHost:boolean) => {};
    onMuteMic: (jitsiId: string, use: boolean, isHost: boolean) => {};
    onMuteAll: () => {};
    givePermissionMic: (jitsiId: string, isGivePermission: boolean) => {};
    givePermissionCamera: (jitsiId: string, isGivePermission: boolean) => {};
    setHostControlMic: (jitsiId: string, isSetHostControlMic: boolean) => {};
    setHostControlCamera: (jitsiId: string, isSetHostControlCamera: boolean) => {};
    toggleCopyJoiningInfo: () => void;
}

export class ParticipantListWidget {
    rootElement: HTMLElement;
    participantCountElement: HTMLElement;
    participantListElement: HTMLElement;
    muteAllButtonElement: HTMLElement;
    toggleCopyJoiningInfoElement: HTMLElement;
    joiningInfoElement: HTMLElement;

    //states
    participantItemMap: Map<string, ParticipantItem> = new Map();
    isHost: boolean = false;
    isSetHostControlMic: boolean = false;
    isSetHostControlCamera: boolean = false;
    isSetHostControlSelfMic: boolean = false;
    isSetHostControlSelfCamera: boolean = false;
    isPermissionMic: boolean = false;
    isPermissionCamera: boolean = false;
    isControl: boolean;
    isSetHost: boolean;
    //props
    props: ParticipantListPanelProps;

    constructor() {
        this.rootElement = document.getElementById("participants-list");
        const $root = $(this.rootElement);
        this.participantCountElement = $root.find("#participant-count")[0];
        this.participantListElement = $root.find("#participants-list-body")[0];
        this.muteAllButtonElement = $root.find("#participants-list-footer>.btn")[0];
        this.toggleCopyJoiningInfoElement = document.querySelector("#copy-joining-info");
        this.joiningInfoElement = document.querySelector("#joining-info");
    }

    init(props: ParticipantListPanelProps) {
        this.props = props;
        this.updateParticipantCount();
        this.attachHandlers();
    }

    attachHandlers() {
        $(this.muteAllButtonElement).on('click', () => {
            /*
            if (this.isHost)
            this.participantItemMap.forEach((participantItem, key) => {
                participantItem.blockMic();
            });
            */
            /*
            if (this.isControl)
                this.props.onMuteAll();
            else {
                if (this.isHost)
                    this.participantItemMap.forEach((participantItem, key) => {
                            participantItem.blockMic();
                    });
            }
            */
            this.props.onMuteAll();
        });
        $(this.toggleCopyJoiningInfoElement).on('click', _ => {
            this.props.toggleCopyJoiningInfo();
        });
    }

    addParticipant(jitsiId: string, name: string, me: boolean, isMicDisable: boolean, isVideoDiable: boolean, muteCamera: boolean, muteMic: boolean) {
        if (this.participantItemMap.has(jitsiId)) {
            this.removeParticipant(jitsiId);
        }

        let props = new ParticipantItemProps();
        props.jitsiId = jitsiId;
        props.name = name;
        props.me = me;
        props.isMicDisable = isMicDisable;
        props.isHostForPermission = this.isHost;
        props.isControl = this.isControl;
        props.isSetHost = this.isSetHost;
        props.isVideoDisable = isVideoDiable;
        props.muteCamera = muteCamera;
        props.muteMic = muteMic;
        props.onMuteCamera = this.props.onMuteCamera;
        props.onMuteMic = this.props.onMuteMic;
        props.onMuteAll = this.props.onMuteAll;
        props.givePermissionMic = this.props.givePermissionMic;
        props.givePermissionCamera = this.props.givePermissionCamera;
        props.setHostControlMic = this.props.setHostControlMic;
        props.setHostControlCamera = this.props.setHostControlCamera;

        const item = new ParticipantItem(props);
        item.setRole(this.isHost);
        item.setPermissionMic(this.isPermissionMic);
        item.setPermissionCamera(this.isPermissionCamera);
       

        this.participantItemMap.set(jitsiId, item);
        this.updateParticipantCount();

        if (me && (isMicDisable || isVideoDiable)) {
        //if (me) {
            $(this.participantListElement).prepend(item.element());
        } else {
            $(this.participantListElement).append(item.element());
        }
        
    }

    removeParticipant(jitsiId: string) {
        if (!this.participantItemMap.has(jitsiId))
            return;

        this.participantItemMap.get(jitsiId).removeSelf();
        this.participantItemMap.delete(jitsiId);
        this.updateParticipantCount();
    }

    updateJoiningInfo(info: string) {
        this.joiningInfoElement.innerHTML = info;
    }

    updateParticipantCount() {
        this.participantCountElement.innerHTML = `${this.participantItemMap.size}`;
    }
   
    setMuteCamera(jitsiId: string, muteCamera: boolean) {
        const item = this.participantItemMap.get(jitsiId);
       
        if (this.isControl) {
            if (item && !this.isHost)
                item.setMuteVideo(muteCamera);
            else if (this.isSetHostControlSelfCamera) {
                item.muteCamera = muteCamera;
                item.updateCameraIconForHost();
            }
            
        }
        else {
            if (item)
                item.setMuteVideo(muteCamera);
        }
    }

    setMuteMic(jitsiId: string, muteMic: boolean) {
        const item = this.participantItemMap.get(jitsiId);

        if (this.isControl) {
            if (item && !this.isHost)
                item.setMuteAudio(muteMic);
            else if (this.isSetHostControlSelfMic) {
                //alert("1");
                //item.setMuteAudio(muteMic);
                item.muteMic = muteMic;
                //item.updateMicIcon();
                item.updateMicIconForHost();
            }
        }
        else {
            if (item)
                item.setMuteAudio(muteMic);
        }
        
    }

    updatePermissionMic(permission: boolean) {
        this.isPermissionMic = permission;
        this.participantItemMap.forEach((participantItem, key) => {
            participantItem.setPermissionMic(permission);
        });
        //alert("this.isPermissionMic3: " + this.isPermissionMic);
    }

    updatePermissionCamera(permission: boolean) {
        this.isPermissionCamera = permission;
        this.participantItemMap.forEach((participantItem, key) => {
            participantItem.setPermissionCamera(permission);
        });
        //alert("this.isPermissionMic3: " + this.isPermissionMic);
    }

    updateByRole(isHost: boolean) {
        this.isHost = isHost;  
        if (isHost)
            $(this.rootElement).addClass("is-host");
        else
            $(this.rootElement).removeClass("is-host");
        this.muteAllButtonElement.style.visibility = this.isHost ? "visible" : "hidden";
        this.participantItemMap.forEach((participantItem, key) => {
            participantItem.setRole(isHost);
        });
    }

    setIscontrolAllowed(isControl: boolean) {
        this.isControl = isControl;
    }

    setHost(isSetHost: boolean) {
        this.isSetHost = isSetHost;
    }

    setIsHostControlSelfMic(isSetHostControlSelfMic: boolean) {
        this.isSetHostControlSelfMic = isSetHostControlSelfMic;
    }

    setIsHostControlSelfCamera(isSetHostControlSelfCamera: boolean) {
        this.isSetHostControlSelfCamera = isSetHostControlSelfCamera;
    }
}