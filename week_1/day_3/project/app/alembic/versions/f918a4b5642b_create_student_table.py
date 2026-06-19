"""create student table

Revision ID: f918a4b5642b
Revises: d0df0ed4222f
Create Date: 2026-06-10 15:35:33.264474

"""
from typing import Sequence, Union
from sqlalchemy.dialects import postgresql

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f918a4b5642b'
down_revision: Union[str, Sequence[str], None] = 'd0df0ed4222f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    
    op.create_table("Students",
                    sa.Column("Id",postgresql.UUID(as_uuid=True),primary_key=True),
                    sa.Column("name",sa.String(100)),
                    sa.Column("age",sa.String(100)),
                    sa.Column("city",sa.String(100)),
                    sa.Column("class",sa.String(100)))

def downgrade() -> None:
    op.drop_table("Students")
