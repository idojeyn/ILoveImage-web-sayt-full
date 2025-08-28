import { useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

export default function ContainerPhotoEditor() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [file, setFile] = useState(null);
  const [imgObj, setImgObj] = useState(null);

  // Transform & Filter
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // pan offset
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  const [filter, setFilter] = useState({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    sepia: 0
  });

  // Drawing & Text
  const [drawMode, setDrawMode] = useState(false);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [texts, setTexts] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [addingText, setAddingText] = useState(false);

  // Undo / Redo
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  const saveState = () => {
    undoStack.current.push({
      rotation, flipH, flipV, zoom, offset: { ...offset }, filter: { ...filter },
      lines: JSON.parse(JSON.stringify(lines)),
      texts: JSON.parse(JSON.stringify(texts))
    });
    if (undoStack.current.length > 50) undoStack.current.shift();
  };

  const undo = () => {
    if (!undoStack.current.length) return;
    const prev = undoStack.current.pop();
    redoStack.current.push({
      rotation, flipH, flipV, zoom, offset: { ...offset }, filter: { ...filter },
      lines: JSON.parse(JSON.stringify(lines)),
      texts: JSON.parse(JSON.stringify(texts))
    });
    setRotation(prev.rotation);
    setFlipH(prev.flipH);
    setFlipV(prev.flipV);
    setZoom(prev.zoom);
    setOffset(prev.offset);
    setFilter(prev.filter);
    setLines(prev.lines);
    setTexts(prev.texts);
  };

  const redo = () => {
    if (!redoStack.current.length) return;
    const next = redoStack.current.pop();
    undoStack.current.push({
      rotation, flipH, flipV, zoom, offset: { ...offset }, filter: { ...filter },
      lines: JSON.parse(JSON.stringify(lines)),
      texts: JSON.parse(JSON.stringify(texts))
    });
    setRotation(next.rotation);
    setFlipH(next.flipH);
    setFlipV(next.flipV);
    setZoom(next.zoom);
    setOffset(next.offset);
    setFilter(next.filter);
    setLines(next.lines);
    setTexts(next.texts);
  };

  const onDrop = (acceptedFiles) => {
    const f = acceptedFiles[0];
    setFile(f);
    const img = new Image();
    img.src = URL.createObjectURL(f);
    img.onload = () => setImgObj(img);
    undoStack.current = [];
    redoStack.current = [];
    setLines([]);
    setTexts([]);
    setOffset({ x: 0, y: 0 });
    setZoom(1);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    multiple: false
  });

  // Canvas render function
  const drawCanvas = () => {
    if (!canvasRef.current || !imgObj) return;
    const ctx = canvasRef.current.getContext("2d");
    const container = containerRef.current;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    canvasRef.current.width = cw;
    canvasRef.current.height = ch;

    ctx.clearRect(0, 0, cw, ch);
    ctx.save();
    ctx.translate(cw / 2 + offset.x, ch / 2 + offset.y);
    ctx.scale(zoom, zoom);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.filter = `brightness(${filter.brightness}%) contrast(${filter.contrast}%) grayscale(${filter.grayscale}%) sepia(${filter.sepia}%)`;
    ctx.drawImage(imgObj, -imgObj.width / 2, -imgObj.height / 2);
    ctx.restore();

    // Draw existing lines
    lines.forEach(line => {
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.beginPath();
      line.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    });

    // Draw texts
    texts.forEach(t => {
      ctx.fillStyle = t.color;
      ctx.font = `${t.size}px Arial`;
      ctx.fillText(t.text, t.x, t.y);
    });
  };

  useEffect(() => { drawCanvas(); }, [imgObj, rotation, flipH, flipV, zoom, offset, filter, lines, texts]);

  // Pan handling
  const handleMouseDown = (e) => {
    if (drawMode) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCurrentLine([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    } else {
      setIsPanning(true);
      panStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    }
  };
  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (drawMode && currentLine.length) {
      setCurrentLine([...currentLine, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    } else if (isPanning) {
      setOffset({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
    }
  };
  const handleMouseUp = () => {
    if (drawMode && currentLine.length) {
      saveState();
      setLines([...lines, { points: currentLine, color: "#ff0000", width: 2 }]);
      setCurrentLine([]);
    }
    setIsPanning(false);
  };

  const addText = (e) => {
    if (!addingText) return;
    const rect = canvasRef.current.getBoundingClientRect();
    saveState();
    setTexts([...texts, { text: textInput, x: e.clientX - rect.left, y: e.clientY - rect.top, color: "#000", size: 20 }]);
    setTextInput("");
    setAddingText(false);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(blob => saveAs(blob, "edited.png"), "image/png");
  };

  return (
    <div className="container py-5" style={{ minHeight: '91vh' }}>
      <h2 className="text-center">Photo Editor</h2>
      <div {...getRootProps()} className="border rounded border-dashed p-4 mb-3 text-center" style={{ width: "80%", cursor: "pointer", margin: '0 auto',background:'#f0f0f0' }}>
        <input {...getInputProps()} />
        {file ? <p>{file.name}</p> : <p>Drag & drop an image or click to select</p>}
      </div>

      {imgObj && (
        <>
          <div ref={containerRef} className=" canvas-container " style={{ width: "50%", height: "60vh", border: "1px solid #ccc", overflow: "hidden", position: "relative", margin: "10px auto", float: 'right' }}>
            <canvas
              ref={canvasRef}
              style={{ position: "absolute", top: 0, left: 0, cursor: drawMode ? "crosshair" : "grab" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={addText}
            />
          </div>

          <div className="left" style={{width:'50%',float:'left',height:'50vh'}}>
            {/* Controls */}
            <div className="mb-2">
              <button className="btn btn-secondary me-1" onClick={() => { saveState(); setRotation(r => r - 90) }}>Rotate Left</button>
              <button className="btn btn-secondary me-1" onClick={() => { saveState(); setRotation(r => r + 90) }}>Rotate Right</button>
              <button className="btn btn-secondary me-1" onClick={() => { saveState(); setFlipH(f => !f) }}>Flip H</button>
              <button className="btn btn-secondary me-1" onClick={() => { saveState(); setFlipV(f => !f) }}>Flip V</button><br />
              <button className="btn btn-warning me-1 my-2" onClick={undo} disabled={!undoStack.current.length}>Undo</button>
              <button className="btn btn-warning me-1 my-2" onClick={redo} disabled={!redoStack.current.length}>Redo</button>
            </div>

            {/* Zoom & Filters */}
            <div className="mb-2">
              <label>Zoom: </label>
              <input type="range" min={0.5} max={3} step={0.05} value={zoom} onChange={e => { saveState(); setZoom(Number(e.target.value)) }} />
              {["brightness", "contrast", "grayscale", "sepia"].map(f => (
                <div key={f}>
                  <label>{f}: </label>
                  <input type="range" min={f === "grayscale" || f === "sepia" ? 0 : 0} max={f === "grayscale" || f === "sepia" ? 100 : 200} value={filter[f]} onChange={e => { saveState(); setFilter({ ...filter, [f]: Number(e.target.value) }) }} />
                </div>
              ))}
            </div>

            {/* Drawing / Text */}
            <div className="mb-2">
              <button className={`btn me-1 ${drawMode ? "btn-success" : "btn-secondary"}`} onClick={() => setDrawMode(!drawMode)}>Draw</button>
              <button className="btn btn-secondary me-1" onClick={() => setAddingText(true)}>Add Text</button>
              {addingText && <input type="text" style={{background:'#fff', outline:'none',color:'#000'}} value={textInput} onChange={e => setTextInput(e.target.value)} />}
            </div>

            {/* Download */}
            <div className="mb-2">
              <button className="btn btn-primary" onClick={handleDownload}>Download PNG</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
