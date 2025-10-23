import type { EligibilityCheckRequest } from '@/types/loan';

export const mockEligibilityRequest: EligibilityCheckRequest = {
    income: 75000,
    loanAmount: 25000,
    loanPurpose: 'debt_consolidation',
    creditScore: 720
};

export const mockQuickEligibilityRequest = {
    income: 50000,
    loanAmount: 15000,
    loanPurpose: 'home_improvement'
};
