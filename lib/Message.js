class Message {
    constructor(from, to, type, data) {
        this.type = type;
        this.data = data;
        this.from = from;
        this.to = to;
    }

    toString() {
        return JSON.stringify({
            type: this.type,
            data: this.data,
            from: this.from,
            to: this.to
        })
    }

    static parse(msgStr) {
        const msgJson = JSON.parse(msgStr);
        return new Message(msgJson.from, msgJson.to, msgJson.type, msgJson.data);
    }

    static build(type, data) {
        return new Message(type, data);
    }
}

export default Message;