"""Create table for Teacher

Revision ID: d0df0ed4222f
Revises: 
Create Date: 2026-06-10 12:32:07.941787

"""
from typing import Sequence, Union
from sqlalchemy.dialects import postgresql

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd0df0ed4222f'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table("Teachers",sa.Column(
                    "Id",postgresql.UUID(as_uuid=True),primary_key=True),
                    sa.Column("Name",sa.String(100)),
                    sa.Column("age",sa.INTEGER),
                    sa.Column("adderss",sa.String(100)))
    


def downgrade() -> None:
    op.drop_table("Teachers")
