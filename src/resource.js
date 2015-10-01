var res = {
   forest_jpg : "res/forest.jpg",
   room_jpg: "Bedroom-screen.jpg",
   GrayButton_png: "res/gray-button.png",
   Red_PlaceHolder_jpg: "res/red-place-holder.jpg",
   Button_Refresh_png: "res/refresh-button.png",
   Back_Button_png: "res/back.png",
   Back_Button_Pressed_png: "res/back-pressed.png",
   // plist file
   Forest_plist: "forest.plist",
   Forest_png: "forest.png",
   Animals_plist: "animals.plist",
   Animals_png: "animals.png",
   Things_plist: "things.plist",
   Things_png: "things.png",
   BG_jpg: "BG.jpg"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}