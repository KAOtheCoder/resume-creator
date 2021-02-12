function createChangeProxy(target, onChange = (target, key, value) => {}) {
    return new Proxy(target, {
        set: (target, key, value) => {
            if (target[key] !== value) {
                target[key] = value;
                onChange(target, key, value);
            }
            
            return true;
        }
    });
}

export default createChangeProxy;