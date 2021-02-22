class Error {
    
    static errorCounter = 0;
    
    constructor(message) {
        this._id = ++Error.errorCounter;
        this._message = message;
    }

    get id() {
        return this._id;
    }

    get message() {
        return this._message;
    }

    set message(message) {
        this._message = message;
    }

}