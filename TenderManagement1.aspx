<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="TenderManagement1.aspx.cs" Inherits="TenderManagement1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="Content/css/tender-management.css" rel="stylesheet" />
    <link href="Content/css/Pagination.css" rel="stylesheet" />
    <link href="Content/css/sytle.min.css" rel="stylesheet" />
    <link href="Content/css/table-sortable.css" rel="stylesheet" />
    <link href="Content/css/Loader.css" rel="stylesheet" />
    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>--%>
    <script src="Scripts/jquery-ui-1.10.0.min.js"></script>
    <script type="text/javascript">
        var $j = jQuery.noConflict();
    </script>
    <%-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>--%>
    <link href="Content/css/SelectListBox/Common_Material.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.Mobile.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.css" rel="stylesheet" />
    <script src="Scripts/SelectListBox/SelectListBox.js"></script>
    <script src="Scripts/jquery.scrolltable.js"></script>

    <script src="Scripts/SelectListBox/ColumnFilter.js"></script>
    <link href="Content/css/SelectListBox/ColumnFilter.css" rel="stylesheet" />

    <link href="Content/toastr/toastr.css" rel="stylesheet" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <%-- <style>
        #theadTenderDetails, tfoot {
            background: #f9f9f9;
            display: table;
            width: 100%;
            width: calc(100% - 18px);
        }

        #tbodyTenderDetails {
            height: 300px;
            overflow: auto;
            overflow-x: hidden;
            display: block;
            width: 100% !important;
        }

            #tbodyTenderDetails tr {
                display: table;
                width: 100% !important;
                table-layout: fixed;
            }
    </style>--%>
    <style type="text/css">
        #TenderDetailGrid .opened .arrow-down {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            margin-top:2.5px;
        }

        .ItemClass .arrow-down {
            margin-right: 12px !important;
        }

        tr.inner-details > td {
            height: 0;
            padding: 0;
        }

        table.tblSnapdown td, table.tblSnapdown th {
            font-size: 0.9rem;
        }

        tr.inner-details .details-grid {
            display: none;
            padding: 10px 20px 32px;
        }

        .arrow-down {
            border: solid black;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
        }

        table.tblSnapdown .arrow-down {
            margin-right: 1%;
            display: inline-block;
            vertical-align: top;
            margin-top:0.5px;
        }

        tr.parent-row td:first-child {
            width: 13%;
        }

        span.chbx {
            position: relative;
            display: inline-block;
            margin-left: 10px;
            margin-top: 5px;
        }

            span.chbx .checkbox {
                position: absolute;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                border: 1px solid;
                margin: 0px;
                border-radius: 3px;
                cursor: pointer;
                box-shadow: 0px 1px 5px rgba(0,0,0,0.3);
                transition: 0.3s all ease;
            }

            span.chbx input[type="checkbox"] {
                width: 20px;
                height: 20px;
                top: -4px;
                position: relative;
                z-index: 1;
                opacity: 0;
                cursor: pointer;
            }

                span.chbx input[type="checkbox"]:checked + .checkbox {
                    background: #091540;
                }

                    span.chbx input[type="checkbox"]:checked + .checkbox:after {
                        content: "";
                        border: solid #fff;
                        border-width: 0 3px 3px 0;
                        display: inline-block;
                        padding: 6px 2px;
                        transform: rotate(45deg);
                        -webkit-transform: rotate(45deg);
                        left: 1px;
                        position: relative;
                    }

        .inner-detail-rows {
            display: none;
        }

        table.tblSnapdown > tbody > tr:not(.inner-details) > td, table.tblSnapdown > thead > tr:not(.inner-details) > th {
            border: 1px solid #ddd;
        }

        .tblSnapdown .inner-details td, .tblSnapdown .inner-details th {
            border: 0 !important;
        }

        tr.parent-row:not(.opened) td {
            border-bottom: 0 !important;
        }

        .details-grid.active {
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }

        table.tblSnapdown > thead > tr > th {
            background: #091540;
            color: #fff;
        }


        .st-body-scroll {
            max-height: 60vh !important;
        }

        table.st-head-table th {
            background: #091540;
            color: #fff;
        }



        #theadTenderDetails tr span.sortImage {
            width: 13px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            right: 10px;
        }



            #theadTenderDetails tr span.sortImage img {
                max-width: 100%;
            }

        #theadTenderDetails span.text {
            float: left;
            padding-left: 0;
            vertical-align: middle;
            padding-right: 30px;
        }

        table.tblSnapdown > thead > tr > th {
            position: relative;
            vertical-align: middle;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <h1>Tender Management</h1>
    <div class="tenderFilterByTypes">
        <ul>
            <li>
                <span class="radio">
                    <input type="radio" id="rbAllOpenTenders" value="1" name="tenderTypes" checked /><span class="radio"></span></span><span class="label">All Quotes</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbActiveTenders" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">Quote Submitted</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbOpenTenders" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">Quote in Progress</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbWin" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">Win</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbLoss" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">Loss</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbBudgetOrder" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">Budget Orders</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbFirmOrder" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">Firm Order</span>
            </li>
        </ul>
    </div>


    <div class="serach-wrapper" style="width: 55%">
        <%--<div class="title">Filter: </div>--%>
        <%--<div class="label">
            <label>Select a column</label>
        </div>--%>

        <%--<select id="ddSearchColumns">
                <option value="All" class="textbox">All</option>
                <option value="Tender Id" class="textbox">Tender Id</option>
                <option value="Project Id" class="textbox">Project Id</option>
                <option value="Customer" class="date">Customer</option>

            </select>--%>
        <%--Filter: 
            <input type="text" id="txtSearchbox" onkeyup="LoadGrid();" onpaste="LoadGrid();" />
            <a href="javascript:;" id="btnSearch"><span class="glyphicon glyphicon-search"></span></a>
            <a href="javascript:;" id="btnReset"><span class="glyphicon glyphicon-refresh"></span></a>--%>
        <div style="font-size: 14px; margin-bottom: 1.5%; margin-right: -7%">
            Filter: 
            <input type="text" id="txtSearchbox" onkeyup="LoadGrid();" onpaste="LoadGrid();" style="width: 87%" />
            <%--<a href="javascript:;" id="btnSearch"><span class="glyphicon glyphicon-search"></span></a>--%>
            <%--<a href="javascript:;" id="btnReset"><span class="glyphicon glyphicon-refresh"></span></a>--%>
        </div>

        <div class="tenderFilterByTypes">
            <ul>
                <li>
                    <span class="radio">
                        <input type="radio" id="rbtnActiveTender" value="1" name="tenderDeleted" /><span class="radio"></span></span><span class="label">Active Tenders</span>
                </li>
                <li>
                    <span class="radio">
                        <input type="radio" id="rbtnInactiveTender" value="1" name="tenderDeleted" /><span class="radio"></span></span><span class="label">Inactive Tenders</span>
                </li>
            </ul>
        </div>

    </div>

    <div class="tender-management-wrapper">
        <div class="snapdown-wrapper" style="max-width: 100%; overflow-x: scroll;">
            <table>
                <tr>
                    <td colspan="5">
                        <table class="tblSnapdown" id="TenderDetailGrid">
                            <thead id="theadTenderDetails">
                                <tr>
                                    <th></th>
                                    <th>TenderId</th>
                                    <th>ProjectId</th>
                                    <th>Customer<img src="Images/GearIcon.png" data-toggle="modal" data-target="#ColumnSelection" style="height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px; float: right" title="Edit Columns">
                                        <img src="Images/FilterIcon.png" data-toggle="modal" data-target="#FilterColumnSelection" style="height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px; float: right" title="Filter Columns"></th>
                                </tr>
                            </thead>
                            <tbody id="tbodyTenderDetails">
                            </tbody>
                        </table>
                    </td>
                </tr>
                <%-- <tr>
                   
                </tr>--%>
            </table>

        </div>
        <div>
            <table>
                <tr>
                    <td style="width: 58%">
                        <div class="footer-operations">
                            <ul class="action-controls-wrapper">
                                <li><a title="Create Tender" href="NewTender.aspx" class="btn btn-primary" id="btnAddTender"><span class="glyphicon glyphicon glyphicon-plus"></span></a></li>
                                <li><a title="Edit Tender" href="javascript:;" class="btn btn-primary" id="btnEditTender"><span class="glyphicon glyphicon-edit"></span></a></li>
                                <li><a title="Delete Tender" href="javascript:;" class="btn btn-primary" id="btnDeleteTender" onclick="DeleteClick();"><span class="glyphicon glyphicon-remove"></span></a></li>
                                <li><a title="Copy Tender" href="javascript:;" class="btn btn-primary" id="btnCopyTender"><span class="glyphicon glyphicon-copy"></span></a></li>
                                <li><a title="Export Tenders" href="javascript:;" class="btn btn-primary" id="btnExportToExcel"><span class="glyphicon glyphicon-list"></span></a></li>
                                <li><a title="Status Changed" href="javascript:;" class="btn btn-primary" id="btnStatusChanged"><span class="glyphicon glyphicon-tasks"></span></a></li>
                                <li><a title="Revise Tender" href="javascript:;" class="btn btn-primary" id="btnReviseTender"><span class="glyphicon glyphicon-compressed"></span></a></li>
                            </ul>
                        </div>
                    </td>
                    <td style="width: 42%">
                        <table style="max-width: 400px; float: right;">
                            <tr>
                                <td style="max-width: 30%;">Page Size: 
                                </td>
                                <td style="max-width: 20%;">
                                    <select id="drpPageSize" class="form-control" onchange="PagingChange();" style="width: 100%; display: inline-block">
                                        <option value="0">10</option>
                                        <option value="1">20</option>
                                        <option value="2">30</option>
                                        <option value="3">40</option>
                                        <option value="4">50</option>
                                    </select>
                                </td>
                                <td style="max-width: 30%;">
                                    <label id="lblStart"></label>
                                    <label id="lblEnd"></label>
                                </td>
                                <td style="max-width: 20%; padding: 0px !important;">
                                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px; width: 40px" id="btnPrevious" onclick="PreviousClick();">< </button>
                                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px; width: 40px" id="btnNext" onclick="NextClick();">> </button>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <%--<div class="columns-context_menu" id="ContextMenu" style="display: none;">
            <ul>
                <li><a href="javascript:;" id="btnManageColumns" class="btn modal-title" data-toggle="modal" data-target="#ColumnSelection">Manage Columns</a></li>
            </ul>
        </div>--%>
        <div class="inner-detail-rows">
            <table class="innerDetailsTable">
                <tbody></tbody>
            </table>

        </div>

        <div class="modal fade" id="ColumnSelection" role="dialog" style="left: 15%; width: 100%;">
            <div class="modal-dialog" style="margin-top: 100px; width: 41%">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
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
                        <button type="button" class="btn btn-default" id="btnSaveDefaultCustomers" onclick="SaveDefaultColumns('Tenders');LoadGrid();" style="float: left; background-color: #5cb85c; color: white">Default Columns</button>
                        <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="SaveColumns('Tenders');LoadGrid();">Save</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnCloseColumnSelection" onclick="LoadGrid();">Close</button>
                    </div>
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
                                <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="AddNewRow('Tenders');">Add New Filter</button>
                                <br />
                            </div>
                        </div>
                        <div id="FilterControls">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="LoadGrid();">Apply</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="Button2">Close</button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="myStatusChangedModal" role="dialog" style="left: 10%">
        <div class="modal-dialog" style="margin-top: 100px;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" style="width: 2%;">&times;</button>
                    <h4 class="modal-title" style="font-size: 18px">Switch Status</h4>
                </div>
                <div class="modal-body" style="font-size: 12px">
                    <table cellspacing="0" cellpadding="0" style="border: 0px;">
                        <tr>
                            <td style="text-align: left; padding: 0px 9px !important; font-size: 14px; width: 26%">Select Status:
                            </td>
                            <td style="text-align: left; padding: 0px 9px !important; font-size: 14px;">
                                <select id="drpStatusRole" class="form-control" style="width: 95%; display: inline-block; margin-left: 2%;" onchange="ChangeState(this)">
                                    <option value='Select'>----Select----</option>
                                    <option value="1">IN-Process</option>
                                    <option value="2">Submitted</option>
                                    <option value="3">Win</option>
                                    <option value="4">Loss</option>
                                </select>
                            </td>
                        </tr>
                    </table>

                </div>

                <div class="modal-body" id="LOSSREASON" style="display: none; font-size: 12px">
                    <h4 class="modal-title" style="font-size: 18px">Loss Reason</h4>
                    <div class="messageboxWrapper">
                        <textarea id="notificationMessage"></textarea>
                    </div>
                    <h4 class="modal-title" style="font-size: 18px; color: red">*MAX 500 Character</h4>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; width: 12%;" onclick="AssignStatus();">Change</button>
                    <button type="button" id="Button1" class="btn btn-default" data-dismiss="modal" style="width: 12%;">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="myStatusChangedModalDeActive" role="dialog" style="left: 10%">
        <div class="modal-dialog" style="margin-top: 100px;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" style="width: 2%;">&times;</button>
                    <h4 class="modal-title" style="font-size: 18px">Switch Status</h4>
                </div>
                <div class="modal-body" style="font-size: 12px">
                    <table cellspacing="0" cellpadding="0" style="border: 0px;">
                        <tr>
                            <td style="text-align: left; padding: 0px 9px !important; font-size: 14px; width: 26%">Select Status:
                            </td>
                            <td style="text-align: left; padding: 0px 9px !important; font-size: 14px;">
                                <select id="drpStatusRoleDeActive" class="form-control" style="width: 95%; display: inline-block; margin-left: 2%;">
                                    <option value='Select'>----Select----</option>
                                    <option value="5">Active(IN-Process)</option>
                                </select>
                            </td>
                        </tr>
                    </table>

                </div>



                <div class="modal-footer">
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; width: 12%;" onclick="ActiveBudget();">Change</button>
                    <button type="button" id="Button3" class="btn btn-default" data-dismiss="modal" style="width: 12%;">Close</button>
                </div>
            </div>
        </div>
    </div>


    <script src="Scripts/table-sortable.min.js"></script>
    <script src="Scripts/tender-management1.js"></script>


    <script type="text/javascript">
        $j(document).ajaxComplete(function () {
            //if ($j(".tblSnapdown").hasClass("st-container"))
            //    $j(".tblSnapdown").scrolltable('destroy');
            //$j(".tblSnapdown").scrolltable({
            //    stripe: true,
            //    oddClass: 'odd'

            //});
        });


        function ChangeState(elem) {

            var demoId = document.querySelector('#LOSSREASON');
            if (elem.value == '4') {
                demoId.style.display = 'block';
                console.log('block')
            }
            else {
                demoId.style.display = 'none';
                console.log('none');
            };

        }

        $j(document).ready(function () {
            LoadColumnList('Tenders');
            //var drpColumnList = "<option value='test'>Test 1</option>";
            //drpColumnList += "<option value='test'>Test 2</option>";
            //drpSelectedColumnList = drpColumnList;
            //$j("#optional").html(drpColumnList);

            //$j("#selected").html(drpSelectedColumnList);
            //$jq1("#optional").kendoListBox({
            //    connectWith: "selected",
            //    toolbar: {
            //        tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
            //    }
            //});

            //$jq1("#selected").kendoListBox({
            //    connectWith: "optional",
            //    toolbar: {
            //        tools: ["moveUp", "moveDown"]
            //    }
            //});
        });
    </script>
</asp:Content>

