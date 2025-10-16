import * as PIXI from "pixi.js";
import type { ChatUser } from "../chat/ChatModel";

export class AvatarView extends PIXI.Container {
    constructor(size: number, chatUser: ChatUser) {
        super();

        const avatarBorder = new PIXI.Graphics();
        avatarBorder.beginFill(0x444444);
        avatarBorder.drawCircle(size / 2, size / 2, size / 2);
        this.addChild(avatarBorder);

        const avatar = PIXI.Sprite.from(chatUser.url);
        avatar.width = size - 6;
        avatar.height = size - 6;
        avatar.x = 3;
        avatar.y = 3;

        const avatarMask = new PIXI.Graphics();
        avatarMask.beginFill(0xffffff);
        avatarMask.drawCircle(
            size / 2,
            size / 2,
            (size - 6) / 2
        );

        avatarMask.endFill();
        avatar.mask = avatarMask;
        this.addChild(avatarMask);
        this.addChild(avatar);
    }
}