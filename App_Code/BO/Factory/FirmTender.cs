using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for FirmTender
/// </summary>
public class FirmTender:IFactory
{
    public string TenderId { get; set; }
    public string ProjectId { get; set; }
    public string TenderUniqueId { get; set; }
    public string ItemId { get; set; }
    public int CustomerId { get; set; }
    public bool TenderType { get; set; }
    public int RoleId { get; set; }
    public SqlDateTime DateOfCreation { get; set; }
    public string CreatedBy { get; set; }
    public string ModifiedBy { get; set; }
    public SqlDateTime ModifiedDate { get; set; }
    public int LocationId { get; set; }
    public int LegalEntity { get; set; }
    public string Cost { get; set; }
    public string Currency { get; set; }
    public string Discount { get; set; }
    public string CreatedById { get; set; }
    public bool ShowDiscountInDocument { get; set; }
    public SqlDateTime EstimatedAwardDate { get; set; }
    public string ParentTenderUniqueId { get; set; }
    public bool IsAssignedBackByTenderingTeam { get; set; }
    public string ParameterName { get; set; }
    public string ParameterValue { get; set; }

    public string CreateTenderSaveFullTenderDetails()
    {
        //if (CheckTenderExists(TenderUniqueId,TenderId,ItemId) ==false)
        //{
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SaveFullTenderDetails", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@TenderId", TenderId);
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueId);
        cmd.Parameters.AddWithValue("@ProjectId", ProjectId);
        cmd.Parameters.AddWithValue("@ItemId", ItemId);
        cmd.Parameters.AddWithValue("@CustomerId", CustomerId);
        cmd.Parameters.AddWithValue("@TenderType", TenderType);
        cmd.Parameters.AddWithValue("@RoleId", RoleId);
        cmd.Parameters.AddWithValue("@DateOfCreation", DateOfCreation);
        cmd.Parameters.AddWithValue("@CreatedBy", CreatedBy);
        cmd.Parameters.AddWithValue("@ModifiedBy", ModifiedBy);
        cmd.Parameters.AddWithValue("@ModifiedDate", ModifiedDate);
        cmd.Parameters.AddWithValue("@LocationId", LocationId);
        cmd.Parameters.AddWithValue("@LegalEntity", LegalEntity);
        cmd.Parameters.AddWithValue("@Cost", "");
        cmd.Parameters.AddWithValue("@Currency", Currency);
        cmd.Parameters.AddWithValue("@Discount", "");
        cmd.Parameters.AddWithValue("@ShowDiscountInDocument", ShowDiscountInDocument);
        cmd.Parameters.AddWithValue("@EstimatedAwardDate", EstimatedAwardDate);
        cmd.Parameters.AddWithValue("@CreatedById", CreatedById);
        cmd.Parameters.AddWithValue("@ParentTenderUniqueId", ParentTenderUniqueId);
        cmd.Parameters.AddWithValue("@IsAssignedBackByTenderingTeam", IsAssignedBackByTenderingTeam);
        cmd.ExecuteNonQuery();
        con.Close();
        return ProjectId + "|pid";
        //}
        //else {
        //    return "This already exists. Please change the TenderId/ItemId and save again";
        //}
    }

    public string GetLatestProjectId(string locationcode,string year)
    {
        throw new NotImplementedException();
    }

    public void SaveTenderDetails()
    {
        throw new NotImplementedException();
    }

    public bool CheckTenderExists(string TenderUniqueID, string tenderId, string itemId,string projectId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("ValidateTenderName", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueID);
        cmd.Parameters.AddWithValue("@ItemId", itemId);
        cmd.Parameters.AddWithValue("@TenderId", tenderId);
        cmd.Parameters.AddWithValue("@ProjectId", ProjectId);
        SqlParameter flagTender = new SqlParameter("@HasTenderWithSameName", SqlDbType.Bit, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(flagTender);
        cmd.ExecuteReader();
        return Convert.ToBoolean(flagTender.Value);
    }

}