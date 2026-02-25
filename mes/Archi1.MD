erDiagram

    CABINETS {
        uuid id PK
        string name
        string address
        string phone
        string email
        timestamp created_at
    }

    USERS {
        uuid id PK
        uuid cabinet_id FK
        string email
        string full_name
        string role
        timestamp created_at
    }

    PATIENTS {
        uuid id PK
        uuid cabinet_id FK
        string first_name
        string last_name
        date date_of_birth
        string phone
        string email
        string address
        text medical_notes
        text allergies
        timestamp created_at
    }

    APPOINTMENTS {
        uuid id PK
        uuid cabinet_id FK
        uuid patient_id FK
        uuid doctor_id FK
        timestamp start_time
        timestamp end_time
        string status
        text reason
        timestamp created_at
    }

    CONSULTATIONS {
        uuid id PK
        uuid appointment_id FK
        uuid patient_id FK
        uuid doctor_id FK
        text chief_complaint
        text clinical_notes
        text diagnosis
        timestamp created_at
    }

    TREATMENTS {
        uuid id PK
        uuid consultation_id FK
        int tooth_number
        string treatment_type
        text description
        decimal unit_price
        string status
        timestamp created_at
    }

    TREATMENT_PLANS {
        uuid id PK
        uuid patient_id FK
        uuid doctor_id FK
        string title
        text description
        string status
        timestamp created_at
    }

    TREATMENT_PLAN_ITEMS {
        uuid id PK
        uuid treatment_plan_id FK
        int tooth_number
        string treatment_type
        decimal estimated_price
        string status
    }

    INVOICES {
        uuid id PK
        uuid patient_id FK
        uuid cabinet_id FK
        decimal total_amount
        string status
        timestamp issued_at
    }

    INVOICE_ITEMS {
        uuid id PK
        uuid invoice_id FK
        uuid treatment_id FK
        string description
        int quantity
        decimal unit_price
    }

    PAYMENT_TRANSACTIONS {
        uuid id PK
        uuid invoice_id FK
        decimal amount
        string payment_method
        timestamp paid_at
    }

    INVENTORY_ITEMS {
        uuid id PK
        uuid cabinet_id FK
        string name
        string category
        int quantity
        int min_threshold
        decimal unit_cost
    }

    INVENTORY_MOVEMENTS {
        uuid id PK
        uuid item_id FK
        uuid cabinet_id FK
        string movement_type
        int quantity
        text reason
        timestamp created_at
    }

    INVENTORY_USAGE {
        uuid id PK
        uuid treatment_id FK
        uuid item_id FK
        int quantity_used
    }

    DENTAL_CHARTS {
        uuid id PK
        uuid patient_id FK
        int tooth_number
        string tooth_status
        text notes
        uuid last_updated_by FK
        timestamp updated_at
    }

    DENTAL_CHART_HISTORY {
        uuid id PK
        uuid dental_chart_id FK
        string old_status
        string new_status
        uuid changed_by FK
        timestamp changed_at
    }

    RADIOGRAPHIES {
        uuid id PK
        uuid patient_id FK
        int tooth_number
        string file_url
        string type
        text notes
        timestamp taken_at
    }

    CABINETS ||--o{ USERS : "emploie"
    CABINETS ||--o{ PATIENTS : "gère"
    CABINETS ||--o{ APPOINTMENTS : "planifie"
    CABINETS ||--o{ INVOICES : "émet"
    CABINETS ||--o{ INVENTORY_ITEMS : "stocke"

    PATIENTS ||--o{ APPOINTMENTS : "prend"
    PATIENTS ||--o{ CONSULTATIONS : "reçoit"
    PATIENTS ||--o{ TREATMENT_PLANS : "suit"
    PATIENTS ||--o{ INVOICES : "reçoit"
    PATIENTS ||--o{ DENTAL_CHARTS : "possède"
    PATIENTS ||--o{ RADIOGRAPHIES : "possède"

    USERS ||--o{ APPOINTMENTS : "assure"
    USERS ||--o{ CONSULTATIONS : "effectue"
    USERS ||--o{ TREATMENT_PLANS : "crée"

    APPOINTMENTS ||--o| CONSULTATIONS : "génère"
    CONSULTATIONS ||--o{ TREATMENTS : "contient"

    TREATMENT_PLANS ||--o{ TREATMENT_PLAN_ITEMS : "détaille"

    INVOICES ||--o{ INVOICE_ITEMS : "contient"
    INVOICES ||--o{ PAYMENT_TRANSACTIONS : "reçoit"

    INVENTORY_ITEMS ||--o{ INVENTORY_MOVEMENTS : "enregistre"
    TREATMENTS ||--o{ INVENTORY_USAGE : "consomme"

    DENTAL_CHARTS ||--o{ DENTAL_CHART_HISTORY : "historise"
