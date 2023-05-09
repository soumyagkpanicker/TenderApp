var $jq1 = jQuery.noConflict();
$jq1(document).on("click", ".btnLogout", function () {
    Logout();
});
$jq1(document).on("change", "#ddRoles", function () {
    $jq1(this).val();
});
function Login() {
    if ($jq1('#ddLocations option').length == 0) {
        alert('You have not assigned to any role!');
    }
    else if ($jq1('#ddRoles option').length == 0) {
        alert('You have not assigned to any role!');
    }
    else {
        document.getElementById("loadingDiv").style.display = "block";
        var IsReqEventOccured = false;
        if (!Required("#txtUsername")) { IsReqEventOccured = true; }
        if (!Required("#txtPassword")) { IsReqEventOccured = true; }

        if (IsReqEventOccured) { return false; }
        $jq1("#btnLogin").val("Authenticating");
        $jq1("#btnLogin").attr('disabled', 'disabled');
        var remember = "";
        if ($jq1('#remember:checkbox:checked').length > 0) { remember = "true"; }
        else { remember = "false"; }
        var role = ($jq1("#ddRoles").val() == 'Select') ? 0 : $jq1("#ddRoles").val();
        var Location = ($jq1("#ddLocations").val() == 'Select') ? 0 : $jq1("#ddLocations").val();
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=LOGIN',
            cache: false,
            async: false,
            dataType: 'json',
            data: { Username: $jq1('#txtUsername').val(), Password: $jq1('#txtPassword').val(), Remember: remember, Role: role },
            success: function (data) {
                if (data.RESULT == 'LOGIN_OK') {
                    document.cookie = "PumpType" + "=" + $jq1("input[type='radio'][name='PumpType']:checked").val();

                    //if (role == "1") {
                    window.location = "Dashboard.aspx";
                    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();
                    if ($jq1('#txtUsername').val() == "SulzerAdminUser") {
                        document.cookie = "Role" + "=" + "Admin";
                        document.cookie = "RoleId" + "=" + "4";
                    }
                    else {
                        document.cookie = "Role" + "=" + $jq1("#select2-ddRoles-container").text();
                        document.cookie = "RoleId" + "=" + $jq1("#ddRoles").val();
                    }
                    document.cookie = "Location" + "=" + $jq1("#ddLocations option:selected").text();
                    document.cookie = "LocationId" + "=" + $jq1("#ddLocations").val();
                    document.cookie = "PumpType=" + $jq1("input[name='PumpType']:checked").val();
                    document.cookie = "LegalEntity" + "=" + $jq1("#ddLegalEntity option:selected").text();
                    document.cookie = "LegalEntityId" + "=" + $jq1("#ddLegalEntity").val();

                    //}
                    //else if (role == "Tendering Manager") {
                    //    window.location = "Dashboard.aspx";
                    //    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();
                    //    document.cookie = "Role" + "=Tendering Manager";
                    //    document.cookie = "Location" + "=" + $jq1("#ddLocations").val();

                    //}
                    //else if (role == "View") {
                    //    window.location = "Search.aspx";
                    //    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();
                    //}

                    //else {
                    //    window.location = "AdminDefault.aspx";
                    //    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();
                    //}
                }
                else if (data.RESULT == 'LOGIN_FAIL') {
                    $jq1("#btnLogin").val("Login");
                    $jq1("#btnLogin").attr('disabled', false);
                    alert('Invalid Username/Password!');
                }
                else if (data.RESULT == 'NOT_IN_GROUPS') {
                    $jq1("#btnLogin").val("Login");
                    $jq1("#btnLogin").attr('disabled', false);
                    alert($jq1('#txtUsername').val() + ' does not belongs to any Pump Configurator Tool Groups for selected Role!');
                }
                document.getElementById("loadingDiv").style.display = "none";
            }
            //,
            //error: function (jqXHR, textStatus, errorThrown) {
            //    alert(textStatus + " " + errorThrown);

            //    $jq1("#btnLogin").val("Login");
            //    $jq1("#btnLogin").attr('disabled', false);
            //},        
        });
    }
}
//$jq1(document).on('click', "#btnLogin", function () {
//$jq1("btnLogin").click(function () {
//    var IsReqEventOccured = false;
//    if (!Required("#txtUsername")) { IsReqEventOccured = true; }
//    if (!Required("#txtPassword")) { IsReqEventOccured = true; }

