"""create Users table

Revision ID: 825a95a1b2e8
Revises: 
Create Date: 2026-06-18 15:22:56.973628

"""
from typing import Sequence, Union
from sqlalchemy.dialects import postgresql
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '825a95a1b2e8'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("Users",
        sa.Column("id",postgresql.UUID(as_uuid=True),primary_key=True),
        sa.Column("username",sa.String(200),nullable=False),
        sa.Column("email",sa.String(200),nullable=False),
        sa.Column("password",sa.String(200),nullable=False),
        sa.Column("profilepic",sa.String(200)),
        sa.Column("isOnline",sa.Boolean, nullable=False),
        sa.Column("createdAt",sa.DateTime(),server_default=sa.func.now(),nullable=False)
    )


def downgrade() -> None:
    op.drop_table("Users")