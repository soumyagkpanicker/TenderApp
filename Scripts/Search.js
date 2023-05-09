var PageNo = 1;
var SortingOrder = "Desc";
var SortingColumn = "DateOfCreation";
var rowSelectCount = 0;

var InsertRights = false;
var EditRights = false;
var DeleteRights = false;

$jq1(document).ready(function () {
    LoadColumnList('Tenders');
    LoadGrid();
    checkRights();
});
$jq1(document).on("click", "#btnReset", function () {
    $jq1(".SearchTenderWrapper input[type='text']").each(function () {
        $jq1(this).val('');
    });
});

function RemoveExtraColumns() {
    $jq1("#optional option").each(function () {
        if (this.value == "Id" || this.value == "TenderUniqueId" || this.value == "CustomerId" || this.value == "ModifiedDate" || this.value == "ShowDiscountInDocument" || this.value == "CreatedById" || this.value == "ParentTenderUniqueId" || this.value == "IsChildTender" || this.value == "IsAssignedBackByTenderingTeam" || this.value == "IsDeleted") {
            $jq1(this).remove();
        }
    });
}
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
    customerData["LocationId"] = getCookie("LocationId");
    customerData["Role"] = getCookie("Role");
    customerData["DisplayName"] = $jq1(".user-information .username").text();
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
        url: 'ServiceHandler.ashx?CBH=SEARCHTENDER',
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
                var jsonData = JSON.parse(data);
                var GridString = "";
                if (jsonData.Table1[0].Records > 0) {

                    var tableHeader = "<tr><th style='width: 2%; padding-bottom: 10px !important; padding-top: 10px !important;'>Select</th>";
                    var Counter = 0;
                    for (j in jsonData.Table2) {
                        tableHeader += "<th onclick='SortRecords(&quot;" + jsonData.Table2[j].ColumnName + "&quot;)'>";
                        tableHeader += "<img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'>" + jsonData.Table2[j].ColumnName;
                        if (Counter == (jsonData.Table2.length - 1)) {
                            //tableHeader += "<img src='Images/GearIcon.png' data-toggle='modal'  onclick='EditColumnClick();' data-target='#ColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px;float: right' title='Filter Columns'> </th>"
                            //Akash 
                            tableHeader += "<img src='Images/GearIcon.png' data-toggle='modal'  data-target='#ColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px;float: right' title='Edit Columns'>"
                            tableHeader += "<img src='Images/FilterIcon.png' data-toggle='modal' data-target='#FilterColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px;float: right' title='Filter Columns'> </th>"
                            //Akash
                            //<button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; margin-top: -5px" onclick="EditColumnClick();">Edit Columns</button>
                        }
                        else {
                            tableHeader += "</th>"
                        }
                        Counter += 1;
                    }
                    tableHeader += "</tr>";
                    $jq1("#theadSearch").html(tableHeader);
                    for (i in jsonData.Table) {
                        //GridString = GridString + "<tr id='tr" + jsonData.Table[i].Id + "' onclick='rowClick(" + jsonData.Table[i].Id + ")'><td style='text-align: center'><input class='ClassCheck' type='checkbox' onclick='rowClick(" + jsonData.Table[i].Id + ")' id='chk" + jsonData.Table[i].Id + "' /></td>";
                        GridString = GridString + "<tr class='parent-row' data-code='" + jsonData.Table[i].TenderUniqueId + "' id='tr" + jsonData.Table[i].Id + "'><td style='text-align: center; width: 4.8% !important; min-width:4.8% !important'><i class='arrow-down'></i><span class='chbx'><input class='ClassCheck' type='checkbox' id='chk" + jsonData.Table[i].Id + "' /><span class='checkbox'></span></span></td>";
                        for (j in jsonData.Table2) {
                            //if (jsonData.Table2[j].ColumnName == 'DateOfCreation') {
                            //    var dateOfCreation = new Date(jsonData.Table[i][jsonData.Table2[j].ColumnName]);
                            //    GridString = GridString + "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                            //}
                            //else {
                            GridString = GridString + "<td> <a href='ViewTenderDetails.aspx?code=" + jsonData.Table[i].TenderUniqueId + "' >" + jsonData.Table[i][jsonData.Table2[j].ColumnName] + "</a></td>";
                            //}
                            //GridString = GridString + "<td>" + jsonData.Table[i][jsonData.Table2[j].ColumnName] + "</td>";
                        }
                        GridString = GridString + "</tr>";
                        //$jq1("#lblStart").text((parseInt(i) + 1) + " of ");
                    }
                    var TotalPages = Math.ceil(jsonData.Table1[0].Records / $jq1("#drpPageSize option:selected").text());
                    var Start = (($jq1("#drpPageSize option:selected").text() * PageNo) - $jq1("#drpPageSize option:selected").text()) + 1;

                    if (jsonData.Table1[0].Records < ($jq1("#drpPageSize option:selected").text() * PageNo)) {
                        Start = Start + " - " + jsonData.Table1[0].Records;
                    }
                    else {
                        Start = Start + " - " + ($jq1("#drpPageSize option:selected").text() * PageNo);
                    }
                    $jq1("#lblStart").text(Start + " of ");
                    $jq1("#lblEnd").text(jsonData.Table1[0].Records);

                    if (PageNo == TotalPages) {
                        $jq1("#btnNext").attr("disabled", true);
                    }
                    else {
                        $jq1("#btnNext").attr("disabled", false);
                    }

                    if (PageNo == 1) {
                        $jq1("#btnPrevious").attr("disabled", true);
                    }
                    else {
                        $jq1("#btnPrevious").attr("disabled", false);
                    }
                }
                else {
                    GridString = "<tr><td colspan='9' style='text-align: center;padding: 8px !important;'>No Data Found</td></tr>";

                    $jq1("#lblStart").text("0 - 0 of ");
                    $jq1("#lblEnd").text("0");
                    $jq1("#btnNext").attr("disabled", true);
                    $jq1("#btnPrevious").attr("disabled", true);
                }
                $jq1('#tbodySearch').html("");
                $jq1('#tbodySearch').html(GridString);
            }
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

