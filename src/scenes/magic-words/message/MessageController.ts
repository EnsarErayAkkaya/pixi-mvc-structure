import * as PIXI from "pixi.js";

import { MessageModel } from "./MessageModel";
import { MessageView } from "./MessageView";
import type { ChatModel } from "../chat/ChatModel";

export class MessageController {
    private _messageView: MessageView;

    get messageHeight():number{
        return this._messageView.messageHeight;
    }

    constructor(messageModel: MessageModel, chatModel: ChatModel, maxWidth: number) {
        this._messageView = new MessageView(chatModel, messageModel, maxWidth);
    }

    setMessagePosition(x: number, y: number) {
        this._messageView.position.set(x, y);
    }

    setMessageParent(parent: PIXI.Container) {
        parent.addChild(this._messageView);
    }
}