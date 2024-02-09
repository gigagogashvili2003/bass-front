import React, { FC, useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const UploadVoicePage: FC<{}> = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let timer: any;
    if (recording) {
      timer = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime!) / 1000));
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [recording, startTime]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setRecording(true);
      setStartTime(Date.now());
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setDuration(0);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleUpload = () => {
    // Here you can implement your logic to upload the recorded audio
    if (audioBlob) {
      // For demo purpose, you can log the blob data
      console.log("Audio blob:", audioBlob);
      // You can send this blob to your backend for uploading
    }
  };

  const handleDelete = () => {
    setAudioBlob(null);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-100">
      {!recording ? (
        <button
          onClick={startRecording}
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
        >
          <PlayArrowIcon className="mr-2" />
          Start Recording
        </button>
      ) : (
        <div className="flex items-center">
          <button
            onClick={stopRecording}
            className="flex items-center px-6 py-3 mr-4 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300"
          >
            <StopIcon className="mr-2" />
            Stop Recording
          </button>
          <p className="text-xl font-semibold">{`Recording: ${duration} seconds`}</p>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!audioBlob}
        className={`bg-indigo-400	 flex items-center px-6 py-3 mt-6 bg-${
          audioBlob ? "green" : "gray"
        }-500 text-white rounded-md shadow-md hover:bg-${
          audioBlob ? "green" : "gray"
        }-600 focus:outline-none focus:bg-${
          audioBlob ? "green" : "gray"
        }-600 transition duration-300`}
      >
        <CloudUploadIcon className={`mr-2`} />
        {audioBlob ? "Upload Recording" : "No Recording"}
      </button>
      <button
        onClick={handleDelete}
        disabled={!audioBlob}
        className={`bg-indigo-400	 flex items-center px-6 py-3 mt-6 bg-${
          audioBlob ? "red" : "gray"
        }-500 text-white rounded-md shadow-md hover:bg-${
          audioBlob ? "red" : "gray"
        }-600 focus:outline-none focus:bg-${
          audioBlob ? "red" : "gray"
        }-600 transition duration-300`}
      >
        <DeleteIcon className={`mr-2`} />
        Delete Recording
      </button>
      {audioBlob && (
        <div className="mt-8">
          <p className="mb-2">Recorded Audio:</p>
          <audio controls ref={audioRef}>
            <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default UploadVoicePage;
