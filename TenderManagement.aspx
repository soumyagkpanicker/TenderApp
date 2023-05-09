<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="TenderManagement.aspx.cs" Inherits="TenderManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <link href="Content/css/tender-management.css" rel="stylesheet" />
    <link href="Content/css/Pagination.css" rel="stylesheet" />
    <link href="Content/css/sytle.min.css" rel="stylesheet" />
    <link href="Content/css/table-sortable.css" rel="stylesheet" />
    <link href="Content/css/Loader.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="Scripts/jquery-1.9.1.js"></script>
    <script type="text/javascript">
var $j=jQuery.noConflict();
    </script>
    <script src="Scripts/Pagination.js"></script>
    <div id="loadingDiv">
        <div id="loader"></div>
    </div>
    <h1>Tender Management</h1>
    <div class="actionPanel">
        <ul>

            <li>
                <div class="serach-wrapper">
                    <div class="title">Filter: </div>
                    <div class="label">
                        <label>Select a column</label>
                    </div>
                    <div class="Search-controls">
                        <select id="ddSearchColumns">
                            <option value="Tender Id" class="textbox">Tender Id</option>
                            <option value="Project Id" class="textbox">Project Id</option>
                            <option value="Date of creation" class="date">Date of creation</option>
                            <option value="Created by" class="textbox">Created by</option>
                            <option value="Modified Date" class="date">Modified date</option>
                        </select>
                        <input type="text" id="txtSearchbox" />
                    </div>
                    <a href="javascript:;" id="btnSearch"><span class="glyphicon glyphicon-search"></span></a>
                </div>

            </li>

        </ul>

    </div>
    <div class="tenderFilterByTypes">
        <ul>
            <li>
                <span class="radio">
                    <input type="radio" id="rbActiveTenders" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">My active tenders</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbOpenTenders" value="1" name="tenderTypes" /><span class="radio"></span></span><span class="label">My open tenders</span>
            </li>
            <li>
                <span class="radio">
                    <input type="radio" id="rbAllOpenTenders" value="1" name="tenderTypes" checked /><span class="radio"></span></span><span class="label">All open tenders</span>
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

    <div class="TendersListWrapper">

        <table id="tblTenders">
            <thead>
                <tr>
                    <th>Tender Guid</th>
                    <th class="selector-column"></th>
                    <th data-column="Tender Id">Tender id<span class="glyphicon glyphicon-chevron-down"></span></th>
                    <th data-column="Project Id">Project id<span class="glyphicon glyphicon-chevron-down"></span></th>
                    <th data-column="Date of creation">Date of creation<span class="glyphicon glyphicon-chevron-down"></span></th>
                    <th data-column="Customer">Customer<span class="glyphicon glyphicon-chevron-down"></span></th>
                    <th data-column="Created by">Created by<span class="glyphicon glyphicon-chevron-down"></span></th>
                    <th data-column="Modified date">Modified Date<span class="glyphicon glyphicon-chevron-down"></span></th>
                </tr>
            </thead>
            <tbody>
            </tbody>

        </table>
        <div class="footer-operations">
            <ul class="action-controls-wrapper">
                <li><a title="Create Tender" href="NewTender.aspx" class="btn btn-primary" id="btnAddTender"><span class="glyphicon glyphicon glyphicon-plus"></span></a></li>
                <li><a title="Edit Tender" href="javascript:;" class="btn btn-primary" id="btnEditTender"><span class="glyphicon glyphicon-edit"></span></a></li>
                <li><a title="Delete Tender" href="javascript:;" class="btn btn-primary" id="btnDeleteTender"><span class="glyphicon glyphicon-remove"></span></a></li>
                <li><a title="Copy Tender" href="javascript:;" class="btn btn-primary" id="btnCopyTender"><span class="glyphicon glyphicon-copy"></span></a></li>
            </ul>
            <div id="Pagination">
                <p class="error-msg"></p>
                <div class="pagination-counter">
                    <ul>
                        <li class="previous"><a href="javascript:;" class="btn btn-primary disabled" id="btnPrevious"><span class="glyphicon glyphicon-chevron-left"></span></a></li>
                        <li class="pages"></li>
                        <li class="next"><a href="javascript:;" class="btn btn-primary" id="btnNext"><span class="glyphicon glyphicon-chevron-right"></span></a></li>

                    </ul>
                </div>
                <select class="pagination-count">
                    <option value="6">5</option>
                    <!-- REmove the css above after removing this-->
                    <option value="11">10</option>
                    <option value="16">20</option>
                    <option value="31">30</option>
                    <option value="41">40</option>
                    <option value="51">50</option>
                </select>

            </div>
        </div> 

    </div>

    <script src="Scripts/table-sortable.min.js"></script>
    <script src="Scripts/tender-management.js"></script>
</asp:Content>

