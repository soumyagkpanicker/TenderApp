using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class LogIn : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        if (clsCommon.com.LoginInfo.Trim().Length > 0)
        {
            //if (string.Compare(clsCommon.com.SelectedRole, "User", true) == 0) { Response.Redirect("Search.aspx"); }
            if (string.Compare(clsCommon.com.SelectedRole, "Sales", true) == 0) { Response.Redirect("Dashboard.aspx"); }
            else if (string.Compare(clsCommon.com.SelectedRole, "View", true) == 0) { Response.Redirect("Search.aspx"); }
            else if (string.Compare(clsCommon.com.SelectedRole, "Admin", true) == 0) { Response.Redirect("UploadDBConfig.aspx"); }
        }
        string currentWindowsuser;

        if (!string.IsNullOrEmpty(User.Identity.Name))
        {

            currentWindowsuser = System.Security.Principal.WindowsIdentity.GetCurrent().Name;
            //string currentWindowsuser = User.Identity.Name.Split('\\')[1];
            if (clsLoginRememberDAO.CheckUser(currentWindowsuser))
            {
                string role = clsLoginRememberDAO.GetRoleByUsername(currentWindowsuser);
                clsCommon.com.LoginInfo = currentWindowsuser;
                clsCommon.com.SelectedRole = role;
                if (string.Compare(role, "Sales", true) == 0)
                {
                    clsCommon.com.LoginRole.Add(ConfigurationManager.AppSettings["USER_GROUP"]);
                    Response.Redirect("Dashboard.aspx");
                }
                else if (string.Compare(role, "View", true) == 0)
                {
                    clsCommon.com.LoginRole.Add(ConfigurationManager.AppSettings["USER_GROUP"]);
                    Response.Redirect("Default.aspx");
                }

                else if (string.Compare(role, "Admin", true) == 0)
                {
                    clsCommon.com.LoginRole.Add(ConfigurationManager.AppSettings["ADMIN_GROUP"]);
                    Response.Redirect("AdminDefault.aspx");
                }
            }
        }


    }
}
