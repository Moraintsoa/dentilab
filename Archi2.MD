erDiagram

    %% ─── CORE MULTI-TENANT ───────────────────────────────────
    CABINETS {
        uuid id PK
        varchar slug UK "sous-domaine SaaS"
        varchar name
        jsonb address
        varchar phone
        varchar email
        enum plan_abonnement "free|pro|enterprise"
        jsonb config_horaires
        timestamptz created_at
    }

    USERS {
        uuid id PK
        uuid cabinet_id FK
        varchar email UK
        varchar full_name
        enum role "docteur|assistante|secretaire|admin"
        varchar numero_rpps "N° ordre dentiste"
        bool is_active
        timestamptz derniere_connexion
        timestamptz created_at
    }

    PATIENTS {
        uuid id PK
        uuid cabinet_id FK
        varchar numero_dossier UK
        varchar first_name
        varchar last_name
        date date_of_birth
        enum genre "m|f|autre"
        varchar phone
        varchar email
        text address
        text medical_notes "chiffré pgcrypto"
        text allergies
        bytea numero_securite "chiffré pgcrypto"
        jsonb mutuelle "chiffré pgcrypto"
        varchar medecin_traitant
        bool is_archived "droit à l'oubli RGPD"
        timestamptz created_at
    }

    PATIENT_CONSENTS {
        uuid id PK
        uuid patient_id FK
        enum type "soins|rgpd|photo|partage_data"
        varchar version_formulaire
        enum canal "papier|email|tablette"
        bool accepted
        timestamptz signed_at
    }

    %% ─── PLANNING ────────────────────────────────────────────
    APPOINTMENTS {
        uuid id PK
        uuid cabinet_id FK
        uuid patient_id FK
        uuid doctor_id FK
        timestamptz start_time
        timestamptz end_time
        enum status "planifie|confirme|en_cours|termine|annule|absent"
        text reason
        bool rappel_envoye
        timestamptz rappel_at
        bool confirmation_patient
        text cancel_reason
        varchar couleur_agenda
        timestamptz created_at
    }

    %% ─── CLINIQUE ────────────────────────────────────────────
    CONSULTATIONS {
        uuid id PK
        uuid appointment_id FK
        uuid patient_id FK
        uuid doctor_id FK
        text chief_complaint
        text clinical_notes
        text diagnosis
        timestamptz created_at
    }

    PRESCRIPTIONS {
        uuid id PK
        uuid consultation_id FK
        uuid patient_id FK
        uuid doctor_id FK
        jsonb medicaments "nom|dosage|frequence|duree"
        int validite_jours
        text notes
        timestamptz created_at
    }

    TREATMENTS {
        uuid id PK
        uuid consultation_id FK
        uuid treatment_plan_item_id FK "nullable, lien plan→réel"
        int fdi_tooth_number "11-48"
        varchar treatment_type
        text description
        decimal unit_price_snapshot "figé à l'acte"
        varchar currency
        int duration_min
        text[] faces
        enum status "planifie|en_cours|realise|annule"
        timestamptz created_at
    }

    TREATMENT_PLANS {
        uuid id PK
        uuid patient_id FK
        uuid doctor_id FK
        varchar title
        text description
        enum status "brouillon|actif|termine|abandonne"
        decimal estimated_total
        timestamptz created_at
    }

    TREATMENT_PLAN_ITEMS {
        uuid id PK
        uuid treatment_plan_id FK
        int fdi_tooth_number
        varchar treatment_type
        decimal estimated_price
        enum status "planifie|realise|annule"
        int ordre
    }

    %% ─── SCHÉMA DENTAIRE ─────────────────────────────────────
    DENTAL_CHARTS {
        uuid id PK
        uuid patient_id FK
        int fdi_number "CHECK 11-48 / 51-85"
        int quadrant "1-4 adulte, 5-8 enfant"
        enum tooth_status "saine|caries|obturee|couronne|absente|bridge|implant|devitalisee|surveillance|fracture"
        text[] faces_atteintes "mesiale|distale|occlusale|buccale|linguale"
        text notes
        uuid last_updated_by FK
        timestamptz updated_at
    }

    DENTAL_CHART_HISTORY {
        uuid id PK
        uuid dental_chart_id FK
        enum old_status
        enum new_status
        text[] old_faces
        text[] new_faces
        uuid changed_by FK
        timestamptz changed_at
    }

    RADIOGRAPHIES {
        uuid id PK
        uuid patient_id FK
        uuid consultation_id FK "nullable"
        uuid doctor_id FK
        int[] fdi_numbers "dents concernées"
        enum type "panoramique|bitewing|periapical|cephalometrique"
        enum storage_provider "s3|supabase|local"
        text file_url
        int file_size_kb
        jsonb annotations "zones annotées frontend"
        text notes
        date taken_at
    }

    %% ─── FACTURATION ─────────────────────────────────────────
    INVOICES {
        uuid id PK
        varchar numero UK
        uuid patient_id FK
        uuid cabinet_id FK
        uuid consultation_id FK "nullable"
        decimal total_ht
        decimal tva_amount
        decimal total_ttc
        decimal remboursement_mutuelle
        decimal reste_a_charge
        enum status "brouillon|emise|payee|partielle|annulee"
        date date_echeance
        timestamptz issued_at
    }

    INVOICE_ITEMS {
        uuid id PK
        uuid invoice_id FK
        uuid treatment_id FK
        varchar description
        int quantity
        decimal unit_price
        decimal total_line
    }

    PAYMENT_TRANSACTIONS {
        uuid id PK
        uuid invoice_id FK
        decimal amount
        enum payment_method "especes|carte|virement|cheque|tiers_payant"
        varchar reference
        timestamptz paid_at
    }

    %% ─── INVENTAIRE ──────────────────────────────────────────
    INVENTORY_ITEMS {
        uuid id PK
        uuid cabinet_id FK
        varchar reference UK
        varchar name
        enum category "consommable|instrument|medicament|materiau"
        int quantity
        int min_threshold
        decimal unit_cost
        varchar fournisseur
        date date_expiration
        varchar numero_lot
    }

    INVENTORY_MOVEMENTS {
        uuid id PK
        uuid item_id FK
        uuid cabinet_id FK
        enum movement_type "entree|sortie|perte|ajustement"
        int quantity
        text reason
        uuid created_by FK
        timestamptz created_at
    }

    INVENTORY_USAGE {
        uuid id PK
        uuid treatment_id FK
        uuid item_id FK
        int quantity_used
    }

    %% ─── NOTIFICATIONS ───────────────────────────────────────
    NOTIFICATIONS {
        uuid id PK
        uuid cabinet_id FK
        uuid patient_id FK "nullable"
        uuid user_id FK "nullable"
        enum type "rappel_rdv|facture_impayee|stock_bas|rgpd|system"
        enum canal "sms|email|push|interne"
        enum status "pending|sent|failed|read"
        jsonb payload
        timestamptz scheduled_at
        timestamptz sent_at
    }

    %% ─── RAPPORTS ────────────────────────────────────────────
    REPORTS {
        uuid id PK
        uuid cabinet_id FK
        uuid generated_by FK
        enum type "ca|patients_actifs|actes|stock|rdv"
        date periode_debut
        date periode_fin
        jsonb data_snapshot
        enum format "pdf|csv|xlsx"
        text export_url
        timestamptz created_at
    }

    %% ─── AUDIT ───────────────────────────────────────────────
    AUDIT_LOGS {
        uuid id PK
        varchar table_name
        uuid record_id
        enum action "INSERT|UPDATE|DELETE"
        jsonb old_data
        jsonb new_data
        uuid user_id FK "nullable"
        varchar ip_address
        timestamptz created_at
    }

    %% ─── RELATIONS ───────────────────────────────────────────
    CABINETS ||--o{ USERS : "emploie"
    CABINETS ||--o{ PATIENTS : "gère"
    CABINETS ||--o{ APPOINTMENTS : "planifie"
    CABINETS ||--o{ INVOICES : "émet"
    CABINETS ||--o{ INVENTORY_ITEMS : "stocke"
    CABINETS ||--o{ NOTIFICATIONS : "envoie"
    CABINETS ||--o{ REPORTS : "génère"

    PATIENTS ||--o{ APPOINTMENTS : "prend"
    PATIENTS ||--o{ CONSULTATIONS : "reçoit"
    PATIENTS ||--o{ TREATMENT_PLANS : "suit"
    PATIENTS ||--o{ INVOICES : "reçoit"
    PATIENTS ||--o{ DENTAL_CHARTS : "possède"
    PATIENTS ||--o{ RADIOGRAPHIES : "possède"
    PATIENTS ||--o{ PATIENT_CONSENTS : "signe"
    PATIENTS ||--o{ NOTIFICATIONS : "reçoit"

    USERS ||--o{ APPOINTMENTS : "assure"
    USERS ||--o{ CONSULTATIONS : "effectue"
    USERS ||--o{ TREATMENT_PLANS : "crée"
    USERS ||--o{ PRESCRIPTIONS : "rédige"

    APPOINTMENTS ||--o| CONSULTATIONS : "génère"
    CONSULTATIONS ||--o{ TREATMENTS : "contient"
    CONSULTATIONS ||--o{ PRESCRIPTIONS : "produit"
    CONSULTATIONS ||--o{ RADIOGRAPHIES : "génère"

    TREATMENTS }o--o| TREATMENT_PLAN_ITEMS : "réalise"
    TREATMENT_PLANS ||--o{ TREATMENT_PLAN_ITEMS : "détaille"

    INVOICES ||--o{ INVOICE_ITEMS : "contient"
    INVOICES ||--o{ PAYMENT_TRANSACTIONS : "reçoit"
    INVOICE_ITEMS }o--|| TREATMENTS : "facture"

    INVENTORY_ITEMS ||--o{ INVENTORY_MOVEMENTS : "enregistre"
    TREATMENTS ||--o{ INVENTORY_USAGE : "consomme"
    INVENTORY_USAGE }o--|| INVENTORY_ITEMS : "utilise"

    DENTAL_CHARTS ||--o{ DENTAL_CHART_HISTORY : "historise"