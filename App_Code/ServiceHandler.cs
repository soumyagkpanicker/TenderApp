using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web;
using System.Web.SessionState;
using OfficeOpenXml;
using System.Data;
using System.Xml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.Configuration;
using System.DirectoryServices;
using System.Text.RegularExpressions;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using Newtonsoft.Json;
using System.Linq;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using System.Security.Principal;
using System.Security.Claims;
using System.Web.Security;
using System.Web.UI;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml.html;
using iTextSharp.tool.xml.pipeline.html;
using iTextSharp.tool.xml.pipeline.end;
using iTextSharp.tool.xml;
using iTextSharp.tool.xml.pipeline.css;
using iTextSharp.tool.xml.parser;
using ClosedXML.Excel;
using System.Collections;
using System.ComponentModel;
using System.Net.Mail;
using System.Net;
using DocumentFormat.OpenXml.Drawing;

public class ServiceHandler : IHttpHandler, IRequiresSessionState
{
    HttpContext _context = null;

    public bool IsReusable { get { return false; } }

    /// <summary>
    /// Functions to handle all http requests
    /// </summary>
    public void ProcessRequest(HttpContext context)
    {
        _context = context;
        if (String.IsNullOrEmpty(_context.Request["CBH"])) { return; }

        string CBH = _context.Request["CBH"].ToUpper();

        string ReturnJSON = "";

        switch (CBH)
        {
            case "LOGIN": ReturnJSON = Login(); break;
            case "LOGOUT": Logout(); break;
            case "GETNAVBAR": ReturnJSON = GETNAVBAR(); break;
            case "GETUSERNAME": ReturnJSON = GETUSERNAME(); break;
            case "SNAPDOWNTITLES": ReturnJSON = ReturnSnapdownTitles(); break;
            case "REVIEW": ReturnJSON = Review(); break;
            case "GETALLROLES": ReturnJSON = ReturnAllRoles(); break;
            case "GETALLLOCATIONS": ReturnJSON = ReturnAllLocations(); break;
            case "MAINNAVIGATION": ReturnJSON = MainNavigation(); break;
            case "SUBNAVIGATION": ReturnJSON = SubNavigation(); break;
            case "FORMDATA": ReturnJSON = FormData(); break;
            case "SAVEFORMDATA": ReturnJSON = Convert.ToString(SaveFormData()); break;
            case "SAVETENDER": ReturnJSON = Convert.ToString(SaveTender()); break;
            case "GETTENDERLIST": ReturnJSON = ReturnTenderList(); break;
            case "FILTERTENDERLIST": ReturnJSON = ReturnFilteredTenderList(); break;
            case "FORMDATABYUIQUEID": ReturnJSON = FormDataByUniqueId(); break;
            case "LOADEDITPREDEFINETABLE": ReturnJSON = LOADEDITPREDEFINETABLE(); break;
            case "LOADCUSTOMERINFOGRID": ReturnJSON = LOADCUSTOMERINFOGRID(); break;
            case "LOADCOUNTRYLIST": ReturnJSON = LOADCOUNTRYLIST(); break;
            case "LOADVALIDATIONPERIOD": ReturnJSON = LOADVALIDATIONPERIOD(); break;
            case "LOADPUMPMANUFACTURER": ReturnJSON = LOADPUMPMANUFACTURER(); break;
            case "LOADPUMPTYPE": ReturnJSON = LOADPUMPTYPE(); break;
            case "VALIDATEDUPLICATE": ReturnJSON = VALIDATEDUPLICATE(); break;
            case "SAVECUSTOMER": ReturnJSON = SAVECUSTOMER(); break;
            case "LOADCUSTOMERDATA": ReturnJSON = LOADCUSTOMERDATA(); break;
            case "DELETECUSTOMER": ReturnJSON = DELETECUSTOMER(); break;
            case "LOADMESSAGES": ReturnJSON = LOADMESSAGES(); break;
            case "REVIEWFORMDATA": ReturnJSON = ReviewFormData(); break;
            case "DELETETENDER": ReturnJSON = Convert.ToString(DeleteTender()); break;
            case "GETGENERALFORMDATA": ReturnJSON = GetGeneralFormData(); break;
            case "GETTABLEDATA": ReturnJSON = GetTableData(); break;
            case "GETDDVALUES": ReturnJSON = GetDDValues(); break;
            case "GETCUSTOMERBYID": ReturnJSON = GetCustomerById(); break;
            case "GETALLFORMATTRIBUTES": ReturnJSON = GetAllFormAttributes(); break;
            case "CONVERTTOPDFFROMHTML": ReturnJSON = ConvertToPDFfromHTML(); break;
            case "LOCATIONFROMLOCATIONID": ReturnJSON = GetLocationCodeFromLocation(); break;
            case "LATESTPROJECTID": ReturnJSON = GetLatestProjectId(); break;
            case "GETMESSAGEGRID": ReturnJSON = GETMESSAGEGRID(); break;
            case "GETTOPMESSAGE": ReturnJSON = GETTOPMESSAGE(); break;
            case "UPLOADFILES": ReturnJSON = UPLOADFILES(); break;
            case "LOADTENDERDOCUMENTS": ReturnJSON = LOADTENDERDOCUMENTS(); break;
            //case "LOADPROJECTSANDTENDERS": ReturnJSON = LOADPROJECTSANDTENDERS(); break;
            case "LOADPROJECTS": ReturnJSON = LOADPROJECTS(); break;
            case "LOADTENDERS": ReturnJSON = LOADTENDERS(); break;
            case "LOADITEMS": ReturnJSON = LOADITEMS(); break;
            case "LOADPDISTINCTROJECTS": ReturnJSON = LOADPDISTINCTROJECTS(); break;
            case "LOADDISTINCTTENDERS": ReturnJSON = LOADDISTINCTTENDERS(); break;
            case "LOADDISTINCTITEMS": ReturnJSON = LOADDISTINCTITEMS(); break;
            case "LOADITEMFILES": ReturnJSON = LOADITEMFILES(); break;
            case "LOADTENDERDISTINCTTENDERS": ReturnJSON = LOADTENDERDISTINCTTENDERS(); break;
            case "LOADTENDERDISTINCTITEMS": ReturnJSON = LOADTENDERDISTINCTITEMS(); break;
            case "LOADTENDERDISTINCTITEMVERSIONS": ReturnJSON = LOADTENDERDISTINCTITEMVERSIONS(); break;
            case "SAVEMESSAGE": ReturnJSON = SAVEMESSAGE(); break;
            case "DELETETENDERDOCUMENTS": ReturnJSON = DELETETENDERDOCUMENTS(); break;
            case "DELETETENDERS": ReturnJSON = DELETETENDERS(); break;
            case "RECENTTENDERS": ReturnJSON = GetRecentTenders(); break;
            case "PRODUCTLIST": ReturnJSON = ReturnProductsList(); break;
            case "PRODUCTPRICINGDATA": ReturnJSON = ReturnProductPricingData(); break;
            case "PRICINGHEADERS": ReturnJSON = ReturnProductPricingTableHeaders(); break;
            case "SAVEQUOTATION": ReturnJSON = SaveQuotation(); break;
            case "GETQUOTATION": ReturnJSON = GetQuotation(); break;
            case "MYACTIVETENDERS": ReturnJSON = MyActiveTenders(); break;
            case "MYOPENTENDERS": ReturnJSON = MyOpenTenders(); break;
            case "ALLTENDERS": ReturnJSON = AllTenders(); break;
            case "BUDGETTENDERS": ReturnJSON = BudgetTenders(); break;
            case "FIRMTENDERS": ReturnJSON = FirmTenders(); break;
            case "GETUSERPROFILE": ReturnJSON = GETUSERPROFILE(); break;
            case "UPDATEUSERPROFILE": ReturnJSON = UPDATEUSERPROFILE(); break;
            case "GETTENDER": ReturnJSON = GetTender(); break;
            case "CURRENCYEXCHANGERATE": ReturnJSON = CurrencyExchangeRate(); break;
            case "GETTENDERDETAILS": ReturnJSON = GetTenderDetails(); break;
            case "READPRICINGDATA": ReturnJSON = ReadPricingData(); break;
            case "UPDATETENDERROLE": ReturnJSON = UpdateTenderRole(); break;
            case "GETALLSUBNAV": ReturnJSON = GetAllSubNavigations(); break;
            case "SEARCHTENDER": ReturnJSON = SearchTender(); break;
            case "LOADTENDERDETAILS": ReturnJSON = LOADTENDERDETAILS(); break;
            case "LOADTENDERDETAILS1": ReturnJSON = LOADTENDERDETAILS1(); break;
            case "CHECKEDITTENDER": ReturnJSON = CHECKEDITTENDER(); break;
            case "GETCHILDTENDER": ReturnJSON = GETCHILDTENDER(); break;
            case "REORDER": ReturnJSON = ReOrder(); break;
            case "CREATEBUDGETTENDER": ReturnJSON = Convert.ToString(CreateBudGetTender()); break;
            case "SAVEBUDGETTENDERDETAILS": ReturnJSON = Convert.ToString(SaveBudgetTenderDetails()); break;
            case "GETCOLUMNNAMES": ReturnJSON = Convert.ToString(GETCOLUMNNAMES()); break;
            case "GETTENDERDOCUMENTSCOLUMNNAMES": ReturnJSON = Convert.ToString(GETTENDERDOCUMENTSCOLUMNNAMES()); break;
            case "GETDETAULTCOLUMNS": ReturnJSON = Convert.ToString(GETDETAULTCOLUMNS()); break;
            case "SAVECOLUMNNAMES": ReturnJSON = Convert.ToString(SAVECOLUMNNAMES()); break;
            case "SAVEDAULTCOLUMNS": ReturnJSON = Convert.ToString(SAVEDAULTCOLUMNS()); break;
            case "EXPORTTOEXCEL": ReturnJSON = Convert.ToString(ExportToExcel()); break;
            case "GETUSERLIST": ReturnJSON = GETUSERLIST(); break;
            case "GETALLUSERLIST": ReturnJSON = GETALLUSERLIST(); break;
            case "SAVEUSERROLES": ReturnJSON = SAVEUSERROLES(); break;
            case "LOADUSERROLES": ReturnJSON = LOADUSERROLES(); break;
            case "LOADMODULELIST": ReturnJSON = LOADMODULELIST(); break;
            case "SAVEUSERACCESS": ReturnJSON = SAVEUSERACCESS(); break;
            case "LOADUSERACCESS": ReturnJSON = LOADUSERACCESS(); break;
            case "LOADTENDERCONFIGURATION": ReturnJSON = LOADTENDERCONFIGURATION(); break;
            case "SAVEUSERLOCATION": ReturnJSON = SAVEUSERLOCATION(); break;
            case "GETSELECTEDLOCATIONLIST": ReturnJSON = GETSELECTEDLOCATIONLIST(); break;
            case "GETUSERGROUP": ReturnJSON = GETUSERGROUP(); break;
            case "LOADLOCATIONADNROLE": ReturnJSON = LOADLOCATIONADNROLE(); break;
            case "LOADSWITCHLEGALENTITY": ReturnJSON = LOADSWITCHLEGALENTITY(); break;
            case "LOADLEGALENTITY": ReturnJSON = LOADLEGALENTITY(); break;
            case "LOADALLLEGALENTITY": ReturnJSON = LOADALLLEGALENTITY(); break;
            case "CHECKMODULERIGHTS": ReturnJSON = CHECKMODULERIGHTS(); break;
            case "FILTERVALUES": ReturnJSON = GetFilterValues(); break;
            case "FILTERTENDERDATA": ReturnJSON = FilterTenderData(); break;
            case "GETDISTINCTCOLUMNVALUES": ReturnJSON = GetDistinctColumnValues(); break;
            case "CHECKUSER": ReturnJSON = CHECKUSER(); break;
            case "ALLOCATETENDER": ReturnJSON = AllocateTenderToRole(); break;
            case "BALANCINGVALUES": ReturnJSON = BalancingValues(); break;
            case "COUPLINGVENDORVALUES": ReturnJSON = CouplingVendorsValues(); break;
            case "COUPLINGTYPEVALUES": ReturnJSON = CouplingTypeValues(); break;
            case "COUPLINGSPACERVALUES": ReturnJSON = CouplingSpacerValues(); break;
            case "COUPLINGSPACERLENGTHVALUES": ReturnJSON = CouplingSpacerLengthValues(); break;
            case "MECHANICALSEALVALUES": ReturnJSON = MechanicalSealValues(); break;
            case "BEARINGFRAMEVALUES": ReturnJSON = BearingFrameSize(); break;
            case "SHAFTSEALDIAMETERVALUES": ReturnJSON = ShaftSealDiameter(); break;
            case "MECHANICALSEALVENDORVALUES": ReturnJSON = MechanicalSealVendor(); break;
            case "SEALSYSTEMPLANVALUES": ReturnJSON = SealSystemPlan(); break;
            case "PIPETUBEVALUES": ReturnJSON = PipeorTube(); break;
            case "SEALSYSTEMVENDORVALUES": ReturnJSON = SealSystemVendor(); break;
            case "MATERIALVALUES": ReturnJSON = Material(); break;
            case "ISOLATORVENDORVALUES": ReturnJSON = IsolatorVenders(); break;
            case "LOADASSIGNEDLEGALENTITYLIST": ReturnJSON = LOADASSIGNEDLEGALENTITYLIST(); break;
            case "LOADALLLEGALENTITIES": ReturnJSON = LOADALLLEGALENTITIES(); break;
            case "SAVELEGALENTITY": ReturnJSON = SAVELEGALENTITY(); break;
            //case "OHXPRICINGDATA": ReturnJSON = GetOHXPricingData(); break;
            case "NEWOHXPRICINGDATA": ReturnJSON = GetOHXPricingData(); break;
            case "PRICINGDATA": ReturnJSON = GetPricingData(); break;
            case "MLEVALUESDATA": ReturnJSON = MLEValues(); break;
            case "GETPRICINGFROMPRODUCTID": ReturnJSON = Convert.ToString(GetOHXPricingFromProductId()); break;
            case "SAVEPRODUCTSFORTENDER": ReturnJSON = Convert.ToString(SaveProductsForTender()); break;
            case "DELETEPRICINGDATA": ReturnJSON = Convert.ToString(DeletePricingData()); break;
            case "DOESTENDEREXISTS": ReturnJSON = Convert.ToString(DoesTenderExists()); break;
            case "UPDATESTATUSMANUAL": ReturnJSON = UpdateStatusManual(); break;
            case "CHECKFIRMACCESSBYROLE": ReturnJSON = CheckFirmAccessByRole(); break;
            case "RETURNTENDERVERSION": ReturnJSON = ReturnTenderVersion(); break;
            case "UPDATEPARENTTENDERSTATUS": ReturnJSON = UpdateParentTenderStatus(); break;
            case "GETLATESTCHILDTENDERDETAILS": ReturnJSON = GetLatestChildTenderDetails(); break;
            case "CREATEFIRMTENDER": ReturnJSON = CreateFirmTender(); break;
            case "ACTIVETENDERDOCUMENTS": ReturnJSON = ACTIVETENDERDOCUMENTS(); break;
            case "POPULATEPROJECTIDS": ReturnJSON = PopulateProjectIds(); break;
            case "RETURNPROJECTID": ReturnJSON = ReturnProjectId(); break;
            case "MAKEAREVISEDVERSION": ReturnJSON = MakeARevisedVersion(); break;
            case "RETURNSTATUS": ReturnJSON = ReturnStatus(); break;
            case "UPDATEMARKASREAD": ReturnJSON = Convert.ToString(UpdateMarkAsRead()); break;
            //Added
            case "DELTEDATAINTABLE": ReturnJSON = DELTEDATAINTABLE(); break;
            case "ADDDATAINTABLE": ReturnJSON = ADDDATAINTABLE(); break;
            case "CREATEAMAJORVERSION": ReturnJSON = Convert.ToString(CreateMajorVersion()); break;
            default:
                break;
        }
        context.Response.Write(ReturnJSON);
        context.Response.Flush();
    }
    public string DELTEDATAINTABLE()
    {
        string DeleteId = _context.Request["Id"];
        try
        {

            clsCustomerInformation.DELTEDATAINTABLE(DeleteId);
            return "Success";

        }
        catch (Exception ex)
        {
            return ex.ToString();
        }
    }
    public string ADDDATAINTABLE()
    {
        try
        {
            string Parameter = _context.Request["ValStr"];

            JArray jsonResponse = JArray.Parse(Parameter);
            // Dictionary<string, string> dictObj = data.ToObject<Dictionary<string, string>>();
            Dictionary<string, string> dictObj = new Dictionary<string, string>();
            var table = JsonConvert.DeserializeObject<DataTable>(Parameter);
            List<string> ColName = new List<string>();

            List<string> Value = new List<string>();

            foreach (DataColumn column in table.Columns)
            {
                if (column.ColumnName != "Id")
                {
                    ColName.Add(column.ColumnName);
                }

            }

            string IdValue = string.Empty;
            foreach (DataRow row in table.Rows)
            {
                if (Convert.ToInt32(row[0]) == 0)
                {
                    foreach (DataColumn dc in table.Columns)
                    {
                        if (dc.ColumnName.ToString() != "Id")
                        {
                            Value.Add(row[dc].ToString());
                        }
                    }

                    int Val = clsCustomerInformation.SQLQUERY("AdditionalPricingMaster", ColName, Value, "INSERT", "");
                }
                else
                {

                    foreach (DataColumn dc in table.Columns)
                    {
                        if (dc.ColumnName.ToString() != "Id")
                        {
                            Value.Add(row[dc].ToString());
                        }
                        else
                        {
                            IdValue = row[dc].ToString();
                        }

                    }

                    string Condition = "Id" + "='" + IdValue;
                    int Val = clsCustomerInformation.SQLQUERY("AdditionalPricingMaster", ColName, Value, "UPDATE", Condition);
                    Condition = string.Empty;
                    IdValue = string.Empty;
                }

                Value = new List<string>();
            }
            return "Success";
        }
        catch (Exception ex)
        {
            return ex.ToString();
        }


    }
    public bool UpdateMarkAsRead()
    {
        try
        {
            string tenderId = _context.Request["TenderUniqueId"];
            Tender.UpdateMarkAsRead(tenderId);
            return true;
        }
        catch (Exception) {
            return false;
        }
        
    }
    public string PopulateProjectIds() {
        return JsonConvert.SerializeObject(Tender.GetProjectIds(),Newtonsoft.Json.Formatting.Indented);
    }

