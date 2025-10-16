import * as PIXI from "pixi.js";
import type { MessageModel as MessageModel } from "./MessageModel";
import type { ChatModel } from "../chat/ChatModel";
import { AvatarView } from "./AvatarView";

export class MessageView extends PIXI.Container {
    private _background: PIXI.Graphics;
    private _chatModel: ChatModel;
    private _messageModel: MessageModel;

    get messageHeight(): number {
        return this._background.height;
    }

    constructor(chatModel: ChatModel, messageModel: MessageModel, maxWidth: number) {
        super();

        this._chatModel = chatModel;
        this._messageModel = messageModel;
        
        const isMobile = (screen.width / screen.height) < 0.6;
        const messageWidth = isMobile ? maxWidth * 0.9 : maxWidth * 0.75;

        const margin = messageWidth * 0.02; // outer margin
        const padding = margin * 0.5; // inner padding inside bubble
        const avatarSize = Math.min(maxWidth * 0.18, 70);
        const isLeft = messageModel.user.position === "left";
        const minBackgroundHeight = avatarSize + margin;


        // position background symmetrically
        const backgroundX = isLeft ? margin : (maxWidth - margin - messageWidth);

        // create background
        this._background = new PIXI.Graphics();
        this._background.beginFill(0x222222);
        this._background.drawRoundedRect(backgroundX, 0, messageWidth, minBackgroundHeight, messageWidth * 0.01);
        this._background.endFill();
        this.addChild(this._background);

        // userName
        const userNameText = new PIXI.Text(messageModel.user.name, {
            fontFamily: "Arial",
            fontSize: 19,
            fontWeight: "bold",
            fill: 0x222222
        });
        userNameText.y = Math.min(-margin, -20);
        if (isLeft) {
            userNameText.x = backgroundX + padding;
        } else {
            // align to right inside background
            userNameText.x = backgroundX + messageWidth - padding - userNameText.width;
        }
        this.addChild(userNameText);

        // create avatar
        const avatar = new AvatarView(avatarSize, messageModel.user);
        avatar.y = padding;
        if (isLeft) {
            avatar.x = backgroundX + padding;
        } else {
            avatar.x = backgroundX + messageWidth - padding - avatarSize;
        }
        this.addChild(avatar);

        // compute text area inside background (space excluding avatar + paddings)
        const textAreaX = isLeft ? (backgroundX + padding + avatarSize + padding) : (backgroundX + padding);
        const textAreaWidth = messageWidth - avatarSize - padding * 3;

        const actualHeight = this._createMessageText(textAreaX, textAreaWidth);

        this._background.height = Math.max(actualHeight, minBackgroundHeight);
    }

    private _createMessageText(startX: number, maxWidth: number): number {

        const textPadding = Math.min(maxWidth * 0.15, 20);
        let currentX = startX;
        let currentY = 10;

        const messageStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 19,
            fill: "#E6E6FA",
            lineHeight: 28,
        });

        const placeText = (text: PIXI.Text) => {

            // For left messages layout left-to-right inside the allowed width.
            // For right messages we still layout left-to-right inside the text area so spacing remains consistent.
            text.x = currentX;
            text.y = currentY;
            this.addChild(text);
            currentX += text.width + 6;
        }

        for (const messagePart of this._messageModel.content) {
            if (messagePart.type === "text") {


                const splitted = messagePart.content.split(" ");
                for (let i = 0; i < splitted.length; i++) {

                    const word = splitted[i];
                    const text = new PIXI.Text(word, messageStyle);

                    placeText(text);

                    if (currentX > startX + maxWidth - textPadding) {
                        currentX = startX;
                        currentY += 30;

                        placeText(text)
                    }
                }
            } else {
                const emojiData = this._chatModel.getEmoji(messagePart.content);

                if (emojiData) {
                    const emoji = PIXI.Sprite.from(emojiData.url);
                    emoji.width = emoji.height = 28;
                    emoji.x = currentX;
                    emoji.y = currentY;
                    this.addChild(emoji);
                    currentX += emoji.width + 8;

                    if (currentX > startX + maxWidth - textPadding) {
                        currentX = startX;
                        currentY += 35;
                    }
                }
            }
        }

        const actualHeight = currentY + 35;

        return actualHeight;
    }
}