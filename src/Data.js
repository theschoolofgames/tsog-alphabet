ROOM_OBJECT_POSITIONS = [];
FOREST_OBJECT_POSITIONS = [];
FOREST_BACKGROUND_POSITIONS = [];
var BEDROOM_ID = 0;
var FOREST_ID = 1;
var BEDROOM_SHADE_ID = 2;
var FOREST_BACKGROUND_ID = 3;

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

    _addObject: function(setId, imageName) {
        var objArray = this.objectSets[setId];
        var imagePath = imageName + ".png";
        if (!imageName)
            imagePath = "";

        var obj = {imagePath: imagePath};
        objArray.push(obj);
    },

    _fillDataStore: function() {
        this.positionSets[BEDROOM_ID] = [];
        this.objectSets[BEDROOM_ID] = [];
        //add object
        this._addObject(BEDROOM_ID, "pen");
        this._addObject(BEDROOM_ID, "cup");
        this._addObject(BEDROOM_ID, "doll");
        this._addObject(BEDROOM_ID, "toy");
        this._addObject(BEDROOM_ID, "ball");
        // add position
        this._addPosition(BEDROOM_ID, 100, 100, 0, 1);
        this._addPosition(BEDROOM_ID, 200, 100, 1, 0.5);
        this._addPosition(BEDROOM_ID, 300, 100, 0, 0.5);
        this._addPosition(BEDROOM_ID, 600, 100, 1, 1);
        this._addPosition(BEDROOM_ID, 500, 100, 0.5, 0);
        this._addPosition(BEDROOM_ID, 900, 300, 0, 0.5);
        this._addPosition(BEDROOM_ID, 700, 400, 0.5, 1);
        this._addPosition(BEDROOM_ID, 300, 300, 1, 0.5);
        this._addPosition(BEDROOM_ID, 400, 400, 0.5, 1);
        this._addPosition(BEDROOM_ID, 800, 300, 0.5, 0.5);
        this._addPosition(BEDROOM_ID, 350, 150, 1, 0);
        this._addPosition(BEDROOM_ID, 550, 250, 0.5, 0.5);
        // ------------------------------
        this.positionSets[FOREST_ID] = [];
        this.objectSets[FOREST_ID] = [];
        // add object
        this._addObject(FOREST_ID, "cat");
        this._addObject(FOREST_ID, "dog");
        this._addObject(FOREST_ID, "bird");
        this._addObject(FOREST_ID, "elephant");
        this._addObject(FOREST_ID, "tiger");
        // add position
        this._addPosition(FOREST_ID, 100, 100, 0.5, 0);
        this._addPosition(FOREST_ID, 200, 100, 0.5, 0);
        this._addPosition(FOREST_ID, 300, 200, 0.5, 0);
        this._addPosition(FOREST_ID, 400, 300, 0.5, 0);
        this._addPosition(FOREST_ID, 500, 400, 0.5, 0);
        this._addPosition(FOREST_ID, 100, 300, 0.5, 0.5);
        this._addPosition(FOREST_ID, 200, 400, 0.5, 1);
        this._addPosition(FOREST_ID, 300, 500, 0.5, 0.5);
        this._addPosition(FOREST_ID, 700, 400, 0.5, 1);
        this._addPosition(FOREST_ID, 500, 500, 0.5, 0.5);
        this._addPosition(FOREST_ID, 850, 150, 0.5, 0);
        this._addPosition(FOREST_ID, 450, 250, 0.5, 0.5);
        // ------------------------------

        this.positionSets[BEDROOM_SHADE_ID] = [];
        this.objectSets[BEDROOM_SHADE_ID] = [];
        //add object
        this._addObject(BEDROOM_SHADE_ID, "pen-shade");
        this._addObject(BEDROOM_SHADE_ID, "cup-shade");
        this._addObject(BEDROOM_SHADE_ID, "doll-shade");
        this._addObject(BEDROOM_SHADE_ID, "toy-shade");
        this._addObject(BEDROOM_SHADE_ID, "ball-shade");
        // add position
        this._addPosition(BEDROOM_SHADE_ID, 150, 150, 0, 1);
        this._addPosition(BEDROOM_SHADE_ID, 250, 150, 1, 0.5);
        this._addPosition(BEDROOM_SHADE_ID, 350, 150, 0, 0.5);
        this._addPosition(BEDROOM_SHADE_ID, 650, 150, 1, 1);
        this._addPosition(BEDROOM_SHADE_ID, 550, 150, 0.5, 0);
        this._addPosition(BEDROOM_SHADE_ID, 950, 350, 0, 0.5);
        this._addPosition(BEDROOM_SHADE_ID, 750, 450, 0.5, 1);
        this._addPosition(BEDROOM_SHADE_ID, 350, 350, 1, 0.5);
        this._addPosition(BEDROOM_SHADE_ID, 450, 450, 0.5, 1);
        this._addPosition(BEDROOM_SHADE_ID, 850, 350, 0.5, 0.5);
        this._addPosition(BEDROOM_SHADE_ID, 400, 200, 1, 0);
        this._addPosition(BEDROOM_SHADE_ID, 600, 300, 0.5, 0.5);

        // -------------------------------
        this.positionSets[FOREST_BACKGROUND_ID] = [];
        this.objectSets[FOREST_BACKGROUND_ID] = [];
        //add position
        this._addPosition(FOREST_BACKGROUND_ID, cc.winSize.width / 2 + 100, cc.winSize.height - 100, 0.5, 0.5, "#cloud-1.png", 1);
        this._addPosition(FOREST_BACKGROUND_ID, cc.winSize.width / 2 - 100, cc.winSize.height - 70, 0.5, 0.5, "#cloud-3.png", 1);
        this._addPosition(FOREST_BACKGROUND_ID, 0, cc.winSize.height - 120, 0.5, 0.5, "#cloud-4.png", 1);
        this._addPosition(FOREST_BACKGROUND_ID, cc.winSize.width, cc.winSize.height/2 - 110, 1, 0.5, "#river.png", 1);
        this._addPosition(FOREST_BACKGROUND_ID, 0, cc.winSize.height / 2 + 80, 0, 0.5, "#water-fall.png", 1);
        this._addPosition(FOREST_BACKGROUND_ID, 0, 143, 0, 0.5, "#ground.png", 4);
        this._addPosition(FOREST_BACKGROUND_ID, cc.winSize.width / 2, cc.winSize.height / 2 - 100, 0.5, 0.5, "BG.jpg", 0);
        this._addPosition(FOREST_BACKGROUND_ID, 485, cc.winSize.height/2 - 50, 0.5, 0.5, "#tree-shadow.png", 5);
        this._addPosition(FOREST_BACKGROUND_ID, 485, cc.winSize.height/2 - 50, 0.5, 0.5, "#tree-1.png", 5);
        this._addPosition(FOREST_BACKGROUND_ID, 299, cc.winSize.height/2 + 50, 0.5, 0.5, "#tree-2.png", 3);
        this._addPosition(FOREST_BACKGROUND_ID, 407, cc.winSize.height/2 + 60, 0.5, 0.5, "#tree-3.png", 2);
        this._addPosition(FOREST_BACKGROUND_ID, cc.winSize.width, cc.winSize.height/2 + 20, 1, 0.5, "#tree-4.png", 5);
        this._addPosition(FOREST_BACKGROUND_ID, cc.winSize.width, cc.winSize.height/2, 1, 0.5, "#tree-5.png", 2);
        this._addPosition(FOREST_BACKGROUND_ID, 0, 76, 0, 0.5, "#bush-1.png", 6);
        this._addPosition(FOREST_BACKGROUND_ID, cc.winSize.width/2 + 300, 104, 0.5, 0.5, "#bush-2.png", 6);
    },

    getPosition: function(setId, index) {
        return this.positionSets[setId][index];
    },

    getObject: function(setId, index) {
        return this.objectSets[setId][index];
    },

    getPositions: function(setId) {
        return this.positionSets[setId];
    },

    getObjects: function(setId) {
        return this.objectSets[setId];
    },

    getRandomItems: function(array, setId, numItems) {
        var items = array[setId];
        var shuffledItems = shuffle(items);
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