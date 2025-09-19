import google.generativeai as genai
import os

# Configure Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SCHEMA = """
Tables:
customers(id, name, email, city, signup_date)
products(id, name, category, price, stock)
orders(id, customer_id, product_id, quantity, order_date, total)
sales(id, order_id, revenue, profit_margin, sales_date)
"""

def nl_to_sql(question: str) -> str:
    """
    Convert natural language question to SQLite SQL using Gemini Flash.
    Automatically cleans Markdown code fences.
    """
    prompt = f"""
You are an expert SQL generator for SQLite databases.
The database schema is:
{SCHEMA}

Convert the following natural language question into a valid SQLite SQL query.
Question: {question}
SQL:
"""
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        sql_query = response.text.strip()

        # 🔴 Clean Markdown code fences if present
        sql_query = clean_sql(sql_query)

        return sql_query
    except Exception as e:
        print("Gemini API error:", e)
        return None

def clean_sql(sql: str) -> str:
    """
    Remove Markdown code fences like ```sql or ``` from LLM output
    """
    sql = sql.strip()
    if sql.startswith("```sql"):
        sql = sql[len("```sql"):].strip()
    if sql.startswith("```"):
        sql = sql[3:].strip()
    if sql.endswith("```"):
        sql = sql[:-3].strip()
    return sql
