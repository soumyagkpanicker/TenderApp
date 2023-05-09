using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

public class clsLoginRememberDAO
{
    public static string tblName = "tblLoginRemember";
    public static string ColId = "id";
    public static string ColUsername = "username";
    public static string ColUserrole = "user_role";

    public static bool CheckUser(string Username)
    {

        DataTable dt = clsDB.GetDataTable("SELECT * FROM " + tblName + " where " + ColUsername + " = '" + Username + "'");
        if (dt.Rows.Count > 0) { return true; }
        else { return false; }
    }
    public static string GetRoleByUsername(string Username)
    {
        DataTable dt = clsDB.GetDataTable("SELECT * FROM " + tblName + " where " + ColUsername + " = '" + Username + "'");
        if (dt.Rows.Count > 0) { return Convert.ToString(dt.Rows[0]["user_role"]); }
        else { return ""; }
    }
    public static void Save(clsLoginRemember ob)
    {
        if (!CheckUser(ob.Username))
        {
            string sql = "INSERT INTO " + tblName + "(" + ColUsername + "," + ColUserrole + ") VALUES ('" + ob.Username + "','" + ob.UserRole + "')";
            clsDB.ExecuteQuery(sql);
        }
    }
    public static void Delete(string username)
    {
        string sql = "DELETE FROM " + tblName + " WHERE " + ColUsername + "='" + username + "'";
        clsDB.ExecuteQuery(sql);
    }
}