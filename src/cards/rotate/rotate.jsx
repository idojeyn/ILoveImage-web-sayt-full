import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function RotateImage() {
  const [file, setFile] = useState(null);
  const [angle, setAngle] = useState(0); // rotation angle in degrees
  const canvasRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      setFile(f);
      setAngle(0);
    },
  });

  // Real-time canvas rendering
  useEffect(() => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Calculate new canvas size to fit rotated image
      const radians = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));
      const newWidth = img.width * cos + img.height * sin;
      const newHeight = img.width * sin + img.height * cos;
      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move origin to center
      ctx.save();
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(radians);

      // Draw image centered
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      ctx.restore();
    };
  }, [file, angle]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      saveAs(blob, `rotated-${file.name}`);
    });
  };

  const rotateLeft = () => setAngle((prev) => prev - 90);
  const rotateRight = () => setAngle((prev) => prev + 90);

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <h2 className="mb-3">Rotate Image</h2>
      <h5>Mouse over IMAGE file below and a icon will appear, click on it to rotate your IMAGEs.</h5>
      {/* Drag & Drop */}
      <div
        {...getRootProps()}
        className="border border-dashed p-5 mb-3 text-center"
        style={{ cursor: "pointer", borderRadius: "8px", backgroundColor: "#f8f9fa" }}
      >
        <input {...getInputProps()} />
        {!file ? <p>Drag & drop an image here, or click to select</p> : <p>{file.name}</p>}
      </div>

      {file && (
        <>
          <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
            <button
              className="btn btn-gradient-primary"
              onClick={rotateLeft}
              style={{ background: "linear-gradient(to right, #ff512f, #dd2476)", color: "#fff", border: "none" }}
            >
              Rotate Left 90°
            </button>
            <button
              className="btn btn-gradient-primary"
              onClick={rotateRight}
              style={{ background: "linear-gradient(to right, #ff512f, #dd2476)", color: "#fff", border: "none" }}
            >
              Rotate Right 90°
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">Custom Angle: {angle}°</label>
            <input
              type="range"
              className="form-range"
              min={-360}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
            />
          </div>

          <div className="text-center mb-3">
            <button
              className="btn btn-gradient-success"
              onClick={handleDownload}
              style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", color: "#fff", border: "none" }}
            >
              Download Rotated Image
            </button>
          </div>

          {/* Canvas */}
          <div className="text-center mb-3">
            <canvas
              ref={canvasRef}
              style={{ maxWidth: "100%", borderRadius: "8px", border: "1px solid #ccc" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
