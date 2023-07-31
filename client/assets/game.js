
//ESTABLISHES CANVAS CONTEXT AND LOCATION.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//TILEMAP 
const tileW = 40;
const tileH = 40;

const gridRows = 10;
const gridCols = 10;

//Makes a continouos loop so game can be refreshed. Think of framerate.
const updateAll = () => {
    window.requestAnimationFrame(updateAll);
}

//RUNS FUNCTION WHEN WINDOW HAS LOADED.
window.onload = () => {
    window.requestAnimationFrame(updateAll);
}