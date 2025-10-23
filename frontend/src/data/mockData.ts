import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type {
    LoanType,
    LoanApplication,
    EligibilityCheckResponse,
    ApplicationStatusResponse,
    StatusTimelineItem
} from '@/types/loan';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

export const mockLoanTypes: LoanType[] = [
    {
        id: '1',
        name: 'Personal Loan',
        description: 'Flexible personal loans for various purposes with quick approval.',
        minAmount: 1000,
        maxAmount: 50000,
        interestRate: 7.99,
        termOptions: [12, 24, 36, 48, 60],
        requirements: [
            'Minimum credit score of 600',
            'Annual income of $30,000+',
            'US citizen or permanent resident',
            'Valid bank account'
        ],
        features: ['No collateral required', 'Fixed interest rate', 'Fast approval process', 'Flexible repayment terms']
    },
    {
        id: '2',
        name: 'Home Mortgage',
        description: 'Competitive rates for home purchases and refinancing.',
        minAmount: 100000,
        maxAmount: 2000000,
        interestRate: 6.25,
        termOptions: [180, 240, 300, 360],
        requirements: [
            'Minimum credit score of 620',
            'Annual income verification',
            'Down payment of 3-20%',
            'Property appraisal'
        ],
        features: ['Low down payment options', 'Competitive rates', 'Various loan programs', 'Expert guidance']
    },
    {
        id: '3',
        name: 'Auto Loan',
        description: 'Finance your dream car with our competitive auto loan rates.',
        minAmount: 5000,
        maxAmount: 150000,
        interestRate: 4.99,
        termOptions: [36, 48, 60, 72, 84],
        requirements: ["Valid driver's license", 'Proof of income', 'Auto insurance', 'Vehicle information'],
        features: ['New and used car financing', 'Quick approval', 'Flexible terms', 'No prepayment penalty']
    },
    {
        id: '4',
        name: 'Business Loan',
        description: 'Grow your business with flexible financing solutions.',
        minAmount: 10000,
        maxAmount: 500000,
        interestRate: 8.5,
        termOptions: [12, 24, 36, 48, 60],
        requirements: ['Business license', '2+ years in business', 'Financial statements', 'Business plan'],
        features: ['Working capital', 'Equipment financing', 'Flexible repayment', 'Business support']
    }
];

export const mockLoanApplication: LoanApplication = {
    id: 'app-12345',
    personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        ssn: '***-**-1234',
        dateOfBirth: '1985-06-15',
        address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345'
        },
        phone: '(555) 123-4567',
        email: 'john.doe@email.com'
    },
    financialInfo: {
        annualIncome: 75000,
        employmentStatus: 'full-time',
        monthlyDebt: 1200,
        assets: [
            { type: 'savings', value: 25000, description: 'Savings account' },
            { type: 'checking', value: 5000, description: 'Checking account' }
        ],
        employerName: 'Tech Corp Inc.',
        employmentDuration: 36
    },
    loanDetails: {
        purpose: 'debt_consolidation',
        amount: 35000,
        term: 48
    },
    status: 'under_review',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
};

export const mockEligibilityResponse: EligibilityCheckResponse = {
    eligible: true,
    score: 85,
    reasons: ['Strong credit history', 'Stable employment', 'Good debt-to-income ratio'],
    recommendations: [
        'Consider a slightly higher loan amount for better rates',
        'Longer term can reduce monthly payments'
    ]
};

export const mockStatusTimeline: StatusTimelineItem[] = [
    {
        id: '1',
        status: 'submitted',
        timestamp: '2024-01-15T10:30:00Z',
        description: 'Application submitted successfully'
    },
    {
        id: '2',
        status: 'under_review',
        timestamp: '2024-01-16T09:15:00Z',
        description: 'Initial review completed, underwriting in progress'
    }
];

export const mockApplicationStatus: ApplicationStatusResponse = {
    application: mockLoanApplication,
    timeline: mockStatusTimeline,
    nextSteps: [
        'Submit recent pay stubs',
        'Provide bank statements from last 2 months',
        'Schedule income verification call'
    ],
    requiredDocuments: ['Pay stubs (last 2 months)', 'Bank statements', 'Tax returns (previous year)']
};
