from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import StreamingResponse
from gtts import gTTS
import io

app = FastAPI()

@app.post("/generate_tts/")
async def generate_tts(text: str = Form(...), language: str = Form("en")):
    """
    Generate speech from text using gTTS.
    """

    # Create TTS object
    tts = gTTS(text=text, lang=language)

    # Save audio into in-memory buffer
    mp3_fp = io.BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)

    return StreamingResponse(mp3_fp, media_type="audio/mpeg")
