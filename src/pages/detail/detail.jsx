import { useParams } from "react-router-dom";
import { useState } from "react";
import "./detail.css";

function Detail() {
  const { toolname } = useParams();
  const [files, setFiles] = useState([]);

  // Fayl tanlash
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setFiles([...e.dataTransfer.files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="detail-page">
      <h1 className="tool-title">{toolname.toUpperCase()}</h1>
      <p className="tool-subtitle">
        Upload your images to start {toolname}.
      </p>

      {/* Upload area */}
      <div
        className="upload-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>📂 Drag & Drop your images here</p>
        <span>or</span>
        <label className="upload-btn">
          Select Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </label>
      </div>

      {/* Preview */}
      {files.length > 0 && (
        <div className="preview-grid">
          {files.map((file, idx) => (
            <div key={idx} className="preview-card">
              <img src={URL.createObjectURL(file)} alt={file.name} />
              <p>{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default Detail