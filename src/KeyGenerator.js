class KeyGenerator {
    constructor() {
        this.counter = 0;
    }

    generateKey() {
        return ++this.counter;
    }

    generateKeys(length) {
        const keys = [];

        for (let i = 0; i < length; ++i)
            keys.push(this.generateKey());

        return keys;
    }
}

export default KeyGenerator;