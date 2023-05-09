using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Menu
/// </summary>
public class Menu
{
    #region CommonMethods
    public static DataTable MainNavigation() {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetMainMenu", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable SubNavigation(int MainNavigationId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetSubNavigationFromMainNavId", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@Id", MainNavigationId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable FormDetails(int MainNavigationId,int SubNavigationId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetWizardFormData", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@Id", MainNavigationId);
        cmd.Parameters.AddWithValue("@SubTabId", SubNavigationId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable FormDetailsByUniqueId(string tenderUniqueId) {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("LoadEditFormData1", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@TenderUniqueId", tenderUniqueId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable FormDetailsByUniqueId(int MainNavigationId, int SubNavigationId,string UniqueId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("FormDataForTenderUniqueIdTenderUniqueId", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@Id", MainNavigationId);
        cmd.Parameters.AddWithValue("@SubTabId", SubNavigationId);
        cmd.Parameters.AddWithValue("@TenderUniqueId", UniqueId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable ReviewForm(string UniqueId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("ReviewData", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@TenderUniqueId", UniqueId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable GetTableData(string tblName)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetDropdownValuesFromTable", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@tblName", tblName);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable GetDdValues(int id)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetDropdownValuesById", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@pId", id);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable GetCustomerById(int id)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("CustomerInformationById", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@id", id);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable GetAllFormAttributes()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetAllFormData", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }


  

    public static bool SaveData() {
        return true;
    }
    #endregion CommonMethods
}