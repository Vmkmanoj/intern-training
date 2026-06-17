# pip vs uv Workflow

## pip Workflow

1. Create a virtual environment:

   python -m venv .venv

2. Activate the environment:

   Windows:
   .venv\Scripts\activate

   Linux/Mac:
   source .venv/bin/activate

3. Install packages:

   pip install fastapi uvicorn

4. Generate requirements file:

   pip freeze > requirements.txt

5. Install dependencies from requirements file:

   pip install -r requirements.txt

### Advantages

* Built into Python ecosystem.
* Widely used and well documented.
* Works with most Python projects.

---

## uv Workflow

1. Create a project:

   uv init

2. Create and manage virtual environment:

   uv venv

3. Install packages:

   uv add fastapi uvicorn

4. Synchronize dependencies:

   uv sync

5. Run commands:

   uv run python main.py

### Advantages

* Much faster than pip.
* Automatically manages dependency resolution.
* Uses pyproject.toml instead of requirements.txt as the primary dependency file.
* Simplifies project setup and reproducibility.

---

## Summary

| Feature               | pip                             | uv                       |
| --------------------- | ------------------------------- | ------------------------ |
| Speed                 | Moderate                        | Very Fast                |
| Dependency Management | requirements.txt                | pyproject.toml + uv.lock |
| Virtual Environment   | Manual                          | Integrated               |
| Package Installation  | pip install                     | uv add                   |
| Sync Dependencies     | pip install -r requirements.txt | uv sync                  |

For modern Python projects, uv provides a faster and more streamlined workflow, while pip remains the most widely adopted package manager.
