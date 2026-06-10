from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_all_teacher():
    response = client.get("/teacher/getAll")

    print(response.json())

    assert response.status_code == 200