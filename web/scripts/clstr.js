var size = 700;
var output = document.getElementById("demo");
var clrBox = document.getElementById("colorForPoint");
var numOfC = document.getElementById("numOfC");
var numOfP = document.getElementById("numOfP");
var plt = document.getElementById("plt");
var ctx = plt.getContext("2d");

var KColor = document.getElementById("KColor");
var KLines = document.getElementById("KLines");

var HColor = document.getElementById("HColor");
var HLines = document.getElementById("HLines");

var TColor = document.getElementById("TColor");
var TLines = document.getElementById("TLines");

var n = 0;
var rndmV = 1;
var clastered = false;

let matrix = [size];
for (let i = 0; i < size; i++) {
    matrix[i] = [size];
    for (let j = 0; j < size; j++) {
        matrix[i][j] = 0;
    }
}

var listOfPoints = [3];
listOfPoints[0] = [];
listOfPoints[1] = [];
listOfPoints[2] = [];
listOfPoints[3] = [];
var numOfPoints = 0;

var KC = 1;
var KL = 1;
var HC = 1;
var HL = 1;
var TC = 1;
var TL = 1;


KColor.addEventListener('change', () => {
    KC = !KC;
});

HColor.addEventListener('change', () => {
    HC = !HC;
});

KLines.addEventListener('change', () => {
    KL = !KL;
});

HLines.addEventListener('change', () => {
    HL = !HL;
});

TColor.addEventListener('change', () => {
    TC = !TC;
});

TLines.addEventListener('change', () => {
    TL = !TL;
});

plt.addEventListener("click", function(e) {
    ctx.lineWidth = 1;
    let rect = plt.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    if (matrix[x][y] == 0) {
        listOfPoints[0][numOfPoints] = x;
        listOfPoints[1][numOfPoints] = y;
        numOfPoints++;
        clearPlt();
        matrix[x][y] = numOfPoints;
        numOfC.max++;
    }
});

function clearPlt () {
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, plt.width, plt.height);
    for (let i = 0; i < numOfPoints; i++) {
        let x = listOfPoints[0][i];
        let y = listOfPoints[1][i];
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        let r = Math.floor(Math.random()*3 + 2);
        ctx.arc(x, y, r, 0, 2 * Math.PI, true);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    }
}
/*
plt.addEventListener("mouseover", function(e) {
    let rect = plt.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let pixel = ctx.getImageData(x, y, 1, 1);
    let data = pixel.data;
    rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    if (clastered) {
        if (matrix[x][y] != 0) {
            clrBox.style.backgroundColor = rgba;
            output.innerHTML = listOfPoints[2][matrix[i][j] - 1];
        }
        else {
            clrBox.style.backgroundColor = 'black';
            output.innerHTML = "";
        }
    }
    else {
        clrBox.style.backgroundColor = rgba;
        //clrBox.style.backgroundColor = 'black';
        if (matrix[x][y] != 0) {
            output.innerHTML = "пока ни к какому";
        }
        else {
            output.innerHTML = "";
        }
    }
});
*/

function rndm() {
    clickClearMtrx();
    //console.log(rndmV);
    if (rndmV <= 2000) {
        let ind = 0;
        let listOfRndmPoints = [rndmV];
        for (let p = 0; p < rndmV; p++) {
            let rndmPoint = Math.floor(Math.random()*(size*size));
            if (!listOfRndmPoints.includes(rndmPoint)) {
                listOfRndmPoints[ind] = rndmPoint;
                ind++;
                let j = rndmPoint % size;
                let i = (rndmPoint / size) - (rndmPoint / size) % 1;
                listOfPoints[0][numOfPoints] = j;
                listOfPoints[1][numOfPoints] = i;
                numOfPoints++;
                clearPlt();
                matrix[i][j] = numOfPoints;
            }
            else {
                p--;
            }
        }
    }
    else {
        alert("слишком много рандомных точек(");
    }
    //mxSlide.innerHTML = numOfPoints;
    //slider.max = numOfPoints;
    //for (let i = 0; i < rndmV)
}