//    if (IsReqEventOccured) { return false; }
//    $jq1("#btnLogin").val("Authenticating");
//    $jq1("#btnLogin").attr('disabled', 'disabled');
//    var remember = "";
//    if ($jq1('#remember:checkbox:checked').length > 0) { remember = "true"; }
//    else { remember = "false"; }
//    var role = ($jq1("#ddRoles").val() == 'Select') ? 0 : $jq1("#ddRoles").val();
//    var Location = ($jq1("#ddLocations").val() == 'Select') ? 0 : $jq1("#ddLocations").val();
//    $jq1.ajax({
//        url: 'ServiceHandler.ashx?CBH=LOGIN',
//        cache: false,
//        async: false,
//        dataType: 'json',
//        data: { Username: $jq1('#txtUsername').val(), Password: $jq1('#txtPassword').val(), Remember: remember, Role: role },
//        success: function (data) {
//            if (data.RESULT == 'LOGIN_OK') {


//                if (role == "Sales") {
//                    //window.location = "Search.aspx";
//                    window.location = "Dashboard.aspx";
//                    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();
//                    document.cookie = "Role" + "=Sales";
//                    document.cookie = "Location" + "=" + $jq1("#ddLocations").val();
//                }
//                else if (role == "Tendering Manager") {
//                    window.location = "Dashboard.aspx";
//                    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();
//                    document.cookie = "Role" + "=Tendering Manager";
//                    document.cookie = "Location" + "=" + $jq1("#ddLocations").val();

//                }
//                else if (role == "View") {
//                    window.location = "Search.aspx";
//                    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();


//                }

//                else {
//                    window.location = "AdminDefault.aspx";
//                    document.cookie = "UserName" + "=" + $jq1('#txtUsername').val();
//                }

//            }
//            else if (data.RESULT == 'LOGIN_FAIL') {
//                $jq1("#btnLogin").val("Login");
//                $jq1("#btnLogin").attr('disabled', false);
//                alert('Invalid Username/Password!');
//            }
//            else if (data.RESULT == 'NOT_IN_GROUPS') {
//                $jq1("#btnLogin").val("Login");
//                $jq1("#btnLogin").attr('disabled', false);
//                alert($jq1('#txtUsername').val() + ' does not belongs to any Pump Configurator Tool Groups for selected Role!');
//                s

//            }
//        }
//        //,
//        //error: function (jqXHR, textStatus, errorThrown) {
//        //    alert(textStatus + " " + errorThrown);

//        //    $jq1("#btnLogin").val("Login");
//        //    $jq1("#btnLogin").attr('disabled', false);
//        //},
//    });
//});
function Logout() {
    if (confirm('Are you sure you want to Logout ?') == true) {
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=LOGOUT',
            cache: false,
            async: true,
            success: function () {
                window.location = 'LogIn.aspx';
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + " " + errorThrown);
            },
        });
    }
}
function Required(element) { var elementParent = $jq1(element).parent('.form-group'); if ($jq1(element).val() == '') { elementParent.addClass('has-error'); return false; } else { elementParent.removeClass('has-error'); return true; } }
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
$jq1(document).ready(function () {
    getAllRoles();
    getAllLocationList();
    if (window.location.href.indexOf("LogIn") > -1) {
        LoadAllLegalEntity();
    }
    //Dashboard
    $jq1("#paraUserName").attr("data-LoginUserId", getCookie("UserName"));
    $jq1(".role").text(getCookie("Role"));
    $jq1(".location").text(getCookie("Location"));
    $jq1(".location").attr("data-locationId", getCookie("LocationId"));
    $jq1(".legalentity").text(getCookie("LegalEntity"));
    $jq1(".legalentity").attr("data-legalentityId", getCookie("LegalEntityId"));
    $jq1(".role").attr("data-roleid", getCookie("RoleId"));
    $jq1(".role").attr("data-pumpType", getCookie("PumpType"));
    if (window.location.href.indexOf("LogIn") == -1) {
        if ($jq1.trim($jq1(".location-code").text()) == '') {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=LOCATIONFROMLOCATIONID',
                cache: false,
                async: false,
                data: { name: getCookie("Location") },
                dataType: 'json',
                success: function (data) {
                    // alert(data[0].LocationCode);
                    //var htmlOptions = "<option value='0'>Select</option>";
                    $jq1(".location-code").text(data[0].LocationCode);

                }
            });
        }
    }


    getUserName();
    LoadModuleAndAccess();
    //SaveUserDetails();
    // $jq1(".location-code").text();
    
});


