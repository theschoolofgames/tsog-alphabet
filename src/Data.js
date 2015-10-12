ROOM_OBJECT_POSITIONS = [];
FOREST_OBJECT_POSITIONS = [];
FOREST_BACKGROUND_POSITIONS = [];

var BEDROOM_ID = 0;
var FOREST_ID = 1;
var BEDROOM_SHADE_ID = 2;
var FOREST_BACKGROUND_ID = 3;

var BEDROOM_ITEMS = [
    // {
    //     imageName: "desk",
    //     type: HEAVY_WEIGHT_ITEM,
    //     x: 1600,
    //     y: 654,
    //     anchorX: 0.5,
    //     anchorY: 0.5
    // },
    {
        imageName: "duster",
        type: LIGHT_WEIGHT_ITEM,
        x: 217.5,
        y: 220,
        anchorX: 0.5,
        anchorY: 0.5
    },

    {
        imageName: "grape",
        type: LIGHT_WEIGHT_ITEM,
        x: 267.25,
        y: 278.75,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "hat",
        type: LIGHT_WEIGHT_ITEM,
        x: 882.5,
        y: 365,
        anchorX: 0.5,
        anchorY: 0.5
    },
        {
        imageName: "jar",
        type: LIGHT_WEIGHT_ITEM,
        x: 916.25,
        y: 286.25,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "lamp",
        type: LIGHT_WEIGHT_ITEM,
        x: 1096.25,
        y: 299.50,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "map",
        type: LIGHT_WEIGHT_ITEM,
        x: 1092.25,
        y: 238.75,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "orange",
        type: LIGHT_WEIGHT_ITEM,
        x: 1040.25,
        y: 269.5,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "watch",
        type: LIGHT_WEIGHT_ITEM,
        x: 876.25,
        y: 277.5,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "apple",
        type: LIGHT_WEIGHT_ITEM,
        x: 1076,
        y: 284,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "banana",
        type: LIGHT_WEIGHT_ITEM,
        x: 251,
        y: 282,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "book",
        type: LIGHT_WEIGHT_ITEM,
        x: 825,
        y: 310,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "chair",
        type: HEAVY_WEIGHT_ITEM,
        x: 936,
        y: 158,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "pencils",
        type: LIGHT_WEIGHT_ITEM,
        x: 1070,
        y: 254,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "egg",
        type: LIGHT_WEIGHT_ITEM,
        x: 824,
        y: 437,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "potato",
        type: LIGHT_WEIGHT_ITEM,
        x: 1104,
        y: 275,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "towel",
        type: LIGHT_WEIGHT_ITEM,
        x: 837,
        y: 374,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: "umbrella",
        type: HEAVY_WEIGHT_ITEM,
        x: 969,
        y: 273,
        anchorX: 0.5,
        anchorY: 0.5
    }
];

var BEDROOM_LIGHTWEIGHT_ITEMS_POSITION = [
    {
        x: 400,
        y: 285,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 450,
        y: 285,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 420,
        y: 320,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 380,
        y: 320,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 450,
        y: 320,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 1080,
        y: 255,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 1080,
        y: 255,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 1100,
        y: 255,
        anchorX: 0.5,
        anchorY: 0.5
    },

];

var BEDROOM_HEAVYWEIGHT_ITEMS_POSITION = [
    {
        x: 180,
        y: 180,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 118,
        y: 156,
        anchorX: 0.5,
        anchorY: 0.5
    },
     
    {
        x: 158,
        y: 156,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 258,
        y: 156,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 200,
        y: 120,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 200,
        y: 175,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 300,
        y: 100,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 400,
        y: 160,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 500,
        y: 120,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 715,
        y: 102,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 720,
        y: 170,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 755,
        y: 102,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 776,
        y: 171,
        anchorX: 0.5,
        anchorY: 0.5
    }
];

var BEDROOM_ITEMS_POSITION = BEDROOM_LIGHTWEIGHT_ITEMS_POSITION.concat(BEDROOM_HEAVYWEIGHT_ITEMS_POSITION);

