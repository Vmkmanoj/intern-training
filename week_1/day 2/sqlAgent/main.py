import ollama

from sqlalchemy import create_engine
from sqlalchemy import inspect
from sqlalchemy import text
from sqlalchemy.engine import URL


# ==========================
# DATABASE CONNECTION
# ==========================

DATABASE_URL = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="admin@123",
    host="localhost",
    port=5432,
    database="myproject",
)

engine = create_engine(DATABASE_URL)


# ==========================
# GET DATABASE SCHEMA
# ==========================

def get_schema():

    inspector = inspect(engine)

    schema = ""

    tables = inspector.get_table_names()

    for table in tables:

        schema += f"\nTable: {table}\n"

        columns = inspector.get_columns(table)

        for column in columns:

            schema += (
                f"{column['name']} "
                f"({column['type']})\n"
            )

    return schema


# ==========================
# GENERATE SQL
# ==========================

def generate_sql(question):

    schema = get_schema()

    prompt = f"""
    You are a PostgreSQL SQL generation engine.

    Schema:
    {schema}

    Task:
    Convert the user's natural language question into a PostgreSQL query.

    Requirements:
    1. Use ONLY tables and columns from the schema.
    2. Never assume missing columns or tables.
    3. Generate syntactically correct PostgreSQL SQL.
    4. Use JOINs based on foreign key relationships when needed.
    5. Use aliases for readability.
    6. Return ONLY the SQL query.
    7. No explanations.
    8. No markdown.
    9. No comments.
    10. If the question cannot be answered from the schema, return exactly:
    SCHEMA_INFORMATION_NOT_AVAILABLE

    Question:
    {question}

    SQL:
    """

    response = ollama.generate(
        model="mistral",
        prompt=prompt
    )

    return response["response"].strip()


# ==========================
# SQL VALIDATION
# ==========================

def validate_sql(query):

    blocked_words = [
        "DROP",
        "DELETE",
        "TRUNCATE",
        "ALTER",
        "UPDATE",
        "INSERT"
    ]

    query_upper = query.upper()

    for word in blocked_words:

        if word in query_upper:
            raise Exception(
                f"Blocked SQL Operation: {word}"
            )

    return True


# ==========================
# EXECUTE SQL
# ==========================

def execute_sql(query):

    with engine.connect() as conn:

        result = conn.execute(text(query))

        rows = []

        for row in result:
            rows.append(dict(row._mapping))

        return rows


# ==========================
# GENERATE HUMAN RESPONSE
# ==========================

def generate_answer(question, data):

    prompt = f"""
Question:
{question}

SQL Result:
{data}

Provide a simple human-readable answer.
"""

    response = ollama.generate(
        model="mistral",
        prompt=prompt
    )

    return response["response"]


# ==========================
# MAIN AGENT LOOP
# ==========================

while True:

    question = input("\nAsk Question: ")

    if question.lower() == "exit":
        break

    try:

        sql_query = generate_sql(question)

        print("\nGenerated SQL:")
        print(sql_query)

        validate_sql(sql_query)

        result = execute_sql(sql_query)

        print("\nRaw Result:")
        print(result)

        answer = generate_answer(
            question,
            result
        )

        print("\nAI Answer:")
        print(answer)

    except Exception as e:

        print("\nError:")
        print(e)