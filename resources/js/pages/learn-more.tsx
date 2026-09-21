import { Head } from "@inertiajs/react";
import PlanFeatures from "@/components/plan-features";
import GlowingDivider from "@/components/glowing-divider";
import LearnMoreHero from "@/components/learn-more-hero";
import LearnMoreBanner from "@/components/learn-more-banner";
import Footer from "@/components/footer";
import { TabsFAQ } from "@/components/tabs-faq";

export default function LearnMore() {
    return (
        <>
            <Head title="Learn More" />

            <LearnMoreHero />
            <GlowingDivider />
            <PlanFeatures />
            <LearnMoreBanner />
            <TabsFAQ />
            <Footer />
        </>
    );
}
