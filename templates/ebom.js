function LoadEBOMData() {
    var dvEBOM = $('#dvEBOM');
    var postData = '';
    postData = '{' + postData + '}';
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=GET_EBOM',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data.result == 0) { alert(data.msg); return false; }
            else {
                dvEBOM.html(data.datatable);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " " + errorThrown);
        },
    });
}

function GenerateEBOMReport() {
    var postData = '';

    postData = '{' + postData + '}';
    CurrRequest = $.ajax({
        url: 'ServiceHandler.ashx?CBH=GENERATE_EBOMSHEET',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data != null) {
                if (data.result == 0) {
                    alert(data.msg);
                    return false;
                }
                window.open('ExportMemStrm.aspx');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " " + errorThrown);
        },
    });
}