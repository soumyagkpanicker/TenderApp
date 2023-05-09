using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DataConnection
/// </summary>
public class DataConnection
{
    public static String ServerName = "";
    public static String Database = "";
    public static String DefualtUserID = "";
    public static String DefualtPassword = "";

    public static String GetConnectionString()
    {
        ServerName = ConfigurationManager.AppSettings["ServerName"];
        Database = ConfigurationManager.AppSettings["Database"];
        DefualtUserID = ConfigurationManager.AppSettings["DefualtUserID"];
        DefualtPassword = ConfigurationManager.AppSettings["DefualtPassword"];
        return "Data Source=" + ServerName + ";Initial Catalog=" + Database +
              ";User ID=" + DefualtUserID + ";Password=" + DefualtPassword + ";";
    }
}