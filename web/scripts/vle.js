//alert(1)
var r = document.querySelector(':root');
var slider = document.getElementById("rangeN");
var output = document.getElementById("demo");
var square =  document.getElementById("labirintSquare");
document.documentElement.style.setProperty('--heightOfWindow', window.innerHeight);
output.innerHTML = slider.value;
var anim = document.getElementById("anim");
var n = 3;
var oldN;
var typeOfInput = 0;
var found = false;
var iCoordsOfStrt = -1;
var jCoordsOfStrt = -1;
var iCoordsOfFinish = -1;
var jCoordsOfFinish = -1;

function setTypeOfEnter(type) {
    typeOfInput = type;
    //alert(typeOfInput);
}


var animCheck = 1;
anim.addEventListener('change', () => {
    animCheck = !animCheck;
});


const maxSize = 51;
let matrixOfLabirint = [maxSize];

for (let i = 0; i < maxSize; i++) {
    matrixOfLabirint[i] = [maxSize];
    for (let j = 0; j < maxSize; j++) {
        matrixOfLabirint[i][j] = -1;
    }
}

function displayImage(src, id) {
    var img = document.createElement("img");
    img.src = src;
    img.id = id;
    img.alt = id;
    img.addEventListener('click', function handleClick() {
        let j = id % n;
        let i = (id / n) - (id / n) % 1;
        if (typeOfInput == 0) { //ставим стены
            if (matrixOfLabirint[i][j] == -1) {
                setTree(i, j);
            }
            else {
                setRo(i, j);
            }
        }
        else if (typeOfInput == 1) { //точка старта
            if (iCoordsOfStrt == i && jCoordsOfStrt == j) {
                document.getElementById(i * n + j).src = "imges\\лабиринт\\trk.png";
                iCoordsOfStrt = -1;
                jCoordsOfStrt = -1;
            }
            else {
                if (iCoordsOfStrt != -1 && jCoordsOfStrt != -1 && iCoordsOfStrt < n && jCoordsOfStrt < n  && matrixOfLabirint[iCoordsOfFinish][jCoordsOfFinish] == -1) {
                    document.getElementById(iCoordsOfStrt * n + jCoordsOfStrt).src = "imges\\лабиринт\\trk.png";
                }
                iCoordsOfStrt = i;
                jCoordsOfStrt = j;
                if (matrixOfLabirint[i][j] != -1) {
                    matrixOfLabirint[i][j] = -1;
                    if (i - 1 >= 0) {
                        if (matrixOfLabirint[i - 1][j] > 0) {
                            matrixOfLabirint[i - 1][j] -= 8;
                            document.getElementById((i - 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i - 1][j] + ".png";
                        }
                    }
                    if (i + 1 < n) {
                        if (matrixOfLabirint[i + 1][j] > 0) {
                            matrixOfLabirint[i + 1][j] -= 2;
                            document.getElementById((i + 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i + 1][j] + ".png";
                        }
            
                    }
                    if (j - 1 >= 0) {
                        if (matrixOfLabirint[i][j - 1] > 0) {
                            matrixOfLabirint[i][j - 1] -= 4;
                            document.getElementById(i * n + (j - 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j - 1] + ".png";
                        }
                    }
                    if (j + 1 < n) {
                        if (matrixOfLabirint[i][j + 1] > 0) {
                            matrixOfLabirint[i][j + 1] -= 1;
                            document.getElementById(i * n + (j + 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j + 1] + ".png";
                        }
                    }
                }
                document.getElementById(i * n + j).src = "imges\\лабиринт\\strt.png";
            }
        }
        else if (typeOfInput == 2) { //точка fиниша
            if (iCoordsOfFinish == i && jCoordsOfFinish == j) {
                document.getElementById(i * n + j).src = "imges\\лабиринт\\trk.png";
                iCoordsOfFinish = -1;
                jCoordsOfFinish = -1;
            }
            else {
                if (iCoordsOfFinish != -1 && jCoordsOfFinish != -1 && iCoordsOfFinish < n && jCoordsOfFinish < n && matrixOfLabirint[iCoordsOfFinish][jCoordsOfFinish] == -1) {
                    document.getElementById(iCoordsOfFinish * n + jCoordsOfFinish).src = "imges\\лабиринт\\trk.png";
                }
                iCoordsOfFinish = i;
                jCoordsOfFinish = j;
                if (matrixOfLabirint[i][j] != -1) {
                    matrixOfLabirint[i][j] = -1;
                    if (i - 1 >= 0) {
                        if (matrixOfLabirint[i - 1][j] > 0) {
                            matrixOfLabirint[i - 1][j] -= 8;
                            document.getElementById((i - 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i - 1][j] + ".png";
                        }
                    }
                    if (i + 1 < n) {
                        if (matrixOfLabirint[i + 1][j] > 0) {
                            matrixOfLabirint[i + 1][j] -= 2;
                            document.getElementById((i + 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i + 1][j] + ".png";
                        }
            
                    }
                    if (j - 1 >= 0) {
                        if (matrixOfLabirint[i][j - 1] > 0) {
                            matrixOfLabirint[i][j - 1] -= 4;
                            document.getElementById(i * n + (j - 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j - 1] + ".png";
                        }
                    }
                    if (j + 1 < n) {
                        if (matrixOfLabirint[i][j + 1] > 0) {
                            matrixOfLabirint[i][j + 1] -= 1;
                            document.getElementById(i * n + (j + 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j + 1] + ".png";
                        }
                    }
                }
                //alert(i);
                document.getElementById(i * n + j).src = "imges\\лабиринт\\fnsh.png";
            }
        }
        
        //alert(matrixOfLabirint[i - 1][j] >=0);
    });
    square.appendChild(img);
}

function setRo(i, j) {
    if (matrixOfLabirint[i][j] != -1) {
        //console.log(i, j);
        matrixOfLabirint[i][j] = -1;
        if (i - 1 >= 0) {
            if (matrixOfLabirint[i - 1][j] > 0) {
                matrixOfLabirint[i - 1][j] -= 8;
                document.getElementById((i - 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i - 1][j] + ".png";
            }
        }
        if (i + 1 < n) {
            if (matrixOfLabirint[i + 1][j] > 0) {
                matrixOfLabirint[i + 1][j] -= 2;
                document.getElementById((i + 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i + 1][j] + ".png";
            }

        }
        if (j - 1 >= 0) {
            if (matrixOfLabirint[i][j - 1] > 0) {
                matrixOfLabirint[i][j - 1] -= 4;
                document.getElementById(i * n + (j - 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j - 1] + ".png";
            }
        }
        if (j + 1 < n) {
            if (matrixOfLabirint[i][j + 1] > 0) {
                matrixOfLabirint[i][j + 1] -= 1;
                document.getElementById(i * n + (j + 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j + 1] + ".png";
            }
        }
        document.getElementById(i * n + j).src = "imges\\лабиринт\\trk.png";
    }
}

function setTree(i, j) {
    if (iCoordsOfStrt == i && jCoordsOfStrt == j) {
        iCoordsOfStrt = -1;
        jCoordsOfStrt = -1;
    }
    if (iCoordsOfFinish == i && jCoordsOfFinish == j) {
        iCoordsOfFinish = -1;
        jCoordsOfFinish = -1;
    }
    //alert(matrixOfLabirint[i][j]);
    matrixOfLabirint[i][j] = 0;
    if (i - 1 >= 0) {
        if (matrixOfLabirint[i - 1][j] >=0 && matrixOfLabirint[i - 1][j] + 1 < 16) {
            matrixOfLabirint[i][j] += 2;
            matrixOfLabirint[i - 1][j] += 8;
            document.getElementById((i - 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i - 1][j] + ".png";
        }
    }
    if (i + 1 < n) {
        if (matrixOfLabirint[i + 1][j] >= 0 && matrixOfLabirint[i + 1][j] + 1 < 16) {
            matrixOfLabirint[i][j] += 8;
            matrixOfLabirint[i + 1][j] += 2;
            document.getElementById((i + 1) * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i + 1][j] + ".png";
        }

    }
    if (j - 1 >= 0) {
        if (matrixOfLabirint[i][j - 1] >=0 && matrixOfLabirint[i][j - 1] + 1 < 16) {
            matrixOfLabirint[i][j] += 1;
            matrixOfLabirint[i][j - 1] += 4;
            document.getElementById(i * n + (j - 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j - 1] + ".png";
        }
    }
    if (j + 1 < n) {
        if (matrixOfLabirint[i][j + 1] >= 0 && matrixOfLabirint[i][j + 1] + 1 < 16) {
            matrixOfLabirint[i][j] += 4;
            matrixOfLabirint[i][j + 1] += 1;
            document.getElementById(i * n + (j + 1)).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j + 1] + ".png";
        }
    }
    document.getElementById(i * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j] + ".png";
}

function allImagesDelete() {
    while (square.firstChild) {
        square.removeChild(square.firstChild);
    }
}

//alert(matrixOfLabirint[0][1]);

slider.oninput = function() {
    allImagesDelete();
    n = this.value;
    output.innerHTML = n;
    document.documentElement.style.setProperty('--n', n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrixOfLabirint[i][j] == -1) {
                displayImage("imges\\лабиринт\\trk.png", i * n + j);
            }
            else {
                displayImage("imges\\лабиринт\\" + matrixOfLabirint[i][j] + ".png", i * n + j);
            }
        }
    }
    if (iCoordsOfStrt != -1 && jCoordsOfStrt != -1 && iCoordsOfStrt < n && jCoordsOfStrt < n) {
        document.getElementById(iCoordsOfStrt * n + jCoordsOfStrt).src = "imges\\лабиринт\\strt.png";
    }
    if (iCoordsOfFinish != -1 && jCoordsOfFinish != -1 && iCoordsOfFinish < n && jCoordsOfFinish < n) {
        document.getElementById(iCoordsOfFinish * n + jCoordsOfFinish).src = "imges\\лабиринт\\fnsh.png";
    }
}

var way, answer;

function prio(x, y, n){       
    return (((x % n - y % n) ** 2) + ((x / n - (x / n) % 1 - y / n + (y / n) % 1) ** 2)) ** 0.5;
}


var listForMiddleCheck = [];
function work(list, quantity, start, end) {
    let step = [3], flag, visited = [quantity], priority = [quantity], listok = [quantity];
    for (let i = 0; i < quantity; i++){
        visited[i] = 0;
        priority[i] = prio(end, i, n);
        listok[i] = -1;
    }
    visited[start] = 0;
    listok [start] = 1;
    for (let i = 0; i < list[start][4]; i++){
        listok[list[start][i]] = 0; 
        visited[list[start][i]] = 1;
    }    
    step[0] = start;
    step[1] = start;
    listForMiddleCheck = [];
    while (true) {
        //await waitForme(200);
        step[2] = 1000000;
        for (let j = 0; j < quantity; j++) {
            if (listok[j]==0 && visited[j] + priority[j] * 2 < step[2]){
                step[2] = visited[j] + priority[j] * 2;
                step[1] = j;
            }
        }
        if(step[1] == end){
            listok[step[1]] = 1;
            flag = true;
            break;
        }   
        if (step[0] != step[1]){
            listForMiddleCheck.push(step[1]);
            listok[step[1]] = 1;         
            for (let i = 0; i < list[step[1]][4]; i++){
                if (listok[list[step[1]][i]] == -1){
                    listok[list[step[1]][i]] = 0; 
                    visited[list[step[1]][i]] = visited[step[1]] + prio(step[1], list[step[1]][i], n);
                }
            }
            way++;
            step[0] = step[1];
        }
        else{
            flag = false;
            break;
        }
    }
    if(flag){
        step[0] = end;
        step[1] = end;    
        listok[end] = 0;
        answer = [way];
        way = 0;
        while(answer[way] != start){
            step[2] = 1000000;
            for (let i = 0; i < list[step[0]][4]; i++){
                if (listok[list[step[0]][i]] == 1 && visited[list[step[0]][i]] < step[2]){
                    step[1] = list[step[0]][i];
                    step[2] = visited[list[step[0]][i]];
                }
            }
            answer[way + 1] = step[1];
            listok[step[1]] = 0;
            step[0] = step[1];
            way++;
        }
        //alert(answer[0] - 1);
        //alert(answer[1] - 1);
        found = true;
        showWay(listForMiddleCheck);//alert( answer[2] );
    }
    else{
        found = false;
        alert("не пройти(");
    }
}

var checkForCheck = false;


function waitForme(ms) {
    return new Promise (resolve => {
        setTimeout(() => {resolve('')}, ms);
    })
}

function waitFormeNew(listForMiddleCheck, ms) {
    return new Promise (resolve => {
        showMiddleWay(listForMiddleCheck);
        setTimeout(() => {resolve('')}, ms);
    })
}

async function showWay(listForMiddleCheck) {
    await waitFormeNew(listForMiddleCheck, 50);
    for (let i = way - 1; i >= 1; i--) {
        if (animCheck) {
            if (n > 40) {
                await waitForme(350);
            }
            else {
                await waitForme(200);
            }
        }
        //alert(answer[i] - 1);
        document.getElementById(answer[i]).src = "imges\\лабиринт\\check.png";
    }
}


async function showMiddleWay(listForMiddleCheck) {
    for (i = 0; i < listForMiddleCheck.length; i++) {
        console.log(listForMiddleCheck[i]);
        if (animCheck) {
            if (n > 40) {
                await waitForme(10);
            }
            else {
                await waitForme(25);
            }
        }
        document.getElementById(listForMiddleCheck[i]).src = "imges\\лабиринт\\middleCheck.png";
    }
    checkForCheck = true;

}

function clickFindWay () {
    if (iCoordsOfStrt != -1 && jCoordsOfFinish != -1) {
        clickClearWay();
        findWay();
    }
    else {
        alert("вы немного забыли точки начала и конца маршрута");
    }
}

function findWay () {
    //alert(111);
    let amount = 0, start = iCoordsOfStrt * n + jCoordsOfStrt, end = iCoordsOfFinish * n + jCoordsOfFinish;
    //alert(end);
    let matrix = [n * n];
    for (let i = 0; i < n * n; i++){
        matrix[i] = [5];
    }
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (matrixOfLabirint[i][j] < 0){
                if (i > 0 && matrixOfLabirint[i - 1][j] < 0){
                    matrix[i * n + j][amount++] = (i - 1) * n + j;
                }
                if (j > 0 && matrixOfLabirint[i][j - 1] < 0){
                    matrix[i * n + j][amount++] = (i) * n + j - 1;
                }
                if (i + 1 < n && matrixOfLabirint[i + 1][j] < 0){
                    matrix[i * n + j][amount++] = (i + 1) * n + j;
                }
                if (j + 1 < n && matrixOfLabirint[i][j + 1] < 0){
                    matrix[i * n + j][amount++] = (i) * n + j + 1;
                }
                matrix[i * n + j][4] = amount;
                amount = 0;
            }
            else{
                matrix[i * n + j][4] = amount;
            }
        }
    }
    //alert(matrix[n*n - 1][0]);
    work(matrix, n * n, start, end);
}

function clickClearWay() {
    if (found) {
        for (let k = 0; k < listForMiddleCheck.length; k++) {
            let id = listForMiddleCheck[k];
            let j = id % n;
            let i = (id / n) - (id / n) % 1;
            if (matrixOfLabirint[i][j] == -1) {
                document.getElementById(id).src = "imges\\лабиринт\\trk.png";
            }
        }
        for (let k = 1; k < way; k++) {
            let id = answer[k];
            let j = id % n;
            let i = (id / n) - (id / n) % 1;
            if (matrixOfLabirint[i][j] == -1 && ((iCoordsOfStrt != i || jCoordsOfStrt != j) && (iCoordsOfFinish != i || jCoordsOfFinish!=j))) {
                document.getElementById(id).src = "imges\\лабиринт\\trk.png";
            }
        }
        
    }
    found = false;
}

function clickClearMtrx() {
    iCoordsOfStrt = -1;
    jCoordsOfStrt = -1;
    iCoordsOfFinish = -1;
    jCoordsOfFinish = -1;
    found = false;
    for (let i = 0; i < maxSize; i++) {
        for (let j = 0; j < maxSize; j++) {
            matrixOfLabirint[i][j] = -1;
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i * n + j).src = "imges\\лабиринт\\trk.png";
        }
    }
}
// && iCoordsOfStrt != i && jCoordsOfStrt != j && iCoordsOfFinish != i && jCoordsOfFinish!=j i * n + j

function generateNewLabirint() {
    clickClearMtrx();
    for (let i = 0; i < n; i++) { // заполнение деревьями
        for (let j = 0; j < n; j++) {
            matrixOfLabirint[i][j] = 15;
            if (i - 1 < 0) {
                matrixOfLabirint[i][j] -= 2;
            }
            if (i + 1 >= n) {
                matrixOfLabirint[i][j] -= 8;
            }
            if (j - 1 < 0) {
                matrixOfLabirint[i][j] -= 1;
            }
            if (j + 1 >= n) {
                matrixOfLabirint[i][j] -= 4;
            }
            document.getElementById(i * n + j).src = "imges\\лабиринт\\" + matrixOfLabirint[i][j] + ".png";
        }
    }
    // / 2) * 2 + 1
    //let i = Math.floor((Math.random()*(n - 2))+ 1);
    //let j = Math.floor((Math.random()*(n - 2))+ 1);
    //let i = Math.floor(n / 2);
    //let j = Math.floor(n / 2);
    let i = 1;
    let j = 1;
    setRo (i, j);
    let listForCheck = [2];
    listForCheck[0] = [];
    listForCheck[1] = [];
    if (j - 2 >= 0) {
        listForCheck[0].push(i);
        listForCheck[1].push(j - 2);
        setRo(i, j - 2);
    }
    if (j + 2 < n) {
        listForCheck[0].push(i);
        listForCheck[1].push(j + 2);
        setRo(i, j + 2);
    }
    if (i - 2 >= 0) {
        listForCheck[0].push(i - 2);
        listForCheck[1].push(j);
        setRo(i - 2, j);
    }
    if (i + 2 < n) {
        listForCheck[0].push(i + 2);
        listForCheck[1].push(j);
        setRo(i + 2, j);
    }
    loopForGer(listForCheck);
}

async function loopForGer(listForCheck) {
    while (listForCheck[0].length > 0) {
        if (animCheck) {
            await waitForme(20);
        }
        //Math.floor((Math.random()*(n / 2)) * 2 + 1);
        let ind = 0;
        /*
        if (listForCheck[0].length > 1) {
            ind = 1;
        }
        else {
            //ind = 0;
            setRo(listForCheck[0][ind] - 1, listForCheck[1][ind]);
            setRo(listForCheck[0][ind] + 1, listForCheck[1][ind]);
            setRo(listForCheck[0][ind], listForCheck[1][ind] - 1);
            setRo(listForCheck[0][ind], listForCheck[1][ind] + 1);
            break;
        }
        */
        //let ind = Math.floor(Math.random()*(2));
        i = listForCheck[0][ind];
        j = listForCheck[1][ind];
        let newList = listForCheck[0].slice(0, ind).concat(listForCheck[0].slice(ind + 1));
        //console.log(listForCheck[0]);
        //console.log(newList);
        listForCheck[0] = newList;
        //console.log(listForCheck[0]);
        newList = listForCheck[1].slice(0, ind).concat(listForCheck[1].slice(ind + 1));
        listForCheck[1] = newList;
        let dir = [1, 2, 3, 4];
        let ch = 4;
        while (dir.length > 0) {
            let dInd = Math.floor(Math.random()*(dir.length));
            if (dir[dInd] == 1) {
                if (j - 2 >= 0 && matrixOfLabirint[i][j - 2] == -1 && matrixOfLabirint[i][j - 1] >= 0) {
                    setRo(i, j - 1);
                    dir = [];
                    ch--;
                    //document.getElementById(i * n + j - 1).src = "imges\\лабиринт\\check.png";
                    
                }
                //ch = 0;
            }
            else if (dir[dInd] == 2) {
                if (j + 2 < n && matrixOfLabirint[i][j + 2] == -1 && matrixOfLabirint[i][j + 1] >= 0) {
                    setRo(i, j + 1);
                    dir = [];
                    ch--;
                    //document.getElementById(i * n + j + 1).src = "imges\\лабиринт\\check.png";
                }
                //ch = 0;
            }
            else if (dir[dInd] == 3) {
                if (i - 2 >= 0 && matrixOfLabirint[i - 2][j] == -1 && matrixOfLabirint[i - 1][j] >= 0) {
                    setRo(i - 1, j);
                    dir = [];
                    ch--;
                    //document.getElementById((i - 1) * n + j).src = "imges\\лабиринт\\check.png";
                }
                //ch = 0;
            }
            else if (dir[dInd] == 4) {
                if (i + 2 < n && matrixOfLabirint[i + 2][j] == -1 && matrixOfLabirint[i + 1][j] >= 0) {
                    setRo(i + 1, j);
                    dir = [];
                    ch--;
                    //document.getElementById((i + 1) * n + j).src = "imges\\лабиринт\\check.png";
                }
                //ch = 0;
            }
            if (ch > 0) {
                //alert("!!!")
                let newList = dir.slice(0, dInd).concat(dir.slice(dInd + 1));
                dir = newList;
            }
            else {
                break;
            }
        }
        if (j - 2 >= 0 && matrixOfLabirint[i][j - 2] >= 0) {
            listForCheck[0].push(i);
            listForCheck[1].push(j - 2);
            setRo(i, j - 2);
            //document.getElementById(i * n + j - 2).src = "imges\\лабиринт\\check.png";

        }
        if (i + 2 < n && matrixOfLabirint[i + 2][j] >= 0) {
            listForCheck[0].push(i + 2);
            listForCheck[1].push(j);
            setRo(i + 2, j);
            //document.getElementById((i + 2) * n + j).src = "imges\\лабиринт\\check.png";
        }
        if (j + 2 < n && matrixOfLabirint[i][j + 2] >= 0) {
            listForCheck[0].push(i);
            listForCheck[1].push(j + 2);
            setRo(i, j + 2);
            //document.getElementById(i * n + j + 2).src = "imges\\лабиринт\\check.png";
        }
        if (i - 2 >= 0 && matrixOfLabirint[i - 2][j] >= 0) {
            listForCheck[0].push(i - 2);
            listForCheck[1].push(j);
            setRo(i - 2, j);
            //document.getElementById((i - 2) * n + j).src = "imges\\лабиринт\\check.png";
        }
    }
}