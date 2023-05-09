<%@ page title="" language="C#" masterpagefile="~/MasterPage.master" autoeventwireup="true" CodeFile="Default.aspx.cs" inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    
        

      
    
           <div class="primary-container">
               <div class="breadcrumb">
                   <ul>
                       <li><a href="/">Tender Management</a></li>
                       <li>New Tender</li>
                   </ul>
               </div>
                   <div class="legendWrapper">
                       <h2>New Tender</h2>
               <div id="parameters">
               </div>
                       </div>
               
           </div>
                             
       

   <script src="Scripts/jquery-ui-1.10.0.min.js"></script>

      
    <script type="text/javascript">
/******------------------------------------- SAVE AND CONTINE LOGIC STARTS ---------------------------------------****/
        $(document).on("click", ".dynamic-content-wrapper #btn-primary", function () {
            if ($(".wizard li.current").next('li').find("a").attr("href") != "#Review") {
                $(".dynamic-content-wrapper input[type='text']").each(function () {
                    /**------ JQuery Validation for the form fields ------*/
                    if ($(this).val() == null || $.trim($(this).val()) == '')
                        $(this).parents('.form-group').addClass("validate");
                    else
                        $(this).parents('.form-group').removeClass("validate");

                });
                /**------ Styling based on the submission of the filled form data ------*/
                if ($(".dynamic-content-wrapper .validate").length <= 0) {
                    $(".wizard li.current").addClass('completed').addClass("enableClick").removeClass("current disabled");
                    $(".wizard li").removeClass("current");
                    $(".wizard li.completed").last().next('li').first().addClass('active enableClick current').removeClass("disabled");
                    LoadWizardData($(".wizard li.completed").last().next('li').data('id'), $(".wizard li.current span.text"));
                }
            }
            else {
                $(".dynamic-content-wrapper input[type='text']").each(function () {
                    /**------ JQuery Validation for the form fields ------*/
                    if ($(this).val() == null || $.trim($(this).val()) == '')
                        $(this).parents('.form-group').addClass("validate");
                    else
                        $(this).parents('.form-group').removeClass("validate");

                });
                /**------ Styling based on the submission of the filled form data ------*/
                if ($(".dynamic-content-wrapper .validate").length <= 0) {
                    $(".wizard li.current").addClass('completed').addClass("enableClick").removeClass("current disabled");
                    $(".wizard li").removeClass("current");
                    $(".wizard li.completed").last().next('li').first().addClass('active enableClick current').removeClass("disabled");
                    LoadReviewData($(".wizard li.current span.text"));

                    $("#btn-primary").text("Review & Submit");
                }
            }
        });
/******-------------------------------------- SAVE AND CONTINE LOGIC ENDS ---------------------------------------------****/

/******------------------------------------- WIZARD LOGIC STARTS ---------------------------------------****/
        $(document).on("click", ".wizard li", function (event) {
           if($(this).hasClass("disabled"))
          event.stopPropagation();
        });
        $(document).on("click", ".wizard li.enableClick:not(.disabled)", function (event) {
            event.preventDefault();
           // event.stopPropagation();
            var elem = $(this).find('span.text');
            if ($(this).find("a").attr("href") != "#Review")
                LoadWizardData($(this).data("id"), elem);
            else
            {
                LoadReviewData($(".wizard li.current span.text"));

                $("#btn-primary").text("Review & Submit");
            }
        });
       
        $(document).ready(function () {
                GetFrameChanged();
        });
        /////Load Screen With Bootstarp Read
        function LoadWizardData(_id, elemId) {
            var htmlForm = '';
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=WIZARDDATA',
                type: "POST",
                async: false,
                dataType: 'json',
                data: { id: _id },
                success: function (data) {
                    $.each(data, function () {
                        htmlForm += "<div class='form-group'>";
                        var flagDropdown;
                        var dropdownValues;
                        var label;
                        var _id;
                        $.each(this, function (k, v) {
                            if (k == "Label")
                                _id = v.replace(/\s/g, '');
                            htmlForm += (k == "Label") ? ("<label for='#" + _id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-') + "'>" + v + "</label>") : '';
                            htmlForm += (k == "FieldType") ? ((v == "textbox") ? "<input type='text' id='" + _id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-') + "' />" : ((v == "dropdown") ? '<select id="' + _id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-') + '"><option>Select</option></select>' : '')) : '';
                        });
                        htmlForm += "</div>";
                    }); 
                    htmlForm += "<a href='javascript:;' id='btn-primary'>Save & Continue</a>";
                    $(".dynamic-content-wrapper").html(htmlForm);
                    generateDropDownValues(data);
                    $(".section-heading").html(elemId.text());

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
            });

        }
        function LoadReviewData(elemId) {
            var htmlForm = '';
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=REVIEW',
                type: "POST",
                async: false,
                dataType: 'json',
                success: function (data) {
                    $.each(data, function () {
                        htmlForm += "<div class='form-group'>";
                        var flagDropdown;
                        var dropdownValues;
                        var label;
                        var _id;
                        $.each(this, function (k, v) {
                            if (k == "Label")
                                _id = v.replace(/\s/g, '');
                            htmlForm += (k == "Label") ? ("<label for='#" + _id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-') + "'>" + v + "</label>") : '';
                            htmlForm += (k == "FieldType") ? ((v == "textbox") ? "<input type='text' id='" + _id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-') + "' />" : ((v == "dropdown") ? '<select id="' + _id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-') + '"><option>Select</option></select>' : '')) : '';
                        });
                        htmlForm += "</div>";
                    });
                    htmlForm += "<a href='javascript:;' id='btn-primary'>Save & Continue</a>";
                    $(".dynamic-content-wrapper").html(htmlForm);
                    generateDropDownValues(data);
                    $(".section-heading").html(elemId.text());

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
            });

        }
        function generateDropDownValues(data) {
            var flagDropdown;
            var dropdownValues;
            var label;
            var _id;
            var dropDownHTML;
            $.each(data, function () {
                $.each(this, function (k, v) {

                    dropDownHTML = '';
                    if (k == "Label")
                        _id = v.replace(/\s/g, '');
                    if (k == "FieldType") {
                        if ((v == "dropdown"))
                            flagDropdown = true;
                    }
                    if (k == "MultipleFieldValues") {
                        if (flagDropdown) {
                            if (v != null) {
                                a = v.split(",");

                                $.each(a, function (i) {
                                    dropDownHTML += "<option value='" + a[i] + "'>" + a[i] + "</option>";
                                    //console.log(a[i]);
                                });
                                console.log(_id);
                                $("#" + _id.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-')).html(dropDownHTML);
                            }


                        }


                    }
                });
            });


        }
        /////Load Screen With Bootstarp Read
        function GetFrameChanged() {
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=FRAMECHANGE',
                type: "POST",
                async: true,
                dataType: 'html',
                success: function (data) {
                    $('#parameters').html(data);
                    $('[data-toggle="tooltip"]').tooltip();
                    console.log("Load Data:" + data);
                    $("h1").append($(".wizard li.current span:last-child").text());
                    // $("#parameters li:first-child").trigger("click");
                    LoadWizardData($("#parameters li:first-child").data("id"), $(".wizard li.current span.text"));
                    $("#parameters li:first-child").addClass("active");
                    $("#parameters li:not(:first-child)").addClass("disabled");
                    // Validaton(0);

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
            });

        }
