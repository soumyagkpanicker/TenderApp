var PageNo = 1;
var SortingOrder = "Desc";
var SortingColumn = "DateOfCreation";
var rowSelectCount = 0;
var FilterOption = 'All';

var InsertRights = false;
var EditRights = false;
var DeleteRights = false;

$j(document).on("click", "#btnReset", function () {
    $j("#txtSearchbox").val("");
    $j("#ddSearchColumns").val("All");
    LoadAllQuotes();
});

$j(document).on("click", "#btnExportToExcel", function () {
    tblToSort = [];
    $j(".tender-management-wrapper .st-body-table tr td").each(function () {
        tempOrder = {};
        if ($j(this).attr("data-columnname") == "TenderId")
            tempOrder["TenderId"] = $j.trim($j(this).text());
        if ($j(this).attr("data-columnname") == "ProjectId")
            tempOrder["ProjectId"] = $j.trim($j(this).text());
        if ($j(this).attr("data-columnname") == "Customer")
            tempOrder["Customer"] = $j.trim($j(this).text());
        tblToSort.push(tempOrder);
    });
    $j.ajax({
        url: 'ServiceHandler.ashx?CBH=EXPORTTOEXCEL',
        cache: false,
        type: 'POST',
        async: true,
        data: { data: JSON.stringify(tblToSort) },
        success: function (data) {
            alert(data);
        }
    });
});

$j(document).ready(function () {
    checkRights();

    $j("input[name='tenderTypes']").removeAttr("checked");
    var ftype = getUrlVars()["ftype"];
    if (typeof getUrlVars()["ftype"] != "undefined") {
        if (ftype == 1) {
            $j("#rbOpenTenders").prop("checked", "true");
            FilterOption = "InProgress";
        }
        if (ftype == 2) {
            $j("#rbActiveTenders").prop("checked", "true");
            FilterOption = "Active";
        }
        if (ftype == 3) {
            $j("#rbBudgetOrder").prop("checked", "true");
            FilterOption = "Budget";
        }
        if (ftype == 4) {
            $j("#rbFirmOrder").prop("checked", "true");
            FilterOption = "Firm";
        }
        if (ftype == 5) {
            $j("#rbWin").prop("checked", "true");
            FilterOption = "Win";
        }
        if (ftype == 6) {
            $j("#rbLoss").prop("checked", "true");
            FilterOption = "Loss";
        }
        if (ftype > 6) {
            $j("#rbAllOpenTenders").prop("checked", "true");
            FilterOption = "All";
        }
    }
    else {
        $j("#rbAllOpenTenders").prop("checked", "true");
        //LoadAllQuotes();
        FilterOption = "All";
    }
    $j("#rbtnActiveTender").prop("checked", "true");
    LoadGrid();
    getTenderConfiguration();
    //LoadAllQuotes();


    $jq1(document).on("click", ".parent-row_1", function () {
        var CounterValue = $jq1(this).data("counter");
        var elem = $jq1(this);

        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Project_") >= 0) {
            var Temp = 1;
            var countTender = $jq1(this).data("tendercounts");
            $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Tender_") >= 0) {
                    if (!elem.hasClass("opened")) {
                        if (Temp == countTender) {
                            elem.addClass("opened");
                        }
                        $jq1(this).removeClass("active").slideUp();
                        $jq1(this).addClass("active").slideDown();
                    }
                    else {
                        var Temp1 = 1;
                        var Temp1 = 1;
                        var countItem = $jq1(this).data("itemcounts");
                        var clickedTenderId1 = $jq1(this).attr("id");
                        var elem1 = $jq1(this);
                        $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                            var parendtTenderId1 = "tr_" + CounterValue + "_Tender_" + $jq1(this).data("parenttenderid");
                            if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0 && clickedTenderId1 == parendtTenderId1) {
                                if (elem.hasClass("opened")) {
                                    var Temp2 = 1;
                                    var countFile2 = $jq1(this).data("versioncounts");
                                    var clickedItemId2 = $jq1(this).attr("id");
                                    var elem2 = $jq1(this);
                                    $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                                        var parendtItemId2 = "tr_" + CounterValue + "_Item_" + $jq1(this).data("parentitemid");
                                        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId2 == parendtItemId2) {
                                            if (elem2.hasClass("opened")) {
                                                if (Temp2 == countFile2) {
                                                    elem2.removeClass("opened");
                                                }
                                                $jq1(this).removeClass("active").slideUp();
                                            }
                                            Temp2 += 1;
                                        }
                                    })

                                    if (Temp1 == countItem) {
                                        elem1.removeClass("opened");
                                    }
                                    $jq1(this).removeClass("active").slideUp();
                                }
                                Temp1 += 1;
                            }
                        })

                        if (Temp == countTender) {
                            elem.removeClass("opened");
                        }
                        $jq1(this).removeClass("active").slideUp();
                    }
                    Temp += 1;
                }
            })
        }
        else if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Tender_") >= 0) {
            var Temp = 1;
            var countItem = $jq1(this).data("itemcounts");
            var clickedTenderId = $jq1(this).attr("id");
            $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                var parendtTenderId = "tr_" + CounterValue + "_Tender_" + $jq1(this).data("parenttenderid");
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0 && clickedTenderId == parendtTenderId) {
                    if (!elem.hasClass("opened")) {
                        if (Temp == countItem) {
                            elem.addClass("opened");
                        }
                        $jq1(this).removeClass("active").slideUp();
                        $jq1(this).addClass("active").slideDown();
                    }
                    else {
                        var Temp1 = 1;
                        var countFile = $jq1(this).data("versioncounts");
                        var clickedItemId1 = $jq1(this).attr("id");
                        var elem1 = $jq1(this);
                        $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                            var parendtItemId1 = "tr_" + CounterValue + "_Item_" + $jq1(this).data("parentitemid");
                            if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId1 == parendtItemId1) {
                                if (elem1.hasClass("opened")) {
                                    if (Temp1 == countFile) {
                                        elem1.removeClass("opened");
                                    }
                                    $jq1(this).removeClass("active").slideUp();
                                }
                                Temp1 += 1;
                            }
                        })

                        if (Temp == countItem) {
                            elem.removeClass("opened");
                        }
                        $jq1(this).removeClass("active").slideUp();
                    }
                    Temp += 1;
                }
            })
        }
        else if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0) {
            var Temp = 1;
            var countFile = $jq1(this).data("versioncounts");
            var clickedItemId = $jq1(this).attr("id");
            var clickedItemTenderId = "tr_" + CounterValue + "_Tender_" + $jq1(this).data("parenttenderid");
            var clickedItemProjectId = "tr_" + CounterValue + "_Project_" + $jq1(this).data("parentprojectid");
            $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                var parendtItemId = "tr_" + CounterValue + "_Item_" + $jq1(this).data("parentitemid");
                var parentTenderId = "tr_" + CounterValue + "_Tender_" + $jq1(this).data("parenttenderid");
                var parentProjectId = "tr_" + CounterValue + "_Project_" + $jq1(this).data("parentprojectid");
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId == parendtItemId && clickedItemTenderId == parentTenderId && clickedItemProjectId == parentProjectId) {
                    if (!elem.hasClass("opened")) {
                        if (Temp == countFile) {
                            elem.addClass("opened");
                        }
                        $jq1(this).removeClass("active").slideUp();
                        $jq1(this).addClass("active").slideDown();
                    }
                    else {
                        if (Temp == countFile) {
                            elem.removeClass("opened");
                        }
                        $jq1(this).removeClass("active").slideUp();
                    }
                    Temp += 1;
                }
            })
        }
    });
});

