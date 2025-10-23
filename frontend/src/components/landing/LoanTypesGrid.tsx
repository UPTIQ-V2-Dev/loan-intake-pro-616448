import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { loanService } from '@/services/loanService';
import { Link } from 'react-router-dom';
import { Home, Car, CreditCard, Building2, ArrowRight, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const loanIcons = {
    'Personal Loan': CreditCard,
    'Home Mortgage': Home,
    'Auto Loan': Car,
    'Business Loan': Building2
};

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export const LoanTypesGrid = () => {
    const {
        data: loanTypes,
        isLoading,
        error
    } = useQuery({
        queryKey: ['loanTypes'],
        queryFn: loanService.getLoanTypes
    });

    if (isLoading) {
        return (
            <section className='py-16 bg-white dark:bg-gray-900'>
                <div className='container mx-auto px-4'>
                    <div className='text-center mb-12'>
                        <Skeleton className='h-10 w-64 mx-auto mb-4' />
                        <Skeleton className='h-6 w-96 mx-auto' />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Card
                                key={i}
                                className='h-96'
                            >
                                <CardHeader>
                                    <Skeleton className='h-8 w-8 mb-4' />
                                    <Skeleton className='h-6 w-32' />
                                    <Skeleton className='h-4 w-full' />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className='h-20 w-full mb-4' />
                                    <Skeleton className='h-10 w-full' />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className='py-16 bg-white dark:bg-gray-900'>
                <div className='container mx-auto px-4'>
                    <div className='text-center'>
                        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Our Loan Products</h2>
                        <p className='text-red-600 dark:text-red-400'>
                            Unable to load loan types. Please try again later.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='py-16 bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Choose Your Loan Type</h2>
                    <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                        We offer a variety of loan products to meet your specific financial needs. Select the option
                        that's right for you.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {loanTypes?.map(loanType => {
                        const IconComponent = loanIcons[loanType.name as keyof typeof loanIcons] || CreditCard;

                        return (
                            <Card
                                key={loanType.id}
                                className='group hover:shadow-lg transition-all duration-300 h-full flex flex-col'
                            >
                                <CardHeader className='text-center'>
                                    <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4'>
                                        <IconComponent className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                                    </div>
                                    <CardTitle className='text-xl font-semibold text-gray-900 dark:text-white'>
                                        {loanType.name}
                                    </CardTitle>
                                    <CardDescription className='text-sm text-gray-600 dark:text-gray-400'>
                                        {loanType.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className='flex-1 flex flex-col'>
                                    <div className='flex-1'>
                                        <div className='grid grid-cols-2 gap-4 mb-6'>
                                            <div className='flex items-center gap-2'>
                                                <DollarSign className='w-4 h-4 text-gray-500' />
                                                <div>
                                                    <div className='text-sm font-medium text-gray-900 dark:text-white'>
                                                        {formatCurrency(loanType.minAmount)} -{' '}
                                                        {formatCurrency(loanType.maxAmount)}
                                                    </div>
                                                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                                                        Amount
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <TrendingUp className='w-4 h-4 text-gray-500' />
                                                <div>
                                                    <div className='text-sm font-medium text-gray-900 dark:text-white'>
                                                        {loanType.interestRate}%
                                                    </div>
                                                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                                                        Starting APR
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mb-6'>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <Calendar className='w-4 h-4 text-gray-500' />
                                                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                                                    Terms Available
                                                </span>
                                            </div>
                                            <div className='flex flex-wrap gap-1'>
                                                {loanType.termOptions.slice(0, 3).map(term => (
                                                    <Badge
                                                        key={term}
                                                        variant='secondary'
                                                        className='text-xs'
                                                    >
                                                        {term} mo
                                                    </Badge>
                                                ))}
                                                {loanType.termOptions.length > 3 && (
                                                    <Badge
                                                        variant='secondary'
                                                        className='text-xs'
                                                    >
                                                        +{loanType.termOptions.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className='mb-6'>
                                            <h4 className='text-sm font-medium text-gray-900 dark:text-white mb-2'>
                                                Key Features
                                            </h4>
                                            <ul className='text-xs text-gray-600 dark:text-gray-400 space-y-1'>
                                                {loanType.features.slice(0, 3).map((feature, index) => (
                                                    <li
                                                        key={index}
                                                        className='flex items-start gap-2'
                                                    >
                                                        <span className='text-green-500 mt-1'>•</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <Button
                                        asChild
                                        className='w-full group-hover:bg-blue-700 transition-colors'
                                    >
                                        <Link
                                            to='/application'
                                            state={{ selectedLoanType: loanType.id }}
                                            className='flex items-center gap-2'
                                        >
                                            Apply Now
                                            <ArrowRight className='w-4 h-4' />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className='text-center mt-12'>
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>Not sure which loan is right for you?</p>
                    <Button
                        asChild
                        variant='outline'
                        size='lg'
                    >
                        <Link to='/calculator'>Use Our Loan Calculator</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};
