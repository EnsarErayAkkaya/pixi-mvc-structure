import { SceneManager } from '../scenes/SceneManager';
import { gsap } from "gsap";

export class EffectManager {
    static shakeCamera(intensity = 10, duration = 0.5) {
        const root = SceneManager.Instance.getCurrentScene();
        if (!root) return;

        const startTime = performance.now();

        const shakeTween = gsap.to(root, {
            duration: duration,
            x: 0,
            y: 0,
            onUpdate: () => {
                const elapsed = (performance.now() - startTime) / 1000;
                if (elapsed < duration) {
                    root.x = (Math.random() - 0.5) * intensity;
                    root.y = (Math.random() - 0.5) * intensity;
                } else {
                    root.x = 0;
                    root.y = 0;
                    shakeTween.kill(); // stop tween
                }
            },
            ease: "none",
        });
    }
}