function clickClearMtrx() {
    //slideVl.innerHTML = 0;
    for (let i = 0; i < size; i++) {
        matrix[i] = [size];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }
    listOfPoints = [3];
    listOfPoints[0] = [];
    listOfPoints[1] = [];
    listOfPoints[2] = [];
    numOfPoints = 0;
    ctx.clearRect(0, 0, plt.width, plt.height);
    //mxSlide.innerHTML = numOfPoints;
    //slider.max = numOfPoints;
    //slider.min = numOfPoints;
    //n = 0;
    clastered = false;
}

numOfC.oninput = function () {
    n = this.value;
}

numOfP.oninput = function () {
    rndmV = this.value;
    numOfC.max = rndmV;
}

var numOfColors = 18;

listOfColors = ["FF9999", "FF9933", "FFFF99", "E5FFCC", "99FF99", "33FF99", "99FFFF", "3399FF", "9999FF", "9933FF", "FF99FF", "FF3399", "E0E0E0", "FF0000", "FFFF00", "00FFFF", "0000FF", "FF00FF"];

var indOfColor = 0;

function takeRndmColor() {
    //return "#" + Math.floor(Math.random()*(16777215 - 16777215/4) + 16777215/4).toString(16);
    indOfColor += Math.floor(Math.random()*4 + 1);
    //indOfColor += 1;
    return "#" + listOfColors[indOfColor % numOfColors];
}

function lenght(x, y, z, w){       
    return (((x - z) ** 2) + ((y - w) ** 2)) ** 0.5;
}

function clastering(value){
    for (let j = 0; j < numOfPoints; j++) {
        listOfPoints[2][j] = -1;
    }
    //alert(numOfPoints);
    let stop = 0, claster = [value], clasterMass = [value], clasterList = [numOfPoints];
    for (let j = 0; j < value; j++){
        claster[j] = [3];
        clasterMass[j] = [2];
        claster[j][0] = 0;
        claster[j][1] = 0;
        claster[j][2] = 0;
    }
    for (let j = 0; j < numOfPoints; j++){
    clasterList[j] = [3];
    }
    for (let i = 0; i < numOfPoints; i++){
        //alert(listOfPoints[][numOfPoints]);
        clasterList[i][0] = listOfPoints[0][i];
        clasterList[i][1] = listOfPoints[1][i];
    }
    for (let i = 0; i < value; i++){
        clasterMass[i][0] = clasterList[i * (numOfPoints / value - numOfPoints / value % 1)][0];
        clasterMass[i][1] = clasterList[i * (numOfPoints / value - numOfPoints / value % 1)][1];
    }
    while (stop < 5){
        for (let i = 0; i < numOfPoints; i++){
            let len = lenght(clasterList[i][0], clasterList[i][1], clasterMass[0][0], clasterMass[0][1]);
            clasterList[i][2] = 0;
            for (let j = 1; j < value; j++){
                let lin = lenght(clasterList[i][0], clasterList[i][1], clasterMass[j][0], clasterMass[j][1]);
                //alert(len - lin);
                if (len > lin){
                    len = lin;
                    clasterList[i][2] = j;
                    //alert(i + 1);
                    //alert(j + 1);
                }
            }
        }
        for (let i = 0; i < numOfPoints; i++){
            claster[clasterList[i][2]][0] += clasterList[i][0];
            claster[clasterList[i][2]][1] += clasterList[i][1];
            claster[clasterList[i][2]][2] += 1; 
        }
        for (let i = 0; i < value; i++){
            /*alert(i + 1);
            alert(claster[i][0]);
            alert(claster[i][1]);*/
            clasterMass[i][0] = claster[i][0] / claster[i][2];
            clasterMass[i][1] = claster[i][1] / claster[i][2];
            //alert(clasterMass[i][0]);
            //alert(clasterMass[i][1]);
            claster[i][0] = 0;
            claster[i][1] = 0;
            claster[i][2] = 0;
        }
        stop += 1;
    }
    return clasterList;
    /*
    //ctx.clearRect(0, 0, plt.width, plt.height);
    for (let i = 0; i < value; i++) {
        let listForClstr = [2];
        listForClstr[0] = [];
        listForClstr[1] = [];
        let ind = 0;
        for (let j = 0; j < numOfPoints; j++) {
            if(clasterList[j][2] == i) {
                listForClstr[0][ind] = listOfPoints[0][j];
                listForClstr[1][ind] = listOfPoints[1][j];
                ind++;
            }
        }
        //ctx.strokeStyle = "#5799A9";
        if (KL) {
            ctx.strokeStyle = "#185264";
            for (let j = 0; j < ind - 1; j++) {
                for (let jj = j + 1; jj < ind; jj++) {
                    ctx.beginPath();
                    ctx.moveTo(listForClstr[0][j], listForClstr[1][j]);
                    ctx.lineTo(listForClstr[0][jj], listForClstr[1][jj]);
                    ctx.stroke();
                }
            }
        }
    }
    for (let i = 0; i < value; i++){
        //alert("Claster " +  i)
        let color = takeRndmColor();
        for (let j = 0; j < numOfPoints; j++){
            if(clasterList[j][2] == i){
                listOfPoints[2][j] = i;
                if (KC) {
                    let x = listOfPoints[0][j];
                    let y = listOfPoints[1][j];
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.beginPath();
                    let r = Math.floor(Math.random()*2 + 2);
                    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }
        }
    }
    */
}

