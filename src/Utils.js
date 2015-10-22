var Utils = Utils || {}

Utils.useHDAssets = false;

Utils.getAssetsManagerPath = function() {
    return ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "assetsManager/");
}

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

Utils.getUDID = function() {
  if (cc.sys.os == cc.sys.OS_IOS)
    return jsb.reflection.callStaticMethod("H102Wrapper", 
                                           "getUniqueDeviceId");
  else if (cc.sys.os == cc.sys.OS_ANDROID)
    return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getId", "()Ljava/lang/String;");
}

Utils.segmentIdentity = function(userId, userName, schoolId, schoolName) {
    traits = {
        userName: userName,
        schoolName: schoolName,
        schoolId: schoolId
    };

    if (cc.sys.isNative) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("H102Wrapper",
                                            "segmentIdentity:traits:",
                                            userId,
                                            JSON.stringify(traits));
        }

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                                            "segmentIdentity",
                                            "(Ljava/lang/String;Ljava/lang/String;)V",
                                            userId,
                                            JSON.stringify(traits));   
        }
    }
}

Utils.segmentTrack = function(event, properties) {
    if (cc.sys.isNative) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("H102Wrapper",
                                            "segmentTrack:properties:",
                                            event,
                                            JSON.stringify(properties));
        }

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                                            "segmentTrack",
                                            "(Ljava/lang/String;Ljava/lang/String;)V",
                                            event,
                                            JSON.stringify(properties));   
        }
    }
}

Utils.receiveData = function(data) {
    var decodedData = Base64.decode(data);
    var dataArray = decodedData.split(':');

    var message = cc.formatStr("UserName: %s\nSchoolName: %s", dataArray[0], dataArray[2]);
    // showNativeMessage("TSOG", message);

    KVDatabase.getInstance().set(STRING_USER_NAME, dataArray[0]);
    KVDatabase.getInstance().set(STRING_USER_ID, dataArray[1]);
    KVDatabase.getInstance().set(STRING_SCHOOL_NAME, dataArray[2]);
    KVDatabase.getInstance().set(STRING_SCHOOL_ID, dataArray[3]);

    var receivedData = {
        user_name: dataArray[0],
        user_id: dataArray[1],
        school_name: dataArray[2],
        school_id: dataArray[3]
    }
    cc.eventManager.dispatchCustomEvent(STRING_EVENT_MAIN_APP_CALLED, receivedData);
}
