class HistoryStack {
    constructor(maxSize) {
        this.history = [];
        this.index = -1;
        this.maxSize = maxSize;
    }

    save(data) {
        if (this.history.length > 0 && this.history[this.index] === data)
            return false;

        if (this.index < this.history.length - 1)
            this.history.splice(this.index + 1);

        this.history.push(data);

        if (this.history.length > this.maxSize)
            this.history.shift();

        this.index = this.history.length - 1;

        return true;
    }

    undo() {
        if (this.index > 0)
            return this.history[--this.index];

        return null;
    }

    redo() {
        if (this.index < this.history.length - 1)
            return this.history[++this.index];

        return null;
    }
}

export default HistoryStack;