"""update message converstion id

Revision ID: 7980f3c3b34b
Revises: d54b67b782a7
Create Date: 2026-06-19 15:54:21.423809

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7980f3c3b34b'
down_revision: Union[str, Sequence[str], None] = 'd54b67b782a7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "message",
        "coversatoinId",
        new_column_name="conversationId"
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
