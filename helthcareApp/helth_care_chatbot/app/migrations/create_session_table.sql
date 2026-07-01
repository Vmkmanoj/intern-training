CREATE TABLE session_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sessionTitle VARCHAR(200) NOT NULL,

    message JSONB NOT NULL DEFAULT '[]'::jsonb,

    userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    createdBy VARCHAR(200),
    updatedBy VARCHAR(200),

    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
