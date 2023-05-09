using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for IFactory
/// </summary>
public interface IFactory
{
    string CreateTenderSaveFullTenderDetails();
    void SaveTenderDetails();
    string GetLatestProjectId(string locationcode,string year);
    bool CheckTenderExists(string TenderUniqueID, string tenderId, string itemId,string projectId);
    
}