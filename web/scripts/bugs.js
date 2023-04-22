var plt = document.getElementById("plt");
var ctx = plt.getContext("2d");
var nt = document.getElementById("source");

var listOfPoints = [2];
listOfPoints[0] = [];
listOfPoints[1] = [];
var numOfPoints = 0;
//var PthFind = false;

//alert("0" == 0);
//alert(0 == "0");

plt.addEventListener("click", function(e) {
    ctx.lineWidth = 1;
    let rect = plt.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    listOfPoints[0][numOfPoints] = x;
    listOfPoints[1][numOfPoints] = y;
    numOfPoints++;
    clearPlt();
});

function deletePoint() {
    if (numOfPoints > 0) {
        numOfPoints--;
        clearPlt();
    }
}

function clearPlt () {
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, plt.width, plt.height);
    for (let i = 0; i < numOfPoints; i++) {
        let x = listOfPoints[0][i];
        let y = listOfPoints[1][i];
        ctx.strokeStyle = "#66FF66";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
        ctx.fillStyle = "#5A4628";
        ctx.fill();
        for (let j = 0; j < numOfPoints - 1; j++) {
            if (i != j) {
                ctx.strokeStyle = "#b5b5b5";
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(listOfPoints[0][j], listOfPoints[1][j]);
                ctx.stroke();
            }
        }
    }
    for (let i = 0; i < numOfPoints; i++) {
        let x = listOfPoints[0][i];
        let y = listOfPoints[1][i];
        ctx.strokeStyle = "#000000";
        let angle = Math.random() * 5 + 1;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        //ctx.translate(- x - nt.width, - y - nt.height);
        ctx.drawImage(nt, -nt.width/2, -nt.height/2);
        ctx.restore();
    }
}

function waitForme(ms) {
    return new Promise (resolve => {
        setTimeout(() => {resolve('')}, ms);
    })
}

function drwLine(x1, y1, x2, y2) {
    //console.log(x1);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

async function loop(pth) {
    for (let i = 0; i < pth.length - 1; i++) {
        await waitForme(200);
        ctx.strokeStyle = "#000000";
        drwLine(listOfPoints[0][pth[i]], listOfPoints[1][pth[i]], listOfPoints[0][pth[i + 1]], listOfPoints[1][pth[i + 1]]);
    }
}

//alert(window.innerHeight);

function clclt() {
    clearPlt();
    var mtrxOfPoints = [numOfPoints];
    for (let i = 0; i < numOfPoints; i++) {
        mtrxOfPoints[i] = [numOfPoints];
        for (let j = 0; j < numOfPoints; j++) {
            mtrxOfPoints[i][j] = 0;
        }
    }
    for (let i = 0; i < numOfPoints - 1; i++) {
        for (let j = i + 1; j < numOfPoints; j++) {
            let dist = Math.sqrt((listOfPoints[0][j] - listOfPoints[0][i])**2 + (listOfPoints[1][j] - listOfPoints[1][i])**2);
            mtrxOfPoints[i][j] = dist;
            mtrxOfPoints[j][i] = dist;
        }
    }
    /*
    for (let i = 0; i < numOfPoints; i++) {
        for (let j = 0; j < numOfPoints; j++) {
            alert(mtrxOfPoints[i][j]);
        }
    }
    */
    const numOfBugs = 1000;
    const iterLim = 100;
    const alpha = 1;
    const beta = 1;
    const evRate = 0.6;
    const inPheromone = 0.1;

    let ants = [];
    let pheromone = [];
    for (let i = 0; i < numOfBugs; i++) {
        ants.push ({
            path : [],
            visited : [],
            totalDist : 0
        })
    }
    for (let i = 0; i < numOfPoints; i++) {
        pheromone[i] = [];
        for (let j = 0; j < numOfPoints; j++) {
            pheromone[i][j] = inPheromone;
        }
    }

    for (let iter = 0; iter < iterLim; iter++) {
        for (let i = 0; i < numOfBugs; i++) {
            const ant = ants[i];
            ant.visited = [numOfPoints];
            for (let j = 0; j < numOfPoints; j++) {
                ant.visited[j] = false;
            }
            ant.path = [Math.floor(Math.random()*numOfPoints)];
            ant.visited[ant.path[0]] = true;
            ant.totalDist = 0;
            for (let j = 1; j < numOfPoints; j++) {
                const curPoint = ant.path[j - 1];
                const prob = [];
                let denom = 0;
                for (let k = 0; k < numOfPoints; k++) {
                    if (!ant.visited[k]) {
                        const numer = Math.pow (pheromone[curPoint][k], alpha) * Math.pow(1/mtrxOfPoints[curPoint][k],beta);
                        denom += numer;
                        prob[k] = numer;
                    }
                }
                let cumulProb = 0;
                let selectInd = -1;
                const randomValue = Math.random()*denom;
                for (let k = 0; k < numOfPoints; k++) {
                    if (!ant.visited[k]) {
                        cumulProb += prob[k];
                        if (cumulProb >= randomValue) {
                            selectInd = k;
                            break;
                        }
                    }
                }
                ant.path.push(selectInd);
                ant.visited[selectInd] = true;
                ant.totalDist += mtrxOfPoints[curPoint][selectInd];
            }
        }
        for (let i = 0; i < numOfPoints; i++) {
            for (let j = 0; j < numOfPoints; j++) {
                pheromone[i][j] = pheromone[i][j] * (1 - evRate);
            }
        }
        let antBestInd = 0;
        let bestDist = ants[0].totalDist;
        for (let i = 1; i < numOfBugs; i++) {
            if (ants[i].totalDist < bestDist) {
                antBestInd = i;
                bestDist = ants[i].totalDist;
            }
        }
        const antBest = ants[antBestInd];
        for (let i = 1; i < numOfPoints; i++) {
            const fromPoint = antBest.path[i - 1];
            const toPoint = antBest.path[i];
            pheromone[fromPoint][toPoint] += inPheromone/bestDist;
            pheromone[toPoint][fromPoint] += inPheromone/bestDist;
        }
        //alert(iter);
        if (iter == iterLim - 1) {
            ctx.lineWidth = 3;
            loop(antBest.path);
        }
    }

    /*
    ctx.lineWidth = 3;
    for (let i = 0; i < paths[bestInd].length - 1; i++) {
        //alert(antBest.path[i]);
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(listOfPoints[0][paths[bestInd][i]], listOfPoints[1][paths[bestInd][i]]);
        ctx.lineTo(listOfPoints[0][paths[bestInd][i + 1]], listOfPoints[1][paths[bestInd][i + 1]]);
        ctx.stroke();

    }
    */
    //alert("*" + 1);
}


//const intervalID = setTimeout(drwLine, 1000, "Parameter 1", "Parameter 2", "Parameter 3", "Parameter 4");