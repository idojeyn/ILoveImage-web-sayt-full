import React, { useState } from "react";

const Compress = () => {
  const [image, setImage] = useState(null);
  const [compressed, setCompressed] = useState(null);

  // rasm tanlash
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // rasmni compress qilish
  const handleCompress = () => {
    if (!image) return;

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // width height ni kichraytirish (50% qilib)
        const scale = 0.6;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // sifatni 0.7 qilib saqlash
        const compressedData = canvas.toDataURL("image/jpeg", 0.7);
        setCompressed(compressedData);
      };
    };
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      {/* Header qismi */}
      <h1 className="fw-bold mb-3">Compress IMAGE</h1>
      <h5 className="text-muted m-4 ">
        Compress JPG, PNG, SVG or GIF with the best quality and compression.
Reduce the filesize of your images at once.
      </h5>

      {/* Upload box */}
      <div
        className="border border-2 border-secondary rounded-3 p-5 mb-4 bg-light"
        style={{ cursor: "pointer" }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <i className="bi bi-cloud-arrow-up display-3 text-primary"></i>
        <p className="mt-3 mb-0">Click or drag image here</p>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </div>

      {/* Rasm tanlansa */}
      {image && (
        <div className="mb-4">
          <p className="fw-semibold">{image.name}</p>
          <button className="btn btn-danger px-4" onClick={handleCompress}>
            Compress Image
          </button>
        </div>
      )}

      {/* Compress qilingan rasm */}
      {compressed && (
        <div className="mt-4">
          <h5 className="mb-3">Compressed Image Preview:</h5>
          <img
            src={compressed}
            alt="compressed"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px" }}
          />
          <br />
          <a
            href={compressed}
            download="compressed.jpg"
            className="btn btn-outline-success  mt-3 px-4"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default Compress;
