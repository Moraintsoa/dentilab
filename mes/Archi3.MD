erDiagram

CABINETS {
    uuid id PK
    string name
    string email
    string subscription_plan
    boolean is_active
    timestamptz created_at
}

USERS {
    uuid id PK
    uuid cabinet_id FK
    string email
    string role
    boolean is_active
    timestamptz created_at
}

PATIENTS {
    uuid id PK
    uuid cabinet_id FK
    string first_name
    string last_name
    date date_of_birth
    boolean anonymized
    timestamptz created_at
}

PATIENT_CONSENTS {
    uuid id PK
    uuid cabinet_id FK
    uuid patient_id FK
    string consent_type
    boolean accepted
    timestamptz accepted_at
}

APPOINTMENTS {
    uuid id PK
    uuid cabinet_id FK
    uuid patient_id FK
    uuid doctor_id FK
    timestamptz start_time
    string status
}

CONSULTATIONS {
    uuid id PK
    uuid cabinet_id FK
    uuid appointment_id FK
    uuid patient_id FK
    uuid doctor_id FK
    string status
    timestamptz started_at
}

TREATMENT_PLANS {
    uuid id PK
    uuid cabinet_id FK
    uuid patient_id FK
    uuid created_by FK
    string status
    decimal estimated_cost
}

TREATMENT_PLAN_ITEMS {
    uuid id PK
    uuid cabinet_id FK
    uuid treatment_plan_id FK
    string procedure_code
    decimal estimated_price
}

TREATMENTS {
    uuid id PK
    uuid cabinet_id FK
    uuid consultation_id FK
    uuid treatment_plan_id FK
    uuid performed_by FK
    string status
    boolean billable
    boolean invoiced
    decimal cost
}

INVOICES {
    uuid id PK
    uuid cabinet_id FK
    uuid patient_id FK
    uuid created_by FK
    uuid validated_by FK
    string status
    decimal total_amount
}

INVOICE_ITEMS {
    uuid id PK
    uuid cabinet_id FK
    uuid invoice_id FK
    uuid treatment_id FK
    decimal total_price
}

PAYMENT_TRANSACTIONS {
    uuid id PK
    uuid cabinet_id FK
    uuid invoice_id FK
    decimal amount
    string status
}

DENTAL_CHARTS {
    uuid id PK
    uuid cabinet_id FK
    uuid patient_id FK
    uuid consultation_id FK
    int tooth_number
    string status
}

DENTAL_CHART_HISTORY {
    uuid id PK
    uuid cabinet_id FK
    uuid dental_chart_id FK
    uuid modified_by FK
    string old_status
    string new_status
}

INVENTORY_ITEMS {
    uuid id PK
    uuid cabinet_id FK
    string name
    int quantity
}

INVENTORY_MOVEMENTS {
    uuid id PK
    uuid cabinet_id FK
    uuid item_id FK
    uuid performed_by FK
    int quantity
}

INVENTORY_USAGE {
    uuid id PK
    uuid cabinet_id FK
    uuid item_id FK
    uuid consultation_id FK
    uuid used_by FK
    int quantity_used
}

RADIOGRAPHIES {
    uuid id PK
    uuid cabinet_id FK
    uuid patient_id FK
    uuid consultation_id FK
    uuid uploaded_by FK
    string image_url
}

CLINICAL_ATTACHMENTS {
    uuid id PK
    uuid cabinet_id FK
    uuid patient_id FK
    uuid consultation_id FK
    uuid uploaded_by FK
    string file_url
}

REPORTS {
    uuid id PK
    uuid cabinet_id FK
    uuid generated_by FK
    string report_type
    string generation_status
}

AUDIT_LOGS {
    uuid id PK
    uuid cabinet_id FK
    uuid user_id FK
    string table_name
    uuid record_id
    timestamptz created_at
}

%% RELATIONSHIPS

CABINETS ||--o{ USERS : has
CABINETS ||--o{ PATIENTS : has
CABINETS ||--o{ APPOINTMENTS : has
CABINETS ||--o{ CONSULTATIONS : has
CABINETS ||--o{ TREATMENT_PLANS : has
CABINETS ||--o{ TREATMENTS : has
CABINETS ||--o{ INVOICES : has
CABINETS ||--o{ INVENTORY_ITEMS : has
CABINETS ||--o{ REPORTS : has
CABINETS ||--o{ AUDIT_LOGS : has

PATIENTS ||--o{ APPOINTMENTS : books
PATIENTS ||--o{ CONSULTATIONS : attends
PATIENTS ||--o{ TREATMENT_PLANS : receives
PATIENTS ||--o{ INVOICES : billed
PATIENTS ||--o{ DENTAL_CHARTS : owns
PATIENTS ||--o{ RADIOGRAPHIES : has
PATIENTS ||--o{ CLINICAL_ATTACHMENTS : has
PATIENTS ||--o{ PATIENT_CONSENTS : signs

APPOINTMENTS ||--o| CONSULTATIONS : generates

CONSULTATIONS ||--o{ TREATMENTS : includes
CONSULTATIONS ||--o{ DENTAL_CHARTS : updates
CONSULTATIONS ||--o{ INVENTORY_USAGE : consumes
CONSULTATIONS ||--o{ RADIOGRAPHIES : produces

TREATMENT_PLANS ||--o{ TREATMENT_PLAN_ITEMS : contains
TREATMENT_PLANS ||--o{ TREATMENTS : executes

INVOICES ||--o{ INVOICE_ITEMS : contains
INVOICES ||--o{ PAYMENT_TRANSACTIONS : paid_by

TREATMENTS ||--o| INVOICE_ITEMS : billed_as

INVENTORY_ITEMS ||--o{ INVENTORY_MOVEMENTS : logs
INVENTORY_ITEMS ||--o{ INVENTORY_USAGE : used_in

DENTAL_CHARTS ||--o{ DENTAL_CHART_HISTORY : tracks

USERS ||--o{ APPOINTMENTS : handles
USERS ||--o{ CONSULTATIONS : performs
USERS ||--o{ TREATMENTS : performs
USERS ||--o{ INVENTORY_MOVEMENTS : records
USERS ||--o{ REPORTS : generates
USERS ||--o{ AUDIT_LOGS : creates

  