var BACKEND_ADDRESS = "https://tsog.herokuapp.com/";
// var BACKEND_ADDRESS = "http://localhost:3000/";

var GAME_ID = "5604beb2ded84d7c8083389a";

var MOVE_DELAY_TIME = 1;

var NUMBER_ITEMS = 3;

var TIME_HINT = 5;
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
        name: "INSECT", 
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
        name: "HORSE", 
        length: 3
    },
    {
        name: "TIGER", 
        length: 3
    }
];

var OBJECT_SOUNDS_LENGTH = [
	{name: "APPLE", length: 1},
	{name: "BANANA", length: 1},
	{name: "BOOK", length: 1},
	{name: "CHAIR", length: 1},
	{name: "DESK", length: 1},
	{name: "DUSTER", length: 1},
	{name: "EGG", length: 1},
	{name: "GRAPE", length: 1},
	{name: "HAT", length: 1},
	{name: "JAR", length: 1},
	{name: "JOKER", length: 1},
	{name: "KEY", length: 1},
	{name: "KITE", length: 1},
	{name: "LAMP", length: 1},
	{name: "MAP", length: 1},
	{name: "ORANGE", length: 1},
	{name: "POTATO", length: 1},
	{name: "UMBRELLA", length: 1},
	{name: "VEST", length: 1},
	{name: "WATCH", length: 1}
];

var STRING_USER_ID = "self_user_id";
var STRING_USER_NAME = "self_user_name";
var STRING_SCHOOL_NAME = "self_school_name";

var STRING_EVENT_MAIN_APP_CALLED = "event_main_app_called";