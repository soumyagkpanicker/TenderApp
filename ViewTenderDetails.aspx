<%@ Page Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="ViewTenderDetails.aspx.cs" Inherits="ViewTenderDetails" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        textarea#notificationMessage {
            width: 100%;
            height: 130px !important;
            padding: 10px;
        }

        .content-wrapper {
            position: relative;
        }

        .allocation-button {
            position: absolute;
            right: 20px;
            width: 100%;
            max-width: 40%;
            margin-top: -33px;
        }

            .allocation-button .btn-group {
                width: 100%;
                float: right;
                max-width: 260px;
            }

                .allocation-button .btn-group button.btn.btn-info {
                    max-width: 200px;
                    padding: 10px;
                }

            .allocation-button button.btn.btn-info.dropdown-toggle {
                max-width: 32px;
            }


        .logo-wrapper:not(.dashboard) {
            display: block;
        }

        a.btn-AllocateToAdvanceEngineering {
            margin-left: 10px;
        }

            a.btn-AllocateToAdvanceEngineering.disabled {
                background: #e5e5e5;
                color: #000;
                cursor: default;
            }
    </style>
    <link href="Content/css/wizard.css" rel="stylesheet" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <script type="text/javascript" src="Scripts/edittender.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js"></script>
    <script src="Scripts/jquery-ui-1.10.0.min.js"></script>
    <script type="text/javascript">
        $j = jQuery.noConflict();
    </script>

    <style>
        .viewpage div#parameters, .viewpage #allocateToanotherGroup {
            display: none;
        }

        .viewpage h1 {
            padding-bottom: 25px;
        }

        .logo-wrapper:not(.dashboard) {
            display: block;
        }

        li.review.disabled, li.review.disabled * {
            cursor: default;
        }

        .button-wrapper {
            display: none;
        }

        .review-controls-wrapper {
            display: none;
        }

        .fixed-information-for-tender > .form-group:first-child {
            position: absolute;
            top: -70px;
            right: -30px;
            background: #091540;
            padding: 10px 30px;
            color: #fff;
            width: auto;
            display: inline-block;
        }

        .fixed-information-for-tender {
            position: relative;
        }

            .fixed-information-for-tender > .form-group:first-child label:first-child {
                font-weight: bold;
            }

            .fixed-information-for-tender > .form-group:first-child label {
                width: auto;
            }
            .fixed-information-for-tender label {
    margin-right: 10px;
    width: 23%;
}
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="viewpage">
        <a class="messageModal" style="cursor: pointer;" data-toggle="modal" data-target="#MessageModal"></a>
        <div class="overlay allocateTenderpopup">
            <div class="customPopup">
                <a href="javascript:;" class="btnClosePopup">
                    <img src="Content/themes/base/images/close-btn.png" alt="close" /></a>
                <div class="content-of-popup">
                    <h3>Please contact the tendering team for the quotation.</h3>
                    <p>You can also allocate this tender from below dropdown</p>
                    <div id="allocateToanotherGroup1" class="allocation-button">
                        <div class="btn-group">
                            <button type="button" class="btn btn-info">Allocate to</button>
                            <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span> </button>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="overlay agentDetailsPopup">
            <div class="customPopup">
                <a href="javascript:;" class="btnClosePopup">
                    <img src="Content/themes/base/images/close-btn.png" alt="close" /></a>
                <div class="content-of-popup">
                    <h3>Fill the end user details</h3>
                    <div class="form-group">
                        <label for="#EndUserNAme">End user name <span class="red">*</span></label>
                        <input class="inputValue" id="EndUserNAme" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label for="#EndUserCountry">Country <span class="red">*</span></label>
                        <input class="inputValue" id="EndUserCountry" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label for="#EndUserStreet">Street</label>
                        <input class="inputValue" id="EndUserStreet" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label for="#EndUserPostcode">Post code</label>
                        <input class="inputValue" id="EndUserPostcode" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label for="#EndUserTitle">Title</label>
                        <input class="inputValue" id="EndUserTitle" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label for="#EndUserContactPersonName">Contact person name</label>
                        <input class="inputValue" id="EndUserContactPersonName" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label for="#EndUserContactEmailAddress">Email address</label>
                        <input class="inputValue" id="EndUserContactEmailAddress" disabled="disabled">
                    </div>
                    <div class="form-group">
                        <label for="#EndUserContactPhoneNumber">Phone number</label>
                        <input class="inputValue" id="EndUserContactPhoneNumber" disabled="disabled">
                    </div>
                    <p class="footnote">Fields marked with * are mandatory</p>
                    <div class="btnWrapper">
                        <a href="javascript:;" class="btn btn-primary" id="btnSaveAgentDetails">Save details</a>
                        <a href="javascript:;" class="btn btn-danger" id="btnCancelSaveAgent">Cancel</a>
                    </div>

                </div>
            </div>
        </div>
        <div class="error-message-wrapper">
            <p><span class="title">Error</span><span class="glyphicon glyphicon-warning-sign"></span>Please enter all the fields to generate the tender</p>
        </div>
        <h1>View Tender</h1>
        <input type="hidden" id="tenderGuid" />
        <div class="wizard"></div>
        <div id="parameters">
        </div>
        <div id="allocateToanotherGroup" class="allocation-button">
            <div class="btn-group">
                <button type="button" class="btn btn-info">Allocate to</button>
                <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span> </button>
                <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>

                </ul>
            </div>
        </div>
        <h2></h2>

        <div class="dynamic-content-wrapper">
            <div class="form-data">
                <div class="pricing-data-wrapper"></div>
                <div class="loader fadeAway">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ellipsis" style="max-width: 200px; position: absolute;">
                        <!--circle(cx="16",cy="50",r="10")-->
                        <circle cx="84" cy="50" r="0" fill="#71c2cc">
                            <animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="0s"></animate>
                            <animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="0s"></animate>
                        </circle><circle cx="84" cy="50" r="0.418314" fill="#d8ebf9"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="-1.8s"></animate>
                            <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="-1.8s"></animate>
                        </circle><circle cx="82.5777" cy="50" r="10" fill="#5699d2"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="-0.9s"></animate>
                            <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="-0.9s"></animate>
                        </circle><circle cx="48.5777" cy="50" r="10" fill="#1d3f72"><animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="0s"></animate>
                            <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="0s"></animate>
                        </circle><circle cx="16" cy="50" r="9.58169" fill="#71c2cc"><animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="0s"></animate>
                            <animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="3.6s" repeatCount="indefinite" begin="0s"></animate>
                        </circle>
                    </svg>
                    <p style="font-size: 2rem; margin-top: 44px; position: absolute; top: 50%; left: 50%;">
                        Please wait....
                    </p>
                </div>
                <div class="fixed-information-for-tender">

                    <div class="form-group">
                        <label>Project Id:</label>
                        <label id="ProjectId"></label>

                    </div>
                    <div class="forscaste form-group">
                        <label>Estimated Awarded Date</label>
                        <input type="text" class="date hasDatepicker" id="txtForecasteDate" disabled="disabled" />

                    </div>
                    <div class="form-group">
                        <label>Tender Id</label>
                        <input type="text" id="txtTenderId" disabled="disabled" />

                    </div>
                    <div class="form-group">
                        <label>Item Id</label>
                        <input type="text" id="txtItemId" disabled="disabled" />

                    </div>
                    <div class="form-group">
                        <label>Select Customer</label>
                        <select id="drpSearchCustomer" data-tb="tblCustomerInformation" disabled="disabled"></select>
                    </div>
                    <%-- <div class="form-group">
                <label>SAP Customer reference number</label>
                <input type="text" id="txtERPId" />
                
            </div>--%>
                </div>
                <div class="tabs-wrapper">
                </div>
                <div class="tabs-content-wrapper">
                </div>
                <div class="divPopup" style="width: 100%; position: relative;">
                    <table id="tblUploadedFiles" style="display: inline-block; left: 0; position: relative;"></table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="MessageModal" role="dialog" style="left: 10%">
            <div class="modal-dialog" style="margin-top: 100px;">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" style="width: 2%;">&times;</button>
                        <h4 class="modal-title" style="font-size: 18px">Message</h4>
                    </div>
                    <div class="modal-body" style="font-size: 12px">
                        <div class="messageboxWrapper">
                            <textarea id="notificationMessage"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn modal-title" style="background-color: #5cb85c; color: white; width: 12%;" onclick="AllocateTenderToRole();">Allocate</button>
                        <button type="button" id="btnClose_Sub" class="btn btn-default" data-dismiss="modal" style="width: 12%;" onclick="ReturnFalse();">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="overlay agent-detailspopup">
            <div class="customPopup">
                <a href="javascript:;" class="btnClosePopup">
                    <img src="Content/themes/base/images/close-btn.png" alt="close" /></a>
                <div class="content-of-popup">
                    <h3>Please contact the tendering team for the quotation.</h3>
                    <p>You can also allocate this tender from below dropdown</p>

                </div>
            </div>
        </div>
        <a href='javascript:;' style="display: none" class='btn btn-primary btnReviewForm hide'>Review</a>
        <a href="javascript:;" style="display: none" class="btn-SubmitFormData hide">See Pricing</a>
        <a href="javascript:;" style="display: none" class="btn-viewQuote hide"></a>
        <script src="Scripts/wizard.js"></script>
        <script src="Scripts/Pricing.js"></script>
    </div>
</asp:Content>
