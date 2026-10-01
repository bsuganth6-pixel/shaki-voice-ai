CREATE TABLE public.schemes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    eligibility JSONB NOT NULL,
    documents_required TEXT[] NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.schemes 
FOR SELECT 
USING (true);

-- Insert initial schemes from knowledge base
INSERT INTO public.schemes (id, name, description, eligibility, documents_required) VALUES
('pm_ujjwala_yojana', 'PM Ujjwala Yojana (Free LPG Cylinder)', 'Provides free LPG connections to women from BPL families.', '{"gender": "female", "minAge": 18, "incomeLevel": "bpl", "hasExistingConnection": false}'::jsonb, ARRAY['Aadhaar Card', 'BPL Ration Card', 'Bank Account Details', 'Passport Size Photograph']),
('kalaignar_magalir_urimai', 'Kalaignar Magalir Urimai Thittam', 'Provides monthly financial assistance to eligible women heads of families in Tamil Nadu.', '{"gender": "female", "minAge": 21, "state": "tamil_nadu", "maxAnnualIncome": 250000, "maxLandOwnershipAcres": 5}'::jsonb, ARRAY['Aadhaar Card', 'Family Ration Card', 'Income Certificate', 'Bank Passbook']);
