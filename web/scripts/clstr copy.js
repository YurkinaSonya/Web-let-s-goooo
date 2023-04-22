var box = document.getElementById("back");
var size = 100;
var output = document.getElementById("demo");
//var slider = document.getElementById("rangeN");
//var sliderRndm = document.getElementById("rangeRndm");
//var mxSlide = document.getElementById("num");
//var slideVl = document.getElementById("slide");
var clrBox = document.getElementById("colorForPoint");
var numOfC = document.getElementById("numOfC");
var numOfP = document.getElementById("numOfP");
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


function fillDiv() {
    for (let k = 0; k < size * size; k++) {
        var circle = document.createElement('span');
        circle.classList.add('dot');
        circle.id = k;
        let j = k % size;
        let i = (k / size) - (k / size) % 1;
        circle.addEventListener ('click', function() {
            /*
            if (numOfPoints == 0) {
                slider.min = 1;
                n = 1;
            }
            */
            //alert(k);
            if (matrix[i][j] == 0) {
                document.getElementById(i * size + j).style.backgroundColor = 'white';
                listOfPoints[0][numOfPoints] = j;
                listOfPoints[1][numOfPoints] = i;
                numOfPoints++;
                matrix[i][j] = numOfPoints;
                numOfC.max++;
            }
            else {
                document.getElementById(i * size + j).style.backgroundColor = "rgb(8, 9, 31)";
                for (let ind = matrix[i][j] - 1; ind < numOfPoints - 1; ind++) {
                    listOfPoints[0][ind] = listOfPoints[0][ind + 1];
                    listOfPoints[1][ind] = listOfPoints[1][ind + 1];
                }
                matrix[i][j] = 0;
                numOfPoints--;
                numOfC.max--;
            }
            //console.log(listOfPoints[0]);
            //alert(listOfPoints[0].length);
            //mxSlide.innerHTML = numOfPoints;
            //slider.max = numOfPoints;
        })
        circle.addEventListener('mouseover', function() {
            //output.innerHTML = matrix[i][j];
            if (clastered) {
                if (matrix[i][j] != 0) {
                    clrBox.style.backgroundColor = document.getElementById(k).style.backgroundColor;
                    output.innerHTML = listOfPoints[2][matrix[i][j] - 1];
                }
                else {
                    clrBox.style.backgroundColor = 'black';
                    output.innerHTML = "";
                }
            }
            else {
                clrBox.style.backgroundColor = 'black';
                if (matrix[i][j] != 0) {
                    output.innerHTML = "пока ни к какому";
                }
                else {
                    output.innerHTML = "";
                }
            }
        })
        box.appendChild(circle);

    }
}

function rndm() {
    clickClearMtrx();
    console.log(rndmV);
    if (rndmV <= numOfP.max) {
        let ind = 0;
        let listOfRndmPoints = [rndmV];
        for (let p = 0; p < rndmV; p++) {
            let rndmPoint = Math.floor(Math.random()*(size*size));
            if (!listOfRndmPoints.includes(rndmPoint)) {
                listOfRndmPoints[ind] = rndmPoint;
                ind++;
                let j = rndmPoint % size;
                let i = (rndmPoint / size) - (rndmPoint / size) % 1;
                document.getElementById(i * size + j).style.backgroundColor = 'white';
                listOfPoints[0][numOfPoints] = j;
                listOfPoints[1][numOfPoints] = i;
                numOfPoints++;
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
            document.getElementById(i * size + j).style.backgroundColor = "rgb(8, 9, 31)";
        }
    }
    listOfPoints = [3];
    listOfPoints[0] = [];
    listOfPoints[1] = [];
    listOfPoints[2] = [];
    numOfPoints = 0;
    //mxSlide.innerHTML = numOfPoints;
    //slider.max = numOfPoints;
    //slider.min = numOfPoints;
    //n = 0;
    clastered = false;
}

/*
slider.oninput = function() {
    n = this.value;
    slideVl.innerHTML = n;
}

sliderRndm.oninput = function() {
    rndmV = this.value;
}
*/

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
    for (let i = 0; i < value; i++){
        //alert("Claster " +  i)
        let color = takeRndmColor();
        for (let j = 0; j < numOfPoints; j++){
            if(clasterList[j][2] == i){
                listOfPoints[2][j] = i;
                document.getElementById(listOfPoints[1][j] * size + listOfPoints[0][j]).style.backgroundColor = color;
                //alert(j + 1);
            }
        }
    }

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
            let listOfPointsOld = [numOfPoints];
            for (let i = 0; i < numOfPoints; i++) {
                listOfPointsOld[i] = [listOfPoints[0][i], listOfPoints[1][i]];
            }
            clastered = true;
            let listOfPointsNew = clUster(listOfPointsOld, n);
            for (let i = 0; i < numOfPoints; i++){
                if (listOfPointsNew[i][numOfPoints] != 0) {
                    //alert("Claster");
                    let color = takeRndmColor();
                    for (let j = 0; j < listOfPointsNew[i][numOfPoints]; j++){
                        //alert(listOfPointsNew[i][j].index + 1);
                        //listOfPoints[2][j] = i;
                        let ind = listOfPointsNew[i][j].index;
                        document.getElementById(listOfPointsOld[ind][1] * size + listOfPointsOld[ind][0]).style.backgroundColor = color;
                        //listOfPoints[]
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

fillDiv();