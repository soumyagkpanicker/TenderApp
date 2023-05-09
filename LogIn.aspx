<%@ Page Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="LogIn.aspx.cs" Inherits="LogIn" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <!-- To be changed-->
    <link href="Content/css/Loader.css" rel="stylesheet" />

    <link href="Content/toastr/toastr.css" rel="stylesheet" />

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <style>
        select {
            width: 70%;
        }

        body > * {
            display: none;
        }

        body.login header {
            display: block;
        }

        body.login .dashboard {
            display: none;
        }

        body.login .right-header-links {
            display: none;
        }

        main {
            display: block;
        }

        nav {
            display: none;
        }

        .content-wrapper {
            padding: 180px 78px;
        }

        .form-group.input-group:nth-child(3), .form-group.input-group:nth-child(4) {
            display: inline-block;
            width: 100%;
        }

            .form-group.input-group:nth-child(3) label, .form-group.input-group:nth-child(4) label {
                float: left;
                width: 20%;
                padding-top: 8px;
            }

        .checkbox input {
            margin-top: 1px;
        }

        .form-group.input-group:nth-child(3) {
            margin-top: 5px;
        }

        div#pnlAuthentication .panel-body {
            padding-top: 25px;
        }

        .panel-default > .panel-heading {
            background: #091540;
            color: #fff;
        }

        .form-group.input-group.radio-sel span {
            float: left;
            font-size: 0.9rem;
        }

        .form-group.input-group.radio-sel input[type='radio'] {
            float: left;
            margin-top: 1px;
            margin-right: 5px;
        }
    </style>
    <div class="row">
        <div class="col-sm-12">
            <div id="pnlAuthentication" class="panel panel-default" style="max-width: 500px; margin: 0 auto;">
                <div class="panel-heading">
                    <h3 class="panel-title">Authentication</h3>
                </div>
                <div class="panel-body" id="formLogin">
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input class="form-control" placeholder="Username" id="txtUsername" name="Username" type="text" autofocus onblur="CheckUser();" />
                    </div>
                    <div class="form-group input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input class="form-control" placeholder="Password" id="txtPassword" name="Password" type="password" />
                    </div>
                    <div class="form-group input-group">
                        <label>Role: </label>
                        <select id="ddRoles"></select>
                    </div>
                    <div class="form-group input-group">
                        <label>Location: </label>
                        <select id="ddLocations" onchange="LoadLegalEntity();"></select>
                    </div>
                    <div class="form-group input-group" style="display: inline-block; width: 100%;">
                        <label style="width: 20%; padding-top: 8px;">Legal Entity: </label>
                        <select id="ddLegalEntity"></select>
                    </div>
                    <div class="form-group input-group radio-sel">
                        <input type="radio" value="OHX" name="PumpType" checked /><span>OHX</span>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" id="remember" />
                            Remember my credentials
                        </label>
                    </div>


                    <input type="button" id="btnLogin" class="btn btn-primary pull-right" value="Login" onclick="Login()" />
                </div>
            </div>
        </div>
    </div>
    <div id="loadingDiv" style="display: none;">
        <div id="loader" style="top: 50% !important; left: 50% !important"></div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
    <script type="text/javascript">
        var $jq1 = jQuery.noConflict();
    </script>

    <script type="text/javascript">

        $jq1(document).ready(function () {
            $jq1("body").addClass("login");
        });


        $jq1('#pnlAuthentication').keydown(function (e) {
            if (e.keyCode == '13') {
                $jq1(this).find('.btn-primary').click();
            }
        });
    </script>
    <script src="Scripts/core.js"></script>
</asp:Content>
