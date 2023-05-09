<%@ Page Title="" Language="C#" MasterPageFile="~/Sublayout.master" AutoEventWireup="true" CodeFile="Pricing.aspx.cs" Inherits="Pricing" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <table class="tblProduct">
        <thead>
            <tr>
                <th class="chbx"></th>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Cost/unit<br /><span class="currency-code"></span></th>
                <th>Cost<br /><span class="currency-code"></span></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <input type="checkbox" /></td>
                <td>
                    <input type="text" class="inputProductItem"  />
                </td>
                <td>
                    <input type="text" class="inputProductDescription"  />
                </td>
                <td>
                    <input type="number" min="0" class="inputQuantity"  />
                </td>
                <td>
                    <input type="text" class="inputCostperUnit" />
                </td>
                <td>
                    <input type="text" class="inputTotalCost" />
                </td>
            </tr>
        </tbody>
    </table>
</asp:Content>

