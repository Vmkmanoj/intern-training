"""update message messageColumn change

Revision ID: eceebe502f0e
Revises: 7980f3c3b34b
Create Date: 2026-06-19 16:03:31.643565

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'eceebe502f0e'
down_revision: Union[str, Sequence[str], None] = '7980f3c3b34b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "message",
        "MesageType",
        new_column_name="MessageType"
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
