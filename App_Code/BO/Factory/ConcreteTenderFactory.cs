using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ConcreteTenderFactory
/// </summary>
public class ConcreteTenderFactory : TenderFactory
{

    public override IFactory GetTender(string tender)
    {
        switch (tender)
        {
            case "Budget":
                return new BudgetTender(TenderId, ProjectId, TenderUniqueId, ItemId, CustomerId, TenderType, RoleId, DateOfCreation, CreatedBy, ModifiedBy, ModifiedDate, LocationId, LegalEntity, Cost, Currency, Discount, ShowDiscountInDocument, EstimatedAwardDate,CreatedById, IsAssignedBackByTenderingTeam, ParentTenderUniqueId,ProjectNumber);
            case "BudgetDetails":
                return new BudgetTender(TenderUniqueId, ParameterName, ParameterValue,ParameterIdentity);
            case "Firm":
                return new FirmTender();
            case "BudgetToCheck":
                return new BudgetTender(TenderUniqueId,TenderId,ItemId);
            default:
                throw new Exception("This object cannot be created");
        }
    }

}
