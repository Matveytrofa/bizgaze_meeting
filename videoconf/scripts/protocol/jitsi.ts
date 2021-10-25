
/* SHOULD not exist same value in two enums
 */


export enum JitsiCommand {
    GRANT_HOST_ROLE = "grant-host",
    MUTE_AUDIO = "mute_audio",
    MUTE_VIDEO = "mute_video",
    ALLOW_CAMERA = "allow_video",
    ALLOW_MIC = "allow_audio",
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
};


export enum JitsiPrivateCommand {
    MEDIA_POLICY = "media_policy",
    ALLOW_RECORDING = "allow_recording",
    ALLOW_SCREENSHARE = "allow_screenshare",
    ALLOW_HANDRAISE = "allow_handraise",
    PRIVATE_CAHT = "private_chat"
}
