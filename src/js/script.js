function reverseValue(cell1, cell2) {
    c1 = document.getElementById("c" + cell1);
    c2 = document.getElementById("c" + cell2);
    var rezz = 1 / c1.value;
    c2.value = rezz.toFixed(3);

}

var nsac = 3;

function calculate(tableNumber, rows, cells, criteria, finilizingTable) {
    var array = [];
    for (var i = 0; i < rows; i++) {
        array[i] = [];
        for (var j = 0; j < cells; j++) {
            array[i][j] = document.getElementById("c" + tableNumber + (i + 2) + (j + 2));
        }
    }
    //Coulumn 1
    //console.log(array.length);
    //console.log(array[1].length);
    var arraySumm = [];
    var allSumm = 0;
    for (var i = 0; i < rows; i++) {
        arraySumm[i] = 0;
        for (var j = 0; j < criteria; j++) {
            //console.log(array[i][j].value);
            arraySumm[i] += Number(array[i][j].value);
            allSumm += Number(array[i][j].value);
        }
    }
    for (var i = 0; i < rows; i++) {
        array[i][criteria].value = arraySumm[i] / allSumm;
    }
    //Column 2
    var arrayProduct = [];
    var arrayPower = [];
    var powerSumm = 0;
    for (var i = 0; i < rows; i++) {
        arrayProduct[i] = 1;
        arrayPower[i] = 1;
        for (var j = 0; j < criteria; j++) {
            arrayProduct[i] *= Number(array[i][j].value);
        }
        arrayPower[i] = Math.pow(arrayProduct[i], (1 / criteria));
        powerSumm += arrayPower[i];
    }
    for (var i = 0; i < rows; i++) {
        array[i][criteria + 1].value = arrayPower[i] / powerSumm;
        if (tableNumber >= 2) {
            document.getElementById("c" + finilizingTable + (i + 2) + tableNumber).value = arrayPower[i] / powerSumm;
        }
    }
    //Column 3
    var ciksumm = 0;
    var cikArray = [];
    for (var i = 0; i < rows; i++) {
        cikArray[i] = 0;
        for (var j = 0; j < criteria; j++) {
            cikArray[i] += Number(array[i][j].value) * Number(array[j][criteria + 1].value);
        }
        //console.log(i);
        //console.log(criteria + 2);
        //console.log(array[i].length);
        array[i][criteria + 2].value = cikArray[i];
        ciksumm += cikArray[i] / Number(array[i][criteria + 1].value);
    }
    //Column 4
    array[0][criteria + 4].value = ciksumm;
    array[1][criteria + 4].value = ciksumm / criteria;
    array[2][criteria + 4].value = (Number(array[1][criteria + 4].value) - criteria) / (criteria - 1);
    array[4][criteria + 4].value = Number(array[2][criteria + 4].value) / Number(array[3][criteria + 4].value);
}

function calculateFinal(rows, cells, tableNumber, positionOfCriteria, positionOfResult) {
    summ = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cells; j++) {
            summ += Number(document.getElementById("c" + tableNumber + (i + 2) + (j + 2)).value) * Number(document.getElementById("c1" + (j + 2) + positionOfCriteria).value);
            console.log(Number(document.getElementById("c1" + (j + 2) + positionOfCriteria).value));
        }
        document.getElementById("c" + tableNumber + (i + 2) + positionOfResult).value = summ.toFixed(nsac);
        summ = 0;
    }
}

function setUpDefaultValues(tableNumber, criteria) {
    var counter = 2;
    for (var i = 0; i < criteria; i++) {
        for (var j = 0; j < criteria; j++) {
            document.getElementById("c" + tableNumber + (i + 2) + (j + 2)).value = arguments[counter];
            counter++;
        }
    }
}
