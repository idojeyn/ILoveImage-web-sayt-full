import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function UpscaleImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upscaled, setUpscaled] = useState(false);
  const [scale, setScale] = useState(2); // px ko‘paytirish koeffitsienti

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setUpscaled(false);
    }
  });

  const handleUpscale = () => {
    if (!file) return;
    setLoading(true);
    setUpscaled(false);

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      // Canvas asosida px-larni oshirish
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const upscaledFile = new File([blob], `upscaled-${file.name}`, { type: file.type });
        setPreview(URL.createObjectURL(upscaledFile));
        setFile(upscaledFile);
        setLoading(false);
        setUpscaled(true);
      }, file.type);
    };
  };

  const handleDownload = () => {
    if (!file) return;
    saveAs(file, file.name);
  };

  return (
    <div className="container text-center py-5" style={{ minHeight: '91vh' }}>
      <h2>Upscale Image</h2>
      <h5 className="text-muted m-4 " style={{width:'50%'}}>
        Easily increase the resolution of your images with our advanced upscaling tool.
      </h5>

      {/* Drag & Drop */}
      <div {...getRootProps()} className="border border-dashed p-5 mb-3 text-center"
        style={{ cursor: "pointer", borderRadius: "8px", backgroundColor: "#f8f9fa" }}>
        <input {...getInputProps()} />
        {!file && <p>Drag & drop an image here, or click to select</p>}
        {file && <p>{file.name}</p>}
      </div>

      {/* Preview */}
      {preview && (
        <div className="text-center mb-3">
          <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }} />
        </div>
      )}

      {/* Scale Slider */}
      {file && (
        <div className="mb-2">
          <label>Scale (px multiplier): {scale}x</label>
          <input type="range" min={1} max={5} step={0.1} value={scale} onChange={e => setScale(Number(e.target.value))} className="form-range" />
        </div>
      )}

      {/* Upscale & Download Buttons */}
      <div className="d-flex justify-content-center mb-3 gap-2">
        <button
          className="btn btn-primary"
          onClick={handleUpscale}
          disabled={!file || loading}
        >
          {loading ? "Upscaling..." : "Upscale Image"}
        </button>
        <button
          className="btn btn-success"
          onClick={handleDownload}
          disabled={!file || !upscaled}
        >
          Download
        </button>
      </div>

      {/* Info */}
      {upscaled && !loading && (
        <div className="text-center text-success">
          <p>✅ Image upscaled successfully!</p>
        </div>
      )}
    </div>
  );
}
