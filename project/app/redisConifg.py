import redis

redic_client = redis.Redis(
    host = "localhost",
    port=6379,
    decode_responses=True
)
print(redic_client.ping())

