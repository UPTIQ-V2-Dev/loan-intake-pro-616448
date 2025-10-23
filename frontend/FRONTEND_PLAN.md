# Loan Intake Application - Technical Implementation Plan

## Project Overview

A comprehensive loan intake application built with React 19, Vite, shadcn/ui, and Tailwind v4 that captures borrower information, performs eligibility checks, and manages loan applications.

## Core Architecture

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query + Context API
- **Routing**: React Router DOM v7
- **Testing**: Vitest + React Testing Library + MSW

## Page-by-Page Implementation Plan

### 1. Landing Page (`/`)

**Components:**

- `LandingHero` - Hero section with CTA
- `LoanTypesGrid` - Available loan products
- `EligibilityPreview` - Quick eligibility checker
- `TestimonialCarousel` - Customer reviews

**Features:**

- Loan type selection
- Basic eligibility preview
- Navigation to application

**API Endpoints:**

- `GET /api/loan-types` - Available loan products
- `POST /api/eligibility/quick-check` - Basic eligibility

### 2. Application Form (`/application`)

**Multi-step form with progress indicator:**

#### Step 1: Personal Information (`/application/personal`)

**Components:**

- `PersonalInfoForm` - Main form component
- `AddressAutocomplete` - Address lookup
- `DocumentUpload` - ID verification

**Utils:**

- `validateSSN` - SSN validation
- `formatPhoneNumber` - Phone formatting
- `addressValidator` - Address validation

**Types:**

- `PersonalInfo` - Form data interface
- `AddressInfo` - Address structure

#### Step 2: Financial Information (`/application/financial`)

**Components:**

- `IncomeForm` - Income details
- `EmploymentForm` - Employment info
- `AssetForm` - Assets and liabilities
- `BankAccountVerification` - Account linking

**Utils:**

- `calculateDTI` - Debt-to-income ratio
- `formatCurrency` - Currency formatting
- `validateBankAccount` - Account validation

#### Step 3: Loan Details (`/application/loan`)

**Components:**

- `LoanPurposeSelector` - Purpose selection
- `LoanAmountCalculator` - Amount and terms
- `PropertyInformation` - Property details (if applicable)

**Utils:**

- `calculateMonthlyPayment` - Payment calculation
- `loanTermCalculator` - Term calculations

#### Step 4: Review & Submit (`/application/review`)

**Components:**

- `ApplicationSummary` - Complete review
- `ESignature` - Digital signature
- `TermsAgreement` - Legal agreements

**API Endpoints:**

- `POST /api/applications` - Submit application
- `PUT /api/applications/:id` - Update application
- `GET /api/applications/:id` - Get application data

### 3. Document Upload (`/documents`)

**Components:**

- `DocumentUploadZone` - Drag & drop interface
- `DocumentList` - Uploaded documents
- `DocumentPreview` - File preview
- `RequiredDocumentsList` - Missing documents

**Utils:**

- `fileValidator` - File type/size validation
- `documentProcessor` - OCR processing
- `compressionUtils` - Image optimization

**API Endpoints:**

- `POST /api/documents/upload` - Upload documents
- `GET /api/documents/:applicationId` - Get documents
- `DELETE /api/documents/:id` - Remove document

### 4. Application Status (`/status`)

**Components:**

- `StatusTimeline` - Application progress
- `StatusCard` - Current status
- `NextStepsCard` - Required actions
- `ContactInfo` - Support contact

**API Endpoints:**

- `GET /api/applications/:id/status` - Get status updates
- `GET /api/applications/:id/timeline` - Get status history

### 5. Dashboard (`/dashboard`)

**Components:**

- `ApplicationsList` - All applications
- `QuickActions` - Common actions
- `NotificationsPanel` - Important updates
- `ProfileSummary` - User profile

**API Endpoints:**

- `GET /api/user/applications` - User's applications
- `GET /api/user/notifications` - Notifications

## Shared Components & Layout

### Layout Components

- `AppLayout` - Main application layout
- `Sidebar` - Navigation sidebar
- `Header` - Top navigation
- `Footer` - Footer content
- `LoadingSpinner` - Loading states
- `ErrorBoundary` - Error handling

### Form Components

- `FormField` - Reusable form field
- `FormSection` - Form section wrapper
- `StepProgress` - Multi-step progress
- `ValidationMessage` - Error display

### UI Components

- `DataTable` - Tables with sorting/filtering
- `ConfirmDialog` - Confirmation modals
- `StatusBadge` - Status indicators
- `CurrencyInput` - Currency input field
- `DatePicker` - Date selection
- `FileUpload` - File upload component

## Common Utilities

### Validation (`src/utils/validation.ts`)

- `loanApplicationSchema` - Complete form validation
- `documentValidation` - Document validation rules
- `eligibilityRules` - Eligibility criteria

### Formatting (`src/utils/formatting.ts`)

- `formatCurrency` - Currency display
- `formatDate` - Date formatting
- `formatSSN` - SSN masking
- `formatLoanNumber` - Loan number display

### API Client (`src/utils/api.ts`)

- `loanApi` - Loan-related endpoints
- `documentApi` - Document operations
- `userApi` - User operations

### Calculations (`src/utils/calculations.ts`)

