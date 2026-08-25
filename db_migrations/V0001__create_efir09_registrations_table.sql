CREATE TABLE IF NOT EXISTS efir09_registrations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_efir09_registrations_email ON efir09_registrations(email);
CREATE INDEX IF NOT EXISTS idx_efir09_registrations_created_at ON efir09_registrations(created_at);