$j(document).on("change", "input[name='tenderDeleted']", function () {
    LoadGrid();
});

$j(document).on("change", "input[name='tenderTypes']", function () {
    $j(".tblSnapdown > tbody").html("");
    if ($j("#rbAllOpenTenders:checked").length > 0) {
        //LoadAllQuotes();
        FilterOption = "All";
    }
    else if ($j("#rbActiveTenders:checked").length > 0) {
        //LoadQuotesSubmitted();
        FilterOption = "Active";
    }
    else if ($j("#rbOpenTenders:checked").length > 0) {
        //LoadQuotesInProgress();
        FilterOption = "InProgress";
    }
    else if ($j("#rbBudgetOrder:checked").length > 0) {
        //LoadBudgetOrders();
        FilterOption = "Budget";
    }
    else if ($j("#rbWin:checked").length > 0) {
        //LoadBudgetOrders();
        FilterOption = "Win";
    }
    else if ($j("#rbLoss:checked").length > 0) {
        //LoadBudgetOrders();
        FilterOption = "Loss";
    }
    else if ($j("#rbFirmOrder:checked").length > 0) {
        //LoadFirmOrders();
        FilterOption = "Firm";
    }
    LoadGrid();
});



function SortRecords(SortingFor) {
    //document.getElementById("loadingDiv").style.display = "block";
    if (SortingColumn == SortingFor) {
        if (SortingOrder == 'Asc') {
            SortingOrder = "Desc";
        }
        else {
            SortingOrder = "Asc";
        }
    }
    else {
        SortingOrder = "Asc";
        SortingColumn = SortingFor;
    }
    LoadGrid();
    //document.getElementById("loadingDiv").style.display = "none";
}
$j(document).on("click", "#btnSearch", function () {
    if ($j.trim($j("#txtSearchbox").val()) == '') {
        alert("Invalid search keyword");
    }
    else {
        $j(".tender-management-wrapper .st-body-table tr").hide();
        $j(".tender-management-wrapper .st-body-table tr").removeClass("gotValue");

        //TenderId
        if ($j("#ddSearchColumns").val() == "Tender Id") {
            $j(".tender-management-wrapper .st-body-table tr td").each(function () {
                var elem = $j(this);
                if (elem.attr("data-columnname") == "TenderId") {
                    if ($j.trim(elem.text()) == $j.trim($j("#txtSearchbox").val())) {
                        elem.parents("tr").show();
                        //elem.parents("tr").addClass("gotValue");
                    }
                }
            });
        }

        //ProjectId
        if ($j("#ddSearchColumns").val() == "Project Id") {
            $j(".tender-management-wrapper .st-body-table tr td").each(function () {
                var elem = $j(this);
                if (elem.attr("data-columnname") == "ProjectId") {
                    if (elem.text().toLowerCase().indexOf($j("#txtSearchbox").val().toLowerCase()) >= 0) {
                        elem.parents("tr").show();
                        //elem.parents("tr").addClass("gotValue");
                    }
                }
            });
        }

        //Customer
        if ($j("#ddSearchColumns").val() == "Customer") {
            $j(".tender-management-wrapper .st-body-table tr td").each(function () {
                var elem = $j(this);
                if (elem.attr("data-columnname") == "Customer") {
                    if (elem.text().toLowerCase().indexOf($j("#txtSearchbox").val().toLowerCase()) >= 0) {
                        elem.parents("tr").show();
                        //elem.parents("tr").addClass("gotValue");
                    }
                }
            });
        }


        //Any
        if ($j("#ddSearchColumns").val() == "All") {
            $j(".tender-management-wrapper .st-body-table tr td").each(function () {
                var elem = $j(this);
                if (elem.text().toLowerCase().indexOf($j("#txtSearchbox").val().toLowerCase()) >= 0) {
                    elem.parents("tr").show();
                    //elem.parents("tr").addClass("gotValue");

                }
            });
        }
    }
});


$j(document).on("click", "#btnReviseTender", function () {
    if ($j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code")).length > 0) {
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=MAKEAREVISEDVERSION',
            type: 'POST',
            async: false,
            data: {
                NewTenderId: (G() + G() + "-" + G() + "-" + G() + "-" + G() + "-" + G() + G() + G()).toUpperCase(),
                TenderIdToBeCopied: $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code")),
            },
            success: function (data) {
                if ($jq1.trim(data) == '"true"') {
                    LoadGrid();
                }
                else
                    toastr.error(data, 'Error', { timeOut: 5000 });
            }
        });
    }
});


