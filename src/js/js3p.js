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
    arr[1] = getRowData(1,1,14);
    for (var i=2;i<7;i++) {
        arr[i] = getRowData(1,i,15);
    }
    for (var i=7;i<11;i++) {
        arr[i] = getRowData(1,i,13);
    }
    arr[11] = [];

    //Table 2
    arr[12] = getPData("p12");
    arr[13] = getRowData(2,1,12);
    for (var i=14;i<19;i++) {
        arr[i] = getRowData(2,i-12,13);
    }
    for (var i=19;i<21;i++) {
        arr[i] = getRowData(2,i-12,11);
    }
    arr[21] = [];

    //Table 3
    arr[22] = getPData("p13");
    arr[23] = getRowData(3,1,12);
    for (var i=24;i<29;i++) {
        arr[i] = getRowData(3,i-22,13);
    }
    for (var i=29;i<31;i++) {
        arr[i] = getRowData(3,i-22,11);
    }
    arr[31] = [];

    //Table 4
    arr[32] = getPData("p14");
    arr[33] = getRowData(4,1,12);
    for (var i=34;i<39;i++) {
        arr[i] = getRowData(4,i-32,13);
    }
    for (var i=39;i<41;i++) {
        arr[i] = getRowData(4,i-32,11);
    }
    arr[41] = [];

    //Table 5
    arr[42] = getPData("p15");
    arr[43] = getRowData(5,1,12);
    for (var i=44;i<49;i++) {
        arr[i] = getRowData(5,i-42,13);
    }
    for (var i=49;i<51;i++) {
        arr[i] = getRowData(5,i-42,11);
    }
    arr[51] = [];

    //Table 6
    arr[52] = getPData("p16");
    arr[53] = getRowData(6,1,12);
    for (var i=54;i<59;i++) {
        arr[i] = getRowData(6,i-52,13);
    }
    for (var i=59;i<61;i++) {
        arr[i] = getRowData(6,i-52,11);
    }
    arr[61] = [];

    //Table 7
    arr[62] = getPData("p17");
    arr[63] = getRowData(7,1,12);
    for (var i=64;i<69;i++) {
        arr[i] = getRowData(7,i-62,13);
    }
    for (var i=69;i<71;i++) {
        arr[i] = getRowData(7,i-62,11);
    }
    arr[71] = [];

    //Table 8
    arr[72] = getPData("p18");
    arr[73] = getRowData(8,1,12);
    for (var i=74;i<79;i++) {
        arr[i] = getRowData(8,i-72,13);
    }
    for (var i=79;i<81;i++) {
        arr[i] = getRowData(8,i-72,11);
    }
    arr[81] = [];

    //Table 9
    arr[82] = getPData("p19");
    arr[83] = getRowData(9,1,12);
    for (var i=84;i<89;i++) {
        arr[i] = getRowData(9,i-82,13);
    }
    for (var i=89;i<91;i++) {
        arr[i] = getRowData(9,i-82,11);
    }
    arr[91] = [];

    //Table 10
    arr[92] = getPData("p110");
    arr[93] = getRowData(10,1,12);
    for (var i=94;i<99;i++) {
        arr[i] = getRowData(10,i-92,13);
    }
    for (var i=99;i<101;i++) {
        arr[i] = getRowData(10,i-92,11);
    }
    arr[101] = [];

    //Final table
    arr[102] = getPData("p111");
    for (var i=103;i<111;i++) {
        arr[i] = getRowData(111,i-102,11);
    }



    return downloadExcelCsv(arr, "export_3.csv");
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