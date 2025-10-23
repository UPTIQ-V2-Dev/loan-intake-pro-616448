import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingHero = () => {
    return (
        <section className='bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
                    <div className='flex-1 max-w-2xl'>
                        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
                            Get the loan you need,{' '}
                            <span className='text-blue-600 dark:text-blue-400'>when you need it</span>
                        </h1>
                        <p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>
                            Quick approvals, competitive rates, and personalized loan solutions for all your financial
                            needs. Start your application in minutes.
                        </p>

                        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                            <Button
                                asChild
                                size='lg'
                                className='flex items-center gap-2'
                            >
                                <Link to='/application'>
                                    Start Application
                                    <ArrowRight className='w-5 h-5' />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant='outline'
                                size='lg'
                            >
                                <Link to='/calculator'>Calculate Payments</Link>
                            </Button>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                            <div className='flex items-center gap-2'>
                                <CheckCircle className='w-5 h-5 text-green-500' />
                                <span className='text-sm text-gray-600 dark:text-gray-400'>Fast approval</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckCircle className='w-5 h-5 text-green-500' />
                                <span className='text-sm text-gray-600 dark:text-gray-400'>Competitive rates</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <CheckCircle className='w-5 h-5 text-green-500' />
                                <span className='text-sm text-gray-600 dark:text-gray-400'>Secure process</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 max-w-lg'>
                        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8'>
                            <h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-6'>Quick Stats</h3>
                            <div className='grid grid-cols-2 gap-6'>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                                        24hrs
                                    </div>
                                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                                        Average approval time
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>4.9★</div>
                                    <div className='text-sm text-gray-600 dark:text-gray-400'>Customer rating</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                                        $50K+
                                    </div>
                                    <div className='text-sm text-gray-600 dark:text-gray-400'>Loans funded</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                                        3.99%
                                    </div>
                                    <div className='text-sm text-gray-600 dark:text-gray-400'>Starting APR</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
