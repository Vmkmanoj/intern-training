"""updateColumn

Revision ID: de5f1a6a50e6
Revises: fbe78ea0691f
Create Date: 2026-07-08 11:14:02.957834

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'de5f1a6a50e6'
down_revision: Union[str, Sequence[str], None] = 'fbe78ea0691f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "Patient",
    sa.Column(
    "PatientToken",
    sa.Integer(),
    sa.Identity(start=1),
    nullable=False,
    unique=True
)
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
