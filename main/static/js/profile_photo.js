
// Get elements
var modal = document.getElementById("imgModal");
var img = document.getElementById("profilePic");
var modalImg = document.getElementById("imgZoom");
var closeBtn = document.getElementsByClassName("close")[0];

img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

modal.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

