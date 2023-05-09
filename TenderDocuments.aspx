<%@ Page Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="TenderDocuments.aspx.cs" Inherits="TenderDocuments" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server" style="width: 100%">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>--%>
    <style type="text/css">
          #tblTenderDocuments .opened .arrow-down {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            margin-top:2.5px;
        }

         #tblTenderDocuments .arrow-down {
            margin-right: 12px !important;
        }

        #thTenderDocuments tr span.sortImage {
            width: 13px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            right: 10px;
        }



            #thTenderDocuments tr span.sortImage img {
                max-width: 100%;
            }

        #thTenderDocuments span.text {
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
    <link href="Content/toastr/toastr.css" rel="stylesheet" />
    <link href="Content/css/Loader.css" rel="stylesheet" />
    <link href="Content/toastr/toastr.css" rel="stylesheet" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <h1>Tender Documents</h1>
    <br />
    <br />
    <div id="loadingDiv">
        <div id="loader"></div>
    </div>
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog" style="margin-top: 100px;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="font-size: 18px">Add New Document</h4>
                </div>
                <div class="modal-body" style="font-size: 12px">
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="width: 20%; vertical-align: middle">Project
                            </td>
                            <td>
                                <select id="drpProjects" class="form-control" style="width: 96%;" onchange="LoadTenderList();">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%; vertical-align: middle">Tender
                            </td>
                            <td>
                                <select id="drpTenders" class="form-control" style="width: 96%;" onchange="LoadItemList();">
                                    <option value="0">Select</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 20%; vertical-align: middle">Tender
                            </td>
                            <td>
                                <select id="drpItems" class="form-control" style="width: 96%;" onchange="ValidateSelection();">
                                    <option value="0">Select</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <input type="file" id="FileUpload1" multiple style="width: 94%; margin-left: 10px; margin-top: 20px; margin-bottom: 20px;" disabled="disabled" accept=".pdf,.doc,.docx" />
                    <%--accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />--%>
                    <%--<input type="button" id="btnUpload" value="Upload Files" />--%>
                    <div align="center">
                        <table id="tblUploadedFiles" style="display: none;">
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnUpload" class="btn modal-title" style="background-color: #5cb85c; color: white" onclick="UploadFiles();" disabled="disabled">Upload Files</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="action-panel" style="width: 97%">
            <ul>
                <li>
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" style="padding: 5px 10px; font-size: 16px" id="btnAddCustomer" onclick="UploadFileClick();">Upload Files</button>
                </li>
                <li>
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px" id="btnDeleteFiles" onclick="DeleteClick();">Delete Files </button>
                </li>
                <%--<li>
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px" id="btnEditCustomer" onclick="EditClick();">Edit Customer </button>                    
                </li>--%>
            </ul>
        </div>
    <div style="margin-top: 5px; width: 100% !important;overflow-x: scroll;border: solid 2px;" align="center">
        
        <table style="width: 97% !important; border-collapse: collapse; border-color: gray;"
            cellspacing="0" cellpadding="0">
            <tr>
                <td colspan="4">
                    <table cellspacing="0" cellpadding="0" style="width: 620px !important">
                        <tr>
                            <td style="max-width: 200px">Search :
                                <input type="text" maxlength="100" id="txtSearch" style="width: 74%" onkeyup="LoadDistinctProjectList();" onpaste="LoadDistinctProjectList();" />
                            </td>
                            <%--<td style="max-width: 200px">Search From
                            </td>
                            <td style="max-width: 200px">
                                <select id="drpSearchColumn" class="form-control" onchange="LoadGrid();" style="width: 80%; display: inline-block">
                                    <option value="ProjectId">Project Id</option>
                                    <option value="TenderId">Tender Id</option>
                                    <option value="FileName">File Name</option>
                                </select>
                            </td>--%>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <hr />
                    <div style="margin-top: 5px; margin-left: -0.5%; width: 100% !important; max-width: 100%; overflow-x: scroll;" align="center">
                        <table id="tblTenderDocuments" class="tblSnapdown" style="width: 100%; cursor: pointer; border-collapse: collapse;">
                            <thead id="thTenderDocuments">
                                <tr>
                                    <th style="width: 2%; padding-bottom: 10px !important; padding-top: 10px !important;">Select
                                    </th>
                                    <th onclick="SortRecords('ProjectId')" style="width: 11%;min-width: 230px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span><span class='text'>Project Id</span>
                                    </th>
                                    <th onclick="SortRecords('TenderId')" style="width: 10%;min-width: 230px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span>
                                        <span class='text'>Tender Id</span>
                                    </th>
                                    <th onclick="SortRecords('ItemId')" style="width: 10%;min-width: 150px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span>
                                        <span class='text'>Item Id</span>
                                    </th>
                                    <th onclick="SortRecords('FileName')" style="width: 14%;min-width: 150px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span><span class='text'>File Name</span>
                                    </th>
                                    <th onclick="SortRecords('Location')" style="width: 14%;min-width: 150px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span><span class='text'>Location</span>
                                    </th>
                                    <th onclick="SortRecords('UploadedBy')" style="width: 14%;min-width: 150px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span><span class='text'>Uploaded By</span>
                                    </th>
                                    <th onclick="SortRecords('OriginalPumpManufacturer')" style="width: 14%;min-width: 150px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span><span class='text'>Original Pump Manufacturer</span>
                                    </th>
                                    <th onclick="SortRecords('PumpType')" style="width: 14%;min-width: 150px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span><span class='text'>PumpType</span>
                                    </th>
                                    <th onclick="SortRecords('Role')" style="width: 14%;min-width: 150px;">
                                        <span class='sortImage'><img src="Images/sort-arrows.png" style="height: 14px; vertical-align: middle; margin-right: 2px; margin-left: -8px; margin-top: -3px;"></span><span class='text'>Role</span>
                                    </th>
                                    <th>
                                        <img src='Images/FilterIcon.png' data-toggle='modal' data-target='#FilterColumnSelection' style='height: 18px; vertical-align: middle; margin-right: 10px; margin-top: -2px; float: right' title='Filter Columns'>
                                    </th>
                                    <%--<th style="width: 24%">File Path
                                </th>--%>
                                </tr>
                            </thead>
                            <%-- <tbody id="TenderDocsIndoBody">
                            </tbody>--%>
                        </table>
                    </div>
                    <div id="Customer_Pagination">
                    </div>
                </td>
            </tr>
            <tr>
                <td style="border-color: gray; border: solid 2px;">
                    <table style="max-width: 405px;">
                        <tr>
                            <td style="max-width: 32px;">Page Size: 
                            </td>
                            <td style="max-width: 33px;">
                                <select id="drpPageSize" class="form-control" onchange="PagingChange();" style="width: 100%; display: inline-block">
                                    <option value="0">10</option>
                                    <option value="1">20</option>
                                    <option value="2">30</option>
                                    <option value="3">40</option>
                                    <option value="4">50</option>
                                </select>
                            </td>
                            <td style="max-width: 40px;">
                                <label id="lblStart"></label>
                                <label id="lblEnd"></label>
                            </td>
                            <td style="max-width: 48px;">
                                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px; width: 40px" id="btnPrevious" onclick="PreviousClick();">< </button>
                                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" style="padding: 5px 10px; font-size: 16px; width: 40px" id="btnNext" onclick="NextClick();">> </button>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div class="modal fade" id="FilterColumnSelection" role="dialog" style="width: 100%;">
        <div class="modal-dialog" style="margin-top: 100px; width: 41%">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" onclick="LoadDistinctProjectList();">&times;</button>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="Button1" onclick="LoadDistinctProjectList();">Close</button>
                </div>
            </div>
        </div>
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

        th, td {
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
            font-size: 16px;
        }

        .selected {
            background-color: #BDC3C7 !important;
            vertical-align: middle;
            padding: 1.5em;
        }

        input[type=file], input[type=text], textarea {
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
    <style type="text/css">
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
        }

        table.tblSnapdown .arrow-down {
   
            display: inline-block;
            vertical-align: top;
            margin-top: 2px;
        }

        tr.parent-row_1 td:first-child {
            width: 13%;
        }

        span.chbx {
            position: relative;
            display: inline-block;
  margin-left: 8px;
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

        tr.parent-row_1:not(.opened) td {
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
    </style>
    <script type="text/javascript">
        var FileId = "";
        var PageNo = 1;
        var SortingOrder = "Asc";
        var SortingColumn = "Id";
        var rowSelectCount = 0;

        var InsertRights = false;
        var EditRights = false;
        var DeleteRights = false;

        InsertFileCountr = 0;
        // Create FormData object  

        var ListFiles = [];
        var FileDetails = [];



        $jq1(document).ready(function () {
            //LoadGrid();
            LoadDistinctProjectList();
            $jq1('#FileUpload1').change(LoadUploadedFiles);
            document.getElementById("loadingDiv").style.display = "none";
            checkRights();
            //LoadProjectList();


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
                                    var parendtTenderId1 = $jq1(this).data("parenttenderid");
                                    if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0 && clickedTenderId1 == parendtTenderId1) {
                                        if (elem.hasClass("opened")) {
                                            var Temp2 = 1;
                                            var countFile2 = $jq1(this).data("filecounts");
                                            var clickedItemId2 = $jq1(this).attr("id");
                                            var elem2 = $jq1(this);
                                            $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                                                var parendtItemId2 = $jq1(this).data("parentitemid");
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
                        var parendtTenderId = $jq1(this).data("parenttenderid");
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
                                var countFile = $jq1(this).data("filecounts");
                                var clickedItemId1 = $jq1(this).attr("id");
                                var elem1 = $jq1(this);
                                $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                                    var parendtItemId1 = $jq1(this).data("parentitemid");
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
                    var countFile = $jq1(this).data("filecounts");
                    var clickedItemId = $jq1(this).attr("id");
                    $jq1("#tbody_" + CounterValue + " > tr ").each(function () {
                        var parendtItemId = $jq1(this).data("parentitemid");
                        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId == parendtItemId) {
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

        function LoadGrid() {
            var jsonObj = [];
            var customerData = {};
            customerData["PageNo"] = PageNo;
            customerData["PageSize"] = $jq1("#drpPageSize option:selected").text();
            customerData["SearchText"] = $jq1("#txtSearch").val();
            //customerData["SearchColumn"] = $jq1("#drpSearchColumn option:selected").val();
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
                    }
                });
            });
            jsonObj1.push(customerData1);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADTENDERDOCUMENTS',
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
                            for (i in jsonData.Table) {
                                GridString = GridString + "<tr id='tr" + jsonData.Table[i].Id + "'><td style='text-align: center'><input class='ClassCheck' type='checkbox' onclick='rowClick(" + jsonData.Table[i].Id + ")' id='chk" + jsonData.Table[i].Id + "' /></td><td>" + jsonData.Table[i].ProjectId + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].TenderId + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].ItemId + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].FileName + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].Location + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].UploadedBy + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].OriginalPumpManufacturer + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].PumpType + "</td>";
                                GridString = GridString + "<td>" + jsonData.Table[i].Role + "</td>";
                                //GridString = GridString + "<td>" + jsonData.Table[i].FilePath + "</td>";
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
                        }
                        else {
                            $jq1("#lblStart").text("0 - 0 of ");
                            $jq1("#lblEnd").text("0");
                            $jq1("#btnNext").attr("disabled", true);
                            $jq1("#btnPrevious").attr("disabled", true);
                            GridString = "<tr><td colspan='5' style='text-align: center;padding: 8px !important;'>No Data Found</td></tr>";
                        }
                        $jq1('#TenderDocsIndoBody').html(GridString);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus + " " + errorThrown);
                },
            });
        }

        function NextClick() {
            PageNo = PageNo + 1;
            LoadDistinctProjectList();
        }

        function PreviousClick() {
            PageNo = PageNo - 1;
            LoadDistinctProjectList();
        }

        function PagingChange() {
            PageNo = 1;
            LoadDistinctProjectList();
        }

        function rowClick(Id) {
            //$jq1('input.ClassCheck').not(this).prop('checked', false);
            if ($jq1('#chk' + Id).prop("checked") == false) {

                $jq1('#tr' + Id).removeClass('selected');
                rowSelectCount -= 1;

                if (FileId.toString().indexOf(Id.toString() + ",") != -1) {
                    FileId = FileId.replace(Id.toString() + ",", '')
                }
                else if (FileId.indexOf("," + Id.toString()) != -1) {
                    FileId = FileId.replace("," + Id.toString(), '')
                }
                else {
                    FileId = FileId.replace(Id.toString(), '')
                }
            }
            else {
                $jq1('#tr' + Id).addClass('selected');
                rowSelectCount += 1;
                if (FileId == "") {
                    FileId = "" + Id;
                }
                else {
                    FileId = FileId + "," + Id;
                }
            }

            if (rowSelectCount > 0 && DeleteRights == true) {
                $jq1("#btnDeleteFiles").removeAttr("disabled");
            }
            else {
                $jq1("#btnDeleteFiles").attr("disabled", "disabled");
            }

            //$jq1('#tr' + Id).addClass('selected').siblings().removeClass('selected');
        }

        function UploadFileClick() {
            LoadProjectList();
            $jq1("#FileUpload1").val("");
            $jq1("#tblUploadedFiles").css("display", "none");
            $jq1("#tblUploadedFiles").html("");
            $jq1("#drpProjects").val("0");
            $jq1("#drpTenders").val("0");
            $jq1("#drpTenders").html("<Option value=0>Select</Option>");
            $jq1("#drpItems").html("<Option value=0>Select</Option>");
            $jq1("#FileUpload1").attr("disabled", "disabled");
            FileDetails = [];
            ListFiles = [];
        }

        //function DeleteClick() {
        //    if (confirm('Are you sure you want to Delete files ?') == true) {
        //        document.getElementById("loadingDiv").style.display = "block";
        //        var jsonObj = [];
        //        var FileData = {};

        //        FileData["FileId"] = FileId;

        //        jsonObj.push(FileData);

        //        $jq1.ajax({
        //            url: 'ServiceHandler.ashx?CBH=DELETETENDERDOCUMENTS',
        //            cache: false,
        //            async: false,
        //            dataType: 'html',
        //            data: {
        //                data: JSON.stringify(jsonObj)
        //            },
        //            success: function (data) {
        //                if (data == "Error") {
        //                    toastr.error('Count not delete the document!', 'Error', { timeOut: 5000 });
        //                }
        //                else {
        //                    if (data == "Success") {
        //                        toastr.success('Deleted successfully!', 'Success', { timeOut: 5000 });
        //                    }
        //                    else {
        //                        toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
        //                    }
        //                    LoadDistinctProjectList();
        //                    $jq1("#btnDeleteFiles").attr("disabled", "disabled");
        //                    FileId = "";
        //                }
        //            },
        //            error: function (jqXHR, textStatus, errorThrown) {
        //                toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
        //            },
        //        });
        //        document.getElementById("loadingDiv").style.display = "none";
        //    }
        //}

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
            LoadDistinctProjectList();
            document.getElementById("loadingDiv").style.display = "none";
        }

        function UploadFiles() {
            // Checking whether FormData is available in browser  
            if (window.FormData !== undefined) {
                document.getElementById("loadingDiv").style.display = "block";
                var fileUpload = $jq1("#FileUpload1").get(0);

                if (fileUpload.files.length > 0) {
                    var uploadedfiles = fileUpload.files;

                    //Looping over all files and add it to FormData object  
                    var fileData = new FormData();
                    for (var i = 0; i < FileDetails.length; i++) {
                        //if ($jq1("#tblUploadedFiles td:contains(" + uploadedfiles[i].name + ")").length > 0) {
                        fileData.append(FileDetails[i][0], FileDetails[i][1]);
                        //}
                    }

                    //Adding one more key to FormData object  
                    fileData.append('ProjectId', $jq1("#drpProjects option:selected").text());
                    fileData.append('TenderId', $jq1("#drpTenders option:selected").text());
                    fileData.append('TenderUniqueId', $jq1("#drpTenders option:selected").val());
                    fileData.append('ItemId', $jq1("#drpItems option:selected").val());

                    fileData.append('UploadedBy', $jq1(".user-information .username").text());
                    fileData.append('UploadLocation', $jq1(".user-information .location").text());
                    fileData.append('UploadedRole', $jq1(".user-information .role").text());

                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=UPLOADFILES',
                        type: "POST",
                        data: fileData,
                        async: false,
                        contentType: false,
                        dataType: 'json',
                        processData: false,
                        success: function (err) {
                            if (err.responseText == "success") {
                                toastr.success('Documents uploaded successfully!', 'Success', { timeOut: 5000 });
                                LoadDistinctProjectList();
                                fileData = "";
                                $jq1('button.close').trigger("click");
                            }
                            else {
                                toastr.error('Something went wrong, Please try again!', 'Error', { timeOut: 5000 })
                            }
                        },
                        error: function (err) {
                            //alert(err.statusText);
                            if (err.responseText == "Success") {
                                toastr.success('Documents uploaded successfully!', 'Success', { timeOut: 5000 });
                                LoadDistinctProjectList();
                                $jq1('button.close').trigger("click");
                                $jq1("#btnDeleteFiles").attr("disabled", "disabled");
                                FileId = "";
                            }
                            else {
                                toastr.error('Something went wrong, Please try again!', 'Error', { timeOut: 5000 })
                            }
                        }
                    });
                }
                else {
                    toastr.error('Please select at least one file!', 'Error', { timeOut: 5000 })
                }
                document.getElementById("loadingDiv").style.display = "none";
            } else {
                toastr.error('FormData is not supported.!', 'Error', { timeOut: 5000 })
            }
        }

        function LoadProjectList() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADPROJECTS',
                cache: false,
                async: false,
                dataType: 'html',
                success: function (data) {
                    var jsonData = JSON.parse(data);
                    var drpProject = "<Option value=0>Select</Option>"
                    for (i in jsonData) {
                        drpProject += "<Option value='" + jsonData[i].ProjectId + "'>" + jsonData[i].ProjectId + "</Option>";
                    }
                    $jq1("#drpProjects").html("");
                    $jq1("#drpProjects").html(drpProject);
                    //var drpTender = "<Option value=0>Select</Option>"
                    //for (i in jsonData.Table1) {
                    //    drpTender += "<Option value='" + jsonData.Table1[i].TenderId + "'>" + jsonData.Table1[i].TenderId + "</Option>";
                    //}
                    //$jq1("#drpTenders").html(drpTender);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus + " " + errorThrown);
                },
            });
        }

        function LoadTenderList() {
            if ($jq1("#drpProjects option:selected").val() == 0) {
                var drpTender = "<Option value=0>Select</Option>"
                $jq1("#drpTenders").html("");
                $jq1("#drpTenders").html(drpTender);
            }
            else {
                var jsonObj = [];
                var customerData = {};
                customerData["ProjectId"] = $jq1("#drpProjects option:selected").text();

                jsonObj.push(customerData);

                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=LOADTENDERS',
                    cache: false,
                    async: false,
                    dataType: 'html',
                    data: {
                        data: JSON.stringify(jsonObj)
                    },
                    success: function (data) {
                        var jsonData = JSON.parse(data);
                        //var drpProject = "<Option value=0>Select</Option>"
                        //for (i in jsonData.Table) {
                        //    drpProject += "<Option value='" + jsonData[i].ProjectId + "'>" + jsonData[i].ProjectId + "</Option>";
                        //}
                        //$jq1("#drpProjects").html(drpProject);

                        var drpTender = "<Option value=0>Select</Option>"
                        for (i in jsonData) {
                            drpTender += "<Option value='" + jsonData[i].TenderUniqueId + "'>" + jsonData[i].TenderId + "</Option>";
                        }
                        $jq1("#drpTenders").html("");
                        $jq1("#drpTenders").html(drpTender);

                        ValidateSelection();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert(textStatus + " " + errorThrown);
                    },
                });
            }
        }

        function LoadItemList() {
            if ($jq1("#drpTenders option:selected").val() == 0) {
                var drpItems = "<Option value=0>Select</Option>"
                $jq1("#drpItems").html("");
                $jq1("#drpItems").html(drpItems);
            }
            else {
                var jsonObj = [];
                var customerData = {};
                customerData["ProjectId"] = $jq1("#drpProjects option:selected").text();
                customerData["TenderId"] = $jq1("#drpTenders option:selected").text();

                jsonObj.push(customerData);

                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=LOADITEMS',
                    cache: false,
                    async: false,
                    dataType: 'html',
                    data: {
                        data: JSON.stringify(jsonObj)
                    },
                    success: function (data) {
                        var jsonData = JSON.parse(data);

                        var drpItems = "<Option value=0>Select</Option>"
                        for (i in jsonData) {
                            drpItems += "<Option value='" + jsonData[i].ItemId + "'>" + jsonData[i].ItemId + "</Option>";
                        }
                        $jq1("#drpItems").html("");
                        $jq1("#drpItems").html(drpItems);

                        ValidateSelection();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert(textStatus + " " + errorThrown);
                    },
                });
            }
        }

        function LoadUploadedFiles() {
            var fileUpload = $jq1("#FileUpload1").get(0);

            if (fileUpload.files.length > 0) {
                var uploadedfiles = fileUpload.files;

                var UploadedFileList = "";
                UploadedFileList = "<tr><th style='width: 87%;'>File Name</th><th>Actions</th></tr>"

                for (var i = 0; i < uploadedfiles.length; i++) {
                    //fileData.append(uploadedfiles[i].name, uploadedfiles[i]);
                    FileDetails.push([uploadedfiles[i].name, uploadedfiles[i]]);
                    ListFiles.push(uploadedfiles[i].name);
                    //ListFiles.push(uploadedfiles[i].name);
                }
                for (var i = 0; i < ListFiles.length; i++) {
                    UploadedFileList += "<tr id='tr_" + i + "'><td>" + ListFiles[i] + "</td><td><input type='image' src='Images/Delete.png' style='width: 20px; height: 20px; margin-left: 18px;' onclick='RemoveFileFromList(" + i + ");'/></td></tr>";
                    //InsertFileCountr += InsertFileCountr;
                }
                $jq1("#tblUploadedFiles").html(UploadedFileList);
                $jq1("#tblUploadedFiles").css("display", "inline-block");
                $jq1("#btnUpload").removeAttr("disabled");
            }
        }

        function RemoveFileFromList(id) {
            $jq1('table#tblUploadedFiles tr#tr_' + id).remove();
            if (document.getElementById("tblUploadedFiles").getElementsByTagName("tr").length > 1) {
                $jq1("#tblUploadedFiles").css("display", "inline-block");
                $jq1("#btnUpload").removeAttr("disabled");
            }
            else {
                $jq1("#tblUploadedFiles").css("display", "none");
                $jq1("#FileUpload1").val("");
                $jq1("#btnUpload").attr("disabled", "disabled");

            }

            ListFiles.splice(id, 1);
            FileDetails.splice(id, 1);
        }

        function ValidateSelection() {
            if ($jq1("#drpProjects option:selected").val() == 0 || $jq1("#drpTenders option:selected").val() == 0 || $jq1("#drpItems option:selected").val() == 0) {
                $jq1("#FileUpload1").attr("disabled", "disabled");
                $jq1("#btnUpload").attr("disabled", "disabled");
            }
            else {
                $jq1("#FileUpload1").removeAttr("disabled");
                $jq1("#btnUpload").removeAttr("disabled");
            }
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
                                $jq1("#btnAddCustomer").attr("disabled", true);
                            }
                            else {
                                InsertRights = true;
                            }
                            if (jsonData[i].Update == true) {
                                EditRights = true;
                            }
                            if (jsonData[i].Delete == false) {
                                $jq1("#btnDeleteFiles").attr("disabled", true);
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

        function AddNewRow() {

            var jsonObj = [];
            var customerData = {};

            customerData["TableName"] = "tblTenderDocuments";
            customerData["UserName"] = getCookie("UserName");

            jsonObj.push(customerData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETTENDERDOCUMENTSCOLUMNNAMES',
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
                        if (jsonData.length == 0) {
                            toastr.error('You have not selected any column!', 'Warning', { timeOut: 5000 });
                            return;
                        }
                        else if ($jq1('#FilterControls').find('input:text').length == jsonData.length) {
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
                            var ddlCustomers = $jq1("<select />");
                            if (jsonData.length > 0) {
                                drpColumnList += "<option value='Select'>----Select----</option>";
                                for (i in jsonData) {
                                    COLUMN_NAME = jsonData[i].COLUMN_NAME;
                                    var FindVal = 0;
                                    for (j = 0; j < SelectList.length; j++) {
                                        if (SelectList[j] == COLUMN_NAME) {
                                            FindVal = 1;
                                        }
                                    }
                                    if (FindVal == 0)
                                        if (COLUMN_NAME != "IsDeleted" && COLUMN_NAME != "FilePath" && COLUMN_NAME != "Id") {
                                            drpColumnList += "<option value=" + COLUMN_NAME + ">" + COLUMN_NAME + "</option>";
                                        }
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
            if ($jq1('#FilterControls').find('div').length > 0) {
                $jq1('#FilterControls').find('div').each(function () {
                    $jq1(this).find('select').each(function () {
                        if (this[this.options.selectedIndex].text != "----Select----") {
                            if ($jq1.trim($jq1(this).next('input').val()) != "") {
                                //customerData1[this[this.options.selectedIndex].text] = $jq1(this).next('input').val();
                                LoadDistinctProjectList();
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
            }
            else {
                LoadDistinctProjectList();
            }
            //LoadGrid();
        }

        function TenderCollapse() {
            alert("TenderCollapse");
        }
        var Counter = 0;
        function LoadDistinctProjectList() {
            var GridString = "";

            var jsonObj = [];
            var customerData = {};
            customerData["PageNo"] = PageNo;
            customerData["PageSize"] = $jq1("#drpPageSize option:selected").text();
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
                    }
                });
            });
            jsonObj1.push(customerData1);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOADPDISTINCTROJECTS',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj),
                    data1: JSON.stringify(jsonObj1)
                },
                success: function (Projectdata) {
                    var ProjectJsonData = JSON.parse(Projectdata);
                    for (ProjectIndex in ProjectJsonData.Table) {
                        //drpProject += "<Option value='" + jsonData[i].ProjectId + "'>" + jsonData[i].ProjectId + "</Option>";
                        GridString = GridString + "<tbody id='tbody_" + Counter + "'> <tr data-tendercounts='" + ProjectJsonData.Table1[ProjectIndex].TenderCount + "' data-counter='" + Counter + "' class='parent-row_1 ProjectClass' id='tr_" + Counter + "_Project_" + ProjectJsonData.Table[ProjectIndex].ProjectId + "'><td style='text-align: center'><span class='chbx'><input data-delete='project' data-projectid='" + ProjectJsonData.Table[ProjectIndex].ProjectId + "' class='ClassCheck' type='checkbox' onclick='chkProjectClick(this," + Counter + ",&quot;" + ProjectJsonData.Table[ProjectIndex].ProjectId + "&quot;,event)' id='chk_" + Counter + "_Project_" + ProjectJsonData.Table[ProjectIndex].ProjectId + "' /><span class='checkbox'></span></span></td><td colspan='10' style='vertical-align: middle;'> <i class='arrow-down'></i>" + ProjectJsonData.Table[ProjectIndex].ProjectId + "</td></tr>";
                        var TenderjsonObj = [];
                        var tendersData = {};
                        tendersData["ProjectId"] = ProjectJsonData.Table[ProjectIndex].ProjectId;

                        TenderjsonObj.push(tendersData);

                        $jq1.ajax({
                            url: 'ServiceHandler.ashx?CBH=LOADDISTINCTTENDERS',
                            cache: false,
                            async: false,
                            dataType: 'html',
                            data: {
                                data: JSON.stringify(TenderjsonObj)
                            },
                            success: function (Tenderdata) {
                                var TenderJsonData = JSON.parse(Tenderdata);
                                for (TenderIndex in TenderJsonData.Table) {
                                    GridString = GridString + "<tr data-parentprojectid='tr_" + Counter + "_Project_" + ProjectJsonData.Table[ProjectIndex].ProjectId + "' data-itemcounts='" + TenderJsonData.Table1[TenderIndex].ItemCount + "' data-counter='" + Counter + "' style='display:none' class='parent-row_1 TenderClass' id='tr_" + Counter + "_Tender_" + TenderJsonData.Table[TenderIndex].TenderId + "'><td style='text-align: center'><span class='chbx'><input data-delete='tender' data-tenderid='" + TenderJsonData.Table[TenderIndex].TenderId + "' class='ClassCheck' type='checkbox' onclick='chkTenderClick(this," + Counter + ",&quot;" + TenderJsonData.Table[TenderIndex].TenderId + "&quot;,event)' id='chk_" + Counter + "_Tender_" + TenderJsonData.Table[TenderIndex].TenderId + "' /><span class='checkbox'></span></span></td><td></td><td colspan='9' style='vertical-align: middle;'><i class='arrow-down'></i> " + TenderJsonData.Table[TenderIndex].TenderId + "</td></tr>";
                                    var ItemsjsonObj = [];
                                    var itemData = {};
                                    itemData["ProjectId"] = ProjectJsonData.Table[ProjectIndex].ProjectId;
                                    itemData["TenderId"] = TenderJsonData.Table[TenderIndex].TenderId;

                                    ItemsjsonObj.push(itemData);

                                    $jq1.ajax({
                                        url: 'ServiceHandler.ashx?CBH=LOADDISTINCTITEMS',
                                        cache: false,
                                        async: false,
                                        dataType: 'html',
                                        data: {
                                            data: JSON.stringify(ItemsjsonObj)
                                        },
                                        success: function (Itemdata) {
                                            var ItemJsonData = JSON.parse(Itemdata);
                                            for (ItemIndex in ItemJsonData.Table) {
                                                //drpItems += "<Option value='" + jsonData[i].ItemId + "'>" + jsonData[i].ItemId + "</Option>";
                                                GridString = GridString + "<tr data-filecounts='" + ItemJsonData.Table1[ItemIndex].FileCount + "' data-parenttenderid='tr_" + Counter + "_Tender_" + TenderJsonData.Table[TenderIndex].TenderId + "' data-counter='" + Counter + "' style='display:none' class='parent-row_1 ItemClass' id='tr_" + Counter + "_Item_" + ItemJsonData.Table[ItemIndex].ItemId + "'><td style='text-align: center'><span class='chbx'><input data-delete='item' data-itemid='" + ItemJsonData.Table[ItemIndex].ItemId + "' class='ClassCheck' type='checkbox' onclick='chkItemClick(this," + Counter + ",&quot;" + ItemJsonData.Table[ItemIndex].ItemId + "&quot;,event)' id='chk_" + Counter + "_Item_" + ItemJsonData.Table[ItemIndex].ItemId + "' /><span class='checkbox'></span></span></td><td></td><td></td><td colspan='8' style='vertical-align: middle;'> <i class='arrow-down'></i>" + ItemJsonData.Table[ItemIndex].ItemId + "</td></tr>";
                                                var FilejsonObj = [];
                                                var fileData = {};
                                                fileData["ProjectId"] = ProjectJsonData.Table[ProjectIndex].ProjectId;
                                                fileData["TenderId"] = TenderJsonData.Table[TenderIndex].TenderId;
                                                fileData["ItemId"] = ItemJsonData.Table[ItemIndex].ItemId;

                                                FilejsonObj.push(fileData);

                                                $jq1.ajax({
                                                    url: 'ServiceHandler.ashx?CBH=LOADITEMFILES',
                                                    cache: false,
                                                    async: false,
                                                    dataType: 'html',
                                                    data: {
                                                        data: JSON.stringify(FilejsonObj)
                                                    },
                                                    success: function (FilesData) {
                                                        var FilesJsonData = JSON.parse(FilesData);
                                                        for (FileIndex in FilesJsonData) {
                                                            GridString = GridString + "<tr data-parentitemid='tr_" + Counter + "_Item_" + ItemJsonData.Table[ItemIndex].ItemId + "'  data-counter='" + Counter + "' style='display:none' id='tr_" + Counter + "_File_" + FilesJsonData[FileIndex].Id + "'><td style='text-align: center'><span class='chbx'><input class='ClassCheck' type='checkbox' data-parentitemid='tr_" + Counter + "_Item_" + ItemJsonData.Table[ItemIndex].ItemId + "' data-delete='file' data-fileid='" + FilesJsonData[FileIndex].Id + "' id='chk" + Counter + "_File_" + FilesJsonData[FileIndex].Id + "' /><span class='checkbox'></span></span></td><td></td><td></td><td></td><td style='vertical-align: middle;'>" + FilesJsonData[FileIndex].FileName + "</td>";
                                                            //GridString = GridString + "<td>" + jsonData.Table[i].FileName + "</td>";
                                                            GridString = GridString + "<td>" + FilesJsonData[FileIndex].Location + "</td>";
                                                            GridString = GridString + "<td>" + FilesJsonData[FileIndex].UploadedBy + "</td>";
                                                            GridString = GridString + "<td>" + FilesJsonData[FileIndex].OriginalPumpManufacturer + "</td>";
                                                            GridString = GridString + "<td>" + FilesJsonData[FileIndex].PumpType + "</td>";
                                                            GridString = GridString + "<td>" + FilesJsonData[FileIndex].Role + "</td><td></td></tr>";
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

                        Counter += 1;
                        GridString += "</tbody>";

                        var TotalPages = Math.ceil(ProjectJsonData.Table2[0].Records / $jq1("#drpPageSize option:selected").text());
                        var Start = (($jq1("#drpPageSize option:selected").text() * PageNo) - $jq1("#drpPageSize option:selected").text()) + 1;

                        if (ProjectJsonData.Table2[0].Records < ($jq1("#drpPageSize option:selected").text() * PageNo)) {
                            Start = Start + " - " + ProjectJsonData.Table2[0].Records;
                        }
                        else {
                            Start = Start + " - " + ($jq1("#drpPageSize option:selected").text() * PageNo);
                        }
                        $jq1("#lblStart").text(Start + " of ");
                        $jq1("#lblEnd").text(ProjectJsonData.Table2[0].Records);

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
                    }
                    /*$jq1('#TenderDocsIndoBody').html(GridString);*/
                    $jq1("#tblTenderDocuments > tbody").remove();
                    $jq1("#thTenderDocuments").after(GridString);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert(textStatus + " " + errorThrown);
                },
            });
        }

        function chkItemClick(elem, CounterValue, ClickedItemId, e) {
            e.stopPropagation();
            //var elem = $jq1(this);
            //var clickedItemId = "tr_" + CounterValue + "_Item_" + ClickedItemId;
            var clickedItemId = elem.id.replace("chk", "tr");
            $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                var parendtItemId = $jq1(this).data("parentitemid");
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_File_") >= 0 && clickedItemId == parendtItemId) {
                    $jq1(this).find('input').prop("checked", elem.checked)
                }
            })
        }

        function chkTenderClick(elem, CounterValue, ClickedItemId, e) {
            e.stopPropagation();
            var clickedTenderId = elem.id.replace("chk", "tr");
            $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                var parendtTenderId = $jq1(this).data("parenttenderid");
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0 && clickedTenderId == parendtTenderId) {

                    var clickedItemId = $jq1(this).attr("id");
                    $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                        var parendtItemId = $jq1(this).data("parentitemid");
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
                var parendtProjectId = $jq1(this).data("parentprojectid");
                if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Tender_") >= 0 && clickedProjectId == parendtProjectId) {

                    var clickedTenderId = $jq1(this).attr("id");
                    $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                        var parendtTenderId = $jq1(this).data("parenttenderid");
                        if ($jq1(this).attr("Id").indexOf("tr_" + CounterValue + "_Item_") >= 0 && clickedTenderId == parendtTenderId) {

                            var clickedItemId = $jq1(this).attr("id");
                            $jq1("#tbody_" + CounterValue + " > tr").each(function () {
                                var parendtItemId = $jq1(this).data("parentitemid");
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
            for (var i = 0; i < Counter; i++) {
                $jq1("#tbody_" + i + " > tr").each(function () {
                    if ($jq1(this).find('input').prop("checked")) {
                        if ($jq1(this).find('input').data("delete") == "project") {
                            DeleteDocuments('Project', $jq1(this).find('input').data("projectid"));
                        }
                        else if ($jq1(this).find('input').data("delete") == "tender") {
                            DeleteDocuments('Tender', $jq1(this).find('input').data("tenderid"));
                        }
                        else if ($jq1(this).find('input').data("delete") == "item") {
                            DeleteDocuments('Item', $jq1(this).find('input').data("itemid"));
                        }
                        else if ($jq1(this).find('input').data("delete") == "file") {
                            DeleteDocuments('File', $jq1(this).find('input').data("fileid"));
                        }
                    }
                })
            }
            LoadDistinctProjectList();
            toastr.success('Deleted successfully!', 'Success', { timeOut: 5000 });
        }

        function DeleteDocuments(DeleteFrom, Id) {
            //document.getElementById("loadingDiv").style.display = "block";
            var jsonObj = [];
            var FileData = {};

            FileData["DeleteFrom"] = DeleteFrom;
            FileData["FileId"] = Id;

            jsonObj.push(FileData);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=DELETETENDERDOCUMENTS',
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
    </script>
</asp:Content>
