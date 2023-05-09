using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.DirectoryServices;

public class clsCommon
{
    private clsCommon() { }

    private static clsCommon _com = null;

    public static clsCommon com { get { if (_com == null) { _com = new clsCommon(); } return _com; } }

    public const string _SESSION_USERNAME = "Username";
    public const string _SESSION_USERROLES = "UserRole";
    public const string _MSG_LOGIN_OK = "LOGIN_OK";
    public const string _MSG_LOGIN_FAIL = "LOGIN_FAIL";
    public const string _SESSION_SELECTED_ROLE = "SELECTED_ROLE";

    public string SelectedRole
    {
        get { return Convert.ToString(HttpContext.Current.Session[_SESSION_SELECTED_ROLE]); }
        set { HttpContext.Current.Session[_SESSION_SELECTED_ROLE] = value; }
    }

    public string LoginInfo
    {
        get { return Convert.ToString(HttpContext.Current.Session[_SESSION_USERNAME]); }
        set { HttpContext.Current.Session[_SESSION_USERNAME] = value; }
    }

    public List<string> LoginRole
    {
        get { return HttpContext.Current.Session[_SESSION_USERROLES] as List<string>; }
        set { HttpContext.Current.Session[_SESSION_USERROLES] = value; }
    }

    public bool AuthenticateUser(string Domain, string Username, string Password, string LDAPPath, out List<string> lstGroup, ref string ErrMsg)
    {
        ErrMsg = "";
        lstGroup = new List<string>();

        string domainAndUsername = string.Format(@"{0}\{1}", Domain, Username);
        DirectoryEntry entry = new DirectoryEntry(LDAPPath, domainAndUsername, Password);

        try
        {
            object obj = entry.NativeObject;
            lstGroup = GetUserGroups(Domain, Username);
        }
        catch (Exception ex) { ErrMsg = ex.Message; return false; }
        return true;
    }

    private List<string> GetUserGroups(string Domain, string Username)
    {
        List<string> lstGroup = new List<string>();
        System.DirectoryServices.AccountManagement.UserPrincipal user = System.DirectoryServices.AccountManagement.UserPrincipal.FindByIdentity(
            new System.DirectoryServices.AccountManagement.PrincipalContext(System.DirectoryServices.AccountManagement.ContextType.Domain, Domain),
            System.DirectoryServices.AccountManagement.IdentityType.SamAccountName, Username);
        foreach (System.DirectoryServices.AccountManagement.GroupPrincipal group in user.GetGroups()) { lstGroup.Add(Convert.ToString(group)); }

        return lstGroup;
    }
}