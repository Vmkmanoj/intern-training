from pathlib import Path

from sqlalchemy import text
from app.database.database import engine


def create_migration_table():
    with engine.begin() as conn:
        conn.execute(
            text("""
            CREATE TABLE IF NOT EXISTS migrations (
                id SERIAL PRIMARY KEY,
                migration_name VARCHAR(255) UNIQUE,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        )


def get_executed_migrations():
    with engine.begin() as conn:
        result = conn.execute(text("SELECT migration_name FROM migrations"))

        return {row[0] for row in result}


BASE_DIR = Path(__file__).resolve().parent
MIGRATION_DIR = BASE_DIR


def run_migrations():

    create_migration_table()

    executed = get_executed_migrations()

    files = sorted(f.name for f in MIGRATION_DIR.glob("*.sql"))

    with engine.begin() as conn:
        for file in files:
            if file in executed:
                print(f"Skipping {file}")
                continue

            print(f"Running {file}")

            with open(MIGRATION_DIR / file, "r") as f:
                sql = f.read()

            conn.execute(text(sql))

            conn.execute(
                text("""
                INSERT INTO migrations
                (migration_name)
                VALUES (:name)
                """),
                {"name": file},
            )

            print(f"Completed {file}")


if __name__ == "__main__":
    run_migrations()
