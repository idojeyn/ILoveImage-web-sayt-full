import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function ConvertFromJpg() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState("png"); // default convert format

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [] },
    multiple: false,
  });

  const handleConvertAndDownload = () => {
    if (!file || !preview) return;

    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          saveAs(blob, file.name.replace(/\.(jpg|jpeg)$/i, `.${format}`));
        },
        `image/${format}`,
        1
      );
    };
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <h2 className="mb-4">Convert from JPG</h2>

      {/* Drag & drop area */}
      <div
        {...getRootProps()}
        className="border rounded border-dashed p-5 text-center mb-3"
        style={{ cursor: "pointer", background:'#f0f0f0' }}
      >
        <input {...getInputProps()} />
        {file ? <p>{file.name}</p> : <p>Drag & drop JPG here, or click to select</p>}
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-3">
          <img src={preview} alt="Preview" className="img-fluid border" style={{ maxHeight: 300 }} />
        </div>
      )}

      {/* Format select */}
      {preview && (
        <div className="mb-3">
          <label className="me-2">Convert to:</label>
          <select
            className="form-select w-auto d-inline-block"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="png">PNG</option>
            <option value="gif">GIF</option>
          </select>
        </div>
      )}

      {/* Buttons */}
      {preview && (
        <div>
          <button className="btn btn-primary me-2" onClick={handleConvertAndDownload}>
            Convert & Download
          </button>
          <button className="btn btn-secondary" onClick={() => { setFile(null); setPreview(null); }}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
