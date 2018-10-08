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
    // 2,3,4,5,6
    for (var i = 2; i < 7; i++) {
        arr[i] = getRowData(1, i, 14);
    }
    // 7,8,9
    for (var i = 7; i < 10; i++) {
        arr[i] = getRowData(1, i, 12);
    }
    arr[10] = [];
    //Table 2
    // 11
    arr[11] = getPData("p12");
    // 12
    arr[12] = getRowData(2, 1, 9);
    // 13,14,15,16,17
    for (var i = 13; i < 18; i++) {
        arr[i] = getRowData(2, i - 11, 11);
    }
    arr[18] = [];

    //Table 3
    arr[19] = getPData("p13");
    arr[20] = getRowData(3, 1, 9);
    for (var i = 21; i < 26; i++) {
        arr[i] = getRowData(3, i - 19, 11);
    }
    arr[26] = [];

    //Table 4
    arr[27] = getPData("p14");
    arr[28] = getRowData(4, 1, 9);
    for (var i = 29; i < 34; i++) {
        arr[i] = getRowData(4, i - 27, 11);
    }
    arr[34] = [];
    //Table 5
    arr[35] = getPData("p15");
    arr[36] = getRowData(5, 1, 9);
    for (var i = 37; i < 42; i++) {
        arr[i] = getRowData(5, i - 35, 11);
    }
    arr[42] = [];

    //Table 6
    arr[43] = getPData("p16");
    arr[44] = getRowData(6, 1, 9);
    for (var i = 45; i < 50; i++) {
        arr[i] = getRowData(6, i - 43, 11);
    }
    arr[50] = [];

    //Table 7
    arr[51] = getPData("p17");
    arr[52] = getRowData(7, 1, 9);
    for (var i = 53; i < 58; i++) {
        arr[i] = getRowData(7, i - 51, 11);
    }
    arr[58] = [];

    //Table 8
    arr[59] = getPData("p18");
    arr[60] = getRowData(8, 1, 9);
    for (var i = 61; i < 66; i++) {
        arr[i] = getRowData(8, i - 59, 11);
    }
    arr[66] = [];
    //Table 9
    arr[67] = getPData("p19");
    arr[68] = getRowData(9, 1, 9);
    for (var i = 69; i < 74; i++) {
        arr[i] = getRowData(9, i - 67, 11);
    }
    arr[74] = [];

    //Final Table
    arr[75] = getPData("p110");
    for (var i=76;i<82;i++) {
        arr[i] = getRowData(10,i-75,10);
    }

    return downloadExcelCsv(arr, "export_1.csv");
}

function getRowData(tableN, rowN, length) {
    var id = "c" + tableN + rowN;
    var arrTemp = [];
    for (var i = 1; i < length + 1; i++) {
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