using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for WizardDAO
/// </summary>
public class WizardDAO
{
    public static String ServerName = "";
    public static String Database = "";
    public static String DefualtUserID = "";
    public static String DefualtPassword = "";
    public static string tblName = "tblMainNav";
    public static string ColId = "Id";
    public static string ColDescription = "Description";

    public static DataTable GetList()
    {
        DataTable dt = clsDB.GetDataTable("SELECT * FROM " + tblName + " order by TabOrder");
        return dt;
    }
    public static String GetConnectionString()
    {
        ServerName = ConfigurationManager.AppSettings["ServerName"];
        Database = ConfigurationManager.AppSettings["Database"];
        DefualtUserID = ConfigurationManager.AppSettings["DefualtUserID"];
        DefualtPassword = ConfigurationManager.AppSettings["DefualtPassword"];
        return "Data Source=" + ServerName + ";Initial Catalog=" + Database +
              ";User ID=" + DefualtUserID + ";Password=" + DefualtPassword + ";";
    }
    public static DataTable GetDataTable(String SQLStr)
    {
        try
        {
            SqlDataAdapter da = new SqlDataAdapter(SQLStr, GetConnectionString());
            DataTable dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        catch (Exception ex){ throw ex; }
    }
    /// <summary>
    /// Returns a datatable containing the form fields
    /// </summary>
    /// <param name="id">Integer that stores unique Id for the main navigation</param>
    /// <returns></returns>
    public static DataTable GetWizardDataById(int id) {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetWizardFormData", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@Id", id);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    /// <summary>
    /// Returns a datatable containing the form fields
    /// </summary>
    /// <param name="id">Integer that stores unique Id for the main navigation</param>
    /// <returns></returns>
    public static DataTable GetALLWizardData()
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand("WizardDataAdmin", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    /// <summary>
    /// Returns a datatable containing the form fields
    /// </summary>
    /// <param name="id">Integer that stores unique Id for the main navigation</param>
    /// <returns></returns>
    public static DataTable GetSnapDownTitles()
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand("MainNav", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    /// <summary>
    /// Returns a datatable containing the form fields
    /// </summary>
    /// <param name="id">Integer that stores unique Id for the main navigation</param>
    /// <returns></returns>
    public static DataTable Review()
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand("Review", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable RetrieveSubNavigation() {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetAllSubNavigation", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

}