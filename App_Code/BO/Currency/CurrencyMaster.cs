using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for CurrencyMaster
/// </summary>
public class CurrencyMaster
{
    public static DataTable AllCurrencyCodes() {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("ReturnAllCurrencies", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable GetCurrencyExchangeTable() {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GETCurrencyExchangeTable", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable CurrencyExchangeRate(string countryCode)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetCurrencyRate", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@countryCode", countryCode);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
}