var Utils = Utils || {}

Utils.useHDAssets = false;

Utils.shuffle = function(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
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

Utils.moveToMainApp = function() {
    if (cc.sys.os == cc.sys.OS_IOS)
        jsb.reflection.callStaticMethod("H102Wrapper", 
                                        "openScheme:withData:",
                                        "com.hub102.tsog",
                                        "");
    if (cc.sys.os == cc.sys.OS_ANDROID) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                                        "openScheme",
                                        "(Ljava/lang/String;Ljava/lang/String;)Z",
                                        "com.hub102.tsog",
                                        "");
    }
}

Utils.receiveData = function(data) {
    var decodedData = Base64.decode(data);
    var dataArray = decodedData.split(':');

    var message = cc.formatStr("UserName: %s\nSchoolName: %s", dataArray[0], dataArray[1]);
    // showNativeMessage("TSOG", message);

    KVDatabase.getInstance().set(STRING_USER_NAME, dataArray[0]);
    KVDatabase.getInstance().set(STRING_SCHOOL_NAME, dataArray[1]);
    KVDatabase.getInstance().set(STRING_USER_ID, dataArray[2]);

    var receivedData = {
        user_name: dataArray[0],
        school_name: dataArray[1],
        user_id: dataArray[2]
    }
    cc.eventManager.dispatchCustomEvent(STRING_EVENT_MAIN_APP_CALLED, receivedData);
}
