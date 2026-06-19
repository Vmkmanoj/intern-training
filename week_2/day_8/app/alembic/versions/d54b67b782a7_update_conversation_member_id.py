"""update conversation Member id

Revision ID: d54b67b782a7
Revises: fc653743829f
Create Date: 2026-06-19 15:01:44.102808

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd54b67b782a7'
down_revision: Union[str, Sequence[str], None] = 'fc653743829f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.alter_column(
        "conversationMembers",
        "coversatoinId",
        new_column_name="conversationId"
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
