"""create conversation member table

Revision ID: 54931ec5807c
Revises: 42aa74330d7f
Create Date: 2026-06-18 17:53:13.778820

"""
from typing import Sequence, Union
from sqlalchemy.dialects import postgresql

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '54931ec5807c'
down_revision: Union[str, Sequence[str], None] = '42aa74330d7f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("conversationMembers",sa.Column("id",postgresql.UUID(as_uuid=True),primary_key=True),
                    sa.Column("coversatoinId",postgresql.UUID(as_uuid=True),sa.ForeignKey("conversation.id"),nullable=False),
                    sa.Column("userId",postgresql.UUID(as_uuid=True),sa.ForeignKey("Users.id"),nullable=False),
                    sa.Column("joinedAt",sa.DateTime(),server_default=sa.func.now(),nullable=False))

def downgrade() -> None:
    """Downgrade schema."""
    pass
