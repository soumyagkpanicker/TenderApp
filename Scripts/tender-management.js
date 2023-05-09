$(document).on("change", ".tenderFilterByTypes .radio >input[type='radio']", function () {
    $("#btnNext").removeClass("disabled");
    $("#btnPrevious").removeClass("disabled");
    if ($("input#rbActiveTenders:checked").length == 1) {
        loadMyActiveTenders();
    }
    if ($("input#rbOpenTenders:checked").length == 1) {
        loadMyOpenTenders();
    }
    if ($("input#rbAllOpenTenders:checked").length == 1) {
        AllOpenTenders();
    }
    if ($("input#rbBudgetOrder:checked").length == 1) {
        BudgetTenders();
    }
    if ($("input#rbFirmOrder:checked").length == 1) {
        FirmTenders();
    }
       $("#tblTenders tbody tr:visible").last().next("tr").hide();
        if ($("#tblTenders tbody tr:visible").last().index() == $("#tblTenders tbody tr:last-child").index()) {
            $("#btnNext").addClass("disabled");
        }
        if ($("#tblTenders tbody tr:visible").first().index() == $("#tblTenders tbody tr:first-child").index()) {
            $("#btnPrevious").addClass("disabled");
        }
        if ($("#tblTenders tbody tr:visible").last().index() == $("#tblTenders tbody tr:last-child").index()) {
            $("#btnNext").addClass("disabled");
        }
        if ($("#tblTenders tbody tr:visible").first().index() == $("#tblTenders tbody tr:first-child").index()) {
            $("#btnPrevious").addClass("disabled");
        }

});
function FirmTenders() {
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=FIRMTENDERS',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            var HTMLTableBody = "";
            var k = 0;
            $.each(data, function (i) {
                k = 1;
                var dateOfCreation = new Date(data[i].DateOfCreation);
                var dateOfModification = new Date(data[i].ModifiedDate);
                HTMLTableBody += "<tr>";
                HTMLTableBody += "<td>" + data[i].TenderUniqueId + "</td>";
                HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
                HTMLTableBody += "<td>" + data[i].TenderId + "</td>";
                HTMLTableBody += "<td>" + data[i].ProjectId + "</td>";
                HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
                HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
                HTMLTableBody += "</tr>";
            });
           
            
            if (k == 0)
                HTMLTableBody += "<tr><td>&nbsp;</td><td>&nbsp;</td><td colspan='4'>No records to show</p></td><td>&nbsp;</td></tr>";
            $(".TendersListWrapper table > tbody").html(HTMLTableBody);
            $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
        }
    });
}
function BudgetTenders() {
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=BUDGETTENDERS',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            var HTMLTableBody = "";
            var k = 0;
            $.each(data, function (i) {
                k = 1;
                var dateOfCreation = new Date(data[i].DateOfCreation);
                var dateOfModification = new Date(data[i].ModifiedDate);
                HTMLTableBody += "<tr>";
                HTMLTableBody += "<td>" + data[i].TenderUniqueId + "</td>";
                HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
                HTMLTableBody += "<td>" + data[i].TenderId + "</td>";
                HTMLTableBody += "<td>" + data[i].ProjectId + "</td>";
                HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
                HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
                HTMLTableBody += "</tr>";
            });


            if (k == 0)
                HTMLTableBody += "<tr><td>&nbsp;</td><td>&nbsp;</td><td colspan='4'>No records to show</p></td><td>&nbsp;</td></tr>";
            $(".TendersListWrapper table > tbody").html(HTMLTableBody);
            $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
        }
    });
}
function AllOpenTenders() {
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=ALLTENDERS',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            var HTMLTableBody = "";
            var k = 0;
            $.each(data, function (i) {
                k = 1;
                var dateOfCreation = new Date(data[i].DateOfCreation);
                var dateOfModification = new Date(data[i].ModifiedDate);
                HTMLTableBody += "<tr>";
                HTMLTableBody += "<td>" + data[i].TenderUniqueId + "</td>";
                HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
                HTMLTableBody += "<td>" + data[i].TenderId + "</td>";
                HTMLTableBody += "<td>" + data[i].ProjectId + "</td>";
                HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
                HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
                HTMLTableBody += "</tr>";
            });


            if (k == 0)
                HTMLTableBody += "<tr><td>&nbsp;</td><td>&nbsp;</td><td colspan='4'>No records to show</p></td><td>&nbsp;</td></tr>";
            $(".TendersListWrapper table > tbody").html(HTMLTableBody);
            $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
        }
    });
}
function loadMyOpenTenders() {
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=MYOPENTENDERS',
        cache: false,
        async: true,
        data: { Username: $("#paraUserName").text() },
        dataType: 'json',
        success: function (data) {
            var HTMLTableBody = "";
            var k = 0;
            $.each(data, function (i) {
                k = 1;
                var dateOfCreation = new Date(data[i].DateOfCreation);
                var dateOfModification = new Date(data[i].ModifiedDate);
                HTMLTableBody += "<tr>";
                HTMLTableBody += "<td>" + data[i].TenderUniqueId + "</td>";
                HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
                HTMLTableBody += "<td>" + data[i].TenderId + "</td>";
                HTMLTableBody += "<td>" + data[i].ProjectId + "</td>";
                HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
                HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
                HTMLTableBody += "</tr>";
            });


            if (k == 0)
                HTMLTableBody += "<tr><td>&nbsp;</td><td>&nbsp;</td><td colspan='4'>No records to show</p></td><td>&nbsp;</td></tr>";
            $(".TendersListWrapper table > tbody").html(HTMLTableBody);
            $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
        }
    });
}
function loadMyActiveTenders() {
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=MYACTIVETENDERS',
        cache: false,
        async: true,
        data: { Username: $("#paraUserName").text() },
        dataType: 'json',
        success: function (data) {
            var HTMLTableBody = "";
            var k = 0;
            $.each(data, function (i) {
                k = 1;
                var dateOfCreation = new Date(data[i].DateOfCreation);
                var dateOfModification = new Date(data[i].ModifiedDate);
                HTMLTableBody += "<tr>";
                HTMLTableBody += "<td>" + data[i].TenderUniqueId + "</td>";
                HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
                HTMLTableBody += "<td>" + data[i].TenderId + "</td>";
                HTMLTableBody += "<td>" + data[i].ProjectId + "</td>";
                HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
                HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
                HTMLTableBody += "</tr>";
            });


            if (k == 0)
                HTMLTableBody += "<tr><td>&nbsp;</td><td>&nbsp;</td><td colspan='4'>No records to show</p></td><td>&nbsp;</td></tr>";
            $(".TendersListWrapper table > tbody").html(HTMLTableBody);
            $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
        }
    });
}

