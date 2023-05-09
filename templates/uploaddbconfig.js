function UploadDBConfig() {
    var IsReqEventOccured = false;
    if (!Required("#file1")) { IsReqEventOccured = true; }
    if (!Required("#file2")) { IsReqEventOccured = true; }
    if (IsReqEventOccured) { return false; }

    var ext = $('#file1').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['xml']) == -1) {
        alert('Please select a valid Configuration XML file!');
        return;
    }
    var ext = $('#file2').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['exp']) == -1) {
        alert('Please select a valid Expression file!');
        return;
    }

    $("#btnUpload").val("Uploading");
    $("#btnUpload").attr('disabled', 'disabled');

    var data = new FormData();
    jQuery.each($('#file1')[0].files, function (i, file) {
        data.append('file-' + i, file);
    });
    jQuery.each($('#file2')[0].files, function (i, file) {
        data.append('file-' + i, file);
    });

    $.ajax({
        url: 'ServiceHandler.ashx?CBH=UPLOADDBCONFIG',
        type: "POST",
        data: data,
        async: true,
        contentType: false,
        dataType: 'json',
        processData: false,
        success: function (data)
        {
            if (data != null)
            {
                alert(data.msg);
                $("#btnUpload").attr('disabled', false);
                $("#btnUpload").val("Upload");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " " + errorThrown);
            $("#btnUpload").val("Upload");
        },
    });
}