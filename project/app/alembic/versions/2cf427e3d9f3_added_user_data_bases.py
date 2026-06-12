"""added user data bases

Revision ID: 2cf427e3d9f3
Revises: f918a4b5642b
Create Date: 2026-06-11 18:09:15.103544

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2cf427e3d9f3'
down_revision: Union[str, Sequence[str], None] = 'f918a4b5642b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
