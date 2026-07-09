"""updateColumn token

Revision ID: e44ec8199b11
Revises: e745c31ab8fb
Create Date: 2026-07-08 11:25:20.807270

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'e44ec8199b11'
down_revision: Union[str, Sequence[str], None] = 'e745c31ab8fb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Create the sequence
    op.execute("""
        CREATE SEQUENCE IF NOT EXISTS patient_token_seq
        START WITH 1001
        INCREMENT BY 1;
    """)

    # Set the column default to use the sequence
    op.execute("""
        ALTER TABLE "Patient"
        ALTER COLUMN "PatientToken"
        SET DEFAULT nextval('patient_token_seq');
    """)



def downgrade() -> None:
    """Downgrade schema."""
    pass
