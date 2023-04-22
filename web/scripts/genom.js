var plt = document.getElementById("plt");
var ctx = plt.getContext("2d");

var listOfPoints = [2];
listOfPoints[0] = [];
listOfPoints[1] = [];
var numOfPoints = 0;

plt.addEventListener("click", function(e) {
    ctx.lineWidth = 1;
    let rect = plt.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    listOfPoints[0][numOfPoints] = x;
    listOfPoints[1][numOfPoints] = y;
    numOfPoints++;
    //alert(x);
    //alert(y);
    clearPlt ();
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
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
        ctx.fillStyle = "#000000";
        ctx.fill();
    }
}

function selection (pop, mtrxOfPoints) {
    let fitV = [];
    for (let i = 0; i < pop.length; i++) {
        fitV.push(1 / findLen(pop[i], mtrxOfPoints));
    }
    let totalFit = fitV.reduce((a, b) => a + b, 0);
    let selectProbs = fitV.map(f => f/totalFit);
    let cumulProbs = [];
    let cumulProb = 0;
    for (let i = 0; i < selectProbs.length; i++) {
        cumulProb += selectProbs[i];
        cumulProbs.push(cumulProb);
    }
    let r = Math.random();
    let indSelect = cumulProbs.findIndex(p => p >= r);
    return pop[indSelect];
}

function findLen (individ, mtrxOfPoints) {
    let len = 0;
    for (let i = 0; i < individ.length - 1; i++) {
        len += mtrxOfPoints[individ[i]][individ[i + 1]]
    }
    len += mtrxOfPoints[individ[individ.length - 1]][individ[0]];
    return len;
}

function cross (indOne, indTwo) {
    let child = [];
    let strtP = Math.floor(Math.random()*indOne.length);
    let finP = strtP + Math.floor(Math.random()*(indOne.length - strtP));
    for (let i = strtP; i < finP; i++) {
        child.push(indOne[i]);
    }
    for (let i = 0; i < indTwo.length; i++) {
        if (!child.includes(indTwo[i])) {
            child.push(indTwo[i]);
        }
    }
    return child;
}

function mutate(individ, mutRate) {
    for (let i = 0; i < individ.length; i++) {
        if (Math.random() < mutRate) {
            let j = Math.floor(Math.random() * individ.length);
            let temp = individ[i];
            individ[i] = individ[j];
            individ[j] = temp;
        }
    }
    return individ;
}

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
    //console.log(numOfPoints);
    /*
    for (let i = 0; i < numOfPoints; i++) {
        console.log(mtrxOfPoints[i]);
    }
    console.log(numOfPoints);
    */
    let listOfId = [numOfPoints];
    for (let i = 0; i < numOfPoints; i++) {
        listOfId[i] = i;
    }

    let popSize = numOfPoints * 2;
    let mutRate = 0.1;
    let mxGen = 10000;

    let pop = [];
    for (let i = 0; i < popSize; i++) {
        let individ = [];
        for (let j = 0; j < numOfPoints; j++) {
            individ.push(listOfId[j]);
        }
        individ.sort(() => Math.random() - 0.5);
        pop.push(individ);
    }

    let gen = 0;
    while (gen < mxGen) {
        let newPop = [];
        for (let i = 0; i < popSize; i++) {
            let parentOne = selection(pop, mtrxOfPoints);
            let parentTwo = selection(pop, mtrxOfPoints);
            let child = cross(parentOne, parentTwo);
            child = mutate(child, mutRate);
            newPop.push(child);
        }
        pop = newPop;
        gen++;
    }
    let result = selection(pop, mtrxOfPoints);
    console.log(result);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    for (let i = 0; i < result.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(listOfPoints[0][result[i]], listOfPoints[1][result[i]]);
        ctx.lineTo(listOfPoints[0][result[i + 1]], listOfPoints[1][result[i + 1]]);
        ctx.stroke();
    }
}