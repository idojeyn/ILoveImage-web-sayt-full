import  { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";

const ConvertToJpg = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [converted, setConverted] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".webp", ".heic", ".svg"]
    }
  });

  const convertToJPG = () => {
    if (!file) return;

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; // oq fon bo‘lishi uchun
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          setConverted(URL.createObjectURL(blob));
          saveAs(blob, file.name.replace(/\.[^/.]+$/, "") + ".jpg");
        },
        "image/jpeg",
        0.9
      );
    };
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <h2 className="mb-4 fw-bold">Convert to JPG</h2>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border rounded p-5 mb-3 ${
          isDragActive ? "bg-light border-primary" : "bg-white"
        }`}
        style={{ cursor: "pointer" }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary">Drop image here...</p>
        ) : (
          <p className="text-muted">
            Drag & drop an image here, or <span className="fw-bold">browse</span>
          </p>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-3">
          <img
            src={preview}
            alt="Preview"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px" }}
          />
        </div>
      )}

      {/* Convert button */}
      {file && (
        <button className="btn btn-danger px-4" onClick={convertToJPG}>
          Convert & Download JPG
        </button>
      )}

      {/* Converted Preview */}
      {converted && (
        <div className="mt-4">
          <h5 className="fw-bold">Converted JPG:</h5>
          <img
            src={converted}
            alt="Converted"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ConvertToJpg;
