<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="Dashboard.aspx.cs" Inherits="Dashboard" %>
<%--<%@ Register assembly="DevExpress.XtraCharts.v18.1.Web, Version=18.1.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" namespace="DevExpress.XtraCharts.Web" tagprefix="dx" %>--%>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript">
        var jq1 = jQuery.noConflict();
    </script>
    <script src="Scripts/highcharts.js"></script>
    <script src="Scripts/exporting.js"></script>
    <script src="Scripts/sunburst.js"></script>
    <script src="Scripts/export-data.js"></script>
    <script src="Scripts/Dashboard.js"></script>
    <link href="Content/css/Loader.css" rel="stylesheet" />
    <style>
        a.btn.btn-primary.btnReadMore, a.btn.btn-primary.btnReadMore:hover {
            background: #fff;
            text-transform: uppercase;
            color: #000;
            float: left;
            margin-left: 10px;
            margin-top: 15px;
        }

        .dashboard {
            display: block;
        }

        .logo-wrapper:not(.dashboard) {
            display: none;
        }

        .Imagecontainer {
            position: relative;
            width: 100%;
            height: 300px;
            border-radius: 5px;
            border: 1px solid #091540;
            overflow: hidden;
            margin-top: 7%;
        }

        .recent-tenders thead th {
            background: #e5e5e5;
        }

        .recent-tenders tbody td {
            border: 1px solid #ecebeb;
        }


        .report-filter-wrapper .glyphicon-filter {
            float: right;
            font-size: 1.2rem;
            color: #fff;
        }

        .report-filter-wrapper a.filter-tab {
            background: #091540;
            display: inline-block;
            padding: 10px;
            position: absolute;
            top: 0;
            right: 0;
            display: none;
        }

        .report-filter-wrapper {
            background: transparent;
            padding: 15px 20px;
            position: relative;
            z-index: 1;
            min-height: 300px;
        }

        div#container {
            z-index: 99999;
            position: absolute;
            top: -86px;
            right: 0;
        }

        .filter-options {
            position: absolute;
            padding: 20px;
            border-radius: 3px;
            transition: 0.4s transform ease;
            transform-origin: top right;
            float: left;
            max-width: 265px;
            background: #fff;
        }

            /*.filter-options.active {
    transform: scale(1,1);
    -webkit-transform: scale(1,1);
}*/

            .filter-options ul li {
                font-size: 1rem;
                padding: 11px 40px 11px 11px;
                position: relative;
            }

                .filter-options ul li input.filter-checkbox {
                    position: absolute;
                    right: 0;
                }
        /*.chart-inner-wrapper {
    max-height: 400px;
}*/
        .breadcrumb-wrapper {
            float: left;
            width: 100%;
            font-size: 1rem;
            padding: 20px;
            margin-bottom: 10px;
        }

            .breadcrumb-wrapper > ul {
                display: table;
            }

                .breadcrumb-wrapper > ul > li {
                    display: table-cell;
                    padding-left: 20px;
                }

            .breadcrumb-wrapper ul li:not(:first-child) {
                display: none;
            }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="loadingDiv">
        <div id="loader"></div>
    </div>

    <h1 style="margin-top: -1%">Dashboard</h1>
    <div class="top-container" style="margin-top: 1%">

        <div class="chart-wrapper">
            <%--<dx:WebChartControl ID="WebChartControl1" runat="server" CrosshairEnabled="True" Height="200px" Width="300px">
        </dx:WebChartControl>--%> 
        </div>
        <div class="msg-panel">
            <h2>My messages</h2>
            <div class="recent-message-board" id="divDashboardMessages" style="width: 100%">
                <%-- <a href="MessageCenter.aspx">All messages</a>
                <p class="messgae" data-id="msg123">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p class="messgae" data-id="msg123">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>--%>
            </div>

        </div>
        <div class="tender-list-panel">
            <h2>Recent tenders</h2>
            <div class="recent-tenders">

                <table>
                    <thead>
                        <tr>
                            <th>Project Id</th>
                            <th>Tender Id</th>
                            <th>Customer</th>
                            <th>Date of creation</th>
                            <th>Created By</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="6">No tenders to display</td>
                        </tr>
                    </tbody>
                </table>
                <a href="TenderManagement1.aspx" class="btn btn-primary btnReadMore">View All</a>
            </div>
        </div>
    </div>
    <div class="bottom-container">
        <div class="quick-links-wrapper">
            <h2>Quick links</h2>
            <ul style="margin-left: 5.5%;">
                <li>
                    <a href="TenderManagement1.aspx" style="padding: 6px 20px; color: white; background: #091540">All Quote</a>
                </li>
                <li>
                    <a href="TenderManagement1.aspx?ftype=2" style="padding: 6px 20px; color: white; background: #091540">Quote Submitted</a>
                </li>
                <li>
                    <a href="TenderManagement1.aspx?ftype=1" style="padding: 6px 20px; color: white; background: #091540">Quote in Progress</a>
                </li>
                <li>
                    <a href="NewTender.aspx" style="padding: 6px 20px; color: white; background: #091540">New tender</a>
                </li>
            </ul>
        </div>
    </div>
    <%--  <div id="loader"></div>--%>
    <script type="text/javascript">
        $jq1(window).on("load", function () {
            LoadMessages();
            LoadRecentTenders();
            document.getElementById("loadingDiv").style.display = "none";
            LoadFilterData();
        });
        $jq1(document).on("click", ".report-filter-wrapper .filter-tab", function () {
            $jq1(".filter-options").toggleClass("active");
        });
        function LoadFilterData() {
            console.log("----- Filter -----");
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=FILTERVALUES',
                type: 'POST',
                cache: false,
                async: true,
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    var Options = "<ul>";
                    $jq1(data).each(function (i) {
                        Options += "<li data-columnName='" + data[i].FilterColumnName + "' data-id='" + data[i].FilterId + "'>" + data[i].FilterName + "<input type='checkbox' class='filter-checkbox' /></li>"
                    });
                    Options += "</ul>";
                    $jq1(".report-filter-wrapper .other-options").html(Options);
                    $jq1(".other-options ul li:first-child .filter-checkbox").trigger("click");
                }
            });
        }
        function LoadRecentTenders() {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=RECENTTENDERS',
                type: 'POST',
                cache: false,
                async: true,
                data: {
                    LocationId: $jq1.trim($jq1(".user-information .location").data("locationid")),
                    RoleId: $jq1.trim($jq1(".user-information .role").data("roleid")),
                    UserName: $jq1.trim($jq1(".user-information .username").text())
                },
                dataType: 'json',
                success: function (data) {
                    var HTMLStructure = "";
                    $jq1(data).each(function (i) {
                        console.log("CreatedId: " + $jq1.trim(data[i].CreatedById) + ", LoginUser: " + $jq1.trim($jq1("#paraUserName").data("loginuserid")));

                        var dateOfCreation = new Date(data[i].DateOfCreation);

                        HTMLStructure += "<tr>";
                        HTMLStructure += ($jq1.trim(data[i].CreatedById) == $jq1.trim($jq1("#paraUserName").data("loginuserid"))) ? "<td><a href='EditTender.aspx?code=" + data[i].TenderUniqueId + "'>" + data[i].ProjectId + "</a></td>" : "<td>" + data[i].ProjectId + "</td>";
                        HTMLStructure += "<td>" + data[i].TenderId + "</td>";
                        HTMLStructure += "<td>" + data[i].Customer + "</td>";
                        HTMLStructure += "<td>" + data[i].DateOfCreation + "</td>";
                        //HTMLStructure += "<td>" + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</td>";
                        HTMLStructure += "<td>" + data[i].CreatedBy + "</td>";
                        HTMLStructure += "<td>" + data[i].Role + "</td>";
                        HTMLStructure += "</tr>";
                    });

                    $jq1(".recent-tenders table tbody").html(HTMLStructure);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
            });
        }
        function LoadMessages() {
            var jsonObj = [];
            var customerData = {};
            customerData["Role"] = getCookie("Role");
            customerData["Location"] = getCookie("Location");
            jsonObj.push(customerData);
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETTOPMESSAGE',
                cache: false,
                async: false,
                dataType: 'html',
                data: {
                    data: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    var jsonData = JSON.parse(data);
                    var Messages = "<a href='MessageCenter.aspx'>All messages</a>"
                    if (jsonData.length > 0) {
                        var rowCount;
                        if (jsonData.length > 2) {
                            rowCount = 2;
                        }
                        else {
                            rowCount = jsonData.length;
                        }
                        for (var i = 0; i < rowCount; i++) {
                            var dateOfCreation = new Date(jsonData[i].Date);

                            Messages += "<div class='messgae' onclick=MessageRedirect('" + jsonData[i].TenderId + "') data-id='msg" + jsonData[i].TenderId + "'><div> Message: ";

                            if ($jq1.trim(jsonData[i].Message.toString()).length > 65) {
                                Messages += $jq1.trim(jsonData[i].Message.toString()).substr(0, 65) + " . . . </div>";
                            }
                            else {
                                Messages += jsonData[i].Message + "</div>";
                            }

                            //Messages += "Date: <div style='display: inline-block; margin-left: 26px;'> " + dateOfCreation.getDate() + " " + FormatMonth(dateOfCreation.getMonth()) + " " + dateOfCreation.getFullYear() + "</div>";
                            Messages += "Date: <div style='display: inline-block; margin-left: 26px;'> " + jsonData[i].Date + "</div>";
                            Messages += "<br/>Sender: <div style='display: inline-block; margin-left: 12px;'> " + jsonData[i].Sender + "</div></div>";
                        }
                    }
                    else {
                        Messages = "No Message Found";
                    }
                    $jq1("#divDashboardMessages").html(Messages);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
            });
        }

        function MessageRedirect(TenderId) {
            $jq1('#noti_Button').trigger("click");
            window.open('EditTender.aspx?code=' + TenderId, '_blank');
        }
    </script>
</asp:Content>

