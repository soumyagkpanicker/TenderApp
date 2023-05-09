<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="UIConfigurator.aspx.cs" Inherits="UIConfigurator" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <%--<link href="Content/css/tablednd.css" rel="stylesheet" />--%>
    <script src="Scripts/jquery.tablednd.js"></script>
    <script src="Scripts/ui-configurator.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <h1>UI Configurator</h1>
    <div class="formWrapper">
        <div class="ddMainTabWrapper">
            <div class="control-wrap">
            <label for="#ddMainTabs">Main Navigation</label>
            <select id="ddMainTabs"></select>
             </div>
             <div class="control-wrap hide">
            <label for="#ddSubTabs">Sub Navigation</label>
            <select id="ddSubTabs"></select>
             </div>
            <div class="btn-wrapper">
                <a href="javascript:;" id="btnGetFields" class="btn btn-primary" >Get Fields</a>
            </div>
        </div>
        <div class="tblWrapper">
            <table id="tblFormAttributes"></table>
        </div>
    </div>
</asp:Content>

