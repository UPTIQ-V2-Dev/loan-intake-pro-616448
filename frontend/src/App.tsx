import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { ComingSoonPage } from '@/pages/ComingSoonPage';

export const App = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<AppLayout />}
            >
                <Route
                    index
                    element={<LandingPage />}
                />
                <Route
                    path='application'
                    element={
                        <ComingSoonPage
                            title='Application Form'
                            message="Our comprehensive loan application form is being finalized. You'll be able to apply for loans here soon!"
                        />
                    }
                />
                <Route
                    path='calculator'
                    element={
                        <ComingSoonPage
                            title='Loan Calculator'
                            message='Our loan calculator will help you estimate monthly payments and compare loan options.'
                        />
                    }
                />
                <Route
                    path='status'
                    element={
                        <ComingSoonPage
                            title='Application Status'
                            message='Track your loan application status and get real-time updates here.'
                        />
                    }
                />
                <Route
                    path='dashboard'
                    element={
                        <ComingSoonPage
                            title='Dashboard'
                            message='Your personalized dashboard to manage all your loans and applications.'
                        />
                    }
                />
                <Route
                    path='login'
                    element={
                        <ComingSoonPage
                            title='Sign In'
                            message='User authentication and account management coming soon.'
                        />
                    }
                />
                <Route
                    path='*'
                    element={
                        <ComingSoonPage
                            title='Page Not Found'
                            message="The page you're looking for doesn't exist or is under construction."
                        />
                    }
                />
            </Route>
        </Routes>
    );
};
