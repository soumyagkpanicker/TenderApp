<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="Configuration.aspx.cs" Inherits="Configuration" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <link href="Content/toastr/toastr.css" rel="stylesheet" />
    <link href="Content/css/Loader.css" rel="stylesheet" />

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

    <link href="Content/css/SelectListBox/Common_Material.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.Mobile.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.css" rel="stylesheet" />
    <script src="Scripts/SelectListBox/SelectListBox.js"></script>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
    <h1>Access Manager</h1>
    <style>
        .demo-section label {
            margin-bottom: 5px;
            font-weight: bold;
            display: inline-block;
        }

        #employees {
            width: 49.8%;
        }

        #example .demo-section {
            max-width: none;
            width: 100%;
        }

        #example .k-listbox {
            width: 49.8%;
            height: 310px;
        }

            #example .k-listbox:first-of-type {
                width: 49.8%;
                margin-right: 1px;
            }
    </style>
    <style>
        #theaderUserRole, tfoot {
            background: #f9f9f9;
            display: table;
            width: 100%;
            width: calc(100% - 18px);
        }

        #tbodyUserRole {
            height: 300px;
            overflow: auto;
            overflow-x: hidden;
            display: block;
            width: 100% !important;
        }

            #tbodyUserRole tr {
                display: table;
                width: 100% !important;
                table-layout: fixed;
            }
    </style>
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

        .dynamic-content-wrapper {
            border: 1px solid #333;
            padding: 20px;
            display: inline-block;
            margin-top: 3%;
            width: 90%;
        }

        h2 {
            width: 22%;
            font-family: 'Roboto Condensed';
            font-size: 1.5rem;
            background: #fafafa;
            margin-left: 10px;
            position: relative;
            padding: 12px;
            margin-block-start: -1.97em;
            margin-block-end: 0.83em;
            margin-inline-start: 0px;
        }

        table {
            border: 1px solid #ddd;
        }
    </style>
    <div class="dynamic-content-wrapper" style="padding: 20px 20px 10px 20px;">
        <h2 style="text-align: center; margin-bottom: 5px;">Users Role</h2>
        <label style="font-weight: 100; margin-bottom: 2.5%;">User Groups:</label>
        <select id="drpRoleUserGroups" class="form-control" style="width: 25%; display: inline-block; margin-left: 2%;" onclick="GetAllUserList();LoadAssignedUserRoles();">
        </select>
        <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; float: right" id="btnCheckAllUserRoles" onclick="CheckAllUserRoles();">Check All</button>
        <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; float: right; margin-right: 2%;" id="btnUnCheckAllUserRoles" onclick="UnCheckAllUserRoles();">UnCheck All</button>


        <table id="tblUserRole">
            <thead id="theaderUserRole">
            </thead>
            <tbody id="tbodyUserRole">
            </tbody>
        </table>
        <div style="margin-top: 1%; text-align: right">
            <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" id="btnSaveUserRole" onclick="SaveUserRole();">Save</button>
            <button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose" onclick="GetUserList();LoadAssignedUserRoles();">Cancel</button>
        </div>
    </div>

    <div class="dynamic-content-wrapper" style="padding: 20px 20px 10px 20px;">
        <h2 style="text-align: center; margin-bottom: 5px;">Access for Role</h2>
        <div style="font-size: 14px; margin-bottom: 1.5%;">
            User Role:
            <select id="drpUserRole" class="form-control" style="width: 25%; display: inline-block; margin-left: 2%;" onclick="ValidateChange();">
            </select>
            <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; float: right" id="btnCheckAllAccessForRole" onclick="CheckAllAccessForRole();">Check All</button>
            <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; float: right; margin-right: 2%;" id="btnUnCheckAllAccessForRole" onclick="UnCheckAllAccessForRole();">UnCheck All</button>
        </div>
        <table id="tblAccessforRole">
            <thead>
                <tr>
                    <th style="width: 25%; text-align: center;">Modules</th>
                    <th style="width: 15%; text-align: center;">View</th>
                    <th style="width: 20%; text-align: center;">Insert</th>
                    <th style="width: 20%; text-align: center;">Update/Edit</th>
                    <th style="width: 20%; text-align: center;">Delete</th>
                </tr>
            </thead>
            <tbody id="tbodyUserAccess">
            </tbody>
        </table>
        <div style="display: table; table-layout: fixed; margin-top: 1%; width: 100% !important; font-size: 14px;">
            <div style="display: table-cell; float: left; margin-top: 1%;">
                Allow to create firm Tender:
                <input type="checkbox" style="vertical-align: sub;" id="chkAllowFirmTender">
            </div>
            <div style="display: table-cell; float: left; margin-top: 1%; margin-left: 9%;">
                Allow to change status to Loss and Win:
                <input type="checkbox" style="vertical-align: sub;" id="chkLossAndWin">
            </div>
            <div style="text-align: right; display: table-cell; float: right;">
                <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" id="btnSaveUserAccess" onclick="SaveUserAccess();">Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="Button1" onclick="IsRecordUpdated = false;LoadModuleList();LoadUserAccess();">Cancel</button>
            </div>
        </div>
    </div>

    <div class="dynamic-content-wrapper" style="padding: 20px 20px 10px 20px;">
        <h2 style="text-align: center; margin-bottom: 5px;">User Assignment</h2>
        <div style="font-size: 14px; margin-bottom: 1.5%;">
            <label style="font-weight: 100; margin-right: 3%;">User:</label><select id="drpUserList" class="form-control" style="width: 25%; display: inline-block; margin-left: 5%;" onchange="LoadSelectedLocation();">
            </select>

            <label style="font-weight: 100; margin-left: 3%;">User Group:</label><select id="drpUserGroup" class="form-control" style="width: 25%; display: inline-block; margin-left: 2%;" onchange="GetUserList();LoadSelectedLocation();">
            </select>
        </div>

        <div id="example" role="application">
            <div class="demo-section k-content" id="divLocationLists">
                <%--<div>
                    <label for="optional" id="employees" style="font-size: 16px; text-align: center; width: 50%;">Country List</label>
                    <label for="selected" style="font-size: 16px; text-align: center; width: 49%;">Selected Country List</label>
                    <br />
                </div>--%>
            </div>
        </div>
        <div style="margin-top: 1%; text-align: right">
            <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" id="btnSaveLocation" onclick="SaveLocation();">Save</button>
            <button type="button" class="btn btn-default" data-dismiss="modal" id="Button3" onclick="LoadSelectedLocation();">Cancel</button>
        </div>
    </div>

    <div class="dynamic-content-wrapper" style="padding: 20px 20px 10px 20px;">
        <h2 style="text-align: center; margin-bottom: 5px;">Legal Entity</h2>
        <div style="font-size: 14px; margin-bottom: 1.5%;">
            <label style="font-weight: 100; margin-right: 3%;">Country :</label><select id="drpLegalEntityCountryList" class="form-control" style="width: 25%; display: inline-block;" onchange="LoadSelectedLegalEntityList();">
            </select>
        </div>

        <div id="divHealLegalEntity" role="application">
            <div class="demo-section k-content" id="divLegalEntityList">
                <%--<div>
                    <label for="optional" id="Label1" style="font-size: 16px; text-align: center; width: 50%;">Legal Entity List</label>
                    <label for="selected" style="font-size: 16px; text-align: center; width: 49%;">Selected Legal Entities</label>
                    <br />
                </div>--%>
            </div>
        </div>
        <div style="margin-top: 1%; text-align: right">
            <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" id="btnSaveLegalEntity" onclick="SaveLegalEntity();">Save</button>
            <button type="button" class="btn btn-default" data-dismiss="modal" id="btnCancelLegalEntity">Cancel</button>
        </div>
    </div>

    <%--<div class="container">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>Fixed Header Scrolling Table 
          </h4>
                </div>
                <table class="table table-fixed">
                    <thead>
                        <tr>
                            <th class="col-xs-2">#</th>
                            <th class="col-xs-2">Name</th>
                            <th class="col-xs-2">Points</th>
                            <th class="col-xs-2">#</th>
                            <th class="col-xs-2">Name</th>
                            <th class="col-xs-2">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                        <tr>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                            <td class="col-xs-2">1</td>
                            <td class="col-xs-2">Mike Adams</td>
                            <td class="col-xs-2">23</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <style>
        .table-fixed thead {
            width: 100%;
        }

        .table-fixed tbody {
            height: 230px;
            overflow-y: auto;
            width: 100%;
        }

        .table-fixed thead, .table-fixed tbody, .table-fixed tr, .table-fixed td, .table-fixed th {
            display: block;
        }

            .table-fixed tbody td, .table-fixed thead > tr > th {
                float: left;
                border-bottom-width: 0;
            }
    </style>--%>

    <script type="text/javascript">
        var tbodyUserRole = "";
        var IsRecordUpdated = false;

        var ViewRights = false;
        var InsertRights = false;
        var EditRights = false;
        var DeleteRights = false;

        $jq1(document).ready(function () {
            checkRights();
            LoadUserGroups();
            LoadUserRoles();
            GetUserList();
            LoadModuleList();
            LoadUserAccess();
            LoadSelectedLocation();
            GetAllUserList();
            LoadAssignedUserRoles();
            LoadSelectedLegalEntityList();
            setFirmTenderRights();
            $jq1("#drpUserList").select2();


            //$jq1("#optional").select2();
            //$jq1("#selected").select2();  


        });

        function GetUserList() {
            var jsonObj = [];
            var customerData = {};

            //customerData["UserId"] = $jq1("#drpUserList option:selected").val();
            customerData["UserGroup"] = $jq1("#drpUserGroup option:selected").val();
            jsonObj.push(customerData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETUSERLIST',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var tbody_UserRole = "";
                        var drpUserList = "";
                        for (i in jsonData) {
                            //tbody_UserRole += "<tr id=tr_" + jsonData[i].PSNumber + "><td style='width: 25%;'>" + jsonData[i].UserName + "</td>" + tbodyUserRole;
                            drpUserList += "<option value='" + jsonData[i].PSNumber + "'>" + jsonData[i].UserName + "</option>";
                        }
                        $jq1("#drpUserList").html(drpUserList);
                        //$jq1("#tbodyUserRole").html(tbody_UserRole);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function GetAllUserList() {
            var jsonObj = [];
            var customerData = {};

            customerData["UserGroup"] = $jq1("#drpRoleUserGroups option:selected").val();
            jsonObj.push(customerData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETUSERLIST',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var tbody_UserRole = "";
                        var drpUserList = "";
                        for (i in jsonData) {
                            tbody_UserRole += "<tr data-email='" + jsonData[i].EmailAddress + "' id=tr_" + jsonData[i].PSNumber + "><td style='width: 25%;'>" + jsonData[i].UserName + "</td>" + tbodyUserRole;
                        }
                        $jq1("#tbodyUserRole").html(tbody_UserRole);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function SaveUserRole() {
            var jsonObj = [];
            var UserData = {};
            $jq1("#tbodyUserRole tr").each(function () {
                UserData["UserId"] = this.id.split("_")[1];
                UserData["EmailAddress"] = $jq1(this).attr("data-email");
                $jq1(this).find("td").find("input[type=checkbox]").each(function () {
                    UserData[this.id] = this.checked;
                });
                if ($jq1("#drpRoleUserGroups option:selected").text() == "ADMIN_GROUP") {
                    UserData["Admin"] = true;
                }
                else {
                    UserData["Admin"] = false;
                }
                jsonObj.push(UserData);
                UserData = {};
            });

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=SAVEUSERROLES',
                type: "POST",
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        toastr.success('User roles saved successfully!', 'success', { timeOut: 5000 });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    //document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function CheckAllUserRoles() {
            $jq1("#tbodyUserRole tr").each(function () {
                $jq1(this).find("td").find("input[type=checkbox]").each(function () {
                    this.checked = true;
                });
            });
        }

        function UnCheckAllUserRoles() {
            $jq1("#tbodyUserRole tr").each(function () {
                $jq1(this).find("td").find("input[type=checkbox]").each(function () {
                    if ($jq1("#drpRoleUserGroups option:selected").text() == "ADMIN_GROUP") {
                        if (this.id != "Viewer" && this.id != "SalesEngineer") {
                            this.checked = false;
                        }
                    }
                    else {
                        if (this.id != "Viewer") {
                            this.checked = false;
                        }
                    }
                });
            });
        }

        function LoadAssignedUserRoles() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADUSERROLES',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        if (getCookie("UserName") == "SulzerAdminUser") {
                            if (jsonData.length > 0) {
                                for (i in jsonData) {
                                    $jq1("#tbodyUserRole #tr_" + jsonData[i].PSNumber).each(function () {
                                        var tdCheckBox = this;
                                        $jq1("#drpUserRole option").each(function () {
                                            var RoleControl = $jq1(tdCheckBox).find("td").find("#" + this.text.replace(" ", ""));

                                            if ($jq1("#drpRoleUserGroups option:selected").text() == "ADMIN_GROUP") {
                                                if (this.text.replace(" ", "") == "SalesEngineer" || this.text.replace(" ", "") == "Admin" || this.text.replace(" ", "") == "Viewer") {
                                                    RoleControl.prop("checked", "checked");
                                                    RoleControl.attr("disabled", true);
                                                }
                                                else {
                                                    if (jsonData[i][this.text.replace(" ", "")] == true) {
                                                        RoleControl.prop("checked", "checked");
                                                        if (EditRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                            RoleControl.attr("disabled", true);
                                                        }
                                                    }
                                                    else {
                                                        if (InsertRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                            RoleControl.attr("disabled", true);
                                                        }
                                                    }
                                                }
                                            }
                                            else if ($jq1("#drpRoleUserGroups option:selected").text() == "USER_GROUP") {
                                                if (this.text.replace(" ", "") == "Viewer") {
                                                    RoleControl.prop("checked", "checked");
                                                    RoleControl.attr("disabled", true);
                                                }
                                                else {
                                                    if (this.text.replace(" ", "") == "SalesEngineer") {
                                                        if (jsonData[i].Sales == true) {
                                                            RoleControl.prop("checked", "checked");
                                                            if (EditRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                                RoleControl.attr("disabled", true);
                                                            }
                                                        }
                                                        else {
                                                            if (InsertRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                                RoleControl.attr("disabled", true);
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (jsonData[i][this.text.replace(" ", "")] == true) {
                                                            RoleControl.prop("checked", "checked");
                                                            if (EditRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                                RoleControl.attr("disabled", true);
                                                            }
                                                        }
                                                        else {
                                                            if (InsertRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                                RoleControl.attr("disabled", true);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    });
                                }
                            }
                            else {
                                $jq1("#tbodyUserRole tr").each(function () {
                                    var tdCheckBox = this;
                                    $jq1("#drpUserRole option").each(function () {
                                        var RoleControl = $jq1(tdCheckBox).find("td").find("#" + this.text.replace(" ", ""));
                                        if ($jq1("#drpRoleUserGroups option:selected").text() == "ADMIN_GROUP") {
                                            if (this.text.replace(" ", "") == "SalesEngineer" || this.text.replace(" ", "") == "Admin" || this.text.replace(" ", "") == "Viewer") {
                                                RoleControl.prop("checked", "checked");
                                                RoleControl.attr("disabled", true);
                                            }
                                            else {
                                                RoleControl.prop("checked", "checked");
                                            }
                                        }
                                        else {
                                            if (this.text.replace(" ", "") == "Viewer") {
                                                RoleControl.prop("checked", "checked");
                                                RoleControl.attr("disabled", true);
                                            }
                                        }
                                    });
                                });
                            }
                        }
                        else {
                            for (i in jsonData) {
                                $jq1("#tbodyUserRole #tr_" + jsonData[i].PSNumber).each(function () {
                                    var tdCheckBox = this;
                                    $jq1("#drpUserRole option").each(function () {
                                        var RoleControl = $jq1(tdCheckBox).find("td").find("#" + this.text.replace(" ", ""));

                                        if ($jq1("#drpRoleUserGroups option:selected").text() == "ADMIN_GROUP") {
                                            if (this.text.replace(" ", "") == "SalesEngineer" || this.text.replace(" ", "") == "Admin" || this.text.replace(" ", "") == "Viewer") {
                                                RoleControl.prop("checked", "checked");
                                                RoleControl.attr("disabled", true);
                                            }
                                            else {
                                                if (jsonData[i][this.text.replace(" ", "")] == true) {
                                                    RoleControl.prop("checked", "checked");
                                                    if (EditRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                        RoleControl.attr("disabled", true);
                                                    }
                                                }
                                                else {
                                                    if (InsertRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                        RoleControl.attr("disabled", true);
                                                    }
                                                }
                                            }
                                        }
                                        else if ($jq1("#drpRoleUserGroups option:selected").text() == "USER_GROUP") {
                                            if (this.text.replace(" ", "") == "Viewer") {
                                                RoleControl.prop("checked", "checked");
                                                RoleControl.attr("disabled", true);
                                            }
                                            else {
                                                if (this.text.replace(" ", "") == "SalesEngineer") {
                                                    if (jsonData[i].Sales == true) {
                                                        RoleControl.prop("checked", "checked");
                                                        if (EditRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                            RoleControl.attr("disabled", true);
                                                        }
                                                    }
                                                    else {
                                                        if (InsertRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                            RoleControl.attr("disabled", true);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (jsonData[i][this.text.replace(" ", "")] == true) {
                                                        RoleControl.prop("checked", "checked");
                                                        if (EditRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                            RoleControl.attr("disabled", true);
                                                        }
                                                    }
                                                    else {
                                                        if (InsertRights == false && getCookie("UserName") != "SulzerAdminUser") {
                                                            RoleControl.attr("disabled", true);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    });
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

        function LoadUserRoles() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETALLROLES',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var theaderUserRole = "<tr><th style='width: 25%; text-align: center;'>Users</th>";
                        var drpUserRole = "";
                        for (i in jsonData) {
                            if ($jq1("#drpRoleUserGroups option:selected").text() == "ADMIN_GROUP" && (jsonData[i].Role == "Admin")) {
                                //theaderUserRole += "<th style='width: 15%; text-align: center;'>" + jsonData[i].Role + "</th>";
                                //tbodyUserRole += "<td style='text-align: center;width:15%;'><input type='checkbox' id='" + jsonData[i].Role.replace(" ", "") + "'/></td>";
                            }
                            //else if ($jq1("#drpRoleUserGroups option:selected").text() == "USER_GROUP") {
                            //    theaderUserRole += "<th style='width: 15%; text-align: center;'>" + jsonData[i].Role + "</th>";
                            //    tbodyUserRole += "<td style='text-align: center;width:15%;'><input type='checkbox' id='" + jsonData[i].Role.replace(" ", "") + "'/></td>";
                            //}
                            else {
                                theaderUserRole += "<th style='width: 15%; text-align: center;'>" + jsonData[i].Role + "</th>";
                                tbodyUserRole += "<td style='text-align: center;width:15%;'><input type='checkbox' id='" + jsonData[i].Role.replace(" ", "") + "'/></td>";
                            }
                            drpUserRole += "<option value=" + jsonData[i].RoleId + ">" + jsonData[i].Role + "</option>";

                        }
                        $jq1("#drpUserRole").html(drpUserRole);
                        $jq1("#theaderUserRole").html(theaderUserRole + "</tr>");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function LoadModuleList() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADMODULELIST',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load module list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var tbodyUserAccess = "";
                        for (i in jsonData) {
                            tbodyUserAccess += "<tr id=tr_" + jsonData[i].Id + "><td>" + jsonData[i].ModuleName + "</td>";
                            if (jsonData[i].ModuleName == "Tender Management") {
                                tbodyUserAccess += "<td style='text-align: center;'><input type='checkbox' id='View' onclick='IsRecordUpdated = true; ViewChkBoxClick(this, " + jsonData[i].Id + ");'/></td><td style='text-align: center;'><input type='checkbox' onclick='IsRecordUpdated = true;CheckBoxClick(this, " + jsonData[i].Id + ");EnableFirmCB(this);' id='Insert'/></td><td style='text-align: center;'><input type='checkbox' onclick='IsRecordUpdated = true; CheckBoxClick(this, " + jsonData[i].Id + ");' id='Update'/></td><td style='text-align: center;'><input type='checkbox' onclick='IsRecordUpdated = true; CheckBoxClick(this, " + jsonData[i].Id + ");' id='Delete'/></td></tr>";
                            }
                            else {
                                tbodyUserAccess += "<td style='text-align: center;'><input type='checkbox' id='View' onclick='IsRecordUpdated = true; ViewChkBoxClick(this, " + jsonData[i].Id + ");'/></td><td style='text-align: center;'><input type='checkbox' onclick='IsRecordUpdated = true;CheckBoxClick(this, " + jsonData[i].Id + ");' id='Insert'/></td><td style='text-align: center;'><input type='checkbox' onclick='IsRecordUpdated = true; CheckBoxClick(this, " + jsonData[i].Id + ");' id='Update'/></td><td style='text-align: center;'><input type='checkbox' onclick='IsRecordUpdated = true; CheckBoxClick(this, " + jsonData[i].Id + ");' id='Delete'/></td></tr>";
                            }
                        }
                        $jq1("#tbodyUserAccess").html(tbodyUserAccess);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function SaveUserAccess() {
            var jsonObj = [];
            var UserData = {};
            $jq1("#tbodyUserAccess tr").each(function () {
                UserData["Role"] = $jq1("#drpUserRole option:selected").val();
                UserData["ModuleId"] = this.id.split("_")[1];
                UserData["FirmTender"] = $jq1("#chkAllowFirmTender").prop("checked");
                UserData["ChangeStatus"] = $jq1("#chkLossAndWin").prop("checked");
                $jq1(this).find("td").find("input[type=checkbox]").each(function () {
                    UserData[this.id] = this.checked;
                });
                jsonObj.push(UserData);
                UserData = {};
            });

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=SAVEUSERACCESS',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        toastr.success('User roles saved successfully!', 'success', { timeOut: 5000 });
                    }
                    IsRecordUpdated = false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function CheckAllAccessForRole() {
            $jq1("#tbodyUserAccess tr").each(function () {
                $jq1(this).find("td").find("input[type=checkbox]").each(function () {
                    this.checked = true;
                });
            });
        }

        function UnCheckAllAccessForRole() {
            $jq1("#tbodyUserAccess tr").each(function () {
                $jq1(this).find("td").find("input[type=checkbox]").each(function () {
                    this.checked = false;
                    //if ($jq1("#drpRoleUserGroups option:selected").text() == "ADMIN_GROUP") {
                    //    if (this.id != "Viewer" && this.id != "SalesEngineer") {
                    //        this.checked = false;
                    //    }
                    //}
                    //else {
                    //    if (this.id != "Viewer") {
                    //        this.checked = false;
                    //    }
                    //}
                });
            });
        }

        function LoadTenderConfiguration() {
            var jsonObj = [];
            var userRole = {};
            userRole["Role"] = $jq1("#drpUserRole option:selected").val();
            jsonObj.push(userRole);
            $jq1.ajax({
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
                        $jq1("#chkAllowFirmTender").prop("checked", false);
                        $jq1("#chkLossAndWin").prop("checked", false);
                        for (i in jsonData) {
                            $jq1("#chkAllowFirmTender").prop("checked", jsonData[i].HasAccess);
                            $jq1("#chkLossAndWin").prop("checked", jsonData[i].ChangeStatus);
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function LoadUserAccess() {
            var jsonObj = [];
            var userRole = {};
            userRole["Role"] = $jq1("#drpUserRole option:selected").val();
            jsonObj.push(userRole);
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADUSERACCESS',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        for (i in jsonData) {
                            $jq1("#tbodyUserAccess #tr_" + jsonData[i].ModuleId).each(function () {
                                var AccessControl = $jq1(this).find("td").find("#View");
                                if ($jq1("#drpUserRole option:selected").text() == "Admin") {
                                    AccessControl.prop("checked", "checked");
                                    AccessControl = $jq1(this).find("td").find("#Update");
                                    AccessControl.prop("checked", "checked");
                                    AccessControl = $jq1(this).find("td").find("#Insert");
                                    AccessControl.prop("checked", "checked");
                                    AccessControl = $jq1(this).find("td").find("#Delete");
                                    AccessControl.prop("checked", "checked");
                                }
                                else {
                                    if (jsonData[i].View == true) {
                                        AccessControl.prop("checked", "checked");
                                        if (EditRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }
                                    else {
                                        AccessControl.removeProp("checked");
                                        if (InsertRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }

                                    AccessControl = $jq1(this).find("td").find("#Insert");
                                    if (jsonData[i].Insert == true) {
                                        AccessControl.prop("checked", "checked");
                                        if (EditRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }
                                    else {
                                        AccessControl.removeProp("checked");
                                        if (InsertRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }

                                    AccessControl = $jq1(this).find("td").find("#Update");
                                    if (jsonData[i].Update == true) {
                                        AccessControl.prop("checked", "checked");
                                        if (EditRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }
                                    else {
                                        AccessControl.removeProp("checked");
                                        if (InsertRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }

                                    AccessControl = $jq1(this).find("td").find("#Delete");
                                    if (jsonData[i].Delete == true) {
                                        AccessControl.prop("checked", "checked");
                                        if (EditRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }
                                    else {
                                        AccessControl.removeProp("checked");
                                        if (InsertRights == false) {
                                            AccessControl.attr("disabled", true);
                                        }
                                    }
                                }
                            });
                        }
                        LoadTenderConfiguration();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function getLocationList() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETALLLOCATIONS',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var drpUserList = "";
                        for (i in jsonData) {
                            drpUserList += "<option value=" + jsonData[i].LocationCode + ">" + jsonData[i].Location + "</option>";
                        }
                        $jq1("#optional").html(drpUserList);
                        $jq1("#drpLegalEntityCountryList").html(drpUserList);

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function SaveLocation() {
            var jsonObj = [];
            var UserData = {};
            UserData["PSNumber"] = $jq1("#drpUserList option:selected").val();
            jsonObj.push(UserData);

            var UserData1 = {};
            var jsonObj1 = [];
            $jq1("#selected option").each(function () {
                UserData1["LocationCode"] = this.value;
                jsonObj1.push(UserData1);
                UserData1 = {};
            });

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=SAVEUSERLOCATION',
                cache: false,
                async: false,
                dataType: 'html',
                type: 'POST',
                data: {
                    data: JSON.stringify(jsonObj),
                    data1: JSON.stringify(jsonObj1)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        toastr.success('User roles saved successfully!', 'success', { timeOut: 5000 });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function LoadSelectedLocation() {
            var jsonObj = [];
            var customerData = {};

            customerData["PSNumber"] = $jq1("#drpUserList option:selected").val();
            jsonObj.push(customerData);

            $jq1("#divLocationLists").remove();
            $jq1("#example").append("<div class='demo-section k-content' id='divLocationLists'><label for='optional' id='employees' style='font-size: 16px; text-align: center; width: 50%;'>Country List</label><label for='selected' style='font-size: 16px; text-align: center; width: 49%;'>Selected Country List</label><br /> <select id='optional' style='font-size: 14px'></select><select id='selected' style='font-size: 14px'></select></div>");
            //$jq1("#divLocationLists").append(" <select id='optional' style='font-size: 14px'></select><select id='selected' style='font-size: 14px'></select>");

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETSELECTEDLOCATIONLIST',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not selected location list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var drpColumnList = "";
                        var drpSelectedLocationList = "";
                        var temp = 0;

                        if (jsonData.length > 0) {
                            for (i in jsonData) {
                                drpSelectedLocationList += "<option value=" + jsonData[i].LocationCode + ">" + jsonData[i].Location + "</option>";
                            }
                            $jq1("#selected").html(drpSelectedLocationList);
                        }
                        else {
                            $jq1("#selected").empty();
                        }

                        getLocationList();
                        for (i in jsonData) {
                            $jq1("#optional option").each(function () {
                                if (jsonData[i].LocationCode == this.value) {
                                    $jq1(this).remove();
                                }
                            });
                        }
                    }
                    $jq1("#optional").kendoListBox({
                        connectWith: "selected",
                        toolbar: {
                            tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
                        }
                    });
                    $jq1("#selected").kendoListBox({
                        connectWith: "optional"
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function LoadUserGroups() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETUSERGROUP',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var drpUserGroupList = "";
                        for (i in jsonData) {
                            drpUserGroupList += "<option value=" + jsonData[i].Value + ">" + jsonData[i].DisplayName + "</option>";
                        }
                        $jq1("#drpUserGroup").html(drpUserGroupList);
                        $jq1("#drpRoleUserGroups").html(drpUserGroupList);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
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
                        if (getCookie("UserName") != "SulzerAdminUser") {
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

        function ViewChkBoxClick(Control, ModuleId) {
            $jq1("#tbodyUserAccess #tr_" + ModuleId + " > td > input").each(function () {
                if (Control.checked == true) {
                    this.checked = true;
                }
                else {
                    this.checked = false;
                    if (this.id == "Insert") {
                        EnableFirmCB(this);
                    }
                }
            });
        }

        function CheckBoxClick(Control, ModuleId) {
            $jq1("#tbodyUserAccess #tr_" + ModuleId + " > td #View").each(function () {
                //var AccessControl = $jq1(this).find("td").find("#View");
                if (Control.checked == true) {
                    this.checked = true
                }
            });
        }

        function setFirmTenderRights() {
            $jq1("#tbodyUserAccess > tr").each(function () {
                if ($jq1(this).children('td:first').text() == "Tender Management") {
                    $jq1(this).children("td").find("#Insert").each(function () {
                        if (this.checked == true) {
                            $jq1("#chkAllowFirmTender").removeAttr("disabled");
                        }
                        else {
                            $jq1("#chkAllowFirmTender").prop("checked", false);
                            $jq1("#chkAllowFirmTender").attr("disabled", "disabled");
                        }
                    });
                }
            });
            //if ($jq1("#tbodyUserAccess > tr > td:first").text() == "Tender Management") {

            //}
        }

        function EnableFirmCB(Control) {
            if (Control.checked == true) {
                $jq1("#chkAllowFirmTender").removeAttr("disabled");
            }
            else {
                $jq1("#chkAllowFirmTender").prop("checked", Control.checked);
                $jq1("#chkAllowFirmTender").attr("disabled", "disabled");
            }
        }

        function ValidateChange() {
            if (IsRecordUpdated == true) {
                if (confirm('Changes has been made do you want to save it?') == true) {
                    SaveUserAccess();
                }
            }
            IsRecordUpdated = false;
            LoadModuleList();
            LoadUserAccess();
            setFirmTenderRights();
        }

        function checkRights() {

            var jsonObj = [];
            var customerData = {};
            customerData["Role"] = getCookie("Role");
            customerData["ModuleId"] = 8;
            jsonObj.push(customerData);

            if ($jq1(".username").text() == "Sulzer Admin") {
                InsertRights = true;
                EditRights = true;
                DeleteRights = true;
            }
            else {

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
                            if ($jq1(".username").text() == "Sulzer Admin") {
                                EditRights = true;
                                InsertRights = true;
                                DeleteRights = true;
                            }
                            else {

                                for (i in jsonData) {
                                    if (jsonData[i].Insert == false && jsonData[i].Update == false) {
                                        $jq1("#btnSaveUserRole").attr("disabled", true);
                                        $jq1("#btnSaveUserAccess").attr("disabled", true);
                                        $jq1("#btnSaveLocation").attr("disabled", true);

                                        $jq1("#btnUnCheckAllUserRoles").attr("disabled", true);
                                        $jq1("#btnCheckAllUserRoles").attr("disabled", true);

                                        $jq1("#btnCheckAllAccessForRole").attr("disabled", true);
                                        $jq1("#btnUnCheckAllAccessForRole").attr("disabled", true);
                                    }


                                    if (jsonData[i].Insert == true) {
                                        InsertRights = true;
                                    }

                                    if (jsonData[i].Update == true) {
                                        EditRights = true;
                                    }

                                    if (jsonData[i].Delete == true) {
                                        DeleteRights = true;
                                    }
                                }
                            }
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error('Something went wrong!', 'Error', { timeOut: 5000 });
                    },
                });
            }
        }

        function LoadAllLegalEntityList() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADALLLEGALENTITIES',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load legal entity list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var drpUserList = "";
                        for (i in jsonData) {
                            drpUserList += "<option value=" + jsonData[i].Id + ">" + jsonData[i].LegalEntityName + "</option>";
                        }
                        $jq1("#optionalLegalEntity").html(drpUserList);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

        function LoadSelectedLegalEntityList() {
            $jq1("#divLegalEntityList").remove();
            $jq1("#divHealLegalEntity").append("<div class='demo-section k-content' id='divLegalEntityList'><label for='optional' id='lbloptionalLegalEntity' style='font-size: 16px; text-align: center; width: 50%;'>Legal Entity List</label><label for='selected' style='font-size: 16px; text-align: center; width: 49%;'>Selected Legal Entity List</label><br /> <select id='optionalLegalEntity' style='font-size: 14px;width:49%;'></select><select id='selectedLegalEntity' style='font-size: 14px;width:49%'></select></div>");

            var jsonObj = [];
            var customerData = {};
            customerData["CountryCode"] = $jq1("#drpLegalEntityCountryList").val();
            jsonObj.push(customerData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADASSIGNEDLEGALENTITYLIST',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not selected legal entity list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        var jsonData = JSON.parse(data);
                        var drpColumnList = "";
                        var drpSelectedLegalEntityList = "";
                        var temp = 0;

                        if (jsonData.length > 0) {
                            for (i in jsonData) {
                                drpSelectedLegalEntityList += "<option value=" + jsonData[i].LegalEntityId + ">" + jsonData[i].LegalEntityName + "</option>";
                            }
                            $jq1("#selectedLegalEntity").html(drpSelectedLegalEntityList);
                        }
                        else {
                            $jq1("#selectedLegalEntity").empty();
                        }

                        LoadAllLegalEntityList();
                        for (i in jsonData) {
                            $jq1("#optionalLegalEntity option").each(function () {
                                if (jsonData[i].LegalEntityId == this.value) {
                                    $jq1(this).remove();
                                }
                            });
                        }
                    }
                    $jq1("#optionalLegalEntity").kendoListBox({
                        connectWith: "selectedLegalEntity",
                        toolbar: {
                            tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
                        }
                    });
                    $jq1("#selectedLegalEntity").kendoListBox({
                        connectWith: "optionalLegalEntity"
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },


            });
        }

        function SaveLegalEntity() {
            var jsonObj = [];
            var UserData = {};

            $jq1("#selectedLegalEntity option").each(function () {
                UserData["CountryCode"] = $jq1("#drpLegalEntityCountryList option:selected").val();
                UserData["LegalEntityId"] = this.value;
                jsonObj.push(UserData);
                UserData = {};
            });

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=SAVELEGALENTITY',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    if (data == "Error") {
                        toastr.error('Count not load user list!', 'Error', { timeOut: 5000 });
                    }
                    else {
                        toastr.success('Legal Entities saved successfully!', 'success', { timeOut: 5000 });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                    document.getElementById("loadingDiv").style.display = "none";
                },
            });
        }

    </script>
</asp:Content>

