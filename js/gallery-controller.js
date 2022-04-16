function renderGallery() {
  const imgs = getImgs();

  const strHtmls = imgs.map(function (img) {
    return `<img class="img${img.id}" id="${img.id}" src="${img.url}" data-words="${img.keywords}" onclick="InitCanvas(this)">`;
  });

  document.querySelector(".images-wrapper").innerHTML = strHtmls.join("");
}

function onPushImg(img) {
  setImg(img);
}
renderGallery();

function onSetFilter(statusFilter, ev) {
  ev.preventDefault();
  setFilter(statusFilter);
  console.log(`statusFilter = `, statusFilter);
  renderGallery();
}
function onSetFont(font) {
  setFont(font);
  renderMeme();
}
