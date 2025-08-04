import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function Test() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const mediaRecorderRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    console.log("[Front] Initializing socket client");
    socketRef.current = io("http://localhost:3001", {
      path: "/api/v1/transcribe/stream/socket",
      // transports: ["websocket"],
      autoConnect: false,
    });

    // 2) Listen for final transcript
    socketRef.current.on("transcript_complete", (data) => {
      console.log("[Front] transcript_complete received:", data);
      setTranscript(data.transcript);
      socketRef.current.disconnect();
    });
  }, []);

  const startRecording = async () => {
    console.log("[Front] startRecording() called");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "audio/webm; codecs=opus",
    });

    // Open WS with query params
    socketRef.current.io.opts.query = {
      callId: "test123",
      userId: "userA",
      lang: "en-US", // leave blank for auto‑detect
    };
    console.log(
      "[Front] Connecting socket with query:",
      socketRef.current.io.opts.query
    );
    socketRef.current.connect();
    console.log("[Front] socket.connect() called");
    // Tell the server to open the Deepgram stream
    socketRef.current.emit("start_stream");
    console.log("[Front] Emitted start_stream");

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        console.log("datatype is ", typeof e.data);
        console.log("[Front] Sending audio_chunk, size:", e.data.size);
        socketRef.current.emit("audio_chunk", e.data);
      }
    };

    mediaRecorderRef.current.onstart = () => {
      console.log("[Front] MediaRecorder started");
      setRecording(true);
    };
    mediaRecorderRef.current.onstop = () => {
      console.log("[Front] MediaRecorder stopped");
      setRecording(false);
    };

    mediaRecorderRef.current.start(200);
  };

  const stopRecording = () => {
    console.log("[Front] stopRecording() called");
    mediaRecorderRef.current.stop();
    socketRef.current.emit("audio_stream_end");
    console.log("[Front] Emitted audio_stream_end");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>TestStreamer</h1>
      <button onClick={recording ? stopRecording : startRecording} style={{ padding: 10, fontSize: 16, backgroundColor: recording ? 'red' : 'green', color: 'white', border: 'none', borderRadius: 5 }}>
        {recording ? "Stop & Transcribe" : "Start Recording"}
      </button>
      {transcript && (
        <>
          <h2>Transcript</h2>
          <pre>{transcript}</pre>
        </>
      )}
    </div>
  );
}
