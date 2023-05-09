using System;
using System.Data;
using System.Text;

public class clsHtml
{
    public const string TagTable = "<table>";
    public const string TagTableEnd = "</table>";

    public const string TagDiv = "<div>";
    public const string TagDivEnd = "</div>";

    public const string TagTableRow = "<tr>";
    public const string TagTableRowEnd = "</tr>";

    public const string TagTableHeadCell = "<th>";
    public const string TagTableHeadCellEnd = "</th>";

    public const string TagTableHeadCellEdit = TagTableHeadCell + "Edit" + TagTableHeadCellEnd;
    public const string TagTableHeadCellDelete = TagTableHeadCell + "Delete" + TagTableHeadCellEnd;

    public const string TagTableRowCell = "<td>";
    public const string TagTableRowCellEnd = "</td>";

    public const string TagSelect = "<select>";
    public const string TagSelectEnd = "</select>";

    public const string TagFieldset = "<fieldset>";
    public const string TagFieldsetEnd = "</fieldset>";

    public const string TagSpan = "";
    public const string TagSpanEnd = "";

    public const string TagHyperlink = "<a>";
    public const string TagHyperlinkEnd = "</a>";

    public const string TagTextArea = "<textarea>";
    public const string TagTextAreaEnd = "</textarea>";

    public const string TagSpace = " &nbsp;";
    public const string TagBreak = "<br />";
    public const string Logout = "Logout";

    public const string TagLineBreak = "<br/>";

    public enum Glyphicon
    {
        Edit,
        Delete,
        Save,
        Cancel,
        Add
    }

    private const string HTMLIcon = "<span class='glyphicon {0} {1}' onclick='{2}' style='{3}' />";
    public static string CreateIcon(Glyphicon icon, bool IsClickable, string onClickFunction, string style)
    {
        string IconToGlyphicon = "";
        switch (icon)
        {
            case Glyphicon.Edit: IconToGlyphicon = "glyphicon-edit"; break;
            case Glyphicon.Delete: IconToGlyphicon = "glyphicon-remove"; break;
            case Glyphicon.Save: IconToGlyphicon = "glyphicon-ok"; break;
            case Glyphicon.Cancel: IconToGlyphicon = "glyphicon-arrow-left"; break;
            case Glyphicon.Add: IconToGlyphicon = "glyphicon-plus"; break;
        }

        return string.Format(HTMLIcon, IconToGlyphicon, ((IsClickable) ? " clickable" : ""), onClickFunction, style);
    }
    public static string CreateIconCell(Glyphicon icon, bool IsClickable, string onClickFunction, int colSpanVal)
    {
        return CreateIconCell(icon, IsClickable, onClickFunction, colSpanVal, "");
    }
    public static string CreateIconCell(Glyphicon icon, bool IsClickable, string onClickFunction, int colSpanVal, string style)
    {
        if (colSpanVal > 0) { return TagTableRowCell.Replace("<td>", "<td colspan='" + colSpanVal + "' valign='middle'>") + CreateIcon(icon, IsClickable, onClickFunction, style) + TagTableRowCellEnd; }
        else { return TagTableRowCell.Replace(">", "  valign='middle'>") + CreateIcon(icon, IsClickable, onClickFunction, style) + TagTableRowCellEnd; }
    }

    public static string CreateRowCell(string CellContent)
    {
        return TagTableRowCell.Replace("<td>", "<td valign='middle'>") + CellContent.Replace("\"", "'") + TagTableRowCellEnd;
    }
    public static string CreateRowCell(string CellContent, int width)
    {
        return string.Format(TagTableRowCell.Replace(">", " style='width:{0}px;'>"), width) + CellContent.Replace("\"", "'") + TagTableRowCellEnd;
    }
    public static string CreateRowCell(string CellContent, string width)
    {
        return string.Format(TagTableRowCell.Replace(">", " style='width:{0};'>"), width) + CellContent.Replace("\"", "'") + TagTableRowCellEnd;
    }

    public static string CreateTextCell(string txtBoxID, bool flgNumeric)
    {
        return TagTableRowCell + CreateTextBoxTag(txtBoxID, flgNumeric) + TagTableRowCellEnd;
    }
    public static string CreateTextCell(string txtBoxID, bool flgNumeric, string style)
    {
        return TagTableRowCell + CreateTextBoxTag(txtBoxID, flgNumeric, style) + TagTableRowCellEnd;
    }
    public static string CreateTextBoxTag(string txtBoxID, bool flgNumeric)
    {
        return string.Format("<input type='text' id={0} style='width:100%' {1} />", txtBoxID, ((flgNumeric) ? "onkeypress='return event.keyCode >= 48 && event.keyCode <= 57'" : ""));
    }
    public static string CreateTextBoxTag(string txtBoxID, bool flgNumeric, string style)
    {
        return string.Format("<input type='text' id={0} style='{1}' {2} />", txtBoxID, style, ((flgNumeric) ? "onkeypress='return event.keyCode >= 48 && event.keyCode <= 57'" : ""));
    }
    public static string CreateTextCell(string txtBoxID, string value, string style)
    {
        return TagTableRowCell + CreateTextBoxTag(txtBoxID, "", false, style, value) + TagTableRowCellEnd;
    }
    public static string CreateTextBoxTag(string txtBoxID, string cssClass)
    {
        return string.Format("<input type='text' id={0} class='{1}' style='width:100%'  required='required'/>", txtBoxID, cssClass);
    }

