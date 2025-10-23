import { http, HttpResponse } from 'msw';
import { mockLoanTypes, mockEligibilityResponse } from '@/data/mockData';

export const handlers = [
    // Get loan types
    http.get('/api/loan-types', () => {
        return HttpResponse.json(mockLoanTypes);
    }),

    // Quick eligibility check
    http.post('/api/eligibility/quick-check', async () => {
        return HttpResponse.json({
            ...mockEligibilityResponse,
            score: Math.floor(Math.random() * 30) + 70 // Random score between 70-100
        });
    }),

    // Full eligibility check
    http.post('/api/eligibility/check', async () => {
        return HttpResponse.json(mockEligibilityResponse);
    })
];
