var BACKEND_ADDRESS = "https://tsog.herokuapp.com/";
// var BACKEND_ADDRESS = "http://localhost:3000/";

var GAME_ID = "5604beb2ded84d7c8083389a";

var MOVE_DELAY_TIME = 1;

var NUMBER_ITEMS = 3;

var TIME_HINT = 3;
var CLOCK_INTERVAL = 1;
var TIME_INIT = 300;

var CHANGE_SCENE_TIME = 2;

var HEAVY_WEIGHT_ITEM = 1;
var LIGHT_WEIGHT_ITEM = 0;

var FLY_ITEM = 0;
var STAND_ITEM = 1;
var LIE_ITEM = 2;
var WATER_ITEM = 3;

var STAR_GOAL_1 = 1;
var STAR_GOAL_2 = 2;
var STAR_GOAL_3 = 3;

var SMOKE_EFFECT_DELAY = 0.1;
var SMOKE_EFFECT_FRAMES = 8;

var SPARKLE_EFFECT_DELAY = 0.05;
var SPARKLE_EFFECT_FRAMES = 19;

var HUD_BAR_DISTANCE = 60;
var PROGRESSBAR_CHANGE_RATE = 20;
var DARK_STAR_NUMBERS = 3;

var ANIMAL_SOUNDS_LENGTH = [
    {
        name: "ANT",
        length: 3
    },
    {
        name: "BEAR",
        length: 3
    },
    {
        name: "BEE", 
        length: 3
    },
    {
        name: "BIRD", 
        length: 3
    },
    {
        name: "CAT", 
        length: 3
    },
    {
        name: "COW",
        length: 3
    },
    {
        name : "DUCK",
        length: 3
    },
    {
        name: "FISH",
        length: 3
    },
    {
        name: "HORSE", 
        length: 3
    },
    {
        name: "INSECT", 
        length: 3
    },
    {
        name: "TIGER", 
        length: 3
    }
];

var OBJECT_SOUNDS_LENGTH = [
	{name: "APPLE", length: 2},
	{name: "BANANA", length: 2},
	{name: "BOOK", length: 2},
	{name: "CHAIR", length: 2},
	{name: "PENCILS", length: 2},
	{name: "DESK", length: 2},
	{name: "DUSTER", length: 2},
	{name: "EGG", length: 2},
	{name: "GRAPE", length: 2},
	{name: "HAT", length: 2},
	{name: "JAR", length: 2},
	{name: "JOKER", length: 2},
	{name: "KEY", length: 2},
	{name: "KITE", length: 2},
	{name: "LAMP", length: 2},
	{name: "MAP", length: 2},
	{name: "ORANGE", length: 2},
	{name: "POTATO", length: 2},
	{name: "TOWEL", length: 2},
	{name: "UMBRELLA", length: 2},
	{name: "VEST", length: 2},
	{name: "WATCH", length: 2}
];

// bitmap font
var FONT_COLOR = [
    res.RedFont_fnt,
    res.YellowFont_fnt,
    res.PurpleFont_fnt,
    res.GreenFont_fnt
];

var STRING_USER_ID = "self_user_id";
var STRING_USER_NAME = "self_user_name";
var STRING_SCHOOL_NAME = "self_school_name";

var STRING_EVENT_MAIN_APP_CALLED = "event_main_app_called";