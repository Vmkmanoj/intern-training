from fastapi.testclient import TestClient
import main
import pytest
client = TestClient(main.app)

@pytest.fixture
def auth_token():
    response = client.post(
        "/auth/login",
        json={
            "email": "test@test.com",
            "password": "admin@123"
        }
    )
    assert response.status_code == 200
    return response.json()["access_token"]



def test_chat_test_fields(auth_token):

    response = client.get(
        "/chat/get-all-session",
        headers={
            "Authorization": f"Bearer {auth_token}"
        }
    )

    print("json",response.json())
    print("status code in get all session",response.status_code)

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/json")
    assert response.json() is not None