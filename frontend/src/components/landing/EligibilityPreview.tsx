import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { loanService } from '@/services/loanService';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export const EligibilityPreview = () => {
    const [formData, setFormData] = useState({
        income: '',
        loanAmount: '',
        loanPurpose: ''
    });

    const eligibilityMutation = useMutation({
        mutationFn: loanService.quickEligibilityCheck,
        onError: error => {
            console.error('Eligibility check failed:', error);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.income || !formData.loanAmount || !formData.loanPurpose) {
            return;
        }

        eligibilityMutation.mutate({
            income: parseInt(formData.income),
            loanAmount: parseInt(formData.loanAmount),
            loanPurpose: formData.loanPurpose
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Reset results when form changes
        if (eligibilityMutation.data) {
            eligibilityMutation.reset();
        }
    };

    const isFormValid = formData.income && formData.loanAmount && formData.loanPurpose;

    return (
        <section className='py-16 bg-gray-50 dark:bg-gray-800'>
            <div className='container mx-auto px-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                            Check Your Eligibility
                        </h2>
                        <p className='text-xl text-gray-600 dark:text-gray-300'>
                            Get an instant estimate of your loan eligibility. No impact on your credit score.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    Quick Eligibility Check
                                </CardTitle>
                                <CardDescription>
                                    Enter your basic information for an instant pre-qualification
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className='space-y-6'
                                >
                                    <div className='space-y-2'>
                                        <Label htmlFor='income'>Annual Income</Label>
                                        <Input
                                            id='income'
                                            type='number'
                                            placeholder='75000'
                                            value={formData.income}
                                            onChange={e => handleInputChange('income', e.target.value)}
                                            min='0'
                                            step='1000'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <Label htmlFor='loanAmount'>Desired Loan Amount</Label>
                                        <Input
                                            id='loanAmount'
                                            type='number'
                                            placeholder='25000'
                                            value={formData.loanAmount}
                                            onChange={e => handleInputChange('loanAmount', e.target.value)}
                                            min='1000'
                                            step='1000'
                                        />
                                    </div>

                                    <div className='space-y-2'>
                                        <Label htmlFor='loanPurpose'>Loan Purpose</Label>
                                        <Select
                                            value={formData.loanPurpose}
                                            onValueChange={value => handleInputChange('loanPurpose', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select loan purpose' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='debt_consolidation'>Debt Consolidation</SelectItem>
                                                <SelectItem value='home_improvement'>Home Improvement</SelectItem>
                                                <SelectItem value='medical'>Medical Expenses</SelectItem>
                                                <SelectItem value='auto'>Auto Purchase</SelectItem>
                                                <SelectItem value='education'>Education</SelectItem>
                                                <SelectItem value='business'>Business</SelectItem>
                                                <SelectItem value='other'>Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        type='submit'
                                        disabled={!isFormValid || eligibilityMutation.isPending}
                                        className='w-full'
                                    >
                                        {eligibilityMutation.isPending ? 'Checking...' : 'Check Eligibility'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    {eligibilityMutation.data ? 'Your Results' : 'Eligibility Results'}
                                </CardTitle>
                                <CardDescription>
                                    {eligibilityMutation.data
                                        ? 'Based on the information provided'
                                        : 'Complete the form to see your eligibility estimate'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {eligibilityMutation.isPending && (
                                    <div className='text-center py-8'>
                                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
                                        <p className='text-gray-600 dark:text-gray-400'>
                                            Analyzing your information...
                                        </p>
                                    </div>
                                )}

                                {eligibilityMutation.error && (
                                    <Alert>
                                        <AlertCircle className='h-4 w-4' />
                                        <AlertDescription>
                                            Unable to check eligibility. Please try again.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {eligibilityMutation.data && (
                                    <div className='space-y-6'>
                                        <div className='text-center'>
                                            {eligibilityMutation.data.eligible ? (
                                                <div className='flex flex-col items-center gap-4'>
                                                    <div className='w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center'>
                                                        <CheckCircle className='w-8 h-8 text-green-600 dark:text-green-400' />
                                                    </div>
                                                    <div>
                                                        <h3 className='text-2xl font-bold text-green-600 dark:text-green-400 mb-2'>
                                                            You may qualify!
                                                        </h3>
                                                        <p className='text-gray-600 dark:text-gray-400'>
                                                            Based on your information, you appear to be eligible for a
                                                            loan.
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='flex flex-col items-center gap-4'>
                                                    <div className='w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center'>
                                                        <AlertCircle className='w-8 h-8 text-orange-600 dark:text-orange-400' />
                                                    </div>
                                                    <div>
                                                        <h3 className='text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2'>
                                                            Additional review needed
                                                        </h3>
                                                        <p className='text-gray-600 dark:text-gray-400'>
                                                            We'd like to review your application in more detail.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <TrendingUp className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                                                <span className='text-sm font-medium text-gray-900 dark:text-white'>
                                                    Eligibility Score
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-4'>
                                                <Progress
                                                    value={eligibilityMutation.data.score}
                                                    className='flex-1'
                                                />
                                                <span className='text-2xl font-bold text-gray-900 dark:text-white'>
                                                    {eligibilityMutation.data.score}
                                                </span>
                                            </div>
                                        </div>

                                        {eligibilityMutation.data.reasons.length > 0 && (
                                            <div>
                                                <h4 className='font-medium text-gray-900 dark:text-white mb-3'>
                                                    Key Factors
                                                </h4>
                                                <ul className='space-y-2'>
                                                    {eligibilityMutation.data.reasons.map((reason, index) => (
                                                        <li
                                                            key={index}
                                                            className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'
                                                        >
                                                            <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                                                            {reason}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {eligibilityMutation.data.recommendations.length > 0 && (
                                            <div>
                                                <h4 className='font-medium text-gray-900 dark:text-white mb-3'>
                                                    Recommendations
                                                </h4>
                                                <ul className='space-y-2'>
                                                    {eligibilityMutation.data.recommendations.map(
                                                        (recommendation, index) => (
                                                            <li
                                                                key={index}
                                                                className='flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400'
                                                            >
                                                                <TrendingUp className='w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0' />
                                                                {recommendation}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        <Button
                                            className='w-full'
                                            asChild
                                        >
                                            <a href='/application'>Start Full Application</a>
                                        </Button>
                                    </div>
                                )}

                                {!eligibilityMutation.data && !eligibilityMutation.isPending && (
                                    <div className='text-center py-8'>
                                        <TrendingUp className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                                        <p className='text-gray-500 dark:text-gray-400'>
                                            Fill out the form to get your personalized eligibility estimate
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