function getAllLocationList() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETALLLOCATIONS',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            //var htmlOptions = "<option value='0'>Select</option>";
            var htmlOptions = "";
            $jq1.each(data, function (i) {
                htmlOptions += "<option value='" + $jq1.trim(data[i].LocationId) + "'>" + data[i].Location + "</option>";
            });
            $jq1("#ddLocations").html(htmlOptions);
            if (window.location.href.indexOf("LogIn") > -1) {
                $jq1('#ddLocations').select2();
            }
        }
    });
}

function getAllRoles() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETALLROLES',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            //var htmlOptions = "<option value='0'>Select</option>";
            var htmlOptions = "";
            $jq1.each(data, function (i) {
                htmlOptions += "<option value='" + $jq1.trim(data[i].RoleId) + "'>" + data[i].Role + "</option>";

            });
            $jq1("#ddRoles").html(htmlOptions);
            if (window.location.href.indexOf("LogIn") > -1) {
                $jq1('#ddRoles').select2();
            }

        }
    });
}

function LoadLegalEntity() {
    var jsonObj = [];
    var customerData = {};

    customerData["Location"] = $jq1("#ddLocations").val();
    jsonObj.push(customerData);
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=LOADLEGALENTITY',
        cache: false,
        async: false,
        data: {
            data: JSON.stringify(jsonObj)
        },
        dataType: 'html',
        success: function (data) {
            var jsonData = JSON.parse(data);
            var drpLegalEntity = "";

            if (jsonData.length > 0) {
                for (i in jsonData) {
                    drpLegalEntity += "<option value=" + jsonData[i].Id + ">" + jsonData[i].LegalEntityName + "</option>";
                }
            }
            $jq1("#ddLegalEntity").html(drpLegalEntity);
            if (window.location.href.indexOf("LogIn") > -1) {
                $jq1('#ddLegalEntity').select2();
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        },
    });
}

function LoadAllLegalEntity() {
    var jsonObj = [];
    var customerData = {};

    customerData["Location"] = $jq1("#ddLocations").val();
    jsonObj.push(customerData);
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=LOADALLLEGALENTITY',
        cache: false,
        async: false,
        data: {
            data: JSON.stringify(jsonObj)
        },
        dataType: 'html',
        success: function (data) {
            var jsonData = JSON.parse(data);
            var drpLegalEntity = "";

            if (jsonData.length > 0) {
                for (i in jsonData) {
                    drpLegalEntity += "<option value=" + jsonData[i].Id + ">" + jsonData[i].LegalEntityName + "</option>";
                }
            }
            $jq1("#ddLegalEntity").html(drpLegalEntity);
            if (window.location.href.indexOf("LogIn") > -1) {
                $jq1('#ddLegalEntity').select2();
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        },
    });
}
function FormatMonthInDigits(m) {
    var d = new Date();
    var month = new Array();
    if (m == 1)
        return "01";
    if (m == 2)
        return "02";
    if (m == 3)
        return "03";
    if (m == 4)
        return "04";
    if (m == 5)
        return "05";
    if (m == 6)
        return "06";
    if (m == 7)
        return "07";
    if (m == 8)
        return "08";
    if (m == 9)
        return "09";
    if (m == 10)
        return "10";
    if (m == 11)
        return "11";
    if (m == 12)
        return "12"
}
function FormatMonth(m) {
    var d = new Date();
    var month = new Array();
    if (m == 1)
        return "Jan";
    if (m == 2)
        return "Feb";
    if (m == 3)
        return "Mar";
    if (m == 4)
        return "Apr";
    if (m == 5)
        return "May";
    if (m == 6)
        return "Jun";
    if (m == 7)
        return "Jul";
    if (m == 8)
        return "Aug";
    if (m == 9)
        return "Sep";
    if (m == 10)
        return "Oct";
    if (m == 11)
        return "Nov";
    if (m == 12)
        return "Dec"
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function getUserName() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETUSERNAME',
        cache: false,
        async: false,
        data: { Username: $jq1('#txtUsername').val() },
        dataType: 'html',
        success: function (data) {
            $jq1(".username").text(data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $jq1(".username").text(getCookie("UserName"));
        },
    });
}

