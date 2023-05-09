<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="Search.aspx.cs" Inherits="Search" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <link href="Content/toastr/toastr.css" rel="stylesheet" />
    <link href="Content/css/Loader.css" rel="stylesheet" />

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

    <link href="Content/css/Pagination.css" rel="stylesheet" />

    <link href="Content/css/SelectListBox/Common_Material.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.Mobile.css" rel="stylesheet" />
    <link href="Content/css/SelectListBox/Material.css" rel="stylesheet" />
    <script src="Scripts/SelectListBox/SelectListBox.js"></script>

    <script src="Scripts/Pagination.js"></script>

    <script src="Scripts/SelectListBox/ColumnFilter.js"></script>
    <link href="Content/css/SelectListBox/ColumnFilter.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <h1 class="Search-title">Search</h1>
    <%--<div class="SearchTenderWrapper">

        <div class="form-group">
            <label>Customer name</label>
            <input type="text" id="txtCustomerName" />
        </div>
        <div class="form-group">
            <label>Tender id</label>
            <input type="text" id="txtTenderId" />
        </div>
        <div class="form-group">
            <label>SAP Customer number</label>
            <input type="text" id="txtErpId" />
        </div>
        <div class="form-group">
            <label>Pump type</label>
            <input type="text" id="txtPumpType" />
        </div>
        <div class="form-group">
            <label>Output Pump Supplier</label>
            <input type="text" id="txtOutputPumpSupplier" />
        </div>
        <div class="form-group">
            <label>Seal Supplier</label>
            <input type="text" id="txtSealSupplier" />
        </div>
        <div class="buttonWrapper">
            <a href="javascript:;" class="btn btn-primary" id="btnSearch">Search</a>
            <a href="javascript:;" class="btn btn-default" id="btnReset">Reset</a>
        </div>
    </div>--%>
    <style>
        .serach-wrapper label {
            color: #000;
            padding-bottom: 10px;
            font-weight: normal;
            padding-left: 10px;
        }

        .serach-wrapper {
            position: relative;
            padding-right: 80px;
            padding-top: 20px;
            display: inline-block;
        }

            .serach-wrapper select {
                border: 1px solid #d5d5d5;
                padding: 7px;
            }

            .serach-wrapper .title {
                float: left;
                font-size: 0.9rem;
                font-weight: 900;
                padding-top: 35px;
            }

        a#btnSearch {
            background: #06a4bd;
            display: inline-block;
            padding: 10px;
            font-size: 1rem;
            color: #fff;
            position: absolute;
            right: 40px;
            bottom: 5px;
        }

        ul.action-controls-wrapper li {
            display: table-cell;
            padding-right: 10px;
        }

        span.chbx {
            position: relative;
            display: inline-block;
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
                        left: 5px;
                        position: relative;
                    }
    </style>
    <%--<h2 class="search-secondary-title">Search Result</h2>--%>

    <div class="serach-wrapper" style="width: 33%; margin-left: 0.5%">
        <div style="font-size: 14px; margin-bottom: 1.5%; margin-right: 3%">
            Filter: 
            <input type="text" id="txtSearchbox" onkeyup="LoadGrid();" onpaste="LoadGrid();" style="width: 87%" />
            <a href="javascript:;" id="btnSearch"><span class="glyphicon glyphicon-search"></span></a>
            <%--<a href="javascript:;" id="btnReset"><span class="glyphicon glyphicon-refresh"></span></a>--%>
        </div>
    </div>
    <div class="SearchResultsWrapper" style="margin-top: 1%; max-width: 100%; overflow-x: scroll;">
        <table>
            <tr>
                <td colspan="5">
                    <table id='searchResultsTable' style="cursor: pointer">
                        <thead id="theadSearch">
                            <tr>
                                <th>ProjectId</th>
                                <th>TenderId</th>
                                <th>Customer</th>
                                <th>Customer SAP Reference
                        <img src="Images/GearIcon.png" data-toggle="modal" data-target="#ColumnSelection" style="height: 18px; vertical-align: middle; margin-right: 2px; margin-top: -2px; float: right" title="Edit Columns">
                                    <img src="Images/FilterIcon.png" data-toggle="modal" data-target="#FilterColumnSelection" style="height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px; float: right" title="Filter Columns">
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tbodySearch">
                            <tr>
                                <td colspan='4' style="display: block">No record found</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="footer-operations">
                        <ul class="action-controls-wrapper">
                            <li><a title="Edit Tender" href="javascript:;" class="btn btn-primary" id="btnEditTender"><span class="glyphicon glyphicon-edit"></span></a></li>
                            <li><a title="Copy Tender" href="javascript:;" class="btn btn-primary" id="btnCopyTender"><span class="glyphicon glyphicon-copy"></span></a></li>
                            <li><a title="Export Tenders" href="javascript:;" class="btn btn-primary" id="btnExportToExcel"><span class="glyphicon glyphicon-list"></span></a></li>
                        </ul>
                    </div>
                </td>
                <td>
                    <table style="max-width: 400px; float: right;">
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
                            <div>
                                <label for="optional" id="employees" style="font-size: 16px; text-align: center; width: 225px;">Column List</label>
                                <label for="selected" style="font-size: 16px; text-align: right; width: 235px;">Selected Columns</label>
                                <br />
                                <select id="optional" style="font-size: 14px">
                                </select>
                                <select id="selected" style="font-size: 14px"></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="SaveColumns('Tenders');LoadGrid();">Save</button>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="Button1">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="Scripts/Search.js"></script>
</asp:Content>

