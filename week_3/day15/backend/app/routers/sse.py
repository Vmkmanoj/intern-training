from datetime import datetime
import asyncio
from fastapi.responses import StreamingResponse
from fastapi import APIRouter


sse = APIRouter()


async def clock():
    while True:
        current_time = datetime.now().strftime("%H:%M:%S")

        # SSE format
        yield f"data: {current_time}\n\n"

        await asyncio.sleep(1)


@sse.get("/clock")
async def stream_timer():
    return StreamingResponse(clock(), media_type="text/event-stream")
