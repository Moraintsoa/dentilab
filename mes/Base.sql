-- ============================================
-- SCHEMA SQL - Gestion Cabinet Dentaire
-- Avec toutes les améliorations suggérées
-- ============================================

-- 1. CABINETS
CREATE TABLE cabinets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    adresse TEXT,
    telephone TEXT,
    email TEXT,
    plan_abonnement TEXT NOT NULL DEFAULT 'basic',
    est_actif BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 2. ROLES (enum structuré)
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL UNIQUE, -- 'admin', 'praticien', 'assistant', 'secretaire'
    description TEXT
);

-- 3. UTILISATEURS
CREATE TABLE utilisateurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    auth_user_id UUID UNIQUE, -- lien vers auth.users
    email TEXT NOT NULL,
    prenom TEXT,
    nom TEXT,
    telephone TEXT,
    est_actif BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    UNIQUE(cabinet_id, email)
);

-- 4. UTILISATEURS_ROLES (multi-rôles)
CREATE TABLE utilisateurs_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(utilisateur_id, role_id)
);

-- 5. PATIENTS
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    date_naissance DATE,
    sexe TEXT CHECK (sexe IN ('M', 'F', 'autre')),
    telephone TEXT,
    email TEXT,
    adresse TEXT,
    numero_securite_sociale TEXT,
    allergies TEXT,
    anonymise BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 6. ANTECEDENTS MEDICAUX
CREATE TABLE antecedents_medicaux (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    type TEXT NOT NULL, -- 'allergie', 'maladie', 'chirurgie', 'medicament', 'autre'
    description TEXT NOT NULL,
    date_debut DATE,
    date_fin DATE,
    est_actif BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. ODONTOGRAMMES (1:N avec patient pour historique)
CREATE TABLE odontogrammes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    date_examen TIMESTAMPTZ NOT NULL DEFAULT now(),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. DENTS
CREATE TABLE dents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    odontogramme_id UUID NOT NULL REFERENCES odontogrammes(id) ON DELETE CASCADE,
    numero_dent INT NOT NULL CHECK (numero_dent BETWEEN 11 AND 85),
    type_dent TEXT CHECK (type_dent IN ('incisive', 'canine', 'premolaire', 'molaire', 'deciduale')),
    statut_actuel TEXT NOT NULL DEFAULT 'saine',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(odontogramme_id, numero_dent)
);

-- 9. HISTORIQUE ETAT DENT
CREATE TABLE historique_etat_dent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    dent_id UUID NOT NULL REFERENCES dents(id) ON DELETE CASCADE,
    ancien_statut TEXT,
    nouveau_statut TEXT NOT NULL,
    modifie_par UUID REFERENCES utilisateurs(id),
    date_modification TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. RENDEZ-VOUS
