"""updateColumn

Revision ID: e745c31ab8fb
Revises: de5f1a6a50e6
Create Date: 2026-07-08 11:15:06.598623

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e745c31ab8fb'
down_revision: Union[str, Sequence[str], None] = 'de5f1a6a50e6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
