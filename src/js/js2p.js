var asUtf16, downloadExcelCsv, makeExcelCsvBlob, rows, toTsv;

asUtf16 = function (str) {
    var buffer, bufferView, i, j, ref, val;
    buffer = new ArrayBuffer(str.length * 2);
    bufferView = new Uint16Array(buffer);
    bufferView[0] = 0xfeff;
    for (i = j = 0, ref = str.length; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
        val = str.charCodeAt(i);
        bufferView[i + 1] = val;
    }
    return bufferView;
};

makeExcelCsvBlob = function (rows) {
    return new Blob([asUtf16(toTsv(rows)).buffer], {
        type: "text/csv;charset=UTF-16"
    });
};

toTsv = function (rows) {
    var escapeValue;
    escapeValue = function (val) {
        if (typeof val === 'string') {
            return '"' + val.replace(/"/g, '""') + '"';
        } else if (val != null) {
            return val;
        } else {
            return '';
        }
    };
    return rows.map(function (row) {
        return row.map(escapeValue).join('\t');
    }).join('\n') + '\n';
};

downloadExcelCsv = function (rows, attachmentFilename) {
    var a, blob;
    blob = makeExcelCsvBlob(rows);
    a = document.createElement('a');
    a.style.display = 'none';
    a.download = attachmentFilename;
    document.body.appendChild(a);
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
};

function generateCSV() {
    var arr = [];
    //Table 1
    arr[0] = getPData("p11");
    arr[1] = getRowData(1, 1, 13);
    for (i = 2; i < 7; i++) {
        arr[i] = getRowData(1, i, 14);
    }
    for (i = 7; i < 10; i++) {
        arr[i] = getRowData(1, i, 12);
    }
    arr[10] = [];

    //Table 2
    arr[11] = getPData("p12");
    arr[12] = getRowData(2, 1, 13);
    for (var i = 13; i < 18; i++) {
        arr[i] = getRowData(2, i - 11, 14);
    }
    for (var i = 18; i < 21; i++) {
        arr[i] = getRowData(2, i - 11, 12);
    }
    arr[21] = [];

    //Table 3
    arr[22] = getPData("p13");
    arr[23] = getRowData(3, 1, 13);
    for (var i = 24; i < 29; i++) {
        arr[i] = getRowData(3, i - 22, 14);
    }
    for (var i = 29; i < 32; i++) {
        arr[i] = getRowData(3, i - 22, 12);
    }
    arr[32] = [];

    //Table 4
    arr[33] = getPData("p14");
    arr[34] = getRowData(4, 1, 13);
    for (var i = 35; i < 40; i++) {
        arr[i] = getRowData(4, i - 33, 14);
    }
    for (var i = 40; i < 43; i++) {
        arr[i] = getRowData(4, i - 33, 12);
    }
    arr[43] = [];

    //Table 5
    arr[44] = getPData("p15");
    arr[45] = getRowData(5, 1, 13);
    for (var i = 46; i < 51; i++) {
        arr[i] = getRowData(5, i - 44, 14);
    }
    for (var i = 51; i < 54; i++) {
        arr[i] = getRowData(5, i - 44, 12);
    }
    arr[54] = [];

    //Table 6
    arr[55] = getPData("p16");
    arr[56] = getRowData(6, 1, 13);
    for (var i = 57; i < 62; i++) {
        arr[i] = getRowData(6, i - 55, 14);
    }
    for (var i = 62; i < 65; i++) {
        arr[i] = getRowData(6, i - 55, 12);
    }
    arr[65] = [];

    //Table 7
    arr[66] = getPData("p17");
    arr[67] = getRowData(7, 1, 13);
    for (var i = 68; i < 73; i++) {
        arr[i] = getRowData(7, i - 66, 14);
    }
    for (var i = 73; i < 76; i++) {
        arr[i] = getRowData(7, i - 66, 12);
    }
    arr[76] = [];

    //Table 8
    arr[77] = getPData("p18");
    arr[78] = getRowData(8, 1, 13);
    for (var i = 79; i < 84; i++) {
        arr[i] = getRowData(8, i - 77, 14);
    }
    for (var i = 84; i < 87; i++) {
        arr[i] = getRowData(8, i - 77, 12);
    }
    arr[87] = [];

    //Table 9
    arr[88] = getPData("p19");
    arr[89] = getRowData(9, 1, 13);
    for (var i = 90; i < 95; i++) {
        arr[i] = getRowData(9, i - 88, 14);
    }
    for (var i = 95; i < 98; i++) {
        arr[i] = getRowData(9, i - 88, 12);
    }
    arr[98] = [];

    //Final Table
    for (var i = 99; i < 108; i++) {
        arr[i] = getRowData(10, i - 98, 10);
    }


    return downloadExcelCsv(arr, "export_2.csv");
}


function getRowData(tableN, rowN, length) {
    var id = "c" + tableN + rowN;
    var arrTemp = [];
    for (var i = 1; i < length + 1; i++) {
        console.log(document.getElementById(id + i).value);
        arrTemp[i - 1] = document.getElementById(id + i).value;
    }
    //console.log(arrTemp);
    return arrTemp;
}

function getPData(idP) {
    var arrTemp = [];
    arrTemp[0] = document.getElementById(idP).textContent;
    return arrTemp;
}