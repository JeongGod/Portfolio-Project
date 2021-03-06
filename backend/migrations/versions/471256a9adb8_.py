"""empty message

Revision ID: 471256a9adb8
Revises: 1693b399ba20
Create Date: 2021-08-20 00:18:31.232497

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '471256a9adb8'
down_revision = '1693b399ba20'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('awards', sa.Column('award_id', sa.Integer(), autoincrement=True, nullable=False))
    op.drop_column('awards', 'awadrd_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('awards', sa.Column('awadrd_id', mysql.INTEGER(), autoincrement=True, nullable=False))
    op.drop_column('awards', 'award_id')
    # ### end Alembic commands ###