CREATE TABLE rendez_vous (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    patient_id UUID NOT NULL REFERENCES patients(id),
    praticien_id UUID NOT NULL REFERENCES utilisateurs(id),
    date_heure TIMESTAMPTZ NOT NULL,
    duree_prevue INTERVAL NOT NULL DEFAULT '30 minutes',
    motif TEXT,
    notes TEXT,
    statut TEXT NOT NULL DEFAULT 'planifie'
        CHECK (statut IN ('planifie', 'confirme', 'en_cours', 'termine', 'annule', 'absent')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. CONSULTATIONS
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    patient_id UUID NOT NULL REFERENCES patients(id),
    praticien_id UUID NOT NULL REFERENCES utilisateurs(id),
    rendez_vous_id UUID REFERENCES rendez_vous(id),
    date_debut TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_fin TIMESTAMPTZ,
    notes_cliniques TEXT,
    statut TEXT NOT NULL DEFAULT 'en_cours'
        CHECK (statut IN ('en_cours', 'terminee', 'annulee')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. NOMENCLATURE DES ACTES (CCAM/NGAP)
CREATE TABLE nomenclature_actes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE, -- code CCAM ou NGAP
    libelle TEXT NOT NULL,
    tarif_base DECIMAL(10,2) NOT NULL DEFAULT 0,
    categorie TEXT, -- 'soins_conservateurs', 'prothese', 'chirurgie', 'orthodontie', etc.
    est_actif BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. TRAITEMENTS
CREATE TABLE traitements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    consultation_id UUID NOT NULL REFERENCES consultations(id),
    dent_id UUID REFERENCES dents(id),
    acte_id UUID REFERENCES nomenclature_actes(id),
    effectue_par UUID NOT NULL REFERENCES utilisateurs(id),
    type_acte TEXT NOT NULL, -- fallback si pas dans nomenclature
    description TEXT,
    statut TEXT NOT NULL DEFAULT 'planifie'
        CHECK (statut IN ('planifie', 'en_cours', 'termine', 'annule')),
    cout DECIMAL(10,2) NOT NULL DEFAULT 0,
    facturable BOOLEAN NOT NULL DEFAULT true,
    facture BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. FACTURES
CREATE TABLE factures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    patient_id UUID NOT NULL REFERENCES patients(id),
    cree_par UUID NOT NULL REFERENCES utilisateurs(id),
    numero_facture TEXT NOT NULL, -- ex: 'FAC-2025-00001'
    statut TEXT NOT NULL DEFAULT 'brouillon'
        CHECK (statut IN ('brouillon', 'emise', 'payee_partiellement', 'payee', 'annulee')),
    montant_total DECIMAL(10,2) NOT NULL DEFAULT 0,
    montant_paye DECIMAL(10,2) NOT NULL DEFAULT 0,
    date_echeance DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(cabinet_id, numero_facture)
);

-- 15. LIGNES FACTURE
CREATE TABLE lignes_facture (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facture_id UUID NOT NULL REFERENCES factures(id) ON DELETE CASCADE,
    traitement_id UUID REFERENCES traitements(id),
    description TEXT,
    quantite INT NOT NULL DEFAULT 1,
    prix_unitaire DECIMAL(10,2) NOT NULL DEFAULT 0,
    prix_total DECIMAL(10,2) NOT NULL DEFAULT 0
);

-- 16. PAIEMENTS
CREATE TABLE paiements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facture_id UUID NOT NULL REFERENCES factures(id),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    montant DECIMAL(10,2) NOT NULL,
    mode_paiement TEXT NOT NULL
        CHECK (mode_paiement IN ('especes', 'carte', 'cheque', 'virement', 'mutuelle', 'autre')),
    reference TEXT, -- numéro de chèque, ref virement, etc.
    enregistre_par UUID REFERENCES utilisateurs(id),
    date_paiement TIMESTAMPTZ NOT NULL DEFAULT now(),
    notes TEXT
);

-- 17. ARTICLES STOCK
CREATE TABLE articles_stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    nom TEXT NOT NULL,
    reference TEXT,
    categorie TEXT,
    quantite INT NOT NULL DEFAULT 0,
    seuil_alerte INT DEFAULT 5,
    unite TEXT DEFAULT 'piece',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 18. MOUVEMENTS STOCK
CREATE TABLE mouvements_stock (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    article_id UUID NOT NULL REFERENCES articles_stock(id),
    consultation_id UUID REFERENCES consultations(id),
    effectue_par UUID REFERENCES utilisateurs(id),
    type_mouvement TEXT NOT NULL
        CHECK (type_mouvement IN ('entree', 'sortie', 'ajustement', 'perte')),
    quantite INT NOT NULL,
    notes TEXT,
    date_mouvement TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 19. RADIOGRAPHIES
CREATE TABLE radiographies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    patient_id UUID NOT NULL REFERENCES patients(id),
    consultation_id UUID REFERENCES consultations(id),
    dent_id UUID REFERENCES dents(id),
    televerse_par UUID REFERENCES utilisateurs(id),
    type_radio TEXT CHECK (type_radio IN ('panoramique', 'retroalveolaire', 'cbct', 'cephalometrique', 'autre')),
    storage_path TEXT NOT NULL, -- chemin dans le storage (signed URLs)
    notes TEXT,
    date_upload TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 20. DOCUMENTS
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cabinet_id UUID NOT NULL REFERENCES cabinets(id),
    patient_id UUID REFERENCES patients(id),
    consultation_id UUID REFERENCES consultations(id),
    cree_par UUID REFERENCES utilisateurs(id),
    type_document TEXT NOT NULL
        CHECK (type_document IN ('ordonnance', 'certificat', 'consentement', 'courrier', 'compte_rendu', 'autre')),
    titre TEXT NOT NULL,
    storage_path TEXT,
    contenu TEXT, -- contenu texte si généré
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- INDEX POUR PERFORMANCE
-- ============================================

CREATE INDEX idx_utilisateurs_cabinet ON utilisateurs(cabinet_id);
CREATE INDEX idx_patients_cabinet ON patients(cabinet_id);
CREATE INDEX idx_patients_nom ON patients(cabinet_id, nom, prenom);
CREATE INDEX idx_rendez_vous_date ON rendez_vous(cabinet_id, date_heure);
CREATE INDEX idx_rendez_vous_patient ON rendez_vous(patient_id);
CREATE INDEX idx_rendez_vous_praticien ON rendez_vous(praticien_id, date_heure);
CREATE INDEX idx_consultations_patient ON consultations(patient_id);
CREATE INDEX idx_consultations_praticien ON consultations(praticien_id);
CREATE INDEX idx_traitements_consultation ON traitements(consultation_id);
CREATE INDEX idx_factures_patient ON factures(patient_id);
CREATE INDEX idx_factures_statut ON factures(cabinet_id, statut);
CREATE INDEX idx_paiements_facture ON paiements(facture_id);
CREATE INDEX idx_mouvements_article ON mouvements_stock(article_id);
CREATE INDEX idx_radiographies_patient ON radiographies(patient_id);
CREATE INDEX idx_dents_odontogramme ON dents(odontogramme_id);
CREATE INDEX idx_odontogrammes_patient ON odontogrammes(patient_id);

-- ============================================
-- TRIGGERS updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_cabinets_updated_at BEFORE UPDATE ON cabinets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_utilisateurs_updated_at BEFORE UPDATE ON utilisateurs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_dents_updated_at BEFORE UPDATE ON dents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_rendez_vous_updated_at BEFORE UPDATE ON rendez_vous FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_traitements_updated_at BEFORE UPDATE ON traitements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_factures_updated_at BEFORE UPDATE ON factures FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_articles_stock_updated_at BEFORE UPDATE ON articles_stock FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- DONNEES INITIALES
-- ============================================

INSERT INTO roles (nom, description) VALUES
    ('admin', 'Administrateur du cabinet'),
    ('praticien', 'Dentiste / Chirurgien-dentiste'),
    ('assistant', 'Assistant(e) dentaire'),
    ('secretaire', 'Secrétaire médical(e)');

-- Quelques actes CCAM courants
INSERT INTO nomenclature_actes (code, libelle, tarif_base, categorie) VALUES
    ('HBBD001', 'Détartrage', 28.92, 'soins_conservateurs'),
    ('HBMD038', 'Obturation 1 face', 26.97, 'soins_conservateurs'),
    ('HBMD036', 'Obturation 2 faces', 45.38, 'soins_conservateurs'),
    ('HBMD034', 'Obturation 3 faces', 60.95, 'soins_conservateurs'),
    ('HBGD001', 'Extraction simple', 33.44, 'chirurgie'),
    ('HBGD002', 'Extraction complexe', 79.53, 'chirurgie'),
    ('HBLD038', 'Couronne céramique', 107.50, 'prothese'),
    ('HBLD036', 'Couronne céramo-métallique', 107.50, 'prothese'),
    ('HBMD050', 'Traitement endodontique monoradiculée', 33.74, 'endodontie'),
    ('HBMD053', 'Traitement endodontique pluriradiculée', 81.94, 'endodontie'),
    ('HBJD001', 'Radiographie rétroalvéolaire', 5.31, 'radiologie'),
    ('HBQK001', 'Radiographie panoramique', 21.28, 'radiologie');
