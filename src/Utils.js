var Utils = Utils || {}

Utils.useHDAssets = false;

Utils.getAssetsManagerPath = function() {
    return ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "assetsManager/");
}

Utils.getUserId = function() {
    return KVDatabase.getInstance().getString(STRING_USER_ID, "");
}

Utils.getUserName = function() {
    return KVDatabase.getInstance().getString(STRING_USER_NAME, "");
}

Utils.getSchoolName = function() {
    return KVDatabase.getInstance().getString(STRING_SCHOOL_NAME, "");
}

Utils.receiveData = function(data) {
    var decodedData = Base64.decode(data);
    var dataArray = JSON.parse(decodedData);

    var message = cc.formatStr("UserName: %s\nSchoolName: %s", dataArray[0], dataArray[2]);
    // showNativeMessage("TSOG", message);

    KVDatabase.getInstance().set(STRING_USER_NAME, dataArray[0]);
    KVDatabase.getInstance().set(STRING_USER_ID, dataArray[1]);
    KVDatabase.getInstance().set(STRING_SCHOOL_NAME, dataArray[2]);
    KVDatabase.getInstance().set(STRING_SCHOOL_ID, dataArray[3]);
    KVDatabase.getInstance().set(STRING_GAME_CONFIG, dataArray[4]);

    Config.setupInstance();

    SegmentHelper.identity(
        dataArray[1], 
        dataArray[0], 
        dataArray[3], 
        dataArray[2]);

    var receivedData = {
        user_name: dataArray[0],
        user_id: dataArray[1],
        school_name: dataArray[2],
        school_id: dataArray[3],
        game_config: dataArray[4]
    }
    cc.eventManager.dispatchCustomEvent(STRING_EVENT_MAIN_APP_CALLED, receivedData);
}