$(document).on("click", "#btnDeleteTender", function () {
    document.getElementById("loadingDiv").style.display = "block";
    if ($(".TendersListWrapper tbody tr.clicked").length > 0) {
        $(".TendersListWrapper tbody tr.clicked").each(function (i) {
            var tenderId = $(this).find("td[data-TenderId]").text();
            var projectId = $(this).find("td[data-projectid]").text();
            var tenderUniqueId = $(this).find("td[data-TenderUniqueId]").text();

            $.ajax({
                url: 'ServiceHandler.ashx?CBH=DELETETENDER',
                cache: false,
                async: true,
                data: { TenderId: tenderId, ProjectId: projectId, TenderUniqueId: tenderUniqueId },
                dataType: 'json',
                success: function (data) {
                    //alert(data);

                }
            });
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=GETTENDERLIST',
                cache: false,
                async: true,
                dataType: 'json',
                success: function (data) {
                    var HTMLTableBody = "";
                    $.each(data, function (i) {
                        var dateOfCreation = new Date(data[i].DateOfCreation);
                        var dateOfModification = new Date(data[i].ModifiedDate);
                        HTMLTableBody += "<tr>";
                        HTMLTableBody += "<td data-TenderUniqueId='" + data[i].TenderUniqueId + "'>" + data[i].TenderUniqueId + "</td>";
                        HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
                        HTMLTableBody += "<td data-TenderId='" + data[i].TenderId + "'>" + data[i].TenderId + "</td>";
                        HTMLTableBody += "<td data-ProjectId='" + data[i].ProjectId + "'>" + data[i].ProjectId + "</td>";
                        HTMLTableBody += "<td>" + data[i].Customer + "</td>";
                        HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                        HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
                        HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
                        HTMLTableBody += "</tr>";
                    });
                    $(".TendersListWrapper table > tbody").html(HTMLTableBody);
                    $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
                }
            });
        });

    }
    else {
        $(".error-msg").text("Please select a row first").show();
    }

    document.getElementById("loadingDiv").style.display = "none";
});
$(document).on("change", "#ddSearchColumns", function () {
    $("#txtSearchbox").attr("data-ColumnName", $(this).val());
});
$(document).on("click", "#btnCopyTender", function () {
    document.getElementById("loadingDiv").style.display = "block";
    if ($(".TendersListWrapper tbody tr.clicked").length > 0)
        window.location.href = "NewTender.aspx?code=" + $.trim($(".TendersListWrapper tbody tr.clicked td:first-child").text());
    else
        $(".error-msg").text("Please select a row first").show();
    document.getElementById("loadingDiv").style.display = "none";
});

