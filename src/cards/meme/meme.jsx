import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function MemeGenerator() {
  const [file, setFile] = useState(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [color, setColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(1);
  const canvasRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      setFile(f);
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

      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.strokeStyle = "black";
      ctx.lineWidth = fontSize / 20;
      ctx.font = `${fontSize}px Impact, sans-serif`;

      // Top text
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, fontSize + 10);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, fontSize + 10);

      // Bottom text
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
    };
  }, [file, topText, bottomText, color, fontSize, opacity]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      saveAs(blob, `meme-${file.name}`);
    });
  };

  return (
    <div className="container text-center py-5" style={{ minHeight: '91vh' }}>
      <h2 className="mb-3">Meme Generator</h2>
      <h5 className="text-muted m-4 ">
        Create a meme from JPG, GIF or PNG images.
        Edit your image and make a meme.
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

      {file && (
        <div className="mb-3">
          <div className="row g-2 mb-2">
            <div className="col">
              <label className="form-label">Top Text</label>
              <input
                type="text"
                className="form-control"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label">Bottom Text</label>
              <input
                type="text"
                className="form-control"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
              />
            </div>
          </div>

          <div className="row g-2 mb-2">
            <div className="col">
              <label className="form-label">Font Size</label>
              <input
                type="number"
                className="form-control"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>
            <div className="col">
              <label className="form-label">Opacity</label>
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
              Download Meme
            </button>
          </div>
        </div>
      )}

      {/* Canvas */}
      {file && (
        <div className="text-center mb-3">
          <canvas
            ref={canvasRef}
            style={{ maxWidth: "100%", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
}
