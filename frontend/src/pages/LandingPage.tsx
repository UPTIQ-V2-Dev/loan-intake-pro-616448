import { LandingHero } from '@/components/landing/LandingHero';
import { LoanTypesGrid } from '@/components/landing/LoanTypesGrid';
import { EligibilityPreview } from '@/components/landing/EligibilityPreview';
import { TestimonialCarousel } from '@/components/landing/TestimonialCarousel';

export const LandingPage = () => {
    return (
        <div className='min-h-screen'>
            <LandingHero />
            <LoanTypesGrid />
            <EligibilityPreview />
            <TestimonialCarousel />
        </div>
    );
};
