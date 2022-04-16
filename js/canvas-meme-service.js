function setMeme() {
  gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    isEdit: false,
    lines: [
      {
        txt: "",
        size: 50,
        align: "left",
        color: "white",
        stroke: "black",
        font: "Arial",
        x: 50,
        y: 70,
        isDrag: false,
      },
      {
        txt: "",
        size: 50,
        align: "left",
        color: "white",
        stroke: "black",
        font: "Arial",
        x: 50,
        y: 420,
        isDrag: false,
      },
    ],
  };
}

function setEdit(value) {
  gMeme.isEdit = value;
}
function setImg(img) {
  gMeme.selectedImgId = img.id;
}
function getMeme() {
  return gMeme;
}
function changelinePos(x, y) {
  gMeme.lines[gMeme.selectedLineIdx].x += x;
  gMeme.lines[gMeme.selectedLineIdx].y += y;
}

function increaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size += 4;
}
function decreaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 4;
}

function changeText(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}
function changeLine() {
  if (gMeme.selectedImgId >= gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  }
  ++gMeme.selectedLineIdx;
}

function setStroke(stroke) {
  gMeme.lines[gMeme.selectedLineIdx].stroke = stroke;
}
function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}
function createMeme(meme) {
  setMeme();
  gMeme.lines = meme.lines;
  gMeme.selectedImgId = meme.selectedImgId;
}
function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}
function clearText() {
  gMeme.lines.forEach(function (line) {
    line.txt = "";
  });
  setEdit(false);
  renderMeme();
}

function alignText(alignTo) {
  gMeme.lines[gMeme.selectedLineIdx].align = alignTo;
  switch (alignTo) {
    case "left":
      gMeme.lines[gMeme.selectedLineIdx].x = 50;
      break;

    case "center":
      gMeme.lines[gMeme.selectedLineIdx].x = 250;
      break;
    case "right":
      gMeme.lines[gMeme.selectedLineIdx].x = 480;
      break;
  }
}

function isTextClicked(clickedPos) {
  var isClicked = false;
  gMeme.isEdit = false;
  gMeme.lines.forEach(function (line, i) {
    const posY = line.y;
    const distanceY = posY - clickedPos.y;
    if (
      distanceY <= gMeme.lines[gMeme.selectedLineIdx].size &&
      distanceY > 0 &&
      clickedPos.x > 50 &&
      clickedPos.x < 450
    ) {
      gMeme.selectedLineIdx = i;
      isClicked = true;
      gMeme.isEdit = true;
    }
  });
  return isClicked;
}
function addLine(canvasHeight) {
  const newLine = {
    txt: "",
    size: 50,
    align: "left",
    color: "white",
    stroke: "black",
    font: "Arial",
    x: 50,
    y: canvasHeight / 2,
    isDrag: false,
  };
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}
function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    document.querySelector(
      ".user-msg"
    ).innerText = `Your photo is available here: ${uploadedImgUrl}`;
    document.querySelector(".share-container").innerHTML = `
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share on facebook  
      </a>`;
  }
  doUploadImg(imgDataUrl, onSuccess);
}
function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
  elLink.download = "my-meme";
}