function SortRecords(SortingFor) {
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
}

function AddNewRow() {

    var jsonObj = [];
    var customerData = {};

    customerData["TableName"] = "Tenders";
    customerData["UserName"] = getCookie("UserName");

    jsonObj.push(customerData);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETCOLUMNNAMES',
        cache: false,
        async: false,
        dataType: 'html',
        data: {
            data: JSON.stringify(jsonObj)
        },
        success: function (data) {
            if (data == "Error") {
                toastr.error('Count not load column list!', 'Error', { timeOut: 5000 });
            }
            else {
                var jsonData = JSON.parse(data);
                var drpColumnList = "";
                var COLUMN_NAME = "";
                var BalnkValue = 0;
                var NotSelectValue = 0;
                var SelectList = new Array();
                ///Not allowed to add more row then columns
                if ($jq1('#FilterControls').find('input:text').length == jsonData.Table.length) {
                    toastr.error('Not allowed to add more row!', 'Warning', { timeOut: 5000 });
                    return;
                }

                ///Not allowed to add New row if select value not set
                if ($jq1('#FilterControls').find('select').length >= 1) {
                    $jq1('#FilterControls').find('select').each(function () {
                        if ($jq1(this).val() == "Select") {
                            toastr.error('Select value inside SelectBox!', 'Warning', { timeOut: 5000 });
                            NotSelectValue++;
                            return;
                        }
                        else {
                            SelectList.push($jq1(this).val());
                        }
                    });
                }

                if (NotSelectValue == 0) {
                    ///Not allowed to add New row if text value not added
                    if ($jq1('#FilterControls').find('input:text').length >= 1) {
                        $jq1('#FilterControls').find('input:text').each(function () {
                            if ($jq1(this).val() == "") {
                                toastr.error('Enter value inside textbox!', 'Warning', { timeOut: 5000 });
                                BalnkValue++;
                                return;
                            }
                        });
                    }
                }

                if (NotSelectValue == 0 && BalnkValue == 0) {

                    if (jsonData.Table.length > 0) {
                        var ddlCustomers = $jq1("<select />");
                        drpColumnList += "<option value='Select'>----Select----</option>";
                        for (i in jsonData.Table) {
                            COLUMN_NAME = jsonData.Table[i].COLUMN_NAME;
                            var FindVal = 0;
                            for (j = 0; j < SelectList.length; j++) {
                                if (SelectList[j] == COLUMN_NAME) {
                                    FindVal = 1;
                                }
                            }
                            if (FindVal == 0)
                                drpColumnList += "<option value=" + COLUMN_NAME + ">" + COLUMN_NAME + "</option>";
                        }
                    }
                    ddlCustomers.append(drpColumnList);
                    ddlCustomers.css("width", "220px");

                    //Reference the container DIV.
                    var dvContainer = $jq1("#FilterControls")

                    //Add the DropDownList to DIV.
                    var div = $jq1("<div />");
                    div.append(ddlCustomers);

                    //Create a Remove Button.
                    var InputBox = $jq1("<input type = 'text' style='width:400px;margin:8px; margin-left:5px; margin-right:5px; margin-top:5px;' value=' '/>");
                    //Add the Remove Buttton to DIV.
                    div.append(InputBox);

                    //var btnRemove = $jq1("<img src='Images/FilterIcon.png' style='height: 18px; title='Filter Columns Add'/>");
                    var btnRemove = $jq1("<input type = 'button' class='btn btn-danger' value = 'Remove' style='margin-bottom:5px;'/>");
                    btnRemove.click(function () {
                        $jq1(this).parent().remove();
                    });

                    //Add the Remove Buttton to DIV.
                    div.append(btnRemove);

                    //Add the DIV to the container DIV.
                    dvContainer.append(div);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
            document.getElementById("loadingDiv").style.display = "none";
        },
    });
}

//function OpenTender(Code) {
//    window.open('EditTender.aspx?code=' + Code, '_blank');
//}

$jq1(document).on("click", "#btnEditTender", function () {
    if ($jq1.trim($jq1("#tbodySearch tr.clicked").data("code")).length > 0) {

        var jsonObj = [];
        var customerData = {};
        customerData["UniqueIdentityCode"] = $jq1.trim($jq1("#tbodySearch tr.clicked").data("code"));
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
                    if (jsonData[0].CreatedBy == $jq1(".user-information .username").text()) {
                        window.location.href = "EditTender.aspx?code=" + $jq1.trim($jq1("#tbodySearch tr.clicked").data("code"));
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
});

$jq1(document).on("click", "#btnCopyTender", function () {
    window.location.href = "NewTender.aspx?code=" + $jq1.trim($jq1("#tbodySearch tr.clicked").data("code"));
});

$jq1(document).on("change", ".ClassCheck", function () {
    if ($jq1(this).prop("checked") == true) {
        $jq1(".tblSnapdown tr").removeClass("clicked");
        $jq1(".ClassCheck").prop("checked", false);
        $jq1(this).parents("tr").addClass("clicked")
        $jq1(this).prop("checked", true);
    }
    else {
        $jq1(this).parents("tr").removeClass("clicked")
    }

});

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