var FOREST_ITEMS = [
    {
        imageName: "ant",
        type: STAND_ITEM
    },
    {
        imageName: "bird",
        type: FLY_ITEM
    },
    {
        imageName: "bee",
        type: LIE_ITEM
    },
    {
        imageName: "bear",
        type: STAND_ITEM
    },
    {
        imageName: "cat",
        type: LIE_ITEM
    },
    {
        imageName: "cow",
        type: STAND_ITEM
    },
    {
        imageName: "duck",
        type: STAND_ITEM
    },
    {
        imageName: "elephant",
        type: STAND_ITEM
    },
    {
        imageName: "fish",
        type: WATER_ITEM
    },
    {
        imageName: "horse",
        type: STAND_ITEM
    },
    {
        imageName: "insect",
        type: LIE_ITEM
    },
    {
        imageName: "lion",
        type: STAND_ITEM
    },
    {
        imageName: "tiger",
        type: STAND_ITEM
    }
];
var FOREST_FLY_POSITION = [
    {
        x: 800,
        y: 500,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 600,
        y: 400,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 600,
        y: 400,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 650,
        y: 400,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 650,
        y: 400,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 700,
        y: 400,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 300,
        y: 550,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 300,
        y: 550,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 300,
        y: 550,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 900,
        y: 500,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 700,
        y: 400,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 300,
        y: 550,
        z: 1,
        anchorX: 0.5,
        anchorY: 0.5,
    }
];
var FOREST_GROUND_POSITION = [
    {
        // elephant + 
        x: 112.5,
        y: 105,
        z: 6,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // bee
        x: 240,
        y: 56,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // tiger
        x: 156,
        y: 240,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // cat
        x: 431,
        y: 130,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // lion
        x: 568,
        y: 131,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // ant
        x: 586,
        y: 30,
        z: 6,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // horse
        x: 703,
        y: 52,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // duck
        x: 823,
        y: 100,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // bear
        x: 992,
        y: 77,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // cow
        x: 70,
        y: 62,
        z: 7,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // 
        x: 293,
        y: 225,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        // 
        x: 96,
        y: 231,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    }
];
var FOREST_WATER_POSITION = [
    {
        x: 580,
        y: 188,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 580,
        y: 188,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 580,
        y: 188,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 700,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 750,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 800,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 700,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 750,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 800,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 700,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 750,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 800,
        y: 160,
        z: 3,
        anchorX: 0.5,
        anchorY: 0.5,
    }
];

var FOREST_BACKGROUND_ITEMS_POSITION = [
    {
        x: 668,
        y: 540,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#cloud-1.png",
        z: 0
    },
    {
        x: 468,
        y: 570,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#cloud-3.png",
        z: 0
    },
    {
        x: 0,
        y: 520,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#cloud-4.png",
        z: 0
    },
    {
        x: 1136,
        y: 210,
        anchorX: 1,
        anchorY: 0.5,
        imageName: "#river.png",
        z: 1
    },
    {
        x: 0,
        y: 200,
        anchorX: 0,
        anchorY: 0,
        imageName: "#water-fall.png",
        z: 1 },
    {
        x: 0,
        y: 0,
        anchorX: 0,
        anchorY: 0,
        imageName: "#ground.png",
        z: 4
    },
    {
        x: 488,
        y: 270,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-shadow.png",
        z: 5
    },
    {
        x: 488,
        y: 270,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-1.png",
        z: 5
    },
    {
        x: 299,
        y: 370,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-2.png",
        z: 3
    },
    {
        x: 407,
        y: 380,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-3.png",
        z: 2
    },
    {
        x: 1136,
        y: 340,
        anchorX: 1,
        anchorY: 0.5,
        imageName: "#tree-4.png",
        z: 5
    },
    {
        x: 1136,
        y: 320,
        anchorX: 1,
        anchorY: 0.5,
        imageName: "#tree-5.png",
        z: 2
    },
    {
        x: 0,
        y: 76,
        anchorX: 0,
        anchorY: 0.5,
        imageName: "#bush-1.png",
        z: 10
    },
    {
        x: 868,
        y: 104,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#bush-2.png",
        z: 10
    },
    {
        x: 485,
        y: 120,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#small-bush-1.png",
        z: 6
    },
    {
        x: 0,
        y: 240,
        anchorX: 0,
        anchorY: 0.5,
        imageName: "#small-bush-2.png",
        z: 6
    }
];