/***---------------------- EDIT TENDER STARTS -----------------------*/
$j(document).on("click", "#btnEditTender", function () {
    ValidateRows = true;
    ValidateSelectedRecords();
    if (ValidateRows) {
        if ($j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code")).length > 0) {

            var jsonObj = [];
            var customerData = {};
            customerData["UniqueIdentityCode"] = $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code"));
            jsonObj.push(customerData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=CHECKEDITTENDER',
                cache: false,
                async: false,
                data: {
                    data: JSON.stringify(jsonObj)
                },
                dataType: 'html',
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Something went wrong!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        // if ((jsonData[0].CreatedBy == $jq1(".user-information .username").text() && jsonData[0].RoleId == getCookie("RoleId")) || (getCookie("Role") == "Admin" || getCookie("RoleId") == "Sales Manager" || getCookie("Role") == "Tendering Manager")) {

                        if ((jsonData[0].CreatedBy == $jq1(".user-information .username").text() && jsonData[0].RoleId == getCookie("RoleId")) || (getCookie("Role") == "Admin" || getCookie("Role") == "Sales Manager" || getCookie("Role") == "Tendering Manager")) {

                            if ($j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("status")) == "Submitted" || $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("status")) == "Win" || $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("status")) == "Routed" || $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("status")) == "Loss") {
                                if (confirm('This tender item is in submitted status you would not be able to edit it, do you want to view it?') == true) {
                                    window.location.href = "ViewTenderDetails.aspx?code=" + $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code"));
                                }
                            }
                            else {
                                window.location.href = "EditTender.aspx?code=" + $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code"));
                            }
                        }
                        else {
                            toastr.error('You are not authorized to edit this record.!', 'Error', { timeOut: 5000 });
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.success('Profile details saved successfully!', 'Success', { timeOut: 5000 });
                },
            });
        }
        else {
            toastr.error('Please select record.!', 'Error', { timeOut: 5000 });
        }
    }



});

$j(document).on("click", "#btnCopyTender", function () {
    ValidateRows = true;
    ValidateSelectedRecords();
    if (ValidateRows) {
        if ($j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code")).length > 0) {
            window.location.href = "NewTender.aspx?code=" + $j.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code"));
        }
        else {
            toastr.error('Please select record.!', 'Error', { timeOut: 5000 });
        }
    }
});

//$j(document).on("change", ".ClassCheck", function () {
//    if ($j(this).prop("checked") == true) {
//        $j(".tblSnapdown tr").removeClass("clicked");
//        $j(".ClassCheck").prop("checked", false);
//        $j(this).parents("tr").addClass("clicked")
//        $j(this).prop("checked", true);
//    }
//    else {
//        $j(this).parents("tr").removeClass("clicked")
//    }

//});
/***---------------------- EDIT TENDER ENDS -----------------------*/

function RemoveExtraColumns() {
    $jq1("#optional option").each(function () {
        if (this.value == "Id" || this.value == "TenderUniqueId" || this.value == "ModifiedDate" || this.value == "ShowDiscountInDocument" || this.value == "CreatedById" || this.value == "ParentTenderUniqueId" || this.value == "IsChildTender" || this.value == "IsAssignedBackByTenderingTeam" || this.value == "IsDeleted") {
            $jq1(this).remove();
        }
    });
}

function NextClick() {
    PageNo = PageNo + 1;
    LoadGrid();
}

function PreviousClick() {
    PageNo = PageNo - 1;
    LoadGrid();
}

function PagingChange() {
    PageNo = 1;
    LoadGrid();
}

function rowClick(Id) {

    //$jq1('input.ClassCheck').not(this).prop('checked', false);
    //if ($jq1('#chk' + Id).prop("checked") == true) {
    //    $jq1('#chk' + Id).prop("checked", false);
    //    $jq1('#tr' + Id).removeClass('selected');
    //    rowSelectCount -= 1;

    //    if (Cust_Id.indexOf(Id.toString() + ",") != -1) {
    //        Cust_Id = Cust_Id.replace(Id.toString() + ",", '')
    //    }
    //    else if (Cust_Id.indexOf("," + Id.toString()) != -1) {
    //        Cust_Id = Cust_Id.replace("," + Id.toString(), '')
    //    }
    //    else {
    //        Cust_Id = Cust_Id.replace(Id.toString(), '')
    //    }
    //}
    //else {
    //    $jq1('#chk' + Id).prop("checked", true);
    //    $jq1('#tr' + Id).addClass('selected');
    //    rowSelectCount += 1;
    //    if (Cust_Id == "") {
    //        Cust_Id = "" + Id;
    //    }
    //    else {
    //        Cust_Id = Cust_Id + "," + Id;
    //    }
    //}

    //if (rowSelectCount > 1) {
    //    $jq1("#btnEditCustomer").attr("disabled", true);
    //    $jq1("#btnCopyCustomer").attr("disabled", true);
    //}
    //else {
    //    if (EditRights == true) {
    //        $jq1("#btnEditCustomer").attr("disabled", false);
    //    }
    //    if (InsertRights == true) {
    //        $jq1("#btnCopyCustomer").attr("disabled", false);
    //    }
    //}

    //$jq1('#tr' + Id).addClass('selected').siblings().removeClass('selected');
}

