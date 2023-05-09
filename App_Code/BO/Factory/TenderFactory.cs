using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlTypes;

/// <summary>
/// Summary description for TenderFactory
/// </summary>
public abstract class TenderFactory
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
    public bool ShowDiscountInDocument { get; set; }
    public SqlDateTime EstimatedAwardDate { get; set; }
    public string ParentTenderUniqueId { get; set; }
    public bool IsAssignedBackByTenderingTeam { get; set; }
    public string ParameterName { get; set; }
    public string ParameterValue { get; set; }
    public string ParameterIdentity { get; set; }
    public string CreatedById { get; set; }
    public string ProjectNumber { get; set; }
    public abstract IFactory GetTender(string tender);

    
}