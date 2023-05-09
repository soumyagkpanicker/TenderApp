<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="ManageCurrency.aspx.cs" Inherits="ManageCurrency" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <h1>Manage Currency</h1>
    <div class="tblCurrencyExchangeWrapper">
        <div class="baseCurrencyWrapper">
        <div class="ddBaseCurrencyControl">
            <select id="ddBaseCurrency"></select>
        </div>
        </div>
        <div class="currencyExchangeTableWrapper">

        </div>
    </div>
    <script src="Scripts/Pricing.js"></script>
</asp:Content>

