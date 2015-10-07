ROOM_OBJECT_POSITIONS = [];
FOREST_OBJECT_POSITIONS = [];
FOREST_BACKGROUND_POSITIONS = [];

var BEDROOM_ID = 0;
var FOREST_ID = 1;
var BEDROOM_SHADE_ID = 2;
var FOREST_BACKGROUND_ID = 3;

var BEDROOM_ITEMS = [
    {
        imageName: res.Apple_png,
        type: LIGHT_WEIGHT_ITEM,
        correctX: 1076,
        correctY: 284,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Banana_png,
        type: LIGHT_WEIGHT_ITEM,
        correctX: 253,
        correctY: 282,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Book_png,
        type: LIGHT_WEIGHT_ITEM,
        correctX: 825,
        correctY: 310,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Chair_png,
        type: HEAVY_WEIGHT_ITEM,
        correctX: 936,
        correctY: 158,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Pencils_png,
        type: LIGHT_WEIGHT_ITEM,
        correctX: 1070,
        correctY: 254,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Egg_png,
        type: LIGHT_WEIGHT_ITEM,
        correctX: 824,
        correctY: 437,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Potato_png,
        type: LIGHT_WEIGHT_ITEM,
        correctX: 1104,
        correctY: 275,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Towel_png,
        type: LIGHT_WEIGHT_ITEM,
        correctX: 837,
        correctY: 374,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        imageName: res.Umbrella_png,
        type: HEAVY_WEIGHT_ITEM,
        correctX: 969,
        correctY: 273,
        anchorX: 0.5,
        anchorY: 0.5
    }
];

var BEDROOM_LIGHTWEIGHT_ITEMS_POSITION = [
    {
        x: 400,
        y: 278,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 450,
        y: 278,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 400,
        y: 290,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 380,
        y: 290,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 450,
        y: 290,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 666,
        y: 300,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 1080,
        y: 255,
        anchorX: 0.5,
        anchorY: 0.5
    },


];

var BEDROOM_HEAVYWEIGHT_ITEMS_POSITION = [
    {
        x: 75,
        y: 170,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 90,
        y: 170,
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
        x: 200,
        y: 120,
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
        x: 776,
        y: 171,
        anchorX: 0.5,
        anchorY: 0.5
    },
    {
        x: 118,
        y: 156,
        anchorX: 0.5,
        anchorY: 0.5
    }
];

var BEDROOM_ITEMS_POSITION = BEDROOM_LIGHTWEIGHT_ITEMS_POSITION.concat(BEDROOM_HEAVYWEIGHT_ITEMS_POSITION);

var FOREST_ITEMS = [
    {
        imageName: res.Bird_png,
        type: FLY_ITEM
    },
    {
        imageName: res.Bee_png,
        type: LIE_ITEM
    },
    {
        imageName: res.Bear_png,
        type: STAND_ITEM
    },
    {
        imageName: res.Bug_png,
        type: LIE_ITEM
    },
    {
        imageName: res.Cat_png,
        type: LIE_ITEM
    },
    {
        imageName: res.Cow_png,
        type: STAND_ITEM
    },
    {
        imageName: res.Horse_png,
        type: STAND_ITEM
    },
    {
        imageName: res.Tiger_png,
        type: STAND_ITEM
    }
];
var FOREST_FLY_POSITION = [
    {
        x: 800,
        y: 500,
        z: 0,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 600,
        y: 400,
        z: 0,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 200,
        y: 550,
        z: 0,
        anchorX: 0.5,
        anchorY: 0.5,
    }
];
var FOREST_GROUND_POSITION = [
    {
        x: 200,
        y: 200,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        x: 500,
        y: 150,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    },
    {
        x: 650,
        y: 150,
        z: 5,
        anchorX: 0.5,
        anchorY: 0,
    }
];
var FOREST_WATER_POSITION = [
    {
        x: 700,
        y: 450,
        z: 4,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 750,
        y: 420,
        z: 4,
        anchorX: 0.5,
        anchorY: 0.5,
    },
    {
        x: 800,
        y: 460,
        z: 4,
        anchorX: 0.5,
        anchorY: 0.5,
    }
];

var FOREST_BACKGROUND_ITEMS_POSITION = [
    {
        x: cc.winSize.width / 2 + 100,
        y: cc.winSize.height - 100,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#cloud-1.png",
        z: 1
    },
    {
        x: cc.winSize.width / 2 - 100,
        y: cc.winSize.height - 70,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#cloud-3.png",
        z: 1
    },
    {
        x: 0,
        y: cc.winSize.height - 120,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#cloud-4.png",
        z:1
    },
    {
        x: cc.winSize.width,
        y: cc.winSize.height/2 - 110,
        anchorX: 1,
        anchorY: 0.5,
        imageName: "#river.png",
        z: 1
    },
    {
        x: 0,
        y: cc.winSize.height / 2 + 80,
        anchorX: 0,
        anchorY: 0.5,
        imageName: "#water-fall.png",
        z: 1 },
    {
        x: 0,
        y: 143,
        anchorX: 0,
        anchorY: 0.5,
        imageName: "#ground.png",
        z: 4
    },
    {
        x: 485,
        y: cc.winSize.height/2 - 50,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-shadow.png",
        z: 5
    },
    {
        x: 485,
        y: cc.winSize.height/2 - 50,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-1.png",
        z: 5
    },
    {
        x: 299,
        y: cc.winSize.height/2 + 50,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-2.png",
        z: 3
    },
    {
        x: 407,
        y: cc.winSize.height/2 + 60,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#tree-3.png",
        z: 2
    },
    {
        x: cc.winSize.width,
        y: cc.winSize.height/2 + 20,
        anchorX: 1,
        anchorY: 0.5,
        imageName: "#tree-4.png",
        z: 5
    },
    {
        x: cc.winSize.width,
        y: cc.winSize.height/2,
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
        z: 6
    },
    {
        x: cc.winSize.width/2 + 300,
        y: 104,
        anchorX: 0.5,
        anchorY: 0.5,
        imageName: "#bush-2.png",
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
        var imagePath = item.imageName;
        var correctPos = cc.p(item.correctX, item.correctY)
        var anchorPoint = cc.p(item.anchorX, item.anchorY);
        var type = item.type;
        if (imagePath == undefined)
            imagePath = "";
        if (type == undefined)
            type = 0;
        if (correctPos == undefined)
            correctPos = cc.p(0,0);
        if (anchorPoint == undefined)
            anchorPoint = cc.p(0.5,0.5);

        var obj = {
            imagePath: imagePath,
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
        return this.getRandomObjects(setId, NUMBER_ITEMS);
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
  DataStore._instance = new DataStore();
  return DataStore._instance;
};