function checkRights() {
    var jsonObj = [];
    var customerData = {};
    customerData["Role"] = getCookie("Role");
    customerData["ModuleId"] = 4;
    jsonObj.push(customerData);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=CHECKMODULERIGHTS',
        cache: false,
        async: false,
        data: {
            data: JSON.stringify(jsonObj)
        },
        dataType: 'html',
        success: function (data) {
            if (data == "Error") {

            }
            else {
                var jsonData = JSON.parse(data);
                for (i in jsonData) {
                    if (jsonData[i].Insert == false) {
                        $jq1("#btnAddTender").attr("disabled", true);
                        $jq1("#btnCopyTender").attr("disabled", true);
                    }
                    else {
                        InsertRights = true;
                    }
                    if (jsonData[i].Update == false) {
                        $jq1("#btnEditTender").attr("disabled", true);
                    }
                    else {
                        EditRights = true;
                    }
                    if (jsonData[i].Delete == false) {
                        $jq1("#btnDeleteTender").attr("disabled", true);
                    }
                    else {
                        DeleteRights = true;
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.success('Profile details saved successfully!', 'Success', { timeOut: 5000 });
        },
    });
}

//$j(document).on("click", "#btnDeleteTender", function () {
//    if ($j.trim($j("#tbodyTenderDetails tr.clicked").data("code")).length > 0) {
//        if (confirm('Are you sure you want to delete tender details?') == true) {
//            $j("#tbodyTenderDetails tr.clicked").each(function (i) {
//                //var tenderId = $(this).find("td[data-TenderId]").text();
//                //var projectId = $(this).find("td[data-projectid]").text();
//                var tenderUniqueId = $j.trim($j("#tbodyTenderDetails tr.clicked").data("code"));

//                $j.ajax({
//                    url: 'ServiceHandler.ashx?CBH=DELETETENDER',
//                    cache: false,
//                    async: true,
//                    data: { TenderUniqueId: tenderUniqueId },
//                    dataType: 'json',
//                    success: function (data) {
//                        LoadGrid();
//                    },
//                    error: function (jqXHR, textStatus, errorThrown) {
//                        LoadGrid();
//                        //alert("Error");
//                    }
//                });
//                //$.ajax({
//                //    url: 'ServiceHandler.ashx?CBH=GETTENDERLIST',
//                //    cache: false,
//                //    async: true,
//                //    dataType: 'json',
//                //    success: function (data) {
//                //        var HTMLTableBody = "";
//                //        $.each(data, function (i) {
//                //            var dateOfCreation = new Date(data[i].DateOfCreation);
//                //            var dateOfModification = new Date(data[i].ModifiedDate);
//                //            HTMLTableBody += "<tr>";
//                //            HTMLTableBody += "<td data-TenderUniqueId='" + data[i].TenderUniqueId + "'>" + data[i].TenderUniqueId + "</td>";
//                //            HTMLTableBody += "<td><span class='chkboxwrapper'><input type='checkbox' class='chbxSelection' data-rowid='" + data[i].TenderUniqueId + "' /><span class='glyphicon glyphicon-ok'></span></span></td>";
//                //            HTMLTableBody += "<td data-TenderId='" + data[i].TenderId + "'>" + data[i].TenderId + "</td>";
//                //            HTMLTableBody += "<td data-ProjectId='" + data[i].ProjectId + "'>" + data[i].ProjectId + "</td>";
//                //            HTMLTableBody += "<td>" + data[i].Customer + "</td>";
//                //            HTMLTableBody += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
//                //            HTMLTableBody += "<td>" + data[i].CreatedBy + "</td>";
//                //            HTMLTableBody += "<td>" + dateOfModification.getDate() + " " + FormatMonth(dateOfModification.getMonth()) + " " + dateOfModification.getFullYear() + "</td>";
//                //            HTMLTableBody += "</tr>";
//                //        });
//                //        $(".TendersListWrapper table > tbody").html(HTMLTableBody);
//                //        $("#txtSearchbox").attr("data-ColumnName", $("#ddSearchColumns").val());
//                //    }
//                //});
//            });
//        }
//    }
//    else {
//        toastr.error('Please select record.!', 'Error', { timeOut: 5000 });
//    }
//});

//$j(document).on("click", "#btnStatusChanged", function () {
//    if ($j.trim($j("#tbodyTenderDetails tr.clicked").data("code")).length > 0) {
//        $j("#myStatusChangedModal").modal('show');
//    }
//    else {
//        toastr.error('Please select record.!', 'Error', { timeOut: 5000 });
//    }
//});
var ValidateRows = true;

$j(document).on("click", "#btnStatusChanged", function () {
    //if ($j.trim($j("#tbodyTenderDetails tr.clicked").data("code")).length > 0) {
    //    console.log($j("#rbtnInactiveTender:checked").length);
    //    if ($j("#rbtnInactiveTender:checked").length > 0) {

    //        $j("#drpStatusRoleDeActive").val("Select").attr('selected', 'selected');

    //        $j("#myStatusChangedModalDeActive").modal('show');
    //    }
    //    else {
    //        $j("#drpStatusRole").val("Select").attr('selected', 'selected');
    //        $j("#myStatusChangedModal").modal('show');
    //    }
    //}
    //else {
    //    toastr.error('Please select record.!', 'Error', { timeOut: 5000 });
    //}
    ValidateRows = true;
    ValidateSelectedRecords();
    if (ValidateRows) {
        if ($j("#rbtnInactiveTender:checked").length > 0) {

            $j("#drpStatusRoleDeActive").val("Select").attr('selected', 'selected');

            $j("#myStatusChangedModalDeActive").modal('show');
        }
        else {
            $j("#drpStatusRole").val("Select").attr('selected', 'selected');
            $j("#myStatusChangedModal").modal('show');
        }
    }
});

function ValidateSelectedRecords() {
    if ($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").length == 1) {
        var bodyCounter = $j("#TenderDetailGrid > tbody").length;
        var VersionSelectionCount = 0;
        var ItemSelectCount = 0;
        for (var bodyIndex = 0; bodyIndex < bodyCounter; bodyIndex++) {
            if (ValidateRows) {
                $jq1("#tbody_" + bodyIndex + " > tr").each(function () {
                    if ($jq1(this).attr("Id").indexOf("tr_" + bodyIndex + "_Project_") >= 0 && $jq1(this).find('input').prop("checked")) {
                        toastr.error('Please select item only!', 'Error', { timeOut: 5000 });
                        ValidateRows = false;
                        return false;
                    }
                    else if ($jq1(this).attr("Id").indexOf("tr_" + bodyIndex + "_Tender_") >= 0 && $jq1(this).find('input').prop("checked")) {
                        toastr.error('Please select item only!', 'Error', { timeOut: 5000 });
                        ValidateRows = false;
                        return false;
                    }
                    else if ($jq1(this).attr("Id").indexOf("tr_" + bodyIndex + "_Item_") >= 0 && $jq1(this).find('input').prop("checked")) {
                        //toastr.error('Please select item only!', 'Error', { timeOut: 5000 });
                        //ValidateRows = false;
                        //return false;
                        ItemSelectCount += 1;
                        if (ItemSelectCount > 1) {
                            toastr.error('Please select only one item!', 'Error', { timeOut: 5000 });
                            ValidateRows = false;
                            return false;
                        }
                        else {
                            ValidateRows = true;
                        }
                    }
                    else if ($jq1(this).attr("Id").indexOf("tr_" + bodyIndex + "_File_") >= 0 && $jq1(this).find('input').prop("checked")) {
                        VersionSelectionCount += 1;
                        if (VersionSelectionCount > 1) {
                            toastr.error('Please select only one item!', 'Error', { timeOut: 5000 });
                            ValidateRows = false;
                            return false;
                        }
                        else {
                            ValidateRows = true;
                        }
                    }
                    else {

                    }
                })
            }
            else {
                ValidateRows = false;
                return false;
            }
        }
    }
    else {
        if ($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").length == 0) {
            toastr.error('Please select atleast one item!', 'Error', { timeOut: 5000 });
        }
        else {
            toastr.error('Please select only one record!', 'Error', { timeOut: 5000 });
        }
        ValidateRows = false;
        return false;
    }
}

function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function AssignStatus() {

    var ManualStatus = $jq1("#drpStatusRole").val();
    var Note = "";

    if (ManualStatus == "Select") {
        toastr.error('Please select Status.!', 'Information', { timeOut: 5000 });
        return;
    }
    if (ManualStatus == "3") {
        CreateMajorVersionOfTender(ManualStatus);
    }
    if (ManualStatus == "4") {
        Note = $jq1("#notificationMessage").val();
        if (Note == "") {
            toastr.error('Please Enter Loss Reason.!', 'Information', { timeOut: 5000 });
            return;
        }
        else {
            CreateMajorVersionOfTender(ManualStatus);
        }
    }

    if ($jq1.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code")).length > 0) {
        var tenderUniqueId = $jq1.trim($j("#TenderDetailGrid > tbody > tr > td > span > input:checked").data("code"));
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=UPDATESTATUSMANUAL',
            type: 'POST',
            async: false,
            data: {
                TenderUniqueId: tenderUniqueId,
                Message: Note,
                Username: $jq1.trim($jq1("#paraUserName .username").text()),
                Status: ManualStatus,
            },
            success: function (data) {
                $j("#myStatusChangedModal").modal('hide');
                alert("Quote Status Updated... ");
                LoadGrid();
            }
        });
    }

}

