import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Custom player state
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const generateAudio = async () => {
    if (!text) return alert('Please enter text.');

    if (language !== 'en') {
      const confirmProceed = window.confirm(
        `Heads up! You typed your text in English but selected "${language}".\n\n` +
        `It will be read with a ${language} accent and may sound unnatural. Do you want to continue?`
      );

      if (!confirmProceed) return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/tts',
        { text, language },
        { responseType: 'blob' }
      );

      const url = URL.createObjectURL(response.data);
      setAudioUrl(url);
      setIsPlaying(false);
      setCurrentTime(0);

    } catch (err) {
      console.error(err);
      alert('Error generating audio.');
    }
    setLoading(false);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = e.target.value;
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="container">
      <h1>Speechify Studio TTS Prototype</h1>

      <textarea
        rows={6}
        className="textarea"
        placeholder="Type text here..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <select
        className="select"
        value={language}
        onChange={e => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>

      <button
        className="button"
        onClick={generateAudio}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Audio'}
      </button>

      {audioUrl && (
        <div className="custom-audio-player">
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleAudioEnded}
          />

          <button
            className="audio-btn"
            onClick={handlePlayPause}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="audio-slider"
          />

          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default App;