    public static string CreateTextBoxTag(string txtBoxID, string cssClass, bool flgRequired, string style, string value, bool flgReadonly, string placeHolder)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<input type='text' ");
        if (txtBoxID.Length > 0) { sb.Append(" id='" + txtBoxID + "'"); }
        if (cssClass.Length > 0) { sb.Append(" class='" + cssClass + "'"); }
        if (flgRequired) { sb.Append(" required='required'"); }
        if (style.Length > 0) { sb.Append(" style='" + style + "'"); }
        if (value.Length > 0) { sb.Append(" value='" + value + "'"); }
        if (flgReadonly) { sb.Append(" readonly='readonly'"); }
        if (placeHolder.Length > 0) { sb.Append(" placeholder='" + placeHolder + "'"); }
        sb.Append(" />");
        return sb.ToString();
    }
    public static string CreateTextBoxTag(string txtBoxID, string cssClass, bool flgRequired, string style, string value)
    {
        return CreateTextBoxTag(txtBoxID, cssClass, flgRequired, style, value, false, "");
    }
    public static string CreateTextBoxTag(string txtBoxID, string cssClass, bool flgRequired, string style, string value, string placeHolder)
    {
        return CreateTextBoxTag(txtBoxID, cssClass, flgRequired, style, value, false, placeHolder);
    }


    public static string CreateTextAreaTag(string txtBoxID, string cssClass, bool flgRequired, string style, string value)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<textarea ");
        if (txtBoxID.Length > 0) { sb.Append(" id='" + txtBoxID + "'"); }
        if (cssClass.Length > 0) { sb.Append(" class='" + cssClass + "'"); }
        if (flgRequired) { sb.Append(" required='required'"); }
        if (style.Length > 0) { sb.Append(" style='" + style + "'"); }
        sb.Append(" >");
        sb.Append(value);
        sb.Append(clsHtml.TagTextAreaEnd);
        return sb.ToString();
    }
    public static string CreatePasswordCell(string txtBoxID)
    {
        return TagTableRowCell + CreatePasswordTag(txtBoxID) + TagTableRowCellEnd;
    }
    public static string CreatePasswordTag(string txtBoxID)
    {
        return string.Format("<input type='password' id={0} />", txtBoxID);
    }

    public static string CreateComboCell(string cmbID, DataTable dt, string colID, string colValue, string SelValue, bool flgSelect, string changeEvent)
    {
        return TagTableRowCell + CreateComboBoxTag(cmbID, dt, colID, colValue, SelValue, flgSelect, changeEvent) + TagTableRowCellEnd;
    }
    public static string CreateComboBoxTag(string cmbID, DataTable dt, string colID, string colValue, string SelValue, bool flgSelect, string changeEvent)
    {
        StringBuilder sb = new StringBuilder();
        if (string.IsNullOrEmpty(changeEvent)) { sb.Append(TagSelect.Replace(">", string.Format(" id='{0}' style='width:120px;'>", cmbID))); }
        else { sb.Append(TagSelect.Replace(">", string.Format(" id='{0}' style='width:120px;' onchange='{1}'>", cmbID, changeEvent))); }

        if (flgSelect) { sb.Append("<option value='-1'>--Select--</option>"); }
        foreach (DataRow drItem in dt.Rows)
        {
            if (string.Compare(Convert.ToString(drItem[colValue]), SelValue, true) == 0)
            {
                sb.Append("<option value='" + Convert.ToString(drItem[colID]) + "' selected='selected'>" + Convert.ToString(drItem[colValue]) + "</option>");
            }
            else { sb.Append("<option value='" + Convert.ToString(drItem[colID]) + "'>" + Convert.ToString(drItem[colValue]) + "</option>"); }
        }
        sb.Append(TagSelectEnd);
        return sb.ToString();
    }
    public static string CreateComboBoxTag(string cmbID, DataTable dt, string colID, string colValue, string SelValue, bool flgSelect, string changeEvent, string cssClass)
    {
        StringBuilder sb = new StringBuilder();
        if (string.IsNullOrEmpty(changeEvent)) { sb.Append(TagSelect.Replace(">", string.Format(" id='{0}' style='width:100%;' class='{1}'>", cmbID, cssClass))); }
        else { sb.Append(TagSelect.Replace(">", string.Format(" id='{0}' style='width:100%;' onchange='{1}' class='{2}'>", cmbID, changeEvent, cssClass))); }

        if (flgSelect) { sb.Append("<option value='-1'>--Select--</option>"); }
        foreach (DataRow drItem in dt.Rows)
        {
            if (string.Compare(Convert.ToString(drItem[colID]), SelValue, true) == 0)
            {
                sb.Append("<option value='" + Convert.ToString(drItem[colID]) + "' selected='selected'>" + Convert.ToString(drItem[colValue]) + "</option>");
            }
            else { sb.Append("<option value='" + Convert.ToString(drItem[colID]) + "'>" + Convert.ToString(drItem[colValue]) + "</option>"); }
        }
        sb.Append(TagSelectEnd);
        return sb.ToString();
    }

    public static string CreateLegendTag(string legendVal)
    {
        return string.Format("<legend><b>{0}</b></legend>", legendVal);
    }

    public static string CreateHyperlinkCell(string id, string href, string className, string lnkText)
    {
        return CreateHyperlinkCell(id, href, className, lnkText, "");
    }

    public static string CreateHyperlinkCell(string id, string href, string className, string lnkText, string clickEvent)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append(TagTableRowCell);
        sb.Append(TagHyperlink.Replace(">", ""));
        if (id.Length > 0) { sb.Append(" id='" + id + "'"); }
        if (href.Length > 0) { sb.Append(" href='" + href + "'"); }
        if (className.Length > 0) { sb.Append(" class='" + className + "'"); }
        if (clickEvent.Length > 0) { sb.Append(" onclick='return " + clickEvent + "'"); }
        sb.Append(">");
        sb.Append(lnkText);
        sb.Append(TagHyperlinkEnd);
        sb.Append(TagTableRowCellEnd);
        return sb.ToString();
    }

    public static string CreateButtonCell(string id, string value, string clickEvent, string cssClass, string type)
    {
        return TagTableRowCell + CreateButtonTag(id, value, clickEvent, cssClass, type) + TagTableRowCellEnd;
    }
    public static string CreateButtonTag(string id, string value, string clickEvent, string cssClass, string type, string style)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<input ");
        if (id.Length > 0) { sb.Append(" id='" + id + "'"); }
        if (value.Length > 0) { sb.Append(" value='" + value + "'"); }
        if (clickEvent.Length > 0) { sb.Append(" onclick='" + clickEvent + "'"); }
        if (cssClass.Length > 0) { sb.Append(" class='" + cssClass + "'"); }
        if (type.Length > 0) { sb.Append(" type='" + type + "'"); }
        if (style.Length > 0) { sb.Append(" style='" + style + "'"); }
        sb.Append(" />");
        return sb.ToString();
    }

    public static string CreateButtonTag(string id, string value, string clickEvent, string cssClass, string type)
    {
        return CreateButtonTag(id, value, clickEvent, cssClass, type, "");
    }

    public static string CreateLabelTag(string id, string lblFor, string content, string style, string cssClass)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<label");
        if (id.Length > 0) { sb.Append(" id='" + id + "'"); }
        if (lblFor.Length > 0) { sb.Append(" for='" + lblFor + "'"); }
        if (style.Length > 0) { sb.Append(" style='" + style + "'"); }
        if (cssClass.Length > 0) { sb.Append(" class='" + cssClass + "'"); }
        sb.Append(">");
        sb.Append(content);
        sb.Append("</label>");
        return sb.ToString();
    }

    public static string CreateBlankCell()
    {
        return TagTableRowCell + TagSpace + TagTableRowCellEnd;
    }
    //public static string CreateButtonTag(string value, string type, string clickEvent,string cssClass)
    //{
    //    return string.Format("<input value='{0}' onclick='{1}' type='{2}' class='{3}' />", value, clickEvent, type, cssClass);
    //}

    public static string CreateTextCellDiv(string lblFor, string lblContent, string textType, string cssClass, string txtID, bool flgRequired, string style, string value, string cssGrid1, string cssGrid2, bool flgMandatory)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append(TagDiv.Replace(">", " class='form-group'>"));

        if (flgMandatory)
        {
            sb.Append(CreateLabelTag("", lblFor, lblContent, "", "control-label " + cssGrid1));
            sb.Append(TagDiv.Replace(">", " class='" + cssGrid2 + "'>"));
            sb.Append(CreateTextBoxTag(txtID, cssClass, flgRequired, style, value));
            sb.Append(TagDivEnd);
            sb.Append(CreateLabelTag("", "", "*", "color:red;text-align:left", "control-label col-sm-1"));
        }
        else
        {
            sb.Append(CreateLabelTag("", lblFor, lblContent, "", "control-label " + cssGrid1));
            sb.Append(TagDiv.Replace(">", " class='" + cssGrid2 + "'>"));
            sb.Append(CreateTextBoxTag(txtID, cssClass, flgRequired, style, value));
            sb.Append(TagDivEnd);
        }
        sb.Append(TagDivEnd);
        return sb.ToString();
    }

    public static string CreateTextCellDiv(string lblFor, string lblContent, string textType, string cssClass, string txtID, bool flgRequired, string style, string value, string cssGrid1, string cssGrid2)
    {
        return CreateTextCellDiv(lblFor, lblContent, textType, cssClass, txtID, flgRequired, style, value, cssGrid1, cssGrid2, false);
    }

    public static string CreateLabelCellDiv(string lblContent1, string lblContent2, string cssGrid1, string cssGrid2)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append(TagDiv.Replace(">", " class='form-group'>"));
        sb.Append(CreateLabelTag("", "", lblContent1, "", "control-label " + cssGrid1));
        sb.Append(CreateLabelTag("", "", lblContent2, "text-align:left;", "control-label " + cssGrid2));
        sb.Append(TagDivEnd);
        return sb.ToString();
    }

    public static string CreateComboCellDiv(string lblFor, string lblContent, DataTable dt, string colID, string colValue, string selValue, bool flgSelect, string changeEvent, string style, string cssClass, string cssGrid1, string cssGrid2)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append(TagDiv.Replace(">", " class='form-group'>"));
        sb.Append(CreateLabelTag("", lblFor, lblContent, "", "control-label " + cssGrid1));
        sb.Append(TagDiv.Replace(">", " class='" + cssGrid2 + "'>"));
        sb.Append(CreateComboBoxTag(lblFor, dt, colID, colValue, selValue, flgSelect, changeEvent, cssClass));
        sb.Append(TagDivEnd);
        sb.Append(TagDivEnd);
        return sb.ToString();
    }

    public static string CreateTextAreaCellDiv(string lblFor, string lblContent, string textType, string cssClass, string txtID, bool flgRequired, string style, string value, string cssGrid1, string cssGrid2)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append(TagDiv.Replace(">", " class='form-group'>"));
        sb.Append(CreateLabelTag("", lblFor, lblContent, "", "control-label " + cssGrid1));
        sb.Append(TagDiv.Replace(">", " class='" + cssGrid2 + "'>"));
        sb.Append(CreateTextAreaTag(txtID, cssClass, flgRequired, style, value));
        sb.Append(TagDivEnd);
        sb.Append(TagDivEnd);
        return sb.ToString();
    }

    public static string CreateCheckBoxTag(string chkID, bool flgSelected, string style, string changeEvent, string toolTip)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append("<input type='checkbox' valign='middle' ");
        if (chkID.Length > 0) { sb.Append(" id='" + chkID + "'"); }
        if (flgSelected) { sb.Append(" checked='checked'"); }
        if (style.Length > 0) { sb.Append(" style='" + style + "'"); }
        if (changeEvent.Length > 0) { sb.Append(" onchange='" + changeEvent + "'"); }
        if (toolTip.Length > 0) { sb.Append(" title='" + toolTip + "'"); }
        sb.Append(" />");
        return sb.ToString();
    }

    public static string CreateRadioButtonDiv(string lblTitle, string id, string lbl1Name, string lbl2Name, bool flg1Checked, string cssGrid1, string cssGrid2)
    {
        StringBuilder sb = new StringBuilder();
        sb.Append(TagDiv.Replace(">", " class='form-group'>"));
        sb.Append(CreateLabelTag("", "", lblTitle, "", "control-label " + cssGrid1));
        sb.Append(TagDiv.Replace(">", " class='" + cssGrid2 + "' style='height:30px;'>"));
        sb.Append("<label class='radio-inline'>");
        if (flg1Checked) { sb.Append("<input type='radio' name='" + id + "' checked='checked' value='" + lbl1Name + "'>" + lbl1Name); }
        else { sb.Append("<input type='radio' name='" + id + "' value='" + lbl1Name + "'>" + lbl1Name); }
        sb.Append("</label>");
        sb.Append("<label class='radio-inline'>");
        if (!flg1Checked) { sb.Append("<input type='radio' name='" + id + "' checked='checked' value='" + lbl2Name + "'>" + lbl2Name); }
        else { sb.Append("<input type='radio' name='" + id + "'  value='" + lbl2Name + "'>" + lbl2Name); }
        sb.Append("</label>");
        sb.Append(TagDivEnd);
        sb.Append(TagDivEnd);
        return sb.ToString();
    }
}