function ActiveBudget() {

    var ManualStatus = $jq1("#drpStatusRoleDeActive").val();


    if (ManualStatus == "Select") {
        toastr.error('Please select Status.!', 'Information', { timeOut: 5000 });
        return;
    }

    if ($j.trim($j("#tbodyTenderDetails tr.clicked").data("code")).length > 0) {
        $j("#tbodyTenderDetails tr.clicked").each(function (i) {

            var tenderUniqueId = $j.trim($j("#tbodyTenderDetails tr.clicked").data("code"));

            $j.ajax({
                url: 'ServiceHandler.ashx?CBH=ACTIVETENDERDOCUMENTS',
                cache: false,
                async: true,
                data: { TenderUniqueId: tenderUniqueId },
                dataType: 'json',
                success: function (data) {
                    LoadGrid();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $j("#myStatusChangedModalDeActive").modal('hide');
                    alert("Quote Status Activated... ");
                    LoadGrid();
                    //alert("Error");
                }
            });

        });

    }

}

function getTenderConfiguration() {
    var jsonObj = [];
    var userRole = {};
    userRole["Role"] = getCookie("RoleId");
    jsonObj.push(userRole);
    $j.ajax({
        url: 'ServiceHandler.ashx?CBH=LOADTENDERCONFIGURATION',
        cache: false,
        async: false,
        dataType: 'html',
        data: {
            data: JSON.stringify(jsonObj)
        },
        success: function (data) {
            if (data == "Error") {
                toastr.error('Count not load module list!', 'Error', { timeOut: 5000 });
            }
            else {
                var jsonData = JSON.parse(data);
                $j("#chkAllowFirmTender").prop("checked", false);
                $j("#chkLossAndWin").prop("checked", false);
                for (i in jsonData) {
                    if (jsonData[i].ChangeStatus == false) {
                        $j("#drpStatusRole option").each(function () {
                            if (this.text == "Win" || this.text == "Loss") {
                                $j(this).remove();
                            }
                        });
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
            document.getElementById("loadingDiv").style.display = "none";
        },
    });
}



function CreateMajorVersionOfTender(Status) {
    var TenderType;
    if ($jq1.trim(Status) == "3") {
        TenderType = 1;
    }
    else {
        TenderType = 0;
    }

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=CREATEAMAJORVERSION',
        type: 'POST',
        async: false,
        data: {
            TenderType: TenderType,
            TenderUniqueId: $jq1.trim((G() + G() + "-" + G() + "-" + G() + "-" + G() + "-" + G() + G() + G()).toUpperCase()),
            TenderToBeCopied: $jq1.trim($jq1(".ClassCheck:checked").data("code")),
            UserRole: $jq1.trim($jq1(".user-information .role").data("roleid")),
            CreatedByName: $jq1("#paraUserName .username").text(),
            CreatedById: $jq1("#paraUserName").data("loginuserid")
        },
        success: function (data) {
            alert(data);
        }
    });
}

var GridCounter = 0;
function LoadGrid() {
    getUserName();
    var jsonObj = [];
    var customerData = {};
    customerData["PageNo"] = PageNo;
    customerData["PageSize"] = $jq1("#drpPageSize option:selected").text();
    customerData["SearchText"] = $jq1("#txtSearchbox").val();
    customerData["SortingColumn"] = SortingColumn;
    customerData["SortingOrder"] = SortingOrder;
    customerData["UserName"] = getCookie("UserName");
    customerData["FilterOption"] = FilterOption;
    customerData["LocationId"] = getCookie("LocationId");
    customerData["Role"] = getCookie("Role");
    customerData["DisplayName"] = $jq1(".user-information .username").text();
    if ($j("#rbtnActiveTender").prop("checked") == true) {
        customerData["IsDeleted"] = 0;
    }
    else {
        customerData["IsDeleted"] = 1;
    }
    jsonObj.push(customerData);

    var jsonObj1 = [];
    var customerData1 = {};
    $jq1('#FilterControls').find('div').each(function () {
        $jq1(this).find('select').each(function () {
            if (this[this.options.selectedIndex].text != "----Select----") {
                if ($jq1.trim($jq1(this).next('input').val()) != "") {
                    customerData1[this[this.options.selectedIndex].text] = $jq1(this).next('input').val();
                }
                else {
                    toastr.error('Please enter filter text!', 'Error', { timeOut: 5000 });
                    return;
                }
            }
            else {

            }
        });
    });
    jsonObj1.push(customerData1);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=LOADTENDERDETAILS1',
        cache: false,
        async: false,
        dataType: 'html',
        data: {
            data: JSON.stringify(jsonObj),
            data1: JSON.stringify(jsonObj1)
        },
        success: function (data) {

            if (data == "Error") {
                toastr.error('Something went wrong!', 'Error', { timeOut: 5000 })
                return false;
            }
            else {
                var ProjectJsonData = JSON.parse(data);
                var GridString = "";

                var tableHeader = "<tr><th style='width: 4.8% !important; padding-bottom: 10px !important; padding-top: 10px !important;'>Select</th>";
                var columnCount = ProjectJsonData.Table4.length;
                var width = 95.2 / columnCount;
                columnCount = columnCount + 1;

                tableHeader += "<th style='width: " + width + "% !important; min-width: 220px; cursor: pointer;' onclick='SortRecords(&quot;ProjectId&quot;)'>";
                tableHeader += "<span class='sortImage'><img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'></span><span class='text'>ProjectId<span></th>";

                tableHeader += "<th style='width: " + width + "% !important; min-width: 220px; cursor: pointer;' onclick='SortRecords(&quot;TenderId&quot;)'>";
                tableHeader += "<span class='sortImage'><img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'></span><span class='text'>TenderId</span></th>";

                tableHeader += "<th style='width: " + width + "% !important; min-width: 220px; cursor: pointer;' onclick='SortRecords(&quot;ItemId&quot;)'>";
                tableHeader += "<span class='sortImage'><img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'></span><span class='text'>ItemId</span></th>";

                tableHeader += "<th style='width: " + width + "% !important; cursor: pointer;'>";
                tableHeader += "<span class='sortImage'><img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'></span><span class='text'>Major Version</span></th>";

                tableHeader += "<th style='width: " + width + "% !important; cursor: pointer;'>";
                tableHeader += "<span class='sortImage'><img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'></span><span class='text'>Minor Version</span></th>";

                //tableHeader += "<th style='width: " + width + "% !important; cursor: pointer;'>";
                //tableHeader += "<span class='sortImage'><img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'></span><span class='text'>Versioned Item Id</span></th>";

                for (ColumnIndex in ProjectJsonData.Table4) {
                    if (ProjectJsonData.Table4[ColumnIndex].ColumnName != "ProjectId" && ProjectJsonData.Table4[ColumnIndex].ColumnName != "TenderId" && ProjectJsonData.Table4[ColumnIndex].ColumnName != "ItemId") {
                        tableHeader += "<th style='width: " + width + "% !important; cursor: pointer;' onclick='SortRecords(&quot;" + ProjectJsonData.Table4[ColumnIndex].ColumnName + "&quot;)'>";
                        tableHeader += "<span  class='sortImage'><img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'></span><span class='text'>" + ProjectJsonData.Table4[ColumnIndex].ColumnName + "</span></th>";
                    }
                }
                tableHeader += "<th>";
                tableHeader += "<img src='Images/GearIcon.png' data-toggle='modal'  data-target='#ColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px;float: right' title='Edit Columns'>";
                tableHeader += "<img src='Images/FilterIcon.png' data-toggle='modal' data-target='#FilterColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px;float: right' title='Filter Columns'> </th>";
                tableHeader += "</th></tr>";

                $jq1("#theadTenderDetails").html(tableHeader);

                var ColumnCounts = ProjectJsonData.Table3[0].ColumnCounts + 5;
                var ColumnCountsTender = (ProjectJsonData.Table3[0].ColumnCounts + 4);
                var ColumnCountsItem = (ProjectJsonData.Table3[0].ColumnCounts);

                if (ProjectJsonData.Table1[0].Records > 0) {
                    for (ProjectIndex in ProjectJsonData.Table) {
                        GridString = GridString + "<tbody id='tbody_" + GridCounter + "'> <tr ";

                        if (ProjectJsonData.Table2.length > 0) {
                            GridString = GridString + " data-tendercounts='" + ProjectJsonData.Table2[ProjectIndex].TenderCount + "' ";
                        }
                        else {
                            GridString = GridString + " data-tendercounts='0' ";
                        }

                        GridString = GridString + " data-counter='" + GridCounter + "' class='parent-row_1 ProjectClass' id='tr_" + GridCounter + "_Project_" + ProjectJsonData.Table[ProjectIndex].ProjectId + "'><td style='text-align: center'><span class='chbx'><input data-delete='project' data-projectid='" + ProjectJsonData.Table[ProjectIndex].ProjectId + "' class='ClassCheck' type='checkbox' onclick='chkProjectClick(this," + GridCounter + ",&quot;" + ProjectJsonData.Table[ProjectIndex].ProjectId + "&quot;,event)' id='chk_" + GridCounter + "_Project_" + ProjectJsonData.Table[ProjectIndex].ProjectId + "' /><span class='checkbox'></span></span></td><td colspan='" + ColumnCounts + "' style='vertical-align: middle;'><i class='arrow-down'></i>" + ProjectJsonData.Table[ProjectIndex].ProjectId + "</td></tr>";

                        var TenderjsonObj = [];
                        var tendersData = {};
                        tendersData["ProjectId"] = ProjectJsonData.Table[ProjectIndex].ProjectId;
                        tendersData["DisplayName"] = $jq1(".user-information .username").text();
                        tendersData["FilterOption"] = FilterOption;
                        if ($j("#rbtnActiveTender").prop("checked") == true) {
                            tendersData["IsDeleted"] = 0;
                        }
                        else {
                            tendersData["IsDeleted"] = 1;
                        }
                        TenderjsonObj.push(tendersData);

                        $jq1.ajax({
                            url: 'ServiceHandler.ashx?CBH=LOADTENDERDISTINCTTENDERS',
                            cache: false,
                            async: false,
                            dataType: 'html',
                            data: {
                                data: JSON.stringify(TenderjsonObj)
                            },
                            success: function (Tenderdata) {
                                var TenderJsonData = JSON.parse(Tenderdata);
                                for (TenderIndex in TenderJsonData.Table) {
                                    GridString = GridString + "<tr data-parentprojectid='" + ProjectJsonData.Table[ProjectIndex].ProjectId + "'";

                                    if (TenderJsonData.Table1.length > 0) {
                                        GridString = GridString + " data-itemcounts='" + TenderJsonData.Table1[TenderIndex].ItemCount + "' ";
                                    }
                                    else {
                                        GridString = GridString + " data-itemcounts='0' ";
                                    }
                                    GridString = GridString + " data-counter='" + GridCounter + "' style='display:none' class='parent-row_1 TenderClass' id='tr_" + GridCounter + "_Tender_" + TenderJsonData.Table[TenderIndex].TenderId + "'><td style='text-align: center'><span class='chbx'><input data-delete='tender' data-tenderid='" + TenderJsonData.Table[TenderIndex].TenderId + "' class='ClassCheck' type='checkbox' onclick='chkTenderClick(this," + GridCounter + ",&quot;" + TenderJsonData.Table[TenderIndex].TenderId + "&quot;,event)' id='chk_" + GridCounter + "_Tender_" + TenderJsonData.Table[TenderIndex].TenderId + "' /><span class='checkbox'></span></span></td><td></td><td colspan='" + ColumnCountsTender + "' style='vertical-align: middle;'> <i class='arrow-down'></i>" + TenderJsonData.Table[TenderIndex].TenderId + "</td></tr>";

                                    var ItemsjsonObj = [];
                                    var itemData = {};
                                    itemData["ProjectId"] = ProjectJsonData.Table[ProjectIndex].ProjectId;
                                    itemData["TenderId"] = TenderJsonData.Table[TenderIndex].TenderId;
                                    itemData["DisplayName"] = $jq1(".user-information .username").text();
                                    itemData["FilterOption"] = FilterOption;
                                    itemData["UserName"] = getCookie("UserName");
                                    if ($j("#rbtnActiveTender").prop("checked") == true) {
                                        itemData["IsDeleted"] = 0;
                                    }
                                    else {
                                        itemData["IsDeleted"] = 1;
                                    }
                                    ItemsjsonObj.push(itemData);

                                    $jq1.ajax({
                                        url: 'ServiceHandler.ashx?CBH=LOADTENDERDISTINCTITEMS',
                                        cache: false,
                                        async: false,
                                        dataType: 'html',
                                        data: {
                                            data: JSON.stringify(ItemsjsonObj)
                                        },
                                        success: function (Itemdata) {
                                            var ItemJsonData = JSON.parse(Itemdata);
                                            for (ItemIndex in ItemJsonData.Table) {
                                                for (FileIndex in ItemJsonData.Table2) {
                                                    GridString = GridString + "<tr data-parentprojectid='" + ProjectJsonData.Table[ProjectIndex].ProjectId + "'";

                                                    if (ItemJsonData.Table1.length > 0) {
                                                        GridString = GridString + " data-versioncounts='" + ItemJsonData.Table1[0].VersionCount + "' ";
                                                    }
                                                    else {
                                                        GridString = GridString + " data-versioncounts='0' ";
                                                    }

                                                    GridString += " data-parenttenderid='" + TenderJsonData.Table[TenderIndex].TenderId + "' data-counter='" + GridCounter + "' style='display:none' class='parent-row_1 ItemClass' id='tr_" + GridCounter + "_Item_" + ItemJsonData.Table[ItemIndex].ItemId + "'><td style='text-align: center'><span class='chbx'><input data-status='" + ItemJsonData.Table2[ItemIndex]["Status"] + "' data-delete='item' data-code='" + ItemJsonData.Table2[ItemIndex]["TenderUniqueId"] + "' data-itemid='" + ItemJsonData.Table[ItemIndex].ItemId + "' class='ClassCheck' type='checkbox' onclick='chkItemClick(this," + GridCounter + ",&quot;" + ItemJsonData.Table[ItemIndex].ItemId + "&quot;,event)' id='chk_" + GridCounter + "_Item_" + ItemJsonData.Table[ItemIndex].ItemId + "' /><span class='checkbox'></span></span></td><td></td><td></td><td style='vertical-align: middle;'> <i class='arrow-down'></i>" + ItemJsonData.Table[ItemIndex].ItemId + "</td><td>" + ItemJsonData.Table[ItemIndex].MajorVersion + "</td><td> " + ItemJsonData.Table[ItemIndex].MinorVersion + "</td>";
                                                    for (VersionColumnIndex in ProjectJsonData.Table4) {
                                                        if (ProjectJsonData.Table4[VersionColumnIndex].ColumnName != "ProjectId" && ProjectJsonData.Table4[VersionColumnIndex].ColumnName != "TenderId" && ProjectJsonData.Table4[VersionColumnIndex].ColumnName != "ItemId") {
                                                            GridString = GridString + "<td>" + ItemJsonData.Table2[FileIndex][ProjectJsonData.Table4[VersionColumnIndex].ColumnName] + "</td>";
                                                        }
                                                    }
                                                    GridString = GridString + "<td></td></tr>";
                                                }

                                                var FilejsonObj = [];
                                                var fileData = {};
                                                fileData["ProjectId"] = ProjectJsonData.Table[ProjectIndex].ProjectId;
                                                fileData["TenderId"] = TenderJsonData.Table[TenderIndex].TenderId;
                                                fileData["ItemId"] = ItemJsonData.Table[ItemIndex].ItemId;
                                                fileData["UserName"] = getCookie("UserName");
                                                fileData["DisplayName"] = $jq1(".user-information .username").text();
                                                fileData["FilterOption"] = FilterOption;
                                                if ($j("#rbtnActiveTender").prop("checked") == true) {
                                                    fileData["IsDeleted"] = 0;
                                                }
                                                else {
                                                    fileData["IsDeleted"] = 1;
                                                }
                                                FilejsonObj.push(fileData);
                                                $jq1.ajax({
                                                    url: 'ServiceHandler.ashx?CBH=LOADTENDERDISTINCTITEMVERSIONS',
                                                    cache: false,
                                                    async: false,
                                                    dataType: 'html',
                                                    data: {
                                                        data: JSON.stringify(FilejsonObj)
                                                    },
                                                    success: function (FilesData) {
                                                        var FilesJsonData = JSON.parse(FilesData);
                                                        for (FileIndex in FilesJsonData) {
                                                            GridString = GridString + "<tr data-parentprojectid='" + ProjectJsonData.Table[ProjectIndex].ProjectId + "' data-parenttenderid='" + TenderJsonData.Table[TenderIndex].TenderId + "' data-parentitemid='" + ItemJsonData.Table[ItemIndex].ItemId + "'  data-counter='" + GridCounter + "' style='display:none' id='tr_" + GridCounter + "_File_" + FilesJsonData[FileIndex].Id + "'><td style='text-align: center'><span class='chbx'><input data-status='" + FilesJsonData[FileIndex]["Status"] + "' data-code='" + FilesJsonData[FileIndex]["TenderUniqueId"] + "'  class='ClassCheck' type='checkbox' data-parentitemid='tr_" + GridCounter + "_Item_" + ItemJsonData.Table[ItemIndex].ItemId + "' data-delete='file' data-fileid='" + FilesJsonData[FileIndex].Id + "' id='chk" + GridCounter + "_File_" + FilesJsonData[FileIndex].Id + "' /><span class='checkbox'></span></span></td><td></td><td></td><td></td><td>" + FilesJsonData[FileIndex]["MajorVersion"] + "</td><td>" + FilesJsonData[FileIndex]["MinorVersion"] + "</td>";
                                                            //GridString = GridString + "<td>" + FilesJsonData[FileIndex]["ItemId"] + "</td>";
                                                            for (VersionColumnIndex in ProjectJsonData.Table4) {
                                                                if (ProjectJsonData.Table4[VersionColumnIndex].ColumnName != "ProjectId" && ProjectJsonData.Table4[VersionColumnIndex].ColumnName != "TenderId" && ProjectJsonData.Table4[VersionColumnIndex].ColumnName != "ItemId") {
                                                                    GridString = GridString + "<td>" + FilesJsonData[FileIndex][ProjectJsonData.Table4[VersionColumnIndex].ColumnName] + "</td>";
                                                                }
                                                            }
                                                            GridString = GridString + "<td></td></tr>";
                                                        }
                                                    },
                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                        //alert(textStatus + " " + errorThrown);
                                                    },
                                                });
                                            }
                                        },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                            //alert(textStatus + " " + errorThrown);
                                        },
                                    });
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //alert(textStatus + " " + errorThrown);
                            },
                        });

                        GridCounter += 1;
                        GridString += "</tbody>";
                    }
                }
                else {

                }

                $jq1("#TenderDetailGrid > tbody").remove();
                $jq1("#theadTenderDetails").after(GridString);


                var TotalPages = Math.ceil(ProjectJsonData.Table1[0].Records / $jq1("#drpPageSize option:selected").text());
                var Start = (($jq1("#drpPageSize option:selected").text() * PageNo) - $jq1("#drpPageSize option:selected").text()) + 1;

                if (ProjectJsonData.Table1[0].Records < ($jq1("#drpPageSize option:selected").text() * PageNo)) {
                    Start = Start + " - " + ProjectJsonData.Table1[0].Records;
                }
                else {
                    Start = Start + " - " + ($jq1("#drpPageSize option:selected").text() * PageNo);
                }
                $jq1("#lblStart").text(Start + " of ");
                $jq1("#lblEnd").text(ProjectJsonData.Table1[0].Records);

                if (PageNo == TotalPages) {
                    //disable next
                    $jq1("#btnNext").attr("disabled", true);
                }
                else {
                    //enable next
                    $jq1("#btnNext").attr("disabled", false);
                }

                if (PageNo == 1) {
                    //disable previous
                    $jq1("#btnPrevious").attr("disabled", true);
                }
                else {
                    //enable previous
                    $jq1("#btnPrevious").attr("disabled", false);
                }
                //$jq1('#tbodyTenderDetails').html("");
                //$jq1('#tbodyTenderDetails').html(GridString);
            }
        }
    });
}


