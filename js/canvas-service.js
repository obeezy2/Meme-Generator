function InitCanvas(img) {
  gElCanvas = document.querySelector("#mycanvas");
  gCtx = gElCanvas.getContext("2d");
  document.querySelector(".meme-container").style.display = "flex";
  document.querySelector(".text-editor").style.display = "grid";
  document.querySelector(".text-wrapper").style.display = "grid";
  document.querySelector(".images-wrapper").style.display = "none";
  addListeners();
  setMeme();
  setImg(img);
  resiveCanvas(img);
}

function addListeners() {
  addEventListeners();
}

function addEventListeners() {
  gElCanvas.addEventListener("mousemove", onMove);
  gElCanvas.addEventListener("mousedown", onDown);
  gElCanvas.addEventListener("mouseup", onUp);
  gElCanvas.addEventListener("touchmove", onMove);
  gElCanvas.addEventListener("touchstart", onDown);
  gElCanvas.addEventListener("touchend", onUp);
}
function onDown(ev) {
  const pos = getEventPosition(ev);
  console.log(pos);
  if (!isTextClicked(pos)) return;
  textDrag(true);
  gStartPos = pos;
  document.body.style.cursor = "grabbing";
  const line = getLine();
  document.querySelector(".txt").value = line.txt;
  renderMeme();
}

function onMove(ev) {
  const line = getLine();
  if (!line.isDrag) return;
  const pos = getEventPosition(ev);
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;
  changelinePos(dx, dy);
  gStartPos = pos;
  renderMeme();
}

function onUp() {
  textDrag(false);
  document.body.style.cursor = "grab";
}

function getEventPosition(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  return pos;
}
function drawText(txt, size, color, stroke, font, align, position) {
  gCtx.textAlign = align;
  gCtx.fillStyle = color;
  gCtx.lineWidth = 2;
  const currFont = `${size}px ${font}`;
  gCtx.font = currFont;

  gCtx.fillText(txt, position.x, position.y);
  gCtx.strokeStyle = stroke;
  gCtx.strokeText(txt, position.x, position.y);
}

function drawOutline(pos, size) {
  gCtx.beginPath();
  gCtx.moveTo(50, pos.y + 10);
  gCtx.lineTo(450, pos.y + 10);
  gCtx.moveTo(50, pos.y - size);
  gCtx.lineTo(450, pos.y - size);
  gCtx.closePath();
  gCtx.strokeStyle = "black";
  gCtx.stroke();
}

function onIncreaseFont() {
  increaseFont();
  renderMeme();
}

function onDecreaseFont() {
  decreaseFont();
  renderMeme();
}

function onSetStroke(stroke) {
  setStroke(stroke);
  renderMeme();
}
function onSetColor(color) {
  setColor(color);
  renderMeme();
}

function onClearText() {
  clearText();
  renderMeme();
}

function onAlignText(alignTo) {
  alignText(alignTo);
  renderMeme();
}

function onEdit() {
  setEdit(true);
  renderMeme();
}

function resiveCanvas() {
  const cW = 525;
  const cH = 459;
  gElCanvas.height = cH;
  gElCanvas.width = cW;
  renderMeme();
}
function onChangeLine() {
  changeLine();
  renderMeme();
  const line = getLine();
  document.querySelector(".txt").value = line.txt;
}

function onAddLine() {
  addLine(gElCanvas.height);
  renderMeme();
  const line = getLine();
  document.querySelector(".txt").value = line.txt;
}
function onChangeText() {
  const txt = document.querySelector(".txt").value;
  changeText(txt);
  renderMeme();
}
function textDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
}
function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append("img", imgDataUrl);

  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log("Got back live url:", url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}
function renderMeme() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  const meme = getMeme();
  const img = document.querySelector(`.img${meme.selectedImgId}`);
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  const currLine = meme.selectedLineIdx;
  meme.lines.forEach(function (line, idx) {
    const font = line.font;
    const direction = line.align;
    const pos = { x: line.x, y: line.y };
    const isDrag = line.isDrag;
    const txt = line.txt;
    const size = line.size;
    const color = line.color;
    const stroke = line.stroke;

    drawText(txt, size, color, stroke, font, direction, pos);

    if (!isDrag && currLine === idx && meme.isEdit) drawOutline(pos, size);
  });
}
