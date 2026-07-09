"""Patient table

Revision ID: 8ece5c2548e1
Revises: 27f1ac819364
Create Date: 2026-07-07 17:26:39.108179

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '8ece5c2548e1'
down_revision: Union[str, Sequence[str], None] = '27f1ac819364'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "Patient",

        sa.Column(
            "Id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            nullable=False
        ),

        sa.Column(
            "PatientToken",
            sa.Integer(),
            autoincrement=True,
            nullable=False,
            unique=True
        ),

        sa.Column(
            "Name",
            sa.String(100),
            nullable=False
        ),

        sa.Column(
            "PhoneNumber",
            sa.String(15),
            nullable=False
        ),

        sa.Column(
            "Address",
            sa.Text(),
            nullable=True
        ),

        sa.Column(
            "CreatedBy",
            sa.String(100),
            nullable=False
        ),

        sa.Column(
            "UpdatedBy",
            sa.String(100),
            nullable=False
        ),

        sa.Column(
            "CreatedAt",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False
        ),

        sa.Column(
            "UpdatedAt",
            sa.DateTime(),
            server_default=sa.func.now(),
            onupdate=sa.func.now(),
            nullable=False
        )
    )


def downgrade() -> None:
    op.drop_table("Patient")
