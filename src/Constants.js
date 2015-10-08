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

        length: 1
    },
    {
        name: "BEE", 
        length: 1
    },
    {
        name: "BIRD", 
        length: 1
    },
    {
        name: "INSECT", 
        length: 1
    },
    {
        name: "CAT", 
        length: 1
    },
    {
        name: "COW",
        length: 1
    },
    {
        name: "HORSE", 
        length: 1
    },
    {
        name: "TIGER", 
        length: 1
    }
];

var OBJECT_SOUNDS_LENGTH = [
	{name: "apple", length: 1},
	{name: "banana", length: 1},
	{name: "book", length: 1},
	{name: "chair", length: 1},
	{name: "desk", length: 1},
	{name: "duster", length: 1},
	{name: "egg", length: 1},
	{name: "grape", length: 1},
	{name: "hat", length: 1},
	{name: "jar", length: 1},
	{name: "joker", length: 1},
	{name: "key", length: 1},
	{name: "kite", length: 1},
	{name: "lamp", length: 1},
	{name: "map", length: 1},
	{name: "orange", length: 1},
	{name: "potato", length: 1},
	{name: "umbrella", length: 1},
	{name: "vest", length: 1},
	{name: "watch", length: 1}
];

var STRING_USER_ID = "self_user_id";
var STRING_USER_NAME = "self_user_name";
var STRING_SCHOOL_NAME = "self_school_name";

var STRING_EVENT_MAIN_APP_CALLED = "event_main_app_called";