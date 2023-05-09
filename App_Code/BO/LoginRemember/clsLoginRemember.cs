using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class clsLoginRemember
{
    public int id { get; set; }
    public string Username { get; set; }
    public string UserRole { get; set; }
    public string Location { get; set; }

    public clsLoginRemember()
    {
        this.id = 0;
        this.Username = "";
        this.UserRole = "";
    }
}