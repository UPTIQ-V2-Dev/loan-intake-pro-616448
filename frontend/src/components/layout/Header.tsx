import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export const Header = () => {
    return (
        <header className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'>
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    <Link
                        to='/'
                        className='flex items-center gap-2'
                    >
                        <Building2 className='w-8 h-8 text-blue-600 dark:text-blue-400' />
                        <span className='text-xl font-bold text-gray-900 dark:text-white'>LoanFlow</span>
                    </Link>

                    <nav className='hidden md:flex items-center gap-6'>
                        <Link
                            to='/calculator'
                            className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                        >
                            Calculator
                        </Link>
                        <Link
                            to='/status'
                            className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                        >
                            Check Status
                        </Link>
                        <Link
                            to='/dashboard'
                            className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
                        >
                            Dashboard
                        </Link>
                    </nav>

                    <div className='flex items-center gap-3'>
                        <Button
                            variant='ghost'
                            asChild
                        >
                            <Link to='/login'>Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link to='/application'>Apply Now</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
