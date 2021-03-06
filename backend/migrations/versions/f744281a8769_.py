"""empty message

Revision ID: f744281a8769
Revises: 352060b34d4d
Create Date: 2021-08-19 18:01:52.501053

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f744281a8769'
down_revision = '352060b34d4d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('awards_ibfk_1', 'awards', type_='foreignkey')
    op.create_foreign_key(None, 'awards', 'racers', ['racer_no'], ['racer_no'], ondelete='CASCADE')
    op.drop_constraint('certificated_ibfk_1', 'certificated', type_='foreignkey')
    op.create_foreign_key(None, 'certificated', 'racers', ['racer_no'], ['racer_no'], ondelete='CASCADE')
    op.drop_constraint('education_ibfk_1', 'education', type_='foreignkey')
    op.create_foreign_key(None, 'education', 'racers', ['racer_no'], ['racer_no'], ondelete='CASCADE')
    op.drop_constraint('project_ibfk_1', 'project', type_='foreignkey')
    op.create_foreign_key(None, 'project', 'racers', ['racer_no'], ['racer_no'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'project', type_='foreignkey')
    op.create_foreign_key('project_ibfk_1', 'project', 'racers', ['racer_no'], ['racer_no'])
    op.drop_constraint(None, 'education', type_='foreignkey')
    op.create_foreign_key('education_ibfk_1', 'education', 'racers', ['racer_no'], ['racer_no'])
    op.drop_constraint(None, 'certificated', type_='foreignkey')
    op.create_foreign_key('certificated_ibfk_1', 'certificated', 'racers', ['racer_no'], ['racer_no'])
    op.drop_constraint(None, 'awards', type_='foreignkey')
    op.create_foreign_key('awards_ibfk_1', 'awards', 'racers', ['racer_no'], ['racer_no'])
    # ### end Alembic commands ###
