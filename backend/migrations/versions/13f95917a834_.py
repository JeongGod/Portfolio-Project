"""empty message

Revision ID: 13f95917a834
Revises: 6a63a3440464
Create Date: 2021-08-20 13:14:01.130297

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '13f95917a834'
down_revision = '6a63a3440464'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('awards',
    sa.Column('award_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('racer_id', sa.String(length=20), nullable=False),
    sa.Column('award_name', sa.String(length=20), nullable=True),
    sa.Column('award_detail', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['racer_id'], ['racers.racer_id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('award_id'),
    mysql_collate='utf8_general_ci'
    )
    op.create_table('certificates',
    sa.Column('cert_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('racer_id', sa.String(length=20), nullable=False),
    sa.Column('cert_name', sa.String(length=20), nullable=True),
    sa.Column('cert_detail', sa.String(length=255), nullable=True),
    sa.Column('cert_achieve_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['racer_id'], ['racers.racer_id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('cert_id'),
    mysql_collate='utf8_general_ci'
    )
    op.create_table('educations',
    sa.Column('edu_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('racer_id', sa.String(length=20), nullable=False),
    sa.Column('school_name', sa.String(length=20), nullable=True),
    sa.Column('major', sa.String(length=20), nullable=True),
    sa.Column('education', sa.String(length=10), nullable=True),
    sa.ForeignKeyConstraint(['racer_id'], ['racers.racer_id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('edu_id'),
    mysql_collate='utf8_general_ci'
    )
    op.create_table('projects',
    sa.Column('project_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('racer_id', sa.String(length=20), nullable=False),
    sa.Column('project_name', sa.String(length=20), nullable=True),
    sa.Column('project_detail', sa.String(length=255), nullable=True),
    sa.Column('project_start_date', sa.DateTime(), nullable=True),
    sa.Column('project_end_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['racer_id'], ['racers.racer_id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('project_id'),
    mysql_collate='utf8_general_ci'
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('projects')
    op.drop_table('educations')
    op.drop_table('certificates')
    op.drop_table('awards')
    # ### end Alembic commands ###