    public string UpdateParentTenderStatus()
    {
        string TenderUniqueId = _context.Request["TenderUniqueId"];
        return Tender.UpdateParentTenderStatus(TenderUniqueId);
    }
    public string GetOHXPricingFromProductId()
    {
        string productId = _context.Request["ProductId"];
        if (productId == "1")
        {
            string balancing = _context.Request["Balancing"];
            string mle = _context.Request["MLE"];
            string spacerLength = _context.Request["SpacerLength"];
            string spacer = _context.Request["Spacer"];
            string powerperrpm = _context.Request["Powerperrpm"];
            string type = _context.Request["Type"];
            string couplingVendor = _context.Request["CouplingVendor"];
            return Tender.GetOHXPricingFromProductId(productId, couplingVendor, type, powerperrpm, spacer, spacerLength, mle, balancing, null, null, null, null, null, null, null, null, null, null);
        }
        else if (productId == "2")
        {
            string mechanicalSeal = _context.Request["MechanicalSeal"];
            string bearingFrameSize = _context.Request["BearingFrameSize"];
            string shaftSealDiameter = _context.Request["ShaftSealDiameter"];
            string mechanicalSealVendor = _context.Request["MechanicalSealVendor"];
            string mle = _context.Request["MLE"];
            return Tender.GetOHXPricingFromProductId(productId, null, null, null, null, null, mle, null, mechanicalSeal, bearingFrameSize, shaftSealDiameter, mechanicalSealVendor, null, null, null, null, null, null);
        }
        else if (productId == "3")
        {
            string pipeTube = _context.Request["PipeTube"];
            string sealSystemVendor = _context.Request["SealSystemVendor"];
            string mle = _context.Request["MLE"];
            string sealSystemPlan = _context.Request["SealSystemPlan"];
            return Tender.GetOHXPricingFromProductId(productId, null, null, null, null, null, mle, null, null, null, null, null, sealSystemPlan, pipeTube, null, null, null, sealSystemVendor);
        }
        else if (productId == "4")
        {
            string bearingFrameSize = _context.Request["BearingFrameSize"];
            string material = _context.Request["Material"];
            string mle = _context.Request["MLE"];
            return Tender.GetOHXPricingFromProductId(productId, null, null, null, null, null, mle, null, null, bearingFrameSize, null, null, null, null, null, material, null, null);
        }
        else if (productId == "5")
        {
            string bearingFrameSize = _context.Request["BearingFrameSize"];
            string Vendor = _context.Request["Vendor"];
            string mle = _context.Request["MLE"];
            return Tender.GetOHXPricingFromProductId(productId, null, null, null, null, null, mle, null, null, bearingFrameSize, null, null, null, null, null, null, Vendor, null);
        }
        else
        {
            return "0";
        }

    }
    public string SaveProductsForTender()
    {
        string TenderUniqueId = _context.Request["TenderUniqueId"];
        string productId = _context.Request["ProductId"];
        string numberOfUnits = _context.Request["NumberOfUnits"];
        string dataColumnId = _context.Request["DataColumnId"];
        string cost = _context.Request["Cost"];
        return JsonConvert.SerializeObject(Tender.SaveProductsForTender(TenderUniqueId, productId, cost, dataColumnId, numberOfUnits), Newtonsoft.Json.Formatting.Indented);
    }
    public string BalancingValues()
    {
        return JsonConvert.SerializeObject(Tender.GetOHXCouplingBalancingValues(), Newtonsoft.Json.Formatting.Indented);
    }
    public string MLEValues()
    {
        return JsonConvert.SerializeObject(Tender.MLE(), Newtonsoft.Json.Formatting.Indented);
    }
    public string CouplingVendorsValues()
    {
        return JsonConvert.SerializeObject(Tender.GetOHXCouplingVendors(), Newtonsoft.Json.Formatting.Indented);
    }
    public string CouplingTypeValues()
    {
        return JsonConvert.SerializeObject(Tender.CouplingType(), Newtonsoft.Json.Formatting.Indented);
    }
    public string CouplingSpacerValues()
    {
        return JsonConvert.SerializeObject(Tender.Spacer(), Newtonsoft.Json.Formatting.Indented);
    }
    public string CouplingSpacerLengthValues()
    {
        return JsonConvert.SerializeObject(Tender.SpacerLength(), Newtonsoft.Json.Formatting.Indented);
    }
    public string MechanicalSealValues()
    {
        return JsonConvert.SerializeObject(Tender.MechanicalSeal(), Newtonsoft.Json.Formatting.Indented);
    }
    public string BearingFrameSize()
    {
        return JsonConvert.SerializeObject(Tender.BearingFrameSize(), Newtonsoft.Json.Formatting.Indented);
    }
    public string ShaftSealDiameter()
    {
        return JsonConvert.SerializeObject(Tender.ShaftSealDiameter(), Newtonsoft.Json.Formatting.Indented);
    }
    public string MechanicalSealVendor()
    {
        return JsonConvert.SerializeObject(Tender.MechanicalSealVendor(), Newtonsoft.Json.Formatting.Indented);
    }

