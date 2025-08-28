import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

function getCroppedImg(imageSrc, crop, zoom, aspect) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      const scaleX = naturalWidth / image.width;
      const scaleY = naturalHeight / image.height;

      const pixelCrop = {
        x: crop.x * scaleX,
        y: crop.y * scaleY,
        width: crop.width * scaleX,
        height: crop.height * scaleY,
      };

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    };
  });
}

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels, zoom);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, zoom]);

  const downloadImage = () => {
    if (croppedImage) {
      saveAs(croppedImage, "cropped.jpg");
    }
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <h3 className="mb-4 text-center">✂️ Image Crop Tool</h3>

      {!imageSrc ? (
        <div
          {...getRootProps()}
          className="border border-2 border-secondary p-5 text-center rounded bg-light"
          style={{ cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          <p className="mb-0">Drag & drop your image here, or click to select</p>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="crop-container position-relative" style={{ height: 400, background: "#333" }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Zoom:</label>
              <input
                type="range"
                className="form-range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </div>
            <button className="btn btn-primary me-2" onClick={showCroppedImage}>
              Crop
            </button>
            {croppedImage && (
              <button className="btn btn-success" onClick={downloadImage}>
                Download
              </button>
            )}
          </div>

          <div className="col-md-4">
            {croppedImage && (
              <div className="preview p-2 border rounded">
                <h6 className="text-center">Preview</h6>
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="img-fluid rounded"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropImage;
