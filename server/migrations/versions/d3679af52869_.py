"""empty message

Revision ID: d3679af52869
Revises: 0e92bcf0a079
Create Date: 2024-02-09 16:45:37.532303

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3679af52869'
down_revision = '0e92bcf0a079'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dogs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('breed', sa.String(), nullable=True),
    sa.Column('owner', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('trainers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('classes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('dog_id', sa.Integer(), nullable=True),
    sa.Column('trainer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['dog_id'], ['dogs.id'], name=op.f('fk_classes_dog_id_dogs')),
    sa.ForeignKeyConstraint(['trainer_id'], ['trainers.id'], name=op.f('fk_classes_trainer_id_trainers')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('classes')
    op.drop_table('trainers')
    op.drop_table('dogs')
    # ### end Alembic commands ###
