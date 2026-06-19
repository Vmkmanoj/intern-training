"""create conversation table

Revision ID: 42aa74330d7f
Revises: 825a95a1b2e8
Create Date: 2026-06-18 15:52:45.756651

"""
from typing import Sequence, Union

from alembic import op
from sqlalchemy.dialects import postgresql
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '42aa74330d7f'
down_revision: Union[str, Sequence[str], None] = '825a95a1b2e8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("conversation",
                     sa.Column("id",postgresql.UUID(as_uuid=True),primary_key=True),
                     sa.Column("name",sa.String(200),nullable=False),
                     sa.Column("isgroup",sa.Boolean(),nullable=False),
                     sa.Column("createby",postgresql.UUID(as_uuid=True),sa.ForeignKey("Users.id"),nullable=False),
                     sa.Column("createdAt",sa.DateTime(),server_default=sa.func.now(),nullable=False)
                     )


def downgrade() -> None:
    """Downgrade schema."""
    pass
