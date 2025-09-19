from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db import run_query
from llm import nl_to_sql
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

@app.post("/ask")
def ask(question: Question):
    try:
        print("inside main")

        # 🔴 Generate SQL from natural language (already cleaned in llm.py)
        sql_query = nl_to_sql(question.question)
        print("Generated SQL:", sql_query)

        if not sql_query:
            raise HTTPException(status_code=500, detail="Failed to generate SQL from LLM.")

        # Execute SQL query
        df, error = run_query(sql_query)
        if error:
            raise HTTPException(status_code=400, detail={"sql": sql_query, "error": error})

        # Return results as JSON
        return {"sql": sql_query, "results": df.to_dict(orient="records")}

    except Exception as e:
        import traceback
        traceback.print_exc()   # 🔴 Prints full traceback to terminal
        raise HTTPException(status_code=500, detail=str(e))
