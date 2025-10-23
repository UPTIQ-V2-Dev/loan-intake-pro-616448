import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Hammer } from 'lucide-react';

interface ComingSoonPageProps {
    title?: string;
    message?: string;
}

export const ComingSoonPage = ({
    title = 'Coming Soon',
    message = "This page is under construction. We're working hard to bring you this feature."
}: ComingSoonPageProps) => {
    return (
        <div className='min-h-[600px] flex items-center justify-center py-12'>
            <div className='container mx-auto px-4'>
                <Card className='max-w-md mx-auto text-center'>
                    <CardHeader>
                        <div className='w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Hammer className='w-8 h-8 text-orange-600 dark:text-orange-400' />
                        </div>
                        <CardTitle className='text-2xl'>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <p className='text-gray-600 dark:text-gray-400'>{message}</p>
                        <Button asChild>
                            <Link
                                to='/'
                                className='flex items-center gap-2'
                            >
                                <ArrowLeft className='w-4 h-4' />
                                Back to Home
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
