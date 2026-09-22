import { useEffect, useRef, useState } from "react";
import ShimmerBorderCard from "@/components/shimmer-border-card";
import {
    ArrowUp,
    ChevronDown,
    Code,
    File,
    Image as ImageIcon,
    LayoutGrid,
    LayoutTemplate,
    Lightbulb,
    List,
    Mic,
    Palette,
    Plus,
    Scale,
    Search,
    Slash,
    Zap,
    type LucideIcon,
} from "lucide-react";

type Mode = "Fast" | "Balanced" | "Thoughtful";

type PanelId =
    | "add"
    | "tools"
    | "layout"
    | "color"
    | "mode"
    | null;

export interface PromptBarProps {
    placeholder?: string;
    onSubmit?: (value: string) => void;
    className?: string;
}

const modeIcons: Record<Mode, LucideIcon> = {
    Fast: Zap,
    Balanced: Scale,
    Thoughtful: Lightbulb,
};

const accentColors = [
    "#3a3a3f",
    "#3b82f6",
    "#ff7a5c",
    "#4fd1a5",
    "#c98bff",
];

export default function PromptBar({
    placeholder = "Ask Movie Assistant anything...",
    onSubmit,
    className,
}: PromptBarProps) {
    const [value, setValue] = useState("");
    const [openPanel, setOpenPanel] = useState<PanelId>(null);
    const [mode, setMode] = useState<Mode>("Balanced");
    const [recording, setRecording] = useState(false);
    const [accent, setAccent] = useState(accentColors[1]);
    const [sending, setSending] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                rootRef.current &&
                !rootRef.current.contains(e.target as Node)
            ) {
                setOpenPanel(null);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const togglePanel = (id: PanelId) => {
        setOpenPanel((current) => (current === id ? null : id));
    };

    const handleSubmit = () => {
        if (!value.trim()) {
            return;
        }

        onSubmit?.(value.trim());

        setSending(true);

        setTimeout(() => {
            setSending(false);
        }, 350);
    };

    const ModeIcon = modeIcons[mode];

    const iconButton =
        "flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50";

    const dropdown =
        "absolute top-11 z-20 rounded-2xl border border-zinc-700 bg-zinc-950 p-1.5 text-zinc-200 shadow-2xl shadow-black/50 backdrop-blur-xl";

    return (
        <div
            ref={rootRef}
            className={[
                "relative w-full max-w-[620px]",
                className ?? "",
            ].join(" ")}
        >
            <ShimmerBorderCard>
                <div className="bg-zinc-950/95 p-5 pb-4 backdrop-blur-xl">
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        rows={1}
                        aria-label={placeholder}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        className="mb-6 w-full resize-none bg-transparent text-base text-white caret-indigo-400 placeholder:text-zinc-500 focus:outline-none"
                    />

                    <div className="flex items-center justify-between">
                        {/* LEFT CONTROLS */}
                        <div className="flex items-center gap-1">
                            {/* ADD */}
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label="Add files"
                                    aria-expanded={openPanel === "add"}
                                    onClick={() => togglePanel("add")}
                                    className={iconButton}
                                >
                                    <Plus size={20} />
                                </button>

                                {openPanel === "add" && (
                                    <div
                                        className={`${dropdown} left-0 min-w-[180px]`}
                                    >
                                        <MenuItem
                                            icon={File}
                                            label="Upload file"
                                            onClick={() =>
                                                setOpenPanel(null)
                                            }
                                        />

                                        <MenuItem
                                            icon={ImageIcon}
                                            label="Upload image"
                                            onClick={() =>
                                                setOpenPanel(null)
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            {/* TOOLS */}
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label="Tools"
                                    aria-expanded={openPanel === "tools"}
                                    onClick={() => togglePanel("tools")}
                                    className={iconButton}
                                >
                                    <Slash size={18} />
                                </button>

                                {openPanel === "tools" && (
                                    <div
                                        className={`${dropdown} left-0 min-w-[190px]`}
                                    >
                                        <MenuItem
                                            icon={Search}
                                            label="Search movies"
                                            onClick={() =>
                                                setOpenPanel(null)
                                            }
                                        />

                                        <MenuItem
                                            icon={ImageIcon}
                                            label="Movie images"
                                            onClick={() =>
                                                setOpenPanel(null)
                                            }
                                        />

                                        <MenuItem
                                            icon={Code}
                                            label="Movie details"
                                            onClick={() =>
                                                setOpenPanel(null)
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT CONTROLS */}
                        <div className="flex items-center gap-1">
                            {/* LAYOUT */}
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label="Layout"
                                    aria-expanded={openPanel === "layout"}
                                    onClick={() => togglePanel("layout")}
                                    className={iconButton}
                                >
                                    <LayoutGrid size={18} />
                                </button>

                                {openPanel === "layout" && (
                                    <div
                                        className={`${dropdown} right-0 min-w-[170px]`}
                                    >
                                        <MenuItem
                                            icon={List}
                                            label="Compact view"
                                            onClick={() =>
                                                setOpenPanel(null)
                                            }
                                        />

                                        <MenuItem
                                            icon={LayoutTemplate}
                                            label="Large view"
                                            onClick={() =>
                                                setOpenPanel(null)
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            {/* COLOUR */}
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label="Colour palette"
                                    aria-expanded={openPanel === "color"}
                                    onClick={() => togglePanel("color")}
                                    className={iconButton}
                                >
                                    <Palette size={18} />
                                </button>

                                {openPanel === "color" && (
                                    <div
                                        className={`${dropdown} right-0 flex gap-2 p-3`}
                                    >
                                        {accentColors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                aria-label={`Choose colour ${color}`}
                                                aria-pressed={
                                                    accent === color
                                                }
                                                onClick={() =>
                                                    setAccent(color)
                                                }
                                                style={{
                                                    background: color,
                                                }}
                                                className={[
                                                    "h-5 w-5 rounded-full transition-transform hover:scale-110 focus-visible:outline-none",
                                                    accent === color
                                                        ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950"
                                                        : "",
                                                ].join(" ")}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* AI MODE */}
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-haspopup="listbox"
                                    aria-expanded={openPanel === "mode"}
                                    onClick={() => togglePanel("mode")}
                                    className="mx-1 flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
                                >
                                    <ModeIcon
                                        size={14}
                                        className="text-indigo-300"
                                    />

                                    {mode}

                                    <ChevronDown
                                        size={15}
                                        className="text-zinc-500"
                                    />
                                </button>

                                {openPanel === "mode" && (
                                    <div
                                        role="listbox"
                                        className={`${dropdown} right-0 min-w-[160px]`}
                                    >
                                        {(
                                            Object.keys(
                                                modeIcons,
                                            ) as Mode[]
                                        ).map((currentMode) => {
                                            const Icon =
                                                modeIcons[currentMode];

                                            return (
                                                <MenuItem
                                                    key={currentMode}
                                                    icon={Icon}
                                                    label={currentMode}
                                                    selected={
                                                        currentMode ===
                                                        mode
                                                    }
                                                    onClick={() => {
                                                        setMode(
                                                            currentMode,
                                                        );

                                                        setOpenPanel(
                                                            null,
                                                        );
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* MICROPHONE */}
                            <button
                                type="button"
                                aria-label="Microphone"
                                aria-pressed={recording}
                                onClick={() =>
                                    setRecording(
                                        (current) => !current,
                                    )
                                }
                                className={[
                                    "flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50",
                                    recording
                                        ? "bg-red-500/10 text-red-400"
                                        : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
                                ].join(" ")}
                            >
                                <Mic size={18} />
                            </button>

                            {/* SEND */}
                            <button
                                type="button"
                                aria-label="Send"
                                onClick={handleSubmit}
                                className={[
                                    "flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400 hover:shadow-indigo-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70",
                                    sending
                                        ? "scale-90"
                                        : "scale-100",
                                ].join(" ")}
                            >
                                <ArrowUp size={17} />
                            </button>
                        </div>
                    </div>
                </div>
            </ShimmerBorderCard>
        </div>
    );
}

function MenuItem({
    icon: Icon,
    label,
    onClick,
    selected,
}: {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    selected?: boolean;
}) {
    return (
        <button
            type="button"
            role="option"
            aria-selected={selected}
            onClick={onClick}
            className={[
                "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none",
                selected
                    ? "bg-indigo-400/10 text-indigo-300"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
            ].join(" ")}
        >
            <Icon
                size={16}
                className={
                    selected
                        ? "text-indigo-300"
                        : "text-zinc-500"
                }
            />

            {label}
        </button>
    );
}