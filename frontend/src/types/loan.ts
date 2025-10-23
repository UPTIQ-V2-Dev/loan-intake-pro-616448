export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    ssn: string;
    dateOfBirth: string;
    address: Address;
    phone: string;
    email: string;
}

export interface Asset {
    type: string;
    value: number;
    description?: string;
}

export interface FinancialInfo {
    annualIncome: number;
    employmentStatus: string;
    monthlyDebt: number;
    assets: Asset[];
    employerName?: string;
    employmentDuration?: number;
}

export interface PropertyInfo {
    address: Address;
    estimatedValue: number;
    propertyType: string;
}

export interface LoanDetails {
    purpose: string;
    amount: number;
    term: number;
    propertyInfo?: PropertyInfo;
}

export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'denied' | 'pending_documents';

export interface LoanApplication {
    id: string;
    personalInfo: PersonalInfo;
    financialInfo: FinancialInfo;
    loanDetails: LoanDetails;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
}

export interface LoanType {
    id: string;
    name: string;
    description: string;
    minAmount: number;
    maxAmount: number;
    interestRate: number;
    termOptions: number[];
    requirements: string[];
    features: string[];
}

export interface CreateLoanApplicationInput {
    personalInfo: PersonalInfo;
    financialInfo: FinancialInfo;
    loanDetails: LoanDetails;
}

export interface UpdateLoanApplicationInput {
    personalInfo?: Partial<PersonalInfo>;
    financialInfo?: Partial<FinancialInfo>;
    loanDetails?: Partial<LoanDetails>;
}

export interface EligibilityCheckRequest {
    income: number;
    creditScore?: number;
    loanAmount: number;
    loanPurpose: string;
}

export interface EligibilityCheckResponse {
    eligible: boolean;
    score: number;
    reasons: string[];
    recommendations: string[];
}

export interface Document {
    id: string;
    applicationId: string;
    name: string;
    type: string;
    size: number;
    url: string;
    uploadedAt: string;
    status: 'uploaded' | 'processing' | 'approved' | 'rejected';
}

export interface StatusTimelineItem {
    id: string;
    status: ApplicationStatus;
    timestamp: string;
    description: string;
    documents?: Document[];
}

export interface ApplicationStatusResponse {
    application: LoanApplication;
    timeline: StatusTimelineItem[];
    nextSteps: string[];
    requiredDocuments: string[];
}
