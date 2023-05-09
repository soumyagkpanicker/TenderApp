using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Tender
/// </summary>
public class Tender
{
    public string TenderId { get; set; }
    public string ProjectId { get; set; }
    public string Customer { get; set; }

    public static void UpdateMarkAsRead(string tenderid) {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("UpdateMarkAsRead", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@tenderId", tenderid);
        cmd.ExecuteNonQuery();
        con.Close();

    }
    public static DataTable GetProjectIds()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetProjectIds", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable CheckFirmAccessByRole(int role) {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("ReturnFirmAccessByRole", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@Role", role);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable GetLatestChildTenderDetails(string ParentTenderUniqueId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetLatestChildTenderDetails", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@ParentTenderUniqueId", ParentTenderUniqueId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable TenderVersion(string TenderUniqueId, string ParentTenderUniqueId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GenerateTenderVersionName", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueId);
        cmd.Parameters.AddWithValue("@ParentTenderUniqueId", ParentTenderUniqueId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static string SaveProductsForTender(string TenderUniqueId, string productId, string cost, string datacolumnid, string numberOfUnits)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SavePricingMaster", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueId);
        cmd.Parameters.AddWithValue("@ProductId", productId);
        cmd.Parameters.AddWithValue("@Cost", cost);
        cmd.Parameters.AddWithValue("@DataColumnId", datacolumnid);
        cmd.Parameters.AddWithValue("@NumberOfUnits", numberOfUnits);
        cmd.ExecuteNonQuery();
        con.Close();
        return "true";
    }
    public static string deleteProductsForTender(string TenderUniqueId, string productId, string datacolumnid)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("DeletePricingMaster", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueId);
        cmd.Parameters.AddWithValue("@ProductId", productId);
        cmd.Parameters.AddWithValue("@DataColumnId", datacolumnid);
        cmd.ExecuteNonQuery();
        con.Close();
        return "true";
    }
    public static string GetOHXPricingFromProductId(string productId, string CouplingVendor = null, string type = null, string powerperrpm = null, string spacer = null, string SpacerLength = null, string mle = null, string balancing = null, string mechanicalSeal = null, string bearingFrameSize = null, string ShaftSealDiameter = null, string MechanicalSealVendor = null, string plan = null, string pipetube = null, string shaftsealvendor = null, string material = null, string isolatorvendor = null, string sealSystemVendor = null)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("OHXPricingByProduct", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Product", productId);
            cmd.Parameters.AddWithValue("@balacing", balancing);
            cmd.Parameters.AddWithValue("@couplingvendor", CouplingVendor);
            cmd.Parameters.AddWithValue("@type", type);
            cmd.Parameters.AddWithValue("@motopowerperspeed", powerperrpm);
            cmd.Parameters.AddWithValue("@spacer", spacer);
            cmd.Parameters.AddWithValue("@spacelength", SpacerLength);
            cmd.Parameters.AddWithValue("@mle", mle);
            cmd.Parameters.AddWithValue("@mechanicalSeal", mechanicalSeal);
            cmd.Parameters.AddWithValue("@bearingFrameSize", bearingFrameSize);
            cmd.Parameters.AddWithValue("@ShaftSealDiameter", ShaftSealDiameter);
            cmd.Parameters.AddWithValue("@MechanicalSealVendor", MechanicalSealVendor);
            cmd.Parameters.AddWithValue("@plan", plan);
            cmd.Parameters.AddWithValue("@pipeTube", pipetube);
            cmd.Parameters.AddWithValue("@sealSystemVendor", sealSystemVendor);
            cmd.Parameters.AddWithValue("@material", material);
            cmd.Parameters.AddWithValue("@vendor", isolatorvendor);
            SqlParameter cost = new SqlParameter("@Cost", SqlDbType.VarChar, 100) { Direction = ParameterDirection.Output };
            cmd.Parameters.Add(cost);
            SqlParameter DataColumnId = new SqlParameter("@DataColumnId", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
            cmd.Parameters.Add(DataColumnId);
            cmd.ExecuteReader();
            return Convert.ToString(cost.Value) == "" ? "0" : Convert.ToString(cost.Value) + "|ID=" + Convert.ToString(DataColumnId.Value);
        }
        catch (Exception)
        {
            return "0";
        }
    }

    public static DataTable GetOHXCouplingBalancingValues()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@value", 1);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable GetOHXCouplingVendors()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 2);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable CouplingType()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 3);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable Spacer()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 4);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable MLE()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 15);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable SpacerLength()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 5);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable MechanicalSeal()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 6);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable BearingFrameSize()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 7);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable ShaftSealDiameter()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 8);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable MechanicalSealVendor()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 9);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable SealSystemPlan()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 10);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable PipeorTube()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 11);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable SealSystemVendor()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 12);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable Material()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 13);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable IsolatorVenders()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetBalancingValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@value", 14);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable GetPricingData(string dataId, string productId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("ColumnNamesByProductId", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@productId", productId);
        cmd.Parameters.AddWithValue("@dataColumnId", dataId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;

    }


    public static DataTable GetOHXPricing(string tenderUniqueId, string costCurrency, string balancing, string couplingvendor, string type, string pperspeed, string spacer, string spacerlength, string mle, string mechanicalseal, string bearingframesize, string shaftsealdiameter, string mechanicalsealvendor, string plan, string pipetube, string sealsystemvendor, string material, string vendor)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("OHXAddiTionalGetPricing", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@tenderUniqueId", tenderUniqueId);
        cmd.Parameters.AddWithValue("@costCurrency", costCurrency);
        cmd.Parameters.AddWithValue("@balacing", balancing);
        cmd.Parameters.AddWithValue("@couplingvendor", couplingvendor);
        cmd.Parameters.AddWithValue("@type", type);
        cmd.Parameters.AddWithValue("@motopowerperspeed", pperspeed);
        cmd.Parameters.AddWithValue("@spacer", spacer);
        cmd.Parameters.AddWithValue("@spacelength", spacerlength);
        cmd.Parameters.AddWithValue("@mle", mle);
        cmd.Parameters.AddWithValue("@mechanicalSeal", mechanicalseal);
        cmd.Parameters.AddWithValue("@bearingFrameSize", bearingframesize);
        cmd.Parameters.AddWithValue("@ShaftSealDiameter", shaftsealdiameter);
        cmd.Parameters.AddWithValue("@MechanicalSealVendor", mechanicalsealvendor);
        cmd.Parameters.AddWithValue("@plan", plan);
        cmd.Parameters.AddWithValue("@pipeTube", pipetube);
        cmd.Parameters.AddWithValue("@sealSystemVendor", sealsystemvendor);
        cmd.Parameters.AddWithValue("@material", material);
        cmd.Parameters.AddWithValue("@vendor", vendor);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable MyActiveTenders(string username)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("MyActiveTenders", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@username", username);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;

    }
    public static DataTable MyOpenTenders(string username)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("MyOpenTenders", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@username", username);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable AllTenders()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("AllOpenTenders", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable BudgetTenders()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("BudgetTenders", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable FirmTenders()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("FirmTenders", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable TenderList()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetTenders", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable FilterTenders(int filterType)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("FilterTenders", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@FilterType", filterType);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable TenderQuotation(string tenderId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetQuotationAndDiscount", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@tenderUniqueId", tenderId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable GetTender(string tenderId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetTenderByUniqueId", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@tenderUniqueId", tenderId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable GetTenderDetails(string tenderId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetTenderDetails", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@tenderUniqueId", tenderId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable ReturnStatus(string tenderId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("ReturnStatusOfTender", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@TenderUniqueId", tenderId);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static string MakeARevisedTenderVersion(string TenderUniqueIdToBeCopied,string TenderUniqueId) {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("CreateRevisedVersion", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@NewTenderUniqueId", TenderUniqueId);
        cmd.Parameters.AddWithValue("@TenderUniqueIdToBeCopied", TenderUniqueIdToBeCopied);
        SqlParameter result = new SqlParameter("@Result", SqlDbType.VarChar, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(result);
        cmd.ExecuteNonQuery();
        con.Close();
        return Convert.ToString(result.Value);
    }
    public static string SaveQuotation(string TenderUniqueId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SaveQuotation", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@tenderUniqueId", TenderUniqueId);
        cmd.ExecuteNonQuery();
        con.Close();
        return "true";
    }

    public static string UpdateParentTenderStatus(string TenderUniqueId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("UpdateParentTenderStatus", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@TenderUniqueId", TenderUniqueId);
        cmd.ExecuteNonQuery();
        con.Close();
        return "true";
    }

    public static string UpdateTenderRoleToManager(string tenderId, string uniqueId, string user, string role, string location, string customer)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("UpdateTenderRole", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@TenderId", tenderId);
        cmd.Parameters.AddWithValue("@TenderUniqueId", uniqueId);
        cmd.Parameters.AddWithValue("@UserName", user);
        cmd.Parameters.AddWithValue("@UserRole", role);
        cmd.Parameters.AddWithValue("@Location", location);
        cmd.Parameters.AddWithValue("@Customer", customer);
        cmd.ExecuteNonQuery();
        con.Close();
        return "true";
    }
    public static DataTable RecentTenders(string locationId, string roleId, string UserName)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("RecentTenders", con);
        //cmd.Parameters.AddWithValue("@LocationId", locationId);
        //cmd.Parameters.AddWithValue("@RoleId", roleId);
        cmd.Parameters.AddWithValue("@UserName", UserName);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataSet SearchTenders(Int32 PageNo, Int32 PageSize, string SearchText, string SortingColumn, String SortingOrder, string UserName, DataTable dtSearchList, Int32 LocationId, string Role, string DisplayName)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("SearchTender", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);


        string Query = "SELECT GC.ColumnName FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'Tenders') AND (GT.UserName = '" + UserName + "')";
        DataTable dtColumns = new DataTable();
        dtColumns = clsDB.GetDataTable(Query);

        Query = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY";
        if (SortingColumn == "CustomerId")
        {
            Query += " (SELECT Customer FROM tblCustomerInfromation WHERE Id = Ten.CustomerId) " + SortingOrder;
        }
        else if (SortingColumn == "LocationId")
        {
            Query += " (SELECT Location FROM tbLocation WHERE LocationId = Ten.LocationId) " + SortingOrder;
        }
        else
        {
            Query += " Ten." + SortingColumn + " " + SortingOrder;
        }
        Query += ") AS RowNum, Ten.Id, Ten.ParentTenderUniqueId, Ten.IsChildTender, Ten.TenderUniqueId, (SELECT Customer FROM tblCustomerInformation WHERE Id = Ten.CustomerId) AS CustomerId";

        if (dtColumns.Rows.Count > 0)
        {
            foreach (DataRow dr in dtColumns.Rows)
            {
                if (dr["ColumnName"].ToString() == "CustomerId")
                {
                    //Query += ", (SELECT Customer FROM tblCustomerInformation WHERE Id = Ten.CustomerId) AS CustomerId";
                }
                else if (dr["ColumnName"].ToString() == "LocationId")
                {
                    Query += ", (SELECT Location FROM tbLocation WHERE LocationId = Ten.LocationId) AS LocationId";
                }
                else if (dr["ColumnName"].ToString() == "RoleId")
                {
                    Query += ", (SELECT Role FROM tblRoles WHERE RoleId = Ten.RoleId) AS RoleId";
                }
                else if (dr["ColumnName"].ToString() == "TenderType")
                {
                    Query += ", (CASE TenderType WHEN 1 THEN 'Firm' ELSE 'Budget' END) AS TenderType ";
                }
                else if (dr["ColumnName"].ToString() == "Status")
                {
                    Query += ", (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Delivered' WHEN 3 THEN 'WIN' ELSE 'Loss' END) AS Status ";
                }
                else if (dr["ColumnName"].ToString() == "DateOfCreation")
                {
                    Query += ", convert(varchar, Ten.DateOfCreation, 106) AS DateOfCreation ";
                }
                else if (dr["ColumnName"].ToString() == "EstimatedAwardDate")
                {
                    Query += ", convert(varchar, Ten.EstimatedAwardDate, 106) AS EstimatedAwardDate ";
                }
                else
                {
                    Query += ", " + dr["ColumnName"].ToString();
                }
            }

            Query += " FROM Tenders AS Ten WHERE ISNULL(Ten.IsDeleted,0) = 0 ";

            //if (UserName != "SulzerAdminUser")
            //{
            //    Query += " AND Ten.LocationId = " + LocationId;
            //}

            if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
            {
                Query += " AND Ten.CreatedBy = '" + DisplayName + "'";
            }
        }
        else
        {
            //Query += ", ISNULL(Customer, '') AS Customer, ISNULL(FirstName, '') + ' ' + ISNULL(LastName, '') AS Contact, PostalCodeCity ,ISNULL((SELECT Location FROM tbLocation WHERE (LocationId = CI.Country)), '') AS Country, ISNULL(ProjectDescription, '') AS ProjectDescription, ISNULL(CustomersReference, '') AS CustomersReference, ISNULL(EmailId,'') AS EmailId, ISNULL(City,'') AS City ";
            Query += ", TenderId, (SELECT Role FROM tblRoles WHERE RoleId = Ten.RoleId) AS RoleId,ProjectId, (CASE TenderType WHEN 1 THEN 'Firm' ELSE 'Budget' END) AS TenderType, convert(varchar, Ten.DateOfCreation, 106) AS DateOfCreation , CreatedBy, LocationId, Cost, Currency,  convert(varchar, Ten.EstimatedAwardDate, 106) AS EstimatedAwardDate , (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Delivered' WHEN 3 THEN 'WIN' ELSE 'Loss' END) AS Status ";
            Query += " FROM Tenders AS Ten WHERE ISNULL(Ten.IsDeleted,0) = 0 ";

            //if (UserName != "SulzerAdminUser")
            //{
            //    Query += " AND Ten.LocationId = " + LocationId;
            //}

            if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
            {
                Query += " AND Ten.CreatedBy = '" + DisplayName + "'";
            }

            DataRow dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "TenderId";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "ProjectId";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "CustomerId";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "TenderType";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "DateOfCreation";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "CreatedBy";
            //dr = dtColumns.NewRow();
            //dtColumns.Rows.Add(dr);
            //dr["ColumnName"] = "LocationId";
            //dr = dtColumns.NewRow();
            //dtColumns.Rows.Add(dr);
            //dr["ColumnName"] = "Currency";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "EstimatedAwardDate";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "Status";
            dr = dtColumns.NewRow();
            dtColumns.Rows.Add(dr);
            dr["ColumnName"] = "RoleId";
        }

        string Search = "";
        Int32 Counter = 0;
        if (SearchText != "")
        {
            Search = " AND (";
            foreach (DataRow drCol in dtColumns.Rows)
            {
                if (Counter > 0)
                {
                    Search += " OR ";
                }


                if (drCol["ColumnName"].ToString() == "CustomerId")
                {
                    //Query += " (SELECT Customer FROM tblCustomerInfromation WHERE Id = Ten.CustomerId) " + SortingOrder;
                    Search += " Ten.CustomerId IN (SELECT Id FROM tblCustomerInformation WHERE Customer LIKE ('%" + SearchText + "%'))";
                }
                else if (drCol["ColumnName"].ToString() == "LocationId")
                {
                    Search += " Ten.LocationId IN (SELECT LocationId FROM tbLocation WHERE Location LIKE ('%" + SearchText + "%'))";
                }
                else
                {
                    Search += " " + drCol["ColumnName"].ToString() + " LIKE ('%" + SearchText + "%')";
                }
                Counter += 1;
            }
            Search += ")";
        }

        string[] columnNames = (from dc in dtSearchList.Columns.Cast<DataColumn>()
                                select dc.ColumnName).ToArray();
        if (dtSearchList.Rows.Count > 0)
        {
            foreach (DataRow dr in dtSearchList.Rows)
            {
                foreach (string cn in columnNames)
                {
                    if (cn.ToString().Trim().ToString() == "CustomerId")
                    {
                        //Search += " AND (SELECT Customer FROM tblCustomerInfromation WHERE Id = Ten.CustomerId) " + SortingOrder;
                        Search += " AND Ten.CustomerId IN (SELECT Id FROM tblCustomerInformation WHERE Customer LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%'))";
                    }
                    else if (cn.ToString().Trim().ToString() == "LocationId")
                    {
                        Search += " AND Ten.LocationId IN (SELECT LocationId FROM tbLocation WHERE Location LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%'))";
                    }
                    else
                    {
                        Search += " AND " + cn.ToString().Trim().ToString() + " LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%')";
                    }
                    //Search += " AND " + cn + " like '%" + dr[cn.ToString()].ToString().Trim() + "%'";
                }
            }
        }

        Query += Search;
        Query += ") AS TenDetails WHERE TenDetails.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND TenDetails.RowNum <= " + Convert.ToInt32((PageNo * PageSize)) + "; SELECT COUNT(*) AS Records FROM Tenders Ten WHERE ISNULL(IsDeleted, 0) = 0 ";

        if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
        {
            Query += " AND Ten.CreatedBy = '" + DisplayName + "'";
        }
        //if (UserName != "SulzerAdminUser")
        //{
        //    Query += " AND Ten.LocationId = " + LocationId;
        //}



        Query += Search;

        DataSet ds = clsDB.GetDataSet(Query);
        ds.Tables.Add(dtColumns);
        return ds;
        //if(sealSupplier=="")
        //cmd.Parameters.AddWithValue("@SealSupplier", DBNull.Value);
        //else
        //cmd.Parameters.AddWithValue("@SealSupplier", sealSupplier);
        //if(originalPumpSupplier=="")
        //    cmd.Parameters.AddWithValue("@OriginalPumpSupplier", DBNull.Value);
        //else
        //cmd.Parameters.AddWithValue("@OriginalPumpSupplier", originalPumpSupplier);
        //if(pumpType=="")
        //    cmd.Parameters.AddWithValue("@PumpType", DBNull.Value);
        //else
        //    cmd.Parameters.AddWithValue("@PumpType", pumpType);
        //if(erpId=="")
        //    cmd.Parameters.AddWithValue("@ERPId", DBNull.Value);
        //else
        //    cmd.Parameters.AddWithValue("@ERPId", erpId);
        //if(tenderId=="")
        //    cmd.Parameters.AddWithValue("@TenderId", DBNull.Value);
        //else
        //    cmd.Parameters.AddWithValue("@TenderId", tenderId);
        //if(customerName=="")
        //    cmd.Parameters.AddWithValue("@CustomerName", DBNull.Value);
        //else
        //    cmd.Parameters.AddWithValue("@CustomerName", customerName);
        //DataSet ds = new DataSet();
        //da.Fill(ds);
        //return ds;
    }

    public static DataSet LoadTenderDetails(Int32 PageNo, Int32 PageSize, string SearchText, string SortingColumn, String SortingOrder, string UserName, DataTable dtSearchList, string FilterOptions, Int32 LocationId, string Role, string DisplayName, Int32 IsDeleted)
    {
        try
        {
            string Query = "SELECT GC.ColumnName FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'Tenders') AND (GT.UserName = '" + UserName + "')";
            DataTable dtColumns = new DataTable();
            dtColumns = clsDB.GetDataTable(Query);

            Query = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY";
            if (SortingColumn == "CustomerId")
            {
                Query += " (SELECT Customer FROM tblCustomerInfromation WHERE Id = Ten.CustomerId) " + SortingOrder;
            }
            else if (SortingColumn == "LocationId")
            {
                Query += " (SELECT Location FROM tbLocation WHERE LocationId = Ten.LocationId) " + SortingOrder;
            }
            else
            {
                Query += " Ten." + SortingColumn + " " + SortingOrder;
            }
            Query += ") AS RowNum, Ten.Id, Ten.ParentTenderUniqueId, ISNULL(Ten.IsChildTender,0) AS IsChildTender, Ten.TenderUniqueId, (SELECT Customer FROM tblCustomerInformation WHERE Id = Ten.CustomerId) AS CustomerId";

            if (dtColumns.Rows.Count > 0)
            {
                foreach (DataRow dr in dtColumns.Rows)
                {
                    if (dr["ColumnName"].ToString() == "CustomerId")
                    {
                        //Query += ", (SELECT Customer FROM tblCustomerInformation WHERE Id = Ten.CustomerId) AS CustomerId";
                    }
                    else if (dr["ColumnName"].ToString() == "LocationId")
                    {
                        Query += ", (SELECT Location FROM tbLocation WHERE LocationId = Ten.LocationId) AS LocationId";
                    }
                    else if (dr["ColumnName"].ToString() == "TenderType")
                    {
                        Query += ", (CASE TenderType WHEN 1 THEN 'Firm' ELSE 'Budget' END) AS TenderType ";
                    }
                    else if (dr["ColumnName"].ToString() == "RoleId")
                    {
                        Query += ", (SELECT Role FROM tblRoles WHERE RoleId = Ten.RoleId) AS RoleId";
                    }
                    else if (dr["ColumnName"].ToString() == "Status")
                    {
                        Query += ", (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Submitted' WHEN 3 THEN 'Win' ELSE 'Loss' END) AS Status ";
                    }
                    else if (dr["ColumnName"].ToString() == "DateOfCreation")
                    {
                        Query += ", convert(varchar, Ten.DateOfCreation, 106) AS DateOfCreation ";
                    }
                    else if (dr["ColumnName"].ToString() == "EstimatedAwardDate")
                    {
                        Query += ", convert(varchar, Ten.EstimatedAwardDate, 106) AS EstimatedAwardDate ";
                    }
                    ///Added By Akash
                    else if (dr["ColumnName"].ToString() == "AssignById")
                    {
                        Query += ", (SELECT Role FROM tblRoles WHERE RoleId = Ten.AssignById) AS AssignById";
                    }
                    else if (dr["ColumnName"].ToString() == "AssignDt")
                    {
                        Query += ", convert(varchar, Ten.AssignDt, 106) AS AssignDt ";
                    }
                    else if (dr["ColumnName"].ToString() == "AssignToId")
                    {
                        Query += ", (SELECT Role FROM tblRoles WHERE RoleId = Ten.AssignToId) AS AssignToId";
                    }
                    else if (dr["ColumnName"].ToString() == "LegalEntity")
                    {
                        Query += ", (SELECT LegalEntityName FROM tblLegalEntity WHERE Id = Ten.LegalEntity) AS LegalEntity";
                    }
                    else if (dr["ColumnName"].ToString() == "ManualStatusUpateDt")
                    {
                        Query += ", convert(varchar, Ten.ManualStatusUpateDt, 106) AS ManualStatusUpateDt ";
                    }

                    ///Added By Akash
                    else
                    {
                        Query += ", " + dr["ColumnName"].ToString();
                    }
                }

                Query += " FROM Tenders AS Ten WHERE ISNULL(Ten.IsDeleted,0) = " + IsDeleted + " AND (ISNULL(ParentTenderUniqueId,'') = '0' OR ISNULL(ParentTenderUniqueId,'') = '') ";

                if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
                {
                    Query += " AND Ten.CreatedBy = '" + DisplayName + "'";
                }
            }
            else
            {
                //Query += ", ISNULL(Customer, '') AS Customer, ISNULL(FirstName, '') + ' ' + ISNULL(LastName, '') AS Contact, PostalCodeCity ,ISNULL((SELECT Location FROM tbLocation WHERE (LocationId = CI.Country)), '') AS Country, ISNULL(ProjectDescription, '') AS ProjectDescription, ISNULL(CustomersReference, '') AS CustomersReference, ISNULL(EmailId,'') AS EmailId, ISNULL(City,'') AS City ";
                Query += ", TenderId, (SELECT Role FROM tblRoles WHERE RoleId = Ten.RoleId) AS RoleId, ProjectId, (CASE TenderType WHEN 1 THEN 'Firm' ELSE 'Budget' END) AS TenderType, convert(varchar, Ten.DateOfCreation, 106) AS DateOfCreation, CreatedBy, LocationId, Cost, Currency, convert(varchar, Ten.EstimatedAwardDate, 106) AS EstimatedAwardDate, (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Win' ELSE 'Loss' END) AS Status ";
                Query += " FROM Tenders AS Ten WHERE ISNULL(Ten.IsDeleted,0) = " + IsDeleted + " AND (ISNULL(Ten.ParentTenderUniqueId,'') = '0' OR ISNULL(Ten.ParentTenderUniqueId,'') = '') ";

                if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
                {
                    Query += " AND Ten.CreatedBy = '" + DisplayName + "'";
                }

                //if (UserName != "SulzerAdminUser")
                //{
                //    Query += " AND Ten.LocationId = " + LocationId;
                //}
                DataRow dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "TenderId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "ProjectId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "CustomerId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "TenderType";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "DateOfCreation";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "CreatedBy";
                //dr = dtColumns.NewRow();
                //dtColumns.Rows.Add(dr);
                //dr["ColumnName"] = "LocationId";
                //dr = dtColumns.NewRow();
                //dtColumns.Rows.Add(dr);
                //dr["ColumnName"] = "Currency";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "EstimatedAwardDate";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Status";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "RoleId";
            }

            string Search = "";

            if (FilterOptions == "Active")
            {
                //Query += " AND TEN.Status = 2 ";
                Search += " AND TEN.Status = 2 ";
            }
            else if (FilterOptions == "InProgress")
            {
                //Query += " AND TEN.Status = 1 ";
                Search += " AND TEN.Status = 1 ";
            }
            else if (FilterOptions == "Win")
            {
                //Query += " AND TEN.Status = 1 ";
                Search += " AND TEN.Status = 3 ";
            }
            else if (FilterOptions == "Loss")
            {
                //Query += " AND TEN.Status = 1 ";
                Search += " AND TEN.Status = 4 ";
            }
            else if (FilterOptions == "Budget")
            {
                //Query += " AND TEN.TenderType = 0 ";
                Search += " AND TEN.TenderType= 0 ";
            }
            else if (FilterOptions == "Firm")
            {
                //Query += " AND TEN.TenderType = 1 ";
                Search += " AND TEN.TenderType= 1 ";
            }
            else
            {

            }


            Int32 Counter = 0;
            if (SearchText != "")
            {
                Search = " AND (";
                foreach (DataRow drCol in dtColumns.Rows)
                {
                    if (drCol["ColumnName"].ToString() == "CustomerId")
                    {
                        //Query += " (SELECT Customer FROM tblCustomerInfromation WHERE Id = Ten.CustomerId) " + SortingOrder;
                        if (Counter > 0)
                        {
                            Search += " OR ";
                        }

                        Search += " Ten.CustomerId IN (SELECT Id FROM tblCustomerInformation WHERE Customer LIKE ('%" + SearchText + "%'))";
                    }
                    else if (drCol["ColumnName"].ToString() == "LocationId")
                    {
                        if (Counter > 0)
                        {
                            Search += " OR ";
                        }

                        Search += " Ten.LocationId IN (SELECT LocationId FROM tbLocation WHERE Location LIKE ('%" + SearchText + "%'))";
                    }
                    //else if (drCol["ColumnName"].ToString() == "TenderType")
                    //{
                    //    if ("Bugdet".Contains(SearchText.ToString()))
                    //    {
                    //        Search += " ISNULL(Ten.TenderType,0) = 0";
                    //    }
                    //    else if ("Firm".Contains(SearchText.ToString()))
                    //    {
                    //        Search += " ISNULL(Ten.TenderType,0) = 1";
                    //    }
                    //    else
                    //    {
                    //        Search += " ISNULL(Ten.TenderType,0) = 0";
                    //    }
                    //}
                    //else if (drCol["ColumnName"].ToString() == "Status")
                    //{
                    //    if ("InProgress".Contains(SearchText.ToString()))
                    //    {
                    //        Search += " ISNULL(Ten.Status,0) = 1";
                    //    }
                    //    else if ("Win".Contains(SearchText.ToString()))
                    //    {
                    //        Search += " ISNULL(Ten.Status,0) = 2";
                    //    }
                    //    else if ("Loss".Contains(SearchText.ToString()))
                    //    {
                    //        Search += " ISNULL(Ten.Status,0) = 3";
                    //    }
                    //    else
                    //    {
                    //        Search += " ISNULL(Ten.Status,0) = 1";
                    //    }
                    //}
                    else
                    {
                        if (Counter > 0)
                        {
                            Search += " OR ";
                        }
                        Search += " " + drCol["ColumnName"].ToString() + " LIKE ('%" + SearchText + "%')";
                    }
                    Counter += 1;
                }
                Search += ")";
            }

            string[] columnNames = (from dc in dtSearchList.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            if (dtSearchList.Rows.Count > 0)
            {
                foreach (DataRow dr in dtSearchList.Rows)
                {
                    foreach (string cn in columnNames)
                    {
                        if (cn.ToString().Trim().ToString() == "CustomerId")
                        {
                            //Search += " AND (SELECT Customer FROM tblCustomerInfromation WHERE Id = Ten.CustomerId) " + SortingOrder;
                            Search += " AND Ten.CustomerId IN (SELECT Id FROM tblCustomerInformation WHERE Customer LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%'))";
                        }
                        else if (cn.ToString().Trim().ToString() == "LocationId")
                        {
                            Search += " AND Ten.LocationId IN (SELECT LocationId FROM tbLocation WHERE Location LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%'))";
                        }
                        else
                        {
                            Search += " AND " + cn.ToString().Trim().ToString() + " LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%')";
                        }
                        //Search += " AND " + cn + " like '%" + dr[cn.ToString()].ToString().Trim() + "%'";
                    }
                }
            }

            Query += Search;
            Query += ") AS TenDetails WHERE TenDetails.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND TenDetails.RowNum <= " + Convert.ToInt32((PageNo * PageSize)) + "; SELECT COUNT(*) AS Records FROM Tenders Ten WHERE ISNULL(IsDeleted, 0) = " + IsDeleted + " ";
            //if (UserName != "SulzerAdminUser")
            //{
            //    Query += " AND Ten.LocationId = " + LocationId;
            //}

            Query += " AND (ISNULL(ParentTenderUniqueId,'') = '0' OR ISNULL(ParentTenderUniqueId,'') = '')" + Search;
            if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
            {
                Query += " AND Ten.CreatedBy = '" + DisplayName + "'";
            }
            DataSet ds = clsDB.GetDataSet(Query);
            ds.Tables.Add(dtColumns);
            return ds;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public static DataSet LoadTenderDetails1(Int32 PageNo, Int32 PageSize, string SearchText, string SortingColumn, String SortingOrder, string UserName, DataTable dtSearchList, string FilterOptions, Int32 LocationId, string Role, string DisplayName, Int32 IsDeleted)
    {
        try
        {
            string Query = "SELECT GC.ColumnName FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'Tenders') AND (GT.UserName = '" + UserName + "')";
            DataTable dtColumns = new DataTable();
            dtColumns = clsDB.GetDataTable(Query);

            if (dtColumns.Rows.Count == 0)
            {
                DataRow dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "TenderId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "ProjectId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "CustomerId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "TenderType";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "DateOfCreation";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "CreatedBy";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "EstimatedAwardDate";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Status";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "RoleId";
            }

            Query = "SELECT * FROM(SELECT ROW_NUMBER() OVER ( ORDER BY ProjectId) AS RowNum,* FROM (SELECT ";
            Query += "DISTINCT ProjectId FROM Tenders Ten WHERE ISNULL(IsDeleted,0) = 0 ";

            Query += " AND (ISNULL(ParentTenderUniqueId,'') = '0' OR ISNULL(ParentTenderUniqueId,'') = '') AND ISNULL(IsVersion,0) = 0";
            if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
            {
                Query += " AND Ten.CreatedBy = '" + DisplayName + "' ";
            }

            string Search = "";
            Int32 Counter = 0;
            if (SearchText != "")
            {
                Search = " AND (";
                foreach (DataRow drCol in dtColumns.Rows)
                {
                    if (drCol["ColumnName"].ToString() == "CustomerId")
                    {
                        if (Counter > 0)
                        {
                            Search += " OR ";
                        }

                        Search += " Ten.CustomerId IN (SELECT Id FROM tblCustomerInformation WHERE Customer LIKE ('%" + SearchText + "%'))";
                    }
                    else if (drCol["ColumnName"].ToString() == "LocationId")
                    {
                        if (Counter > 0)
                        {
                            Search += " OR ";
                        }

                        Search += " Ten.LocationId IN (SELECT LocationId FROM tbLocation WHERE Location LIKE ('%" + SearchText + "%'))";
                    }
                    else
                    {
                        if (Counter > 0)
                        {
                            Search += " OR ";
                        }
                        Search += " " + drCol["ColumnName"].ToString() + " LIKE ('%" + SearchText + "%')";
                    }
                    Counter += 1;
                }
                Search += ")";
            }

            string[] columnNames = (from dc in dtSearchList.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            if (dtSearchList.Rows.Count > 0)
            {
                foreach (DataRow dr in dtSearchList.Rows)
                {
                    foreach (string cn in columnNames)
                    {
                        if (cn.ToString().Trim().ToString() == "CustomerId")
                        {
                            //Search += " AND (SELECT Customer FROM tblCustomerInfromation WHERE Id = Ten.CustomerId) " + SortingOrder;
                            Search += " AND Ten.CustomerId IN (SELECT Id FROM tblCustomerInformation WHERE Customer LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%'))";
                        }
                        else if (cn.ToString().Trim().ToString() == "LocationId")
                        {
                            Search += " AND Ten.LocationId IN (SELECT LocationId FROM tbLocation WHERE Location LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%'))";
                        }
                        else
                        {
                            Search += " AND " + cn.ToString().Trim().ToString() + " LIKE ('%" + dr[cn.ToString().Trim()].ToString().Trim() + "%')";
                        }
                    }
                }
            }

            Query += Search;
            Query += ") AS Tenders) AS TenderDetails WHERE TenderDetails.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND TenderDetails.RowNum <= " + Convert.ToInt32((PageNo * PageSize));
            Query += "; SELECT COUNT(DISTINCT ProjectId) AS Records FROM Tenders TD WHERE ISNULL(IsDeleted, 0) = 0 AND CreatedBy = '" + DisplayName + "' " + Search;
            Query += "; SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY ProjectId) AS RowNum,* FROM (SELECT COUNT(DISTINCT TenderId) AS TenderCount,ProjectId FROM Tenders WHERE ISNULL(IsDeleted,0) = 0 AND ISNULL(IsVersion,0) = 0 " + Search + " AND CreatedBy = '" + DisplayName + "' GROUP BY ProjectId) TenderCount) AS Counts WHERE Counts.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND Counts.RowNum <= " + Convert.ToInt32((PageNo * PageSize)); ;
            Query += "; SELECT COUNT(GC.ColumnName) AS ColumnCounts FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'Tenders') AND (GT.UserName = '" + UserName + "')";
            DataSet ds = clsDB.GetDataSet(Query);
            ds.Tables.Add(dtColumns);
            return ds;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static DataTable LoadTenderItemVersions(string ProjectId, string TenderId, string ItemId, string UserName, string DisplayName, string FilterOption, Int32 IsDeleted)
    {
        try
        {
            string Query = "SELECT GC.ColumnName FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'Tenders') AND (GT.UserName = '" + UserName + "')";
            DataTable dtColumns = new DataTable();
            dtColumns = clsDB.GetDataTable(Query);

            Query = "SELECT Ten.Id, Ten.ParentTenderUniqueId, ISNULL(Ten.IsChildTender,0) AS IsChildTender, Ten.TenderUniqueId, (SELECT Customer FROM tblCustomerInformation WHERE Id = Ten.CustomerId) AS CustomerId, ISNULL(MinorVersion,'001') AS MinorVersion, ISNULL(MajorVersion,'A') AS MajorVersion, (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Submitted' WHEN 3 THEN 'Win' WHEN 4 THEN 'Loss' WHEN 5 THEN 'Router' END) AS Status ";

            if (dtColumns.Rows.Count > 0)
            {
                foreach (DataRow dr in dtColumns.Rows)
                {
                    if (dr["ColumnName"].ToString() == "CustomerId")
                    {
                        //Query += ", (SELECT Customer FROM tblCustomerInformation WHERE Id = Ten.CustomerId) AS CustomerId";
                    }
                    else if (dr["ColumnName"].ToString() == "LocationId")
                    {
                        Query += ", (SELECT Location FROM tbLocation WHERE LocationId = Ten.LocationId) AS LocationId";
                    }
                    else if (dr["ColumnName"].ToString() == "TenderType")
                    {
                        Query += ", (CASE TenderType WHEN 1 THEN 'Firm' ELSE 'Budget' END) AS TenderType ";
                    }
                    else if (dr["ColumnName"].ToString() == "RoleId")
                    {
                        Query += ", (SELECT Role FROM tblRoles WHERE RoleId = Ten.RoleId) AS RoleId";
                    }
                    else if (dr["ColumnName"].ToString() == "Status")
                    {
                        //Query += ", (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Submitted' WHEN 3 THEN 'Win' ELSE 'Loss' END) AS Status ";
                    }
                    else if (dr["ColumnName"].ToString() == "DateOfCreation")
                    {
                        Query += ", convert(varchar, Ten.DateOfCreation, 106) AS DateOfCreation ";
                    }
                    else if (dr["ColumnName"].ToString() == "EstimatedAwardDate")
                    {
                        Query += ", convert(varchar, Ten.EstimatedAwardDate, 106) AS EstimatedAwardDate ";
                    }
                    else if (dr["ColumnName"].ToString() == "AssignById")
                    {
                        Query += ", (SELECT Role FROM tblRoles WHERE RoleId = Ten.AssignById) AS AssignById";
                    }
                    else if (dr["ColumnName"].ToString() == "AssignDt")
                    {
                        Query += ", convert(varchar, Ten.AssignDt, 106) AS AssignDt ";
                    }
                    else if (dr["ColumnName"].ToString() == "AssignToId")
                    {
                        Query += ", (SELECT Role FROM tblRoles WHERE RoleId = Ten.AssignToId) AS AssignToId";
                    }
                    else if (dr["ColumnName"].ToString() == "LegalEntity")
                    {
                        Query += ", (SELECT LegalEntityName FROM tblLegalEntity WHERE Id = Ten.LegalEntity) AS LegalEntity";
                    }
                    else if (dr["ColumnName"].ToString() == "ManualStatusUpateDt")
                    {
                        Query += ", convert(varchar, Ten.ManualStatusUpateDt, 106) AS ManualStatusUpateDt ";
                    }

                    else
                    {
                        Query += ", " + dr["ColumnName"].ToString();
                    }
                }

                Query += " FROM Tenders AS Ten WHERE (ISNULL(ParentTenderUniqueId,'') = '0' OR ISNULL(ParentTenderUniqueId,'') = '') AND ISNULL(IsDeleted,0) = " + IsDeleted;

                //if (UserName != "SulzerAdminUser" && (Role != "Admin" && Role != "Sales Manager" && Role != "Tendering Manager"))
                //{
                //    Query += " AND Ten.CreatedBy = '" + DisplayName + "'";
                //}
            }
            else
            {
                Query += ", ItemId, TenderId, (SELECT Role FROM tblRoles WHERE RoleId = Ten.RoleId) AS RoleId, ProjectId, (CASE TenderType WHEN 1 THEN 'Firm' ELSE 'Budget' END) AS TenderType, convert(varchar, Ten.DateOfCreation, 106) AS DateOfCreation, CreatedBy, LocationId, Cost, Currency, convert(varchar, Ten.EstimatedAwardDate, 106) AS EstimatedAwardDate, (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Submitted' WHEN 3 THEN 'Win' WHEN 4 THEN 'Loss' WHEN 5 THEN 'Router' END) AS Status ";
                Query += " FROM Tenders AS Ten WHERE (ISNULL(Ten.ParentTenderUniqueId,'') = '0' OR ISNULL(Ten.ParentTenderUniqueId,'') = '') ";

                DataRow dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "ProjectId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "TenderId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "ItemId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "CustomerId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "TenderType";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "DateOfCreation";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "CreatedBy";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "EstimatedAwardDate";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Status";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "RoleId";
            }
            Query += " AND ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' AND ItemId = '" + ItemId + "' AND CreatedBy = '" + DisplayName + "' AND ISNULL(IsVersion,0) = 1";

            if (FilterOption == "Active")
            {
                Query += " AND Status = 2 ";
            }
            else if (FilterOption == "InProgress")
            {
                Query += " AND Status = 1 ";
            }
            else if (FilterOption == "Win")
            {
                Query += " AND Status = 3 ";
            }
            else if (FilterOption == "Loss")
            {
                Query += " AND Status = 4 ";
            }
            else if (FilterOption == "Budget")
            {
                Query += " AND TenderType= 0 ";
            }
            else if (FilterOption == "Firm")
            {
                Query += " AND TenderType= 1 ";
            }
            else
            {

            }

            DataTable TenderItemVersion = new DataTable();
            TenderItemVersion = clsDB.GetDataTable(Query);
            return TenderItemVersion;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static DataTable GetChildTenders(DataTable dt)
    {
        try
        {
            string WhereClause = "";
            foreach (DataRow dr in dt.Rows)
            {
                WhereClause += "'" + dr["TenderUniqueId"].ToString() + "',";
            }
            WhereClause = WhereClause.Remove(WhereClause.Length - 1, 1);

            String Query = "SELECT * FROM Tenders WHERE ParentTenderUniqueId IN (" + WhereClause + ")";
            DataTable dtTenders = new DataTable();

            dtTenders = clsDB.GetDataTable(Query);
            return dtTenders;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public static bool CreateMajorVersion(int tenderType,string newTenderId,string tenderIdToBeCopied,string userRole,string createdByName,string createdById)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("CreateTenderMajorVersion", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            cmd.Parameters.AddWithValue("@TenderType", tenderType);
            cmd.Parameters.AddWithValue("@TenderUniqueId", newTenderId);
            cmd.Parameters.AddWithValue("@TenderToBeCopied", tenderIdToBeCopied);
            cmd.Parameters.AddWithValue("@userrole", userRole);
            cmd.Parameters.AddWithValue("@createdByName", createdByName);
            cmd.Parameters.AddWithValue("@createdById", createdById);
            cmd.ExecuteNonQuery();
            con.Close();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
    public static bool DeleteTender(string uniqueId)
    {
        try
        {
            SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
            con.Open();
            SqlCommand cmd = new SqlCommand("DeleteTenderDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            //cmd.Parameters.AddWithValue("@TenderId", tenderId);
            //cmd.Parameters.AddWithValue("@ProjectId", projectId);
            cmd.Parameters.AddWithValue("@TenderUniqueId", uniqueId);
            cmd.ExecuteNonQuery();
            con.Close();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public static DataTable GetFormData()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GeneralFormData", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }
    public static DataTable GetLatestProjectId()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetLatestProjectId", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }


    public static string AllocateTender(string tenderId, string message, string username, int userrole, string sender, string location, bool markasread, string customer, string AssiGnBy,string newTenderId)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("SaveMessage", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@NewTenderUniqueId", newTenderId);
        cmd.Parameters.AddWithValue("@message", message);
        cmd.Parameters.AddWithValue("@date", "");
        cmd.Parameters.AddWithValue("@username", username);
        cmd.Parameters.AddWithValue("@userrole", userrole);
        cmd.Parameters.AddWithValue("@tenderId", tenderId);
        cmd.Parameters.AddWithValue("@sender", sender);
        cmd.Parameters.AddWithValue("@location", location);
        cmd.Parameters.AddWithValue("@masrkasread", markasread);
        cmd.Parameters.AddWithValue("@customer", customer);
        cmd.Parameters.AddWithValue("@assignby", AssiGnBy);
        cmd.ExecuteNonQuery();
        con.Close();
        return "true";
    }


    public static string ManualStatus(string tenderId, string message, string username, string manualstatus)
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("ManualStatus", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@message", message);
        cmd.Parameters.AddWithValue("@username", username);
        cmd.Parameters.AddWithValue("@manualstatus", manualstatus);
        cmd.Parameters.AddWithValue("@tenderId", tenderId);

        cmd.ExecuteNonQuery();
        con.Close();
        return "true";
    }

}