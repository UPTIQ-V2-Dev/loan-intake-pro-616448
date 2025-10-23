import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    rating: number;
    quote: string;
    loanType: string;
    amount: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        location: 'Austin, TX',
        rating: 5,
        quote: 'The application process was incredibly smooth and fast. I got approved for my personal loan within 24 hours and the rates were better than my bank!',
        loanType: 'Personal Loan',
        amount: '$15,000'
    },
    {
        id: 2,
        name: 'Michael Chen',
        location: 'San Francisco, CA',
        rating: 5,
        quote: 'Getting my home mortgage through this platform was stress-free. The team guided me through every step and I closed on my dream home ahead of schedule.',
        loanType: 'Home Mortgage',
        amount: '$450,000'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        location: 'Miami, FL',
        rating: 4,
        quote: 'Great rates on my auto loan and the customer service was outstanding. They made financing my new car simple and affordable.',
        loanType: 'Auto Loan',
        amount: '$28,000'
    },
    {
        id: 4,
        name: 'David Kim',
        location: 'Seattle, WA',
        rating: 5,
        quote: 'As a small business owner, finding the right financing was crucial. They understood my needs and provided a loan that helped my business grow.',
        loanType: 'Business Loan',
        amount: '$75,000'
    },
    {
        id: 5,
        name: 'Lisa Thompson',
        location: 'Chicago, IL',
        rating: 5,
        quote: 'The debt consolidation loan helped me get back on track financially. Lower monthly payments and just one bill to manage. Highly recommend!',
        loanType: 'Personal Loan',
        amount: '$22,000'
    }
];

export const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                data-testid='star-icon'
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <section className='py-16 bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>What Our Customers Say</h2>
                    <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                        Don't just take our word for it. Here's what real customers say about their experience.
                    </p>
                </div>

                <div className='max-w-4xl mx-auto'>
                    <div className='relative'>
                        <Card className='min-h-[300px]'>
                            <CardContent className='p-8'>
                                <div className='text-center'>
                                    <Quote className='w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-6' />

                                    <blockquote className='text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed'>
                                        "{testimonials[currentIndex].quote}"
                                    </blockquote>

                                    <div className='flex justify-center mb-4'>
                                        {renderStars(testimonials[currentIndex].rating)}
                                    </div>

                                    <div className='mb-4'>
                                        <h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                                            {testimonials[currentIndex].location}
                                        </p>
                                    </div>

                                    <div className='flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                                        <span className='bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full'>
                                            {testimonials[currentIndex].loanType}
                                        </span>
                                        <span className='bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full'>
                                            {testimonials[currentIndex].amount}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation Buttons */}
                        <Button
                            variant='outline'
                            size='icon'
                            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4'
                            onClick={prevTestimonial}
                        >
                            <ChevronLeft className='w-4 h-4' />
                        </Button>

                        <Button
                            variant='outline'
                            size='icon'
                            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4'
                            onClick={nextTestimonial}
                        >
                            <ChevronRight className='w-4 h-4' />
                        </Button>
                    </div>

                    {/* Dots Indicator */}
                    <div className='flex justify-center mt-8 gap-2'>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentIndex
                                        ? 'bg-blue-600 dark:bg-blue-400'
                                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className='text-center mt-12'>
                    <p className='text-gray-600 dark:text-gray-400 mb-6'>
                        Ready to join thousands of satisfied customers?
                    </p>
                    <Button
                        size='lg'
                        asChild
                    >
                        <a href='/application'>Start Your Application</a>
                    </Button>
                </div>
            </div>
        </section>
    );
};
