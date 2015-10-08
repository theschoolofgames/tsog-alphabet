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
   Sparkle_effect_plist: "sparkle-effect.plist",

   // Smoke_sound: "res/smoke-sound.mp3"

   // Sound
   BEAR_mp3: "sounds/animals/bear.mp3",
   BEE_mp3: "sounds/animals/bee.mp3",
   BIRD_mp3: "sounds/animals/bird.mp3",
   CAT_mp3: "sounds/animals/cat.mp3",
   COW_mp3: "sounds/animals/cow.mp3",
   HORSE_mp3: "sounds/animals/horse.mp3",
   INSECT_mp3: "sounds/animals/insect.mp3",
   TIGER_mp3: "sounds/animals/tiger.mp3",

   APPLE_1_mp3: "res/sounds/things/apple-1.mp3",
   APPLE_3_mp3: "res/sounds/things/apple-3.mp3",
   BANANA_1_mp3: "res/sounds/things/banana-1.mp3",
   BANANA_3_mp3: "res/sounds/things/banana-3.mp3",
   BOOK_1_mp3: "res/sounds/things/book-1.mp3",
   BOOK_3_mp3: "res/sounds/things/book-3.mp3",
   CHAIR_1_mp3: "res/sounds/things/chair-1.mp3",
   CHAIR_3_mp3: "res/sounds/things/chair-3.mp3",
   DESK_1_mp3: "res/sounds/things/desk-1.mp3",
   DESK_3_mp3: "res/sounds/things/desk-3.mp3",
   DUSTER_1_mp3: "res/sounds/things/duster-1.mp3",
   DUSTER_3_mp3: "res/sounds/things/duster-3.mp3",
   EGG_1_mp3: "res/sounds/things/egg-1.mp3",
   EGG_3_mp3: "res/sounds/things/egg-3.mp3",
   GRAPE_1_mp3: "res/sounds/things/grape-1.mp3",
   GRAPE_3_mp3: "res/sounds/things/grape-3.mp3",
   HAT_1_mp3: "res/sounds/things/hat-1.mp3",
   HAT_3_mp3: "res/sounds/things/hat-3.mp3",
   JAR_1_mp3: "res/sounds/things/jar-1.mp3",
   JAR_3_mp3: "res/sounds/things/jar-3.mp3",
   JOKER_1_mp3: "res/sounds/things/joker-1.mp3",
   JOKER_3_mp3: "res/sounds/things/joker-3.mp3",
   KITE_1_mp3: "res/sounds/things/kite-1.mp3",
   KITE_3_mp3: "res/sounds/things/kite-3.mp3",
   LAMP_1_mp3: "res/sounds/things/lamp-1.mp3",
   LAMP_3_mp3: "res/sounds/things/lamp-3.mp3",
   MAP_1_mp3: "res/sounds/things/map-1.mp3",
   MAP_3_mp3: "res/sounds/things/map-3.mp3",
   ORANGE_1_mp3: "res/sounds/things/orange-1.mp3",
   ORANGE_3_mp3: "res/sounds/things/orange-3.mp3",
   POTATO_1_mp3: "res/sounds/things/potato-1.mp3",
   POTATO_3_mp3: "res/sounds/things/potato-3.mp3",
   UMBRELLA_1_mp3: "res/sounds/things/umbrella-1.mp3",
   UMBRELLA_3_mp3: "res/sounds/things/umbrella-3.mp3",
   VEST_1_mp3: "res/sounds/things/vest-1.mp3",
   VEST_3_mp3: "res/sounds/things/vest-3.mp3",
   WATCH_1_mp3: "res/sounds/things/watch-1.mp3",
   WATCH_3_mp3: "res/sounds/things/watch-3.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}