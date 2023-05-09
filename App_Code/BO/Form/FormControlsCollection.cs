using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for FormControls
/// </summary>
public class FormControlsCollection
{
    public int FormControlId;
    public string FormLabelName;
    public string Value;
    public string Identifier;
    public string TableName;


    public static bool SaveCollectionwithPID(string tenderId, string parameterName, string parameterValue, string Guid, string productId)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("UpdateTenderDetailsWithProductId", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TenderId", tenderId);
            cmd.Parameters.AddWithValue("@ParameterValue", parameterName);
            cmd.Parameters.AddWithValue("@ParameterName", parameterValue);
            cmd.Parameters.AddWithValue("@Guid", Guid);
            cmd.Parameters.AddWithValue("@ProductId", productId);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }

    public static bool SaveCollection(string tenderId,string parameterName,string parameterValue,string Guid) {
        try {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("UpdateTenderDetails", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TenderId", tenderId);
            cmd.Parameters.AddWithValue("@ParameterValue", parameterName);
            cmd.Parameters.AddWithValue("@ParameterName", parameterValue);
            cmd.Parameters.AddWithValue("@Guid", Guid);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        catch (Exception) {
            return false;
        }
        return true;
    }
    public static bool SaveFormData(string tenderId,string projectId,string createdBy,string erpId, string parameterName, string parameterValue, string Guid)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("AddTenderDetails", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TenderId", tenderId);
            cmd.Parameters.AddWithValue("@ProjectId", tenderId);
            cmd.Parameters.AddWithValue("@ErpId", tenderId);
            cmd.Parameters.AddWithValue("@ParameterValue", parameterName);
            cmd.Parameters.AddWithValue("@ParameterName", parameterValue);
            cmd.Parameters.AddWithValue("@CreatedBy", createdBy);
            cmd.Parameters.AddWithValue("@Guid", Guid);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }
    public static bool SaveTender(string tenderId, string Guid)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("SaveTenderDetails", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TenderId", tenderId);
            cmd.Parameters.AddWithValue("@Guid", Guid);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }

    public static bool SaveFullTenderDetails(string tenderId, string projectId,string ErpId,string createdBy,string guid,string tenderType,string tenderInRole,string tenderLocationCode,string tenderTypeToFilter, string ItemId)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("SaveFullTenderDetails", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TenderId", tenderId);
            cmd.Parameters.AddWithValue("@Guid", guid);
            cmd.Parameters.AddWithValue("@ProjectId", projectId);
            cmd.Parameters.AddWithValue("@ErpId", "");
            cmd.Parameters.AddWithValue("@CreatedBy", createdBy);
            cmd.Parameters.AddWithValue("@TenderType", tenderType);
            cmd.Parameters.AddWithValue("@TenderInRole", tenderInRole);
            cmd.Parameters.AddWithValue("@TenderLocationCode", tenderLocationCode);
            cmd.Parameters.AddWithValue("@TenderTypeToFilter", tenderTypeToFilter);
            cmd.Parameters.AddWithValue("@ItemId", ItemId);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        catch (Exception ex)
        {
            return false;
        }
        return true;
    }

    public static bool UpdateTenders(string tenderId, string parameterName, string parameterValue, string Guid)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("UpdateTenders", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TenderId", tenderId);
            cmd.Parameters.AddWithValue("@ParameterValue", parameterName);
            cmd.Parameters.AddWithValue("@ParameterName", parameterValue);
            cmd.Parameters.AddWithValue("@Guid", Guid);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }


    public static bool UpdateSortOrder(int itemId, string sorOrder)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("UpdateFormAttributeSortOrder", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Id", itemId);
            cmd.Parameters.AddWithValue("@SortOrder", sorOrder);
            cmd.ExecuteNonQuery();
            con.Close();
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }

}