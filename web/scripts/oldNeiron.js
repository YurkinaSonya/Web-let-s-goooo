
var divForPnt = document.getElementById('divForPainting')
var size = 5;
var typeOfMouse = true;
var typeOfDrw = true;
var typeOfBrsh = false;
let matrix = [size];
let listOfPixels = [size*size];
for (let i = 0; i < size; i++) {
    matrix[i] = [size];
    for (let j = 0; j < size; j++) {
        matrix[i][j] = 0;
    }
}

function clearDiv() {
    //alert("clear");
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
            document.getElementById(i * size + j).style.backgroundColor = "#FFFFFF";
        }
    }
}

function clickDrw() {
    typeOfDrw = !(typeOfDrw);
    //alert(typeOfDrw);
}

function clickBrsh() {
    typeOfBrsh = !(typeOfBrsh);
    //alert(typeOfBrsh);
}

function createDiv() {
    for (let k = 0; k < size * size; k++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        div.id = k;
        div.addEventListener ('click', function(){
            
            //alert(1);
            if (typeOfMouse) {
                let j = k % size;
                let i = (k / size) - (k / size) % 1;
                if (typeOfDrw) {
                    if (typeOfBrsh) {
                        for (let ir = i - 1; ir <= i + 1; ir++) {
                            for (let jr = j - 1; jr <= j + 1; jr++) {
                                if (ir >= 0 && jr >= 0 && ir < size && jr < size)
                                {
                                    matrix[ir][jr] = 1;
                                    document.getElementById(ir * size + jr).style.backgroundColor = "#000000";
                                }
                            }
                        }
                    }
                    else {
                        matrix[i][j] = 1;
                        div.style.backgroundColor = "#000000";
                    }
                }
                else {
                    if (typeOfBrsh) {
                        for (let ir = i - 1; ir <= i + 1; ir++) {
                            for (let jr = j - 1; jr <= j + 1; jr++) {
                                if (ir >= 0 && jr >= 0 && ir < size && jr < size)
                                {
                                    matrix[ir][jr] = 0;
                                    document.getElementById(ir * size + jr).style.backgroundColor = "#FFFFFF";
                                }
                            }
                        }
                    }
                    else {
                        matrix[i][j] = 0;
                        div.style.backgroundColor = "#FFFFFF";
                    }
                }
            }
        })
        divForPnt.appendChild(div);
    }
}
/*
window.addEventListener("mousedown", function() {
    typeOfMouse = true;
})

window.addEventListener("mouseup", function() {
    typeOfMouse = false;
})
*/
createDiv()

const trainingData = [
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { input: [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
    { input: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], output: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
    { input: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    { input: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    { input: [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    { input: [0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1], output: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
  ];