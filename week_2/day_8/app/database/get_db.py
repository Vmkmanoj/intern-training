from sqlalchemy import create_engine

DATABASE_URL = "postgresql://neondb_owner:npg_8nbeyUKh7RGP@ep-red-violet-att6cuu3-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"


# "postgresql://postgres:admin%40123@localhost:5432/MyDatabase"

engine = create_engine(DATABASE_URL)


        