function CheckUser() {
    var jsonObj = [];
    var customerData = {};

    customerData["UserName"] = $jq1("#txtUsername").val();
    jsonObj.push(customerData);
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=CHECKUSER',
        cache: false,
        async: false,
        data: {
            data: JSON.stringify(jsonObj)
        },
        dataType: 'html',
        success: function (data) {
            //var jsonData = JSON.parse(data);

            if (data == "User does not exist") {
                alert(data);
            }
            else if (data == $jq1("#txtUsername").val()) {
                getAllRoles();
                getAllLocationList();
            }
            else {
                if (data == "Exist") {
                    LoadLocationAndRole();
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        },
    });
}

function LoadLocationAndRole() {
    var jsonObj = [];
    var customerData = {};

    customerData["UserName"] = $jq1("#txtUsername").val();
    jsonObj.push(customerData);
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=LOADLOCATIONADNROLE',
        cache: false,
        async: false,
        data: {
            data: JSON.stringify(jsonObj)
        },
        dataType: 'html',
        success: function (data) {
            var jsonData = JSON.parse(data);
            var drpRoles = "";
            var drpLocations = "";

            if (jsonData.Table1.length > 0) {
                for (i in jsonData.Table1) {
                    if (jsonData.Table1[i].Sales == true) {
                        drpRoles += "<option value=1>Sales Engineer</option>";
                    }
                    if (jsonData.Table1[i].TenderEngineer == true) {
                        drpRoles += "<option value=3>Tender Engineer</option>";
                    }
                    if (jsonData.Table1[i].TenderingManager == true) {
                        drpRoles += "<option value=2>Tendering Manager</option>";
                    }
                    if (jsonData.Table1[i].Admin == true) {
                        drpRoles += "<option value=6>Admin</option>";
                    }
                    if (jsonData.Table1[i].Viewer == true) {
                        drpRoles += "<option value=7>Viewer</option>";
                    }
                    if (jsonData.Table1[i].SalesManager == true) {
                        drpRoles += "<option value=7>Sales Manager</option>";
                    }
                }
            }
            $jq1("#ddRoles").html(drpRoles);

            if (jsonData.Table.length > 0) {
                for (i in jsonData.Table) {
                    drpLocations += "<option value=" + jsonData.Table[i].Id + ">" + jsonData.Table[i].Location + "</option>";
                }
            }
            $jq1("#ddLocations").html(drpLocations);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        },
    });
}

function SaveUserDetails() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETUSERPROFILE',
        cache: false,
        async: false,
        data: {
            role: getCookie("Role")
        },
        dataType: 'json',
        success: function (data) {
            //$jq1("#txtHandledBy").val(data[0].UserName);
            //$jq1("#txtEmailAddress").val(data[0].EmailAddress);

            //if (data[0].PhoneNumber != "") {
            //    $jq1("#txtPhoneDirect").val(data[0].PhoneNumber);
            //}

            //if (data[0].Role == null) {
            //    $jq1("#txtJobDescription").val(getCookie("Role"));
            //}
            //else {
            //    $jq1("#txtJobDescription").val(data[0].Role);
            //}
            //PSNumber = data[0].PSNumber;
            //$jq1("#txtHandledBy").attr("disabled", true);
            //$jq1("#txtJobDescription").attr("disabled", true);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
    });
}
//TENDER MANAGEMENT ACCORDION WITH TABLE
$jq1(document).on("click", ".parent-row", function () {
    var elem = $jq1(this);
    if (!elem.hasClass("opened")) {
        $jq1(".parent-row").removeClass("opened");
        elem.addClass("opened");
        $jq1(".details-grid").removeClass("active").slideUp();
        elem.next(".inner-details").find(".details-grid").addClass("active").slideDown();
    }
    else {
        elem.removeClass("opened");
        elem.next(".inner-details").find(".details-grid").removeClass("active").slideUp();
    }

});

/*------------ COMMON JS STARTS -----------*/

//Context menu
function ShowContextMenu(control, e) {
    var posx = e.clientX + window.pageXOffset + 'px'; //Left Position of Mouse Pointer
    var posy = e.clientY + window.pageYOffset + 'px'; //Top Position of Mouse Pointer
    document.getElementById(control).style.position = 'absolute';
    document.getElementById(control).style.display = 'inline';
    document.getElementById(control).style.left = posx;
    document.getElementById(control).style.top = posy;
}

function HideContextMenu(control) {
    document.getElementById(control).style.display = 'none';
}

/*------------ COMMON JS STARTS -----------*/