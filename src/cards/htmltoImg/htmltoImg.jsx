import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

export default function HtmlToImage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const previewRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/html": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      setFile(f);
      setUrl("");
      const reader = new FileReader();
      reader.onload = (e) => setHtmlContent(e.target.result);
      reader.readAsText(f);
    },
  });

  const handleLoadURL = async () => {
    if (!url) return;
    try {
      const res = await fetch(`/api/fetch-url?url=${encodeURIComponent(url)}`);
      const html = await res.text();
      setHtmlContent(html);
      setFile(null);
    } catch (err) {
      alert("Failed to fetch URL");
    }
  };

  const handleDownload = async (format) => {
    if (!previewRef.current) return;

    if (format === "png" || format === "jpg") {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      canvas.toBlob((blob) => {
        saveAs(blob, `html-image.${format}`);
      }, `image/${format}`);
    } else if (format === "svg") {
      const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${previewRef.current.offsetWidth}" height="${previewRef.current.offsetHeight}">
        <foreignObject width="100%" height="100%">
          ${new XMLSerializer().serializeToString(previewRef.current)}
        </foreignObject>
      </svg>`;
      const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
      saveAs(blob, "html-image.svg");
    }
  };

  return (
    <div className="container text-center py-5" style={{minHeight:'91vh'}}>
      <h2 className="mb-3">HTML to Image </h2>
      <h5 className="text-muted m-4 ">
        Convert web pages to JPG or SVG and maintain the visual aspect.
      </h5>

      {/* URL Input */}
      <div className="mb-3 row g-2">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Enter URL to fetch HTML"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-gradient-primary w-100"
            onClick={handleLoadURL}
            style={{ background: "linear-gradient(to right, #ff512f, #dd2476)", color: "#fff", border: "none" }}
          >
            Load URL
          </button>
        </div>
      </div>

      {/* Drag & Drop */}
      <div
        {...getRootProps()}
        className="border border-dashed p-5 mb-3 text-center"
        style={{ cursor: "pointer", borderRadius: "8px", backgroundColor: "#f8f9fa" }}
      >
        <input {...getInputProps()} />
        {!file ? <p>Drag & drop an HTML file here, or click to select</p> : <p>{file.name}</p>}
      </div>

      {/* Preview */}
      <div className="mb-3 border p-3" style={{ borderRadius: "8px", backgroundColor: "#fff" }}>
        <div
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{ padding: "10px", minHeight: "200px" }}
        />
      </div>

      {/* Download Buttons */}
      <div className="text-center d-flex justify-content-center gap-2 flex-wrap">
        <button
          className="btn btn-gradient-primary"
          onClick={() => handleDownload("png")}
          style={{ background: "linear-gradient(to right, #ff512f, #dd2476)", color: "#fff", border: "none" }}
        >
          Download JPG
        </button>
        <button
          className="btn btn-gradient-success"
          onClick={() => handleDownload("svg")}
          style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", color: "#fff", border: "none" }}
        >
          Download SVG
        </button>
      </div>
    </div>
  );
}
