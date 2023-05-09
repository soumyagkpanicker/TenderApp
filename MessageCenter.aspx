<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="MessageCenter.aspx.cs" Inherits="MessageCenter" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <%--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>--%>

    <link href="Content/toastr/toastr.css" rel="stylesheet" />
    <link href="Content/css/Loader.css" rel="stylesheet" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

    <link href="Content/css/SelectListBox/Common_Material.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.Mobile.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.css" rel="stylesheet" />
    <script src="Scripts/SelectListBox/SelectListBox.js"></script>

    <script src="Scripts/SelectListBox/ColumnFilter.js"></script>
    <link href="Content/css/SelectListBox/ColumnFilter.css" rel="stylesheet" />
    <div id="loadingDiv">
        <div id="loader"></div>
    </div>
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog" style="margin-top: 100px;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="font-size: 18px">Edit Message</h4>
                </div>
                <div class="modal-body" style="font-size: 12px">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="vertical-align: middle; padding-left: 0px; font-size: 15px;">Message:
                            </td>
                            <td style="padding: 0px;">
                                <textarea rows="4" cols="40" maxlength="250" style="max-height: 86px; min-height: 86px; max-width: 450px; min-width: 450px; line-height: normal;" id="txtMessageText"></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="SaveMessage();">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ColumnSelection" role="dialog" style="width: 100%;">
        <div class="modal-dialog" style="margin-top: 100px; width: 41%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" onclick="LoadGrid();">&times;</button>
                    <h4 class="modal-title" style="font-size: 18px">Select Columns for Grid</h4>
                </div>
                <div class="modal-body" style="font-size: 12px">
                    <div id="example" role="application">
                        <div class="demo-section k-content">
                            <div id="ColumnListBox">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="btnSaveDefaultCustomers" onclick="SaveDefaultColumns('tblMessages');LoadGrid();" style="float: left; background-color: #5cb85c; color: white">Default Columns</button>
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="SaveColumns('tblMessages');LoadGrid();">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="Button2" onclick="LoadGrid();">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="FilterColumnSelection" role="dialog" style="width: 100%;">
        <div class="modal-dialog" style="margin-top: 100px; width: 41%">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" onclick="LoadGrid();">&times;</button>
                    <h4 class="modal-title" style="font-size: 18px">Filter Columns for Grid</h4>
                </div>
                <div class="modal-body" style="font-size: 12px">
                    <div id="example1" role="application">
                        <div class="demo-section k-content">
                            <div>
                                <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="AddNewRow();">Add New Filter</button>
                                <br />
                            </div>
                        </div>
                        <div id="FilterControls">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="ApplyFilter();">Apply</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="Button1" onclick="LoadGrid();">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row" style="margin-top: 5px; margin-left: 0.5%; width: 100% !important;">
        <div class="action-panel" style="width: 100%; margin-bottom: 10px">
            <ul>
                <li>
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px" id="btnEditMessage" onclick="EditClick();">Edit Message </button>
                </li>
            </ul>
        </div>
        <table style="width: 100% !important; border-collapse: collapse; font-size: 14px;"
            cellspacing="0" cellpadding="0">
            <tr>
                <td colspan="4">
                    <table cellspacing="0" cellpadding="0" style="width: 660px !important; margin-left: -0.5%">
                        <tr>
                            <td style="max-width: 350px; padding: 7px 5px;">Search :
                                <input type="text" maxlength="100" id="txtSearch" style="width: 74%" onkeyup="LoadGrid();" onpaste="LoadGrid();" />
                            </td>
                            <%-- <td style="max-width: 100px; padding: 7px 5px;">Search From
                            </td>
                            <td style="max-width: 210px">
                                <select id="drpSearchColumn" class="form-control" onchange="LoadGrid();" style="width: 96%; display: inline-block">
                                    <option value="0">Message</option>
                                    <option value="1">Sender</option>
                                    <option value="2">Location</option>
                                </select>
                            </td>--%>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <hr />
                    <table id="MessageCenter" class="display" style="width: 100%; max-width: 100%; cursor: pointer; border-collapse: collapse; border-color: black !important; border: solid 2px;" rules="rows" rules="cols">
                        <thead id="MessageInHeader">
                        </thead>
                        <tbody id="MessageInBody">
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="width: 100%">
                    <table style="max-width: 400px; float: right">
                        <tr>
                            <td style="max-width: 30px;">Page Size: 
                            </td>
                            <td style="max-width: 30px;">
                                <select id="drpPageSize" class="form-control" onchange="PagingChange();" style="width: 100%; display: inline-block">
                                    <option value="0">10</option>
                                    <option value="1">20</option>
                                    <option value="2">30</option>
                                    <option value="3">40</option>
                                    <option value="4">50</option>
                                </select>
                            </td>
                            <td style="max-width: 30px;">
                                <label id="lblStart"></label>
                                <label id="lblEnd"></label>
                            </td>
                            <td style="max-width: 28px; padding: 0px !important;">
                                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px; width: 40px" id="btnPrevious" onclick="PreviousClick();">< </button>
                                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px; width: 40px" id="btnNext" onclick="NextClick();">> </button>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

    </div>

    <style>
        table {
            width: 100%;
            margin-top: 0px;
        }

        th {
            text-align: left;
            padding: 7px 9px !important;
            font-size: 14px;
        }

        th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #091540 !important;
            color: white;
            font-size: 16px;
        }

        td {
            padding: 5px 7px !important;
        }

        .trClass {
        }

        .tdClass {
            font-size: 14px;
        }

        .hrClass {
            -moz-border-bottom-colors: none;
            -moz-border-image: none;
            -moz-border-left-colors: none;
            -moz-border-right-colors: none;
            -moz-border-top-colors: none;
            border-style: solid none;
            margin-bottom: 0px;
            margin-top: 0px;
            width: 109.6%;
        }

        .imgClass {
            width: 20px;
            height: 20px;
        }

        .selected {
            background-color: #BDC3C7 !important;
            vertical-align: middle;
            padding: 1.5em;
        }

        input[type=text], textarea {
            width: 100%;
            padding: 6px 12px;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        hr {
            -moz-border-bottom-colors: none;
            -moz-border-image: none;
            -moz-border-left-colors: none;
            -moz-border-right-colors: none;
            -moz-border-top-colors: none;
            border-style: solid none;
            margin-bottom: 10px;
            margin-top: -9px;
        }
    </style>
    <script>
        var MessageId = 0;
        var PageNo = 1;
        var SortingOrder = "Asc";
        var SortingColumn = "Id";
        var rowSelectCount = 0;

        var InsertRights = false;
        var EditRights = false;
        var DeleteRights = false;


        $jq1(document).ready(function () {
            LoadColumnList('tblMessages');

            LoadGrid();
            document.getElementById("loadingDiv").style.display = "none";

            checkRights();
        });

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

        function RemoveExtraColumns() {
            $jq1("#optional option").each(function () {
                if (this.value == "MarkAsRead" || this.value == "UserName" || this.value == "UserRole" || this.value == "Id") {
                    $jq1(this).remove();
                }
            });
        }

        function LoadGrid() {
            document.getElementById("loadingDiv").style.display = "block";
            var jsonObj = [];
            var customerData = {};
            customerData["PageNo"] = PageNo;
            customerData["PageSize"] = $jq1("#drpPageSize option:selected").text();
            customerData["UserName"] = getCookie("UserName");
            customerData["SearchText"] = $jq1("#txtSearch").val();
            customerData["SortingColumn"] = SortingColumn;
            customerData["SortingOrder"] = SortingOrder;
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
                        toastr.error('Please select filter column!', 'Error', { timeOut: 5000 });
                        return;
                    }
                });
            });
            jsonObj1.push(customerData1);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETMESSAGEGRID',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj),
                    data1: JSON.stringify(jsonObj1)
                },
                success: function (data) {
                    var jsonData = JSON.parse(data);
                    var tblMessages = "";

                    var tableHeader = "<tr><th style='width: 2%; padding-bottom: 10px !important; padding-top: 10px !important;'>Select</th>";
                    var Counter = 0;
                    for (j in jsonData.Table2) {
                        if (jsonData.Table2[j].ColumnName == 'Message') {
                            tableHeader += "<th style='width:35%' onclick='SortRecords(&quot;" + jsonData.Table2[j].ColumnName + "&quot;)'>";
                        }
                        else {
                            tableHeader += "<th onclick='SortRecords(&quot;" + jsonData.Table2[j].ColumnName + "&quot;)'>";
                        }

                        tableHeader += "<img src='Images/sort-arrows.png' style='height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;'>" + jsonData.Table2[j].ColumnName;
                        //if (Counter == (jsonData.Table2.length - 1)) {
                        //    tableHeader += "<img src='Images/GearIcon.png' data-toggle='modal'  data-target='#ColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px;float: right' title='Edit Columns'>"
                        //    tableHeader += "<img src='Images/FilterIcon.png' data-toggle='modal' data-target='#FilterColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px;float: right' title='Filter Columns'> </th>"
                        //}
                        //else {
                        tableHeader += "</th>"
                        //}
                        //Counter += 1;
                    }
                    tableHeader += "<th>Actions<img src='Images/GearIcon.png' data-toggle='modal'  data-target='#ColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px;float: right' title='Edit Columns'><img src='Images/FilterIcon.png' data-toggle='modal' data-target='#FilterColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px;float: right' title='Filter Columns'></th></tr>";
                    $jq1("#MessageInHeader").html(tableHeader);
                    if (jsonData.Table.length > 0) {
                        for (i in jsonData.Table) {
                            tblMessages = tblMessages + "<tr id='tr" + jsonData.Table[i].Id + "' ><td style='text-align: center'><input class='ClassCheck' type='checkbox' onclick='rowClick(" + jsonData.Table[i].Id + ")' id='chk" + jsonData.Table[i].Id + "' /></td>";
                            for (j in jsonData.Table2) {
                                //if (jsonData.Table2[j].ColumnName == 'Date') {
                                //    var dateOfCreation = new Date(jsonData.Table[i][jsonData.Table2[j].ColumnName]);
                                //    tblMessages = tblMessages + "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                                //}
                                //else {
                                tblMessages = tblMessages + "<td>" + jsonData.Table[i][jsonData.Table2[j].ColumnName] + "</td>";
                                //}
                            }
                            tblMessages += "<td style='padding-top: 0px !important; vertical-align: middle !important; text-align: center; '> <div style='cursor: pointer; display: inline-block; color: #337ab7; font-size: 15px;' onclick=MessageRedirect('" + jsonData.Table[i].TenderUniqueId + "')>View Tender</div></td ></tr>";
                            //  
                        }
                    }
                    else {
                        tblMessages = "<tr><td colspan='7' style='text-align: center;padding: 8px !important;'>No Data Found</td></tr>";
                    }

                    var TotalPages = Math.ceil(jsonData.Table1[0].MessageCount / $jq1("#drpPageSize option:selected").text());
                    var Start = (($jq1("#drpPageSize option:selected").text() * PageNo) - $jq1("#drpPageSize option:selected").text()) + 1;

                    if (jsonData.Table1[0].Records < ($jq1("#drpPageSize option:selected").text() * PageNo)) {
                        Start = Start + " - " + jsonData.Table1[0].Records;
                    }
                    else {
                        Start = Start + " - " + ($jq1("#drpPageSize option:selected").text() * PageNo);
                    }

                    $jq1("#lblStart").text(Start + " of ");
                    $jq1("#lblEnd").text(jsonData.Table1[0].MessageCount);

                    if (PageNo == TotalPages) {
                        $jq1("#btnNext").attr("disabled", true);
                    }
                    else {
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

                    $jq1("#MessageInBody").html(tblMessages);
                    document.getElementById("loadingDiv").style.display = "none";
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus + " " + errorThrown);'
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function MessageRedirect(TenderId) {
            $jq1('#noti_Button').trigger("click");
            window.open('ViewTenderDetails.aspx?code=' + TenderId, '_blank');
        }

        function rowClick(Id) {
            //$jq1('input.ClassCheck').not(this).prop('checked', false);
            //$jq1('#chk' + MessageId).prop("checked", false);
            //$jq1('#tr' + Id).addClass('selected').siblings().removeClass('selected');
            //if ($jq1('#chk' + Id).prop("checked") == true) {
            //    $jq1('#chk' + Id).prop("checked", false);
            //}
            //else {
            //    $jq1('#chk' + Id).prop("checked", true);
            //}

            //MessageId = Id;

            if ($jq1('#chk' + Id).prop("checked") == false) {

                $jq1('#tr' + Id).removeClass('selected');
                rowSelectCount -= 1;

                if (MessageId.toString().indexOf(Id.toString() + ",") != -1) {
                    MessageId = MessageId.replace(Id.toString() + ",", '')
                }
                else if (MessageId.indexOf("," + Id.toString()) != -1) {
                    MessageId = MessageId.replace("," + Id.toString(), '')
                }
                else {
                    MessageId = MessageId.replace(Id.toString(), '')
                }
            }
            else {
                $jq1('#tr' + Id).addClass('selected');
                rowSelectCount += 1;
                if (MessageId == "") {
                    MessageId = "" + Id;
                }
                else {
                    MessageId = MessageId + "," + Id;
                }
            }

            if (rowSelectCount > 0 && DeleteRights == true) {
                $jq1("#btnDeleteFiles").removeAttr("disabled");
            }
            else {
                $jq1("#btnDeleteFiles").attr("disabled", "disabled");
            }
        }

        function EditClick() {
            if (MessageId == 0) {
                toastr.error('Please select the record before edit!', 'Error', { timeOut: 5000 })
            }
            else {
                //LoadCustomerData();
                //$jq1('#btnAddCustomer').trigger("click");
                $jq1("#txtMessageText").val($jq1("#td" + MessageId).text());
                $jq1("#myModal").modal('show');
            }
        }

        function SaveMessage() {
            document.getElementById("loadingDiv").style.display = "block";
            if ($jq1("#txtMessageText").val().trim() != "") {
                var jsonObj = [];
                var customerData = {};
                customerData["MessageId"] = MessageId;
                customerData["Message"] = $jq1("#txtMessageText").val();
                jsonObj.push(customerData);

                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=SAVEMESSAGE',
                    cache: false,
                    async: false,
                    dataType: 'html',
                    data: {
                        data: JSON.stringify(jsonObj)
                    },
                    success: function (data) {
                        if (data == "Error") {
                            toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                        }
                        else {
                            var SortingOrder = "Asc";
                            var SortingColumn = "Id";
                            LoadGrid();
                            $jq1('button.close').trigger("click");
                            toastr.success('Message updated successfully!', 'Success', { timeOut: 5000 });
                            //if (Cust_Id == 0) {
                            //    toastr.success('Customer details saved successfully!', 'Success', { timeOut: 5000 });
                            //}
                            //else {
                            //    toastr.success('Customer details updated successfully!', 'Success', { timeOut: 5000 });
                            //   $jq1('#tr' + MessageId).addClass('selected').siblings().removeClass('selected');
                            //}
                            MessageId = 0;
                        }
                        document.getElementById("loadingDiv").style.display = "none";
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert(textStatus + " " + errorThrown);
                        toastr.error('Something went wrong!', 'Success', { timeOut: 5000 });
                        document.getElementById("loadingDiv").style.display = "none";
                    },
                });
            }
            else {
                toastr.error('Please enter the message text!', 'Error', { timeOut: 5000 })
                document.getElementById("loadingDiv").style.display = "none";
            }
        }

        function SortRecords(SortingFor) {
            document.getElementById("loadingDiv").style.display = "block";
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
            document.getElementById("loadingDiv").style.display = "none";
        }

        function AddNewRow() {

            var jsonObj = [];
            var customerData = {};

            customerData["TableName"] = "tblMessages";
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

        function ApplyFilter() {
            LoadGrid();
        }

        function checkRights() {
            var jsonObj = [];
            var customerData = {};
            customerData["Role"] = getCookie("Role");
            customerData["ModuleId"] = 9;
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
                            //if (jsonData[i].Insert == false) {
                            //    $jq1("#btnAddCustomer").attr("disabled", true);
                            //}
                            //else {
                            //    InsertRights = true;
                            //}
                            if (jsonData[i].Update == false) {
                                $jq1("#btnEditMessage").attr("disabled", true);
                            } else {
                                EditRights = true;
                            }


                            //if (jsonData[i].Delete == false) {
                            //    $jq1("#btnDeleteFiles").attr("disabled", true);
                            //}
                            //else {
                            //    DeleteRights = true;
                            //}
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.success('Profile details saved successfully!', 'Success', { timeOut: 5000 });
                },
            });
        }
    </script>
</asp:Content>


