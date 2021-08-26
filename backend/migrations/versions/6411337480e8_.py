"""empty message

Revision ID: 6411337480e8
Revises: 43decb21edf5
Create Date: 2021-08-20 03:28:30.077104

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6411337480e8'
down_revision = '43decb21edf5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('certificates',
    sa.Column('cert_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('racer_no', sa.Integer(), nullable=False),
    sa.Column('cert_name', sa.String(length=20), nullable=True),
    sa.Column('cert_detail', sa.String(length=255), nullable=True),
    sa.Column('cert_achieve_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['racer_no'], ['racers.racer_no'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('cert_id'),
    mysql_collate='utf8_general_ci'
    )
    op.create_table('educations',
    sa.Column('edu_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('racer_no', sa.Integer(), nullable=False),
    sa.Column('school_name', sa.String(length=20), nullable=True),
    sa.Column('major', sa.String(length=20), nullable=True),
    sa.Column('education', sa.String(length=10), nullable=True),
    sa.ForeignKeyConstraint(['racer_no'], ['racers.racer_no'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('edu_id'),
    mysql_collate='utf8_general_ci'
    )
    op.create_table('projects',
    sa.Column('project_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('racer_no', sa.Integer(), nullable=False),
    sa.Column('project_name', sa.String(length=20), nullable=True),
    sa.Column('project_detail', sa.String(length=255), nullable=True),
    sa.Column('project_start_date', sa.DateTime(), nullable=True),
    sa.Column('project_end_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['racer_no'], ['racers.racer_no'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('project_id'),
    mysql_collate='utf8_general_ci'
    )
    op.drop_table('certificated')
    op.drop_table('education')
    op.drop_table('project')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project',
    sa.Column('project_id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('racer_no', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('project_name', mysql.VARCHAR(length=20), nullable=True),
    sa.Column('project_detail', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('project_start_date', mysql.DATETIME(), nullable=True),
    sa.Column('project_end_date', mysql.DATETIME(), nullable=True),
    sa.ForeignKeyConstraint(['racer_no'], ['racers.racer_no'], name='project_ibfk_1', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('project_id'),
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('education',
    sa.Column('edu_id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('racer_no', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('school_name', mysql.VARCHAR(length=20), nullable=True),
    sa.Column('major', mysql.VARCHAR(length=20), nullable=True),
    sa.Column('education', mysql.VARCHAR(length=10), nullable=True),
    sa.ForeignKeyConstraint(['racer_no'], ['racers.racer_no'], name='education_ibfk_1', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('edu_id'),
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('certificated',
    sa.Column('cert_id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('racer_no', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('cert_name', mysql.VARCHAR(length=20), nullable=True),
    sa.Column('cert_detail', mysql.VARCHAR(length=255), nullable=True),
    sa.Column('cert_achieve_date', mysql.DATETIME(), nullable=True),
    sa.ForeignKeyConstraint(['racer_no'], ['racers.racer_no'], name='certificated_ibfk_1', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('cert_id'),
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.drop_table('projects')
    op.drop_table('educations')
    op.drop_table('certificates')
    # ### end Alembic commands ###