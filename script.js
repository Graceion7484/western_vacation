"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/
window.addEventListener("load", createLightbox);

function createLightbox(){
   // Lightbox Container
   let lightBox = document.getElementById("lightbox");

   // Parts of the lightbox
   let lbTitle = document.createElement("h1");
   let lbCounter = document.createElement("div");
   let lbPrev = document.createElement("div");
   let lbNext = document.createElement("div");
   let lbPlay = document.createElement("div");
   let lbImages = document.createElement("div");
  
    // Design the lightbox title
    lightBox.appendChild(lbTitle);
    lbTitle.id = "lbTitle";
    lbTitle.textContent = lightboxTitle;

    // Design the lightbox slide counter
    lightBox.appendChild(lbCounter);
    lbCounter.id = "lbCounter";
   let currentImg = 1;
   lbCounter.textContent= currentImg + " / " + imgCount;

    // design the lighbox next previous slide button
    lightBox.appendChild(lbPrev);
    lbPrev.id = "lbPrev";
    lbPrev.innerHTML = "&#9664";
    lbPrev.onclick = showPrev;

   // design the lighbox next slide button
    lightBox.appendChild(lbNext);
    lbNext.id = "lbNext";
    lbNext.innerHTML = "&#9654";
    lbNext.onclick = showNext;

    // design the lighbox Play-pause button
    lightBox.appendChild(lbPlay);
    lbPlay.id = "lbPlay";
    lbPlay.innerHTML = "&#9199";
    let timeID;
    lbPlay.onclick = function () {
        if (timeID){
            // stop the slideshow
            window.clearInterval(timeID);
            timeID = undefined;
        }else{
            //start slideshow
            showNext();
            timeID = window.setInterval(showNext, 1500);
        }
    }


    // design the lighbox images container
    lightBox.appendChild(lbImages);
    lbImages.id = "lbImages";

   // add images from the imgFiles array to the container
   for(let i = 0; i<imgCount; i++){
       let image = document.createElement("img");
       image.src = imgFiles[i];
       image.alt = imgCaptions[i];
       image.onclick = createOverlay;
       lbImages.appendChild(image);
   }
    
//function to move foward through the image
function showNext() {
   lbImages.appendChild(lbImages.firstElementChild);
   (currentImg < imgCount) ? currentImg++ : currentImg=1;
   lbCounter.textContent = currentImg + "/" + imgCount;
}

//function to move backwards through the image list
function showPrev(){
    lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
    (currentImg > 1) ? currentImg-- :currentImg = imgCount;
    lbCounter.textContent = currentImg + " / " + imgCount;
}

function createOverlay(){
    let overlay = document.createElement("div");
    overlay.id = "lbOverlay";

    //add the figure box to thre overlay
    let figureBox = document.createElement("figure");
    overlay.appendChild(figureBox);

//add the image to the figure box
let overlayImage = this.cloneNode("true");
figureBox.appendChild(overlayImage);

// add the caption to the figure box
let overlayCaption = document.createElement("figcaption");
overlayCaption.textContent = this.alt;
figureBox.appendChild(overlayCaption);

//add a close button to the overlay
let closeBox = document.createElement("div");
closeBox.id = "lbOverlayClose";
closeBox.innerHTML = "&times;";
closeBox.onclick = function() {
    document.body.removeChild(overlay);
}
overlay.appendChild(closeBox);

    document.body.appendChild(overlay);
}

}

