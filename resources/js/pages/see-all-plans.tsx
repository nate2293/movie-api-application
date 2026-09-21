import { DarkGradientPricing } from "../components/see-all-plans";
import DrawOutlineButton from "@/components/draw-outline-button";
import { Link } from "@inertiajs/react";
import { home, login } from "@/routes";
import GlowingDivider from "@/components/glowing-divider";

export default function SeeAllPlans() {
    return (
        <>
            <div className="relative">
                <div className="absolute top-6 left-6 z-50">
                    <Link href={home()}>
                        <DrawOutlineButton>Back</DrawOutlineButton>
                    </Link>
                </div>

                <div className="absolute top-6 right-6 z-50">
                    <Link href={login()}>
                        <DrawOutlineButton>Sign In</DrawOutlineButton>
                    </Link>
                </div>

                <DarkGradientPricing />
                <GlowingDivider />
            </div>
        </>
    );
}
