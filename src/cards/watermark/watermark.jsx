import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function WatermarkPro() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("Watermark");
  const [color, setColor] = useState("#ffffff");
  const [size, setSize] = useState(40);
  const [opacity, setOpacity] = useState(0.5);
  const [textPos, setTextPos] = useState({ x: 50, y: 50 });
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      setFile(f);
      setTextPos({ x: 50, y: 50 }); // reset position
    },
  });

  // Real-time canvas rendering
  useEffect(() => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Original image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Watermark
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = `${size}px sans-serif`;
      ctx.fillText(text, textPos.x, textPos.y);
    };
  }, [file, text, color, size, opacity, textPos]);

  // Mouse events for moving text
  const handleMouseDown = (e) => {
    setDragging(true);
  };

  const handleMouseUp = (e) => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextPos({ x, y });
  };

  // Click to move text (optional)
  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextPos({ x, y });
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      saveAs(blob, `watermarked-${file.name}`);
    });
  };

  return (
    <div className="container text-center py-5" style={{ minHeight: '91vh' }}>
      <h2 className="mb-3">Watermark IMAGE</h2>
      <h5 className="text-muted m-4 ">
        Watermark JPG, PNG or GIF images. <br/>
        Stamp images or text over your images at once.
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

      {/* Controls */}
      {file && (
        <div className="mb-3">
          <div className="mb-2">
            <label className="form-label">Watermark Text</label>
            <input
              type="text"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="mb-2 row g-2">
            <div className="col">
              <label className="form-label">Font Size</label>
              <input
                type="number"
                className="form-control"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
            <div className="col">
              <label className="form-label">Opacity (0-1)</label>
              <input
                type="number"
                className="form-control"
                step="0.1"
                min="0"
                max="1"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
              />
            </div>
            <div className="col">
              <label className="form-label">Color</label>
              <input
                type="color"
                className="form-control form-control-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center mt-3">
            <button
              className="btn btn-gradient-primary"
              onClick={handleDownload}
              style={{
                background: "linear-gradient(to right, #ff512f, #dd2476)",
                color: "#fff",
                border: "none",
              }}
            >
              Download
            </button>
          </div>
        </div>
      )}

      {/* Canvas */}
      {file && (
        <div className="text-center mb-3">
          <canvas
            ref={canvasRef}
            style={{ maxWidth: "20%", borderRadius: "8px", border: "1px solid #ccc" }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
          />
          <p className="text-muted mt-1">Click or drag the watermark text to move it</p>
        </div>
      )}
    </div>
  );
}
