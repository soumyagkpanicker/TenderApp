<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="CustomerManagement.aspx.cs" Inherits="CustomerManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server" style="width: 100%">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <link href="Content/toastr/toastr.css" rel="stylesheet" />
    <link href="Content/css/Loader.css" rel="stylesheet" />

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

    <link href="Content/css/SelectListBox/Common_Material.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.Mobile.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.css" rel="stylesheet" />
    <script src="Scripts/SelectListBox/SelectListBox.js"></script>

    <script src="Scripts/SelectListBox/ColumnFilter.js"></script>
    <link href="Content/css/SelectListBox/ColumnFilter.css" rel="stylesheet" />
    <h1>Customer Management</h1>
    <br />
    <br />
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog" style="margin-top: 100px;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" id="btnCustClose" data-dismiss="modal" onclick="CloseClick();">&times;</button>
                    <h4 class="modal-title" id="headerAddCustomer" style="font-size: 18px">Add New Customer</h4>
                </div>
                <div class="modal-body" style="font-size: 12px">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <td>Customer Name:
                            </td>
                            <td>
                                <input type="text" maxlength="250" id="txtCustomer" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>TItle:
                            </td>
                            <td>
                                <select id="drpGender" class="form-control" style="width: 96%;">
                                    <option value="1">Mr.</option>
                                    <option value="0">Miss.</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>First Name:
                            </td>
                            <td>
                                <input type="text" maxlength="100" id="txtFirstName" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name:
                            </td>
                            <td>
                                <input type="text" maxlength="100" id="txtLastName" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>Email Address:
                            </td>
                            <td>
                                <input type="text" maxlength="100" id="txtEmailId" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>Street/Number:
                            </td>
                            <td>
                                <input type="text" maxlength="100" id="txtStreetNumber" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>City:
                            </td>
                            <td>
                                <input type="text" maxlength="100" id="txtCity" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>Postal Code:
                            </td>
                            <td>
                                <input type="text" maxlength="100" id="txtPostalCode" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>Country:
                            </td>
                            <td>
                                <select id="drpCountry" class="form-control" style="width: 96%;"></select>
                            </td>
                        </tr>
                        <tr>
                            <td>SAP Customer Reference: 
                            </td>
                            <td>
                                <input type="text" maxlength="50" id="txtCustomerReference" style="width: 96%;" />
                            </td>
                        </tr>
                        <tr>
                            <td>Sulzer Account Manager:
                            </td>
                            <td>
                                <input type="text" id="txtTenderingManager" maxlength="100" style="width: 96%;" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; float: left;" id="btnViewEditCustomer" onclick="EnableCustForEdit();">Edit</button>
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" id="btnSaveCustomerDetails" onclick="SaveDetails();">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose" onclick="CloseClick();">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ColumnSelection" role="dialog" style="width: 100%;">
        <div class="modal-dialog" style="margin-top: 100px; width: 41%">
            <!-- Modal content-->
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
                    <button type="button" class="btn btn-default" id="btnSaveDefaultCustomers" onclick="SaveDefaultColumns('tblCustomerInformation');LoadGrid();" style="float: left; background-color: #5cb85c; color: white">Default Columns</button>
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="SaveColumns('tblCustomerInformation');LoadGrid();">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseColumnSelection" onclick="LoadGrid();">Close</button>
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
    <div>
        <table style="width: 100% !important;" cellspacing="0" cellpadding="0">
            <tr>
                <td colspan="4">
                    <table cellspacing="0" cellpadding="0" style="width: 770px !important">
                        <tr>
                            <td style="max-width: 200px">Quick Search :
                                <input type="text" maxlength="100" id="txtSearch" style="width: 74%" onkeyup="LoadGrid();" onpaste="LoadGrid();" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div class="row" style="margin-top: 5px; margin-left: -0.5%; width: 100% !important; max-width: 100%; overflow-x: scroll;" align="center">
        <table style="width: 100% !important;" cellspacing="0" cellpadding="0">
            <tr>
                <td colspan="4">
                    <hr />
                    <table id="CustomerInformation" class="display" style="width: 100%; cursor: pointer; border-collapse: collapse; border-color: black !important; border: solid 2px;">
                        <thead id="CustomerIndoHeader">
                        </thead>
                        <tbody id="CustomerIndoBody">
                        </tbody>
                    </table>
                    <div id="Customer_Pagination">
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div>
        <table>
            <tr>
                <td style="width: 58%" colspan="3">
                    <div class="action-panel" style="width: 100%">
                        <ul>
                            <li>
                                <button type="button" title="Add Customer" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" style="padding: 5px 10px; font-size: 16px" id="btnAddCustomer" onclick="AddCustomerClick();"><span class="glyphicon glyphicon glyphicon-plus"></span></button>
                            </li>
                            <li>
                                <button type="button" title="Edit Customer" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px" id="btnEditCustomer" onclick="EditClick();"><span class="glyphicon glyphicon-edit"></span></button>
                            </li>
                            <li>
                                <button type="button" title="Delete Customer" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px" id="btnDeleteCustomer" onclick="DeleteClick();"><span class="glyphicon glyphicon-remove"></span></button>
                            </li>
                            <li>
                                <button type="button" title="Copy Customer" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px" id="btnCopyCustomer" onclick="CopyCustomer();"><span class="glyphicon glyphicon-copy"></span></button>
                            </li>
                        </ul>
                    </div>
                </td>
                <td style="width: 42%">
                    <table style="max-width: 400px;">
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
    <div id="loadingDiv">
        <div id="loader"></div>
    </div>
    <style>
        @media all (min-width:300px) and (max-width:1200px) {
        }

        .action-panel ul {
            display: table;
        }

            .action-panel ul li {
                display: table-cell;
                padding: 10px 5px;
            }

        .action-panel {
            text-align: left;
        }

            .action-panel ul li:first-child {
                padding-left: 0;
            }

        table {
            width: 100%;
            margin-top: 0px;
        }

        td {
            text-align: left;
            padding: 7px 9px !important;
            font-size: 14px;
        }

        /*tr:nth-child(even) {
            background-color: #f2f2f2;
        }*/

        th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #091540 !important;
            color: white;
            font-size: 14px;
        }

        .selected {
            background-color: #BDC3C7 !important;
            vertical-align: middle;
            padding: 1.5em;
        }

        input[type=text], textarea {
            width: 100%;
            padding: 6px 12px;
            /*margin: 8px 0;*/
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
            /*border-color: black !important;*/
            border-style: solid none;
            /*border-width: 1px 0;*/
            margin-bottom: 10px;
            margin-top: -9px;
        }

        .ClassCheck {
        }
    </style>

    <script type="text/javascript">
        var Cust_Id = "";
        var PageNo = 1;
        var SortingOrder = "Asc";
        var SortingColumn = "Id";
        var rowSelectCount = 0;
        //var isCopy = false;
        var isEditMode = false;
        var ValidateCust = false;

        var InsertRights = false;
        var EditRights = false;
        var DeleteRights = false;

        $jq1(document).ready(function () {
            LoadGrid();
            LoadCountryList();
            LoadColumnList('tblCustomerInformation');
            document.getElementById("loadingDiv").style.display = "none";

            checkRights();
        });

        function RemoveExtraColumns() {
            $jq1("#optional option").each(function () {
                if (this.value == "IsDeleted" || this.value == "UniqueIdentity" || this.value == "Id" || this.value == "FirstName" || this.value == "LastName" || this.value == "Title") {
                    $jq1(this).remove();
                }
            });
        }

        function MoveSelected() {
            drpColumnList = "";
            $jq1("#selected").prev().find('ul > li').each(function () {
                drpColumnList += "<option value=" + this.innerHTML + ">" + this.innerHTML + "</option>";
            });
            $jq1("#selected").html(drpColumnList);
        }

        function LoadGrid() {
            document.getElementById("loadingDiv").style.display = "block";
            var jsonObj = [];
            var customerData = {};
            customerData["PageNo"] = PageNo;
            customerData["PageSize"] = $jq1("#drpPageSize option:selected").text();
            customerData["SearchText"] = $jq1("#txtSearch").val();
            customerData["SortingColumn"] = SortingColumn;
            customerData["SortingOrder"] = SortingOrder;
            customerData["UserName"] = getCookie("UserName");
            jsonObj.push(customerData);

            var jsonObj1 = [];
            var customerData1 = {};
            $jq1('#FilterControls').find('div').each(function () {
                $jq1(this).find('select').each(function () {
                    if (this[this.options.selectedIndex].text != "----Select----") {
                        if ($jq1.trim($jq1(this).next('input').val()) != "") {
                            customerData1[this[this.options.selectedIndex].text] = $jq1(this).next('input').val();
                        }
                        //else {
                        //    toastr.error('Please enter filter text!', 'Error', { timeOut: 5000 });
                        //    return;
                        //}
                    }
                    //else {
                    //    toastr.error('Please select filter column!', 'Error', { timeOut: 5000 });
                    //    return;
                    //}
                });
            });
            jsonObj1.push(customerData1);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADCUSTOMERINFOGRID',
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
                                tableHeader += "</th>"
                            }
                            tableHeader += "<th>";
                            tableHeader += "<img src='Images/GearIcon.png' data-toggle='modal'  data-target='#ColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px;float: right' title='Edit Columns'>"
                            tableHeader += "<img src='Images/FilterIcon.png' data-toggle='modal' data-target='#FilterColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px;float: right' title='Filter Columns'> </th>"
                            tableHeader += "</th></tr>";

                            $jq1("#CustomerIndoHeader").html(tableHeader);
                            for (i in jsonData.Table) {
                                GridString = GridString + "<tr id='tr" + jsonData.Table[i].Id + "' ><td style='text-align: center'><input class='ClassCheck' type='checkbox' onclick='rowClick(" + jsonData.Table[i].Id + ")'  id='chk" + jsonData.Table[i].Id + "' /></td>";
                                for (j in jsonData.Table2) {
                                    GridString = GridString + "<td onclick='ViewCustomer(" + jsonData.Table[i].Id + ")' >" + jsonData.Table[i][jsonData.Table2[j].ColumnName] + "</td>";
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
                                //disable previous
                                $jq1("#btnPrevious").attr("disabled", true);
                            }
                            else {
                                //enable previous
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
                        $jq1('#CustomerIndoBody').html(GridString);
                    }
                    document.getElementById("loadingDiv").style.display = "none";
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus + " " + errorThrown);
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                },
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
            if ($jq1('#chk' + Id).prop("checked") == false) {
                //if (From != "CheckBox") {
                //    $jq1('#chk' + Id).prop("checked", false);
                //}
                $jq1('#tr' + Id).removeClass('selected');
                rowSelectCount -= 1;

                if (Cust_Id.toString().indexOf(Id.toString() + ",") != -1) {
                    Cust_Id = Cust_Id.toString().replace(Id.toString() + ",", '')
                }
                else if (Cust_Id.toString().indexOf("," + Id.toString()) != -1) {
                    Cust_Id = Cust_Id.toString().replace("," + Id.toString(), '')
                }
                else {
                    Cust_Id = Cust_Id.toString().replace(Id.toString(), '')
                }
            }
            else {
                //if (From != "CheckBox") {
                //    $jq1('#chk' + Id).prop("checked", true);
                //}
                $jq1('#tr' + Id).addClass('selected');
                rowSelectCount += 1;
                if (Cust_Id == "") {
                    Cust_Id = "" + Id;
                }
                else {
                    Cust_Id = Cust_Id + "," + Id;
                }
            }

            if (rowSelectCount > 1) {
                $jq1("#btnEditCustomer").attr("disabled", true);
                $jq1("#btnCopyCustomer").attr("disabled", true);
            }
            else {
                if (EditRights == true) {
                    $jq1("#btnEditCustomer").attr("disabled", false);
                }
                if (InsertRights == true) {
                    $jq1("#btnCopyCustomer").attr("disabled", false);
                }
            }

            //$jq1('#tr' + Id).addClass('selected').siblings().removeClass('selected');
        }

        function LoadCountryList() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADCOUNTRYLIST',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    var jsonData = JSON.parse(data);
                    var drpCountry = "<Option value=0>Select</Option>"
                    for (i in jsonData) {
                        drpCountry += "<Option value=" + jsonData[i].LocationId + ">" + jsonData[i].Location + "</Option>";
                    }
                    $jq1("#drpCountry").html(drpCountry);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus + " " + errorThrown);
                },
            });
        }

        function ValidateEmail(email) {
            var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return expr.test(email);
        };

        function ValidateDetails() {
            if ($jq1.trim($jq1("#txtCustomer").val()) == '') {
                toastr.error('Please enter customer!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtFirstName").val()) == '') {
                toastr.error('Please enter first name!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtLastName").val()) == '') {
                toastr.error('Please enter last name!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtEmailId").val()) == '') {
                toastr.error('Please enter email address!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if (!ValidateEmail($jq1("#txtEmailId").val())) {
                toastr.error('Invalid Email Address!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtStreetNumber").val()) == '') {
                toastr.error('Please enter street number!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtCity").val()) == '') {
                toastr.error('Please enter city!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#drpCountry option:selected").val()) == 0) {
                toastr.error('Please select country!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtPostalCode").val()) == '') {
                toastr.error('Please enter postal code!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtCustomerReference").val()) == '') {
                toastr.error('Please enter custormer reference!', 'Error', { timeOut: 5000 })
                return false;
            }
            else if ($jq1.trim($jq1("#txtTenderingManager").val()) == '') {
                toastr.error('Please enter tendering manager!', 'Error', { timeOut: 5000 })
                return false;
            }
            else {
                return true;
            }
        }

        function SaveDetails() {
            if (isEditMode == false) {
                ValidateDuplicate();
            }

            if (ValidateDetails() == true && (ValidateCust == true || Cust_Id != 0 || Cust_Id != "")) {
                document.getElementById("loadingDiv").style.display = "block";
                var jsonObj = [];
                var customerData = {};
                customerData["CustomerId"] = Cust_Id;
                customerData["Customer"] = $jq1("#txtCustomer").val();
                customerData["Gender"] = $jq1("#drpGender option:selected").val();
                customerData["FirstName"] = $jq1("#txtFirstName").val();
                customerData["LastName"] = $jq1("#txtLastName").val();
                customerData["EmailId"] = $jq1("#txtEmailId").val();
                customerData["StreetNumber"] = $jq1("#txtStreetNumber").val();
                customerData["City"] = $jq1("#txtCity").val();
                customerData["Country"] = $jq1("#drpCountry option:selected").val();
                customerData["CountryName"] = $jq1("#drpCountry option:selected").text();
                customerData["PostalCode"] = $jq1("#txtPostalCode").val();
                customerData["ProjectDescription"] = "";//$jq1("#drpProjectDescription option:selected").text();
                customerData["TenderingManager"] = $jq1("#txtTenderingManager").val();
                customerData["PumpManufacturer"] = "";//$jq1("#txtPumpManufacturer").val();
                customerData["PumpType"] = "";//$jq1("#txtPumpType").val();
                customerData["CustomerReference"] = $jq1("#txtCustomerReference").val();
                customerData["EndUser"] = "";//$jq1("#drpEndUser option:selected").text();
                customerData["ValidationPeriod"] = "";

                jsonObj.push(customerData);

                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=SAVECUSTOMER',
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
                            var PageNo = 1;
                            var SortingOrder = "Asc";
                            var SortingColumn = "Id";
                            LoadGrid();
                            if (Cust_Id == "") {
                                toastr.success('Customer details saved successfully!', 'Success', { timeOut: 5000 });
                            }
                            else {
                                toastr.success('Customer details updated successfully!', 'Success', { timeOut: 5000 });
                                $jq1('#tr' + Cust_Id).addClass('selected').siblings().removeClass('selected');
                            }
                            $jq1('#tr' + Cust_Id).removeClass('selected');

                            if (EditRights == true) {
                                $jq1("#btnEditCustomer").attr("disabled", false);
                            }
                            if (InsertRights == true) {
                                $jq1("#btnCopyCustomer").attr("disabled", false);
                            }
                            rowSelectCount = 0;
                            Cust_Id = "";
                            $jq1('#btnCustClose').trigger("click");
                        }
                        document.getElementById("loadingDiv").style.display = "none";
                        //isCopy = false;
                        isEditMode = false;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert(textStatus + " " + errorThrown);
                        toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                        document.getElementById("loadingDiv").style.display = "none";
                    },
                });
            }
        }

        function ValidateDuplicate() {

            var jsonObj = [];
            var customerData = {};
            customerData["Customer"] = $jq1("#txtCustomer").val();
            customerData["City"] = $jq1("#txtCity").val();
            customerData["Country"] = $jq1("#drpCountry option:selected").val();
            customerData["PostalCode"] = $jq1("#txtPostalCode").val();

            jsonObj.push(customerData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=VALIDATEDUPLICATE',
                cache: false,
                async: false,
                data: {
                    data: JSON.stringify(jsonObj)
                },
                dataType: 'html',
                success: function (data) {
                    if (data == "Success") {
                        ValidateCust = true;
                    }
                    else {
                        toastr.error('Customer with same detail already exist!', 'Error', { timeOut: 5000 });
                        ValidateCust = false;
                    }
                    //var jsonData = JSON.parse(data);
                    //var drpValidationPeriod = "<Option value=0>Select</Option>"
                    //for (i in jsonData) {
                    //    drpValidationPeriod += "<Option value=" + jsonData[i].Id + ">" + jsonData[i].ValidationPeriod + " Days</Option>";
                    //}
                    //$jq1("#drpValidationPeriod").html(drpValidationPeriod);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus + " " + errorThrown);
                },
            });
        }

        function CloseClick() {
            //isCopy = false;
            isEditMode = false;
            $jq1("#CustomerIndoBody tr").removeClass("selected");
            $jq1("#CustomerIndoBody").find("input").prop("checked", false);

            rowSelectCount = 0;
            Cust_Id = "";
            //$jq1(".modal-backdrop.fade.in").addClass("modal-backdrop fade out");
            //$jq1(".modal-backdrop.fade.in").removeClass("modal-backdrop fade in");
        }

        function CopyCustomer() {
            if (Cust_Id == "") {
                toastr.error('Please select the record before edit!', 'Error', { timeOut: 5000 })
            }
            else {
                LoadCustomerData();
                Cust_Id = "";
                $jq1("#myModal").modal('show');
            }
        }
        function EnableCustForEdit() {
            $jq1("#btnViewEditCustomer").css("display", "none");
            isEditMode = true;
            $jq1("#myModal").find("input").attr("disabled", false);
            $jq1("#myModal").find("select").attr("disabled", false);
            $jq1("#btnSaveCustomerDetails").attr("disabled", false);
        }
        function ViewCustomer(CustomerId) {
            Cust_Id = CustomerId;

            $jq1("#CustomerIndoBody tr").removeClass("selected");
            $jq1("#CustomerIndoBody").find("input").prop("checked", false);

            LoadCustomerData();
            $jq1("#myModal").find("input").attr("disabled", true);
            $jq1("#myModal").find("select").attr("disabled", true);
            $jq1("#btnSaveCustomerDetails").attr("disabled", true);
            //rowSelectCount = 0;
            //Cust_Id = "";
            $jq1("#btnViewEditCustomer").css("display", "block");
            $jq1("#myModal").modal('show');
        }

        function EditClick() {
            $jq1("#myModal").find("input").attr("disabled", false);
            $jq1("#myModal").find("select").attr("disabled", false);
            $jq1("#btnSaveCustomerDetails").attr("disabled", false);

            if (Cust_Id == "") {
                toastr.error('Please select the record before edit!', 'Error', { timeOut: 5000 })
            }
            else {
                LoadCustomerData();
                $jq1("#myModal").modal('show');
            }
            isEditMode = true;
        }

        function LoadCustomerData() {
            document.getElementById("loadingDiv").style.display = "block";
            var jsonObj = [];
            var customerData = {};

            customerData["CustomerId"] = Cust_Id;

            jsonObj.push(customerData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADCUSTOMERDATA',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load customer data!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);

                        for (i in jsonData) {
                            $jq1("#txtCustomer").val(jsonData[i].Customer);
                            $jq1("#txtFirstName").val(jsonData[i].FirstName);
                            $jq1("#txtLastName").val(jsonData[i].LastName);
                            $jq1("#txtStreetNumber").val(jsonData[i].StreetNumber);
                            $jq1("#txtPostalCode").val(jsonData[i].PostalCodeCity);
                            $jq1("#txtTenderingManager").val(jsonData[i].TenderingManager);
                            $jq1("#txtCustomerReference").val(jsonData[i].CustomersReference);
                            if (jsonData[i].Gender == false) {
                                $jq1("#drpGender").val(0);
                            }
                            else {
                                $jq1("#drpGender").val(1);
                            }
                            $jq1("#txtCity").val(jsonData[i].City);
                            $jq1("#drpCountry").val(jsonData[i].Country);
                            $jq1("#txtEmailId").val(jsonData[i].EmailId);
                        }
                    }
                    document.getElementById("loadingDiv").style.display = "none";
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function AddCustomerClick() {
            if (Cust_Id != "") {
                $jq1('#tr' + Cust_Id).removeClass('selected');
                $jq1('#chk' + Cust_Id).prop("checked", false);
            }
            Cust_Id = "";
            rowSelectCount = 0;
            $jq1("#txtCustomer").val('');
            $jq1("#drpGender").val(0);
            $jq1("#txtFirstName").val('');
            $jq1("#txtLastName").val('');
            $jq1("#txtStreetNumber").val('');
            $jq1("#drpCountry").val(0);
            $jq1("#txtPostalCode").val('');
            $jq1("#txtTenderingManager").val('');
            $jq1("#txtEmailId").val('');
            $jq1("#txtCity").val('');
            $jq1("#txtCustomerReference").val('');
            $jq1("#drpGender").val(1);

            $jq1("#btnViewEditCustomer").css("display", "none");
        }

        function DeleteClick() {
            $jq1("#myModal").find("input").attr("disabled", false);
            $jq1("#myModal").find("select").attr("disabled", false);
            $jq1("#btnSaveCustomerDetails").attr("disabled", false);
            if (rowSelectCount >= 1) {
                if (confirm('Are you sure you want to delete customer information ?') == true) {
                    document.getElementById("loadingDiv").style.display = "block";
                    var jsonObj = [];
                    var customerData = {};

                    customerData["CustomerId"] = Cust_Id;

                    jsonObj.push(customerData);

                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=DELETECUSTOMER',
                        cache: false,
                        async: false,
                        dataType: 'html',
                        data: {
                            data: JSON.stringify(jsonObj)
                        },
                        success: function (data) {
                            if (data == "Error") {
                                toastr.error('Count not delete customer data!', 'Error', { timeOut: 5000 });
                            }
                            else {
                                if (data == "Success") {
                                    toastr.success('Customer details deleted successfully!', 'Success', { timeOut: 5000 });
                                }
                                else {
                                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                                }
                                LoadGrid();
                                document.getElementById("loadingDiv").style.display = "none";
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                            document.getElementById("loadingDiv").style.display = "none";
                        },
                    });
                }
            }
            else {
                toastr.error('Please select the record before edit!', 'Error', { timeOut: 5000 })
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

        function CheckColumnName(ColumnName) {
            if (ColumnName == "FirstName" || ColumnName == "LastName" || ColumnName == "Id" || ColumnName == "IsDeleted" || ColumnName == "UniqueIdentity") {
                if (ColumnName == "FirstName" || ColumnName == "LastName") {
                    return "Contact";
                }
                else {
                    return "";
                }
            }
            else {
                if (ColumnName == "Customer") {
                    return "Customer Name";
                }
                else if (ColumnName == "EmailId") {
                    return "Email Address";
                }
                else if (ColumnName == "StreetNumber") {
                    return "Street/Number";
                }
                else if (ColumnName == "PostalCodeCity") {
                    return "Postal Code";
                }
                else if (ColumnName == "CustomersReference") {
                    return "SAP Customers Reference";
                }
                else if (ColumnName == "TenderingManager") {
                    return "Sulzer Account Manager";
                }
                else {
                    return ColumnName;
                }
            }
        }

        function checkRights() {
            var jsonObj = [];
            var customerData = {};
            customerData["Role"] = getCookie("Role");
            customerData["ModuleId"] = 3;
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
                        if (getCookie("UserName") == "SulzerAdminUser") {
                            InsertRights = true;
                            EditRights = true;
                            DeleteRights = true;
                        }
                        else {
                            for (i in jsonData) {
                                if (jsonData[i].Insert == true) {
                                    InsertRights = true;
                                }
                                if (jsonData[i].Update == true) {
                                    EditRights = true;
                                    //$jq1("#btnEditMessage").attr("disabled", false);
                                }
                                else {
                                    EditRights = true;
                                    //$jq1("#btnEditMessage").attr("disabled", true);
                                }
                                if (jsonData[i].Delete == true) {
                                    DeleteRights = true;
                                }
                            }
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.success('Profile details saved successfully!', 'Success', { timeOut: 5000 });
                },
            });
        }

        function AddNewRow() {

            var jsonObj = [];
            var customerData = {};

            customerData["TableName"] = "tblCustomerInformation";
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
                        if (jsonData.Table.length == 0) {
                            toastr.error('You have not selected any column!', 'Warning', { timeOut: 5000 });
                            return;
                        }
                        else if ($jq1('#FilterControls').find('input:text').length == jsonData.Table.length) {
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
            //    //Build an array containing Customer records.
            //    var customers = [
            //        { CustomerId: 1, Name: "John Hammond", Country: "United States" },
            //        { CustomerId: 2, Name: "Mudassar Khan", Country: "India" },
            //        { CustomerId: 3, Name: "Suzanne Mathews", Country: "France" },
            //        { CustomerId: 4, Name: "Robert Schidner", Country: "Russia" }
            //    ];
            //    //Create a DropDownList element.
            //    var ddlCustomers = $jq1("<select />");

            //    //Add the Options to the DropDownList.
            //    $jq1(customers).each(function () {
            //        var option = $jq1("<option />");

            //        //Set Customer Name in Text part.
            //        option.html(this.Name);

            //        //Set CustomerId in Value part.
            //        option.val(this.CustomerId);

            //        //Add the Option element to DropDownList.
            //        ddlCustomers.append(option);
            //    });

            //    //Reference the container DIV.
            //    var dvContainer = $jq1("#example1")

            //    //Add the DropDownList to DIV.
            //    var div = $jq1("<div />");
            //    div.append(ddlCustomers);

            //    //Create a Remove Button.
            //    var btnRemove = $jq1("<input type = 'button' value = 'Remove' />");
            //    btnRemove.click(function () {
            //        $jq1(this).parent().remove();
            //    });

            //    //Add the Remove Buttton to DIV.
            //    div.append(btnRemove);

            //    //Add the DIV to the container DIV.
            //    dvContainer.append(div);
            //}
        }

        function ApplyFilter() {
            $jq1('#FilterControls').find('div').each(function () {
                $jq1(this).find('select').each(function () {
                    if (this[this.options.selectedIndex].text != "----Select----") {
                        if ($jq1.trim($jq1(this).next('input').val()) != "") {
                            //customerData1[this[this.options.selectedIndex].text] = $jq1(this).next('input').val();
                            LoadGrid();
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
            //LoadGrid();
        }
    </script>
</asp:Content>
