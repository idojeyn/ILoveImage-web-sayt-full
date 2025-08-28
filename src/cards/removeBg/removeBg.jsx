import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function RemoveBackground() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedPreview, setProcessedPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setProcessedPreview(null);
    }
  });

  const handleRemoveBackground = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image_file", file);

    try {
      const res = await fetch("http://localhost:3000/api/remove-bg", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Server error");

      const blob = await res.blob();
      setProcessedPreview(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedPreview) return;
    saveAs(processedPreview, `no-bg-${file.name}`);
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <h2 className="mb-3">Remove Background</h2>

      <div
        {...getRootProps()}
        className="border border-dashed p-5 mb-3 text-center"
        style={{ cursor: "pointer", borderRadius: "8px", backgroundColor: "#f8f9fa" }}
      >
        <input {...getInputProps()} />
        {!file ? <p>Drag & drop an image here, or click to select</p> : <p>{file.name}</p>}
      </div>

      {preview && (
        <div className="text-center mb-3">
          <p>Original Image:</p>
          <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "300px", borderRadius:"8px" }} />
        </div>
      )}

      {file && (
        <div className="text-center mb-3">
          <button
            className="btn btn-gradient-primary"
            onClick={handleRemoveBackground}
            disabled={loading}
            style={{
              background: "linear-gradient(to right, #ff512f, #dd2476)",
              color: "#fff",
              border: "none"
            }}
          >
            {loading ? "Removing Background..." : "Remove Background"}
          </button>
        </div>
      )}

      {processedPreview && (
        <div className="text-center mb-3">
          <p>Processed Image:</p>
          <img src={processedPreview} alt="Processed" style={{ maxWidth: "100%", maxHeight: "300px", borderRadius:"8px" }} />
          <div className="mt-2">
            <button
              className="btn btn-success"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
