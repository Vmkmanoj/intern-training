"""Patient table create ForeignKey

Revision ID: fbe78ea0691f
Revises: 8ece5c2548e1
Create Date: 2026-07-07 17:37:19.241089

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'fbe78ea0691f'
down_revision: Union[str, Sequence[str], None] = '8ece5c2548e1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("Patient",sa.Column("DoctorId",postgresql.UUID(as_uuid=True),sa.ForeignKey("Users.Id",ondelete="CASCADE"),nullable=False))


def downgrade() -> None:
    """Downgrade schema."""
    pass