function chkItemClick(elem, CounterValue, ClickedItemId, e) {
    e.stopPropagation();
    //var elem = $jq1(this);
    //var clickedItemId = "tr_" + CounterValue + "_Item_" + ClickedItemId;
    var clickedItemId = elem.id.replace("chk", "tr");
    $jq1("#tbody_" + CounterValue + " > tr").each(function () {
        var parendtItemId = "tr_" + CounterValue + "_Item_" + $jq1(this).data("parentitemid");
        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId == parendtItemId) {
            $jq1(this).find('input').prop("checked", elem.checked)
        }
    })
}

function chkTenderClick(elem, CounterValue, ClickedItemId, e) {
    e.stopPropagation();
    var clickedTenderId = elem.id.replace("chk", "tr");
    $jq1("#tbody_" + CounterValue + " > tr").each(function () {
        var parendtTenderId = "tr_" + CounterValue + "_Tender_" + $jq1(this).data("parenttenderid");
        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0 && clickedTenderId == parendtTenderId) {

            var clickedItemId = $jq1(this).attr("id");
            $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                var parendtItemId = "tr_" + CounterValue + "_Item_" + $jq1(this).data("parentitemid");
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId == parendtItemId) {
                    $jq1(this).find('input').prop("checked", elem.checked)
                }
            })

            $jq1(this).find('input').prop("checked", elem.checked)
        }
    })
}

