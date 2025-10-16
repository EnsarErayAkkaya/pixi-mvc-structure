import * as PIXI from "pixi.js";

export class ChatView extends PIXI.Container {
    private _background: PIXI.Graphics;
    private _scrollContainer: PIXI.Container;
    private _wheelHandler: (e: WheelEvent) => void;

    get chatWidth(): number {
        return this._background.width;
    }

    get chatHeight(): number {
        return this._background.height;
    }

    get scrollContainer(): PIXI.Container {
        return this._scrollContainer;
    }

    private dragging = false;
    private lastPosition = new PIXI.Point();
    private velocity = new PIXI.Point();
    private readonly friction = 0.95; // smooth inertia

    constructor(width: number = 1920, height: number = 1080) {
        super();

        // add background
        this._background = new PIXI.Graphics()
        this._background.beginFill(0x11ddaa);
        this._background.drawRoundedRect(0, 0, width, height, 15);
        this._background.endFill();
        this._background.pivot.set(width / 2, height / 2);
        this._background.eventMode = "static";

        this.addChild(this._background);


        this._scrollContainer = new PIXI.Container();
        this._scrollContainer.eventMode = "static";
        this.addChild(this._scrollContainer);


        const maskGraphic = new PIXI.Graphics()
        maskGraphic.beginFill(0x11ddaa);
        maskGraphic.drawRoundedRect(0, 0, width, height, 15);
        maskGraphic.endFill();
        maskGraphic.pivot.set(width / 2, height / 2);

        this.mask = maskGraphic;
        this.addChild(maskGraphic);

        let scrollY = 0;

        // mouse wheel event (store handler so we can remove it in dispose)
        this._wheelHandler = (e: WheelEvent) => {
            scrollY += e.deltaY * -0.5; // scroll speed
            this._setScrollY(scrollY);
        };
        window.addEventListener("wheel", this._wheelHandler);

        // Event listeners
        // user can drag with both background or message items
        this._background.on("pointerdown", this._onPointerDown, this);
        this._background.on("pointerup", this._onPointerUp, this);
        this._background.on("pointerupoutside", this._onPointerUp, this);
        this._background.on("pointermove", this._onPointerMove, this);

        this._scrollContainer.on("pointerdown", this._onPointerDown, this);
        this._scrollContainer.on("pointerup", this._onPointerUp, this);
        this._scrollContainer.on("pointerupoutside", this._onPointerUp, this);
        this._scrollContainer.on("pointermove", this._onPointerMove, this);

        // For smooth scrolling after release
        PIXI.Ticker.shared.add(this._update, this);
    }

    dispose() {
        // remove ticker
        PIXI.Ticker.shared.remove(this._update, this);

        // remove global wheel handler
        if (this._wheelHandler) window.removeEventListener("wheel", this._wheelHandler);

        // remove pointer listeners
        this._background.off("pointerdown", this._onPointerDown, this);
        this._background.off("pointerup", this._onPointerUp, this);
        this._background.off("pointerupoutside", this._onPointerUp, this);
        this._background.off("pointermove", this._onPointerMove, this);

        this._scrollContainer.off("pointerdown", this._onPointerDown, this);
        this._scrollContainer.off("pointerup", this._onPointerUp, this);
        this._scrollContainer.off("pointerupoutside", this._onPointerUp, this);
        this._scrollContainer.off("pointermove", this._onPointerMove, this);
    }

    private _onPointerDown(e: PIXI.FederatedPointerEvent) {
        this.dragging = true;
        this.lastPosition.copyFrom(e.global);
        this.velocity.set(0, 0);
    }

    private _onPointerMove(e: PIXI.FederatedPointerEvent) {
        if (!this.dragging) return;

        const current = e.global;
        const dy = current.y - this.lastPosition.y;

        // Move content (the first child after mask)
        this._setScrollY(this._scrollContainer.y + dy);

        // Save velocity for inertia
        this.velocity.set(0, dy);

        this.lastPosition.copyFrom(current);
    }

    private _onPointerUp() {
        this.dragging = false;
    }

    private _update() {
        if (!this.dragging) {
            // Apply friction/inertia
            this._setScrollY(this._scrollContainer.y + this.velocity.y);
            this.velocity.y *= this.friction;

            // Stop tiny movement
            if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;
        }
    }

    private _setScrollY(y: number) {
        const maxScroll = -(this._scrollContainer.height - this.chatHeight);
        this._scrollContainer.y = Math.min(0, Math.max(y, maxScroll - this.chatHeight * 0.25));
    }

    addEndOfChatText() {
        // Label
        const text = new PIXI.Text("End of Chat", {
            fontFamily: "Arial",
            fontSize: 28,
            fontWeight: "bold",
            fill: 0x222244,
            align: "center",
        });

        text.anchor.set(0.5);

        // compute position relative to the last message inside the scroll container
        const children = this._scrollContainer.children;
        const last = children.length > 0 ? children[children.length - 1] : null;
        const padding = this.chatHeight * 0.1;

        const lastBottom = last ? (last.y + (('height' in last) ? (last as any).height : 0)) : 0;

        // center horizontally inside the mask and place after the last child
        text.x = 0;
        text.y = lastBottom + padding;

        // add the label to the scroll container so it scrolls with messages
        this._scrollContainer.addChild(text);
    }
}