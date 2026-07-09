from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
import io

app = FastAPI()


@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    # Check file type
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a CSV file."
        )

    try:
    
        content = await file.read()

        print("context",content)

        df = pd.read_csv(io.BytesIO(content))

        print("conte",df)

        return {
            "success": True,
            "total_records": len(df),
            "columns": df.columns.tolist(),
            "data": df.to_dict(orient="records")
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )