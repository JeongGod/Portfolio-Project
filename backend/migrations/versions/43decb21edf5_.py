"""empty message

Revision ID: 43decb21edf5
Revises: 471256a9adb8
Create Date: 2021-08-20 00:40:41.098612

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '43decb21edf5'
down_revision = '471256a9adb8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('certificated', sa.Column('cert_name', sa.String(length=20), nullable=True))
    op.add_column('certificated', sa.Column('cert_detail', sa.String(length=255), nullable=True))
    op.add_column('certificated', sa.Column('cert_achieve_date', sa.DateTime(), nullable=True))
    op.drop_column('certificated', 'certificated_name')
    op.drop_column('certificated', 'certificated_detail')
    op.drop_column('certificated', 'certificated_achieve_date')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('certificated', sa.Column('certificated_achieve_date', mysql.DATETIME(), nullable=True))
    op.add_column('certificated', sa.Column('certificated_detail', mysql.VARCHAR(length=255), nullable=True))
    op.add_column('certificated', sa.Column('certificated_name', mysql.VARCHAR(length=20), nullable=True))
    op.drop_column('certificated', 'cert_achieve_date')
    op.drop_column('certificated', 'cert_detail')
    op.drop_column('certificated', 'cert_name')
    # ### end Alembic commands ###
