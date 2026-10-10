-- Membuat tabel loans
CREATE TABLE loans (
    id BIGSERIAL PRIMARY KEY,
    member_name VARCHAR(100) NOT NULL,
    member_id VARCHAR(50) NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    book_isbn VARCHAR(50),
    loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'Dipinjam' CHECK (status IN ('Dipinjam', 'Kembali', 'Terlambat')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_member_id ON loans(member_id);
