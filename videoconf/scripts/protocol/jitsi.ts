
/* SHOULD not exist same value in two enums
 */


export enum JitsiCommand {
    GRANT_HOST_ROLE = "grant-host",
    MUTE_AUDIO = "mute_audio",
    MUTE_VIDEO = "mute_video",
    ALLOW_CAMERA = "allow_video",
    ALLOW_MIC = "allow_audio",
    ALLOW_VIDEO = "allow_video",
    INIT_MEDIA_POLICY = "init_media_policy",
    ASK_RECORDING = "ask-recording",
    ASK_SCREENSHARE = "ask-screenshare",
    ASK_MULTISHARE = "ask-multishare",
    ASK_HANDRAISE = "ask-handraise",
    FILE_META = "file_meta",
    FILE_SLICE = "file_slice",
    BIZ_ID = "biz_id",
    KICK_OUT = "kick_out",
    MUTE_All_AUDIO = "mute_all_audio",
    MUTE_All_VIDEO = "mute_all_video",
    SET_HOSTCONTORLSELF_MIC = "set_hostcontrolself_mic",
    END_ALL_MEETING = "end_all_meeting",
};


export enum JitsiPrivateCommand {
    MEDIA_POLICY = "media_policy",
    ALLOW_RECORDING = "allow_recording",
    ALLOW_SCREENSHARE = "allow_screenshare",
    ALLOW_HANDRAISE = "allow_handraise",
    SET_PERMISSION_MIC = "set_permission_mic",
    SET_PERMISSION_CAMERA = "set_permission_camera",
    PRIVATE_CAHT = "private_chat"
}
