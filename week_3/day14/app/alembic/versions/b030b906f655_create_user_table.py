"""create user table

Revision ID: b030b906f655
Revises: 
Create Date: 2026-06-25 10:12:39.895745

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision: str = 'b030b906f655'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("users",
                    sa.Column("userId",UUID(as_uuid=True),primary_key=True),
                    sa.Column("userName",sa.String(100),nullable=False),
                    sa.Column("emailId",sa.String(100),nullable=False),
                    sa.Column("about",sa.String(100),nullable=False),
                    sa.Column("createdby",sa.String(100),nullable=False),
                    sa.Column("updatedby",sa.String(100),nullable=False),
                    sa.Column("createdAt",sa.TIMESTAMP,nullable=False),
                    sa.Column("updatedAt",sa.TIMESTAMP,nullable=False)
                    )


def downgrade() -> None:
    op.drop_table("users")
    