var DataStore = cc.Class.extend({
    positionSets: [],
    objectSets: [],

    ctor: function() {
        this._fillDataStore();
    },

    _addPosition: function(setId, x, y, anchorX, anchorY, imageName, z) {
        var posArray = this.positionSets[setId];

        if (anchorX == undefined)
            anchorX = 0.5;
        if (anchorY == undefined)
            anchorY = 0;
        if (imageName == undefined)
            imageName = "";
        if (z == undefined)
            z = 0;

        var obj = {
            x: x,
            y: y,
            anchorX: anchorX,
            anchorY: anchorY,
            imageName: imageName,
            z: z
        }
        posArray.push(obj);
    },

    _addObject: function(setId, item) {
        var objArray = this.objectSets[setId];
        var imageName = item.imageName;
        var correctPos = cc.p(item.x, item.y)
        var anchorPoint = cc.p(item.anchorX, item.anchorY);
        var type = item.type;
        if (imageName == undefined)
            imageName = "";
        if (type == undefined)
            type = 0;
        if (correctPos == undefined)
            correctPos = cc.p(0,0);
        if (anchorPoint == undefined)
            anchorPoint = cc.p(0.5,0.5);

        var obj = {
            imageName: imageName,
            correctPos: correctPos,
            anchorPoint: anchorPoint,
            type: type
        };
        objArray.push(obj);
    },

    _fillDataStore: function() {
        // ------------------------------ BED ROOM
        this.positionSets[BEDROOM_ID] = [];
        this.objectSets[BEDROOM_ID] = [];

        for ( var i = 0; i < BEDROOM_ITEMS.length; i++) {
            this._addObject(BEDROOM_ID, BEDROOM_ITEMS[i])
        }
        // ------------------------------ FOREST
        this.positionSets[FOREST_ID] = [];
        this.objectSets[FOREST_ID] = [];

        for ( var i = 0; i < FOREST_ITEMS.length; i++) {
            this._addObject(FOREST_ID, FOREST_ITEMS[i]);
        }
        // ------------------------------ FOREST BACKGROUND
        this.positionSets[FOREST_BACKGROUND_ID] = [];
        this.objectSets[FOREST_BACKGROUND_ID] = [];
        //add position
        for ( var i = 0; i < FOREST_BACKGROUND_ITEMS_POSITION.length; i++) {
            var itemsPos = FOREST_BACKGROUND_ITEMS_POSITION[i];
            this._addPosition(FOREST_BACKGROUND_ID,
                itemsPos.x,
                itemsPos.y,
                itemsPos.anchorX,
                itemsPos.anchorY,
                itemsPos.imageName,
                itemsPos.z);
        }
    },

    getPositions: function(setId) {
        return this.positionSets[setId];
    },

    getObjects: function(setId) {
        return this.objectSets[setId];
    },

    getRandomItems: function(array, setId, numItems) {
        var items = array[setId];
        var shuffledItems = Utils.shuffle(items);
        var randomedItems = [];
        for ( i = 0; i < numItems; i++)
            randomedItems.push(shuffledItems[i]);

        return randomedItems;
    },

    getRandomPositions: function(setId, numItems) {
        return this.getRandomItems(this.positionSets, setId, numItems);
    },

    getRandomObjects: function(setId, numItems) {
        return this.getRandomItems(this.objectSets, setId, numItems);
    }
});

DataStore._instance = null;

DataStore.getInstance = function () {
  return DataStore._instance || DataStore.setupInstance();
};

DataStore.setupInstance = function () {
    preProcessData(BEDROOM_ITEMS);
    preProcessData(BEDROOM_LIGHTWEIGHT_ITEMS_POSITION);
    preProcessData(BEDROOM_HEAVYWEIGHT_ITEMS_POSITION);

    preProcessData(FOREST_FLY_POSITION);
    preProcessData(FOREST_GROUND_POSITION);
    preProcessData(FOREST_WATER_POSITION);

    preProcessData(FOREST_BACKGROUND_ITEMS_POSITION);

    DataStore._instance = new DataStore();

    return DataStore._instance;
};

function preProcessData(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].x = data[i].x / 1136 * cc.winSize.width;
        data[i].y = data[i].y / 640 * (cc.winSize.width / 16 * 9);
    }
} 