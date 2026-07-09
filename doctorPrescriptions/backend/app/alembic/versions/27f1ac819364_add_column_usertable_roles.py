"""add column usertable roles

Revision ID: 27f1ac819364
Revises: 860d99c95fd7
Create Date: 2026-07-07 16:30:43.915587

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '27f1ac819364'
down_revision: Union[str, Sequence[str], None] = '860d99c95fd7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
    "Users",
    sa.Column("Roles", sa.String(100), nullable=True)
)


def downgrade() -> None:
    """Downgrade schema."""
    pass
