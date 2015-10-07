var res = {
   forest_jpg : "res/forest.jpg",
   room_jpg: "Bedroom-screen.jpg",
   GrayButton_png: "res/gray-button.png",
   Red_PlaceHolder_jpg: "res/red-place-holder.jpg",
   Button_Refresh_png: "res/refresh-button.png",
   Back_Button_png: "res/back.png",
   Back_Button_Pressed_png: "res/back-pressed.png",
   BG_jpg: "BG.jpg",

   // plist file
   Forest_plist: "forest.plist",
   Forest_png: "forest.png",

   // Animals
   Bear_png: "animals/bear.png",
   Bee_png: "animals/bee.png",
   Bird_png: "animals/bird.png",
   Bug_png: "animals/bug.png",
   Cat_png: "animals/cat.png",
   Cow_png: "animals/cow.png",
   Horse_png: "animals/horse.png",
   Tiger_png: "animals/tiger.png",

   // Things
   Apple_png: "things/apple.png",
   Banana_png: "things/banana.png",
   Book_png: "things/book.png",
   Chair_png: "things/chair.png",
   Pencils_png: "things/colored-pencils.png",
   Egg_png: "things/egg.png",
   Potato_png: "things/potato.png",
   Towel_png: "things/towel.png",
   Umbrella_png: "things/umbrella.png",

   // Hud
   Hud_plist: "hud.plist",
   Hud_png: "hud.png",

   // Shader
   SpriteDistort_fsh: "res/shader/SpriteDistort.fsh",
   SolidColor_fsh: "res/shader/SolidColor.fsh",
   PositionTextureColor_noMVP_vsh: "res/shader/PositionTextureColor_noMVP.vsh",

   // Effect
   Smoke_effect_plist: "effect-smoke.plist",
   Smoke_effect_png: "effect-smoke.png",
   Sparkle_effect_png: "sparkle-effect.png",
   Sparkle_effect_plist: "sparkle-effect.plist"

   // Smoke_sound: "res/smoke-sound.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}