function chkProjectClick(elem, CounterValue, ClickedItemId, e) {
    e.stopPropagation();
    var clickedProjectId = elem.id.replace("chk", "tr");
    $jq1("#tbody_" + CounterValue + " > tr").each(function () {
        var parendtProjectId = "tr_" + CounterValue + "_Project_" + $jq1(this).data("parentprojectid");
        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Tender_") >= 0 && clickedProjectId == parendtProjectId) {

            var clickedTenderId = $jq1(this).attr("id");
            $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                var parendtTenderId = "tr_" + CounterValue + "_Tender_" + $jq1(this).data("parenttenderid");
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0 && clickedTenderId == parendtTenderId) {

                    var clickedItemId = $jq1(this).attr("id");
                    $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                        var parendtItemId = "tr_" + CounterValue + "_Item_" + $jq1(this).data("parentitemid");
                        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId == parendtItemId) {
                            $jq1(this).find('input').prop("checked", elem.checked)
                        }
                    })

                    $jq1(this).find('input').prop("checked", elem.checked)
                }
            })
            $jq1(this).find('input').prop("checked", elem.checked)
        }
    })
}

function DeleteClick() {
    for (var i = 0; i < GridCounter; i++) {
        $jq1("#tbody_" + i + " > tr").each(function () {
            if ($jq1(this).find('input').prop("checked")) {
                if ($jq1(this).find('input').data("delete") == "project") {
                    DeleteDocuments('Project', $jq1(this).find('input').data("projectid"), "", "", "");
                }
                else if ($jq1(this).find('input').data("delete") == "tender") {
                    DeleteDocuments('Tender', $jq1(this).data("parentprojectid"), $jq1(this).find('input').data("tenderid"), "", "");
                }
                else if ($jq1(this).find('input').data("delete") == "item") {
                    DeleteDocuments('Item', $jq1(this).data("parentprojectid"), $jq1(this).data("parenttenderid"), $jq1(this).find('input').data("itemid"), "");
                }
                else if ($jq1(this).find('input').data("delete") == "file") {
                    DeleteDocuments('File', $jq1(this).data("parentprojectid"), $jq1(this).data("parenttenderid"), $jq1(this).data("parentitemid"), $jq1(this).find('input').data("fileid"));
                }
            }
        })
    }
    LoadGrid();
    toastr.success('Deleted successfully!', 'Success', { timeOut: 5000 });
}

function DeleteDocuments(DeleteFrom, ProjectId, TenderId, ItemId, Id) {
    //document.getElementById("loadingDiv").style.display = "block";
    var jsonObj = [];
    var FileData = {};

    FileData["DeleteFrom"] = DeleteFrom;
    FileData["ProjectId"] = ProjectId;
    FileData["TenderId"] = TenderId;
    FileData["Itemid"] = ItemId;
    FileData["FileId"] = Id;

    jsonObj.push(FileData);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=DELETETENDERS',
        cache: false,
        async: false,
        dataType: 'html',
        data: {
            data: JSON.stringify(jsonObj)
        },
        success: function (data) {
            if (data == "Error") {
                toastr.error('Count not delete the document!', 'Error', { timeOut: 5000 });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
        },
    });
    //document.getElementById("loadingDiv").style.display = "none";
}