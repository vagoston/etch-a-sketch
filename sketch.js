let mouseStatus = 0;

document.body.onmousedown = function (clickDown) {
    b = clickDown.button;
    if (b) b <<= 1;
    else b |= 1;
    mouseStatus |= b;
    if (document.querySelector("#canvas").contains(clickDown.target)) mouseOverListener(clickDown);
    return false;
}

document.body.onmouseup = function (clickUp) {
    b = clickUp.button;
    if (b) b <<= 1;
    else b |= 1;
    mouseStatus ^= b;
    return false;
}

function mouseOverListener(e) {
    let currentOpacity = +e.target.style.opacity;
    if (mouseStatus === 1) {
        e.target.style.opacity = currentOpacity + 0.1 > 1 ? 1 : currentOpacity + 0.1;
    }
    if (mouseStatus === 4) {
        e.target.style.opacity = currentOpacity - 0.1 < 0 ? 0 : currentOpacity - 0.1;
    }
}

function createCanvas(resolution) {
    let oldCanvas = document.querySelector("#canvas");
    oldCanvas.remove();
    let canvas = document.createElement('div');
    canvas.id = "canvas";
    canvas.style.display = "flex";
    canvas.style.flexDirection = "column"
    for (let rowId = 0; rowId < resolution; rowId++) {
        let row = document.createElement('div');
        row.style.display = "flex";
        row.style.flex = 'auto'
        for (let colId = 0; colId < resolution; colId++) {
            let square = document.createElement('div');
            square.style.flex = 'auto';
            square.style.backgroundColor = "#000";
            square.style.opacity = 0;
            square.addEventListener('mouseover', mouseOverListener);
            row.append(square);
        }
        canvas.append(row);
    }   
    let container = document.querySelector(".container")
    container.append(canvas)

}

function changeCanvasButtonListener() {
    let resolution = prompt("What should be the new resolution?\nEnter a single number, 100 is the maximum.");
    createCanvas(resolution > 100 ? 100: resolution);
}

document.querySelector("#resize").addEventListener('click', changeCanvasButtonListener);

function init() {
    document.addEventListener('contextmenu', e => { e.preventDefault(); return false; })
    canvas.style.backgroundColor = "#fff"
    canvas.style.display = "flex";
    canvas.style.flexDirection = "column";
    createCanvas(32);
}

init();