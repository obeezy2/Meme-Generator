"use strict";
var gMemesFilter = "";
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

var gImgs = [
  { id: 1, url: "images/1.jpg", keywords: ["trump"] },
  { id: 2, url: "images/2.jpg", keywords: ["dogs", "cute"] },
  { id: 3, url: "images/3.jpg", keywords: ["puppy", "dog"] },
  { id: 4, url: "images/4.jpg", keywords: ["cat", "sleep", "cute"] },
  { id: 5, url: "images/5.jpg", keywords: ["baby", "victory", "cute"] },
  { id: 6, url: "images/6.jpg", keywords: ["man"] },
  { id: 7, url: "images/7.jpg", keywords: ["baby", "eyes"] },
  { id: 8, url: "images/8.jpg", keywords: ["man", "smile"] },
  { id: 9, url: "images/9.jpg", keywords: ["baby", "laugh"] },
  { id: 10, url: "images/10.jpg", keywords: ["obama", "politics"] },
  { id: 11, url: "images/11.jpg", keywords: ["man", "kiss"] },
  { id: 12, url: "images/12.jpg", keywords: ["man", "tv"] },
  { id: 13, url: "images/13.jpg", keywords: ["leonardo dicaprio", "movie"] },
  { id: 14, url: "images/14.jpg", keywords: ["matrix", "movie"] },
  { id: 15, url: "images/15.jpg", keywords: ["man", "tv"] },
  { id: 16, url: "images/16.jpg", keywords: ["man", "tv"] },
  { id: 17, url: "images/17.jpg", keywords: ["putin", "politics", "man"] },
  { id: 18, url: "images/18.jpg", keywords: ["toy", "movie", "tv"] },
  { id: 19, url: "images/19.jpg", keywords: ["oprah", "tv"] },
  { id: 20, url: "images/20.jpg", keywords: ["dogs", "cute", "puppy"] },
];

function setImg(Img) {
  const currImg = {
    id: gImgs.length + 1,
    url: Img.src,
  };
  gImgs.push(currImg);
  setImg(currImg);
}

function getImgs() {
  var imgs = [];
  if (!gMemesFilter) {
    return gImgs;
  } else {
    gImgs.map((img) => {
      if (img.keywords.includes(gMemesFilter)) {
        imgs.push(img);
      }
    });
    return imgs;
  }
}

function setFilter(statusFilter) {
  gMemesFilter = statusFilter;
}
function setFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}
