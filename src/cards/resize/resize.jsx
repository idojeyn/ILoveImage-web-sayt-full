// src/components/Resize.jsx
import React, { useState } from "react";

const Resize = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  // Rasm yuklash
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Resize qilish
  const handleResize = () => {
    if (!image || !width || !height) return;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const resizedImage = canvas.toDataURL("image/jpeg", 0.9);
      setPreview(resizedImage);
    };
  };

  // Yuklab olish
  const handleDownload = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.href = preview;
    link.download = "resized-image.jpg";
    link.click();
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <div className=" ">
        <div className="text-center">
          <h3 className="mb-4 fw-bold">Resize Image</h3>

          {/* Upload */}
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageUpload}
            />
          </div>

          {/* Width & Height input */}
          <div className="row g-2 mb-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary px-4"
              onClick={handleResize}
              disabled={!image}
            >
              Resize
            </button>
            <button
              className="btn btn-success px-4"
              onClick={handleDownload}
              disabled={!preview}
            >
              Download
            </button>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <h5 className="mb-3">Preview</h5>
              <img
                src={preview}
                alt="preview"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resize;
