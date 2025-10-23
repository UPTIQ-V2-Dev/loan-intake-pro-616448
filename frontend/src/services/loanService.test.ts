import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loanService } from './loanService';
import { mockLoanTypes, mockEligibilityResponse, mockLoanApplication, mockApplicationStatus } from '@/data/mockData';
import { mockEligibilityRequest, mockQuickEligibilityRequest } from '@/test-utils/testData';

// Mock the api module
vi.mock('@/lib/api', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn()
    }
}));

// Mock the utils module
vi.mock('@/lib/utils', () => ({
    mockApiDelay: vi.fn(() => Promise.resolve())
}));

describe('loanService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Set mock data environment
        vi.stubEnv('VITE_USE_MOCK_DATA', 'true');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    describe('getLoanTypes', () => {
        it('returns mock loan types when VITE_USE_MOCK_DATA is true', async () => {
            const result = await loanService.getLoanTypes();
            expect(result).toEqual(mockLoanTypes);
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            vi.mocked(api.get).mockResolvedValue({ data: mockLoanTypes });

            const result = await loanService.getLoanTypes();

            expect(api.get).toHaveBeenCalledWith('/api/loan-types');
            expect(result).toEqual(mockLoanTypes);
        });
    });

    describe('checkEligibility', () => {
        it('returns mock eligibility response when VITE_USE_MOCK_DATA is true', async () => {
            const result = await loanService.checkEligibility(mockEligibilityRequest);
            expect(result).toEqual(mockEligibilityResponse);
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            vi.mocked(api.post).mockResolvedValue({ data: mockEligibilityResponse });

            const result = await loanService.checkEligibility(mockEligibilityRequest);

            expect(api.post).toHaveBeenCalledWith('/api/eligibility/check', mockEligibilityRequest);
            expect(result).toEqual(mockEligibilityResponse);
        });
    });

    describe('quickEligibilityCheck', () => {
        it('returns mock response with random score when VITE_USE_MOCK_DATA is true', async () => {
            const result = await loanService.quickEligibilityCheck(mockQuickEligibilityRequest);

            expect(result).toMatchObject({
                eligible: mockEligibilityResponse.eligible,
                reasons: mockEligibilityResponse.reasons,
                recommendations: mockEligibilityResponse.recommendations
            });
            expect(result.score).toBeGreaterThanOrEqual(70);
            expect(result.score).toBeLessThanOrEqual(100);
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            vi.mocked(api.post).mockResolvedValue({ data: mockEligibilityResponse });

            const result = await loanService.quickEligibilityCheck(mockQuickEligibilityRequest);

            expect(api.post).toHaveBeenCalledWith('/api/eligibility/quick-check', mockQuickEligibilityRequest);
            expect(result).toEqual(mockEligibilityResponse);
        });
    });

    describe('createApplication', () => {
        const mockApplicationInput = {
            personalInfo: mockLoanApplication.personalInfo,
            financialInfo: mockLoanApplication.financialInfo,
            loanDetails: mockLoanApplication.loanDetails
        };

        it('creates application with mock data when VITE_USE_MOCK_DATA is true', async () => {
            const result = await loanService.createApplication(mockApplicationInput);

            expect(result).toMatchObject({
                personalInfo: mockApplicationInput.personalInfo,
                financialInfo: mockApplicationInput.financialInfo,
                loanDetails: mockApplicationInput.loanDetails,
                status: 'draft'
            });
            expect(result.id).toMatch(/^app-\d+$/);
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            vi.mocked(api.post).mockResolvedValue({ data: mockLoanApplication });

            const result = await loanService.createApplication(mockApplicationInput);

            expect(api.post).toHaveBeenCalledWith('/api/applications', mockApplicationInput);
            expect(result).toEqual(mockLoanApplication);
        });
    });

    describe('getApplication', () => {
        it('returns mock application when VITE_USE_MOCK_DATA is true', async () => {
            const testId = 'test-app-123';
            const result = await loanService.getApplication(testId);

            expect(result).toEqual({ ...mockLoanApplication, id: testId });
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            const testId = 'test-app-123';
            vi.mocked(api.get).mockResolvedValue({ data: mockLoanApplication });

            const result = await loanService.getApplication(testId);

            expect(api.get).toHaveBeenCalledWith(`/api/applications/${testId}`);
            expect(result).toEqual(mockLoanApplication);
        });
    });

    describe('submitApplication', () => {
        it('submits application with mock data when VITE_USE_MOCK_DATA is true', async () => {
            const testId = 'test-app-123';
            const result = await loanService.submitApplication(testId);

            expect(result).toMatchObject({
                id: testId,
                status: 'submitted',
                personalInfo: mockLoanApplication.personalInfo,
                financialInfo: mockLoanApplication.financialInfo,
                loanDetails: mockLoanApplication.loanDetails
            });
            expect(result.updatedAt).toBeDefined();
            expect(result.createdAt).toBeDefined();
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            const testId = 'test-app-123';
            vi.mocked(api.post).mockResolvedValue({ data: mockLoanApplication });

            const result = await loanService.submitApplication(testId);

            expect(api.post).toHaveBeenCalledWith(`/api/applications/${testId}/submit`);
            expect(result).toEqual(mockLoanApplication);
        });
    });

    describe('getApplicationStatus', () => {
        it('returns mock application status when VITE_USE_MOCK_DATA is true', async () => {
            const testId = 'test-app-123';
            const result = await loanService.getApplicationStatus(testId);

            expect(result).toEqual({
                ...mockApplicationStatus,
                application: { ...mockApplicationStatus.application, id: testId }
            });
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            const testId = 'test-app-123';
            vi.mocked(api.get).mockResolvedValue({ data: mockApplicationStatus });

            const result = await loanService.getApplicationStatus(testId);

            expect(api.get).toHaveBeenCalledWith(`/api/applications/${testId}/status`);
            expect(result).toEqual(mockApplicationStatus);
        });
    });

    describe('getUserApplications', () => {
        it('returns mock user applications when VITE_USE_MOCK_DATA is true', async () => {
            const result = await loanService.getUserApplications();

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual(mockLoanApplication);
            expect(result[1].status).toBe('approved');
        });

        it('calls API when VITE_USE_MOCK_DATA is false', async () => {
            vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
            const { api } = await import('@/lib/api');
            const mockApplications = [mockLoanApplication];
            vi.mocked(api.get).mockResolvedValue({ data: mockApplications });

            const result = await loanService.getUserApplications();

            expect(api.get).toHaveBeenCalledWith('/api/user/applications');
            expect(result).toEqual(mockApplications);
        });
    });
});
