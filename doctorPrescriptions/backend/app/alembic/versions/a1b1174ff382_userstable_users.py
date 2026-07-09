"""UsersTable -> users

Revision ID: a1b1174ff382
Revises: b5aef75fabff
Create Date: 2026-07-07 14:43:25.151997

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'a1b1174ff382'
down_revision: Union[str, Sequence[str], None] = 'b5aef75fabff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
   op.drop_table("UsersTable")


def downgrade() -> None:
    """Downgrade schema."""
    pass
