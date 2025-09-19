import sqlite3
import pandas as pd
from config import DB_PATH

def run_query(query: str):
    """Execute SQL query and return results as DataFrame"""
    conn = sqlite3.connect(DB_PATH)
    try:
        df = pd.read_sql(query, conn)
    except Exception as e:
        conn.close()
        return None, str(e)
    conn.close()
    return df, None