function prio(x, y, z, w){       
    return (((x  - y ) ** 2) + ((z - w ) ** 2)) ** 0.5;
}

function clUster(data, value) {
    let clusters = [data.length], flag = data.length, visit = [data.length], mass = [data.length];
    for (let i = 0; i < data.length; i++) {
        let dummy = {index: i, x: data[i][0], y: data[i][1]};
        visit[i] = true;
        mass[i] = [2];
        mass[i][0] = data[i][0];
        mass[i][1] = data[i][1];
        clusters[i] = [data.length + 1];
        clusters[i][0] = dummy;
        clusters[i][data.length] = 1;
    }
    while (flag - value > 0) {
        let closest = findClosest(clusters, mass);
        clusters = removeClusters(clusters, closest);
        mass = removeMass(clusters, closest[0], mass)
        flag--;
    }

    return clusters;
}

function distance(a, b, mass) {
    return prio(mass[a][0], mass[b][0], mass[a][1], mass[b][1]);
}

function findClosest(clusters, mass) {
    let minDist = Infinity, closest = [2];
    for (let i = 0; i < clusters.length; i++) {
        if (clusters[i][clusters.length] != 0){
            for (let j = i + 1; j < clusters.length; j++) {
                if (clusters[j][clusters.length] != 0){
                    let dist = distance(i, j, mass);
                    if (dist < minDist) {
                        minDist = dist;
                        closest[0] = i;
                        closest[1] = j;
                    }
                }
            }
        }
    }
    return closest;
}

function removeClusters(clusters, toRemove) {
    let j = 0;
    for (let i = clusters[toRemove[0]][clusters.length]; i < clusters[toRemove[0]][clusters.length] + clusters[toRemove[1]][clusters.length]; i++) {
        clusters[toRemove[0]][i] = clusters[toRemove[1]][j++];
    }
    clusters[toRemove[0]][clusters.length] = clusters[toRemove[0]][clusters.length] + clusters[toRemove[1]][clusters.length];
    clusters[toRemove[1]][clusters.length] = 0;
    return clusters;
}  

function removeMass(clusters, Number, mass) {
    mass[Number][0] = 0;
    mass[Number][1] = 0; 
    for (let i = 0; i < clusters[Number][clusters.length]; i++) {
        mass[Number][0] += clusters[Number][i].x;
        mass[Number][1] += clusters[Number][i].y;
    }
    mass[Number][0] /= clusters[Number][clusters.length];
    mass[Number][1] /= clusters[Number][clusters.length]; 
    return mass;
}

