CREATE TABLE installment_requests (
    id SERIAL PRIMARY KEY,
    tariff_id VARCHAR(50) NOT NULL,
    tariff_title VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);