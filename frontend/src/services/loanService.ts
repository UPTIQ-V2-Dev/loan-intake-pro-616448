import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockLoanTypes, mockLoanApplication, mockEligibilityResponse, mockApplicationStatus } from '@/data/mockData';
import type {
    LoanType,
    LoanApplication,
    CreateLoanApplicationInput,
    UpdateLoanApplicationInput,
    EligibilityCheckRequest,
    EligibilityCheckResponse,
    ApplicationStatusResponse
} from '@/types/loan';

export const loanService = {
    getLoanTypes: async (): Promise<LoanType[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getLoanTypes ---');
            await mockApiDelay();
            return mockLoanTypes;
        }
        const response = await api.get('/api/loan-types');
        return response.data;
    },

    checkEligibility: async (request: EligibilityCheckRequest): Promise<EligibilityCheckResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: checkEligibility ---', request);
            await mockApiDelay();
            return mockEligibilityResponse;
        }
        const response = await api.post('/api/eligibility/check', request);
        return response.data;
    },

    quickEligibilityCheck: async (request: Partial<EligibilityCheckRequest>): Promise<EligibilityCheckResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: quickEligibilityCheck ---', request);
            await mockApiDelay();
            return {
                ...mockEligibilityResponse,
                score: Math.floor(Math.random() * 30) + 70 // Random score between 70-100
            };
        }
        const response = await api.post('/api/eligibility/quick-check', request);
        return response.data;
    },

    createApplication: async (applicationData: CreateLoanApplicationInput): Promise<LoanApplication> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: createApplication ---', applicationData);
            await mockApiDelay();
            return {
                ...mockLoanApplication,
                id: `app-${Date.now()}`,
                personalInfo: applicationData.personalInfo,
                financialInfo: applicationData.financialInfo,
                loanDetails: applicationData.loanDetails,
                status: 'draft',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }
        const response = await api.post('/api/applications', applicationData);
        return response.data;
    },

    updateApplication: async (id: string, updateData: UpdateLoanApplicationInput): Promise<LoanApplication> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: updateApplication ---', { id, updateData });
            await mockApiDelay();
            return {
                ...mockLoanApplication,
                id,
                ...updateData,
                updatedAt: new Date().toISOString()
            } as LoanApplication;
        }
        const response = await api.put(`/api/applications/${id}`, updateData);
        return response.data;
    },

    getApplication: async (id: string): Promise<LoanApplication> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplication ---', id);
            await mockApiDelay();
            return { ...mockLoanApplication, id };
        }
        const response = await api.get(`/api/applications/${id}`);
        return response.data;
    },

    submitApplication: async (id: string): Promise<LoanApplication> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: submitApplication ---', id);
            await mockApiDelay();
            return {
                ...mockLoanApplication,
                id,
                status: 'submitted',
                updatedAt: new Date().toISOString()
            };
        }
        const response = await api.post(`/api/applications/${id}/submit`);
        return response.data;
    },

    getApplicationStatus: async (id: string): Promise<ApplicationStatusResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplicationStatus ---', id);
            await mockApiDelay();
            return {
                ...mockApplicationStatus,
                application: { ...mockApplicationStatus.application, id }
            };
        }
        const response = await api.get(`/api/applications/${id}/status`);
        return response.data;
    },

    getUserApplications: async (): Promise<LoanApplication[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getUserApplications ---');
            await mockApiDelay();
            return [mockLoanApplication, { ...mockLoanApplication, id: 'app-67890', status: 'approved' }];
        }
        const response = await api.get('/api/user/applications');
        return response.data;
    }
};