function clstr () {
    clastered = false;
    if (n > 0) {
        if (n <= numOfPoints) {
            ctx.clearRect(0, 0, plt.width, plt.height);
            clastered = true;
            clastering(n);
        }
        else {
            alert("количество кластеров превышает количество точек на поле");    
        }

    }
    else {
        alert("нельзя 0 кластеров");
    }
}

function clstrH () {
    clastered = false;
    if (n > 0) {
        if (n <= numOfPoints) {
            ctx.clearRect(0, 0, plt.width, plt.height);
            let listOfPointsOld = [numOfPoints];
            for (let i = 0; i < numOfPoints; i++) {
                listOfPointsOld[i] = [listOfPoints[0][i], listOfPoints[1][i]];
            }
            clastered = true;
            let listOfPointsNew = clUster(listOfPointsOld, n);
            //ctx.clearRect(0, 0, plt.width, plt.height);
            for (let i = 0; i < numOfPoints; i++){
                if (listOfPointsNew[i][numOfPoints] != 0) {
                    //alert("Claster");
                    let color = takeRndmColor();
                    let listForClstr = [2];
                    listForClstr[0] = [];
                    listForClstr[1] = [];
                    let indClstr = 0;
                    for (let j = 0; j < listOfPointsNew[i][numOfPoints]; j++){
                        let ind = listOfPointsNew[i][j].index;
                        listForClstr[0][indClstr] = listOfPointsOld[ind][0];
                        listForClstr[1][indClstr] = listOfPointsOld[ind][1];
                        indClstr++;
                    }
                    ctx.strokeStyle = "#FFFFFF";
                    for (let j = 0; j < indClstr; j++) {
                        ctx.beginPath();
                        ctx.moveTo(listForClstr[0][j], listForClstr[1][j]);
                        ctx.lineTo(listForClstr[0][j + 1], listForClstr[1][j + 1]);
                        ctx.stroke();
                    }
                    for (let j = 0; j < indClstr; j++) {
                        let x = listForClstr[0][j];
                        let y = listForClstr[1][j];
                        ctx.strokeStyle = "#FFFFFF";
                        ctx.beginPath();
                        let r = Math.floor(Math.random()*2 + 2);
                        ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                        ctx.fillStyle = color;
                        ctx.fill();
                    }

                }
            }
        }
        else {
            alert("количество кластеров превышает количество точек на поле");    
        }
    }
    else {
        alert("нельзя 0 кластеров");
    }
}

