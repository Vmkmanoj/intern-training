from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_get_all_teacher():
    response = client.get("/chat/get-all-session")

    print(response.json())

    assert response.status_code == 200