/******------------------------------------- WIZARD LOGIC ENDS ---------------------------------------****/

     
        ////Load Motor Data in Array
        var PumpName = new Array();
        ////Set JobOrderId for Edit Mode
        var JobOrderId = 0;
        var Data;
        ////Set Value Which is come in Display is in Edit Mode 
        var Clone = 0;
        var DuplicateOrder = 0;
        ///Read Name From Cookie
        ////function getCookiesMap(cookiesString) {
        //    return cookiesString.split(";")
        //        .map(function (cookieString) {
        //            return cookieString.trim().split("=");
        //        })
        //        .reduce(function (acc, curr) {
        //            acc[curr[0]] = curr[1];
        //            return acc;
        //        }, {});
        //}

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
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

        ////Change Unit Based On Combo Selection
        var ChangeUnit = function () {

            var ele = document.getElementsByTagName('td');
            var var1 = document.getElementById("Unit");
            var x = var1.options[var1.selectedIndex].text;
            
            // LOOP THROUGH EACH ELEMENT.
            for (i = 0; i < ele.length; i++) {
                // CHECK THE ELEMENT TYPE.
                //if (ele[i].type == 'text' && ele[i].readOnly == true) {
                    var Name = ele[i].id;
                    if (Name.myStartsWith("Review_UNIT_") == true) {
                        if (x == "Metric") {
                            var reviewUnitMetData = document.getElementById(Name);
                            if (reviewUnitMetData != null)
                                document.getElementById(Name).innerHTML = reviewUnitMetData.getAttribute("Matricunit");
                        }
                        if (x == "Imperial") {
                             var reviewUnitData = document.getElementById(Name);
                             if (reviewUnitData != null)
                            document.getElementById(Name).innerHTML = reviewUnitData.getAttribute("Impirialunit");
                        }   

                        if (x == "Select Unit") {
                             var reviewUnitData = document.getElementById(Name);
                             if (reviewUnitData != null)
                            document.getElementById(Name).innerHTML = "";
                        }   
                    }

                    if (Name.myStartsWith("UNIT_") == true) {
                         if (x == "Metric") {
                             var UnitMetData = document.getElementById(Name);
                             if (UnitMetData != null)
                             document.getElementById(Name).innerHTML =UnitMetData.getAttribute("Matricunit");
                        }

                       if (x == "Imperial"){
                              var UnitData = document.getElementById(Name);
                             if (UnitData != null)
                               document.getElementById(Name).innerHTML = UnitData.getAttribute("Impirialunit");
                        }

                         if (x == "Select Unit") {
                             var UnitData = document.getElementById(Name);
                             if (UnitData != null)
                            document.getElementById(Name).innerHTML = "";
                        }   
                    }
            }
        }

        ////StartWith String Function
        String.prototype.myStartsWith = function (str) {
            if (this.indexOf(str) === 0) {
                return true;
            } else {
                return false;
            }
        };

    

        function GetJobOrderData(val)
        {
            var unit;
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETJOBORDERDATA',
                    type: "POST",
                    async: false,
                    dataType: 'html',
                    data: { Id: ( + val) },
                    success: function (data) {
                        var Find = data.split('?');
                        $('#parameters').html(Find[0]);
                       
                        $('[data-toggle="tooltip"]').tooltip();
                        Validaton(0);
                      
                        if (Clone == 1) {
                            var OldOrder = document.getElementById("ORDERNO").value;
                            document.getElementById("ORDERNO").value = "";
                            $("#ORDERNO").attr("readonly", false);
                            document.getElementById("txtOrderNo").value = "";
                            document.getElementById("Review_ORDERNO").value = "";
                            document.getElementById("NOTE").value = "Order Clone From " + OldOrder + " .";
                            document.getElementById("Review_NOTE").value = "Order Clone From " + OldOrder + " .";
                            document.getElementById("txtCloneOrderNo").value = OldOrder ;
                            var x = document.getElementById("DivOpenSession").style.display="none";
               
                           // $("#openSession").attr('readonly', true);
                            JobOrderId = 0;
                            document.cookie = "Clone" + "=" +Clone;
                        }
                        else {
                            var var1 = document.getElementById("ORDERNO").value;
                            document.getElementById("txtOrderNo").value = var1;
                            var x = document.getElementById("DivOpenSession").style.display = "none";
                            GETCLONENO(val);
                           // $("#openSession").attr('readonly', true);
                            document.cookie = "Clone" + "=" +Clone;
                        }
                        Clone = 0;
                        
                        if (Find[1] == "Imperial") {
                           
                            unit=1;
                        }
                        if (Find[1] == "Metric") {
                          
                            unit=2;
                        }
                        document.cookie = "UnitVal" + "=" + unit;
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + " " + errorThrown);
                    },
            });
            
           
        }


         ////On Selection of Pump Sub Pump Load
        var GETCLONENO = function (val) {

                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=GETCLONEORDERNO',
                        type: 'post',

                        cache: false,
                        async: false,
                        dataType: 'html',
                        data: { Id: val },
                        success: function (data) {
                             console.log(data);
                           
                           
                                document.getElementById("txtCloneOrderNo").value = data ;
                           
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });
                
        }

        ///Copy Text from Input to review Input
        var copy = function (var1) {
            var Name = "Review_" + var1.id;
            document.getElementById(Name).value = var1.value;
            if (var1.id == "ORDERNO") {
                document.getElementById("txtOrderNo").value=var1.value;
            }
            if (var1.id == "MT_PAD_WID") {
                //document.getElementById("MT_PAD_EDGE_DIST_BP_CL").value = Number(var1.value) / 2;
                //document.getElementById("Review_MT_PAD_EDGE_DIST_BP_CL").value= Number(var1.value) / 2 ;
            }
            if (var1.id == "DRW_PUMP_WEG" || var1.id == "DRW_MOTOR_WEG" || var1.id == "DRW_BP_WEG" || var1.id == "DRW_AUX_WEG") {
                var Sum = Number(document.getElementById("DRW_PUMP_WEG").value) + Number(document.getElementById("DRW_MOTOR_WEG").value) + Number(document.getElementById("DRW_BP_WEG").value) + Number(document.getElementById("DRW_AUX_WEG").value);
                document.getElementById("DRW_TOTAL_WEG").value = Sum;
                document.getElementById("Review_DRW_TOTAL_WEG").value = Sum;
                if (var1.id == "DRW_AUX_WEG") {
                    LIFTINGLUGDESHVALUE();
                }
            }

            if (var1.id == "DBBRACKETFACETOENDOFPUMPSHAFT") {
                FindValueForBPLength();
            }

           

            

            if (var1.id == "MT_TYPE")
            {
                // var PumpName = ["MDD1002771050010-01_Driven Dimensions","MDD1002837660010-01_Driven Dimensions (1)","MDD1002883480010-01_Driven Dimensions","MDD1002956040010-01_Driven Dimensions","MDD1003035990010-01_Driven Dimensions"];
        
                autocomplete(var1, PumpName);
            }

        }

        ////Copy Text from Select To Review Input
        var copyCmb = function (var1) {
            if (jQuery.type(var1.id) === "undefined") { return; }
            
            var Name = "Review_" + var1.id;
            var Hidetxt = "txt" + var1.id;
              
                var x = var1.options[var1.selectedIndex].text;
                document.getElementById(Name).value = x;
                document.getElementById(Hidetxt).value = x;
            
            if (var1.id == "PUMP_SUB_TYPE") {
                var Up1 = var1.options[var1.selectedIndex].getAttribute("Up1");
                document.getElementById("PUMP_CEN_HEI").value = Up1;
                document.getElementById("Review_PUMP_CEN_HEI").value = Up1;

            }

            if (var1.id == "BP_WIDTH") {
                ChangeValueInGrouthhole(var1)
            }
            if (var1.id == "BASEPLATETYPE") {
                {
                    RemoveAtr(var1.options[var1.selectedIndex].text)

                }
            }
        }

        ///Set Lube input to Read only
        var RemoveAtr = function (Value) {
            if (Value == "Lube") {
                document.getElementById('LOSLENGTH').removeAttribute('readonly');
            }
            else {
                document.getElementById('LOSLENGTH').setAttribute('readonly');
                document.getElementById('LOSLENGTH').value = 0;
            }
        }

        ////On Selection of Pump Sub Pump Load
        var SubPumpDataLoad = function (val) {

                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=LOADSubPUMPJson',
                        type: 'post',

                        cache: false,
                        async: true,
                        dataType: 'html',
                        data: { Id: ( + val.value) },
                        success: function (data) {
                            $("#PUMP_SUB_TYPE").empty();
                            var json_obj = $.parseJSON(data);//parse JSON
                            
                            var markup = "<option value=''>--Select--</option>";
                            
                        for(var i in json_obj)
                            {
                               
                               // markup += "<option class='option' value=' " + json_obj[i].Id + "' text='" + json_obj[i].MSDSize + "'>" + json_obj[i].MSDSize + "</option>";
                            markup += "<option class='option' Vp=' " + json_obj[i].Vp + "' Up1=' " + json_obj[i].Up1 + "' value=' " + json_obj[i].Id + "' text='" + json_obj[i].MSDSize + "'>" + json_obj[i].MSDSize + "</option>";
                            }
                            $("#PUMP_SUB_TYPE").html(markup).show();

                           
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });
                
        }

        ////On Selection of Pump Sub Pump Load When Open XML
         var SubPumpDataLoadForXML = function (val) {

                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=LOADSubPUMPJson',
                        type: 'post',

                        cache: false,
                        async: false,
                        dataType: 'html',
                        data: { Id: ( + val.value) },
                        success: function (data) {
                            $("#PUMP_SUB_TYPE").empty();
                            var json_obj = $.parseJSON(data);//parse JSON
                            
                            var markup = "<option value=''>--Select--</option>";
                            
                        for(var i in json_obj)
                            {
                               
                                markup += "<option class='option' Vp=' " + json_obj[i].Vp + "' Up=' " + json_obj[i].Up + "' value=' " + json_obj[i].Id + "' text='" + json_obj[i].MSDSize + "'>" + json_obj[i].MSDSize + "</option>";
                            }
                            $("#PUMP_SUB_TYPE").html(markup).show();

                           
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });
                
        }

        ////Change Pump Imgae Based on Pump Combo 
        var changeImgandComboValueCmb = function (var1) {
            var x = document.getElementById("PumpPump_Modelpartimage");
            var x1 = document.getElementById("PumpPump_ModelImageAnchor");

             $.ajax({
                        url: 'ServiceHandler.ashx?CBH=LOADIMAGES',
                        type: 'post',

                        cache: false,
                        async: true,
                        dataType: 'html',
                        data: { Id: ( + var1.value)},
                        success: function (data) {
                         
                            var json_obj = $.parseJSON(data);//parse JSON
                            
                           var PumpName = var1.options[var1.selectedIndex].text;
                            
                            for (var i in json_obj) {
                               

                                if (PumpName != json_obj[i].Name)
                                    continue;

                                if (PumpName == "MSD") {
                                    x.getAttributeNode("src").value = "Images/"+ json_obj[i].Image+".jpg";
                                    x1.getAttributeNode("href").value = "Images/" + json_obj[i].Image + ".jpg";
                                    SubPumpDataLoad(document.getElementById(var1.id))
                                    ChangeVisibility(document.getElementById(var1.id))
                                }

                                if (PumpName == "MSD-D") {
                                    x.getAttributeNode("src").value = "Images/"+json_obj[i].Image +".jpg";
                                    x1.getAttributeNode("href").value = "Images/" + json_obj[i].Image + ".jpg";
                                    SubPumpDataLoad(document.getElementById(var1.id))
                                    ChangeVisibility(document.getElementById(var1.id))
                                }
                                if (PumpName == "MSD2") {
                                    x.getAttributeNode("src").value = "Images/"+json_obj[i].Image +".jpg";
                                    x1.getAttributeNode("href").value = "Images/" + json_obj[i].Image + ".jpg";
                                    SubPumpDataLoad(document.getElementById(var1.id))
                                    ChangeVisibility(document.getElementById(var1.id))
                                }

                                if (PumpName == "MSD2-D") {
                                    x.getAttributeNode("src").value = "Images/"+json_obj[i].Image +".jpg";
                                    x1.getAttributeNode("href").value = "IImages/" + json_obj[i].Image + ".jpg";
                                    SubPumpDataLoad(document.getElementById(var1.id))
                                    ChangeVisibility(document.getElementById(var1.id))
                                }

                                if (PumpName == "USER") {
                                    x.getAttributeNode("src").value = null;
                                    x1.getAttributeNode("href").value = null;
                                       ChangeVisibility(document.getElementById(var1.id))
                                }

                            }
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });

            copyCmb(var1);
    
        }

        ////Generate Excel File Of Input
        function jsonDataGet() {
                var tblCommon = $("#Review_Parameters");
                var common = new Object();
                var Commondata = [];
             var test = [];
                var Description = "Description";
                var value = "value";
             var Symbol = "Symbol";
             var Unit = "Unit";
             tblCommon.find('tbody tr').each(function (i) {
                 var $tds = $(this).find('td');
                 //if ($tds.find('input').val() != null && $tds.find('input').val() != "") {
                    
                 common.Description = $tds.eq(0).text();
                 
                     common.Symbol = $tds.eq(3).text();
                 common.valu = $tds.find('input').val();
                common.Unit = $tds.eq(2).text();
                
                 Commondata.push({ Description: common.Description, Symbol: common.Symbol, valu: common.valu, Unit: common.Unit });
                   
                 //}
             });

                if (tblCommon != null) {
                    $.ajax({
                        url: "ServiceHandler.ashx?CBH=COMMONPARSE",
                        cache: false,
                        async: true,
                        data: JSON.stringify(Commondata),
                        success: function (data) {
                            if (data == '') {
                                window.location = "ExportMemStrm.aspx";
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert(textStatus + " " + errorThrown);
                        },
                    });
                }
                
            }

        ////change Visisblity But Not in Use
        var ChangeVisibility = function (var1) {
            var ele = document.getElementsByTagName('tr');
            var selectValue = var1.options[var1.selectedIndex].text;
           // selection = $(var1).val();
            for (i = 0; i < ele.length; i++) {

                // CHECK THE ELEMENT TYPE.
                //if (ele[i].type == 'text' && ele[i].readOnly == true) {
                var Name = ele[i].id;
                //var ui = selection;
               
                if (selectValue == "USER") {
                    if (Name.myStartsWith("Hide_") == true) {
                        document.getElementById(Name).style.visibility = "visible";
                        document.getElementById("tblRow_PUMP_SUB_TYPE").style.visibility = "collapse";
                         //var selection = x.id;
                    }
                   if (Name.myStartsWith("Review_Hide_MANUAL_") == true) {
                        document.getElementById(Name).style.visibility = "visible";
                       // document.getElementById("tblRow_PUMP_SUB_TYPE").style.visibility = "collapse";
                         //var selection = x.id;
                    }
                }
                else {
                    if (Name.myStartsWith("Hide_") == true) {
                        document.getElementById(Name).style.visibility = "collapse";
                        document.getElementById("tblRow_PUMP_SUB_TYPE").style.visibility = "visible";
                         //var selection = x.id;
                    }
                    if (Name.myStartsWith("Review_Hide_MANUAL_") == true) {
                        document.getElementById(Name).style.visibility = "collapse";
                       // document.getElementById("tblRow_PUMP_SUB_TYPE").style.visibility = "collapse";
                         //var selection = x.id;
                    }
                }

            }
   
        }

        ////This function use for Generate XML file and store in DB and Open that File in Window app thorw web
        function GenerateAndSaveXML(Val) {
            var var1 = document.getElementById("Unit");
            var var2 = document.getElementById("ORDERNO");
            var x = var1.options[var1.selectedIndex].text;
            var Mes = "";

            if (x == "Select Unit") {
              
                ShowDanger('Select Unit!');
                return;
            }
            else {
                Mes = Validaton(1);
                //a = a.id;
                 if (Mes != "") {

               ShowDanger('Please Fill Required Fields.....!');
                return;
                }
           }

           
           if (var2.value == "") {
               
               ShowDanger('Enter Order No!');
                return;
           }

            if (Mes == "") {
                var postData = "<?xml version=\"1.0\"?>\n";
                postData += "<configuration Unit=\"" + $("#Unit option:selected").text() + "\">\n";

                var maintabs = $("#main").attr("maintabs").split(",");
                var count = 0;
                for (var i = 0; i < maintabs.length - 1; i++) {
                    postData += "<Tab name=\"" + maintabs[i].split("_").join(" ") + "\">\n";
                    var subtabs = $('#' + maintabs[i]).attr("subtabs").split(",");
                    subtabs = subtabs.filter(function (v) { return v !== '' });
                    if (subtabs.length > 0) {
                        for (var j = 0; j < subtabs.length; j++) {
                            postData += "<SubTab name=\"" + subtabs[j].split("_").join(" ") + "\">\n";
                            $('.expressions' + maintabs[i] + subtabs[j]).each(function () {
                                // if ($(this).attr('parametername') == "") {
                                var ExpName = $(this).attr('expression');
                                var fieldvalue = document.getElementById('UNIT_' + ExpName).innerHTML;


                                postData += "<Expression name=\"" + $(this).attr('expression') + "\" symbol=\"" + $(this).attr('parametername') + "\" value=\"" + $(this).val() + "\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                //}
                                //else {
                                //    postData += "<Expression name=\"" + $(this).attr('expression') + "\" symbol=\"" + $(this).attr('parametername') + "\" value=\"" + $(this).val() + "\" ></Expression>\n";
                                //}
                                var Name = $(this).attr('id');

                                if (Name == "txtPUMP_ROT") {
                                    if($(this).val()=="CCW")
                                        postData += "<Expression name=\"PUMP_ROTATION\" symbol=\"PUMP_ROTATION\" value=\"0\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    else
                                        postData += "<Expression name=\"PUMP_ROTATION\" symbol=\"PUMP_ROTATION\" value=\"1\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    //postData += AddString;
                                }

                                if (Name == "txtDRIVE_BOX_SIDE_1") {
                                    if($(this).val()=="Left")
                                        postData += "<Expression name=\"DRIVE_BOX_SIDE\" symbol=\"DRIVE_BOX_SIDE\" value=\"1\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    else
                                        postData += "<Expression name=\"DRIVE_BOX_SIDE\" symbol=\"DRIVE_BOX_SIDE\" value=\"0\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    //postData += AddString;
                                }

                                

                                if (Name == "txtPUMP_SUB_TYPE") {
                                    var AddString = GetPivotData(Name, $(this).val())
                                    postData += AddString;
                                }

                                if (Name == "txtBP_SIDERAIL") {
                                    var AddString1 = GetPivotData(Name, $(this).val())
                                    postData += AddString1;
                                }

                                if (Name == "txtBP_X_MEM") {
                                    var AddString1 = GetPivotData(Name, $(this).val())
                                    postData += AddString1;
                                }

                                if (Name == "txtBP_LENGTH") {
                                    var AddStringdata = GetPivotData(Name, $(this).val())
                                    postData += AddStringdata;
                                    var AddString2 = GenerateValueForTP(Name,1)
                                    postData += AddString2;
                                }

                                 if (Name == "txtBP_PLATE_THICKNESS") {
                                    var AddStringdata = GetPivotData(Name, $(this).val())
                                    postData += AddStringdata;
                                   
                                }
                                
                                if (Name == "MT_PAD_WID") {
                                    var AddString2 = GenerateValueForbP(Name,1)
                                    postData += AddString2;
                                }

                                  if (Name == "MT_PAD_OD_WID") {
                                    var AddString2 = GenerateValueForbN(Name,1)
                                    postData += AddString2;
                                }

                                 if (Name == "MT_PAD_LEN") {
                                    var AddString2 = GenerateValueForbD(Name,1)
                                    postData += AddString2;
                                }

                                 if (Name == "txtBP_LIFTLUG_DASH_NO") {
                                    var AddString1 = GetPivotData(Name, $(this).val())
                                    postData += AddString1;
                                }

                                if (maintabs[i] == "BasePlate") {

                                    if (count == 0 && x == "Metric") {

                                        var AddString3 = GetPivotData("Angle_Box", "2")
                                        postData += AddString3;
                                        var AddString4 = GetPivotData("DriprimAngle", "2")
                                        postData += AddString4;
                                        count = 1;
                                        var WpValue = GenerateValueForWp(1);

                                        postData += WpValue;

                                    }
                                    if (count == 0 && x == "Imperial") {

                                        var AddString5 = GetPivotData("Angle_Box", "1")
                                        postData += AddString5;
                                        var AddString6 = GetPivotData("DriprimAngle", "1")
                                        postData += AddString6;
                                        count = 1;
                                        var WpValue = GenerateValueForWp(1);

                                        postData += WpValue;

                                    }
                                    count = 1;



                                }
                            });

                            postData += "</SubTab>\n";
                        }
                    }
                    postData += "</Tab>\n";
                }
                postData += "</configuration>";
                var Id = "";
                var UserName = "";
                var path = "";
                
                
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=SAVEASSEMBLYSESSION',
                    cache: false,
                    async: false,

                    data: { xmlString: encodeURIComponent(postData) },
                    success: function (data) {
                        if (data != '') {
                            Id = data.split(',')[0];
                            UserName = data.split(',')[1];
                            path = data.split(',')[2];
                            //window.location = "ExportMemStrm.aspx";

                        }
                        //else {
                        //    id = data.value;
                        //    
                        //}
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + " " + errorThrown);
                    },
                });

                if (Val==1)
                    RunExe(Id, UserName, path,"CREATE")
                else
                    RunExe(Id, UserName, path,"MODIFY")
            }
        }

        /////This function use for Generate XML file so user store it on System
        function GenerateXML(){
            var var1 = document.getElementById("Unit");
            var var2 = document.getElementById("ORDERNO");
            var x = var1.options[var1.selectedIndex].text;
             var Mes = "";

            if (x == "Select Unit") {
              
                ShowDanger('Select Unit!');
                return;
            }
            else {
                Mes = Validaton(1);
                //a = a.id;
                 if (Mes != "") {

                     ShowDanger('Please Fill Required Fields.....!');
                return;
                }
                
           }

           
           if (var2.value == "") {
               
               ShowDanger('Enter Order No!');
                return;
           }

            if (Mes == "") {
                var postData = "<?xml version=\"1.0\"?>\n";
                postData += "<configuration Unit=\"" + $("#Unit option:selected").text() + "\">\n";

                var maintabs = $("#main").attr("maintabs").split(",");
                var count = 0;
                for (var i = 0; i < maintabs.length - 1; i++) {
                    postData += "<Tab name=\"" + maintabs[i].split("_").join(" ") + "\">\n";
                    var subtabs = $('#' + maintabs[i]).attr("subtabs").split(",");
                    subtabs = subtabs.filter(function (v) { return v !== '' });
                    if (subtabs.length > 0) {
                        for (var j = 0; j < subtabs.length; j++) {
                            postData += "<SubTab name=\"" + subtabs[j].split("_").join(" ") + "\">\n";
                            $('.expressions' + maintabs[i] + subtabs[j]).each(function () {
                                // if ($(this).attr('parametername') == "") {
                                var ExpName = $(this).attr('expression');
                                var fieldvalue = document.getElementById('UNIT_' + ExpName).innerHTML;

                                postData += "<Expression name=\"" + $(this).attr('expression') + "\" symbol=\"" + $(this).attr('parametername') + "\" value=\"" + $(this).val() + "\" unit=\"" + fieldvalue + "\"></Expression>\n";
                                //}
                                //else {
                                //    postData += "<Expression name=\"" + $(this).attr('expression') + "\" symbol=\"" + $(this).attr('parametername') + "\" value=\"" + $(this).val() + "\" ></Expression>\n";
                                //}
                                var Name = $(this).attr('id');

                                 if (Name == "txtPUMP_ROT") {
                                    if($(this).val()=="CCW")
                                        postData += "<Expression name=\"PUMP_ROTATION\" symbol=\"PUMP_ROTATION\" value=\"0\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    else
                                        postData += "<Expression name=\"PUMP_ROTATION\" symbol=\"PUMP_ROTATION\" value=\"1\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    //postData += AddString;
                                }

                                if (Name == "txtDRIVE_BOX_SIDE_1") {
                                    if($(this).val()=="Left")
                                        postData += "<Expression name=\"DRIVE_BOX_SIDE\" symbol=\"DRIVE_BOX_SIDE\" value=\"L\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    else
                                        postData += "<Expression name=\"DRIVE_BOX_SIDE\" symbol=\"DRIVE_BOX_SIDE\" value=\"R\" unit=\"" + fieldvalue + "\" ></Expression>\n";
                                    //postData += AddString;
                                }

                                if (Name == "txtPUMP_SUB_TYPE") {
                                    var AddString = GetPivotData(Name, $(this).val())
                                    postData += AddString;
                                }

                                if (Name == "txtBP_SIDERAIL") {
                                    var AddString1 = GetPivotData(Name, $(this).val())
                                    postData += AddString1;
                                }

                                if (Name == "txtBP_X_MEM") {
                                    var AddString1 = GetPivotData(Name, $(this).val())
                                    postData += AddString1;
                                }

                               if (Name == "txtBP_LENGTH") {
                                    var AddStringdata = GetPivotData(Name, $(this).val())
                                    postData += AddStringdata;
                                    var AddString2 = GenerateValueForTP(Name,1)
                                    postData += AddString2;
                                }

                                if (Name == "txtBP_PLATE_THICKNESS") {
                                    var AddStringdata = GetPivotData(Name, $(this).val())
                                    postData += AddStringdata;
                                   
                                }


                                if (Name == "MT_PAD_WID") {
                                    var AddString2 = GenerateValueForbP(Name,1)
                                    postData += AddString2;
                                }

                                  if (Name == "MT_PAD_OD_WID") {
                                    var AddString2 = GenerateValueForbN(Name,1)
                                    postData += AddString2;
                                }

                                 if (Name == "MT_PAD_LEN") {
                                    var AddString2 = GenerateValueForbD(Name,1)
                                    postData += AddString2;
                                }

                                if (Name == "txtBP_LIFTLUG_DASH_NO") {
                                    var AddString1 = GetPivotData(Name, $(this).val())
                                    postData += AddString1;
                                }

                                

                                if (maintabs[i] == "BasePlate") {

                                    if (count == 0 && x == "Metric") {

                                        var AddString3 = GetPivotData("Angle_Box", "2")
                                        postData += AddString3;
                                        var AddString4 = GetPivotData("DriprimAngle", "2")
                                        postData += AddString4;
                                        count = 1;
                                        var WpValue = GenerateValueForWp(1);

                                        postData += WpValue;

                                    }
                                    if (count == 0 && x == "Imperial") {

                                        var AddString5 = GetPivotData("Angle_Box", "1")
                                        postData += AddString5;
                                        var AddString6 = GetPivotData("DriprimAngle", "1")
                                        postData += AddString6;
                                        count = 1;
                                        var WpValue = GenerateValueForWp(1);

                                        postData += WpValue;

                                    }
                                    count = 1;



                                }
                            });

                            postData += "</SubTab>\n";
                        }
                    }
                    postData += "</Tab>\n";
                }
                postData += "</configuration>";
                var Id = "";
                var UserName = "";
                var path = "";
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=SAVESESSION',
                    cache: false,
                    async: false,

                    data: { xmlString: encodeURIComponent(postData) },
                    success: function (data) {
                        if (data == '') {

                            window.location = "ExportMemStrm.aspx";

                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + " " + errorThrown);
                    },
                });

              

            }
        }

        ////Check all Required has value or not 
        function Validaton(val) {
            var requiredElements = document.getElementById("form1").querySelectorAll("[required]"),
             
                o = document.getElementById("output");
            var Mes = "";

            
            var s = "";
           
                for (var i = 0; i < requiredElements.length; i++) {
                   
                    var e = requiredElements[i];

                    if (e.value.length == 0) {
                        s += e.getAttribute("Validation") + ": " + (e.value.length ? "Filled" : "Not Filled") + "\n";
                        document.getElementById("Review_" + e.id).style.borderColor = "red";
                        // var valid = document.getElementById("Review_" + e.id)
                    }
                    else {
                        document.getElementById("Review_" + e.id).style.borderColor = "";
                    }

                }
            Mes += s;
            if (Mes != "") {
                if(val==1)
                $('.nav-tabs a[href="#Review"]').tab('show')
            }

            return Mes;
            
        }

        ////Call Winodw App 
         function RunExe(Id,Username,path,Ope)   
         {  
             MyObject = new ActiveXObject("WScript.Shell")  
             //var newpath = "file:///C:/PumPconfig/PumpConfiguratorApplication.exe" + " " + Id + " " + Username;
             MyObject.Run("file:///"+path + "  " + Id + " " + Username+ " "+ Ope);  
        }  

        ///Generate Value for WP
         var GenerateValueForWp = function (Flag) {
             var DriverShaftEndtoEndofDriverFoot = document.getElementById("BP_DS_END_TO_DF_END").value;
             var DBSE = document.getElementById("BP_DBSE").value;
             var NozzleCenterlinetoDEBracketFace = document.getElementById("NOZZLECENTERLINETODEBRACKETFACE").value;
             var DEBracketFacetoEndofPumpShaft = document.getElementById("DBBRACKETFACETOENDOFPUMPSHAFT").value;
             var Driverped = document.getElementById("DRIVERPEDFRONTTOL").value;

             var WpValue = 0;

             var Cal = Number(DriverShaftEndtoEndofDriverFoot) + Number(DBSE) + Number(NozzleCenterlinetoDEBracketFace) + Number(DEBracketFacetoEndofPumpShaft);
         
             WpValue = Cal - Number(Driverped);

             if (Flag == 1)
                 return "<Expression name=\"CL Nozzle to Front Edge Motor Pedestal\" symbol=\"Wp\" value=\"" + WpValue + "\" unit=\"\" ></Expression>\n";
             else
                 return WpValue;
           
        }

        ///Generate Value for TP
        var GenerateValueForTP = function (val,Flag) {
             var Length = document.getElementById(val).value;
            var FinalValueTp = ""
             var TpValue = 0;
            var eXX = document.getElementById("LOSLENGTH").value;
            if (Length != "") {
                var Cal = ((Number(Length)- Number(eXX))* 0.00833);
               
                var NewNum = ConvertValue(Cal)
                
               ///Change Done Based on Williams, Andrew Mail On September 01, 2018
                //Old Logic
                //TpValue = NewNum + 0.25;
                //New Logic
                TpValue = NewNum ;
                FinalValueTp = Number(TpValue).toFixed(3);
            }
            if (Flag == 1)
                return "<Expression name=\"Slope Of Pan In 0.125 Increments\" symbol=\"Tp\" value=\"" + FinalValueTp + "\" unit=\"\"></Expression>\n";
            else
                return FinalValueTp;
           
        }

        ///Generate Value for TP Caluctaion
        function ConvertValue(num) {
            ///Splite Value
            var nstring = (num + "");
            var res = nstring.split(".");
            var Newval = 0 + "." + res[1];
            var TotalSum = 0.125;
            while (Number(TotalSum) < Number(Newval)) {
                TotalSum = Number(TotalSum) + 0.125;
            }
            var FinalValue = Number(TotalSum) + Number(res[0]);
            return FinalValue;
        }

        ///Generate Value for bN
        var GenerateValueForbN = function (val,Flag) {
            var Width = document.getElementById(val).value;
            var DrivePedoutsideTol = document.getElementById("DRIVERPEDOUTSIDETOL").value;
           
             var bNValue = 0;
            
            if (Width != "") {
                bNValue = Number(Width) + Number(DrivePedoutsideTol) + Number(DrivePedoutsideTol) ;

            }
            if (Flag == 1)
             return "<Expression name=\"Outside Width of Motor Pads\" symbol=\"bN\" value=\"" + bNValue + "\" unit=\"\"></Expression>\n";
           else
                return bNValue;
        }

        ///Generate Value for bP
         var GenerateValueForbP = function (val,Flag) {
            var Width = document.getElementById(val).value;
            var DrivePedinsideTol = document.getElementById("DRIVERPEDINSIDETOL").value;
           
             var bPValue = 0;
            
            if (Width != "") {
                bPValue = Number(Width) + Number(DrivePedinsideTol)  ;

             }
             if (Flag == 1)
             return "<Expression name=\"Motor Pad Width\" symbol=\"bP\" value=\"" + bPValue + "\" unit=\"\"></Expression>\n";
           else
                return bPValue;
        }

        ///Generate Value for bD
        var GenerateValueForbD = function (val,Flag) {
            var Height = document.getElementById(val).value;
            var DrivePedbackTol = document.getElementById("DRIVERPEDBACKTOL").value;
            var DrivePedfrontTol = document.getElementById("DRIVERPEDFRONTTOL").value;
           
             var bDValue = 0;
            
            if (Height != "") {
                bDValue = Number(Height) + Number(DrivePedbackTol) + Number(DrivePedfrontTol)  ;

            }
            if (Flag == 1)
             return "<Expression name=\"Motor Pad Length\" symbol=\"bD\" value=\"" + bDValue + "\" unit=\"\"></Expression>\n";
            else
                return bDValue;
        }

        ///Open XML file from User System
         function OpenSession() {

            

            var fileUpload = $("#openSession").get(0);
            var files = fileUpload.files;
            var data = new FormData();
            data.append(files[0].name, files[0]);

            var ext = $('#openSession').val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['xml']) == -1) {
                ShowDanger('Please select a valid XML file!');
                return;
            }

            $.ajax({
                url: 'ServiceHandler.ashx?CBH=OPENSESSION',
                type: "POST",
                data: data,
                async: true,
                contentType: false,
                dataType: 'html',
                processData: false,
                success: function (result) {
                    var json_objData = $.parseJSON(result);//parse JSON
                    //var res = result.split("delimeter"); $('#pumpData').html(res[0]); $("#Unit").val(res[1]);
                    var Unit = "";
                    var PumpSubtype = "";
                    for (var i in json_objData) {
                        Unit = json_objData[i].UNIT;
                        

                        var myEle = document.getElementById(json_objData[i].Expression);
                        if (myEle != null) {


                            if(myEle.id=="PUMP_SUB_TYPE")
                        PumpSubtype=json_objData[i].Value;
                           

                            if (myEle.type == "select-one") {

                                for (var j = 0; j < myEle.options.length; j++) {
                                    if (myEle.options[j].text == json_objData[i].Value) {
                                        if (myEle.id == "LOCATION" || myEle.id == "PUMP_ROT" ||  myEle.id == "BASEPLATETYPE" ||  myEle.id == "PUMP_DISCH_ANSI_RF_RTJ" || myEle.id == "PROJECTIONANGLE" || myEle.id == "HOLE_TYPE" || myEle.id == "PUMP_SEAL_MAT" ||  myEle.id == "PUMP_CLASS" || myEle.id == "DRIVE_BOX_SIDE_1") {
                                            var NewValue = myEle.options[j].value;
                                            myEle.value = NewValue;

                                            if (myEle.id == "BASEPLATETYPE")
                                                RemoveAtr(json_objData[i].Value);

                                            break;
                                        }
                                        else {
                                            myEle.selectedIndex = j;
                                            myEle.value = j;
                                            if (myEle.id == "PUMP_TYPE") {
                                                SubPumpDataLoadForXML(myEle);
                                            }
                                            break;
                                        }
                                    }
                                }
                                var myEletxt = document.getElementById("txt" + json_objData[i].Expression);
                                if (myEletxt != null) {
                                    myEletxt.value = json_objData[i].Value;
                                }
                            }
                            else {
                                if(myEle.id!="ORDERNO")
                                  myEle.value = json_objData[i].Value;
                            }
                        }
                        

                        var myEle2 = document.getElementById("Review_" + json_objData[i].Expression);
                        if (myEle2 != null) {
                            if(myEle2.id!="Review_ORDERNO")
                            myEle2.value = json_objData[i].Value;
                           // x = x.id;
                        }

                       
                    }
                    var var1 = document.getElementById("Unit")
                    if (Unit == "Imperial") {
                        var1.value = 1;
                        ChangeUnit();
                    }
                    if (Unit == "Metric") {
                        var1.value = 2;
                        ChangeUnit();
                    }

                    
                    var var2 = document.getElementById("PUMP_SUB_TYPE")
                    
                    if (var2 != null) {
                        
                        for (var a = 0; a < var2.options.length; a++) {
                            //PumpSubtype
                           
                            if (var2.options[a].text == PumpSubtype) {
                                var NewValue = var2.options[a].value;
                                var2.value = NewValue;
                                
                                break;
                            }
                        }
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
            });
        }

        ////Get Data from Tables Sub Columns to Read in XML
        var GetPivotData = function (var1,var2) {
            var NewString="";
              $.ajax({
                  url: 'ServiceHandler.ashx?CBH=LOADPIVOTTABLE',
                  type: 'GET',
                  cache: false,
                  async: false ,
                  dataType: 'html',
                  data: { Id: var1, ObjName: var2 },
                  success: function (data) {
                      var json_objData = $.parseJSON(data);//parse JSON
                      for (var i in json_objData) {
                          
                          NewString += "<Expression name=\"" + json_objData[i].Id + "\" symbol=\"" + json_objData[i].Id + "\" value=\"" + json_objData[i].Value + "\" unit=\"\"></Expression>\n";
                          
                      }
                    
                  },
                  error: function (reponse) {
                      alert("error : " + reponse);
                  }
              });

              return NewString;  
           
        }

        ///Set Grouth Whole File Type Based on Width
        var ChangeValueInGrouthhole = function (var1) {
            //var x = document.getElementById("BP_WIDTH");
            var Width = var1.options[var1.selectedIndex].text;
            var RevName = "GROUTHOLEPATTERNTYPE";
            if (Number(Width) < 38) {
                document.getElementById(RevName).value = "Type A";
                document.getElementById("Review_" + RevName).value = "Type A";
                
            }
            else if (Number(Width) >= 38 && Number(Width) <= 62) {

                document.getElementById(RevName).value = "Type B";
                document.getElementById("Review_" + RevName).value = "Type B";
                
            }
            else if (Number(Width) > 62) {
                document.getElementById(RevName).value = "Type C";
                document.getElementById("Review_" + RevName).value = "Type C";
                
            }
            else {
                 document.getElementById(RevName).value = null;
                document.getElementById("Review_" + RevName).value = null;
                
            }

             
        }

        ////Find BPLength Based on Multipal Inputs
        var FindValueForBPLength = function () {
            //var x = document.getElementById("BP_WIDTH");
            var wP = GenerateValueForWp(0);
            var bD = GenerateValueForbD("MT_PAD_LEN", 0);  
            var var1 = document.getElementById("PUMP_SUB_TYPE");
            var Vp = var1.options[var1.selectedIndex].getAttribute("Vp");
            var FindnewBplength = 8 + Number(wP) + Number(bD) + Number(Vp) + 8;
            GETBPHEIGHTVALUE(FindnewBplength);

        }

        ////Lifting Lug Combo Value Selection
         var LIFTINGLUGDESHVALUE = function () {
          var TotalWeight = document.getElementById("DRW_TOTAL_WEG");
                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=LIFTINGLUGVALUE',
                        type: 'post',

                        cache: false,
                        async: false,
                        dataType: 'html',
                        data: { Id: (+ TotalWeight.value) },
                        success: function (data) {

                            var json_obj = $.parseJSON(data);//parse JSON
                            for (var i in json_obj) {
                                $('#BP_LIFTLUG_DASH_NO').val(json_obj[i].Id);
                                $('#txtBP_LIFTLUG_DASH_NO').val(json_obj[i].Value);
                                $('#Review_BP_LIFTLUG_DASH_NO').val(json_obj[i].Value);
                            }

                           
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });
                
        }

        ////Find BpLength and Set
        var GETBPHEIGHTVALUE = function (val) {
          
                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=GETBPHEIGHTVALUE',
                        type: 'post',

                        cache: false,
                        async: true,
                        dataType: 'html',
                        data: { Id: ( + val) },
                        success: function (data) {

                            var json_obj = $.parseJSON(data);//parse JSON
                            for (var i in json_obj) {
                                $('#BP_LENGTH').val(json_obj[i].Id);
                                $('#txtBP_LENGTH').val(json_obj[i].Value);
                                $('#Review_BP_LENGTH').val(json_obj[i].Value);
                            }

                           
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });
                
        }

      ////Function Auto Complite

        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function (e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            var Name = "Review_" + inp.id;
                            document.getElementById(Name).value = inp.value;
                            var Name = inp.value;
                            SetMotorValue(Name);
                            
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function (e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    /*If the arrow DOWN key is pressed,
                    increase the currentFocus variable:*/
                    currentFocus++;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 38) { //up
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(x);
                } else if (e.keyCode == 13) {
                    /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (x) x[currentFocus].click();
                    }
                }
            });
            function addActive(x) {
                /*a function to classify an item as "active":*/
                if (!x) return false;
                /*start by removing the "active" class on all items:*/
                removeActive(x);
                if (currentFocus >= x.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (x.length - 1);
                /*add class "autocomplete-active":*/
                x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < x.length; i++) {
                    x[i].classList.remove("autocomplete-active");
                }
            }
            function closeAllLists(elmnt) {
                /*close all autocomplete lists in the document,
                except the one passed as an argument:*/
                var x = document.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });
        }

        var SetMotorValue = function (val) {
                 
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=LOADMOTORDATAJSON',
                    type: 'post',
                    cache: false,
                    async: false,
                    dataType: 'html',
                    data: { Id: val },
                    success: function (data) {
                        //x = x.id;
                        var json_obj = $.parseJSON(data);//parse JSON

                        for (var i in json_obj) {
                          
                            $('#' + json_obj[i].Id).val(json_obj[i].Value);
                            $('#Review_' + json_obj[i].Id).val(json_obj[i].Value);
                           // $('#' + json_obj[i].Id).css({"border-color" : "#00ffff"});

                        }

                    },
                    error: function (reponse) {
                        alert("error : " + reponse);
                    }
                });
        }

        var MotorDataLoad = function () {
            
                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=LOADMOTORNAMEDATAJSON',
                        type: 'post',

                        cache: false,
                        async: true,
                        dataType: 'html',
                        data: { },
                        success: function (data) {
                          
                            var json_obj = $.parseJSON(data);//parse JSON
                            
                        for(var i in json_obj)
                        {
                            PumpName.push(json_obj[i].MT_TYPE)
                              
                            }
                           
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });
                
        }

     ////Function Auto Complite
             
         ////Save Data In Database
       function SAVEDATA() {
           var var1 = document.getElementById("Unit");
           var var2 = document.getElementById("ORDERNO");
            var x = var1.options[var1.selectedIndex].text;
            var Mes = "";

            if (x == "Select Unit") {
              
                ShowDanger('Select Unit!');
                return;
            }
            else {
                Mes = Validaton(1);
                //a = a.id;
                 if (Mes != "") {

               ShowDanger('Please Fill Required Fields.....!');
                return;
                }
           }

           
           
           if (var2.value == "") {
               ShowDanger('Enter Order No!');
                return;
           }


           if (var2.value != "") {
               if (JobOrderId == 0) {
                   CheckOrderNo(var2);

                   if (DuplicateOrder == 1) {
                       return;
                   }
               }
           }
            
            if (Mes == "") {
                var postData = "<?xml version=\"1.0\"?>\n";
                postData += "<configuration Unit=\"" + $("#Unit option:selected").text() + "\">\n";

                var maintabs = $("#main").attr("maintabs").split(",");
                var count = 0;
                for (var i = 0; i < maintabs.length - 1; i++) {
                    postData += "<Tab name=\"" + maintabs[i].split("_").join(" ") + "\">\n";
                    var subtabs = $('#' + maintabs[i]).attr("subtabs").split(",");
                    subtabs = subtabs.filter(function (v) { return v !== '' });
                    if (subtabs.length > 0) {
                        for (var j = 0; j < subtabs.length; j++) {
                            postData += "<SubTab name=\"" + subtabs[j].split("_").join(" ") + "\">\n";
                            $('.expressions' + maintabs[i] + subtabs[j]).each(function () {
                                // if ($(this).attr('parametername') == "") {
                                var ExpName = $(this).attr('expression');
                                var fieldvalue = document.getElementById('UNIT_' + ExpName).innerHTML;


                                postData += "<Expression name=\"" + $(this).attr('expression') + "\" value=\"" + $(this).val() + "\" tab=\"" + maintabs[i] + "\" ></Expression>\n";
                            
                            });

                            postData += "</SubTab>\n";
                        }
                    }
                    postData += "</Tab>\n";
                }
                postData += "</configuration>";
                var Id = "";
                var UserName = "";
                var path = "";
                var CloneOrderNo = document.getElementById("txtCloneOrderNo").value;
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=SAVEDATAFORASSEMBLY',
                    cache: false,
                    async: true,
                    data: { xmlString: encodeURIComponent(postData) ,ID:JobOrderId,CloneNo:CloneOrderNo},
                    success: function (data) {
                        
                        if (data != '') {
                            //Id = data.split(',')[0];
                            if (JobOrderId == 0) {
                                ShowSuccess('Data Saved...');
                                JobOrderId = data;
                               // $("#openSession").attr('disabled', true);
                                var x = document.getElementById("DivOpenSession").style.display="none";
                                $("#ORDERNO").attr("readonly", true);
                            }
                            else
                                ShowSuccess('Data Updated...');
                            

                        }
                        //else {
                        //    id = data.value;
                        //    
                        //}
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + " " + errorThrown);
                    },
                });
                
            }
        }

        /////Check Duplicate Order No.
        var CheckOrderNo = function (val) {

                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=CHECKORDERNO',
                        type: 'post',
                        cache: false,
                        async: false,
                        dataType: 'html',
                        data: { Id: ( + val.value) },
                        success: function (data) {

                            if (data >= 1 ) {
                                ShowDanger('Duplicate Order No!');
                                DuplicateOrder = 1;
                            }
                            else
                                DuplicateOrder = 0;

                           
                         },
            error: function (reponse) {
                alert("error : " + reponse);
            }
                    });
                
        }

        </script>
        


</asp:Content>