function megaClstr () {
    clastered = false;
    if (n > 0) {
        if (n <= numOfPoints) {
            ctx.clearRect(0, 0, plt.width, plt.height);
            let listOfPointsOld = [numOfPoints];
            for (let i = 0; i < numOfPoints; i++) {
                listOfPointsOld[i] = [listOfPoints[0][i], listOfPoints[1][i]];
            }
            clastered = true;
            let listOfPointsNew = clUster(listOfPointsOld, n);
            let clasterList = clastering(n);
            let indOfLineColor = 0;
            for (let i = 0; i < n; i++) {  //пучки K-means
                let listForClstr = [2];
                listForClstr[0] = [];
                listForClstr[1] = [];
                let ind = 0;
                for (let j = 0; j < numOfPoints; j++) {
                    if(clasterList[j][2] == i) {
                        listForClstr[0][ind] = listOfPoints[0][j];
                        listForClstr[1][ind] = listOfPoints[1][j];
                        ind++;
                    }
                }
                //ctx.strokeStyle = "#5799A9";
                ctx.setLineDash([5, 5]);
                let listOfLineColorsH = ["#063746", "#06463F", "#1B0646", "#46063B"];
                if (KL) {
                    ctx.strokeStyle = listOfLineColorsH[indOfLineColor % 4];
                    indOfLineColor++;
                    for (let j = 0; j < ind - 1; j++) {
                        for (let jj = j + 1; jj < ind; jj++) {
                            ctx.beginPath();
                            ctx.moveTo(listForClstr[0][j], listForClstr[1][j]);
                            ctx.lineTo(listForClstr[0][jj], listForClstr[1][jj]);
                            ctx.stroke();
                        }
                    }
                }
            }
            ctx.setLineDash([]);
            
            indOfLineColor = 0;
            for (let i = 0; i < numOfPoints; i++){
                if (listOfPointsNew[i][numOfPoints] != 0) {
                    let listForClstr = [2];
                    listForClstr[0] = [];
                    listForClstr[1] = [];
                    let indClstr = 0;
                    for (let j = 0; j < listOfPointsNew[i][numOfPoints]; j++){
                        let ind = listOfPointsNew[i][j].index;
                        listForClstr[0][indClstr] = listOfPointsOld[ind][0];
                        listForClstr[1][indClstr] = listOfPointsOld[ind][1];
                        indClstr++;
                    }
                    /*
                    for (let j = 0; j < indClstr - 1; j++) {
                        for (let jj = j + 1; jj < indClstr; jj++) {
                            ctx.beginPath();
                            ctx.moveTo(listForClstr[0][j], listForClstr[1][j]);
                            ctx.lineTo(listForClstr[0][jj], listForClstr[1][jj]);
                            ctx.stroke();
                        }
                    }
                    */
                   let numOfLines = 0;
                    if (numOfPoints <= 100) {
                        numOfLines = 3;
                    }
                    else if  (numOfPoints <= 300) {
                        numOfLines = 3;
                    }
                    else if  (numOfPoints <= 600) {
                        numOfLines = 4;
                    }
                    else if  (numOfPoints <= 900) {
                        numOfLines = 5;
                    }
                    else if  (numOfPoints <= 1200) {
                        numOfLines = 6;
                    }
                    else {
                        numOfLines = 7;
                    }
                    let listOfLineColorsH = ["#336775", "#43488E", "#7F438E", "#438E6B"]; //созвездия иерархический
                    //ctx.setLineDash([5, 5]);
                    if (HL) {
                        ctx.strokeStyle = listOfLineColorsH[indOfLineColor % 4];
                        indOfLineColor++;
                        for (let j = 0; j < indClstr - numOfLines; j++) {
                            for (let jj = j + 1; jj < j + numOfLines + 1; jj++) {
                                ctx.beginPath();
                                ctx.moveTo(listForClstr[0][j], listForClstr[1][j]);
                                ctx.lineTo(listForClstr[0][jj], listForClstr[1][jj]);
                                ctx.stroke();
                            }
                        }
                    }
                }
                //ctx.setLineDash([]);
            }
            let claster = [];
            for (let i = 0; i < numOfPoints; i++) {
                claster[i] = [2];
                claster[i][0] = listOfPoints[0][i];
                claster[i][1] = listOfPoints[1][i];
            }
            claster = clusterize(claster, n, numOfPoints);
            for (let i = 0; i < n; i++) { //Деревья Линия
                for(let j = 0; j < claster[i][numOfPoints]; j++){
                    //alert(claster[i][j] + 1);
                    let x = listOfPoints[0][claster[i][j]];
                    let y = listOfPoints[1][claster[i][j]];
                }
            }
            let pSize = 7;
            let pSizeP = 1;
            if (!KC && !HC) {
                pSize = 3;
                pSizeP = 4;
            }
            for (let i = 0; i < n; i++) { //Деревья
                let color = takeRndmColor();
                if (TC) {
                    let x = listOfPoints[0][claster[i][0]];
                    let y = listOfPoints[1][claster[i][0]];
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.beginPath();
                    let r = Math.floor(Math.random()*pSizeP + pSize);
                    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                    ctx.fillStyle = "#000000";
                    ctx.fill();
                    ctx.beginPath();
                    r = r - 1; 
                    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
                for(let j = 1; j < claster[i][numOfPoints]; j++){
                    //alert(claster[i][j] + 1);
                    ctx.setLineDash([5, 5]);
                    if (TL) { //Дерево прямые
                        ctx.strokeStyle = "#FFFFFF";
                        ctx.beginPath();
                        ctx.moveTo(listOfPoints[0][claster[i][j]], listOfPoints[1][claster[i][j]]);
                        ctx.lineTo(listOfPoints[0][claster[i][j - 1]], listOfPoints[1][claster[i][j - 1]]);
                        ctx.stroke();
                    }
                    ctx.setLineDash([]);
                    if (TC) { //Дерево точки
                        let x = listOfPoints[0][claster[i][j]];
                        let y = listOfPoints[1][claster[i][j]];
                        ctx.beginPath();
                        let r = Math.floor(Math.random()*pSizeP + pSize);
                        ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                        ctx.fillStyle = "#000000";
                        ctx.fill();
                        ctx.beginPath();
                        r = r - 1; 
                        ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                        ctx.fillStyle = color;
                        ctx.fill();
                    }
                }
            }
            for (let i = 0; i < numOfPoints; i++){
                if (listOfPointsNew[i][numOfPoints] != 0) {
                    //alert("Claster");
                    let color = takeRndmColor();
                    let listForClstr = [2];
                    listForClstr[0] = [];
                    listForClstr[1] = [];
                    let indClstr = 0;
                    for (let j = 0; j < listOfPointsNew[i][numOfPoints]; j++){
                        let ind = listOfPointsNew[i][j].index;
                        listForClstr[0][indClstr] = listOfPointsOld[ind][0];
                        listForClstr[1][indClstr] = listOfPointsOld[ind][1];
                        indClstr++;
                    }
                    if (HC) { //точки иерархический
                        for (let j = 0; j < indClstr; j++) {
                            let x = listForClstr[0][j];
                            let y = listForClstr[1][j];
                            ctx.strokeStyle = "#FFFFFF";
                            ctx.beginPath();
                            let r = Math.floor(Math.random()*1 + 5);
                            ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                            ctx.fillStyle = "#000000";
                            ctx.fill();
                            ctx.beginPath();
                            r = r - 1;
                            ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                            ctx.fillStyle = color;
                            ctx.fill();
                        }
                    }
                }
            }
            for (let i = 0; i < n; i++) { //точки k-means
                //alert("Claster " +  i)
                let color = takeRndmColor();
                for (let j = 0; j < numOfPoints; j++){
                    if(clasterList[j][2] == i){
                        listOfPoints[2][j] = i;
                        if (KC) {
                            let x = listOfPoints[0][j];
                            let y = listOfPoints[1][j];
                            ctx.strokeStyle = "#FFFFFF";
                            ctx.beginPath();
                            let r = Math.floor(Math.random()*1 + 3);
                            ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                            ctx.fillStyle = "#000000";
                            ctx.fill();
                            ctx.beginPath();
                            r = r - 1;
                            ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                            ctx.fillStyle = color;
                            ctx.fill();
                        }
                    }
                }
            }
        }
        else {
            alert("количество кластеров превышает количество точек на поле");    
        }
    }
    else {
        alert("нельзя 0 кластеров");
    }
}



function prioTree(x1, x2, y1, y2){       
    return (((x1 - x2) ** 2) + ((y1 - y2) ** 2)) ** 0.5;
}

// Функция для поиска минимального ребра
function findMinEdge(list, visited, number) {
    let min = Infinity, minIndex = [2];
    for (let i = 0; i < number; i++) {
        if (visited[i] != 0) {
            for (let j = 0; j < number; j++) {
                if (visited[j] == 0 &&  list[i][j] < min && i != j) {
                    min = list[i][j];
                    minIndex[0] = i;
                    minIndex[1] = j;
                }
            }
        }
    }
    return minIndex;
}

//Список рёбер
function listFill(list, data, number){
    for (let i = 0; i < number; i++){
        for (let j = 0; j <= i; j++){
            if (j < i){
                list[i][j] = prioTree(data[i][0], data[j][0], data[i][1], data[j][1]);
                list[j][i] = list[i][j];
            }
            else{
                list[i][j] = 0;
            }
        }
    }
}

// Функция для построения минимального покрывающего дерева
function primMST(data, number) {
    let visited = [number], list = [number], mst = [number];
    for (let i = 0; i < number; i++){
        visited[i] = false;
        list[i] = [number];
        mst[i] = [number];
        for (let j = 0; j < number; j++){
            mst[i][j] = 0;
        }
    }
    visited[0] = true;
    listFill(list, data, number);
    //alert(list[1][3]);
    for (let i = 0; i < number - 1; i++) {
        let minEdge = findMinEdge(list, visited, number);
        visited[minEdge[1]] = true;
        //alert(minEdge[0] + 1);
        //alert(minEdge[1] + 1);
        mst[minEdge[0]][minEdge[1]] = list[minEdge[0]][minEdge[1]];
        mst[minEdge[1]][minEdge[0]] = mst[minEdge[0]][minEdge[1]];

    }

    return mst;
}

// Функция для удаления наиболее длинного ребра из МПД
function removeLongestEdge(mst, number) {
    let longestEdge = [2], longestDistance = -Infinity;

    for (let u = 0; u < number; u++) {
        for (let v = 0; v < number; v++) {
            if (u != v && mst[u][v] != 0){
                let distance = mst[u][v];
                if (distance > longestDistance) {
                    longestDistance = distance;
                    longestEdge[0] = u;
                    longestEdge[1] = v;
                }
            }
        }
    }
    mst[longestEdge[0]][longestEdge[1]] = 0;
    mst[longestEdge[1]][longestEdge[0]] = mst[longestEdge[0]][longestEdge[1]];
}

function fragmentation(mst, clasters, number, value){
    let visited = [number], point, now = 0;
    for (let i = 0; i < number; i++){
        visited[i] = -1;
    }
    for (let k = 0; k < value; k++){
        now = 0;
        for (let j = 0; j < number; j++){
            if (visited[j] == -1){
                point = j;
                break;
            }
        }
        let step = 2, flag;
        clasters[k][now++] = point;
        clasters[k][number] = 1;
        visited[point] = 1;
        while (true) {
            flag = 0;
            for (let j = 0; j < number; j++) {
                if (visited[j] == step - 1) {
                    for (let i = 0; i < number; i++) {
                        if (mst[j][i] != 0 && visited[i] == -1){
                            visited[i] = step;
                            clasters[k][now++] = i;
                            clasters[k][number] += 1;
                            flag = 1;
                        }
                    }
                }
            }
            if (flag == 0) {
                break;
            }
            step += 1;
        }
        //alert("len");
        //alert(clasters[k][number]);
    }

}

// Функция для кластеризации при помощи МПД
function clusterize(data, value, number) {
    let mst = primMST(data, number), clusters = [value];
    for (let i = 1; i < value; i++) {
        removeLongestEdge(mst, number);
    }
    for (let i = 0; i < value; i++) {
        clusters[i] = [number + 1];
    }

    fragmentation(mst, clusters, number, value);
    return clusters;
}

function clstrTree () {
    clastered = false;
    if (n > 0) {
        if (n <= numOfPoints) {
            ctx.clearRect(0, 0, plt.width, plt.height);
            clastered = true;
            let claster = [];
            for (let i = 0; i < numOfPoints; i++) {
                claster[i] = [2];
                claster[i][0] = listOfPoints[0][i];
                claster[i][1] = listOfPoints[1][i];
            }
            claster = clusterize(claster, n, numOfPoints);
            for (let i = 0; i < n; i++) {
                let color = takeRndmColor();
                for(let j = 0; j < claster[i][numOfPoints]; j++){
                    //alert(claster[i][j] + 1);
                    let x = listOfPoints[0][claster[i][j]];
                    let y = listOfPoints[1][claster[i][j]];
                    ctx.beginPath();
                    let r = Math.floor(Math.random()*2 + 3);
                    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }
        }
        else {
            alert("количество кластеров превышает количество точек на поле");    
        }

    }
    else {
        alert("нельзя 0 кластеров");
    }
}