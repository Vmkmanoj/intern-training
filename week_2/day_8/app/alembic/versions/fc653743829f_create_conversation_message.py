"""create conversation message

Revision ID: fc653743829f
Revises: 54931ec5807c
Create Date: 2026-06-18 18:04:25.651033

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'fc653743829f'
down_revision: Union[str, Sequence[str], None] = '54931ec5807c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("message",sa.Column("id",postgresql.UUID(as_uuid=True),primary_key=True),
                    sa.Column("coversatoinId",postgresql.UUID(as_uuid=True),sa.ForeignKey("conversation.id"),nullable=False),
                    sa.Column("senderId",postgresql.UUID(as_uuid=True),sa.ForeignKey("Users.id"),nullable=False),
                    sa.Column("MessageText",sa.Text(),nullable=False),
                    sa.Column("MesageType",sa.String(),nullable=False),
                    sa.Column("createdAt",sa.DateTime(),server_default=sa.func.now(),nullable=False))


def downgrade() -> None:
    """Downgrade schema."""
    pass
