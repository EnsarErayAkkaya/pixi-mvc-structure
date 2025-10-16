/**
 * MagicWords scene
 * - Demonstrates a chat-like UI with messages and avatars. Loads mock data and builds MVC components.
 */
import * as PIXI from "pixi.js";
import { BaseScene } from "../../utils/scenes/BaseScene";
import { Client } from "../../utils/api/Client";
import { Logger } from "../../utils/logger/Logger";
import { LoadingText } from "../common/LoadingText";
import { ChatController } from "./chat/ChatController";
import { ChatModel, type ChatData } from "./chat/ChatModel";
import { ChatView } from "./chat/ChatView";

export class MagicWords extends BaseScene {

    static Id = "magic_words";
    private _magicWordsUrl = "https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords";

    private _chatController: ChatController | undefined;
    private _loadingText: LoadingText;

    constructor(app: PIXI.Application) {
        super(app);
        this.addBackButton();

        this._loadingText = new LoadingText("Loading chat history...");
        this._loadingText.x = this.app.renderer.width * 0.5;
        this._loadingText.y = this.app.renderer.height * 0.5;

        this.addChild(this._loadingText);
    }

    async load(): Promise<void> {

        const response = await Client.fetch<ChatData>(this._magicWordsUrl)

        if (!response.data && response.errorMessages.length > 0) {

            this._loadingText.LoadFailed("Failed to load chat history {sad}");
            Logger.Instance.warn(response.errorMessages[0])

            return
        }

        this.removeChild(this._loadingText);
        Logger.Instance.log(response.data);

        // create chat MVC
        const chatModel = new ChatModel(response.data);

        const chatView = new ChatView(this.app.renderer.width * 0.9, this.app.renderer.height * 0.9);
        //chatView.fitGraphicToParent(this.app.renderer.width, this.app.renderer.height);
        chatView.position.set(this.app.renderer.width / 2, this.app.renderer.height / 2);
        this.addChild(chatView);

        this._chatController = new ChatController(chatModel, chatView);
    }

    unload(): Promise<void> {
        this._chatController?.dispose();
        return Promise.resolve();
    }
}