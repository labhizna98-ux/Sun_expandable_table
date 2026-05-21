/**
 * Mock classification dataset for PII Information Classification module.
 * 30 rows — structure matches enterprise governance API contracts.
 */

const FIELD_CATEGORIES = [
  'Customer',
  'Account',
  'Policy',
  'Claim',
  'Agent',
  'Beneficiary',
  'Transaction',
  'Address',
  'Contact',
  'Identity',
  'Financial',
  'Medical',
  'Employment',
  'Compliance',
  'Audit',
];

/**
 * Generates realistic enterprise field names for stress-testing chip overflow UI.
 * @param {number} count
 */
export const generateFieldNames = (count) =>
  Array.from({ length: count }, (_, index) => {
    const category = FIELD_CATEGORIES[index % FIELD_CATEGORIES.length];
    const sequence = String(index + 1).padStart(4, '0');
    return `${category} Attribute ${sequence}`;
  });

/** Row definitions used to build the 30-row catalog */
const ROW_DEFINITIONS = [
  {
    code: 'PUB-1',
    classification_level: 'PUBLIC',
    category: 'Public',
    description:
      'Information officially approved for release to the public. Disclosure has no impact.',
    fieldCount: 0,
    sensitivity: 'PUBLIC',
  },
  {
    code: 'INT-1',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Internal Use Only',
    description:
      'Information that can be shared within the organization but cannot be released publicly.',
    fields: [
      'Business Group',
      'Business Group Risk',
      'Business Group Risk Office',
      'Business Unit',
      'Business Function',
      'Department Name',
      'Employee Grade',
    ],
    sensitivity: 'LOW',
  },
  {
    code: 'INT-2',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Organizational',
    description: 'Internal organizational hierarchy and reporting structure metadata.',
    fieldCount: 6,
    sensitivity: 'LOW',
  },
  {
    code: 'INT-3',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Operations',
    description: 'Operational metrics and workflow identifiers for internal business processes.',
    fieldCount: 9,
    sensitivity: 'LOW',
  },
  {
    code: 'PI-1',
    classification_level: 'PERSONAL INFORMATION',
    category: 'PII',
    description:
      'Personally identifiable information used to identify an individual directly or indirectly.',
    fields: [
      'First Name',
      'Last Name',
      'Phone Number',
      'Email Address',
      'Employee ID',
      'Customer ID',
      'Date Of Birth',
      'Nationality',
    ],
    sensitivity: 'MEDIUM',
  },
  {
    code: 'PI-2',
    classification_level: 'SENSITIVE PERSONAL INFORMATION',
    category: 'Sensitive PII',
    description:
      'Highly sensitive personal information requiring strict access controls and encryption.',
    fields: [
      'Aadhar Number',
      'PAN Number',
      'Passport Number',
      'Driving License Number',
      'Bank Account Number',
      'Credit Card Number',
      'Medical Records',
      'Biometric Data',
      'Tax Information',
    ],
    sensitivity: 'HIGH',
  },
  {
    code: 'PI-3',
    classification_level: 'PERSONAL INFORMATION',
    category: 'PII',
    description: 'Customer profile attributes collected during onboarding and servicing.',
    fieldCount: 14,
    sensitivity: 'MEDIUM',
  },
  {
    code: 'PI-4',
    classification_level: 'SL RESTRICTED',
    category: 'PII',
    description:
      'Large-scale PII field catalog used for enterprise data dictionary and governance mapping.',
    fieldCount: 2000,
    sensitivity: 'HIGH',
  },
  {
    code: 'PI-5',
    classification_level: 'PERSONAL INFORMATION',
    category: 'Demographics',
    description: 'Demographic and household composition data linked to policyholders.',
    fieldCount: 11,
    sensitivity: 'MEDIUM',
  },
  {
    code: 'SEC-1',
    classification_level: 'CONFIDENTIAL',
    category: 'Security',
    description:
      'Confidential business or system information that should only be accessed by authorized users.',
    fields: [
      'API Keys',
      'Access Tokens',
      'Password Hash',
      'Encryption Key',
      'System Credentials',
    ],
    sensitivity: 'CRITICAL',
  },
  {
    code: 'SEC-2',
    classification_level: 'CONFIDENTIAL',
    category: 'Security',
    description: 'Authentication tokens, session identifiers, and privileged access audit trails.',
    fieldCount: 8,
    sensitivity: 'CRITICAL',
  },
  {
    code: 'BPI-1',
    classification_level: 'SL CONFIDENTIAL',
    category: 'Business Partner Information',
    description: 'Confidential business partner and vendor relationship data.',
    fields: [
      'Partner Name',
      'Contract ID',
      'Vendor Tax ID',
      'Partnership Tier',
      'Renewal Date',
      'Account Manager',
      'Revenue Share',
      'SLA Terms',
      'Compliance Status',
      'Risk Rating',
      'Onboarding Date',
    ],
    sensitivity: 'HIGH',
  },
  {
    code: 'BPI-2',
    classification_level: 'SL CONFIDENTIAL',
    category: 'Vendor Management',
    description: 'Third-party vendor onboarding, due diligence, and contract metadata.',
    fieldCount: 10,
    sensitivity: 'HIGH',
  },
  {
    code: 'CCI-1',
    classification_level: 'SL CONFIDENTIAL',
    category: 'Customer Contact Information',
    description:
      'Customer contact and communication channel data collected across digital and branch channels.',
    fieldCount: 320,
    sensitivity: 'MEDIUM',
  },
  {
    code: 'CCI-2',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Customer Contact Information',
    description: 'Preferred contact methods and communication consent preferences.',
    fieldCount: 7,
    sensitivity: 'LOW',
  },
  {
    code: 'FIN-1',
    classification_level: 'SL CONFIDENTIAL',
    category: 'Financial',
    description: 'Premium, billing, and payment transaction data for insurance products.',
    fieldCount: 18,
    sensitivity: 'HIGH',
  },
  {
    code: 'FIN-2',
    classification_level: 'CONFIDENTIAL',
    category: 'Financial',
    description: 'Commission statements, disbursements, and advisor compensation records.',
    fieldCount: 12,
    sensitivity: 'HIGH',
  },
  {
    code: 'MED-1',
    classification_level: 'SL RESTRICTED',
    category: 'Medical',
    description: 'Protected health information subject to HIPAA and local privacy regulations.',
    fieldCount: 25,
    sensitivity: 'HIGH',
  },
  {
    code: 'MED-2',
    classification_level: 'SENSITIVE PERSONAL INFORMATION',
    category: 'Medical',
    description: 'Underwriting medical history and clinical assessment outcomes.',
    fieldCount: 15,
    sensitivity: 'HIGH',
  },
  {
    code: 'CLM-1',
    classification_level: 'SL CONFIDENTIAL',
    category: 'Claims',
    description: 'Claims intake, adjudication status, and settlement disbursement attributes.',
    fieldCount: 22,
    sensitivity: 'HIGH',
  },
  {
    code: 'CLM-2',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Claims',
    description: 'Claims workflow routing, examiner notes, and internal case references.',
    fieldCount: 9,
    sensitivity: 'LOW',
  },
  {
    code: 'POL-1',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Policy',
    description: 'Policy contract terms, riders, beneficiaries, and coverage schedules.',
    fieldCount: 16,
    sensitivity: 'LOW',
  },
  {
    code: 'POL-2',
    classification_level: 'SL CONFIDENTIAL',
    category: 'Policy',
    description: 'In-force policy financial values, fund allocations, and surrender charges.',
    fieldCount: 13,
    sensitivity: 'HIGH',
  },
  {
    code: 'AGT-1',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Agent',
    description: 'Licensed agent identifiers, hierarchy codes, and appointment status.',
    fieldCount: 8,
    sensitivity: 'LOW',
  },
  {
    code: 'AGT-2',
    classification_level: 'CONFIDENTIAL',
    category: 'Agent',
    description: 'Agent compensation plans, chargeback history, and production metrics.',
    fieldCount: 11,
    sensitivity: 'HIGH',
  },
  {
    code: 'CMP-1',
    classification_level: 'SL CONFIDENTIAL',
    category: 'Compliance',
    description: 'Regulatory reporting fields for AML, KYC, and sanctions screening programs.',
    fieldCount: 28,
    sensitivity: 'HIGH',
  },
  {
    code: 'CMP-2',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Compliance',
    description: 'Internal audit findings, remediation tracking, and control attestations.',
    fieldCount: 6,
    sensitivity: 'LOW',
  },
  {
    code: 'AUD-1',
    classification_level: 'INTERNAL USE ONLY',
    category: 'Audit',
    description: 'System access logs, change history, and governance audit trail identifiers.',
    fieldCount: 10,
    sensitivity: 'LOW',
  },
  {
    code: 'AUD-2',
    classification_level: 'CONFIDENTIAL',
    category: 'Audit',
    description: 'Privileged user activity monitoring and forensic investigation markers.',
    fieldCount: 7,
    sensitivity: 'CRITICAL',
  },
  {
    code: 'MKT-1',
    classification_level: 'PUBLIC',
    category: 'Marketing',
    description: 'Approved marketing campaign identifiers and publicly disclosed product codes.',
    fieldCount: 4,
    sensitivity: 'PUBLIC',
  },
];

const buildRow = (definition) => {
  const fields =
    definition.fields ??
    (definition.fieldCount > 0 ? generateFieldNames(definition.fieldCount) : []);

  return {
    id: definition.code,
    code: definition.code,
    classification_level: definition.classification_level,
    category: definition.category,
    description: definition.description,
    fields,
    sensitivity: definition.sensitivity,
  };
};

export const classificationData = ROW_DEFINITIONS.map(buildRow);

export default classificationData;
