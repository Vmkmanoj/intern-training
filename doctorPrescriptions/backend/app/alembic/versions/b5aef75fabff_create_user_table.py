"""create user table

Revision ID: b5aef75fabff
Revises: 
Create Date: 2026-07-07 14:06:07.690851

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'b5aef75fabff'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "UsersTable",

        sa.Column(
            "Id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            nullable=False
        ),

        sa.Column(
            "Name",
            sa.String(100),
            nullable=False
        ),

        sa.Column(
            "Qualification",
            sa.String(100),
            nullable=False
        ),

        sa.Column(
            "Specialization",
            sa.String(100),
            nullable=True
        ),

        sa.Column(
            "Email",
            sa.String(150),
            nullable=True
        ),

        sa.Column(
            "PhoneNumber",
            sa.String(15),
            nullable=True
        ),

        sa.Column(
            "HospitalName",
            sa.String(150),
            nullable=True
        ),

        sa.Column(
            "RegistrationNumber",
            sa.String(100),
            nullable=True
        ),

        sa.Column(
            "Password",
            sa.String(100),
            nullable=True
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
            nullable=False
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
