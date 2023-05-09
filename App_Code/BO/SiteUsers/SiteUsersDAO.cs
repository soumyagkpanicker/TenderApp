using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Users
/// </summary>
public class SiteUsersDAO
{
    public static DataTable GetAllRoles() {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetRoles", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
}