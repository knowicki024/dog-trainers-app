"""add pw

Revision ID: 5fdf6b408a17
Revises: d3679af52869
Create Date: 2024-02-14 19:01:24.573466

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5fdf6b408a17'
down_revision = 'd3679af52869'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###
