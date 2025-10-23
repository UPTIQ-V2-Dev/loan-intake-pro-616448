import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white py-12'>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    <div className='col-span-1 md:col-span-2'>
                        <Link
                            to='/'
                            className='flex items-center gap-2 mb-4'
                        >
                            <Building2 className='w-8 h-8 text-blue-400' />
                            <span className='text-xl font-bold'>LoanFlow</span>
                        </Link>
                        <p className='text-gray-400 mb-4'>
                            Your trusted partner for all your lending needs. Fast approvals, competitive rates, and
                            exceptional service.
                        </p>
                        <p className='text-sm text-gray-500'>© 2024 LoanFlow. All rights reserved.</p>
                    </div>

                    <div>
                        <h3 className='font-semibold mb-4'>Loan Products</h3>
                        <ul className='space-y-2 text-gray-400'>
                            <li>
                                <Link
                                    to='/loans/personal'
                                    className='hover:text-white transition-colors'
                                >
                                    Personal Loans
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/loans/home'
                                    className='hover:text-white transition-colors'
                                >
                                    Home Mortgages
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/loans/auto'
                                    className='hover:text-white transition-colors'
                                >
                                    Auto Loans
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/loans/business'
                                    className='hover:text-white transition-colors'
                                >
                                    Business Loans
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='font-semibold mb-4'>Support</h3>
                        <ul className='space-y-2 text-gray-400'>
                            <li>
                                <Link
                                    to='/help'
                                    className='hover:text-white transition-colors'
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/contact'
                                    className='hover:text-white transition-colors'
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/privacy'
                                    className='hover:text-white transition-colors'
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/terms'
                                    className='hover:text-white transition-colors'
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
