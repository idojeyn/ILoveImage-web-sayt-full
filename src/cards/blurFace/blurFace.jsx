import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as faceapi from "face-api.js";
import { saveAs } from "file-saver";

export default function BlurFace() {
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [blurAmount, setBlurAmount] = useState(10);
  const [faces, setFaces] = useState([]);
  const canvasRef = useRef(null);

  // Load face-api models from CDN
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  // Detect faces and draw canvas
  useEffect(() => {
    const detectFaces = async () => {
      if (!imgSrc) return;
      const img = document.getElementById("inputImage");
      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
      setFaces(detections);
      drawCanvas(img, detections);
    };
    detectFaces();
  }, [imgSrc, blurAmount]);

  const drawCanvas = (img, detections) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Blur each detected face
    detections.forEach(det => {
      const { x, y, width, height } = det.box;
      ctx.filter = `blur(${blurAmount * 2}px)`;
      ctx.drawImage(img, x, y, width, height, x, y, width, height);
      ctx.filter = "none";
    });
  };

  const handleDrop = (acceptedFiles) => {
    const f = acceptedFiles[0];
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target.result);
    reader.readAsDataURL(f);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: handleDrop,
  });

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      saveAs(blob, file?.name.replace(/\.[^/.]+$/, "") + "-blur.png");
    });
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <h2 className="mb-4 text-center">Blur Face</h2>
      <h5 className="text-muted m-4 ">
        Easily anonymize faces in images with a blur effect. Automatically blur multiple faces in a single shot or blur specific sections of your image.
      </h5>

      {/* Drag & Drop */}
      <div
        {...getRootProps()}
        className="border border-dashed p-5 mb-3 text-center"
        style={{ cursor: "pointer", borderRadius: "8px", backgroundColor: "#f8f9fa" }}
      >
        <input {...getInputProps()} />
        {!file ? <p>Drag & drop an image here, or click to select</p> : <p>{file.name}</p>}
      </div>

      {/* Image preview */}
      {imgSrc && (
        <div className="mb-3 text-center">
          <img id="inputImage" src={imgSrc} alt="input" style={{ display: "none" }} />
          <canvas ref={canvasRef} style={{ maxWidth: "50%", borderRadius: "8px" }} />
        </div>
      )}

      {/* Blur slider */}
      {imgSrc && (
        <div className="mb-3 text-center">
          <label className="form-label me-2">Blur Amount:</label>
          <input
            type="range"
            min="0"
            max="50"
            value={blurAmount}
            onChange={(e) => setBlurAmount(e.target.value)}
          />
          <span className="ms-2">{blurAmount}px</span>
        </div>
      )}

      {/* Download */}
      {imgSrc && (
        <div className="text-center">
          <button
            className="btn btn-gradient-primary"
            onClick={handleDownload}
            style={{ background: "linear-gradient(to right, #ff512f, #dd2476)", color: "#fff", border: "none" }}
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}
