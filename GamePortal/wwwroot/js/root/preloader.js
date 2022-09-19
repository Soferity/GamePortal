window.onload = function() {
    //Can also use window.addEventListener('load', (event) => {
    Preloaded();
};

document.addEventListener('readystatechange', event => {
    switch (document.readyState) {
        case "loading":
            //None
            break;
        case "interactive":
            //First
            Preloaded();
            break;
        case "complete":
            //Last
            Preloaded();
            break;
        default:
            //None
            break;
    }
});

var countLoader = 0;

function Preloaded() {
    if (countLoader > 2) {
        countLoader = 0;
        document.getElementById("preloader").style.display = "none";
        document.getElementById("application").style.visibility = "visible";
        document.getElementById("body").style.overflow = "unset";
    } else {
        ++countLoader;
    }
}