$(document).on("change", ".chbxSelection", function () {

    if ($(this).prop("checked") == true) {
        $("#tblTenders tr").removeClass("clicked");
        $(".chbxSelection").prop("checked", false);
        $(this).parents("tr").addClass("clicked")
        $(this).prop("checked", true);
    }
    else {
        $(this).parents("tr").removeClass("clicked")
    }
    
});
$(document).on("click", "#btnSearch", function () {
    $("#btnNext").removeClass("disabled");
    $("#btnPrevious").removeClass("disabled");
    if ($.trim($("#txtSearchbox").val() != '')) {
        $("#tblTenders tbody tr").hide();
        console.log($("#ddSearchColumns").val());
       // console.log($(this).find("td:nth-child(" + ($("table thead th[data-column='" + $("#ddSearchColumns").val() + "']").index() + 1) + ")").text());

        $("#tblTenders tbody tr").each(function () {
            console.log("Search text: " + $.trim($("#txtSearchbox").val()));
            console.log("Column text: " + $.trim($.trim($(this).find("td:nth-child(" + ($("table thead th[data-column='" + $("#ddSearchColumns").val() + "']").index() + 1) + ")").text())));
            console.log($.trim($("#txtSearchbox").val()) == $.trim($(this).find("td:nth-child(" + ($("table thead th[data-column='" + $("#ddSearchColumns").val() + "']").index() + 1) + ")").text()));
            if ($.trim($("#txtSearchbox").val()) == $.trim($(this).find("td:nth-child(" + ($("table thead th[data-column='" + $("#ddSearchColumns").val() + "']").index() + 1) + ")").text())) {
                $(this).show();
            }

        });
        $("#tblTenders tbody tr:visible").last().next("tr").hide();
        if ($("#tblTenders tbody tr:visible").last().index() == $("#tblTenders tbody tr:last-child").index()) {
            $("#btnNext").addClass("disabled");
        }
        if ($("#tblTenders tbody tr:visible").first().index() == $("#tblTenders tbody tr:first-child").index()) {
            $("#btnPrevious").addClass("disabled");
        }
        if ($("#tblTenders tbody tr:visible").last().index() == $("#tblTenders tbody tr:last-child").index()) {
            $("#btnNext").addClass("disabled");
        }
        if ($("#tblTenders tbody tr:visible").first().index() == $("#tblTenders tbody tr:first-child").index()) {
            $("#btnPrevious").addClass("disabled");
        }
    }


});
$(document).ready(function () {
    document.getElementById("loadingDiv").style.display = "block";
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=GETTENDERLIST',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            var HTMLTableBody = "";
            $.each(data, function (i) {

                var dateOfCreation = new Date(data[i].DateOfCreation);
                var dateOfModification = new Date(data[i].ModifiedDate);
                HTMLTableBody += "<tr>";
                HTMLTableBody += "<td data-TenderUniqueId=" + data[i].TenderUniqueId + ">" + data[i].TenderUniqueId + "</td>";
                HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
                HTMLTableBody += "<td data-TenderId=" + data[i].TenderId + ">" + data[i].TenderId + "</td>";
                HTMLTableBody += "<td data-ProjectId=" + data[i].ProjectId + "><a href='EditTender.aspx?code=" + data[i].TenderUniqueId + "'>" + data[i].ProjectId + "</a></td>";
                HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                HTMLTableBody += "<td>" + data[i].Customer + "</td>";
                HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
                HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
                HTMLTableBody += "</tr>";
            });
            $(".TendersListWrapper table > tbody").html(HTMLTableBody);
            $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
            $("#tblTenders").AddPaginationElements();
        }
    });
    document.getElementById("loadingDiv").style.display = "none";



});
$(document).on("click", "#btnEditTender", function () {
    document.getElementById("loadingDiv").style.display = "block";
    if ($(".TendersListWrapper tbody tr.clicked").length > 0) {
        if ($(".TendersListWrapper tbody tr.clicked").length > 1) {
            $(".error-msg").text("Please select only one row").show();
            return false;
        }

        else
            window.location.href = "EditTender.aspx?code=" + $.trim($(".TendersListWrapper tbody tr.clicked td:first-child").text());

    }
    else {
        $(".error-msg").text("Please select a row first").show();
    }
    document.getElementById("loadingDiv").style.display = "none";
});
$(document).on("change", ".tenderFilterByTypes radio", function () {
    var typeToBeFiltered = $(this).val();
});
$(document).on("change", ".pagination-count", function () {
    document.getElementById("loadingDiv").style.display = "block";
    $("#btnPrevious").removeClass("disabled");
    $("#btnNext").removeClass("disabled");
    $("#tblTenders tbody tr").hide();
    $("#tblTenders tbody tr:first-child").show();
    $("#tblTenders tbody tr:first-child").nextUntil("tr:nth-child(" + ($(this).val()) + ")").show();
    // $("#tblTenders tbody tr:nth-child(" + $(this).val() + ")").next("tr").hide();
    if ($("#tblTenders tbody tr:visible").last().index() == $("#tblTenders tbody tr:last-child").index()) {
        $("#btnNext").addClass("disabled");
    }
    if ($("#tblTenders tbody tr:visible").first().index() == $("#tblTenders tbody tr:first-child").index()) {
        $("#btnPrevious").addClass("disabled");
    }
    document.getElementById("loadingDiv").style.display = "none";
});
$(document).on("click", "#btnNext", function () {
    document.getElementById("loadingDiv").style.display = "block";
    $("#btnPrevious").removeClass("disabled");
    var selector = $("#tblTenders tbody tr:visible").last().nextUntil("tr:nth-child(" + ($("#tblTenders tbody tr:visible").last().index() + 7) + ")");
    $("#tblTenders tbody tr").hide();
    selector.show();
    if ($("#tblTenders tbody tr:visible").last().index() == $("#tblTenders tbody tr:last-child").index()) {
        $("#btnNext").addClass("disabled");
    }
    if ($("#tblTenders tbody tr:visible").first().index() == $("#tblTenders tbody tr:first-child").index()) {
        $("#btnPrevious").addClass("disabled");
    }
    document.getElementById("loadingDiv").style.display = "none";
});
$(document).on("click", "#btnPrevious", function () {
    document.getElementById("loadingDiv").style.display = "block";
    $("#btnNext").removeClass("disabled");
    var selector = $("#tblTenders tbody tr:visible").first().prevUntil("tr:nth-child(" + ($("#tblTenders tbody tr:visible").first().index() - 5) + ")");
    $("#tblTenders tbody tr").hide();
    selector.show();
    if ($("#tblTenders tbody tr:visible").last().index() == $("#tblTenders tbody tr:last-child").index()) {
        $("#btnNext").addClass("disabled");
    }
    if ($("#tblTenders tbody tr:visible").first().index() == $("#tblTenders tbody tr:first-child").index()) {
        $("#btnPrevious").addClass("disabled");
    }
    document.getElementById("loadingDiv").style.display = "none";
});






