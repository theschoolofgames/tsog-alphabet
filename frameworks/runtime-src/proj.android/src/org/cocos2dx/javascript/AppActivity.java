/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import org.json.JSONObject;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.SharedPreferences;
import android.content.Context;

import com.easyndk.classes.AndroidNDKHelper;

import android.util.Base64;
import android.util.Log;

import  java.io.UnsupportedEncodingException;

public class AppActivity extends Cocos2dxActivity {

    private static AppActivity app = null;
    private static final String TAG = "AppActivity";
	
    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        app = this;
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

        AndroidNDKHelper.SetNDKReceiver(this);

        // Intent
        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                handleSendText(intent); // Handle text being sent
            }
        }

        return glSurfaceView;
    }

    void handleSendText(Intent intent) {
        String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
        if (sharedText != null) {
            byte[] data = Base64.decode(sharedText, Base64.DEFAULT);
            try {
                String text = new String(data, "UTF-8");
                String[] dataArray = text.split(":");
                String message = String.format("Username: %s\nSchoolName: %s", dataArray[0], dataArray[1]);

                app.showMessage("TSOG", message);   

                SharedPreferences sharedPref = app.getPreferences(Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sharedPref.edit();
                editor.putString("user_id", dataArray[2]); 
                editor.commit();
            } catch (UnsupportedEncodingException e) {}
        }
    }

    // Easy NDK
    public void showMessage(String title, String message) {
        final String aTitle = title, aMessage = message;
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AlertDialog alertDialog = new AlertDialog.Builder(app).create();
                alertDialog.setTitle(aTitle);
                alertDialog.setMessage(aMessage);
                alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    });
                alertDialog.show();
            }
        });
    }

    public void showMessage(JSONObject prms) {
        showMessage(prms.optString("title"), prms.optString("message"));
    }

    // Reflection
    public static boolean openScheme(String bundleId, String data) {
        PackageManager manager = app.getPackageManager();

        Intent i = manager.getLaunchIntentForPackage(bundleId);
        if (i == null) {
            app.showMessage("Error", "Target game not found");
            return false;
            //throw new PackageManager.NameNotFoundException();
        }
        i.putExtra("data", data);
        i.addCategory(Intent.CATEGORY_LAUNCHER);
        app.startActivity(i);
        return true;    
    }

    public static String getUserId() {
        SharedPreferences sharedPref = app.getPreferences(Context.MODE_PRIVATE);
        return sharedPref.getString("user_id", null);
    }
}
