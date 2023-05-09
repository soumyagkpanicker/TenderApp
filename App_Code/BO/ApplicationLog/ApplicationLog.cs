using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ApplicationLog
/// </summary>
public class ApplicationLog
{
    public static string LoadLegalEntity(string FormName, string UserName, string UserRole, string Location, string LegalEntity, string Task, string Message)
    {
        try
        {
            string filepath = HttpContext.Current.Server.MapPath("~/ApplocationLog/LogFile.txt");
            string LogString = "Message: " + Message + Environment.NewLine + "Form Name:" + FormName + Environment.NewLine + "Task performed by: " + UserName + Environment.NewLine + "User Role: " + UserRole + Environment.NewLine + "Location: " + Location + Environment.NewLine + "Legal Entity: " + LegalEntity + Environment.NewLine + "Task Performed: " + Task + Environment.NewLine;
            LogString += "*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*";
            File.AppendAllText(@"" + filepath, LogString + Environment.NewLine);
            return "";
        }
        catch (Exception ex)
        {
            throw (ex);
        }
    }
}