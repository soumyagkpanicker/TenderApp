﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MessageCenter : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (clsCommon.com.LoginInfo.Trim().Length <= 0) { Response.Redirect("LogIn.aspx"); }
    }
}