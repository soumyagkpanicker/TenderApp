using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

public class clsDB
{
    public static String ServerName = "";
    public static String Database = "";
    public static String DefualtUserID = "";
    public static String DefualtPassword = "";
    public static DataSet GetDataSet(String SQLStr)
    {
        try
        {
            SqlDataAdapter da = new SqlDataAdapter(SQLStr, GetConnectionString());
            DataSet ds = new DataSet();
            da.Fill(ds);
            return ds;
        }

        catch (Exception ex) { throw ex; }
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

        catch { throw; }
    }

    public static void ExecuteQuery(String SQLStr)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand(SQLStr, con);
        try
        {
            con.Open();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex) { throw ex; }
        finally
        {
            if (con != null && con.State != ConnectionState.Closed) { con.Close(); }
        }
    }

    public static Int32 GetIdByComlum(string tblname, string column, string value, string id)
    {
        string sql = "select " + id + " from " + tblname + " where " + column + " ='" + value + "'";
        DataTable dt = GetDataTable(sql);
        if (dt.Rows.Count > 0)
        {
            return Convert.ToInt32(dt.Rows[0][id]);
        }
        else
        {
            return 0;
        }
    }

  
    public static int ExecuteSP_SaveData(string spname, DataSet ds)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand(spname, con);
        cmd.CommandType = CommandType.StoredProcedure;

        cmd.Parameters.AddWithValue("@tblJobOrder",ds.Tables["OrderNo"]);
        cmd.Parameters.AddWithValue("@tblMotorData", ds.Tables["Motor"]);
        cmd.Parameters.AddWithValue("@tblPumpData", ds.Tables["Pump"]);
        cmd.Parameters.AddWithValue("@tblBasePlate", ds.Tables["BasePlate"]);
        cmd.Parameters.AddWithValue("@tblMechanicalSeal", ds.Tables["MechanicalSeal"]);
        cmd.Parameters.AddWithValue("@tblCoupling", ds.Tables["Coupling"]);
        var returnParm = cmd.Parameters.Add("@return_value", SqlDbType.VarChar);
        returnParm.Direction = ParameterDirection.ReturnValue;

        try
        {
            con.Open();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex) { throw ex; }
        finally
        {
            if (con != null && con.State != ConnectionState.Closed) { con.Close(); }
        }
        return Convert.ToInt32(returnParm.Value);
    }


    public static int ExecuteSP_UpdateData(string spname, DataSet ds,int Id)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand(spname, con);
        cmd.CommandType = CommandType.StoredProcedure;

        cmd.Parameters.AddWithValue("@tblJobOrder", ds.Tables["OrderNo"]);
        cmd.Parameters.AddWithValue("@tblMotorData", ds.Tables["Motor"]);
        cmd.Parameters.AddWithValue("@tblPumpData", ds.Tables["Pump"]);
        cmd.Parameters.AddWithValue("@tblBasePlate", ds.Tables["BasePlate"]);
        cmd.Parameters.AddWithValue("@tblMechanicalSeal", ds.Tables["MechanicalSeal"]);
        cmd.Parameters.AddWithValue("@tblCoupling", ds.Tables["Coupling"]);
        cmd.Parameters.AddWithValue("@NewId", Id);
        var returnParm = cmd.Parameters.Add("@return_value", SqlDbType.Int);
        returnParm.Direction = ParameterDirection.ReturnValue;

        try
        {
            con.Open();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex) { throw ex; }
        finally
        {
            if (con != null && con.State != ConnectionState.Closed) { con.Close(); }
        }
        return Convert.ToInt32(returnParm.Value);
    }

    public static Int32 GetIdFromXml(string QueryStr)
    {

        Int32 insertedID = 0;
        using (SqlConnection con = new SqlConnection(GetConnectionString()))
        {
            con.Open();
            //Insert QUery with Scope_Identity
            using (SqlCommand cmd = new SqlCommand(QueryStr,con))
            {

                insertedID = Convert.ToInt32(cmd.ExecuteScalar());

                

                if (con.State == System.Data.ConnectionState.Open)
                    con.Close();

            }
        }
        return insertedID;
    }


    public static int Execute_SpDataTable(string spname, DataTable dtTable)
    {
        SqlConnection con = new SqlConnection(GetConnectionString());
        SqlCommand cmd = new SqlCommand(spname, con);
        cmd.CommandType = CommandType.StoredProcedure;

        cmd.Parameters.Add("@tbl_MainTab", SqlDbType.Structured).Value = dtTable;
        var returnParm = cmd.Parameters.Add("@return_value", SqlDbType.Int);
        returnParm.Direction = ParameterDirection.ReturnValue;

        try
        {
            con.Open();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex) { throw ex; }
        finally
        {
            if (con != null && con.State != ConnectionState.Closed) { con.Close(); }
        }
        return Convert.ToInt32(returnParm.Value);
    }
}