class Coordinate {
    static coordCounter = 0;
    constructor(coord_x, coord_z) {
        this._id = ++Coordinate.coordCounter;
        this._x = coord_x;
        this._z = coord_z;
    }

    get id() {
        return this._id;
    }

    get x() {
        return this._x;
    }

    get z() {
        return this._z;
    }

}