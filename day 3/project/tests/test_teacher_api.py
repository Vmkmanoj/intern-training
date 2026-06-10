from fastapi.testclient import TestClient

import main


def test_teacher_create_accepts_common_json_fields():
    client = TestClient(main.app)

    response = client.post(
        "/teacher/create",
        json={"name": "Alice", "age": 30, "address": "Main Street"},
    )


    assert response.status_code == 200
