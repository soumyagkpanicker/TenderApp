using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for clsCustomerInformation
/// </summary>
public class clsCustomerInformation
{
    public static string tblCustomerInfo = "tblCustomerInformation";
    public static Boolean DELTEDATAINTABLE(String Id)
    {
        try
        {
            clsDB.ExecuteQuery("Delete From AdditionalPricingMaster where Id = '" + Id + "'");

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
    public static int SQLQUERY(string Table, List<string> ColumnName, List<string> ColumnValue, string Type, string Condition)
    {
        System.Text.StringBuilder SQLQuery = new System.Text.StringBuilder();
        if (Type == "INSERT")
        {
            SQLQuery.Append("INSERT INTO " + Table + "(");
            foreach (var Colname in ColumnName)
            {
                SQLQuery.Append(Colname + ",");
            }
            SQLQuery = SQLQuery.Remove(SQLQuery.Length - 1, 1);
            SQLQuery.Append(") VALUES (");
            foreach (var ColVal in ColumnValue)
            {
                SQLQuery.Append("'" + ColVal + "',");
            }
            SQLQuery = SQLQuery.Remove(SQLQuery.Length - 1, 1);
            SQLQuery.Append(")");

            // SQLQuery += "(" + ColumnName + ") VALUES ('" + ColumnValue + "')";
        }
        else if (Type == "UPDATE")
        {

            string[] ColumnSetName = ColumnName.ToArray();
            string[] ColumnSetValue = ColumnValue.ToArray();
            string SetCondition = string.Empty;
            for (int count = 0; count < ColumnSetName.Count(); count++)
            {
                if (string.IsNullOrEmpty(SetCondition))
                {
                    SetCondition = ColumnSetName[count] + "='" + ColumnSetValue[count] + "'";
                }
                else
                {
                    SetCondition = SetCondition + "," + ColumnSetName[count] + "='" + ColumnSetValue[count] + "'";
                }
            }
            SQLQuery.Append("UPDATE " + Table + " SET " + SetCondition + " WHERE " + Condition + "'");

        }
        else if (Type == "DELETE")
        {
            SQLQuery.Append("DELETE from " + Table + " WHERE " + Condition + "'");
        }
        clsDB.ExecuteQuery(SQLQuery.ToString());
        return 1;
    }
    public static DataTable FillPredefinetblValue(Int32 Value)
    {
        DataTable dt = clsDB.GetDataTable("SELECT * FROM " + tblCustomerInfo + " WHERE Id = " + Value);
        return dt;
    }

    public static DataSet GetAllCustomersInfo(Int32 PageNo, Int32 PageSize, string SearchText, string SortingColumn, String SortingOrder, string UserName, DataTable dtSearchList)
    {
        try
        {

            string Query = "SELECT GC.ColumnName FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'tblCustomerInformation') AND (GT.UserName = '" + UserName + "')";
            DataTable dtColumns = new DataTable();
            dtColumns = clsDB.GetDataTable(Query);

            Query = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY";
            if (SortingColumn == "Contact")
            {
                Query += " CI.FirstName + ' ' + CI.LastName " + SortingOrder;
            }
            else if (SortingColumn == "Country")
            {
                Query += " (SELECT Location FROM tbLocation WHERE LocationId = CI.Country) " + SortingOrder;
            }
            else
            {
                Query += " CI." + SortingColumn + " " + SortingOrder;
            }
            Query += ") AS RowNum, Id "; //CASE WHEN Gender = 'True' THEN 'MALE' ELSE 'FEMALE' END AS Gender

            if (dtColumns.Rows.Count > 0)
            {
                foreach (DataRow dr in dtColumns.Rows)
                {
                    if (dr["ColumnName"].ToString() == "Contact")
                    {
                        Query += ", CI.FirstName + ' ' + CI.LastName AS Contact";
                    }
                    else if (dr["ColumnName"].ToString() == "Country")
                    {
                        Query += ", (SELECT Location FROM tbLocation WHERE LocationId = CI.Country) AS Country";
                    }
                    else
                    {
                        Query += ", " + dr["ColumnName"].ToString();
                    }
                }

                Query += " FROM " + tblCustomerInfo + " AS CI WHERE ISNULL(CI.IsDeleted,0) = 0";
            }
            else
            {
                Query += ", ISNULL(Customer, '') AS Customer, ISNULL(FirstName, '') + ' ' + ISNULL(LastName, '') AS Contact, PostalCodeCity ,ISNULL((SELECT Location FROM tbLocation WHERE (LocationId = CI.Country)), '') AS Country, ISNULL(ProjectDescription, '') AS ProjectDescription, ISNULL(CustomersReference, '') AS CustomersReference, ISNULL(EmailId,'') AS EmailId, ISNULL(City,'') AS City ";
                Query += " FROM " + tblCustomerInfo + " AS CI WHERE ISNULL(CI.IsDeleted,0) = 0";

                DataRow dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Customer";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Contact";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "PostalCodeCity";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Country";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "ProjectDescription";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "CustomersReference";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "EmailId";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "City";
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
                    if (drCol["ColumnName"].ToString() == "Contact")
                    {
                        Search += " CI.FirstName + ' ' + CI.LastName LIKE ('%" + SearchText + "%')";
                    }
                    else if (drCol["ColumnName"].ToString() == "TiItle")
                    {
                        if (SearchText == "MALE" || SearchText == "Male")
                        {
                            Search += " CI.Title = " + 1;
                        }
                        else
                        {
                            Search += " CI.Title = " + 0;
                        }
                    }
                    else if (drCol["ColumnName"].ToString() == "Country")
                    {
                        Search += " CI.Country IN (SELECT LocationId FROM tbLocation WHERE Location LIKE ('%" + SearchText + "%'))";
                    }
                    else if (drCol["ColumnName"].ToString() == "Customer Name")
                    {
                        Search += " CI.Customer LIKE ('%" + SearchText + "%')";
                    }
                    else if (drCol["ColumnName"].ToString() == "SAP Customer Reference")
                    {
                        Search += " CI.CustomersReference LIKE ('%" + SearchText + "%')";
                    }
                    else
                    {
                        Search += " CI." + drCol["ColumnName"].ToString().Replace(" ", "") + " LIKE ('%" + SearchText + "%')";
                    }
                    Counter += 1;
                }
                Search += ")";
                //Query += Search;
            }
            string[] columnNames = (from dc in dtSearchList.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            if (dtSearchList.Rows.Count > 0)
            {
                foreach (DataRow dr in dtSearchList.Rows)
                {
                    foreach (string cn in columnNames)
                    {
                        Search += " AND " + cn + " like '%" + dr[cn.ToString()].ToString().Trim() + "%'";
                    }
                }
            }

            Query += Search;
            Query += ") AS CustomerInformation WHERE CustomerInformation.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND CustomerInformation.RowNum <= " + Convert.ToInt32((PageNo * PageSize)) + "; SELECT COUNT(*) AS Records FROM tblCustomerInformation CI WHERE ISNULL(IsDeleted, 0) = 0 " + Search;

            DataSet ds = clsDB.GetDataSet(Query);
            ds.Tables.Add(dtColumns);
            return ds;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable getTableFromName(string TableName)
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT * FROM " + TableName);
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet getTableColumnNames(string TableName, string UserName)
    {
        try
        {
            DataSet dtColumns = new DataSet();
            //dt = clsDB.GetDataSet("SELECT tblGridColumns.ColumnName AS COLUMN_NAME FROM tblGridTables INNER JOIN tblGridColumns ON tblGridColumns.GridTableId = tblGridTables.Id WHERE tblGridTables.TableName = '" + TableName + "'");
            dtColumns = clsDB.GetDataSet("SELECT tblGridColumns.ColumnName AS COLUMN_NAME FROM tblGridTables INNER JOIN tblGridColumns ON tblGridColumns.GridTableId = tblGridTables.Id WHERE tblGridTables.TableName = '" + TableName + "' AND UserName = '" + UserName + "';SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + TableName + "' ORDER BY ORDINAL_POSITION");
            if (dtColumns.Tables[0].Rows.Count == 0)
            {
                if (TableName == "tblCustomerInformation")
                {
                    DataRow dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Customer";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Contact";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "PostalCodeCity";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Country";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "ProjectDescription";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "CustomersReference";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "EmailId";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "City";
                }
                else if (TableName == "tblMessages")
                {
                    DataRow dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Message";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Date";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Sender";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Location";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Customer";
                }
                else if (TableName == "Tender")
                {
                    DataRow dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "TenderId";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "ProjectId";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "CustomerId";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "TenderType";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "DateOfCreation";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "CreatedBy";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "EstimatedAwardDate";
                    dr = dtColumns.Tables[0].NewRow();
                    dtColumns.Tables[0].Rows.Add(dr);
                    dr["COLUMN_NAME"] = "Status";
                }
            }
            return dtColumns;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable getTenderDocColumnNames()
    {
        try
        {
            DataTable dtColumns = new DataTable();
            //dt = clsDB.GetDataSet("SELECT tblGridColumns.ColumnName AS COLUMN_NAME FROM tblGridTables INNER JOIN tblGridColumns ON tblGridColumns.GridTableId = tblGridTables.Id WHERE tblGridTables.TableName = '" + TableName + "'");
            dtColumns = clsDB.GetDataTable("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'tblTenderDocuments' ORDER BY ORDINAL_POSITION");
            return dtColumns;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static Boolean SaveDefaultColumns(DataTable dtColumns)
    {
        try
        {
            string Query = "SELECT * FROM tblGridTables WHERE TableName = '" + dtColumns.Rows[0]["TableName"].ToString() + "' AND UserName = '" + dtColumns.Rows[0]["UserName"].ToString() + "'";
            DataTable dtColumnDetails = new DataTable();

            dtColumnDetails = clsDB.GetDataTable(Query);
            if (dtColumnDetails.Rows.Count > 0)
            {
                Query = "DELETE FROM tblGridColumns WHERE GridTableId = " + dtColumnDetails.Rows[0]["Id"];
                clsDB.ExecuteQuery(Query);
            }

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean SaveTableColumns(DataTable dtColumns)
    {
        try
        {
            string Query = "SELECT * FROM tblGridTables WHERE TableName = '" + dtColumns.Rows[0]["TableName"].ToString() + "' AND UserName = '" + dtColumns.Rows[0]["UserName"].ToString() + "'";
            DataTable dtColumnDetails = new DataTable();

            dtColumnDetails = clsDB.GetDataTable(Query);
            if (dtColumnDetails.Rows.Count > 0)
            {
                Query = "DELETE FROM tblGridColumns WHERE GridTableId = " + dtColumnDetails.Rows[0]["Id"];
                clsDB.ExecuteQuery(Query);
            }
            else
            {
                Query = "INSERT INTO tblGridTables (TableName, UserName) VALUES ('" + dtColumns.Rows[0]["TableName"].ToString() + "','" + dtColumns.Rows[0]["UserName"].ToString() + "')";
                clsDB.ExecuteQuery(Query);

                Query = "SELECT MAX(Id) AS Id FROM tblGridTables WHERE TableName = '" + dtColumns.Rows[0]["TableName"].ToString() + "'";
                dtColumnDetails.Dispose();
                dtColumnDetails = clsDB.GetDataTable(Query);
            }

            for (int i = 0; i <= dtColumns.Columns.Count - 3; i++)
            {
                Query = "INSERT INTO tblGridColumns (GridTableId, ColumnName) VALUES (" + dtColumnDetails.Rows[0]["Id"].ToString() + ",'" + dtColumns.Rows[0]["Column" + i].ToString() + "')";
                clsDB.ExecuteQuery(Query);
            }

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static DataTable GetUserList()
    {
        try
        {
            DataTable dtUsers = new DataTable();
            dtUsers = clsDB.GetDataTable("SELECT * FROM tblUserDetails");
            return dtUsers;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetUserGroups()
    {
        try
        {
            DataTable dtUsersGroups = new DataTable();
            dtUsersGroups = clsDB.GetDataTable("SELECT * FROM tblUserGroups");
            return dtUsersGroups;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static Boolean SaveUserRoles(string UserId, Boolean Admin, Boolean TenderingManger, Boolean Sales, Boolean TenderEngineer, Boolean SalesManager, Boolean Viewer, string EmailAddress)
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT COUNT(*) as Count FROM tblUserRoles WHERE PSNumber = '" + UserId + "' OR EmailAddress = '" + EmailAddress + "'");
            string Query = "";
            if (Convert.ToInt32(dtUsersRoles.Rows[0]["Count"]) > 0)
            {
                Query = "UPDATE tblUserRoles SET Admin = " + (Admin ? 1 : 0) + ", TenderingManager = " + (TenderingManger ? 1 : 0) + ", Sales = " + (Sales ? 1 : 0) + ", TenderEngineer = " + (TenderEngineer ? 1 : 0) + ", SalesManager = " + (SalesManager ? 1 : 0) + ", Viewer = " + (Viewer ? 1 : 0) + ", EmailAddress = '" + EmailAddress + "' WHERE PSNumber = '" + UserId + "' OR EmailAddress = '" + EmailAddress + "'";
            }
            else
            {
                Query = "INSERT INTO tblUserRoles (PSNumber, Admin, TenderingManager, Sales, TenderEngineer, SalesManager, Viewer, EmailAddress) VALUES ('" + UserId + "', " + (Admin ? 1 : 0) + "," + (TenderingManger ? 1 : 0) + "," + (Sales ? 1 : 0) + "," + (TenderEngineer ? 1 : 0) + "," + (SalesManager ? 1 : 0) + "," + (Viewer ? 1 : 0) + ",'" + EmailAddress + "')";
            }
            clsDB.ExecuteQuery(Query);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean SaveUserAccess(Int32 ModuleId, Int32 Role, Boolean View, Boolean Insert, Boolean Update, Boolean Delete, Boolean FirmTender, Boolean ChangeStatus)
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT COUNT(*) as Count FROM tblUserAccess WHERE ModuleId = " + ModuleId + " AND Role = " + Role);
            string Query = "";
            if (Convert.ToInt32(dtUsersRoles.Rows[0]["Count"]) > 0)
            {
                Query = "UPDATE tblUserAccess SET [View] = " + (View ? 1 : 0) + ", [Insert] = " + (Insert ? 1 : 0) + ", [Update] = " + (Update ? 1 : 0) + ", [Delete] = " + (Delete ? 1 : 0) + " WHERE ModuleId = " + ModuleId + " AND Role = " + Role;
            }
            else
            {
                Query = "INSERT INTO tblUserAccess (Role, ModuleId, [View], [Insert], [Update], [Delete]) VALUES (" + Role + ", " + ModuleId + ", " + (View ? 1 : 0) + "," + (Insert ? 1 : 0) + "," + (Update ? 1 : 0) + "," + (Delete ? 1 : 0) + ")";
            }
            clsDB.ExecuteQuery(Query);


            dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT COUNT(*) as Count FROM TenderTypeRolesMaster WHERE RoleId = " + Role);

            if (Convert.ToInt32(dtUsersRoles.Rows[0]["Count"]) > 0)
            {
                Query = "UPDATE TenderTypeRolesMaster SET [HasAccess] = " + (FirmTender ? 1 : 0) + ", [ChangeStatus] = " + (ChangeStatus ? 1 : 0) + " WHERE RoleId = " + Role;
            }
            else
            {
                Query = "INSERT INTO TenderTypeRolesMaster (RoleId, HasAccess, ChangeStatus, TenderType) VALUES (" + Role + ", " + (FirmTender ? 1 : 0) + "," + (ChangeStatus ? 1 : 0) + ", 2)";
            }
            clsDB.ExecuteQuery(Query);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean SaveUserLocation(string PSNumber, string LocationCode)
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT COUNT(*) as Count FROM tblUserLocations WHERE PSNumber = '" + PSNumber + "' AND LocationCode = '" + LocationCode + "'");
            string Query = "";
            if (Convert.ToInt32(dtUsersRoles.Rows[0]["Count"]) > 0)
            {
                Query = "DELETE FROM tblUserLocations WHERE PSNumber = '" + PSNumber + "'";
                clsDB.ExecuteQuery(Query);
            }

            Query = "INSERT INTO tblUserLocations (PSNumber, LocationCode) VALUES ('" + PSNumber + "', '" + LocationCode + "')";

            clsDB.ExecuteQuery(Query);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean DeleteeUserLocation(string PSNumber)
    {
        try
        {
            string Query = "DELETE FROM tblUserLocations WHERE PSNumber = '" + PSNumber + "'";
            clsDB.ExecuteQuery(Query);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean SaveLegalEntity(string CountryCode, Int32 LegalEntityId)
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT COUNT(*) as Count FROM tblAssignedLegalEntity WHERE CountryCode = '" + CountryCode + "' AND LegalEntityId = " + LegalEntityId);
            string Query = "";
            if (Convert.ToInt32(dtUsersRoles.Rows[0]["Count"]) > 0)
            {
                Query = "DELETE FROM tblAssignedLegalEntity WHERE CountryCode = '" + CountryCode + "'";
                clsDB.ExecuteQuery(Query);
            }

            Query = "INSERT INTO tblAssignedLegalEntity (CountryCode, LegalEntityId) VALUES ('" + CountryCode + "', " + LegalEntityId + ")";

            clsDB.ExecuteQuery(Query);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static DataTable LoadSelectedLocations(string PSNumber)
    {
        try
        {
            DataTable dtLocation = new DataTable();
            dtLocation = clsDB.GetDataTable("SELECT TUL.LocationCode, TL.Location FROM tblUserLocations AS TUL INNER JOIN tbLocation AS TL ON TL.LocationCode = TUL.LocationCode WHERE TUL.PSNumber = '" + PSNumber + "'");
            return dtLocation;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet LoadLocationsAndRoles(string PSNumber)
    {
        try
        {
            DataSet dsLocation = new DataSet();
            dsLocation = clsDB.GetDataSet("SELECT TL.LocationId AS Id,TUL.LocationCode, TL.Location FROM tblUserLocations AS TUL INNER JOIN tbLocation AS TL ON TL.LocationCode = TUL.LocationCode WHERE TUL.PSNumber = '" + PSNumber + "' ORDER BY TL.Location ASC; SELECT * FROM tblUserRoles WHERE PSNumber = '" + PSNumber + "' OR EmailAddress = '" + PSNumber + "'");
            return dsLocation;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable LoadLegalEntity(string LocationId)
    {
        try
        {
            DataTable dtLegalEntity = new DataTable();
            dtLegalEntity = clsDB.GetDataTable("SELECT LE.Id, LE.LegalEntityName FROM tblAssignedLegalEntity ALE INNER JOIN tbLocation TL ON TL.LocationCode = ALE.CountryCode INNER JOIN tblLegalEntity LE ON LE.Id = ALE.LegalEntityId WHERE TL.LocationId = " + LocationId);
            return dtLegalEntity;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    //public static DataTable LoadLegalEntity(string LocationId)
    //{
    //    try
    //    {
    //        DataTable dtLegalEntity = new DataTable();
    //        dtLegalEntity = clsDB.GetDataTable("SELECT LE.Id, LE.LegalEntityName FROM tblAssignedLegalEntity ALE INNER JOIN tbLocation TL ON TL.LocationCode = ALE.CountryCode INNER JOIN tblLegalEntity LE ON LE.Id = ALE.LegalEntityId WHERE TL.LocationId = " + LocationId);
    //        return dtLegalEntity;
    //    }
    //    catch (Exception ex)
    //    {
    //        throw (ex);
    //    }
    //}

    public static DataTable LoadAllLegalEntity()
    {
        try
        {
            DataTable dtLegalEntity = new DataTable();
            dtLegalEntity = clsDB.GetDataTable("SELECT * FROM tblLegalEntity");
            return dtLegalEntity;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }


    public static DataTable GetUserAccess(string ModuleId, string Role)
    {
        try
        {
            DataTable dtLocation = new DataTable();
            dtLocation = clsDB.GetDataTable("SELECT TUA.Id, ModuleId, Role, [View], [Insert], [Update], [Delete] FROM tblUserAccess AS TUA WHERE (ModuleId = " + ModuleId + ") AND (Role =(SELECT TR.RoleId FROM tblRoles TR WHERE (TR.Role = '" + Role + "')))");
            return dtLocation;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetEditTenderRole(string TenderUniqueId)
    {
        try
        {
            DataTable dtTenderRoleId = new DataTable();
            dtTenderRoleId = clsDB.GetDataTable("SELECT CreatedBy, (SELECT Location FROM tbLocation WHERE LocationId = Tenders.LocationId) AS Location, RoleId, Status FROM Tenders WHERE TenderUniqueId = '" + TenderUniqueId + "'");
            return dtTenderRoleId;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static string CheckUserName(string UserName)
    {
        try
        {
            DataTable dtUser = new DataTable();
            dtUser = clsCustomerInformation.GetUserProfileDetails(UserName.Trim());
            if (dtUser.Rows.Count > 0)
            {
                return "Exist";
            }
            else
            {
                return "User does not exist";
            }
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public static DataTable GetUserRoles()
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT * FROM tblUserRoles");
            return dtUsersRoles;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetAllLegalEntites()
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT * FROM tblLegalEntity");
            return dtUsersRoles;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetAssignedLegalEntities(string CountryCode)
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT tALE.Id,tALE.CountryCode,tALE.LegalEntityId,(SELECT LegalEntityName FROM tblLegalEntity WHERE Id = tALE.LegalEntityId) AS LegalEntityName FROM tblAssignedLegalEntity tALE WHERE CountryCode = '" + CountryCode + "'");

            return dtUsersRoles;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetModuleList()
    {
        try
        {
            DataTable dtMpduleList = new DataTable();
            dtMpduleList = clsDB.GetDataTable("SELECT * FROM tblModuleMaster WHERE ISNULL(ParentModuleId,0) = 0");
            return dtMpduleList;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetUserAccess(Int32 Role)
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT * FROM tblUserAccess WHERE Role = " + Role);
            return dtUsersRoles;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetTenderConfiguration(Int32 Role)
    {
        try
        {
            DataTable dtUsersRoles = new DataTable();
            dtUsersRoles = clsDB.GetDataTable("SELECT * FROM TenderTypeRolesMaster WHERE RoleId = " + Role);
            return dtUsersRoles;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet getMessageAndCount()
    {
        try
        {
            DataSet ds = clsDB.GetDataSet("SELECT * FROM tblMessages INNER JOIN Tenders ON Tenders.TenderUniqueId = tblMessages.TenderId WHERE ISNULL(MarkAsRead,0) = 0 AND ISNULL(RoleId,0) = 0; SELECT COUNT(*) AS MessageCount FROM tblMessages INNER JOIN Tenders ON Tenders.TenderUniqueId = tblMessages.TenderId WHERE ISNULL(MarkAsRead,0) = 0 AND ISNULL(RoleId,0) = 0");
            return ds;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet getMessageGrid(string SearchText, string SortingColumn, string SortingOrder, Int32 PageNo, Int32 PageSize, string UserName, DataTable dtSearchList)
    {
        try
        {

            string Query = "SELECT GC.ColumnName FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'tblMessages') AND (GT.UserName = '" + UserName + "')";
            DataTable dtColumns = new DataTable();
            dtColumns = clsDB.GetDataTable(Query);

            Query = "SELECT * FROM (SELECT ROW_NUMBER() OVER (ORDER BY " + SortingColumn + " " + SortingOrder + ") AS RowNum, MSG.Id, MSG.TenderId AS TenderUniqueId ";

            if (dtColumns.Rows.Count > 0)
            {
                foreach (DataRow dr in dtColumns.Rows)
                {
                    if (dr["ColumnName"].ToString() == "Date")
                    {
                        Query += ", convert(varchar, MSG.Date, 106) AS Date ";
                    }
                    else if (dr["ColumnName"].ToString() == "TenderId")
                    {
                        Query += ", (SELECT TenderId FROM Tenders WHERE TenderUniqueId = MSG.TenderId) AS TenderId";
                    }
                    else
                    {
                        Query += ", " + dr["ColumnName"].ToString();
                    }
                }
                //Query += " FROM " + tblCustomerInfo + " AS CI WHERE ISNULL(CI.IsDeleted,0) = 0";
            }
            else
            {
                Query += ", MSG.Message, convert(varchar, MSG.Date, 106) AS Date, MSG.Sender, MSG.Location, MSG.Customer";

                DataRow dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Message";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Date";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Sender";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Location";
                dr = dtColumns.NewRow();
                dtColumns.Rows.Add(dr);
                dr["ColumnName"] = "Customer";
            }
            Query += " FROM tblMessages AS MSG WHERE ISNULL(MSG.MarkAsRead,0) = 0 ";

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
                    Search += " MSG." + drCol["ColumnName"].ToString().Replace(" ", "") + " LIKE ('%" + SearchText + "%')";
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
                        Search += " AND " + cn + " like '%" + dr[cn.ToString()].ToString().Trim() + "%'";
                    }
                }
            }

            Query += Search;
            Query += ") AS Messages WHERE Messages.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND Messages.RowNum <= " + Convert.ToInt32((PageNo * PageSize));
            //Query += "AND " + SearchColumns + " LIKE ('%" + SearchText + "%')";
            //Query += " ORDER BY " + SortingColumn + " " + SortingOrder;
            Search = Search.Replace("MSG.", "");
            Query += ";SELECT COUNT(*) AS MessageCount FROM tblMessages WHERE ISNULL(MarkAsRead,0) = 0 " + Search;
            DataSet ds = clsDB.GetDataSet(Query);
            ds.Tables.Add(dtColumns);
            return ds;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable getTopMessages(string Role, string Location)
    {
        try
        {
            string query = "SELECT TOP (2) TM.Id, Message, convert(varchar, Date, 106) AS Date, UserName, UserRole, TM.TenderId, Sender, Location, MarkAsRead, Customer FROM tblMessages AS TM INNER JOIN Tenders ON Tenders.TenderUniqueId = TM.TenderId WHERE ISNULL(Tenders.Status,1) = 1 AND ISNULL(MarkAsRead,0) = 0 AND (UserRole = (SELECT RoleId FROM tblRoles WHERE (Role = '" + Role + "'))) AND (ISNULL(MarkAsRead, 0) = 0) AND (Location = '" + Location + "')";
            //query += "AND UserRole = '" + Role + "' AND Location = '" + Location + "';";
            DataTable dt = clsDB.GetDataTable(query);
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static bool SaveMessage(int MessageId, string Message)
    {
        try
        {
            string query = "UPDATE tblMessages SET Message = '" + Message + "' WHERE IsNull(MarkAsRead,0) = 0 AND Id =" + MessageId;
            clsDB.ExecuteQuery(query);
        }
        catch (Exception ex)
        {
            throw (ex);
        }
        return true;
    }

    public static Boolean SaveFileToDb(String ProjectId, String TenderId, String TenderUniqueId, String FileName, String FilePath, String UserName, String UserLocation, String UserRole, String ItemId)
    {
        try
        {
            string query = "";
            query = "INSERT INTO tblTenderDocuments(ProjectId, TenderId, TenderUniqueId, FileName, FilePath, IsDeleted, Location, UploadedBy, Role, ItemId) VALUES (";
            query = query + "'" + ProjectId + "','" + TenderId + "','" + TenderUniqueId + "','" + FileName + "','" + FilePath + "', 0,'" + UserLocation + "','" + UserName + "','" + UserRole + "','" + ItemId + "')"; //System.Convert.ToInt32(dr["Gender"].ToString()) + "," +
            clsDB.ExecuteQuery(query);
            return true;
        }
        catch (Exception ex)
        {
            //throw (ex);
            return false;
        }
    }

    public static Boolean SaveCutomer(DataTable dtCustomerInformation)
    {
        try
        {
            foreach (DataRow dr in dtCustomerInformation.Rows)
            {
                string query = "";
                string UniqueIdentity = dr["Customer"].ToString() + "/" + dr["CountryName"] + "/" + dr["City"] + "-" + dr["PostalCode"];
                if (dr["CustomerId"] == "")
                {
                    query = "INSERT INTO tblCustomerInformation(Customer, FirstName, LastName, StreetNumber, PostalCodeCity, ProjectDescription, CustomersReference, Country, IsDeleted, EmailId, Title, City, UniqueIdentity, TenderingManager) VALUES (";
                    query = query + "'" + dr["Customer"] + "','" + dr["FirstName"] + "','" + dr["LastName"] + "','" + dr["StreetNumber"] + "','" + dr["PostalCode"] + "','" + dr["ProjectDescription"] + "','" + dr["CustomerReference"] + "'," + dr["Country"] + ", 0, '" + dr["EmailId"] + "'," + System.Convert.ToInt32(dr["Gender"].ToString()) + ", '" + dr["City"] + "', '" + UniqueIdentity.ToString() + "', '" + dr["TenderingManager"].ToString() + "')"; //System.Convert.ToInt32(dr["Gender"].ToString()) + "," +
                }
                else
                {
                    query = "UPDATE tblCustomerInformation SET Customer = '" + dr["Customer"].ToString() + "', FirstName = '" + dr["FirstName"].ToString() + "', LastName = '" + dr["LastName"].ToString() + "', StreetNumber = '" + dr["StreetNumber"].ToString() + "', PostalCodeCity = '" + dr["PostalCode"].ToString() + "', ProjectDescription = '" + dr["ProjectDescription"].ToString() + "', CustomersReference = '" + dr["CustomerReference"].ToString() + "', Country = " + Convert.ToInt32(dr["Country"]) + ", EmailId = '" + dr["EmailId"].ToString() + "', Title = '" + dr["Gender"].ToString() + "', City = '" + dr["City"].ToString() + "', UniqueIdentity = '" + UniqueIdentity.ToString() + "', TenderingManager = '" + dr["TenderingManager"].ToString() + "' WHERE Id = " + Convert.ToInt32(dr["CustomerId"]);
                }

                clsDB.ExecuteQuery(query);
            }
            //DataTable dt = clsDB.GetDataTable("INSERT INTO tblCustomerInformation(Customer, FirstName, LastName, StreetNumber, PostalCodeCity, PumpDescription, PumpManufacturer, PumpType, Customer, ValidityPeriod, Gender, Country) VALUE()");
            return true;
        }
        catch (Exception ex)
        {
            //throw (ex);
            return false;
        }
    }

    public static DataTable getCustomerInformation(string TableName, string Id)
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT CI.Id, CI.Customer, CI.FirstName, CI.LastName, CI.StreetNumber, CI.PostalCodeCity, CI.ProjectDescription, CI.CustomersReference, CI.Title, CI.Country, CI.IsDeleted, CI.EmailId, CI.City, CI.TenderingManager FROM " + TableName + " AS CI WHERE Id in (" + Id + ")");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static Boolean DeleteCustomerDetails(string TableName, String Id)
    {
        try
        {
            clsDB.ExecuteQuery("UPDATE " + TableName + " SET IsDeleted = 1 WHERE Id IN (" + Id + ")");
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean DeleteTenders(string DeleteUsing, string ProjectId, string TenderId, string ItemId, string Id)
    {
        try
        {
            if (DeleteUsing == "Project")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE ProjectId = '" + Id + "'");
            }
            else if (DeleteUsing == "Tender")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "'");
            }
            else if (DeleteUsing == "Item")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' AND ItemId = '" + ItemId + "'");
            }
            else if (DeleteUsing == "File")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' AND ItemId = '" + ItemId + "' AND Id = " + Id);
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean DeleteTenderDocuments(string DeleteUsing, String Id)
    {
        try
        {
            if (DeleteUsing == "Project")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE ProjectId = '" + Id + "'");
            }
            else if (DeleteUsing == "Tender")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE TenderId = '" + Id + "'");
            }
            else if (DeleteUsing == "Item")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE ItemId = '" + Id + "'");
            }
            else if (DeleteUsing == "File")
            {
                clsDB.ExecuteQuery("UPDATE Tenders SET IsDeleted = 1 WHERE Id = " + Id);
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean VALIDATEDUPLICATE(DataTable dtCustomerDetails)
    {
        try
        {
            if (dtCustomerDetails.Rows.Count > 0)
            {
                DataTable dtCust = new DataTable();
                string query = "SELECT ISNULL(COUNT(*),0) AS Count FROM tblCustomerInformation WHERE ISNULL(IsDeleted,0) = 0 AND Customer = '" + dtCustomerDetails.Rows[0]["Customer"].ToString() + "' AND Country = " + Convert.ToInt32(dtCustomerDetails.Rows[0]["Country"]) + " AND PostalCodeCity = '" + dtCustomerDetails.Rows[0]["PostalCode"].ToString() + "' AND City = '" + dtCustomerDetails.Rows[0]["City"].ToString() + "'";
                dtCust = clsDB.GetDataTable(query);

                if (dtCust.Rows.Count > 0)
                {
                    if (Convert.ToInt32(dtCust.Rows[0]["Count"]) > 0)
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
                else
                {
                    return true;
                }
            }
            else
            {
                return false;
            }
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static DataTable GetPumpType(string PumpManufacturer)
    {
        try
        {
            DataTable dtPumpType = new DataTable();
            string Query = "SELECT * FROM tblPumpType WHERE PumpManufacturerId = " + PumpManufacturer;

            dtPumpType = clsDB.GetDataTable(Query);
            return dtPumpType;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet GetAllTenderDocuments(Int32 PageNo, Int32 PageSize, string SearchText, string SortingColumn, string SortingOrder, DataTable dtSearchList)
    {
        try
        {
            string Query = "SELECT * FROM (SELECT  ROW_NUMBER() OVER ( ORDER BY TD." + SortingColumn + " " + SortingOrder;

            Query += ") AS RowNum, TD.Id, TD.ProjectId, TD.TenderId,ISNULL(TD.ItemId,'') AS ItemId, TD.FileName, TD.Location, TD.UploadedBy, TD.Role,ISNULL((SELECT tblPumpManufacturer.PumpManufacturer FROM TenderDetails INNER JOIN tblPumpManufacturer ON tblPumpManufacturer.Id = TenderDetails.ParameterValue WHERE TenderDetails.TenderId = TD.TenderUniqueId AND TenderDetails.ParameterIdentity = 'originalpumpmanufacturer' ),'') AS OriginalPumpManufacturer, ISNULL((SELECT tblPumpType.PumpType FROM TenderDetails INNER JOIN tblPumpType ON tblPumpType.Id = TenderDetails.ParameterValue WHERE TenderDetails.TenderId = TD.TenderUniqueId AND TenderDetails.ParameterIdentity = 'pumptype'),'') AS PumpType FROM tblTenderDocuments AS TD WHERE ISNULL(TD.IsDeleted,0) = 0 ";
            string Search = "";
            if (SearchText.ToString().Trim() != "")
            {
                //Search = "AND " + SearchColumns.ToString().Trim() + " LIKE ('%" + SearchText + "%')";
                Search = " AND (TD.ProjectId like ('%" + SearchText + "%') OR TD.TenderId like ('%" + SearchText + "%') OR TD.FileName like ('%" + SearchText + "%') OR TD.Location like ('%" + SearchText + "%') OR TD.UploadedBy like ('%" + SearchText + "%') OR TD.Role like ('%" + SearchText + "%') OR TD.ItemId like ('%" + SearchText + "%')) ";
            }

            string[] columnNames = (from dc in dtSearchList.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            if (dtSearchList.Rows.Count > 0)
            {
                foreach (DataRow dr in dtSearchList.Rows)
                {
                    foreach (string cn in columnNames)
                    {
                        Search += " AND " + cn + " like '%" + dr[cn.ToString()].ToString().Trim() + "%'";
                    }
                }
            }

            Query += Search;
            Query += ") AS TenderDocuments WHERE TenderDocuments.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND TenderDocuments.RowNum <= " + Convert.ToInt32((PageNo * PageSize)) + "; SELECT COUNT(*) AS Records FROM tblTenderDocuments TD WHERE ISNULL(IsDeleted, 0) = 0 " + Search;

            //Query += ";SELECT DISTINCT ProjectId FROM tblTenderDocuments;SELECT DISTINCT TenderId, ProjectId FROM tblTenderDocuments";

            DataSet ds = clsDB.GetDataSet(Query);
            return ds;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetAllProjects()
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT DISTINCT ProjectId FROM Tenders");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetAllTenders(string ProjectId)
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT DISTINCT TenderId, TenderUniqueId FROM Tenders WHERE ProjectId = '" + ProjectId + "'");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetAllTenderItems(string ProjectId, string TenderId)
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT DISTINCT ItemId,TenderId, TenderUniqueId FROM Tenders WHERE ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "'");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet GetAllDistinctProjects(Int32 PageNo, Int32 PageSize, string SearchText, string SortingColumn, string SortingOrder, DataTable dtSearchList)
    {
        try
        {
            string Query = "SELECT * FROM(SELECT ROW_NUMBER() OVER ( ORDER BY ProjectId) AS RowNum,* FROM (SELECT   ";
            Query += "DISTINCT ProjectId FROM tblTenderDocuments TD WHERE ISNULL(IsDeleted,0) = 0 ";

            string Search = "";
            if (SearchText.ToString().Trim() != "")
            {
                Search = " AND (TD.ProjectId like ('%" + SearchText + "%') OR TD.TenderId like ('%" + SearchText + "%') OR TD.FileName like ('%" + SearchText + "%') OR TD.Location like ('%" + SearchText + "%') OR TD.UploadedBy like ('%" + SearchText + "%') OR TD.Role like ('%" + SearchText + "%') OR TD.ItemId like ('%" + SearchText + "%')) ";
            }

            string[] columnNames = (from dc in dtSearchList.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            if (dtSearchList.Rows.Count > 0)
            {
                foreach (DataRow dr in dtSearchList.Rows)
                {
                    foreach (string cn in columnNames)
                    {
                        Search += " AND " + cn + " like '%" + dr[cn.ToString()].ToString().Trim() + "%'";
                    }
                }
            }
            Query += Search;
            Query += ") AS TenderDocuments) AS Docs WHERE Docs.RowNum >= " + ((PageNo * PageSize) - (PageSize - 1)) + " AND Docs.RowNum <= " + Convert.ToInt32((PageNo * PageSize));
            Query += "; SELECT COUNT(DISTINCT TenderId) AS TenderCount FROM tblTenderDocuments WHERE ISNULL(IsDeleted,0) = 0 GROUP BY ProjectId";
            Query += "; SELECT COUNT(DISTINCT ProjectId) AS Records FROM tblTenderDocuments TD WHERE ISNULL(IsDeleted, 0) = 0 " + Search;
            DataSet dt = clsDB.GetDataSet(Query);
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet GetAllDistinctTenders(string ProjectId)
    {
        try
        {
            DataSet dt = clsDB.GetDataSet("SELECT DISTINCT TenderId, TenderUniqueId FROM tblTenderDocuments WHERE ISNULL(IsDeleted,0) = 0 AND ProjectId = '" + ProjectId + "'; SELECT COUNT(DISTINCT ItemId) AS ItemCount FROM tblTenderDocuments WHERE ISNULL(IsDeleted,0) = 0 AND ProjectId = '" + ProjectId + "' GROUP BY TenderId");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet GetAllDistinctTenderItems(string ProjectId, string TenderId)
    {
        try
        {
            DataSet dt = clsDB.GetDataSet("SELECT DISTINCT ISNULL(ItemId,'') AS ItemId,TenderId, TenderUniqueId FROM tblTenderDocuments WHERE ISNULL(IsDeleted,0) = 0 AND ISNULL(ItemId,'') != '' AND ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "'; SELECT COUNT(DISTINCT Id) AS FileCount FROM tblTenderDocuments WHERE ISNULL(IsDeleted,0) = 0 AND ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' GROUP BY ItemId");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataTable GetAllItemFiles(string ProjectId, string TenderId, string ItemId)
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT TD.Id, TD.ProjectId, TD.TenderId,ISNULL(TD.ItemId,'') AS ItemId, TD.FileName, TD.Location, TD.UploadedBy, TD.Role,ISNULL((SELECT tblPumpManufacturer.PumpManufacturer FROM TenderDetails INNER JOIN tblPumpManufacturer ON tblPumpManufacturer.Id = TenderDetails.ParameterValue WHERE TenderDetails.TenderId = TD.TenderUniqueId AND TenderDetails.ParameterIdentity = 'originalpumpmanufacturer' ),'') AS OriginalPumpManufacturer, ISNULL((SELECT tblPumpType.PumpType FROM TenderDetails INNER JOIN tblPumpType ON tblPumpType.Id = TenderDetails.ParameterValue WHERE TenderDetails.TenderId = TD.TenderUniqueId AND TenderDetails.ParameterIdentity = 'pumptype'),'') AS PumpType FROM tblTenderDocuments AS TD WHERE ISNULL(IsDeleted,0) = 0 AND ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' AND ISNULL(ItemId,'') = '" + ItemId + "'");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet GetTenderAllDistinctTenders(string ProjectId, string DisplayName, string FilterOption, Int32 IsDeleted)
    {
        try
        {
            string Search = "";
            if (FilterOption == "Active")
            {
                Search += " AND Status = 2 ";
            }
            else if (FilterOption == "InProgress")
            {
                Search += " AND Status = 1 ";
            }
            else if (FilterOption == "Win")
            {
                Search += " AND Status = 3 ";
            }
            else if (FilterOption == "Loss")
            {
                Search += " AND Status = 4 ";
            }
            else if (FilterOption == "Budget")
            {
                Search += " AND TenderType= 0 ";
            }
            else if (FilterOption == "Firm")
            {
                Search += " AND TenderType= 1 ";
            }
            else
            {

            }

            DataSet dt = clsDB.GetDataSet("SELECT DISTINCT TenderId FROM Tenders WHERE ISNULL(IsVersion,0) = 0 AND ISNULL(IsDeleted,0) = " + IsDeleted + " AND ProjectId = '" + ProjectId + "' AND CreatedBy = '" + DisplayName + "'" + Search + "; SELECT COUNT(DISTINCT ItemId) AS ItemCount FROM Tenders WHERE ISNULL(IsVersion,0) = 0 AND ISNULL(IsDeleted,0) = 0 AND ProjectId = '" + ProjectId + "' AND CreatedBy = '" + DisplayName + "' " + Search + " GROUP BY TenderId");
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }

    public static DataSet GetTenderAllDistinctTenderItems(string ProjectId, string TenderId, string DisplayName, string FilterOption, Int32 IsDeleted, string UserName)
    {
        try
        {
            string Search = "";
            if (FilterOption == "Active")
            {
                Search += " AND Status = 2 ";
            }
            else if (FilterOption == "InProgress")
            {
                Search += " AND Status = 1 ";
            }
            else if (FilterOption == "Win")
            {
                Search += " AND Status = 3 ";
            }
            else if (FilterOption == "Loss")
            {
                Search += " AND Status = 4 ";
            }
            else if (FilterOption == "Budget")
            {
                Search += " AND TenderType= 0 ";
            }
            else if (FilterOption == "Firm")
            {
                Search += " AND TenderType= 1 ";
            }
            else
            {

            }

            string Query = "SELECT DISTINCT ISNULL(ItemId,'') AS ItemId,TenderId, TenderUniqueId,ISNULL(MinorVersion,'001') AS MinorVersion, ISNULL(MajorVersion,'A') AS MajorVersion FROM Tenders WHERE ISNULL(IsVersion,0) = 0 AND ISNULL(IsDeleted,0) = " + IsDeleted + " AND ISNULL(ItemId,'') != '' AND ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' AND CreatedBy = '" + DisplayName + "' AND ISNULL(MinorVersion,'001') = '001' AND ISNULL(MajorVersion,'A') = 'A' " + Search + "; SELECT COUNT(DISTINCT Id) AS VersionCount FROM Tenders WHERE ISNULL(IsVersion,0) = 1 AND ISNULL(IsDeleted,0) = 0 AND ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' AND CreatedBy = '" + DisplayName + "' " + Search + " GROUP BY ItemId;";
            
            string QueryColumns = "SELECT GC.ColumnName FROM tblGridTables AS GT INNER JOIN tblGridColumns AS GC ON GC.GridTableId = GT.Id WHERE (GT.TableName = 'Tenders') AND (GT.UserName = '" + UserName + "')";
            DataTable dtColumns = new DataTable();
            dtColumns = clsDB.GetDataTable(QueryColumns);


            Query += "SELECT Ten.Id, Ten.ParentTenderUniqueId, ISNULL(Ten.IsChildTender,0) AS IsChildTender, Ten.TenderUniqueId, (SELECT Customer FROM tblCustomerInformation WHERE Id = Ten.CustomerId) AS CustomerId, ISNULL(MinorVersion,'001') AS MinorVersion, ISNULL(MajorVersion,'A') AS MajorVersion, (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Submitted' WHEN 3 THEN 'Win' WHEN 4 THEN 'Loss' WHEN 5 THEN 'Routed' END) AS Status  ";

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

                Query += " FROM Tenders AS Ten WHERE ISNULL(IsDeleted,0) = " + IsDeleted;
            }
            else
            {
                Query += ", ItemId, TenderId, (SELECT Role FROM tblRoles WHERE RoleId = Ten.RoleId) AS RoleId, ProjectId, (CASE TenderType WHEN 1 THEN 'Firm' ELSE 'Budget' END) AS TenderType, convert(varchar, Ten.DateOfCreation, 106) AS DateOfCreation, CreatedBy, LocationId, Cost, Currency, convert(varchar, Ten.EstimatedAwardDate, 106) AS EstimatedAwardDate, (CASE ISNULL(Status,1) WHEN 1 THEN 'Inprogress' WHEN 2 THEN 'Submitted' WHEN 3 THEN 'Win' WHEN 4 THEN 'Loss' WHEN 5 THEN 'Routed' END) AS Status  ";
                Query += " FROM Tenders AS Ten WHERE ISNULL(IsDeleted,0) = " + IsDeleted;

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

            Query += " AND ISNULL(ItemId,'') != '' AND ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "' AND CreatedBy = '" + DisplayName + "' AND ISNULL(MinorVersion,'001') = '001' AND ISNULL(MajorVersion,'A') = 'A' " + Search;

            DataSet dt = clsDB.GetDataSet(Query);
            return dt;
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }


    public static string GetERPID(string ProjectId, string TenderId)
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT TOP 1 ISNULL(ERPId,0) AS ERPId FROM Tenders WHERE ProjectId = '" + ProjectId + "' AND TenderId = '" + TenderId + "'");
            if (dt.Rows.Count > 0)
            {
                return dt.Rows[0]["ERPId"].ToString();
            }
            else
            {
                return "0";
            }
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public static DataTable GetUserProfileDetails(string PSNumber)
    {
        try
        {
            DataTable dt = clsDB.GetDataTable("SELECT * FROM tblUserDetails WHERE PSNumber = '" + PSNumber + "'OR EmailAddress = '" + PSNumber + "' OR UserName = '" + PSNumber + "'");
            if (dt.Rows.Count == 0)
            {
                dt = clsDB.GetDataTable("SELECT * FROM tblUserDetails WHERE UserName = '" + PSNumber + "'");
            }
            return dt;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static string SaveUserProfileDetails(string PSNumber, string UserName, string EmailAddress, string PhoneNumber, string UserRole)
    {
        try
        {
            //string Query = "SELECT COUNT(*) AS Count FROM tblUserDetail WHERE PSNumber = '" + PSNumber + "' OR EmailAddress = '" + EmailAddress + "' OR UserName = '" + PSNumber + "'";
            //DataTable dtUserDetails = clsDB.GetDataTable(Query);
            //if (Convert.ToInt32(dtUserDetails.Rows[0]["Count"]) == 0)
            //{
            string Query = "INSERT INTO tblUserDetails (PSNumber, UserName, EmailAddress, PhoneNumber, Role) VALUES ('" + PSNumber + "', '" + UserName + "', '" + EmailAddress + "', '" + PhoneNumber + "', '" + UserRole + "')";
            clsDB.ExecuteQuery(Query);
            //}

            Query = "SELECT Id FROM tblUserDetails WHERE PSNumber = '" + PSNumber + "' OR EmailAddress = '" + EmailAddress + "' OR UserName = '" + PSNumber + "'";
            DataTable dtUserDetails = new DataTable();
            dtUserDetails = clsDB.GetDataTable(Query);
            return dtUserDetails.Rows[0]["Id"].ToString();
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }
    public static bool UpdateUserProfileDetails(string PSNumber, string EmailAddress, string PhoneNumber)
    {
        try
        {
            string Query = "UPDATE tblUserDetails SET EmailAddress ='" + EmailAddress + "', PhoneNumber ='" + PhoneNumber + "' WHERE PSNumber = '" + PSNumber + "'";
            clsDB.ExecuteQuery(Query);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static Boolean ActiveCustomerDetails(String Id)
    {
        try
        {

            clsDB.ExecuteQuery("UPDATE  TenderDetails  SET IsDeleted = 0 WHERE TenderId = '" + Id + "'");
            clsDB.ExecuteQuery("UPDATE  Tenders  SET IsDeleted = 0 WHERE TenderUniqueId = '" + Id + "'");

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }


}