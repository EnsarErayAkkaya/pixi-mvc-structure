/**
 * ChatController
 * - Builds message MVC components from ChatModel and lays them out in ChatView.
 */
import { MessageController } from "../message/MessageController";
import { MessageModel } from "../message/MessageModel";
import { ChatModel } from "./ChatModel";
import { ChatView } from "./ChatView";

export class ChatController {
    private _chatView: ChatView;
    constructor(chatModel: ChatModel, chatView: ChatView) {

        this._chatView = chatView;

        let currentY = -chatView.chatHeight * 0.45;

        for (let i = 0; i < chatModel.dialogueCount; i++) {

            const dialogue = chatModel.getDialogue(i);
            const user = chatModel.getUser(dialogue?.name)

            if (dialogue && user) {
                const messageModel = new MessageModel(dialogue.text, user);

                const messageController = new MessageController(messageModel, chatModel, chatView.chatWidth);
                messageController.setMessageParent(chatView.scrollContainer);

                messageController.setMessagePosition(-chatView.chatWidth * 0.5, currentY);

                currentY += messageController.messageHeight + 40;
            }
        }

        chatView.addEndOfChatText();
    }

    dispose() {
        this._chatView.dispose();
    }
}