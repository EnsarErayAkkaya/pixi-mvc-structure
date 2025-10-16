import type { ChatUser } from "../chat/ChatModel";

export class MessageModel {
    content: MessageContent[];
    user: ChatUser;

    constructor(text: string, user: ChatUser) {
        this.content = this._parseMessage(text);
        this.user = user;
    }

    _parseMessage(message: string = ""): MessageContent[] {
        const regex = /\{(.*?)\}/g;
        const parts: MessageContent[] = [];

        let lastIndex = 0;
        let match;

        while ((match = regex.exec(message)) !== null) {

            if (match.index > lastIndex) {
                parts.push({ content: message.slice(lastIndex, match.index), type: "text" });
            }

            parts.push({ type: "emoji", content: match[1] });

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < message.length) {
            parts.push({ content: message.slice(lastIndex), type: "text" });
        }

        return parts;
    }
}

interface MessageContent {
    content: string;
    type: "text" | "emoji";
}