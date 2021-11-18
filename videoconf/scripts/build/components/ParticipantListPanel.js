"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantListWidget = exports.ParticipantListPanelProps = void 0;
var snippet_1 = require("../util/snippet");
var vector_icon_1 = require("./vector_icon");
var ParticipantItemProps = /** @class */ (function () {
    function ParticipantItemProps() {
    }
    return ParticipantItemProps;
}());
var ParticipantItem = /** @class */ (function () {
    function ParticipantItem(props) {
        this.props = props;
        this.muteCamera = this.props.muteCamera;
        this.muteMic = this.props.muteMic;
        this.init();
    }
    ParticipantItem.prototype.init = function () {
        var _this = this;
        var body = '';
        if (!this.props.isMicDisable) {
            body = "\n                <div class=\"jitsi-participant\">\n                    <div class=\"participant-avatar\">\n                        <div class=\"avatar  userAvatar w-40px h-40px\" style=\"background-color: rgba(234, 255, 128, 0.4);\">\n                            <svg class=\"avatar-svg\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <text dominant-baseline=\"central\" fill=\"rgba(255,255,255,.6)\" font-size=\"40pt\" text-anchor=\"middle\" x=\"50\" y=\"50\">?</text>\n                            </svg>\n                        </div>\n                    </div>\n                    <div class=\"participant-content\">\n                        <span class=\"name\" class=\"fs-2 fw-bolder\">?</span>\n                        <span class=\"spacer\"></span>\n                        <div class=\"jitsi-icon camera-toggle-button\">\n                            <svg id=\"camera-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                        <div class=\"jitsi-icon mic-toggle-button\">\n                            <svg id=\"mic-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                    </div>\n                </div>\n            ";
        }
        else {
            body = "\n                <div class=\"jitsi-participant\">\n                    <div class=\"participant-avatar\">\n                        <div class=\"avatar  userAvatar w-40px h-40px\" style=\"background-color: rgba(234, 255, 128, 0.4);\">\n                            <svg class=\"avatar-svg\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <text dominant-baseline=\"central\" fill=\"rgba(255,255,255,.6)\" font-size=\"40pt\" text-anchor=\"middle\" x=\"50\" y=\"50\">?</text>\n                            </svg>\n                        </div>\n                    </div>\n                    <div class=\"participant-content\">\n                        <span class=\"name\" class=\"fs-2 fw-bolder\">?</span>\n                        <span class=\"spacer\"></span>\n                        <div class=\"jitsi-icon camera-toggle-button\" style=\"pointer-events: none; opacity: 30%;\">\n                            <svg id=\"camera-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                        <div class=\"jitsi-icon mic-toggle-button\" style=\"pointer-events: none; opacity: 30%;\">\n                            <svg id=\"mic-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                    </div>\n                </div>\n            ";
        }
        if (this.props.me && this.props.isControl && this.props.isSetHost) {
            body = "\n                <div class=\"jitsi-participant\">\n                    <div class=\"participant-avatar\">\n                        <div class=\"avatar  userAvatar w-40px h-40px\" style=\"background-color: rgba(234, 255, 128, 0.4);\">\n                            <svg class=\"avatar-svg\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <text dominant-baseline=\"central\" fill=\"rgba(255,255,255,.6)\" font-size=\"40pt\" text-anchor=\"middle\" x=\"50\" y=\"50\">?</text>\n                            </svg>\n                        </div>\n                    </div>\n                    <div class=\"participant-content\">\n                        <span class=\"name\" class=\"fs-2 fw-bolder\">?</span>\n                        <span class=\"spacer\"></span>\n                        <div class=\"jitsi-icon camera-toggle-button cameraowner\">\n                            <svg id=\"camera-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                        <div class=\"jitsi-icon mic-toggle-button micowner\">\n                            <svg id=\"mic-disabled\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n                                <path d=\"\"></path>\n                            </svg>\n                        </div>\n                    </div>\n                </div>\n            ";
        }
        var $root = $(body);
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
        this.avatarTextElement.innerHTML = snippet_1.avatarName(this.props.name);
        var avatarColors = [
            "rgba(234, 255, 128, 0.4)",
            "rgba(114, 91, 60, 1.0)",
            "rgba(63, 65, 113, 1.0)",
            "rgba(56, 105, 91, 1.0)"
        ];
        $(this.avatarElement).css("background-color", avatarColors[snippet_1.random(0, avatarColors.length)]);
        //name
        if (this.props.me)
            $(this.nameElement).html(this.props.name + " (Me)");
        else
            $(this.nameElement).html(this.props.name);
        //icon
        this.updateCameraIcon();
        this.updateMicIcon();
        $(this.cameraButtonElement).on('click', function (_) {
            _this.onToggleCamera();
        });
        $(this.micButtonElement).on('click', function (_) {
            _this.onToggleMic();
        });
    };
    ParticipantItem.prototype.element = function () {
        return this.rootElement;
    };
    ParticipantItem.prototype.removeSelf = function () {
        $(this.rootElement).remove();
    };
    ParticipantItem.prototype.onToggleCamera = function () {
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
    };
    ParticipantItem.prototype.onToggleMic = function () {
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
    };
    ParticipantItem.prototype.blockMic = function () {
        if (!this.muteMic)
            this.onToggleMic();
    };
    ParticipantItem.prototype.setMuteAudio = function (use) {
        this.muteMic = use;
        this.updateMicIcon();
    };
    ParticipantItem.prototype.setMuteVideo = function (use) {
        this.muteCamera = use;
        this.updateCameraIcon();
    };
    ParticipantItem.prototype.setRole = function (isHost) {
        this.isHost = isHost;
    };
    ParticipantItem.prototype.setPermissionMic = function (permisssion) {
        this.isPermissionMic = permisssion;
    };
    ParticipantItem.prototype.setPermissionCamera = function (permisssion) {
        this.isPermissionCamera = permisssion;
    };
    ParticipantItem.prototype.updateCameraIcon = function () {
        if (this.props.isHostForPermission && this.props.isControl && !this.props.me) {
            var icon = vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON;
            $(this.cameraIconElement).attr("d", icon);
            var color = this.muteCamera ? "#eb1717a6" : "#09eb1a78";
            $(this.cameraButtonElement).css("background-color", color);
            $(this.cameraButtonElement).css("border-radius", "20%");
        }
        else {
            var icon = this.muteCamera ? vector_icon_1.VectorIcon.VIDEO_MUTE_ICON : vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON;
            $(this.cameraIconElement).attr("d", icon);
        }
    };
    ParticipantItem.prototype.updateMicIcon = function () {
        if (this.props.isHostForPermission && this.props.isControl && !this.props.me) {
            var icon = vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON;
            $(this.micIconElement).attr("d", icon);
            var color = this.muteMic ? "#eb1717a6" : "#09eb1a78";
            $(this.micButtonElement).css("background-color", color);
            $(this.micButtonElement).css("border-radius", "20%");
        }
        else {
            var icon = this.muteMic ? vector_icon_1.VectorIcon.AUDIO_MUTE_ICON : vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON;
            $(this.micIconElement).attr("d", icon);
        }
    };
    ParticipantItem.prototype.updateMicIconForHost = function () {
        var icon = this.muteMic ? vector_icon_1.VectorIcon.AUDIO_MUTE_ICON : vector_icon_1.VectorIcon.AUDIO_UNMUTE_ICON;
        $(this.micIconForHostElement).attr("d", icon);
    };
    ParticipantItem.prototype.updateCameraIconForHost = function () {
        var icon = this.muteCamera ? vector_icon_1.VectorIcon.VIDEO_MUTE_ICON : vector_icon_1.VectorIcon.VIDEO_UNMUTE_ICON;
        $(this.cameraIconForHostElement).attr("d", icon);
    };
    return ParticipantItem;
}());
var ParticipantListPanelProps = /** @class */ (function () {
    function ParticipantListPanelProps() {
    }
    return ParticipantListPanelProps;
}());
exports.ParticipantListPanelProps = ParticipantListPanelProps;
var ParticipantListWidget = /** @class */ (function () {
    function ParticipantListWidget() {
        //states
        this.participantItemMap = new Map();
        this.isHost = false;
        this.isSetHostControlMic = false;
        this.isSetHostControlCamera = false;
        this.isSetHostControlSelfMic = false;
        this.isSetHostControlSelfCamera = false;
        this.isPermissionMic = false;
        this.isPermissionCamera = false;
        this.rootElement = document.getElementById("participants-list");
        var $root = $(this.rootElement);
        this.participantCountElement = $root.find("#participant-count")[0];
        this.participantListElement = $root.find("#participants-list-body")[0];
        this.muteAllButtonElement = $root.find("#participants-list-footer>.btn")[0];
        this.toggleCopyJoiningInfoElement = document.querySelector("#copy-joining-info");
        this.joiningInfoElement = document.querySelector("#joining-info");
    }
    ParticipantListWidget.prototype.init = function (props) {
        this.props = props;
        this.updateParticipantCount();
        this.attachHandlers();
    };
    ParticipantListWidget.prototype.attachHandlers = function () {
        var _this = this;
        $(this.muteAllButtonElement).on('click', function () {
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
            _this.props.onMuteAll();
        });
        $(this.toggleCopyJoiningInfoElement).on('click', function (_) {
            _this.props.toggleCopyJoiningInfo();
        });
    };
    ParticipantListWidget.prototype.addParticipant = function (jitsiId, name, me, isMicDisable, isVideoDiable, muteCamera, muteMic) {
        if (this.participantItemMap.has(jitsiId)) {
            this.removeParticipant(jitsiId);
        }
        var props = new ParticipantItemProps();
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
        var item = new ParticipantItem(props);
        item.setRole(this.isHost);
        item.setPermissionMic(this.isPermissionMic);
        item.setPermissionCamera(this.isPermissionCamera);
        this.participantItemMap.set(jitsiId, item);
        this.updateParticipantCount();
        if (me && (isMicDisable || isVideoDiable)) {
            //if (me) {
            $(this.participantListElement).prepend(item.element());
        }
        else {
            $(this.participantListElement).append(item.element());
        }
    };
    ParticipantListWidget.prototype.removeParticipant = function (jitsiId) {
        if (!this.participantItemMap.has(jitsiId))
            return;
        this.participantItemMap.get(jitsiId).removeSelf();
        this.participantItemMap.delete(jitsiId);
        this.updateParticipantCount();
    };
    ParticipantListWidget.prototype.updateJoiningInfo = function (info) {
        this.joiningInfoElement.innerHTML = info;
    };
    ParticipantListWidget.prototype.updateParticipantCount = function () {
        this.participantCountElement.innerHTML = "" + this.participantItemMap.size;
    };
    ParticipantListWidget.prototype.setMuteCamera = function (jitsiId, muteCamera) {
        var item = this.participantItemMap.get(jitsiId);
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
    };
    ParticipantListWidget.prototype.setMuteMic = function (jitsiId, muteMic) {
        var item = this.participantItemMap.get(jitsiId);
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
    };
    ParticipantListWidget.prototype.updatePermissionMic = function (permission) {
        this.isPermissionMic = permission;
        this.participantItemMap.forEach(function (participantItem, key) {
            participantItem.setPermissionMic(permission);
        });
        //alert("this.isPermissionMic3: " + this.isPermissionMic);
    };
    ParticipantListWidget.prototype.updatePermissionCamera = function (permission) {
        this.isPermissionCamera = permission;
        this.participantItemMap.forEach(function (participantItem, key) {
            participantItem.setPermissionCamera(permission);
        });
        //alert("this.isPermissionMic3: " + this.isPermissionMic);
    };
    ParticipantListWidget.prototype.updateByRole = function (isHost) {
        this.isHost = isHost;
        if (isHost)
            $(this.rootElement).addClass("is-host");
        else
            $(this.rootElement).removeClass("is-host");
        this.muteAllButtonElement.style.visibility = this.isHost ? "visible" : "hidden";
        this.participantItemMap.forEach(function (participantItem, key) {
            participantItem.setRole(isHost);
        });
    };
    ParticipantListWidget.prototype.setIscontrolAllowed = function (isControl) {
        this.isControl = isControl;
    };
    ParticipantListWidget.prototype.setHost = function (isSetHost) {
        this.isSetHost = isSetHost;
    };
    ParticipantListWidget.prototype.setIsHostControlSelfMic = function (isSetHostControlSelfMic) {
        this.isSetHostControlSelfMic = isSetHostControlSelfMic;
    };
    ParticipantListWidget.prototype.setIsHostControlSelfCamera = function (isSetHostControlSelfCamera) {
        this.isSetHostControlSelfCamera = isSetHostControlSelfCamera;
    };
    return ParticipantListWidget;
}());
exports.ParticipantListWidget = ParticipantListWidget;
//# sourceMappingURL=ParticipantListPanel.js.map