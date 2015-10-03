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
   BG_jpg: "BG.jpg",

   // Animals
   Bear_png: "animals/bear.png",
   Bird_png: "animals/bird.png",
   Cat_png: "animals/cat.png",

   // Things
   Banana_png: "things/banana.png",
   Book_png: "things/book.png",
   Chair_png: "things/chair.png",
   Pencils_png: "things/colored-pencils.png",

   // Shader
   SpriteDistort_fsh: "res/shader/SpriteDistort.fsh",
   SpriteDistort_vsh: "res/shader/SpriteDistort.vsh"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}