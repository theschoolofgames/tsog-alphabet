// var BACKEND_ADDRESS = "https://tsog.herokuapp.com/";
var BACKEND_ADDRESS = "http://130.211.178.51/";
// var BACKEND_ADDRESS = "http://localhost:3000/";

var GAME_ID = "56236595abd71555234a5c9c";

var MOVE_DELAY_TIME = 1;
var ANIMATE_DELAY_TIME = 0.2;
var COUNT_DOWN_TIME = 3;

var NUMBER_ITEMS = 3;

var TIME_HINT = 2;
var CLOCK_INTERVAL = 1;
var TIME_INIT = 300;

var CHANGE_SCENE_TIME = 2;

var ROOM_ITEM_TYPE = {
    HEAVY_WEIGHT_ITEM: "HEAVY_WEIGHT_ITEM",
    LIGHT_WEIGHT_ITEM: "LIGHT_WEIGHT_ITEM"
}

var FOREST_ITEM_TYPE = {
    FLY_ITEM: "FLY_ITEM",
    STAND_ITEM: "STAND_ITEM",
    LIE_ITEM: "LIE_ITEM",
    WATER_ITEM: "WATER_ITEM",
    MONKEY_ITEM: "MONKEY_ITEM",
    OWL_ITEM: "OWL_ITEM",
    FROG_ITEM: "FROG_ITEM",
    NEST_ITEM: "NEST_ITEM",
    SNAIL_ITEM: "SNAIL_ITEM",
    OCTOPUS_ITEM: "OCTOPUS_ITEM",
    DOLPHIN_ITEM: "DOLPHIN_ITEM",
    CROCODILE_ITEM: "CROCODILE_ITEM",

}

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
        name: "OWL",
        length: 3
    },
    {
        name: "FROG",
        length: 3
    },
    {
        name: "MONKEY",
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
        name : "ELEPHANT",
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
        name: "LION", 
        length: 3
    },
    {
        name: "TIGER", 
        length: 3
    },
    {
        name: "RAT",
        length: 3
    },
    {
        name: "NEST",
        length: 3
    },
    {
        name: "PANDA",
        length: 3
    },
    {
        name: "RABBIT",
        length : 3
    },
    {
        name: "PUPPY",
        length: 3
    },
    {
        name: "PIG",
        length: 3
    },
    {
        name: "OCTOPUS",
        length: 3
    },
    {
        name: "CROCODILE",
        length: 3
    },
    {
        name: "DOLPHIN",
        length: 3
    },
    {
        name: "SNAIL",
        length: 3
    },
    {
        name: "ZEBRA",
        length: 3
    },
    {
        name: "SHEEP",
        length: 3
    },
    {
        name: "GOLDFISH",
        length: 3
    },
    {
        name: "EAGLE",
        length:3
    },
    {
        name: "HAMSTER",
        length: 3
    },
    {
        name: "GOAT",
        length: 3
    },
    {
        name: "GIRAFFE",
        length:3
    },
    {
        name: "DEER",
        length: 3
    },
    {
        name: "KITTEN",
        length: 3
    },
    {
        name: "SNAKE",
        length: 3
    },
    {
        name: "TURTLE",
        length: 3
    },
    {
        name: "FLY",
        length: 3
    },
    {
        name: "SQUIRREL",
        length:3
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
	{name: "WATCH", length: 2},
    {name: "PEN", length: 2},
    {name: "RAT", length: 2},
    {name: "STRAWBERRY", length: 2},
    {name: "SOCK", length: 2},
    {name: "LEMON", length: 2},
    {name: "MEDICINE", length: 2},
    {name: "NAIL", length: 2},
    {name: "NEST", length: 2},
    {name: "ONION", length: 2},
    {name: "PEN", length: 2},
    {name: "QUEEN" , length: 2},
    {name: "SALT", length : 2},
    {name: "TEACHER", length : 2},
    {name: "UNIFORM", length: 2},
    {name: "VEGETABLE", length: 2},
    {name: "VEHICLE", length: 2},
    {name: "WATERMELON", length: 2},
    {name: "XMAS", length: 2},
    {name: "XYLOPHONE", length: 2},
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
var STRING_SCHOOL_ID = "self_school_id";
var STRING_GAME_CONFIG = "self_game_config";

var STRING_EVENT_MAIN_APP_CALLED = "event_main_app_called";

var SEGMENT = {
    LEVEL_START: "level_start",
    LEVEL_COMPLETE: "level_complete",
    LEVEL_INCOMPLETE: "level_incomplete",
    OBJECT_PICK_START: "object_pick_start",
    OBJECT_PICK_END: "object_pick_end",
    ANIMAL_CLICK: "animal_click"
}
