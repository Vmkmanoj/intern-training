from fastapi.testclient import TestClient
import main

def test_chat_test_fields():
    client = TestClient(main.app)

    response = client.get(
        "/chat/chat?message=feeling sick",
    )

    assert response.status_code == 200