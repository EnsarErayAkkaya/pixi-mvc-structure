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

    constructor(app: PIXI.Application) {
        super(app);
        this.addBackButton();
    }

    async load(): Promise<void> {

        const loadingText = new LoadingText("Loading chat history...");
        loadingText.x = this.app.renderer.width * 0.5;
        loadingText.y = this.app.renderer.height * 0.5;

        this.addChild(loadingText);

        const response = await Client.fetch<ChatData>(this._magicWordsUrl)

        if (!response.data && response.errorMessages.length > 0) {

            loadingText.LoadFailed("Failed to load chat history {sad}");
            Logger.Instance.warn(response.errorMessages[0])

            return
        }

        this.removeChild(loadingText);
        Logger.Instance.log(response.data);

        // create chat MVC
        const chatModel = new ChatModel(response.data);

        const chatView = new ChatView(this.app.renderer.width * 0.9, this.app.renderer.height * 0.9);
        //chatView.fitGraphicToParent(this.app.renderer.width, this.app.renderer.height);
        chatView.position.set(this.app.renderer.width / 2, this.app.renderer.height / 2);
        this.addChild(chatView);

        const chat = new ChatController(chatModel, chatView);
    }

    unload(): Promise<void> {
        return Promise.resolve();
    }
}