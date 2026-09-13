import { useEffect, useRef } from "react";
import styles from "./complexButton.module.css";

const ShinySkeuButton = () => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const button = btnRef.current;

        if (!button) return;

        const handleMouseOver = () => {
            parentRef.current?.style.setProperty("--size", "250px");
            parentRef.current?.style.setProperty(
                "--shineColor",
                "rgba(255, 255, 255, 0.3)",
            );
        };

        const handleMouseLeave = () => {
            parentRef.current?.style.setProperty("--size", "0px");
            parentRef.current?.style.setProperty(
                "--shineColor",
                "rgba(255, 255, 255, 0.0)",
            );
        };

        const handleMouseMove = (e: MouseEvent) => {
            parentRef.current?.style.setProperty("--x", e.offsetX + "px");
            parentRef.current?.style.setProperty("--y", e.offsetY + "px");
        };

        button.addEventListener("mouseover", handleMouseOver);
        button.addEventListener("mouseleave", handleMouseLeave);
        button.addEventListener("mousemove", handleMouseMove);

        return () => {
            button.removeEventListener("mouseover", handleMouseOver);
            button.removeEventListener("mouseleave", handleMouseLeave);
            button.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={parentRef} className={styles.skeuParent}>
            <button
                ref={btnRef}
                className={`relative cursor-pointer overflow-hidden rounded bg-[radial-gradient(100%_100%_at_100%_0%,_#60a5fa_0%,_#2563eb_100%)] px-4 py-2 font-mono text-white shadow-md transition-[box-shadow_0.15s_ease,_transform_0.15s_ease] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5 ${styles.skeu}`}
            >
                Join for $9.99
            </button>
        </div>
    );
};

export default ShinySkeuButton;