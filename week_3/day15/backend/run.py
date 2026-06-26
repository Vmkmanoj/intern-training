import subprocess

subprocess.run(["uv", "run", "ruff", "check", ".", "--fix"])
subprocess.run(["uv", "run", "ruff", "format", "."])
subprocess.run(["uv", "run", "python", "-m", "uvicorn", "main:app", "--reload"])
