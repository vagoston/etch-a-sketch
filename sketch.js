let mouseStatus = 0;
let canvas = document.querySelector("#canvas");
const squareSize = 16;
const gridSize = 32;

document.body.onmousedown = function (clickDown) {
    b = clickDown.button;
    if (b) b <<= 1;
    else b |= 1;
    mouseStatus |= b;
    if (canvas.contains(clickDown.target)) mouseOverListener(clickDown);
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
function init() {
    document.addEventListener('contextmenu', e => { e.preventDefault(); return false; })
    canvas.style.backgroundColor = "#fff";
    canvas.style.width = canvas.style.height = `100px`;
    canvas.style.display = "flex";
    canvas.style.flexDirection = "column";

    for (let rowId = 0; rowId < gridSize; rowId++) {
        let row = document.createElement('div');
        row.style.display = "flex";
        for (let colId = 0; colId < gridSize; colId++) {
            let square = document.createElement('div');
            square.style.flex = 'auto';
            square.style.backgroundColor = "#000";
            square.style.opacity = 0;
            square.addEventListener('mouseover', mouseOverListener);
            row.append(square);
        }
        row.style.flex = 'auto'
        canvas.append(row);
    }
}

init();