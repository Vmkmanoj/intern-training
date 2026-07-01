from fastapi.testclient import TestClient
import main

client = TestClient(main.app)

def test_chat_test_fields():
    login_response = client.post(
        "/auth/login",
        json={
            "email": "test@test.com",
            "password": "admin@123"
        }
    )

    token = login_response.json()["access_token"]

    response = client.post(
        "/chat/chat",
        json={
            "userid": "e13394d7-26e1-4f00-b94e-622180ce7290",
            "username": "Manoj",
            "email": "manoj@example.com",
            "message": "feeling sick"
        },
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 200
    assert "event: done" in response.text