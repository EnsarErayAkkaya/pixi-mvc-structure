export class ChatModel {
    private _chatData: ChatData;

    get dialogueCount():number{
        return this._chatData.dialogue.length;
    }

    constructor(chatHistory: ChatData | null) {
        if (chatHistory) {
            this._chatData = chatHistory;
        }
        else {
            this._chatData = {
                dialogue: [],
                avatars: [],
                emojies: []
            };
        }
    }

    getEmoji(name: string): Emoji | undefined {
        return this._chatData.emojies.find(x => x.name == name);
    }

    getUser(name: string): ChatUser | undefined {
        return this._chatData.avatars.find(x => x.name == name);
    }
    getDialogue(index: number) {
        return this._chatData.dialogue[index];
    }

}

export interface ChatData {
    dialogue: ChatMessage[];
    avatars: ChatUser[];
    emojies: Emoji[];
}

export interface ChatMessage {
    name: string;
    text: string;
}

export interface ChatUser {
    name: string;
    url: string;
    position: ChatUserPosition;
}

export interface Emoji {
    name: string;
    url: string;
}

export type ChatUserPosition = "left" | "right";