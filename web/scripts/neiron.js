var divForPnt = document.getElementById('divForPainting')
var size = 5;
var typeOfMouse = true;
var typeOfDrw = true;
let listOfPixels = [size*size];
for (let i = 0; i < size*size; i++) {
    listOfPixels[i] = 0;
}

function clearDiv() {
    //alert("clear");
    for (let i = 0; i < size*size; i++) {
        document.getElementById(i).style.backgroundColor = "#FFFFFF";
    }
    matrix = [size];
    for (let i = 0; i < size; i++) {
        matrix[i] = [size];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }
    listOfPixels = [size*size];

}

function clickDrw() {
    typeOfDrw = !(typeOfDrw);
    //alert(typeOfDrw);
}

var matrix = [size];
for (let i = 0; i < size; i++) {
    matrix[i] = [size];
    for (let j = 0; j < size; j++) {
        matrix[i][j] = 0;
    }
}
{
  var listOfVle = [ [1, 1, 1, 0, 1],
                    [0, 0, 1, 0, 0],
                    [1, 0, 1, 1, 1],
                    [1, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [1, 1, 0, 1, 0],
                    [1, 1, 0, 1, 1],
                    [1, 0, 1, 0, 0],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 0]];
  var lstCh = [2];
  lstCh[0] = [0, 1, 1, 2, 3];
  lstCh[1] = [1, 0, 2, 1, 0];

  function checkNum() {
    let ansList = [3];
    ansList[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ansList[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ansList[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //процент
    let ans = [3];
    ans[0] = [2];
    ans[1] = [2];
    ans[2] = [2];
    for (let k = 0; k < 3; k++) {
      let first;
      let second;
      if (k == 0) {
        first = size - 2;
        second = size - 1;
      }
      else if (k == 1) {
        first = 0;
        second = size - 1;
      }
      else {
        first = 0;
        second = 1;
      }
      let mtrxForNum = [];
      for (let i = 0; i < size; i++) {
        let newRow = [];
        for (let j = 0; j < size; j++) {
          if (j != first && j != second) {
            newRow.push(matrix[i][j]);
          }
        }
        mtrxForNum.push(newRow);
      }
      //console.log(first, second);
      //console.log(mtrxForNum);
      let listForCheck = [0, 0, 0, 0, 0];
      for (let i = 0; i < size; i++) {
        if(mtrxForNum[lstCh[0][i]][lstCh[1][i]]) {
          listForCheck[i] = 1;
        }
      }
      //console.log(listForCheck);
      //alert(listForCheck);
      for (let i = 0; i < listForCheck.length; i++) {
        for (let j = 0; j < listOfVle.length; j++) {
          if (listForCheck[i] == listOfVle[j][i]) {
            ansList[k][j] += 20;
          }
        }
      }
      //console.log(ansList);
      let mx = 0;
      let ind = 0;
      for (let i = 0; i < 10; i++) {
        if (mx < ansList[k][i]) {
          mx = ansList[k][i];
          ind = i;
        }
      }
      ans[k][0] = mx;
      ans[k][1] = ind;
    }
    //console.log(ans);
    let mxV = 0;
    let ansV = 0;
    for (let i = 0; i < 3; i++) {
      if (mxV <= ans[i][0]) {
        mxV = ans[i][0];
        ansV = ans[i][1];
      }
    }
    alert(ansV);
    //console.log(ans);
    //alert(listOfVle.indexOf(listForCheck, 0));
  }

}
function createDiv() {
    for (let k = 0; k < size * size; k++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        div.id = k;
        let j = k % size;
        let i = (k / size) - (k / size) % 1;
        div.addEventListener ('click', function(){
            //alert(1);
            if (typeOfMouse) {
                if (typeOfDrw) {
                  matrix[i][j] = 1;
                  listOfPixels[k] = 1;
                  div.style.backgroundColor = "#000000";
                }
                else {
                  matrix[i][j] = 0;
                  listOfPixels[k] = 0;
                  div.style.backgroundColor = "#FFFFFF";
                }
            }
        })
        divForPnt.appendChild(div);
    }
}
createDiv()


//сама нейронка

// Обучающие данные
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
  // Инициализация нейронной сети
  class NeuralNetwork {
    constructor(numInputs, numHidden, numOutputs) {
      this.numInputs = numInputs;
      this.numHidden = numHidden;
      this.numOutputs = numOutputs;
  
      this.weightsInputToHidden = this.randomizeWeights(numInputs, numHidden);
      this.weightsHiddenToOutput = this.randomizeWeights(numHidden, numOutputs);
    }
  
    randomizeWeights(numInputs, numOutputs) {
      const weights = [];
      for (let i = 0; i < numInputs; i++) {
        const row = [];
        for (let j = 0; j < numOutputs; j++) {
          row.push(Math.random());
        }
        weights.push(row);
      }
      return weights;
    }
  
    sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }
  
    feedForward(inputs) {
      // Слой входных значений
      const inputLayer = inputs;
  
      // Слой скрытых значений
      const hiddenLayer = [];
      for (let i = 0; i < this.numHidden; i++) {
        let sum = 0;
        for (let j = 0; j < this.numInputs; j++) {
          sum += inputLayer[j] * this.weightsInputToHidden[j][i];
        }
        hiddenLayer.push(this.sigmoid(sum));
      }
  
      // Слой выходных значений
      const outputLayer = [];
      for (let i = 0; i < this.numOutputs; i++) {
        let sum = 0;
        for (let j = 0; j < this.numHidden; j++) {
          sum += hiddenLayer[j] * this.weightsHiddenToOutput[j][i];
        }
        outputLayer.push(this.sigmoid(sum));
      }
  
      return outputLayer;
    }
  
    train(inputs, targets) {
      // Прямое распространение
      const outputs = this.feedForward(inputs);
  
      // Ошибка выходного слоя
      const outputErrors = [];
      for (let i = 0; i < this.numOutputs; i++) {
        outputErrors.push(outputs[i] - targets[i]);
      }
  
      // Ошибка скрытого слоя
      const hiddenErrors = [];
      for (let i = 0; i < this.numHidden; i++) {
        let sum = 0;
        for (let j = 0; j < this.numOutputs; j++) {
          sum += outputErrors[j] * this.weightsHiddenToOutput[i][j];
        }
        hiddenErrors.push(sum);
      }
  
      // Обновление весов между скрытым и выходным слоями
      for (let i = 0; i < this.numHidden; i++) {
        for (let j = 0; j < this.numOutputs; j++) {
          const delta = outputErrors[j] * outputs[j] * (1 - outputs[j]);
          this.weightsHiddenToOutput[i][j] -= 0.1 * delta * outputs[i];
        }
      }
  
      // Обновление весов между входным и скрытым слоями
      for (let i = 0; i < this.numInputs; i++) {
        for (let j = 0; j < this.numHidden; j++) {
          const delta = hiddenErrors[j] * outputs[j] * (1 - outputs[j]);
          this.weightsInputToHidden[i][j] -= 0.1 * delta * inputs[i];
        }
      }
    }
  }
  
  // Создание нейронной сети
  const neuralNetwork = new NeuralNetwork(25, 10, 10);
  // Обучение нейронной сети
for (let i = 0; i < 10000; i++) {
    const data = trainingData[Math.floor(Math.random() * trainingData.length)];
    neuralNetwork.train(data.input, data.output);
}


function checkNum() {
  let inputM = listOfPixels;
  let outputM = neuralNetwork.feedForward(inputM);
  alert(outputM.indexOf(Math.max(...outputM)));
}