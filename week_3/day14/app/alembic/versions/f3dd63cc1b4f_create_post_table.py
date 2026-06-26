"""create post table

Revision ID: f3dd63cc1b4f
Revises: b030b906f655
Create Date: 2026-06-25 10:20:59.707490

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision: str = "f3dd63cc1b4f"
down_revision: Union[str, Sequence[str], None] = "b030b906f655"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "post",
        sa.Column("postId", UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "userId", UUID(as_uuid=True), sa.ForeignKey("users.userId"), nullable=False
        ),
        sa.Column("description", sa.String(100), nullable=False),
        sa.Column("createdby", sa.String(100), nullable=False),
        sa.Column("updatedby", sa.String(100), nullable=False),
        sa.Column("createdAt", sa.TIMESTAMP, nullable=False),
        sa.Column("updatedAt", sa.TIMESTAMP, nullable=False),
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
