import { useEffect } from "react";

const BubbleText = () => {
    useEffect(() => {
        const spans = document.querySelectorAll(
            ".hover-text span"
        ) as NodeListOf<HTMLSpanElement>;

        spans.forEach((span) => {
            span.addEventListener("mouseenter", function (this: typeof span) {
                this.style.fontWeight = "900";
                this.style.color = "rgb(239, 246, 255)";

                const leftNeighbor =
                    this.previousElementSibling as HTMLSpanElement;

                const rightNeighbor =
                    this.nextElementSibling as HTMLSpanElement;

                if (leftNeighbor) {
                    leftNeighbor.style.fontWeight = "500";
                    leftNeighbor.style.color = "rgb(147, 197, 253)";
                }

                if (rightNeighbor) {
                    rightNeighbor.style.fontWeight = "500";
                    rightNeighbor.style.color = "rgb(147, 197, 253)";
                }
            });

            span.addEventListener("mouseleave", function (this: typeof span) {
                this.style.fontWeight = "100";
                this.style.color = "rgb(96, 165, 250)";

                const leftNeighbor =
                    this.previousElementSibling as HTMLSpanElement;

                const rightNeighbor =
                    this.nextElementSibling as HTMLSpanElement;

                if (leftNeighbor) {
                    leftNeighbor.style.fontWeight = "100";
                    leftNeighbor.style.color = "rgb(96, 165, 250)";
                }

                if (rightNeighbor) {
                    rightNeighbor.style.fontWeight = "100";
                    rightNeighbor.style.color = "rgb(96, 165, 250)";
                }
            });
        });
    }, []);

    return (
        <h2 className="hover-text text-3xl font-extrabold text-blue-400 md:text-4xl">
            <Text>Trending Now</Text>
        </h2>
    );
};

const Text = ({ children }: { children: string }) => {
    return (
        <>
            {children.split("").map((child, idx) => (
                <span
                    key={idx}
                    style={{
                        transition: "0.35s font-weight, 0.35s color",
                    }}
                >
                    {child}
                </span>
            ))}
        </>
    );
};

export default BubbleText;