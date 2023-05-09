using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Data.SqlTypes;

/// <summary>
/// Summary description for BudgetTender
/// </summary>
public class BudgetTender : IFactory
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
    public string ParameterIdentity { get; set; }
    public string ProjectNumber { get; set; }
    public BudgetTender(string TenderGuid, string ParameterName, string ParameterValue,string ParameterIdentity)
    {
        this.TenderUniqueId = TenderGuid;
        this.ParameterName = ParameterName;
        this.ParameterValue = ParameterValue;
        this.ParameterIdentity = ParameterIdentity;
    }
    public BudgetTender(string TenderGuid, string tenderId, string itemId)
    {
        this.TenderUniqueId = TenderGuid;
        this.TenderId = tenderId;
        this.ItemId = itemId;
    }
    public BudgetTender(string tenderId, string projectId, string tenderUniqueId, string itemId, int customerId, bool tenderType, int roleId, SqlDateTime dateOfCreation, string CreatedBy, string ModifiedBy, SqlDateTime ModifiedDate, int LocationId, int LegalEntity, string Cost, string Currency, string Discount, bool ShowDiscountInDocument, SqlDateTime EstimatedAwardDate, string createdbyId, bool IsAssignedBackByTenderingTeam, string ParentTenderUniqueId,string projectNumber)
    {
        this.TenderId = tenderId;
        this.ProjectId = projectId;
        this.TenderUniqueId = tenderUniqueId;
        this.ItemId = itemId;
        this.CustomerId = customerId;
        this.TenderType = tenderType;
        this.RoleId = roleId;
        this.DateOfCreation = dateOfCreation;
        this.CreatedBy = CreatedBy;
        this.ModifiedBy = ModifiedBy;
        this.ModifiedDate = ModifiedDate;
        this.LocationId = LocationId;
        this.LegalEntity = LegalEntity;
        this.Cost = Cost;
        this.Currency = Currency;
        this.Discount = Discount;
        this.ShowDiscountInDocument = ShowDiscountInDocument;
        this.EstimatedAwardDate = EstimatedAwardDate;
        this.CreatedById = createdbyId;
        this.IsAssignedBackByTenderingTeam = IsAssignedBackByTenderingTeam;
        this.ParentTenderUniqueId = ParentTenderUniqueId;
        this.ProjectNumber = projectNumber;
    }

    public string CreateTenderSaveFullTenderDetails()
    {
        //if (CheckTenderExists(TenderUniqueId, TenderId, ItemId,ProjectId) == false)
        //{
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("SaveFullTenderDetails", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TenderId", TenderId);
            cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueId);
            cmd.Parameters.AddWithValue("@ProjectId", ProjectId);
            cmd.Parameters.AddWithValue("@ProjectNumber", ProjectNumber);
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
            return ProjectId+"|pid";
        //}
        //else
        //{
        //    return "This already exists. Please change the TenderId/ItemId and save again";
        //}
    }
    public void SaveTenderDetails()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SaveBudgetTenderDetails", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueId);
        cmd.Parameters.AddWithValue("@ParameterName", ParameterName);
        cmd.Parameters.AddWithValue("@ParameterValue", ParameterValue);
        cmd.Parameters.AddWithValue("@ParameterIdentity", ParameterIdentity);
        cmd.ExecuteNonQuery();
        con.Close();
    }

    public bool CheckTenderExists(string TenderUniqueID,string tenderId,string itemId,string ProjectId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("ValidateTenderName", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueID);
        cmd.Parameters.AddWithValue("@ItemId", itemId);
        cmd.Parameters.AddWithValue("@TenderId",tenderId);
        cmd.Parameters.AddWithValue("@ProjectId", ProjectId);
        SqlParameter flagTender = new SqlParameter("@HasTenderWithSameName", SqlDbType.Bit, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(flagTender);
        cmd.ExecuteReader();
        return Convert.ToBoolean(flagTender.Value);
    }

   

    public string GetLatestProjectId(string locationCode, string year)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("GENERATEPROJECTID", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@LocationCode", locationCode);
        cmd.Parameters.AddWithValue("@Year", year);
        SqlParameter outScore = new SqlParameter("@returnValue", SqlDbType.VarChar, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(outScore);
        cmd.ExecuteReader();
        string retval = outScore.Value.ToString();

        con.Close();
        return retval;
    }




}