﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security;

public partial class Dashboard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (clsCommon.com.LoginInfo.Trim().Length <= 0) { Response.Redirect("LogIn.aspx"); }
    }
}