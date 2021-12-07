"use strict";
/* SHOULD not exist same value in two enums
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitsiPrivateCommand = exports.JitsiCommand = void 0;
var JitsiCommand;
(function (JitsiCommand) {
    JitsiCommand["GRANT_HOST_ROLE"] = "grant-host";
    JitsiCommand["MUTE_AUDIO"] = "mute_audio";
    JitsiCommand["MUTE_VIDEO"] = "mute_video";
    JitsiCommand["ALLOW_CAMERA"] = "allow_video";
    JitsiCommand["ALLOW_MIC"] = "allow_audio";
    JitsiCommand["ALLOW_VIDEO"] = "allow_video";
    JitsiCommand["INIT_MEDIA_POLICY"] = "init_media_policy";
    JitsiCommand["ASK_RECORDING"] = "ask-recording";
    JitsiCommand["ASK_SCREENSHARE"] = "ask-screenshare";
    JitsiCommand["ASK_MULTISHARE"] = "ask-multishare";
    JitsiCommand["ASK_HANDRAISE"] = "ask-handraise";
    JitsiCommand["FILE_META"] = "file_meta";
    JitsiCommand["FILE_SLICE"] = "file_slice";
    JitsiCommand["BIZ_ID"] = "biz_id";
    JitsiCommand["KICK_OUT"] = "kick_out";
    JitsiCommand["MUTE_All_AUDIO"] = "mute_all_audio";
    JitsiCommand["MUTE_All_VIDEO"] = "mute_all_video";
    JitsiCommand["SET_HOSTCONTORLSELF_MIC"] = "set_hostcontrolself_mic";
    JitsiCommand["END_ALL_MEETING"] = "end_all_meeting";
})(JitsiCommand = exports.JitsiCommand || (exports.JitsiCommand = {}));
;
var JitsiPrivateCommand;
(function (JitsiPrivateCommand) {
    JitsiPrivateCommand["MEDIA_POLICY"] = "media_policy";
    JitsiPrivateCommand["ALLOW_RECORDING"] = "allow_recording";
    JitsiPrivateCommand["ALLOW_SCREENSHARE"] = "allow_screenshare";
    JitsiPrivateCommand["ALLOW_HANDRAISE"] = "allow_handraise";
    JitsiPrivateCommand["SET_PERMISSION_MIC"] = "set_permission_mic";
    JitsiPrivateCommand["SET_PERMISSION_CAMERA"] = "set_permission_camera";
    JitsiPrivateCommand["PRIVATE_CAHT"] = "private_chat";
})(JitsiPrivateCommand = exports.JitsiPrivateCommand || (exports.JitsiPrivateCommand = {}));
//# sourceMappingURL=jitsi.js.map