- `calculatePayment` - Monthly payment
- `calculateAPR` - Interest calculations
- `eligibilityScore` - Credit assessment

## Data Types & Interfaces

### Core Types (`src/types/`)

```typescript
interface LoanApplication {
    id: string;
    personalInfo: PersonalInfo;
    financialInfo: FinancialInfo;
    loanDetails: LoanDetails;
    status: ApplicationStatus;
    createdAt: Date;
    updatedAt: Date;
}

interface PersonalInfo {
    firstName: string;
    lastName: string;
    ssn: string;
    dateOfBirth: string;
    address: Address;
    phone: string;
    email: string;
}

interface FinancialInfo {
    annualIncome: number;
    employmentStatus: string;
    monthlyDebt: number;
    assets: Asset[];
}

interface LoanDetails {
    purpose: string;
    amount: number;
    term: number;
    propertyInfo?: PropertyInfo;
}
```

## API Integration

### Services (`src/services/`)

- `applicationService.ts` - Application CRUD operations
- `documentService.ts` - Document management
- `eligibilityService.ts` - Eligibility checks
- `notificationService.ts` - Notifications

### API Configuration

- `apiClient.ts` - Axios configuration
- `endpoints.ts` - API endpoint definitions
- `interceptors.ts` - Request/response interceptors

## Testing Strategy

### Testing Framework

- **Unit/Component Tests**: Vitest + React Testing Library
- **API Mocking**: MSW (Mock Service Worker)
- **Coverage Target**: 85% minimum
- **Test Environment**: jsdom

### Test Organization

```
src/
├── __tests__/          # Global test utilities
├── components/
│   ├── PersonalInfoForm.test.tsx
│   ├── DocumentUpload.test.tsx
│   └── __tests__/      # Component test utilities
├── pages/
│   ├── Application.test.tsx
│   ├── Dashboard.test.tsx
│   └── __tests__/
├── utils/
│   ├── validation.test.ts
│   ├── calculations.test.ts
│   └── __tests__/
└── services/
    ├── applicationService.test.ts
    └── __tests__/
```

### Test Utilities (`src/test-utils/`)

- `renderWithProviders.tsx` - Custom render with providers
- `mockApiHandlers.ts` - MSW API mocks
- `testData.ts` - Mock data generators
- `customMatchers.ts` - Custom Jest matchers

### Key Test Cases

#### Component Tests

- **Forms**: Validation, submission, field interactions
- **File Upload**: Drag/drop, validation, preview
- **Status Display**: Different status states
- **Navigation**: Routing and step progression

#### Integration Tests

- **Application Flow**: Complete form submission
- **Document Upload**: End-to-end file handling
- **Status Updates**: Real-time status changes
- **Error Handling**: API failures and recovery

#### Service Tests

- **API Calls**: Request/response handling
- **Data Transformation**: Format conversions
- **Error Handling**: Network failures
- **Caching**: Query cache management

### Mock Service Worker Setup (`src/mocks/`)

- `handlers.ts` - API route handlers
- `server.ts` - MSW server configuration
- `browser.ts` - Browser MSW setup for development

### Test Examples

#### Component Test Pattern

```typescript
// PersonalInfoForm.test.tsx
describe('PersonalInfoForm', () => {
  it('validates SSN format', async () => {
    render(<PersonalInfoForm />);
    // Test implementation
  });

  it('submits form with valid data', async () => {
    render(<PersonalInfoForm />);
    // Test implementation
  });
});
```

#### Service Test Pattern

```typescript
// applicationService.test.ts
describe('ApplicationService', () => {
    it('creates new application', async () => {
        // Mock API response
        // Test service method
    });
});
```

#### Page Test Pattern

```typescript
// Application.test.tsx
describe('Application Page', () => {
  it('renders multi-step form', () => {
    render(<Application />);
    // Test page rendering
  });

  it('navigates between steps', async () => {
    render(<Application />);
    // Test step navigation
  });
});
```

### Testing Configuration Files

- `src/setupTests.ts` - Test environment setup
- `src/test-utils.tsx` - Custom testing utilities
- `vitest.config.ts` - Vitest configuration (already exists)

### Performance Testing

- **Bundle Size**: Monitor chunk sizes
- **Render Performance**: Component render times
- **API Response Times**: Network request monitoring

### Accessibility Testing

- **Screen Reader**: ARIA compliance
- **Keyboard Navigation**: Tab order and focus
- **Color Contrast**: WCAG compliance
- **Form Labels**: Proper labeling

## Implementation Phases

### Phase 1: Core Setup & Landing

1. Project structure setup
2. Landing page implementation
3. Basic routing configuration
4. Core components library

### Phase 2: Application Form

1. Multi-step form architecture
2. Personal information step
3. Financial information step
4. Form validation and state management

### Phase 3: Document Management

1. File upload system
2. Document processing
3. Preview functionality
4. Validation and storage

### Phase 4: Status & Dashboard

1. Application status tracking
2. User dashboard
3. Notifications system
4. Profile management

### Phase 5: Testing & Polish

1. Comprehensive test coverage
2. Performance optimization
3. Accessibility compliance
4. Final UI polish

## Security Considerations

- Input sanitization and validation
- Secure file upload handling
- PII data encryption
- CORS and CSP configuration
- Authentication token management