    public string SealSystemPlan()
    {
        return JsonConvert.SerializeObject(Tender.SealSystemPlan(), Newtonsoft.Json.Formatting.Indented);
    }
    public string PipeorTube()
    {
        return JsonConvert.SerializeObject(Tender.PipeorTube(), Newtonsoft.Json.Formatting.Indented);
    }
    public string ReturnStatus()
    {
        string TenderId = _context.Request["TenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.ReturnStatus(TenderId), Newtonsoft.Json.Formatting.Indented);
    }
    public string SealSystemVendor()
    {
        return JsonConvert.SerializeObject(Tender.SealSystemVendor(), Newtonsoft.Json.Formatting.Indented);
    }
    public string Material()
    {
        return JsonConvert.SerializeObject(Tender.Material(), Newtonsoft.Json.Formatting.Indented);
    }
    public string IsolatorVenders()
    {
        return JsonConvert.SerializeObject(Tender.IsolatorVenders(), Newtonsoft.Json.Formatting.Indented);
    }
    public string AllocateTenderToRole()
    {
        string tenderId = _context.Request["TenderUniqueId"];
        string message = _context.Request["Message"];
        string newTenderId = _context.Request["NewTenderId"];
        string username = _context.Request["Username"];
        int userrole = Convert.ToInt32(_context.Request["UserRole"]);
        string sender = _context.Request["Sender"];
        string location = _context.Request["Location"];
        bool markasread = false;
        string AssiGnBy = _context.Request["AssiGnBy"];
        string customer = _context.Request["Customer"];
        Tender.AllocateTender(tenderId, message, username, userrole, sender, location, markasread, customer, AssiGnBy, newTenderId);
        return "saved";
    }
    public string DeletePricingData()
    {
        string productId = _context.Request["ProductId"];
        string dataColumnId = _context.Request["DataColumnId"];
        string tenderUniqueId = _context.Request["TenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.deleteProductsForTender(tenderUniqueId, productId, dataColumnId), Newtonsoft.Json.Formatting.Indented);
    }
    public string GetPricingData()
    {
        string productId = _context.Request["ProductId"];
        string dataColumnId = _context.Request["dataId"];
        return JsonConvert.SerializeObject(Tender.GetPricingData(dataColumnId, productId), Newtonsoft.Json.Formatting.Indented);
    }

    private string GetOHXPricingData()
    {
        string TenderUniqueId = _context.Request["TenderUniqueId"],
            costCurrency = _context.Request["CostCurrency"],
            balancing = _context.Request["Balancing"],
            couplingVendor = _context.Request["CouplingVendor"],
            type = _context.Request["Type"],
            pperspeed = _context.Request["PowerPerSpeed"],
            spacer = _context.Request["Spacer"],
            spacerlength = _context.Request["SpacerLength"],
            mle = _context.Request["MLE"],
            mechanicalSeal = _context.Request["MechanicalSeal"],
            bearingframesize = _context.Request["BearingFrameSize"],
            shaftSealDiameter = _context.Request["ShaftSealDiameter"],
            mechanicalSealVendor = _context.Request["MechanicalSealVendor"],
            plan = _context.Request["Plan"],
            pipeTube = _context.Request["PipeTube"],
            sealSystemVendor = _context.Request["SealSystemVendor"],
            material = _context.Request["Material"],
            vendor = _context.Request["Vendor"];
        return JsonConvert.SerializeObject(Tender.GetOHXPricing(TenderUniqueId, costCurrency, balancing, couplingVendor, type, pperspeed, spacer, spacerlength, mle, mechanicalSeal, bearingframesize, shaftSealDiameter, mechanicalSealVendor, plan, pipeTube, sealSystemVendor, material, vendor), Newtonsoft.Json.Formatting.Indented);
    }


    public string UpdateStatusManual()
    {
        string tenderId = _context.Request["TenderUniqueId"];
        string message = _context.Request["Message"];
        string username = _context.Request["Username"];
        string Status = _context.Request["Status"];
        Tender.ManualStatus(tenderId, message, username, Status);
        return "saved";
    }

    public string ACTIVETENDERDOCUMENTS()
    {
        string TenderUniqueId = _context.Request["TenderUniqueId"];
        try
        {

            if (clsCustomerInformation.ActiveCustomerDetails(TenderUniqueId))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    #region Filter Logic

    public string GetDistinctColumnValues()
    {
        string columnValues = _context.Request["ColumnValues"];
        List<ChartData> cd = new List<ChartData>();
        var chartData = Charts.GetDistinctColumnValues(columnValues);

        return JsonConvert.SerializeObject(Charts.GetDistinctColumnValues(columnValues), Newtonsoft.Json.Formatting.Indented);
    }

    public string FilterTenderData()
    {
        List<Sunburst> sunburstChartData = new List<Sunburst>();
        string whereClause = "";

        //All the chart data counts based on filter
        List<FilteredData> chartData = new List<FilteredData>();

        //Filter order list
        List<FilterSeries> filterSeries = new List<FilterSeries>();

        //Temp chart base data list
        List<FilteredData> baseChartData = new List<FilteredData>();

        //Check whether another level exists
        bool CheckExistingData = Convert.ToBoolean(_context.Request["CheckExistingData"]);
        bool flag = true;
        if (CheckExistingData)
        {
            /*-------- Parent child logic starts ----------*/
            //If parents exists brings all the data according to the filter series
            chartData = JsonConvert.DeserializeObject<List<FilteredData>>(_context.Request["ExistingChartData"]);
            //Stores the data order to be filtered
            filterSeries = JsonConvert.DeserializeObject<List<FilterSeries>>(_context.Request["FilterSeries"]);


            //string parent = k"";
            whereClause = "";
            for (int i = 0; i < chartData.Count; i++)
            {
                string firstFilterId = chartData[0].FilterId;
                string currentFilterId = chartData[i].FilterId;
                string currentSeriesId = chartData[i].SeriesNumber;
                for (int j = 0; j < chartData.Count; j++)
                {
                    if (Convert.ToInt32(currentSeriesId) < Convert.ToInt32(chartData[j].SeriesNumber))
                    {
                        if (Convert.ToInt32(chartData[j].SeriesNumber) > 0)
                        {
                            if (Convert.ToInt32(currentSeriesId) == Convert.ToInt32(chartData[j].SeriesNumber) - 1)
                            {


                                if (chartData[i].ParameterValue.ToLower() == "false" || chartData[i].ParameterValue.ToLower() == "true")
                                    whereClause = (chartData[i].ParameterValue.ToLower() == "false") ? "where " + chartData[i].ParameterName + "=0" : "where " + chartData[i].ParameterName + "=1";
                                else
                                    whereClause = "where " + chartData[i].ParameterName + "='" + chartData[i].ParameterValue + "'";
                                if (chartData[j].ParameterValue.ToLower() == "false" || chartData[j].ParameterValue.ToLower() == "true")
                                    whereClause = (chartData[j].ParameterValue.ToLower() == "false") ? " and " + chartData[j].ParameterName + "=0" : "where " + chartData[j].ParameterName + "=1";
                                else
                                    whereClause += " and " + chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "'";
                                DataTable dt = new DataTable();
                                string ColumnNames = chartData[j].ParameterName + " as Name, COUNT(" + chartData[j].ParameterName + ") as Value";
                                dt = Charts.GetTenderCount(ColumnNames, whereClause, "group by " + chartData[j].ParameterName);
                                foreach (DataRow dr in dt.Rows)
                                {

                                    Sunburst sunburstChart = new Sunburst();
                                    switch (chartData[j].FilterId)
                                    {
                                        case "1":
                                            sunburstChart.Id = chartData[j].ParameterValue.ToLower();
                                            sunburstChart.Name = (chartData[j].ParameterValue.ToLower() == "true") ? "Firm Tender" : "Budget Tender";
                                            sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
                                            switch (chartData[i].FilterId)
                                            {
                                                case "3":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "inprogress";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "win";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "loss";
                                                    }
                                                    break;
                                                case "6":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "sales";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "tendermanager";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "tenderengineer";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "4")
                                                    {
                                                        sunburstChart.Parent = "admin";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "5")
                                                    {
                                                        sunburstChart.Parent = "salesmanager";
                                                    }
                                                    else
                                                    {
                                                        sunburstChart.Parent = "viewer";
                                                    }
                                                    break;
                                                default:
                                                    sunburstChart.Parent = chartData[i].ParameterValue.ToLower();
                                                    break;
                                            }
                                            break;
                                        case "3":
                                            //switch (chartData[j].FilterId)
                                            //{
                                            //    case "3":
                                            if (chartData[j].ParameterValue == "1")
                                            {
                                                sunburstChart.Id = "inprogress";
                                                sunburstChart.Name = "In progress";
                                            }
                                            if (chartData[j].ParameterValue == "2")
                                            {
                                                sunburstChart.Id = "win";
                                                sunburstChart.Name = "Win";
                                            }
                                            if (chartData[j].ParameterValue == "3")
                                            {
                                                sunburstChart.Id = "loss";
                                                sunburstChart.Name = "Loss";
                                            }
                                            //    break;
                                            //case "6":
                                            //    if (chartData[j].ParameterValue == "1")
                                            //    {
                                            //        sunburstChart.Id = "sales";
                                            //        sunburstChart.Name = "Sales";
                                            //    }
                                            //    if (chartData[j].ParameterValue == "2")
                                            //    {
                                            //        sunburstChart.Id = "tendermanager";
                                            //        sunburstChart.Name = "Tender manager";
                                            //    }
                                            //    if (chartData[j].ParameterValue == "3")
                                            //    {
                                            //        sunburstChart.Id = "tenderengineer";
                                            //        sunburstChart.Name = "tender engineer";
                                            //    }
                                            //    if (chartData[j].ParameterValue == "4")
                                            //    {
                                            //        sunburstChart.Id = "admin";
                                            //        sunburstChart.Name = "Admin";
                                            //    }
                                            //    if (chartData[j].ParameterValue == "5")
                                            //    {
                                            //        sunburstChart.Id = "salesmanager";
                                            //        sunburstChart.Name = "Sales manager";
                                            //    }
                                            //    if (chartData[j].ParameterValue == "6")
                                            //    {
                                            //        sunburstChart.Id = "viewer";
                                            //        sunburstChart.Name = "Viewer";
                                            //    }
                                            //    break;
                                            //}
                                            sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
                                            switch (chartData[i].FilterId)
                                            {
                                                case "3":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "inprogress";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "win";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "loss";
                                                    }
                                                    break;
                                                case "6":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "sales";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "tendermanager";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "tenderengineer";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "4")
                                                    {
                                                        sunburstChart.Parent = "admin";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "5")
                                                    {
                                                        sunburstChart.Parent = "salesmanager";
                                                    }
                                                    else
                                                    {
                                                        sunburstChart.Parent = "viewer";
                                                    }
                                                    break;
                                                default:
                                                    sunburstChart.Parent = chartData[i].ParameterValue.ToLower();
                                                    break;
                                            }
                                            break;
                                        case "6":
                                            //switch (chartData[j].FilterId)
                                            //{
                                            //case "3":
                                            //    if (chartData[j].ParameterValue == "1")
                                            //    {
                                            //        sunburstChart.Id = "inprogress";
                                            //        sunburstChart.Name = "In progress";
                                            //    }
                                            //    if (chartData[j].ParameterValue == "2")
                                            //    {
                                            //        sunburstChart.Id = "win";
                                            //        sunburstChart.Name = "Win";
                                            //    }
                                            //    if (chartData[j].ParameterValue == "3")
                                            //    {
                                            //        sunburstChart.Id = "loss";
                                            //        sunburstChart.Name = "Loss";
                                            //    }
                                            //    break;
                                            //case "6":
                                            if (chartData[j].ParameterValue == "1")
                                            {
                                                sunburstChart.Id = "sales";
                                                sunburstChart.Name = "Sales";
                                            }
                                            if (chartData[j].ParameterValue == "2")
                                            {
                                                sunburstChart.Id = "tendermanager";
                                                sunburstChart.Name = "Tender manager";
                                            }
                                            if (chartData[j].ParameterValue == "3")
                                            {
                                                sunburstChart.Id = "tenderengineer";
                                                sunburstChart.Name = "tender engineer";
                                            }
                                            if (chartData[j].ParameterValue == "4")
                                            {
                                                sunburstChart.Id = "admin";
                                                sunburstChart.Name = "Admin";
                                            }
                                            if (chartData[j].ParameterValue == "5")
                                            {
                                                sunburstChart.Id = "salesmanager";
                                                sunburstChart.Name = "Sales manager";
                                            }
                                            if (chartData[j].ParameterValue == "6")
                                            {
                                                sunburstChart.Id = "viewer";
                                                sunburstChart.Name = "Viewer";
                                            }
                                            //        break;
                                            //}
                                            sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
                                            switch (chartData[i].FilterId)
                                            {
                                                case "3":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "inprogress";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "win";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "loss";
                                                    }
                                                    break;
                                                case "6":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "sales";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "tendermanager";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "tenderengineer";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "4")
                                                    {
                                                        sunburstChart.Parent = "admin";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "5")
                                                    {
                                                        sunburstChart.Parent = "salesmanager";
                                                    }
                                                    else
                                                    {
                                                        sunburstChart.Parent = "viewer";
                                                    }
                                                    break;
                                                default:
                                                    sunburstChart.Parent = chartData[i].ParameterValue.ToLower();
                                                    break;
                                            }
                                            break;
                                        default:
                                            sunburstChart.Id = chartData[j].ParameterValue.ToLower();
                                            sunburstChart.Name = chartData[j].ParameterValue.ToLower();
                                            sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
                                            switch (chartData[i].FilterId)
                                            {
                                                case "3":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "inprogress";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "win";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "loss";
                                                    }
                                                    break;
                                                case "6":
                                                    if (chartData[i].ParameterValue.ToLower() == "1")
                                                    {
                                                        sunburstChart.Parent = "sales";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "2")
                                                    {
                                                        sunburstChart.Parent = "tendermanager";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "3")
                                                    {
                                                        sunburstChart.Parent = "tenderengineer";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "4")
                                                    {
                                                        sunburstChart.Parent = "admin";
                                                    }
                                                    else if (chartData[i].ParameterValue.ToLower() == "5")
                                                    {
                                                        sunburstChart.Parent = "salesmanager";
                                                    }
                                                    else
                                                    {
                                                        sunburstChart.Parent = "viewer";
                                                    }
                                                    break;
                                                default:
                                                    sunburstChart.Parent = chartData[i].ParameterValue.ToLower();
                                                    break;
                                            }
                                            break;
                                    }



                                    sunburstChartData.Add(sunburstChart);
                                }
                            }
                        }


                    }
                    else if (Convert.ToInt32(currentSeriesId) == Convert.ToInt32(chartData[j].SeriesNumber))
                    {
                        if (flag)
                        {
                            if (currentFilterId == firstFilterId)
                            {
                                whereClause = "";
                                DataTable dt = new DataTable();
                                string ColumnNames = chartData[i].ParameterName + " as Name, COUNT(" + chartData[i].ParameterName + ") as Value";
                                dt = Charts.GetTenderCount(ColumnNames, whereClause, "group by " + chartData[i].ParameterName);
                                foreach (DataRow dr in dt.Rows)
                                {
                                    Sunburst sunburstChart = new Sunburst();
                                    sunburstChart.Id = dr["Name"].ToString().ToLower();
                                    if (chartData[j].FilterId == "1")
                                    {
                                        sunburstChart.Name = (dr["Name"].ToString().ToLower() == "true") ? "Firm Tender" : "Budget Tender";
                                    }
                                    else
                                    {

                                        sunburstChart.Name = dr["Name"].ToString().ToLower();
                                    }
                                    sunburstChart.Parent = "0";
                                    sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
                                    sunburstChartData.Add(sunburstChart);
                                }
                            }
                            else
                            {
                                whereClause = "";
                                DataTable dt = new DataTable();
                                string ColumnNames = chartData[i].ParameterName + " as Name, COUNT(" + chartData[i].ParameterName + ") as Value";
                                dt = Charts.GetTenderCount(ColumnNames, whereClause, "group by " + chartData[i].ParameterName);
                                foreach (DataRow dr in dt.Rows)
                                {
                                    Sunburst sunburstChart = new Sunburst();
                                    sunburstChart.Id = dr["Name"].ToString().ToLower();
                                    if (chartData[j].FilterId == "1")
                                    {
                                        sunburstChart.Name = (dr["Name"].ToString().ToLower() == "true") ? "Firm Tender" : "Budget Tender";
                                    }
                                    else
                                    {

                                        sunburstChart.Name = dr["Name"].ToString().ToLower();
                                    }
                                    sunburstChart.Parent = chartData[i].ParameterName.ToLower();
                                    sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
                                    sunburstChartData.Add(sunburstChart);
                                }
                            }
                            flag = false;
                        }


                    }
                }

            }


        }
        else
        {
            filterSeries = JsonConvert.DeserializeObject<List<FilterSeries>>(_context.Request["FilterSeries"]);
            whereClause = "";
            for (int i = 0; i <= chartData.Count; i++)
            {


                DataTable dt = new DataTable();
                string ColumnNames = filterSeries[i].FilterType + " as Name, COUNT(" + filterSeries[i].FilterType + ") as Value";
                dt = Charts.GetTenderCount(ColumnNames, whereClause, "group by " + filterSeries[i].FilterType);
                foreach (DataRow dr in dt.Rows)
                {
                    Sunburst sunburstChart = new Sunburst();
                    sunburstChart.Id = dr["Name"].ToString();
                    if (filterSeries[i].FilterId == "1")
                    {
                        sunburstChart.Name = (dr["Name"].ToString().ToLower() == "true") ? "Firm Tender" : "Budget Tender";
                    }
                    else
                    {

                        sunburstChart.Name = dr["Name"].ToString();
                    }
                    sunburstChart.Parent = "0";
                    sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
                    sunburstChartData.Add(sunburstChart);
                }


            }



        }
        return JsonConvert.SerializeObject(sunburstChartData, Newtonsoft.Json.Formatting.Indented);


        //for (int i = 0; i < filterSeries.Count; i++)
        //{
        //    if (i > 0)
        //    {
        //        for (int j = 0; j < chartData.Count; j++)
        //        {
        //            if (j == 0)
        //            {
        //                if (chartData[j].ParameterValue == "false" || chartData[j].ParameterValue == "true") {
        //                    whereClause += (chartData[j].ParameterValue == "true") ? "where " + chartData[j].ParameterName + "=1": (chartData[j].ParameterValue == "false")?"where " + chartData[j].ParameterName + "=0": chartData[j].ParameterValue;
        //                    //whereClause += "where " + chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "''"; 
        //                }
        //                else
        //                    whereClause += "where " + chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "'";
        //            }
        //            else {
        //                if (!whereClause.Contains(chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "'")) {
        //                    whereClause += " ";
        //                    if (!whereClause.Contains(chartData[j].ParameterName))
        //                    {

        //                        if (chartData[j].ParameterValue == "false" || chartData[j].ParameterValue == "true")
        //                        {
        //                            if (chartData[j - 1].ParameterName == chartData[j].ParameterName)
        //                            {
        //                                whereClause = (chartData[j].ParameterValue == "true") ? "where " + chartData[j].ParameterName + "=1" : (chartData[j].ParameterValue == "false") ? "where " + chartData[j].ParameterName + "=0" : chartData[j].ParameterValue;
        //                            }
        //                            else
        //                            {
        //                                whereClause += (chartData[j].ParameterValue == "true") ? "and " + chartData[j].ParameterName + "=1" : (chartData[j].ParameterValue == "false") ? "and " + chartData[j].ParameterName + "=0" : chartData[j].ParameterValue;
        //                            }

        //                            //whereClause += "where " + chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "''"; 
        //                        }
        //                        else
        //                        {
        //                            if (chartData[j - 1].ParameterName != chartData[j].ParameterName)
        //                            {
        //                                whereClause += "and " + chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "'";
        //                            }
        //                            else {
        //                                whereClause += "where " + chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "'";
        //                            }

        //                        }

        //                        //whereClause += " and " + chartData[j].ParameterName + "='" + chartData[j].ParameterValue + "'";
        //                    }
        //                    //else {
        //                    //    whereClause += " ";
        //                    //} 
        //                }

        //            }
        //            DataTable dt1 = new DataTable();
        //            string ColumnNames1 = filterSeries[i].FilterType + " as Name, COUNT(" + filterSeries[i].FilterType + ") as Value";
        //            dt1 = Charts.GetTenderCount(ColumnNames1, whereClause, "group by " + filterSeries[i].FilterType);
        //            foreach (DataRow dr in dt1.Rows)
        //            {
        //                Sunburst sunburstChart = new Sunburst();
        //                sunburstChart.Id= dr["Name"].ToString();
        //                sunburstChart.Name = dr["Name"].ToString();
        //                if (j > 0) {
        //                    sunburstChart.Parent = chartData[j - 1].ParameterValue;
        //                }

        //                sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
        //                sunburstChartData.Add(sunburstChart);
        //            }

        //        }

        //    }
        //    //else
        //     //whereClause = "";
        //    //for (int j = 0; j < chartData.Count; j++)
        //    //{
        //        //DataTable dt = new DataTable();
        //        //string ColumnNames = filterSeries[i].FilterType + " as Name, COUNT(" + filterSeries[i].FilterType + ") as Value";
        //        //dt = Charts.GetTenderCount(ColumnNames, whereClause, "group by " + filterSeries[i].FilterType);
        //        //foreach (DataRow dr in dt.Rows)
        //        //{
        //        //    Sunburst sunburstChart = new Sunburst();
        //        //    sunburstChart.Id = dr["Name"].ToString();
        //        //    sunburstChart.Name = dr["Name"].ToString();
        //        //    sunburstChart.Parent = "0";
        //        //    sunburstChart.Value = Convert.ToInt32(dr["Value"].ToString());
        //        //    sunburstChartData.Add(sunburstChart);
        //        //}
        //    //}
        //}



    }
    #endregion
    #region Pricing Module
    public string GetFilterValues()
    {
        return JsonConvert.SerializeObject(Charts.GetChartFilter(), Newtonsoft.Json.Formatting.Indented);
    }

    public string ReadPricingData()
    {
        string filePath = _context.Server.MapPath("~/ExcelData/PricingSheet.xlsx");
        return JsonConvert.SerializeObject(EPPlus.EXCELDATALOAD(filePath, true), Newtonsoft.Json.Formatting.Indented);

    }
    public string MyActiveTenders()
    {
        string userName = _context.Request["Username"];
        return JsonConvert.SerializeObject(Tender.MyActiveTenders(userName), Newtonsoft.Json.Formatting.Indented);
    }
    public string CurrencyExchangeRate()
    {
        string countryCode = _context.Request["CountryCode"];
        return JsonConvert.SerializeObject(CurrencyMaster.CurrencyExchangeRate(countryCode), Newtonsoft.Json.Formatting.Indented);
    }
    public string MyOpenTenders()
    {
        string userName = _context.Request["Username"];
        return JsonConvert.SerializeObject(Tender.MyOpenTenders(userName), Newtonsoft.Json.Formatting.Indented);
    }
    public string AllTenders()
    {
        return JsonConvert.SerializeObject(Tender.AllTenders(), Newtonsoft.Json.Formatting.Indented);
    }
    public string BudgetTenders()
    {
        return JsonConvert.SerializeObject(Tender.BudgetTenders(), Newtonsoft.Json.Formatting.Indented);
    }
    public string FirmTenders()
    {
        return JsonConvert.SerializeObject(Tender.FirmTenders(), Newtonsoft.Json.Formatting.Indented);
    }
    public string SaveQuotation()
    {
        string tenderUniqueId = _context.Request["TenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.SaveQuotation(tenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    public string GetQuotation()
    {
        string tenderUniqueId = _context.Request["TenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.TenderQuotation(tenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    public string GetTenderDetails()
    {
        string tenderUniqueId = _context.Request["TenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.GetTenderDetails(tenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    public string GetTender()
    {
        string tenderUniqueId = _context.Request["TenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.GetTender(tenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    public string ReturnProductPricingTableHeaders()
    {
        int productId = Convert.ToInt32(_context.Request["ProductId"]);
        //string tenderUniqueId = _context.Request["TenderUniqueId"];
        string tenderUniqueId = "DDCFEFE9-F9CC-E275-FD65-F80677B8D3EB";
        return JsonConvert.SerializeObject(Products.GetProductTableHeadings(productId, tenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    public string ReturnProductPricingData()
    {
        int productId = Convert.ToInt32(_context.Request["ProductId"]);
        string tenderUniqueId = _context.Request["TenderUniqueId"];
        // string tenderUniqueId = "DDCFEFE9-F9CC-E275-FD65-F80677B8D3EB";
        return JsonConvert.SerializeObject(Products.GetProductPricing(productId, tenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    public string ReturnProductsList()
    {
        return JsonConvert.SerializeObject(Products.GetProductsList(), Newtonsoft.Json.Formatting.Indented);
    }
    public string ReturnAllCurrencyCodes()
    {
        return JsonConvert.SerializeObject(CurrencyMaster.AllCurrencyCodes(), Newtonsoft.Json.Formatting.Indented);
    }
    public string ReturnCurrencyExchangeTable()
    {
        return JsonConvert.SerializeObject(CurrencyMaster.GetCurrencyExchangeTable(), Newtonsoft.Json.Formatting.Indented);
    }
    #endregion Pricing Module


    #region New Code
    //BUDGET TENDER IMPLEMENTATION
    public DataTable JsonStringToDataTable(string jsonString)
    {
        DataTable dt = new DataTable();
        string[] jsonStringArray = Regex.Split(jsonString.Replace("[", "").Replace("]", ""), "},{");
        List<string> ColumnsName = new List<string>();
        foreach (string jSA in jsonStringArray)
        {
            string[] jsonStringData = Regex.Split(jSA.Replace("{", "").Replace("}", ""), ",");
            foreach (string ColumnsNameData in jsonStringData)
            {
                try
                {
                    int idx = ColumnsNameData.IndexOf(":");
                    string ColumnsNameString = ColumnsNameData.Substring(0, idx - 1).Replace("\"", "");
                    if (!ColumnsName.Contains(ColumnsNameString))
                    {
                        ColumnsName.Add(ColumnsNameString);
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception(string.Format("Error Parsing Column Name : {0}", ColumnsNameData));
                }
            }
            break;
        }
        foreach (string AddColumnName in ColumnsName)
        {
            dt.Columns.Add(AddColumnName);
        }
        foreach (string jSA in jsonStringArray)
        {
            string[] RowData = Regex.Split(jSA.Replace("{", "").Replace("}", ""), ",");
            DataRow nr = dt.NewRow();
            foreach (string rowData in RowData)
            {
                try
                {
                    int idx = rowData.IndexOf(":");
                    string RowColumns = rowData.Substring(0, idx - 1).Replace("\"", "");
                    string RowDataString = rowData.Substring(idx + 1).Replace("\"", "");
                    nr[RowColumns] = RowDataString;
                }
                catch (Exception ex)
                {
                    continue;
                }
            }
            dt.Rows.Add(nr);
        }
        return dt;
    }

    //public static DataTable ToDataTable<T>(this IList<T> data)
    //{
    //    PropertyDescriptorCollection props =
    //    TypeDescriptor.GetProperties(typeof(T));
    //    DataTable table = new DataTable();
    //    for (int i = 0; i < props.Count; i++)
    //    {
    //        PropertyDescriptor prop = props[i];
    //        table.Columns.Add(prop.Name, prop.PropertyType);
    //    }
    //    object[] values = new object[props.Count];
    //    foreach (T item in data)
    //    {
    //        for (int i = 0; i < values.Length; i++)
    //        {
    //            values[i] = props[i].GetValue(item);
    //        }
    //        table.Rows.Add(values);
    //    }
    //    return table;
    //}

    public bool ExportToExcel()
    {
        string data = _context.Request["data"];

        var listTenders = JsonConvert.DeserializeObject<List<Tender>>(data);
        using (XLWorkbook wb = new XLWorkbook())
        {
            wb.Worksheets.Add(JsonStringToDataTable(data), "Tenders");

            _context.Response.Clear();
            _context.Response.Buffer = true;
            _context.Response.Charset = "";
            _context.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            _context.Response.AddHeader("content-disposition", "attachment;filename=SqlExport.xlsx");
            using (MemoryStream MyMemoryStream = new MemoryStream())
            {
                wb.SaveAs(MyMemoryStream);
                MyMemoryStream.WriteTo(_context.Response.OutputStream);
                _context.Response.Flush();
                _context.Response.End();
            }
        }
        //var workSheet = excel.Workbook.Worksheets.Add("Sheet1");
        //workSheet.Cells[1, 1].LoadFromCollection(data, true);
        ////var stream = new MemoryStream(excel.GetAsByteArray());
        ////excel.SaveAs(fi);
        //using (var memoryStream = new MemoryStream(excel.GetAsByteArray()))
        //{
        //    _context.Response.AddHeader("content-disposition", "attachment;filename=Tenders.xlsx");
        //    _context.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //    memoryStream.WriteTo(_context.Response.OutputStream);
        //    //_context.Response.Flush();
        //    //_context.Response.End();
        //} 
        return false;
    }
    public bool DoesTenderExists()
    {
        string TenderUniqueID = _context.Request["TenderUniqueId"];
        string tenderId = _context.Request["TenderId"];
        string itemId = _context.Request["ItemId"];
        string ProjectId = _context.Request["ProjectId"];
        TenderFactory factory = new ConcreteTenderFactory();
        factory.TenderId = _context.Request["TenderId"];
        factory.TenderUniqueId = _context.Request["TenderUniqueId"];
        factory.ItemId = _context.Request["ItemId"];
        IFactory budget = factory.GetTender("BudgetToCheck");
        return budget.CheckTenderExists(TenderUniqueID, tenderId, itemId,ProjectId);
    }

    //RETURN THE PROJECTID IF REQUIRED
    public string ReturnProjectId() {
        string locationcode = _context.Request["LocationCode"];
        string year = Convert.ToString(DateTime.Now.Year);
        return "RES_" + _context.Request["PumpType"] + "_" + GenerateProjectID(locationcode, year);
    }

    public string CreateBudGetTender()
    {
        try
        {
            var test = _context.Request["TenderType"];
            string locationcode = _context.Request["LocationCode"];
            //START FROM HERE
            string year = Convert.ToString(DateTime.Now.Year);
            TenderFactory factory = new ConcreteTenderFactory();
            factory.TenderId = _context.Request["TenderId"];
            factory.ProjectId = _context.Request["ProjectId"]; 
            factory.TenderUniqueId = _context.Request["TenderUniqueId"];
            factory.ItemId = _context.Request["ItemId"];
            factory.CustomerId = Convert.ToInt32(_context.Request["CustomerId"]);
            factory.TenderType = Convert.ToBoolean(_context.Request["TenderType"]);
            factory.RoleId = Convert.ToInt32(_context.Request["RoleId"]);
            factory.DateOfCreation = DateTime.Now;
            factory.CreatedBy = _context.Request["CreatedBy"];
            factory.ModifiedBy = _context.Request["ModifiedBy"];
            factory.ModifiedDate = DateTime.Now;
            factory.LocationId = Convert.ToInt32(_context.Request["LocationId"]);
            factory.LegalEntity = Convert.ToInt32(_context.Request["LegalEntity"]);
            factory.Cost = _context.Request["Cost"];
            factory.Currency = _context.Request["Currency"];
            factory.Discount = _context.Request["Discount"];
            factory.CreatedById = _context.Request["CreadtedById"];
            factory.ShowDiscountInDocument = Convert.ToBoolean(_context.Request["ShowDiscountInDocument"]);
            factory.EstimatedAwardDate = DateTime.Now;
            factory.IsAssignedBackByTenderingTeam = Convert.ToBoolean(_context.Request["IsAssignedBackByTenderingTeam"]);
            factory.ParentTenderUniqueId = _context.Request["ParentTenderUniqueId"];
            factory.ProjectNumber = _context.Request["ProjectNumber"];
            IFactory budget = factory.GetTender("Budget");


            return budget.CreateTenderSaveFullTenderDetails();
        }
        catch (Exception ex)
        {
            return "failed due to: " + ex;
        }

    }

    public bool CreateMajorVersion() {
        try
        {
            int TenderType = Convert.ToInt32(_context.Request["TenderType"]);
            string TenderUniqueId = _context.Request["TenderUniqueId"];
            string TenderToBeCopied = _context.Request["TenderToBeCopied"];
            string UserRole = _context.Request["UserRole"];
            string CreatedByName = _context.Request["CreatedByName"];
            string CreatedById = _context.Request["CreatedById"];
            return Tender.CreateMajorVersion(TenderType, TenderUniqueId, TenderToBeCopied, UserRole, CreatedByName, CreatedById);
        }
        catch (Exception ex) {
            return false;
        }
        
    }

    public string CreateFirmTender()
    {
        try
        {
            var test = _context.Request["TenderType"];
            string locationcode = _context.Request["LocationCode"];
            //START FROM HERE
            string year = Convert.ToString(DateTime.Now.Year);
            TenderFactory factory = new ConcreteTenderFactory();
            factory.TenderId = _context.Request["TenderId"];
            factory.ProjectId = _context.Request["ProjectId"];
            factory.TenderUniqueId = _context.Request["TenderUniqueId"];
            factory.ItemId = _context.Request["ItemId"];
            factory.CustomerId = Convert.ToInt32(_context.Request["CustomerId"]);
            factory.TenderType = Convert.ToBoolean(_context.Request["TenderType"]);
            factory.RoleId = Convert.ToInt32(_context.Request["RoleId"]);
            factory.DateOfCreation = DateTime.Now;
            factory.CreatedBy = _context.Request["CreatedBy"];
            factory.ModifiedBy = _context.Request["ModifiedBy"];
            factory.ModifiedDate = DateTime.Now;
            factory.LocationId = Convert.ToInt32(_context.Request["LocationId"]);
            factory.LegalEntity = Convert.ToInt32(_context.Request["LegalEntity"]);
            factory.Cost = _context.Request["Cost"];
            factory.Currency = _context.Request["Currency"];
            factory.Discount = _context.Request["Discount"];
            factory.CreatedById = _context.Request["CreadtedById"];
            factory.ShowDiscountInDocument = Convert.ToBoolean(_context.Request["ShowDiscountInDocument"]);
            factory.EstimatedAwardDate = DateTime.Now;
            factory.IsAssignedBackByTenderingTeam = Convert.ToBoolean(_context.Request["IsAssignedBackByTenderingTeam"]);
            factory.ParentTenderUniqueId = _context.Request["ParentTenderUniqueId"];
            factory.ProjectNumber = "";
            IFactory budget = factory.GetTender("Budget");


            return budget.CreateTenderSaveFullTenderDetails();
        }
        catch (Exception ex)
        {
            return "failed due to: " + ex;
        }

    }

    public bool SaveBudgetTenderDetails()
    {
        try
        {
            string Tenders = _context.Request["data"];
            var listTenders = JsonConvert.DeserializeObject<List<TenderDetails>>(Tenders);


            foreach (var i in listTenders)
            {
                TenderFactory tfactory = new ConcreteTenderFactory();
                tfactory.TenderUniqueId = i.TenderUniqueId;
                tfactory.ParameterName = i.ParameterName;
                tfactory.ParameterValue = i.ParameterValue;
                tfactory.ParameterIdentity = i.ParameterIdentity;
                var budget = tfactory.GetTender("BudgetDetails");
                budget.SaveTenderDetails();

            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }


    }



    public string GenerateProjectID(string locationcode, string year)
    {
        TenderFactory factory = new ConcreteTenderFactory();
        IFactory budget = factory.GetTender("Budget");
        return budget.GetLatestProjectId(locationcode, year);
    }

    //FIRM TENDER IMPLEMENTATION

    public string GetLocationCodeFromLocation()
    {
        string location = _context.Request["name"];
        return JsonConvert.SerializeObject(LocationsDAO.GetLocationCodeFromLocationId(location), Newtonsoft.Json.Formatting.Indented);
    }

    public string MakeARevisedVersion()
    {
        string NewTenderId = _context.Request["NewTenderId"];
        string TenderIdToBeCopied = _context.Request["TenderIdToBeCopied"];
        return JsonConvert.SerializeObject(Tender.MakeARevisedTenderVersion(TenderIdToBeCopied,NewTenderId), Newtonsoft.Json.Formatting.Indented);
    }

    public string GetLatestProjectId()
    {
        return JsonConvert.SerializeObject(Tender.GetLatestProjectId(), Newtonsoft.Json.Formatting.Indented);
    }


    public string ConvertToPDFfromHTMLOld()
    {
        DataTable dtUser = new DataTable();
        //dttbl = clsCustomerInformation.getCustomerInformation("tblCustomerInformation", _context.Request["CustomerId"]);
        dtUser = clsCustomerInformation.GetUserProfileDetails(_context.Request["UserNameLogin"].Trim());
        //dtUser = clsCustomerInformation.GetUserProfileDetails(_context.Request["UserName"].Trim());

        var tenderId = _context.Request["TenderId"];
        var projectId = _context.Request["ProjectId"];
        var erpId = _context.Request["ERPId"];
        var UserName = _context.Request["UserName"];
        var Location = _context.Request["Location"];
        var Role = _context.Request["Role"];
        var Customer = _context.Request["Customer"];
        var title = _context.Request["Title"];
        var contact = _context.Request["Contact"];
        var Street = _context.Request["Street"];
        var postalCode = _context.Request["PostalCode"];
        var country = _context.Request["Country"];
        var CustomersReference = _context.Request["CustomersReference"];
        var BudgetPrice = _context.Request["Price"];
        var TenderEngineer2_Email = "";
        if (dtUser.Rows.Count > 0)
        {
            TenderEngineer2_Email = dtUser.Rows[0]["EmailAddress"].ToString();
        }
        var TenderEngineer2_Phone = "";
        if (dtUser.Rows.Count > 0)
        {
            TenderEngineer2_Phone = dtUser.Rows[0]["PhoneNumber"].ToString();
        }
        var Material_Class = _context.Request["Material_Class"];
        var Shaft_Seal_Diameter_1 = _context.Request["Shaft_Seal_Diameter_1"];
        var ItemId = _context.Request["ItemId"];
        var Shaft_Seal_Diameter = "";
        var ProjectDescription = _context.Request["PreojectDescription"];
        if (Shaft_Seal_Diameter_1 == "US-Units")
        {
            Shaft_Seal_Diameter = _context.Request["Shaft_Seal_Diameter"] + "in";
        }
        else
        {
            Shaft_Seal_Diameter = _context.Request["Shaft_Seal_Diameter"] + "mm";
        }

        var Bearing_Frame_Size = _context.Request["Bearing_Frame_Size"];
        var Bearing_Isolator_Vendor = _context.Request["Bearing_Isolator_Vendor"];
        var Price = _context.Request["Price"];
        var Validity_Offer = _context.Request["Validity_Offer"];
        var SiteMeasurement = _context.Request["SiteMeasurement"];
        if (SiteMeasurement == "yes")
        {
            SiteMeasurement = "1 off measurement of the existing pump. To customize the OHX Upgrade Kit to the existing pump volute casing and impeller, the dimensional data of the existing pump unit needs to be taken. \n \n \n";
        }
        else
        {
            SiteMeasurement = "";
        }

        var NACEcomplianceonlyUpgradeKit = _context.Request["NACEcomplianceonlyUpgradeKit"];
        if (NACEcomplianceonlyUpgradeKit == "yes")
        {
            NACEcomplianceonlyUpgradeKit = "1 off NACE conformity for the materials is limited to the scope of this quotation. Support for complete pump of NACE conformity can be given upon request. \n \n";
        }
        else
        {
            NACEcomplianceonlyUpgradeKit = "";
        }

        var ATEXRequiredonlyUpgradeKit = _context.Request["ATEXRequiredonlyUpgradeKit"];
        if (ATEXRequiredonlyUpgradeKit == "yes")
        {
            ATEXRequiredonlyUpgradeKit = "1 off ATEX certification for the OHX Upgrade Kit. Support for complete pump ATEX certification can be given upon request. \n \n";
        }
        else
        {
            ATEXRequiredonlyUpgradeKit = "";
        }

        var Suppliedby = _context.Request["Suppliedby"];
        var Material = _context.Request["Material"];
        var B06_Coupling_Guard = "";
        if (Suppliedby.ToUpper() == "SULZER")
        {
            Suppliedby = "\nKey Features: \n • Ambient temperature: -50°C... + 55°C \n • Material: " + Material + " \n • Non-sparking design \n • Allowable access dimensions and openings as per ISO 14120, EN 953 or ANSI/ AMT 815.1. \n • Non painted \n • Without window ---IMAGE--- \n \n";
            B06_Coupling_Guard = "1 off coupling guard which is mounted on to the pump’s bearing housing by 4 hexagon screws. On the opposite (motor) side the coupling guard has a flexible extension whose position is being adapted towards the driver.\n";
        }
        else
        {
            Suppliedby = "";
        }
        var Currency = _context.Request["Currency"];
        var LeadTime = _context.Request["LeadTime"];

        try
        {

            string templatePath = _context.Server.MapPath("~/tenderTemplate") + "/Test.dotm";
            //sb.Append("Directory Create 0\n");
            string filePath = _context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId + "/tender-" + projectId + tenderId + "_" + ItemId + ".pdf");
            //sb.Append("Directory Create 1\n");
            System.IO.Directory.CreateDirectory(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId));
            //sb.Append("Directory Create 2\n");
            //System.IO.Directory.CreateDirectory("C:/Temp/TenderDocuments/" + projectId + tenderId + erpId);

            System.IO.File.Copy(templatePath, _context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId) + "/tender-" + projectId + tenderId + "_" + ItemId + ".pdf" + ".dotm");
            //sb.Append("Directory Create 3\n");

            //sb.Append("Directory Create -3\n");
            Microsoft.Office.Interop.Word.Application myWord;
            //sb.Append("Directory Create -2\n");
            myWord = new Microsoft.Office.Interop.Word.Application();
            //sb.Append("Directory Create -1\n");

            Microsoft.Office.Interop.Word.Document objDoc = myWord.Documents.Open(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId) + "/tender-" + projectId + tenderId + "_" + ItemId + ".pdf" + ".dotm");
            //sb.Append("Directory Create 4\n");
            objDoc.Bookmarks["TenderId_Field"].Range.Text = tenderId;
            objDoc.Bookmarks["Customer_Contact_Company"].Range.Text = Customer;
            objDoc.Bookmarks["Customer_Contact_Name1"].Range.Text = title.Trim() + "." + UserName;
            objDoc.Bookmarks["Customer_Contact_Street"].Range.Text = Street;
            objDoc.Bookmarks["Customer_Contact_City"].Range.Text = postalCode;
            objDoc.Bookmarks["Customer_Contact_Country"].Range.Text = country;
            objDoc.Bookmarks["TenderEngineer1_Name"].Range.Text = UserName;
            objDoc.Bookmarks["TenderEngineer2_Position"].Range.Text = Role;
            objDoc.Bookmarks["TenderEngineer2_Phone"].Range.Text = TenderEngineer2_Phone;
            objDoc.Bookmarks["TenderEngineer2_Email"].Range.Text = TenderEngineer2_Email;
            objDoc.Bookmarks["Project"].Range.Text = ProjectDescription;
            objDoc.Bookmarks["Customersreference"].Range.Text = CustomersReference;
            objDoc.Bookmarks["Sulzerreference"].Range.Text = "------";
            objDoc.Bookmarks["Customer_Contact_Gender"].Range.Text = title;
            objDoc.Bookmarks["Customer_Contact_Name"].Range.Text = contact;
            objDoc.Bookmarks["TenderEngineer2_Name"].Range.Text = UserName;
            //objDoc.Bookmarks["TenderEngineer2_Position"].Range.Text = "------";
            objDoc.Bookmarks["Material_Class"].Range.Text = Material_Class;
            objDoc.Bookmarks["Certificate_Casing_cover"].Range.Text = "------";
            objDoc.Bookmarks["Certificate_Impeller_Stationary_Ring"].Range.Text = "------";
            objDoc.Bookmarks["Certificate_Bearing_Housing"].Range.Text = "------";
            objDoc.Bookmarks["Certificate_Shaft"].Range.Text = "------";
            objDoc.Bookmarks["Shaft_Seal_Diameter"].Range.Text = Shaft_Seal_Diameter;
            objDoc.Bookmarks["Bearing_Frame_Size"].Range.Text = Bearing_Frame_Size;
            objDoc.Bookmarks["Bearing_Isolator_Vendor"].Range.Text = Bearing_Isolator_Vendor;
            objDoc.Bookmarks["Price"].Range.Text = Price;
            objDoc.Bookmarks["Currency"].Range.Text = Currency;
            objDoc.Bookmarks["Delivery_Time"].Range.Text = LeadTime + " weeks";
            objDoc.Bookmarks["Validity_Offer"].Range.Text = Validity_Offer;
            objDoc.Bookmarks["Delivery_Time1"].Range.Text = LeadTime + " weeks";
            objDoc.Bookmarks["B01_Site_Measurement"].Range.Text = SiteMeasurement;
            objDoc.Bookmarks["B02_NACE"].Range.Text = NACEcomplianceonlyUpgradeKit;
            objDoc.Bookmarks["B03_ATEX"].Range.Text = ATEXRequiredonlyUpgradeKit;
            objDoc.Bookmarks["B04_Coupling_Guard1"].Range.Text = Suppliedby;
            objDoc.Bookmarks["B06_Coupling_Guard"].Range.Text = B06_Coupling_Guard;

            objDoc.SaveAs2(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId) + "/tender-" + projectId + tenderId + "_" + ItemId + ".pdf", Microsoft.Office.Interop.Word.WdSaveFormat.wdFormatPDF);
            //sb.Append("Directory Create 6\n");
            objDoc.Close(false);
            myWord.Quit(false);
            System.IO.File.Delete(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId) + "/tender-" + projectId + tenderId + "_" + ItemId + ".pdf" + ".dotm");
            //sb.Append("Directory Create 7\n");
            return "TenderDocuments/" + projectId + tenderId + "/tender-" + projectId + tenderId + "_" + ItemId + ".pdf";

        }
        catch (Exception ex)
        {
            //sb.Append(ex.Message.ToString());
            return "";
        }
        finally
        {
            // File.AppendAllText("C:/temp/TenderDocuments/" + "log.txt", sb.ToString());
        }
        return "";
    }

    public string ConvertToPDFfromHTML()
    {
        DataTable dtUser = new DataTable();
        //dttbl = clsCustomerInformation.getCustomerInformation("tblCustomerInformation", _context.Request["CustomerId"]);
        dtUser = clsCustomerInformation.GetUserProfileDetails(_context.Request["UserNameLogin"].Trim());
        //dtUser = clsCustomerInformation.GetUserProfileDetails(_context.Request["UserName"].Trim());

        var tenderId = _context.Request["TenderId"];
        var projectId = _context.Request["ProjectId"];
        var erpId = _context.Request["ERPId"];
        var UserName = _context.Request["UserName"];
        var Location = _context.Request["Location"];
        var Role = _context.Request["Role"];
        var Customer = _context.Request["Customer"];
        var title = _context.Request["Title"];
        var contact = _context.Request["Contact"];
        var Street = _context.Request["Street"];
        var postalCode = _context.Request["PostalCode"];
        var country = _context.Request["Country"];
        var CustomersReference = _context.Request["CustomersReference"];
        var BudgetPrice = _context.Request["Price"];
        var TenderEngineer2_Email = "";
        if (dtUser.Rows.Count > 0)
        {
            TenderEngineer2_Email = dtUser.Rows[0]["EmailAddress"].ToString();
        }
        var TenderEngineer2_Phone = "";
        if (dtUser.Rows.Count > 0)
        {
            TenderEngineer2_Phone = dtUser.Rows[0]["PhoneNumber"].ToString();
        }
        var Material_Class = _context.Request["Material_Class"];
        var Shaft_Seal_Diameter_1 = _context.Request["Shaft_Seal_Diameter_1"];
        var ItemId = _context.Request["ItemId"];
        var Shaft_Seal_Diameter = "";
        var ProjectDescription = _context.Request["PreojectDescription"];
        if (Shaft_Seal_Diameter_1 == "US-Units")
        {
            Shaft_Seal_Diameter = _context.Request["Shaft_Seal_Diameter"] + "in";
        }
        else
        {
            Shaft_Seal_Diameter = _context.Request["Shaft_Seal_Diameter"] + "mm";
        }

        var Bearing_Frame_Size = _context.Request["Bearing_Frame_Size"];
        var Bearing_Isolator_Vendor = _context.Request["Bearing_Isolator_Vendor"];
        var Price = _context.Request["Price"];
        var Validity_Offer = _context.Request["Validity_Offer"];
        var SiteMeasurement = _context.Request["SiteMeasurement"];
        if (SiteMeasurement == "yes")
        {
            SiteMeasurement = "1 off measurement of the existing pump. To customize the OHX Upgrade Kit to the existing pump volute casing and impeller, the dimensional data of the existing pump unit needs to be taken. \r\n \r\n \r\n";
        }
        else
        {
            SiteMeasurement = "";
        }

        var NACEcomplianceonlyUpgradeKit = _context.Request["NACEcomplianceonlyUpgradeKit"];
        if (NACEcomplianceonlyUpgradeKit == "yes")
        {
            NACEcomplianceonlyUpgradeKit = "1 off NACE conformity for the materials is limited to the scope of this quotation. Support for complete pump of NACE conformity can be given upon request. \r\n \r\n";
        }
        else
        {
            NACEcomplianceonlyUpgradeKit = "";
        }

        var ATEXRequiredonlyUpgradeKit = _context.Request["ATEXRequiredonlyUpgradeKit"];
        if (ATEXRequiredonlyUpgradeKit == "yes")
        {
            ATEXRequiredonlyUpgradeKit = "1 off ATEX certification for the OHX Upgrade Kit. Support for complete pump ATEX certification can be given upon request. \r\n \r\n";
        }
        else
        {
            ATEXRequiredonlyUpgradeKit = "";
        }

        var Suppliedby = _context.Request["Suppliedby"];
        var Material = _context.Request["Material"];
        var B06_Coupling_Guard = "";
        if (Suppliedby.ToUpper() == "SULZER")
        {
            Suppliedby = "\r\n Key Features: \r\n • Ambient temperature: -50°C... + 55°C \r\n • Material: " + Material + " \r\n • Non-sparking design \r\n • Allowable access dimensions and openings as per ISO 14120, EN 953 or ANSI/ AMT 815.1. \r\n • Non painted \r\n • Without window ---IMAGE--- \r\n \r\n";
            B06_Coupling_Guard = "1 off coupling guard which is mounted on to the pump’s bearing housing by 4 hexagon screws. On the opposite (motor) side the coupling guard has a flexible extension whose position is being adapted towards the driver.\r\n";
        }
        else
        {
            Suppliedby = "";
        }
        var Currency = _context.Request["Currency"];
        var LeadTime = _context.Request["LeadTime"];

        try
        {

            string templatePath = _context.Server.MapPath("~/tenderTemplate") + "/Test_1.docx";
            //sb.Append("Directory Create 0\n");
            string filePath = _context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId + "/tender-" + projectId + tenderId + "_" + ItemId + ".docx");
            //sb.Append("Directory Create 1\n");

            if (Directory.Exists(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId)))
            {
                Directory.Delete(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId), true);
            }

            System.IO.Directory.CreateDirectory(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId));
            //sb.Append("Directory Create 2\n");
            //System.IO.Directory.CreateDirectory("C:/Temp/TenderDocuments/" + projectId + tenderId + erpId);

            System.IO.File.Copy(templatePath, _context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId) + "/tender-" + projectId + tenderId + "_" + ItemId + ".docx");


            Dictionary<string, string> bookmarkData = new Dictionary<string, string>();
            bookmarkData.Add("TenderId_Field", tenderId.ToString());
            bookmarkData.Add("Customer_Contact_Company", Customer);
            bookmarkData.Add("Customer_Contact_Name1", Convert.ToString(title.Trim() + "." + UserName));
            bookmarkData.Add("Customer_Contact_Street", Street.ToString());
            bookmarkData.Add("Customer_Contact_City", postalCode.ToString());
            bookmarkData.Add("Customer_Contact_Country", country.ToString());
            bookmarkData.Add("TenderEngineer1_Name", UserName.ToString());
            bookmarkData.Add("TenderEngineer2_Position", Role.ToString());
            bookmarkData.Add("TenderEngineer2_Phone", TenderEngineer2_Phone.ToString());
            bookmarkData.Add("TenderEngineer2_Email", TenderEngineer2_Email.ToString());
            bookmarkData.Add("PROJECT", ProjectDescription.ToString());
            bookmarkData.Add("CUSTOMERSREFERENCE", CustomersReference.ToString());
            bookmarkData.Add("Sulzerreference", "------");
            bookmarkData.Add("Customer_Contact_Gender", title.ToString());
            bookmarkData.Add("Customer_Contact_Name", contact.ToString());
            bookmarkData.Add("TenderEngineer2_Name", UserName.ToString());
            //bookmarkData.Add("TenderEngineer2_Position", "------");
            bookmarkData.Add("Material_Class", Material_Class.ToString());
            bookmarkData.Add("Certificate_Casing_cover", "------");
            bookmarkData.Add("Certificate_Impeller_Stationary_Ring", "------");
            bookmarkData.Add("Certificate_Bearing_Housing", "------");
            bookmarkData.Add("Certificate_Shaft", "------");
            bookmarkData.Add("Shaft_Seal_Diameter", Shaft_Seal_Diameter.ToString());
            bookmarkData.Add("Bearing_Frame_Size", Bearing_Frame_Size.ToString());
            bookmarkData.Add("Bearing_Isolator_Vendor", Bearing_Isolator_Vendor.ToString());
            bookmarkData.Add("Price", Price.ToString());
            bookmarkData.Add("Currency", Currency.ToString());
            bookmarkData.Add("Delivery_Time", Convert.ToString(LeadTime + " weeks"));
            bookmarkData.Add("Validity_Offer", Validity_Offer.ToString());
            bookmarkData.Add("Delivery_Time1", Convert.ToString(LeadTime + " weeks"));
            bookmarkData.Add("B01_Site_Measurement", SiteMeasurement.ToString());
            bookmarkData.Add("B02_NACE", NACEcomplianceonlyUpgradeKit.ToString());
            bookmarkData.Add("B03_ATEX", ATEXRequiredonlyUpgradeKit.ToString());
            bookmarkData.Add("B04_Coupling_Guard1", Suppliedby.ToString());
            bookmarkData.Add("B06_Coupling_Guard", B06_Coupling_Guard.ToString());
            bookmarkData.Add("Not_in_Scope_Site_Measurement", "");
            bookmarkData.Add("Certification_Remark", "");


            string wordmlNamespace = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

            //Open the document as an Open XML package and extract the main document part.
            using (DocumentFormat.OpenXml.Packaging.WordprocessingDocument wordPackage = DocumentFormat.OpenXml.Packaging.WordprocessingDocument.Open(_context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId) + "/tender-" + projectId + tenderId + "_" + ItemId + ".docx", true))
            {
                DocumentFormat.OpenXml.Packaging.MainDocumentPart part = wordPackage.MainDocumentPart;

                //Setup the namespace manager so you can perform XPath queries 
                //to search for bookmarks in the part.
                NameTable nt = new NameTable();
                XmlNamespaceManager nsManager = new XmlNamespaceManager(nt);
                nsManager.AddNamespace("w", wordmlNamespace);

                //Load the part's XML into an XmlDocument instance.
                XmlDocument xmlDoc = new XmlDocument(nt);
                xmlDoc.Load(part.GetStream());

                string docText = null;
                //1. Copy all the file into a string
                using (StreamReader sr = new StreamReader(wordPackage.MainDocumentPart.GetStream()))
                {
                    docText = sr.ReadToEnd();
                    //Iterate through the bookmarks.
                    foreach (KeyValuePair<string, string> bookmarkDataVal in bookmarkData)
                    {
                        //2. Use regular expression to replace all text
                        Regex regexText = new Regex(bookmarkDataVal.Key);
                        if (bookmarkDataVal.Value.Contains("&"))
                        {
                            string NewKeyVal = bookmarkDataVal.Value.Replace("&", "&amp;");
                            docText = regexText.Replace(docText, NewKeyVal);
                        }
                        else
                            docText = regexText.Replace(docText, bookmarkDataVal.Value);

                    }


                    //      //Write the changes back to the document part.
                    //      //3. Write the changed string into the file again
                    using (StreamWriter sw = new StreamWriter(wordPackage.MainDocumentPart.GetStream(FileMode.Create)))
                        sw.Write(docText);
                }

            }


            return "TenderDocuments/" + projectId + tenderId + "/tender-" + projectId + tenderId + "_" + ItemId + ".docx";

        }
        catch (Exception ex)
        {
            //sb.Append(ex.Message.ToString());
            return "";
        }
        finally
        {
            // File.AppendAllText("C:/temp/TenderDocuments/" + "log.txt", sb.ToString());
        }
        return "";
    }

    //public string ConvertHtmlToPdf(string xHtml, string css, string projectId, string erpId, string tenderId)
    //{
    //    string folderPath = _context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId + erpId);
    //    if (!Directory.Exists(folderPath))
    //    {
    //        Directory.CreateDirectory(folderPath);
    //    }
    //    string filePath = _context.Server.MapPath("~/TenderDocuments/" + projectId + tenderId + erpId + "/tender-" + projectId + tenderId + erpId + "_001.pdf");
    //    using (var stream = new FileStream(filePath, FileMode.Create))
    //    {
    //        using (var document = new Document(PageSize.A4, 10f, 10f, 10f, 0f))
    //        {
    //            var writer = PdfWriter.GetInstance(document, stream);
    //            document.Open();

    //            // instantiate custom tag processor and add to HtmlPipelineContext.
    //            var tagProcessorFactory = Tags.GetHtmlTagProcessorFactory();
    //            tagProcessorFactory.AddProcessor(
    //                new TableDataProcessor(),
    //                new string[] { HTML.Tag.TD }
    //            );
    //            var htmlPipelineContext = new HtmlPipelineContext(null);
    //            htmlPipelineContext.SetTagFactory(tagProcessorFactory);

    //            var pdfWriterPipeline = new PdfWriterPipeline(document, writer);
    //            var htmlPipeline = new HtmlPipeline(htmlPipelineContext, pdfWriterPipeline);

    //            // get an ICssResolver and add the custom CSS
    //            var cssResolver = XMLWorkerHelper.GetInstance().GetDefaultCssResolver(true);
    //            cssResolver.AddCss(css, "utf-8", true);
    //            var cssResolverPipeline = new CssResolverPipeline(
    //                cssResolver, htmlPipeline
    //            );

    //            var worker = new XMLWorker(cssResolverPipeline, true);
    //            var parser = new XMLParser(worker);
    //            using (var stringReader = new StringReader(xHtml))
    //            {
    //                parser.Parse(stringReader);
    //            }

    //            return "/TenderDocuments/" + projectId + tenderId + erpId + "/tender-" + projectId + tenderId + erpId + "_001.pdf";


    //        }
    //    }
    //}
    //HTML to PDF conversion ends

    //added
    public string LOADEDITPREDEFINETABLE()
    {
        StringBuilder sb = new StringBuilder();

        sb.Append("<tr>");

        DataTable dttbl = new DataTable();
        dttbl = clsCustomerInformation.FillPredefinetblValue(2);

        StringBuilder cb = new StringBuilder();
        cb.Append("<td><select id='tblName'  expression='tblName' class='ddlFrame form-control input-sm' onchange='copyCmb(this)'> ");
        cb.Append("<option value=''>--Select--</option>");
        //Iterate through frames
        for (int j = 0; j < dttbl.Rows.Count; j++)
        {
            cb.Append("<option class='option' value='" + dttbl.Rows[j][1] + "'>" + dttbl.Rows[j][2] + "</option>");
        }
        cb.Append("</select><input type='text' id='txttblName' class='form-control hidden' style='margin-top:5px' ></td>");
        sb.Append(cb);


        sb.Append("</tr>");

        return sb.ToString();
    }

    public string LOADCUSTOMERINFOGRID()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtFilterData = new DataTable();
            dtFilterData = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet dsCustRecords = new DataSet();
            dsCustRecords = clsCustomerInformation.GetAllCustomersInfo(Convert.ToInt32(dtJsonData.Rows[0]["PageNo"]), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"]), dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), dtJsonData.Rows[0]["UserName"].ToString(), dtFilterData);

            StringBuilder cb = new StringBuilder();
            jsonString = JsonConvert.SerializeObject(dsCustRecords, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //throw (ex);
            //sb.Clear();
            //sb.Append("Error");
            jsonString = "Error";
        }
        return jsonString.ToString();
    }

    public string LOADCOUNTRYLIST()
    {
        string jsonString = "";
        try
        {
            DataTable dtCountry = new DataTable();
            dtCountry = clsCustomerInformation.getTableFromName("tbLocation");
            jsonString = JsonConvert.SerializeObject(dtCountry, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADPUMPMANUFACTURER()
    {
        string jsonString = "";
        try
        {
            DataTable dtPumpManufacturer = new DataTable();
            dtPumpManufacturer = clsCustomerInformation.getTableFromName("tblPumpManufacturer");
            jsonString = JsonConvert.SerializeObject(dtPumpManufacturer, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADPUMPTYPE()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtPumpManufacturer = new DataTable();
            dtPumpManufacturer = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtPumpType = new DataTable();
            dtPumpType = clsCustomerInformation.GetPumpType(dtPumpManufacturer.Rows[0]["PumpManufacturer"].ToString());
            jsonString = JsonConvert.SerializeObject(dtPumpType, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADVALIDATIONPERIOD()
    {
        string jsonString = "";
        try
        {
            DataTable dtValidationPeriod = new DataTable();
            dtValidationPeriod = clsCustomerInformation.getTableFromName("tblValidationPeriod");
            jsonString = JsonConvert.SerializeObject(dtValidationPeriod, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string GETCOLUMNNAMES()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataSet dtValidationPeriod = new DataSet();
            dtValidationPeriod = clsCustomerInformation.getTableColumnNames(dtJsonData.Rows[0]["TableName"].ToString(), dtJsonData.Rows[0]["UserName"].ToString());
            jsonString = JsonConvert.SerializeObject(dtValidationPeriod, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string GETTENDERDOCUMENTSCOLUMNNAMES()
    {
        string jsonString = _context.Request["data"];
        try
        {
            //DataTable dtJsonData = new DataTable();
            //dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtValidationPeriod = new DataTable();
            dtValidationPeriod = clsCustomerInformation.getTenderDocColumnNames();
            jsonString = JsonConvert.SerializeObject(dtValidationPeriod, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string GETDETAULTCOLUMNS()
    {
        string jsonString = "";
        try
        {
            DataTable dtColumns = new DataTable();
            DataColumn dc = new DataColumn();
            dc.ColumnName = "ColumnName";
            dtColumns.Columns.Add(dc);

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

            jsonString = JsonConvert.SerializeObject(dtColumns, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string SAVECOLUMNNAMES()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            if (clsCustomerInformation.SaveTableColumns(dtJsonData))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }

        return jsonString;
    }

    public string SAVEDAULTCOLUMNS()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            if (clsCustomerInformation.SaveDefaultColumns(dtJsonData))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }

        return jsonString;
    }

    public string GETUSERLIST()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtUserGroups = new DataTable();
            dtUserGroups = JsonConvert.DeserializeObject<DataTable>(jsonString);

            PrincipalContext principalContext = new PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain);
            GroupPrincipal group = GroupPrincipal.FindByIdentity(principalContext, dtUserGroups.Rows[0]["UserGroup"].ToString());

            var members = group.GetMembers(true);
            DataTable dtUsers = new DataTable();
            dtUsers.Columns.Add("UserName");
            dtUsers.Columns.Add("PSNumber");
            dtUsers.Columns.Add("EmailAddress");
            //Int32 counter = 0;
            foreach (Principal member in members)
            {
                DataRow dr = dtUsers.NewRow();
                dr["UserName"] = member.DisplayName;
                dr["PSNumber"] = member.SamAccountName;
                dr["EmailAddress"] = member.UserPrincipalName;
                dtUsers.Rows.Add(dr);
            }


            //foreach (string item in membersList)
            //{
            //    dtUsers.Rows.Add(item);
            //}

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }


    public string GETALLUSERLIST()
    {
        try
        {
            DataTable dtUserGroups = new DataTable();
            dtUserGroups = clsCustomerInformation.GetUserGroups();

            PrincipalContext principalContext = new PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain);
            DataTable dtUsers = new DataTable();
            dtUsers.Columns.Add("UserName");
            dtUsers.Columns.Add("PSNumber");
            foreach (DataRow dtRow in dtUserGroups.Rows)
            {
                GroupPrincipal group = GroupPrincipal.FindByIdentity(principalContext, dtRow["Value"].ToString());
                var members = group.GetMembers(true);

                foreach (Principal member in members)
                {
                    DataRow dr = dtUsers.NewRow();
                    dr["UserName"] = member.DisplayName;
                    dr["PSNumber"] = member.SamAccountName;
                    dtUsers.Rows.Add(dr);
                }
            }

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string GETUSERGROUP()
    {
        string jsonString = "";
        try
        {
            DataTable dtUserGroups = new DataTable();
            dtUserGroups = clsCustomerInformation.GetUserGroups();
            jsonString = JsonConvert.SerializeObject(dtUserGroups, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string SAVEUSERROLES()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            foreach (DataRow dr in dtJsonData.Rows)
            {
                clsCustomerInformation.SaveUserRoles(dr["UserId"].ToString(), Convert.ToBoolean(dr["Admin"].ToString()), Convert.ToBoolean(dr["TenderingManager"].ToString()), Convert.ToBoolean(dr["SalesEngineer"].ToString()), Convert.ToBoolean(dr["TenderEngineer"].ToString()), Convert.ToBoolean(dr["SalesManager"].ToString()), Convert.ToBoolean(dr["Viewer"].ToString()), dr["EmailAddress"].ToString());
            }

            jsonString = "Success";
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString.ToString();
    }


    public string LOADUSERROLES()
    {
        try
        {
            DataTable dtUsers = new DataTable();
            dtUsers = clsCustomerInformation.GetUserRoles();

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADMODULELIST()
    {
        try
        {
            DataTable dtMpduleList = new DataTable();
            dtMpduleList = clsCustomerInformation.GetModuleList();

            return JsonConvert.SerializeObject(dtMpduleList, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADALLLEGALENTITIES()
    {
        try
        {
            DataTable dtUsers = new DataTable();
            dtUsers = clsCustomerInformation.GetAllLegalEntites();

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string SAVELEGALENTITY()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            foreach (DataRow dr in dtJsonData.Rows)
            {
                clsCustomerInformation.SaveLegalEntity(dr["CountryCode"].ToString(), Convert.ToInt32(dr["LegalEntityId"].ToString()));
            }

            jsonString = "Success";
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString.ToString();
    }

    public string LOADASSIGNEDLEGALENTITYLIST()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            return JsonConvert.SerializeObject((clsCustomerInformation.GetAssignedLegalEntities(dtJsonData.Rows[0]["CountryCode"].ToString())), Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString.ToString();
    }

    public string SAVEUSERACCESS()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            foreach (DataRow dr in dtJsonData.Rows)
            {
                clsCustomerInformation.SaveUserAccess(Convert.ToInt32(dr["ModuleId"].ToString()), Convert.ToInt32(dr["Role"].ToString()), Convert.ToBoolean(dr["View"].ToString()), Convert.ToBoolean(dr["Insert"].ToString()), Convert.ToBoolean(dr["Update"].ToString()), Convert.ToBoolean(dr["Delete"].ToString()), Convert.ToBoolean(dr["FirmTender"].ToString()), Convert.ToBoolean(dr["ChangeStatus"].ToString()));
            }

            jsonString = "Success";
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString.ToString();
    }

    public string LOADTENDERCONFIGURATION()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtUsers = new DataTable();
            dtUsers = clsCustomerInformation.GetTenderConfiguration(Convert.ToInt32(dtJsonData.Rows[0]["Role"].ToString()));

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADUSERACCESS()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtUsers = new DataTable();
            dtUsers = clsCustomerInformation.GetUserAccess(Convert.ToInt32(dtJsonData.Rows[0]["Role"].ToString()));

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string SAVEUSERLOCATION()
    {
        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtJsonData1 = new DataTable();
            if (jsonString1 != "[]")
            {
                dtJsonData1 = JsonConvert.DeserializeObject<DataTable>(jsonString1);
            }

            if (dtJsonData1.Rows.Count > 0)
            {
                foreach (DataRow dr in dtJsonData.Rows)
                {
                    foreach (DataRow dr1 in dtJsonData1.Rows)
                    {
                        clsCustomerInformation.SaveUserLocation(dr["PSNumber"].ToString(), dr1["LocationCode"].ToString());
                    }
                }
            }
            else
            {
                clsCustomerInformation.DeleteeUserLocation(dtJsonData.Rows[0]["PSNumber"].ToString());
            }

            jsonString = "Success";
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString.ToString();
    }

    public string GETSELECTEDLOCATIONLIST()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtUsers = new DataTable();
            dtUsers = clsCustomerInformation.LoadSelectedLocations(dtJsonData.Rows[0]["PSNumber"].ToString());

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string CHECKUSER()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            if (dtJsonData.Rows[0]["UserName"].ToString() == ConfigurationManager.AppSettings["UserName"].ToString())
            {
                return ConfigurationManager.AppSettings["UserName"].ToString();
            }
            else
            {
                if (dtJsonData.Rows[0]["UserName"].ToString() != "")
                {
                    PrincipalContext principalContext = new PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain);
                    UserPrincipal oUserPrincipal = UserPrincipal.FindByIdentity(principalContext, dtJsonData.Rows[0]["UserName"].ToString().Trim());
                    if (oUserPrincipal != null)
                    {
                        if (oUserPrincipal.DisplayName != null)
                        {
                            return "Exist";
                        }
                        else
                        {
                            return "User does not exist";
                        }
                    }
                    else
                    {
                        return "User does not exist";
                    }
                }
                else
                {
                    return "User does not exist";
                }
            }
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADLOCATIONADNROLE()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataSet dsUsers = new DataSet();
            dsUsers = clsCustomerInformation.LoadLocationsAndRoles(dtJsonData.Rows[0]["Username"].ToString());

            return JsonConvert.SerializeObject(dsUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADSWITCHLEGALENTITY()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtUsers = new DataTable();
            dtUsers = clsCustomerInformation.LoadLegalEntity(dtJsonData.Rows[0]["CountryCode"].ToString());

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADLEGALENTITY()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dsUsers = new DataTable();
            dsUsers = clsCustomerInformation.LoadLegalEntity(dtJsonData.Rows[0]["Location"].ToString());

            return JsonConvert.SerializeObject(dsUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADALLLEGALENTITY()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dsUsers = new DataTable();
            dsUsers = clsCustomerInformation.LoadAllLegalEntity();

            return JsonConvert.SerializeObject(dsUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string CHECKMODULERIGHTS()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtUsers = new DataTable();
            dtUsers = clsCustomerInformation.GetUserAccess(dtJsonData.Rows[0]["ModuleId"].ToString(), dtJsonData.Rows[0]["Role"].ToString());

            return JsonConvert.SerializeObject(dtUsers, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string CHECKEDITTENDER()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtTenderRole = new DataTable();
            dtTenderRole = clsCustomerInformation.GetEditTenderRole(dtJsonData.Rows[0]["UniqueIdentityCode"].ToString());

            return JsonConvert.SerializeObject(dtTenderRole, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string SAVECUSTOMER()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtSaveCustomer = new DataTable();
            dtSaveCustomer = JsonConvert.DeserializeObject<DataTable>(jsonString);
            if (clsCustomerInformation.SaveCutomer(dtSaveCustomer))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
            //jsonString = JsonConvert.SerializeObject(dtSaveCustomer, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADCUSTOMERDATA()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtCustomer = new DataTable();
            dtCustomer = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dttbl = new DataTable();
            dttbl = clsCustomerInformation.getCustomerInformation("tblCustomerInformation", dtCustomer.Rows[0]["CustomerId"].ToString());
            string JsonStringRes = JsonConvert.SerializeObject(dttbl);
            return JsonStringRes;
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string DELETECUSTOMER()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtCustomer = new DataTable();
            dtCustomer = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dttbl = new DataTable();

            if (clsCustomerInformation.DeleteCustomerDetails("tblCustomerInformation", dtCustomer.Rows[0]["CustomerId"].ToString()))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string UPLOADFILES()
    {
        try
        {
            HttpFileCollection files = _context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFile file = files[i];

                _context.Response.ContentType = "text/plain";

                string fileName;
                if (_context.Request.Browser.Browser.ToUpper() == "IE" || _context.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                {
                    string[] testfiles = file.FileName.Split(new char[] { '\\' });
                    fileName = testfiles[testfiles.Length - 1];
                }
                else
                {
                    fileName = file.FileName;
                }
                //Set the Folder Path.
                //string ERPID = clsCustomerInformation.GetERPID(_context.Request.Params["ProjectId"], _context.Request.Params["TenderId"]);

                string folderPath = _context.Server.MapPath("~/TenderDocuments/" + _context.Request.Params["ProjectId"] + _context.Request.Params["TenderId"] + "/");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                file.SaveAs(folderPath + fileName);
                clsCustomerInformation.SaveFileToDb(_context.Request.Params["ProjectId"], _context.Request.Params["TenderId"], _context.Request.Params["TenderUniqueId"], fileName, folderPath, _context.Request.Params["UploadedBy"], _context.Request.Params["UploadLocation"], _context.Request.Params["UploadedRole"], _context.Request.Params["ItemId"]);
            }
            return "Success";
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string LOADPROJECTS()
    {
        string jsonString = "";
        try
        {
            DataTable dstProjects = new DataTable();
            dstProjects = clsCustomerInformation.GetAllProjects();
            jsonString = JsonConvert.SerializeObject(dstProjects, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADTENDERS()
    {
        string jsonString = _context.Request["data"];
        try
        {

            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtTenders = new DataTable();
            dtTenders = clsCustomerInformation.GetAllTenders(dtProject.Rows[0]["ProjectId"].ToString());
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADITEMS()
    {
        string jsonString = _context.Request["data"];
        try
        {

            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtTenders = new DataTable();
            dtTenders = clsCustomerInformation.GetAllTenderItems(dtProject.Rows[0]["ProjectId"].ToString(), dtProject.Rows[0]["TenderId"].ToString());
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }


    public string LOADPDISTINCTROJECTS()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtJsonData1 = new DataTable();
            dtJsonData1 = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet dstProjects = new DataSet();
            dstProjects = clsCustomerInformation.GetAllDistinctProjects(Convert.ToInt32(dtJsonData.Rows[0]["PageNo"]), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"]), dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), dtJsonData1);
            jsonString = JsonConvert.SerializeObject(dstProjects, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADDISTINCTTENDERS()
    {
        string jsonString = _context.Request["data"];
        try
        {

            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataSet dtTenders = new DataSet();
            dtTenders = clsCustomerInformation.GetAllDistinctTenders(dtProject.Rows[0]["ProjectId"].ToString());
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADDISTINCTITEMS()
    {
        string jsonString = _context.Request["data"];
        try
        {

            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataSet dtTenders = new DataSet();
            dtTenders = clsCustomerInformation.GetAllDistinctTenderItems(dtProject.Rows[0]["ProjectId"].ToString(), dtProject.Rows[0]["TenderId"].ToString());
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADTENDERDISTINCTTENDERS()
    {
        string jsonString = _context.Request["data"];
        try
        {

            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataSet dtTenders = new DataSet();
            dtTenders = clsCustomerInformation.GetTenderAllDistinctTenders(dtProject.Rows[0]["ProjectId"].ToString(), dtProject.Rows[0]["DisplayName"].ToString(), dtProject.Rows[0]["FilterOption"].ToString(), Convert.ToInt32(dtProject.Rows[0]["IsDeleted"].ToString()));
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADTENDERDISTINCTITEMS()
    {
        string jsonString = _context.Request["data"];
        try
        {

            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataSet dtTenders = new DataSet();
            dtTenders = clsCustomerInformation.GetTenderAllDistinctTenderItems(dtProject.Rows[0]["ProjectId"].ToString(), dtProject.Rows[0]["TenderId"].ToString(), dtProject.Rows[0]["DisplayName"].ToString(), dtProject.Rows[0]["FilterOption"].ToString(), Convert.ToInt32(dtProject.Rows[0]["IsDeleted"].ToString()), dtProject.Rows[0]["UserName"].ToString());
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADTENDERDISTINCTITEMVERSIONS()
    {
        string jsonString = _context.Request["data"];
        try
        {

            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtTenders = new DataTable();
            dtTenders = Tender.LoadTenderItemVersions(dtProject.Rows[0]["ProjectId"].ToString(), dtProject.Rows[0]["TenderId"].ToString(), dtProject.Rows[0]["ItemId"].ToString(), dtProject.Rows[0]["UserName"].ToString(), dtProject.Rows[0]["DisplayName"].ToString(), dtProject.Rows[0]["FilterOption"].ToString(), Convert.ToInt32(dtProject.Rows[0]["IsDeleted"].ToString()));
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADTENDERDETAILS1()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtFilterData = new DataTable();
            dtFilterData = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet dstProjects = new DataSet();
            dstProjects = Tender.LoadTenderDetails1(Convert.ToInt32(dtJsonData.Rows[0]["PageNo"]), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"]), dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), dtJsonData.Rows[0]["UserName"].ToString(), dtFilterData, dtJsonData.Rows[0]["FilterOption"].ToString(), Convert.ToInt32(dtJsonData.Rows[0]["LocationId"].ToString()), dtJsonData.Rows[0]["Role"].ToString(), dtJsonData.Rows[0]["DisplayName"].ToString(), Convert.ToInt32(dtJsonData.Rows[0]["IsDeleted"]));
            jsonString = JsonConvert.SerializeObject(dstProjects, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADPTENDERLISTTROJECTS()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtJsonData1 = new DataTable();
            dtJsonData1 = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet dstProjects = new DataSet();
            dstProjects = clsCustomerInformation.GetAllDistinctProjects(Convert.ToInt32(dtJsonData.Rows[0]["PageNo"]), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"]), dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), dtJsonData1);
            jsonString = JsonConvert.SerializeObject(dstProjects, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }

    public string LOADITEMFILES()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtProject = new DataTable();
            dtProject = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtTenders = new DataTable();
            dtTenders = clsCustomerInformation.GetAllItemFiles(dtProject.Rows[0]["ProjectId"].ToString(), dtProject.Rows[0]["TenderId"].ToString(), dtProject.Rows[0]["ItemId"].ToString());
            jsonString = JsonConvert.SerializeObject(dtTenders, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            jsonString = "Error";
        }
        return jsonString;
    }



    public string LOADMESSAGES()
    {
        try
        {
            //DataTable dttbl = new DataTable();
            //dttbl = clsCustomerInformation.getTableFromName("tblMessages");

            DataSet ds = new DataSet();
            ds = clsCustomerInformation.getMessageAndCount();

            return JsonConvert.SerializeObject(ds);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string GETMESSAGEGRID()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtColumnList = new DataTable();
            dtColumnList = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet ds = new DataSet();
            ds = clsCustomerInformation.getMessageGrid(dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), Convert.ToInt32(dtJsonData.Rows[0]["PageNo"].ToString()), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"].ToString()), dtJsonData.Rows[0]["UserName"].ToString(), dtColumnList);

            return JsonConvert.SerializeObject(ds);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string GETTOPMESSAGE()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dt = new DataTable();
            dt = clsCustomerInformation.getTopMessages(dtJsonData.Rows[0]["Role"].ToString(), dtJsonData.Rows[0]["Location"].ToString());

            return JsonConvert.SerializeObject(dt);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string SAVEMESSAGE()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtSaveCustomer = new DataTable();
            dtSaveCustomer = JsonConvert.DeserializeObject<DataTable>(jsonString);
            if (clsCustomerInformation.SaveMessage(Convert.ToInt32(dtSaveCustomer.Rows[0]["MessageId"]), dtSaveCustomer.Rows[0]["Message"].ToString()))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
            //jsonString = JsonConvert.SerializeObject(dtSaveCustomer, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }


    public string LOADTENDERDOCUMENTS()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtJsonData1 = new DataTable();
            dtJsonData1 = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet dsCustRecords = new DataSet();
            dsCustRecords = clsCustomerInformation.GetAllTenderDocuments(Convert.ToInt32(dtJsonData.Rows[0]["PageNo"]), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"]), dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), dtJsonData1);

            StringBuilder cb = new StringBuilder();
            jsonString = JsonConvert.SerializeObject(dsCustRecords, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            //throw (ex);
            //sb.Clear();
            //sb.Append("Error");
            jsonString = "Error";
        }
        return jsonString.ToString();
    }

    public string DELETETENDERDOCUMENTS()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtTenderDocuments = new DataTable();
            dtTenderDocuments = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dttbl = new DataTable();
            if (clsCustomerInformation.DeleteTenderDocuments(dtTenderDocuments.Rows[0]["DeleteFrom"].ToString(), dtTenderDocuments.Rows[0]["FileId"].ToString()))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string DELETETENDERS()
    {
        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtTenderDocuments = new DataTable();
            dtTenderDocuments = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dttbl = new DataTable();
            if (clsCustomerInformation.DeleteTenders(dtTenderDocuments.Rows[0]["DeleteFrom"].ToString(), dtTenderDocuments.Rows[0]["ProjectId"].ToString(), dtTenderDocuments.Rows[0]["TenderId"].ToString(), dtTenderDocuments.Rows[0]["Itemid"].ToString(), dtTenderDocuments.Rows[0]["FileId"].ToString()))
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    public string VALIDATEDUPLICATE()
    {
        string jsonString = _context.Request["data"];

        DataTable dtSaveCustomer = new DataTable();
        dtSaveCustomer = JsonConvert.DeserializeObject<DataTable>(jsonString);
        if (clsCustomerInformation.VALIDATEDUPLICATE(dtSaveCustomer))
        {
            return "Success";
        }
        else
        {
            return "Error";
        }
    }

    public string UPDATEUSERPROFILE()
    {
        try
        {
            string jsonString = _context.Request["data"];
            DataTable dtSaveCustomer = new DataTable();
            dtSaveCustomer = JsonConvert.DeserializeObject<DataTable>(jsonString);

            clsCustomerInformation.UpdateUserProfileDetails(dtSaveCustomer.Rows[0]["PSNumber"].ToString(), dtSaveCustomer.Rows[0]["EmailAddress"].ToString(), dtSaveCustomer.Rows[0]["PhoneNumber"].ToString());
            return "";
        }
        catch (Exception ex)
        {
            return "";
        }
    }

    public string GETUSERPROFILE()
    {
        try
        {
            string role = _context.Request["Role"];
            StringBuilder sb = new StringBuilder();
            string currentWindowsuser = GetCookieValue();
            DataTable dtUser = new DataTable();
            dtUser = CheckUserExist(currentWindowsuser.Trim(), role);

            return JsonConvert.SerializeObject(dtUser, Newtonsoft.Json.Formatting.Indented);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }


    private DataTable CheckUserExist(string currentWindowsuser, string Role)
    {
        DataTable dtUser = new DataTable();
        dtUser = clsCustomerInformation.GetUserProfileDetails(currentWindowsuser.Trim());
        if (dtUser.Rows.Count == 0)
        {
            if (currentWindowsuser != "")
            {
                PrincipalContext principalContext = new PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain);
                UserPrincipal oUserPrincipal = UserPrincipal.FindByIdentity(principalContext, currentWindowsuser.Trim());

                GroupPrincipal group = GroupPrincipal.FindByIdentity(principalContext, ConfigurationManager.AppSettings["USER_GROUP"].ToString());

                var members = group.GetMembers(true);

                foreach (Principal member in members)
                {
                    if (member.DisplayName == currentWindowsuser || member.SamAccountName == currentWindowsuser || member.UserPrincipalName == currentWindowsuser)
                    {
                        dtUser = new DataTable();
                        dtUser.Columns.Add("Id");
                        dtUser.Columns.Add("UserName");
                        dtUser.Columns.Add("EmailAddress");
                        dtUser.Columns.Add("PhoneNumber");
                        dtUser.Columns.Add("Role");
                        dtUser.Columns.Add("PSNumber");

                        DataRow dr = dtUser.NewRow();
                        dtUser.Rows.Add(dr);
                        dr["Id"] = clsCustomerInformation.SaveUserProfileDetails(member.SamAccountName, member.DisplayName, member.UserPrincipalName, "", Role);
                        dr["UserName"] = member.DisplayName;
                        dr["EmailAddress"] = member.UserPrincipalName;
                        dr["PhoneNumber"] = "";
                        dr["Role"] = "";
                        dr["PSNumber"] = member.SamAccountName;
                    }
                }
            }
        }
        return dtUser;
    }

    //added
    private string ReturnTenderList()
    {
        return JsonConvert.SerializeObject(Tender.TenderList(), Newtonsoft.Json.Formatting.Indented);
    }
    private string ReturnFilteredTenderList()
    {
        int FilterType = Convert.ToInt32(_context.Request["FilterType"]);
        return JsonConvert.SerializeObject(Tender.FilterTenders(FilterType), Newtonsoft.Json.Formatting.Indented);
    }
    private bool SaveFormData()
    {
        try
        {
            string tenderId = _context.Request["TenderId"];
            string parameterName = _context.Request["ParameterName"];
            string parameterValue = _context.Request["ParameterValue"];
            string guid = _context.Request["Guid"];
            string productId = _context.Request["ProductId"];
            if (String.IsNullOrEmpty(productId))
                FormControlsCollection.SaveCollection(tenderId, parameterName, parameterValue, guid);
            else
                FormControlsCollection.SaveCollectionwithPID(tenderId, parameterName, parameterValue, guid, productId);
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }

    private bool SaveTender()
    {
        try
        {
            string tenderId = _context.Request["TenderId"];
            string guid = _context.Request["Guid"];
            string projectId = _context.Request["ProjectId"];
            string erpId = _context.Request["ErpId"];
            string createdBy = _context.Request["createdBy"];
            string tenderType = _context.Request["tenderType"];
            string tenderInRole = _context.Request["tenderInRole"];
            string tenderLocationCode = _context.Request["tenderLocationCode"];
            string tenderTypeToFilter = _context.Request["tenderTypeToFilter"];
            string ItemId = _context.Request["ItemId"];
            FormControlsCollection.SaveFullTenderDetails(tenderId, projectId, erpId, createdBy, guid, tenderType, tenderInRole, tenderLocationCode, tenderTypeToFilter, ItemId);
        }
        catch (Exception)
        {
            return false;
        }
        return true;
    }

    private string GetGeneralFormData()
    {
        return JsonConvert.SerializeObject(Tender.GetFormData(), Newtonsoft.Json.Formatting.Indented);
    }

    private string GetRecentTenders()
    {
        string locationId = _context.Request["LocationId"];
        string RoleId = _context.Request["RoleId"];
        string UserName = _context.Request["UserName"];
        return JsonConvert.SerializeObject(Tender.RecentTenders(locationId, RoleId, UserName), Newtonsoft.Json.Formatting.Indented);
    }


    private string MainNavigation()
    {
        return JsonConvert.SerializeObject(Menu.MainNavigation(), Newtonsoft.Json.Formatting.Indented);
    }
    private string ReOrder()
    {
        string tbl = _context.Request["data"];
        //SortTable tblSorted = new SortTable();
        var tblSorted = JsonConvert.DeserializeObject<List<SortTable>>(tbl);
        int id;
        string SortOrder;
        foreach (var i in tblSorted)
        {
            id = i.Id;
            SortOrder = i.SortOrder;
            if (!FormControlsCollection.UpdateSortOrder(id, SortOrder))
                return "false";
        }
        return "done";
    }
    private string SubNavigation()
    {
        int MainTabId = Convert.ToInt32(_context.Request["MainTabId"]);
        return JsonConvert.SerializeObject(Menu.SubNavigation(MainTabId), Newtonsoft.Json.Formatting.Indented);
    }
    private string FormData()
    {
        int MainTabId = Convert.ToInt32(_context.Request["MainTabId"]);
        int SubNavId = Convert.ToInt32(_context.Request["SubNavId"]);
        return JsonConvert.SerializeObject(Menu.FormDetails(MainTabId, SubNavId), Newtonsoft.Json.Formatting.Indented);
    }
    private string FormDataByUniqueId()
    {
        //int MainTabId = Convert.ToInt32(_context.Request["MainTabId"]);
        //int SubNavId = Convert.ToInt32(_context.Request["SubNavId"]);
        string UniqueId = Convert.ToString(_context.Request["UniqueId"]);
        return JsonConvert.SerializeObject(Menu.FormDetailsByUniqueId(UniqueId), Newtonsoft.Json.Formatting.Indented);
        //return JsonConvert.SerializeObject(Menu.FormDetailsByUniqueId(MainTabId, SubNavId, UniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    private string GetTableData()
    {

        string tblName = Convert.ToString(_context.Request["Table"]);

        DataTable dtCust = new DataTable();
        dtCust = Menu.GetTableData(tblName);

        return JsonConvert.SerializeObject(dtCust, Newtonsoft.Json.Formatting.Indented);
    }
    private string GetDDValues()
    {

        int id = Convert.ToInt32(_context.Request["LblId"]);
        return JsonConvert.SerializeObject(Menu.GetDdValues(id), Newtonsoft.Json.Formatting.Indented);
    }
    private string GetCustomerById()
    {

        int id = Convert.ToInt32(_context.Request["Id"]);
        return JsonConvert.SerializeObject(Menu.GetCustomerById(id), Newtonsoft.Json.Formatting.Indented);
    }
    private string GetAllSubNavigations()
    {
        return JsonConvert.SerializeObject(WizardDAO.RetrieveSubNavigation(), Newtonsoft.Json.Formatting.Indented);
    }
    private string GetAllFormAttributes()
    {
        return JsonConvert.SerializeObject(Menu.GetAllFormAttributes(), Newtonsoft.Json.Formatting.Indented);
    }
    private bool DeleteTender()
    {
        //string TenderId = _context.Request["TenderId"];
        //string ProjectId = _context.Request["ProjectId"];
        string TenderUniqueId = _context.Request["TenderUniqueId"];
        return Tender.DeleteTender(TenderUniqueId);
    }
    private string SearchTender()
    {
        //string sealSupplier = _context.Request["SealSupplier"];
        //string originalPumpSupplier = _context.Request["OriginalPumpSupplier"];
        //string pumpType = _context.Request["PumpType"];
        //string erpId = _context.Request["ErpId"];
        //string tenderId = _context.Request["TenderId"];
        //string customerName = _context.Request["CustomerName"];
        //return JsonConvert.SerializeObject(Tender.SearchTenders(sealSupplier, originalPumpSupplier, pumpType, erpId, tenderId, customerName), Newtonsoft.Json.Formatting.Indented);
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtFilterData = new DataTable();
            dtFilterData = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet ds = new DataSet();
            //ds = clsCustomerInformation.getMessageGrid(dtJsonData);

            //DataSet ds = new DataSet();
            ds = Tender.SearchTenders(Convert.ToInt32(dtJsonData.Rows[0]["PageNo"]), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"]), dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), dtJsonData.Rows[0]["UserName"].ToString(), dtFilterData, Convert.ToInt32(dtJsonData.Rows[0]["LocationId"].ToString()), dtJsonData.Rows[0]["Role"].ToString(), dtJsonData.Rows[0]["DisplayName"].ToString());

            return JsonConvert.SerializeObject(ds);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    private string LOADTENDERDETAILS()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        string jsonString1 = _context.Request["data1"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dtFilterData = new DataTable();
            dtFilterData = JsonConvert.DeserializeObject<DataTable>(jsonString1);

            DataSet ds = new DataSet();
            ds = Tender.LoadTenderDetails(Convert.ToInt32(dtJsonData.Rows[0]["PageNo"]), Convert.ToInt32(dtJsonData.Rows[0]["PageSize"]), dtJsonData.Rows[0]["SearchText"].ToString(), dtJsonData.Rows[0]["SortingColumn"].ToString(), dtJsonData.Rows[0]["SortingOrder"].ToString(), dtJsonData.Rows[0]["UserName"].ToString(), dtFilterData, dtJsonData.Rows[0]["FilterOption"].ToString(), Convert.ToInt32(dtJsonData.Rows[0]["LocationId"].ToString()), dtJsonData.Rows[0]["Role"].ToString(), dtJsonData.Rows[0]["DisplayName"].ToString(), Convert.ToInt32(dtJsonData.Rows[0]["IsDeleted"]));
            return JsonConvert.SerializeObject(ds);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    private string GETCHILDTENDER()
    {
        StringBuilder sb = new StringBuilder();

        string jsonString = _context.Request["data"];
        try
        {
            DataTable dtJsonData = new DataTable();
            dtJsonData = JsonConvert.DeserializeObject<DataTable>(jsonString);


            DataTable dt = new DataTable();
            dt = Tender.GetChildTenders(dtJsonData);

            return JsonConvert.SerializeObject(dt);
        }
        catch (Exception ex)
        {
            return "Error";
        }
    }

    private string UpdateTenderRole()
    {
        string uniqueId = _context.Request["TenderUniqueId"];
        string tenderId = _context.Request["TenderId"];
        string user = _context.Request["UserName"];
        string role = _context.Request["Role"];
        string location = _context.Request["Location"];
        string customer = _context.Request["Customer"];
        return JsonConvert.SerializeObject(Tender.UpdateTenderRoleToManager(tenderId, uniqueId, user, role, location, customer), Newtonsoft.Json.Formatting.Indented);
    }
    private string ReviewFormData()
    {
        string UniqueId = Convert.ToString(_context.Request["UniqueId"]);
        return JsonConvert.SerializeObject(Menu.ReviewForm(UniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    private string CheckFirmAccessByRole()
    {
        int RoleId = Convert.ToInt32(_context.Request["RoleId"]);
        return JsonConvert.SerializeObject(Tender.CheckFirmAccessByRole(RoleId), Newtonsoft.Json.Formatting.Indented);
    }
    private string ReturnTenderVersion()
    {
        string TenderUniqueId = _context.Request["TenderUniqueId"];
        string ParentTenderUniqueId = _context.Request["pTenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.TenderVersion(TenderUniqueId, ParentTenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    private string GetLatestChildTenderDetails()
    {
        string ParentTenderUniqueId = _context.Request["pTenderUniqueId"];
        return JsonConvert.SerializeObject(Tender.GetLatestChildTenderDetails(ParentTenderUniqueId), Newtonsoft.Json.Formatting.Indented);
    }
    private string ReturnAllRoles()
    {
        return JsonConvert.SerializeObject(SiteUsersDAO.GetAllRoles(), Newtonsoft.Json.Formatting.Indented);
    }
    private string ReturnAllLocations()
    {
        return JsonConvert.SerializeObject(LocationsDAO.GetAllLocations(), Newtonsoft.Json.Formatting.Indented);
    }

    private string ReturnSnapdownTitles()
    {
        return JsonConvert.SerializeObject(WizardDAO.GetSnapDownTitles(), Newtonsoft.Json.Formatting.Indented);
    }
    private string Review()
    {
        return JsonConvert.SerializeObject(WizardDAO.Review(), Newtonsoft.Json.Formatting.Indented);
    }


    private string Login()
    {
        if (String.IsNullOrEmpty(_context.Request["Username"]) || String.IsNullOrEmpty(_context.Request["Password"])) { return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_FAIL + "\"}"; }

        string Username = _context.Request["Username"];
        string Password = _context.Request["Password"];
        string Remember = _context.Request["Remember"];
        string Role = _context.Request["Role"];

        if (_context.Request["Username"] == ConfigurationManager.AppSettings["UserName"].ToString())
        {
            if (_context.Request["Password"] == ConfigurationManager.AppSettings["Password"].ToString())
            {

                HttpCookie MyCookie = new HttpCookie("Cookie1");
                MyCookie.Values["LoginUserId"] = Username.Trim();
                _context.Response.Cookies.Add(MyCookie);


                if (string.Compare(Remember, "true", true) == 0)
                {
                    clsLoginRemember ob = new clsLoginRemember();
                    ob.Username = Username;
                    ob.UserRole = "Admin";
                    clsLoginRememberDAO.Save(ob);
                }
                clsCommon.com.LoginInfo = Username;
                clsCommon.com.LoginRole = new List<string>() { ConfigurationManager.AppSettings["USER_GROUP"].ToString() };
                clsCommon.com.SelectedRole = "Admin";
                return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_OK + "\"}";
            }
            else
            {
                clsCommon.com.LoginInfo = ""; return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_FAIL + "\"}";
            }
        }
        else
        {
            string currentUser = System.Web.HttpContext.Current.User.Identity.Name;
            PrincipalContext principalContext = new PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain);
            bool flgValidUser = principalContext.ValidateCredentials(Username.Trim(), Password.Trim());
            DataTable dtUsers = CheckUserExist(Username, Role);
            if (flgValidUser)
            {
                HttpCookie MyCookie = new HttpCookie("Cookie1");
                MyCookie.Values["LoginUserId"] = Username.Trim();
                _context.Response.Cookies.Add(MyCookie);
                UserPrincipal user = UserPrincipal.FindByIdentity(principalContext, Username.Trim());
                //if (string.Compare(Role, "1", true) == 0)
                //{
                GroupPrincipal group = GroupPrincipal.FindByIdentity(principalContext, ConfigurationManager.AppSettings["USER_GROUP"].ToString());
                //UserPrincipal oUserPrincipal = UserPrincipal.FindByIdentity(principalContext, Username.Trim());
                //string DisplayName = oUserPrincipal.DisplayName.ToString();


                bool isValidUser = user.IsMemberOf(group);
                if (isValidUser)
                {
                    if (string.Compare(Remember, "true", true) == 0)
                    {
                        clsLoginRemember ob = new clsLoginRemember();
                        ob.Username = Username;
                        //ob.Username = DisplayName;
                        ob.UserRole = Role;
                        clsLoginRememberDAO.Save(ob);
                    }
                    clsCommon.com.LoginInfo = Username;
                    clsCommon.com.LoginRole = new List<string>() { ConfigurationManager.AppSettings["USER_GROUP"].ToString() };
                    clsCommon.com.SelectedRole = Role;
                    return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_OK + "\"}";
                }
                else { return "{\"RESULT\":\"" + "NOT_IN_GROUPS" + "\"}"; }
            }

            //else if (string.Compare(Role, "Tendering Manager", true) == 0)
            //{
            //    GroupPrincipal group = GroupPrincipal.FindByIdentity(principalContext, ConfigurationManager.AppSettings["USER_GROUP"].ToString());
            //    UserPrincipal oUserPrincipal = UserPrincipal.FindByIdentity(principalContext, Username.Trim());
            //    string DisplayName = oUserPrincipal.DisplayName.ToString();
            //    bool isValidUser = user.IsMemberOf(group);
            //    if (isValidUser)
            //    {
            //        if (string.Compare(Remember, "true", true) == 0)
            //        {
            //            clsLoginRemember ob = new clsLoginRemember();
            //            ob.Username = DisplayName;
            //            //ob.Username = DisplayName;
            //            ob.UserRole = Role;
            //            clsLoginRememberDAO.Save(ob);
            //        }
            //        clsCommon.com.LoginInfo = Username;
            //        clsCommon.com.LoginRole = new List<string>() { ConfigurationManager.AppSettings["USER_GROUP"].ToString() };
            //        clsCommon.com.SelectedRole = Role;
            //        return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_OK + "\"}";
            //    }
            //    else { return "{\"RESULT\":\"" + "NOT_IN_GROUPS" + "\"}"; }
            //}

            //    else if (string.Compare(Role, "Admin", true) == 0)
            //    {
            //        GroupPrincipal group = GroupPrincipal.FindByIdentity(principalContext, ConfigurationManager.AppSettings["ADMIN_GROUP"].ToString());
            //        //UserPrincipal oUserPrincipal = UserPrincipal.FindByIdentity(principalContext, Username.Trim());
            //        //string DisplayName = oUserPrincipal.DisplayName.ToString();
            //        bool isValidAdmin = user.IsMemberOf(group);
            //        if (isValidAdmin)
            //        {
            //            if (string.Compare(Remember, "true", true) == 0)
            //            {
            //                clsLoginRemember ob = new clsLoginRemember();
            //                ob.Username = Username;
            //                // ob.Username = DisplayName;
            //                ob.UserRole = Role;
            //                clsLoginRememberDAO.Save(ob);
            //            }
            //            clsCommon.com.LoginInfo = Username;
            //            clsCommon.com.LoginRole = new List<string>() { ConfigurationManager.AppSettings["ADMIN_GROUP"].ToString() };
            //            clsCommon.com.SelectedRole = Role;
            //            return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_OK + "\"}";
            //        }
            //        else { return "{\"RESULT\":\"" + "NOT_IN_GROUPS" + "\"}"; }
            //    }
            //}
            else { clsCommon.com.LoginInfo = ""; return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_FAIL + "\"}"; }
        }
        return "{\"RESULT\":\"" + clsCommon._MSG_LOGIN_FAIL + "\"}";
    }

    /// <summary>
    /// Function to delete session when user clicks on logout 
    /// </summary>
    private void Logout()
    {
        clsCommon.com.LoginInfo = "";
        clsCommon.com.LoginRole.Clear();
        clsCommon.com.SelectedRole = "";

        string currentWindowsuser = GetCookieValue();
        //string currentWindowsuser = System.Security.Principal.WindowsIdentity.GetCurrent().Name.Split('\\')[1];

        _context.Request.Cookies["UserName"].Value = String.Empty;
        clsLoginRememberDAO.Delete(currentWindowsuser);
        FormsAuthentication.SignOut();
        System.Security.Principal.WindowsIdentity.GetCurrent().Dispose();

    }


    private string GETUSERNAME()
    {
        StringBuilder sb = new StringBuilder();
        string currentWindowsuser = GetCookieValue();
        string DisplayName = "";
        if (currentWindowsuser == ConfigurationManager.AppSettings["UserName"].ToString())
        {
            DisplayName = ConfigurationManager.AppSettings["DisplayName"].ToString();
        }
        else
        {
            if (currentWindowsuser != "")
            {
                PrincipalContext principalContext = new PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain);
                UserPrincipal oUserPrincipal = UserPrincipal.FindByIdentity(principalContext, currentWindowsuser.Trim());
                DisplayName = oUserPrincipal.DisplayName.ToString();
            }
        }
        return DisplayName;
    }

    private string GETNAVBAR()
    {
        StringBuilder sb = new StringBuilder();
        string currentWindowsuser = GetCookieValue();
        PrincipalContext principalContext = new PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain);
        UserPrincipal oUserPrincipal = UserPrincipal.FindByIdentity(principalContext, currentWindowsuser.Trim());
        string DisplayName = oUserPrincipal.DisplayName.ToString();
        sb.Append("<ul class='nav navbar-nav user-details' style=''><li><a>Welcome : " + DisplayName + ", location</a></li>");
        sb.Append("<li><a onClick='Logout();return false;' href=''>Logout</a></li></ul>");
        sb.Append("<ul class='nav navbar-nav'>");
        string unitValue = GetUnitCookieValue();
        string Clone = GetCloneCookieValue();


        if (unitValue == null)
            sb.Append("<li style='font - weight: bolder; padding-top: 15px; padding - bottom: 15px; padding - right: 15px;'><select id='Unit' class='ddlunit form-control input-sm' onchange='ChangeUnit(this)' >");
        else
        {
            if (Clone == "1")
                sb.Append("<li style='font - weight: bolder; padding-top: 15px; padding - bottom: 15px; padding - right: 15px;'><select id='Unit' class='ddlunit form-control input-sm' onchange='ChangeUnit(this)'>");
            else
                sb.Append("<li style='font - weight: bolder; padding-top: 15px; padding - bottom: 15px; padding - right: 15px;'><select id='Unit' class='ddlunit form-control input-sm' onchange='ChangeUnit(this)' disabled>");
        }


        sb.Append("<option class='option' value='0' text='Select'>Select Unit</option>");
        if (unitValue == "1")
            sb.Append("<option selected='selected' class='option' value='1' text='Imperial'>Imperial</option>");
        else
            sb.Append("<option class='option' value='1' text='Imperial'>Imperial</option>");

        if (unitValue == "2")
            sb.Append("<option class='option' selected='selected' value='2' text='Metric'>Metric</option>");
        else
            sb.Append("<option class='option' value='2' text='Metric'>Metric</option>");


        sb.Append("</select></li>");

        //List of options for User
        if (string.Compare(clsCommon.com.SelectedRole, "Sales", true) == 0)
        {
            sb.Append("<li><a href='Default.aspx'>Tender Management</a><ul><li><a href=''>Tender Details</a></li><li><a href=''>Reports</a></li><li><a href=''>Configuration</a></li><li><a class='current' href=''>New Tender</a></li></ul></li>");
            sb.Append("<li class='dropdown'><a href='/' class='dropdown-toggle'>Customer Management</a></li>");
            sb.Append("<li><a href='/'>Message center</a></li>");
        }

        else if (string.Compare(clsCommon.com.SelectedRole, "View", true) == 0)
        {
            sb.Append("<li><a href='Search.aspx'>Search</a></li>");
            sb.Append("<li><a href='Default.aspx'>Configurator</a></li>");
            sb.Append("<li><a href='ComparedValidater.aspx'>Validator</a></li>");
            sb.Append("<li><a href='Orders.aspx'>Orders</a></li>");
        }
        //List of options for Admin
        else if (string.Compare(clsCommon.com.SelectedRole, "Admin", true) == 0)
        {
            sb.Append("<li ><a href='AdminDefault.aspx'>UI Designe</a></li>");
            sb.Append("<li ><a href='EditDefaultTablesValues.aspx'>Pre-Define Table</a></li>");
            sb.Append("<li><a href='ListofOrders.aspx'>Orders</a></li>");
        }

        sb.Append("</ul>");
        //string currentWindowsuser = System.Security.Principal.WindowsIdentity.GetCurrent().Name.Split('\\')[1];
        // string currentWindowsuser = _context.User.Identity.Name.Split('\\')[1];




        RemoveunitValueCookie();
        RemoveCloneCookie();

        return sb.ToString();
    }

    #region Read and Remove Cookie
    /// <summary>
    /// /Get Value from cookie
    /// </summary>
    /// <returns></returns>
    public string GetCookieValue()
    {
        HttpCookie cookie = _context.Request.Cookies["UserName"];
        if (cookie != null)
        {
            if (!string.IsNullOrEmpty(cookie.Value))
                return cookie.Value;
            else
                return null;
        }
        else
        {
            return "";
        }
    }

    public string GetUserCookieValue()
    {
        HttpCookie cookie = _context.Request.Cookies["Type"];
        if (cookie != null)
        {
            if (!string.IsNullOrEmpty(cookie.Value))
                return cookie.Value;
            else
                return null;
        }
        else
            return null;

    }

    public string GetUnitCookieValue()
    {
        HttpCookie cookie = _context.Request.Cookies["UnitVal"];
        if (cookie == null)
        {
            return null;
        }
        if (!string.IsNullOrEmpty(cookie.Value))
            return cookie.Value;
        else
            return null;

    }



    public string GetCloneCookieValue()
    {
        HttpCookie cookie = _context.Request.Cookies["Clone"];
        if (cookie == null)
        {
            return null;
        }
        if (!string.IsNullOrEmpty(cookie.Value))
            return cookie.Value;
        else
            return null;

    }

    public string GetTblCookieValue()
    {
        HttpCookie cookie = _context.Request.Cookies["tblName"];
        if (cookie == null)
        {
            return null;
        }
        if (!string.IsNullOrEmpty(cookie.Value))
            return cookie.Value;
        else
            return null;

    }

    public void RemoveTblCookieValue()
    {
        HttpCookie cookie = _context.Request.Cookies["tblName"];
        if (cookie == null)
        {
            return;
        }
        if (!string.IsNullOrEmpty(cookie.Value))
        {
            cookie.Expires = DateTime.Now.AddDays(-10);
            cookie.Value = "";
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }



    public void RemoveCloneCookie()
    {
        HttpCookie cookie = _context.Request.Cookies["Clone"];
        if (cookie == null)
        {
            return;
        }
        if (!string.IsNullOrEmpty(cookie.Value))
        {
            cookie.Expires = DateTime.Now.AddDays(-10);
            cookie.Value = "";
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }

    public void RemoveunitValueCookie()
    {
        HttpCookie cookie = _context.Request.Cookies["UnitVal"];
        if (cookie == null)
        {
            return;
        }
        if (!string.IsNullOrEmpty(cookie.Value))
        {
            cookie.Expires = DateTime.Now.AddDays(-10);
            cookie.Value = "";
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }

    #endregion

    #endregion New Code


}


public class commonList
{
    public string Description
    {
        get;
        set;
    }
    public string Symbol
    {
        get;
        set;
    }
    public string valu
    {
        get;
        set;
    }
    public string unit
    {
        get;
        set;
    }

}

public class OrderList
{
    public string OrderNo
    {
        get;
        set;
    }


}

public class Users
{
    public string Email { get; set; }
    public string UserName { get; set; }
    public string DisplayName { get; set; }
    public bool isMapped { get; set; }
}