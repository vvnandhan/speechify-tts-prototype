# Speechify Studio TTS Prototype

This is a demo prototype simulating how Speechify Studio might implement text-to-speech functionality in a browser-based creator tool. It was built as part of a Product Engineer interview process.

---

## 🚀 Features

- Type text into a web UI
- Choose language for voiceover (English, Spanish, French)
- Generate TTS audio using gTTS
- Listen via a modern custom audio player
- Architecture simulates microservice design

---

## ⚙️ Tech Stack

- **Frontend**: React (Vite)
- **API Gateway**: Node.js (Express)
- **TTS Service**: Python (FastAPI + gTTS)
- **Styling**: CSS

---

## 💻 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/speechify-tts-prototype.git
cd speechify-tts-prototype
```

---

### 2. Python TTS Microservice

Navigate to the Python service:

```bash
cd tts_service
python -m venv venv

# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --host 0.0.0.0 --port 8000
```

This starts the FastAPI server on:

```
http://localhost:8000
```

---

### 3. Node.js API Gateway

In another terminal:

```bash
cd server
npm install
node server.js
```

This runs the Node.js API on:

```
http://localhost:5000
```

---

### 4. React Frontend

In another terminal:

```bash
cd client
npm install
npm run dev
```

By default, this starts the Vite dev server on:

```
http://localhost:5173
```

---

### 5. Open the App

Go to:

```
http://localhost:5173
```

✅ Type text → select a language → click Generate → hear the audio playback!

---

## 🛠 How It Works

- The frontend sends text + language to the Node.js API Gateway
- Node.js forwards the request to the Python FastAPI microservice
- FastAPI uses gTTS to generate an MP3 audio stream
- The frontend plays the returned audio in a custom React audio player

---

## 🎯 Notes

- gTTS reads English text in accents for other languages. For example, choosing “Spanish” with English text will produce English words spoken with Spanish phonetics (not a translation).
- In production, you’d replace gTTS with Speechify’s proprietary TTS engine for higher-quality voices and brand consistency.
- This is strictly a prototype and not an official Speechify product.

---

## 🙌 Author

Prototype built by Nandhan as part of the Speechify Product Engineer interview process.

