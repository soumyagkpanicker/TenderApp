

var flagFirst = 0, flagcheck = 1, flagNewTender = 0, hasChild = 1;
function UpdateMarkAsRead(tenderId) {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=UPDATEMARKASREAD',
        type: 'POST',
        async: false,
        data: {
            TenderUniqueId: $jq1.trim(tenderId)
        }
    });
}
function UpdateFirmGuid() {
    //$jq1.ajax({
    //    url: 'ServiceHandler.ashx?CBH=GETLATESTCHILDTENDERDETAILS',
    //    type: 'POST',
    //    async: false,
    //    data: {
    //        pTenderUniqueId: $jq1.trim(getUrlVars()["code"])
    //    },
    //    dataType: 'json',
    //    success: function (data) {
    //        $jq1("#parameters .wizard li:nth-child(5)").removeClass("disabled");
    //        if (data.length > 0) {
    //            $jq1("#firmTenderGuid").val(data[0].TenderUniqueId);
    //            $jq1("#firmTenderGuid").attr("data-tenderStatus", data[0].Status);

    //            ShowFirmSubmitButton();
    //        }
    //        else {
    //            hasChild = 0;
    //            $jq1("#firmTenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
    //                G() + "-" + G() + G() + G()).toUpperCase());

    //        }
    //    }
    //});

    $jq1("#firmTenderGuid").val($jq1.trim(getUrlVars()["code"]));
}

function GetLastestChildTenderDetails() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETLATESTCHILDTENDERDETAILS',
        type: 'POST',
        async: false,
        data: {
            pTenderUniqueId: $jq1.trim(getUrlVars()["code"])
        },
        dataType: 'json',
        success: function (data) {
            $jq1("#parameters .wizard li:nth-child(5)").removeClass("disabled");
            if (data.length > 0) {
                $jq1("#txtTenderId").val(data[0].TenderId);
                $jq1("#firmTenderGuid").val(data[0].TenderUniqueId);
                $jq1("#firmTenderGuid").attr("data-tenderStatus", data[0].Status);

               // ShowFirmSubmitButton();
            }
            else {
                hasChild = 0;
                $jq1("#firmTenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
                    G() + "-" + G() + G() + G()).toUpperCase());
                if ($jq1("#parameters .wizard li:nth-child(5)").hasClass("active"))

                //added
                {
                    if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                        $jq1("#tenderGuid").val(getUrlVars()["code"]);
                    }

                    MainNavId = $jq1("#parameters .wizard li.active").data("mainmenuid");
                    $jq1('.form-data .tabs-content-wrapper .form-group[data-mainmenuid="' + MainNavId + '"]').show();

                    GetAllFormAttributes();
                    $jq1(".tabs-wrapper li:first-child").trigger("click");
                    $jq1(".tabs-wrapper").show();
                    $jq1(".tabs-content-wrapper").removeClass("topBorder");



                }

            }
        }
    });
}

function UpdateParentTenderStatus() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=UPDATEPARENTTENDERSTATUS',
        type: 'POST',
        async: false,
        data: {
            TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val())
        },
        success: function (data) {
            // alert(data);
        }
    });
}

function GenerateTenderVersion() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=RETURNTENDERVERSION',
        type: 'POST',
        async: false,
        data: {
            TenderUniqueId: $jq1.trim($jq1("#firmTenderGuid").val()),
            pTenderUniqueId: $jq1.trim($jq1("#tenderGuid").val())
        },
        dataType: 'json',
        success: function (data) {
            $jq1("#txtTenderId").val(data[0].TenderName);
            $jq1("#txtTenderId,#txtItemId").attr("disabled", "disabled");
        }
    });
}

function GenerateRevisedTenderVersion() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=RETURNTENDERVERSION',
        type: 'POST',
        async: false,
        data: {
            TenderUniqueId: $jq1.trim($jq1("#firmTenderGuid").val()),
            pTenderUniqueId: $jq1.trim($jq1("#tenderGuid").val())
        },
        dataType: 'json',
        success: function (data) {
            $jq1("#txtTenderId").val(data[0].TenderName);
            $jq1("#txtTenderId,#txtItemId").attr("disabled", "disabled");
        }
    });
}

$jq1(document).on("change", "#currencyeurorusd", function () {
   
    if ($jq1.trim($jq1(this).val()) != '0')
        $jq1("#currencySelected").val($jq1.trim($jq1(this).val()));
});
$jq1(document).on("click", ".btnEditProduct", function () {
    var productId = $jq1(this).parents(".scrollTable").find(".tblProduct").data("productid");
    var Temp = $jq1(this).parents(".scrollTable").clone();
    Temp.find(".tblProduct").addClass("added");
    if (Temp.find(".tblProduct .btnDeleteProduct").length <= 0) {
        $jq1("<a href='javascript:;' class='btnDeleteProduct'>Delete</a>").insertAfter(Temp.find(".tblProduct .btnCopyProduct"));
    }

    /*----------------- MECHANICAL SEAL VALUES ------------------*/
    if (productId == "2") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "MechanicalSeal") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MECHANICALSEALVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "<option value=''></option>";
                            $jq1(data).each(function (i) {
                                if (data[i].MechanicalSeal == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSeal + "' selected>" + data[i].MechanicalSeal + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSeal + "'>" + data[i].MechanicalSeal + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }
                    });
                }
                if ($jq1(this).data("column") == "BearingFrameSize") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BEARINGFRAMEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if (data[i].BearingFrameSize == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].BearingFrameSize + "' selected>" + data[i].BearingFrameSize + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].BearingFrameSize + "'>" + data[i].BearingFrameSize + "</option>";
                                }

                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "ShaftSealDiameter") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=SHAFTSEALDIAMETERVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if (data[i].ShaftSealDiameter == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].ShaftSealDiameter + "' selected>" + data[i].ShaftSealDiameter + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].ShaftSealDiameter + "'>" + data[i].ShaftSealDiameter + "</option>";
                                }

                            });
                            HTMLData += HTMLData1;
                        }
                    });
                }
                if ($jq1(this).data("column") == "MechanicalSealVendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MECHANICALSEALVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if (data[i].MechanicalSealVendor == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSealVendor + "' selected>" + data[i].MechanicalSealVendor + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSealVendor + "'>" + data[i].MechanicalSealVendor + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    /*------------- SEAL SYSTEM ---------------*/
    else if (productId == "3") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "SealSystemPlan") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=SEALSYSTEMPLANVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].SealSystemPlan + "'>" + data[i].SealSystemPlan + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "PipeorTube") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=PIPETUBEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].PipeorTube + "'>" + data[i].PipeorTube + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "SealSystemVendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=SEALSYSTEMVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].SealSystemVendor + "'>" + data[i].SealSystemVendor + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    else if (productId == "1") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "CouplingVendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].CouplingVendor + "'>" + data[i].CouplingVendor + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Type") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGTYPEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Type + "'>" + data[i].Type + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Powerperrpm") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGTYPEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Type + "'>" + data[i].Type + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Spacer") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGSPACERVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Spacer + "'>" + data[i].Spacer + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "SpacerLength") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGSPACERLENGTHVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].SpacerLength + "'>" + data[i].SpacerLength + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Balancing") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BALANCINGVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {

                                HTMLData1 += "<option value='" + data[i].Balancing + "'>" + data[i].Balancing + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    else if (productId == "4") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "BearingFrameSize") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BEARINGFRAMEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].BearingFrameSize + "'>" + data[i].BearingFrameSize + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Material") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MATERIALVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Material + "'>" + data[i].Material + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    else if (productId == "5") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "BearingFrameSize") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BEARINGFRAMEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].BearingFrameSize + "'>" + data[i].BearingFrameSize + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Vendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=ISOLATORVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Vendor + "'>" + data[i].Vendor + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }

                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    $jq1(this).parents(".scrollTable").html(Temp);
    //Temp.insertAfter($jq1(this).parents(".scrollTable"));
});
//$jq1(document).on("click", ".btnSavePricing", function () {
//    var currencyCode = $jq1(".currencyCode").text();
//    $jq1(".scrollTable").each(function () {
//        var elem = $jq1(this);
//        if (elem.find(".tblProduct").hasClass("added")) {
//            $jq1.ajax({
//                url: 'ServiceHandler.ashx?CBH=SAVEPRODUCTSFORTENDER',
//                type: 'POST',
//                async: false,
//                data: {
//                    TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()),
//                    ProductId: $jq1.trim(elem.find(".tblProduct").data("productid")),
//                    NumberOfUnits: $jq1.trim(elem.find(".tblProduct .inputProductQuantity").val()),
//                    DataColumnId: $jq1.trim(elem.find(".tblProduct").data("columnid")),
//                    Cost: $jq1.trim(elem.find(".tblProduct").find('tbody td[data-column="Cost"]').text())
//                },
//                success: function (data) {
//                    $jq1(".btn-SubmitFormData").trigger("click");
//                    $jq1(".currencyCode").text($jq1.trim($jq1("#currencySelected").val()));
//                }
//            });
//        }
//    });
//    alert("Saved");
//});

$jq1(document).on("click", ".btnSaveFirmPricing", function () {
    var data = Array();
    $jq1("#tblproductPricing tr").each(function (i, v) {
        if (i >= 1) {
            var row = $jq1(this);
            TableData = new Array();
            TableData = {
                Id: row.find("input").eq(0).val(),
                ProductId: row.find("input").eq(1).val(),
                DataColumnId: row.find("input").eq(2).val(),
                TenderUniqueId: $jq1.trim(getUrlVars()["code"]),
                Product: row.find("input").eq(3).val(),
                BearingFrameSize: row.find("input").eq(4).val(),
                ShaftSealDiameter: row.find("input").eq(5).val(),
                SealSystemPlan: row.find("input").eq(6).val(),
                Material: row.find("input").eq(7).val(),
                Vendor: row.find("input").eq(8).val(),
                CouplingType: row.find("input").eq(9).val(),
                Powerperrpm: row.find("input").eq(10).val(),
                Spacer: row.find("input").eq(11).val(),
                SpacerLength: row.find("input").eq(12).val(),
                Balancing: row.find("input").eq(13).val(),
                MechanicalSeal: row.find("input").eq(14).val(),
                PipeorTube: row.find("input").eq(15).val(),
                MLE: row.find("input").eq(16).val(),
                Notes: row.find("input").eq(17).val(),
                CostPerQty: row.find("input").eq(18).val(),
                NetCost: row.find("input").eq(19).val(),
                Qty: row.find("input").eq(20).val(),
                Currency: row.find("input").eq(21).val()
            }
            data.push(TableData);

        }
    });

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=ADDDATAINTABLE',
        type: "POST",
        async: false,
        dataType: 'html',
        data: { ValStr: JSON.stringify(data) },
        success: function (data) {
            console.log(data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + " " + errorThrown);
        },
    });

    alert("Saved");
    $jq1(".btn-SubmitFirmData").trigger("click");
    $jq1(".currencyCode").text($jq1.trim($jq1("#currencySelected").val()));
});

$jq1(document).on("change", ".tblProduct tbody select", function () {
    var productId = $jq1(this).parents(".tblProduct").data("productid");
    var elem = $jq1(this);
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETPRICINGFROMPRODUCTID',
        type: 'POST',
        async: false,
        data: {
            ProductId: productId,
            Vendor: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='Vendor'] select").val()),
            Material: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='Material'] select").val()),
            SealSystemPlan: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='SealSystemPlan'] select").val()),
            SealSystemVendor: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='SealSystemVendor'] select").val()),
            PipeTube: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='PipeorTube'] select").val()),
            MLE: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='MLE'] select").val()),
            MechanicalSealVendor: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='MechanicalSealVendor'] select").val()),
            ShaftSealDiameter: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='ShaftSealDiameter'] select").val()),
            CouplingVendor: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='CouplingVendor'] select").val()),
            MechanicalSeal: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='MechanicalSeal'] select").val()),
            BearingFrameSize: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='BearingFrameSize'] select").val()),
            Type: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='Type'] select").val()),
            Powerperrpm: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='Powerperrpm'] select").val()),
            Spacer: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='Spacer'] select").val()),
            SpacerLength: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='SpacerLength'] select").val()),
            Balancing: $jq1.trim(elem.parents(".tblProduct").find("td[data-column='Balancing'] select").val())
        },
        success: function (data) {
            if (data != "0") {
                var cost = data.split("|ID=")[0];
                var dataColumnId = data.split("|ID=")[1];
                elem.parents(".tblProduct").attr("data-columnId", dataColumnId);
                elem.parents(".tblProduct").find("tbody td[data-column='Cost']").text(cost);
            }

        }
    });
});

$jq1(document).on("click", ".btnCopyProduct", function () {

    var productId = $jq1(this).parents(".scrollTable").find(".tblProduct").data("productid");


    var Temp = $jq1(this).parents(".scrollTable").clone();
    Temp.find(".tblProduct").addClass("added");
    if (Temp.find(".tblProduct .btnDeleteProduct").length <= 0) {
        $jq1("<a href='javascript:;' class='btnDeleteProduct'>Delete</a>").insertAfter(Temp.find(".tblProduct .btnCopyProduct"));
    }

    /*----------------- MECHANICAL SEAL VALUES ------------------*/
    if (productId == "2") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "MechanicalSeal") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MECHANICALSEALVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "<option value=''></option>";
                            $jq1(data).each(function (i) {
                                if (data[i].MechanicalSeal == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSeal + "' selected>" + data[i].MechanicalSeal + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSeal + "'>" + data[i].MechanicalSeal + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }
                    });
                }
                if ($jq1(this).data("column") == "BearingFrameSize") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BEARINGFRAMEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if (data[i].BearingFrameSize == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].BearingFrameSize + "' selected>" + data[i].BearingFrameSize + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].BearingFrameSize + "'>" + data[i].BearingFrameSize + "</option>";
                                }

                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "ShaftSealDiameter") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=SHAFTSEALDIAMETERVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if (data[i].ShaftSealDiameter == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].ShaftSealDiameter + "' selected>" + data[i].ShaftSealDiameter + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].ShaftSealDiameter + "'>" + data[i].ShaftSealDiameter + "</option>";
                                }

                            });
                            HTMLData += HTMLData1;
                        }
                    });
                }
                if ($jq1(this).data("column") == "MechanicalSealVendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MECHANICALSEALVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if (data[i].MechanicalSealVendor == valueToBeCopied) {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSealVendor + "' selected>" + data[i].MechanicalSealVendor + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].MechanicalSealVendor + "'>" + data[i].MechanicalSealVendor + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    /*------------- SEAL SYSTEM ---------------*/
    else if (productId == "3") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "SealSystemPlan") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=SEALSYSTEMPLANVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].SealSystemPlan + "'>" + data[i].SealSystemPlan + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "PipeorTube") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=PIPETUBEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].PipeorTube + "'>" + data[i].PipeorTube + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "SealSystemVendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=SEALSYSTEMVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].SealSystemVendor + "'>" + data[i].SealSystemVendor + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    else if (productId == "1") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "CouplingVendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].CouplingVendor + "'>" + data[i].CouplingVendor + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Type") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGTYPEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Type + "'>" + data[i].Type + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Powerperrpm") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGTYPEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Type + "'>" + data[i].Type + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Spacer") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGSPACERVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Spacer + "'>" + data[i].Spacer + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "SpacerLength") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=COUPLINGSPACERLENGTHVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].SpacerLength + "'>" + data[i].SpacerLength + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Balancing") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BALANCINGVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {

                                HTMLData1 += "<option value='" + data[i].Balancing + "'>" + data[i].Balancing + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    else if (productId == "4") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "BearingFrameSize") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BEARINGFRAMEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].BearingFrameSize + "'>" + data[i].BearingFrameSize + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Material") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MATERIALVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Material + "'>" + data[i].Material + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    else if (productId == "5") {
        Temp.find("table tbody table tbody tr td").each(function () {
            var valueToBeCopied;
            var HTMLData = "";
            if ($jq1(this).data("column") != 'Cost' && $jq1(this).attr("class") != 'netCost') {
                if ($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).length > 0) {
                    valueToBeCopied = $jq1.trim($jq1(this).find("select." + $jq1.trim($jq1(this).data("column"))).val());
                }
                else {
                    valueToBeCopied = $jq1.trim($jq1(this).text());
                }
                HTMLData += "<select class='" + $jq1.trim($jq1(this).data("column")) + "'>";
                if ($jq1(this).data("column") == "BearingFrameSize") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=BEARINGFRAMEVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].BearingFrameSize + "'>" + data[i].BearingFrameSize + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "Vendor") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=ISOLATORVENDORVALUES',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                HTMLData1 += "<option value='" + data[i].Vendor + "'>" + data[i].Vendor + "</option>";
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }
                if ($jq1(this).data("column") == "MLE") {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=MLEVALUESDATA',
                        type: 'POST',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            var HTMLData1 = "";
                            $jq1(data).each(function (i) {
                                if ($jq1.trim(data[i].DropdownValue) == $jq1.trim(valueToBeCopied)) {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "' selected>" + data[i].DropdownValue + "</option>";
                                }
                                else {
                                    HTMLData1 += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";
                                }
                            });
                            HTMLData += HTMLData1;
                        }

                    });
                }

                HTMLData += "</select>";
            }
            else {
                HTMLData += $jq1(this).text();
            }
            $jq1(this).html(HTMLData);

            $jq1(".tabs-wrapper").hide();
        });
    }
    Temp.insertAfter($jq1(this).parents(".scrollTable"));
});
$jq1(document).on("click", ".btnDeleteProduct", function () {
    var elem = $jq1(this);
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=DELETEPRICINGDATA',
        type: 'POST',
        async: false,
        data: {
            ProductId: $jq1(this).parents(".scrollTable").find(".tblProduct").data("productid"),
            TenderUniqueId: $jq1("#tenderGuid").val(),
            DataColumnId: $jq1(this).parents(".scrollTable").find(".tblProduct").data("columnid")
        },
        success: function (data) {
            elem.parents(".scrollTable").remove();
        }
    });
});

function PopulateBalancingValues() {
    PopulatePressureUnits();
    PopulateTemperatureUnits();
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=BALANCINGVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {

                HTMLData += "<option value='" + data[i].Balancing + "'>" + data[i].Balancing + "</option>";
            });
            $jq1("#balancing").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=COUPLINGVENDORVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].CouplingVendor + "'>" + data[i].CouplingVendor + "</option>";
            });
            $jq1("#couplingvendor").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=COUPLINGTYPEVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].Type + "'>" + data[i].Type + "</option>";
            });
            $jq1("#type").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=COUPLINGSPACERVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].Spacer + "'>" + data[i].Spacer + "</option>";
            });
            $jq1("#spacer").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=COUPLINGSPACERLENGTHVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].SpacerLength + "'>" + data[i].SpacerLength + "</option>";
            });
            $jq1("#spacerlengthmm").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=MECHANICALSEALVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].MechanicalSeal + "'>" + data[i].MechanicalSeal + "</option>";
            });
            $jq1("#mechanicalseal").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=BEARINGFRAMEVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].BearingFrameSize + "'>" + data[i].BearingFrameSize + "</option>";
            });
            $jq1("#bearingframesize").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=SHAFTSEALDIAMETERVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].ShaftSealDiameter + "'>" + data[i].ShaftSealDiameter + "</option>";
            });
            $jq1("#shaftsealdiametermm").append(HTMLData);
        }

    });
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=MECHANICALSEALVENDORVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].MechanicalSealVendor + "'>" + data[i].MechanicalSealVendor + "</option>";
            });
            $jq1("#mechanicalsealvendor").append(HTMLData);
        }

    });

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=SEALSYSTEMPLANVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].SealSystemPlan + "'>" + data[i].SealSystemPlan + "</option>";
            });
            $jq1("#plan").append(HTMLData);
        }

    });

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=PIPETUBEVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].PipeorTube + "'>" + data[i].PipeorTube + "</option>";
            });
            $jq1("#pipetube").append(HTMLData);
        }

    });

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=SEALSYSTEMVENDORVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].SealSystemVendor + "'>" + data[i].SealSystemVendor + "</option>";
            });
            $jq1("#sealsystemvendor").append(HTMLData);
        }

    });

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=MATERIALVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].Material + "'>" + data[i].Material + "</option>";
            });
            $jq1("#material").append(HTMLData);
        }

    });

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=ISOLATORVENDORVALUES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            var HTMLData = "";
            $jq1(data).each(function (i) {
                HTMLData += "<option value='" + data[i].Vendor + "'>" + data[i].Vendor + "</option>";
            });
            $jq1("#bearingvendor").append(HTMLData);
        }

    });

}

function MakeddSearchable() {
    $jq1("#balancing").select2();
    $jq1("#couplingvendor").select2();
    $jq1("#type").select2();
    $jq1("#spacer").select2();
    $jq1("#spacerlengthmm").select2();
    $jq1("#mechanicalseal").select2();
    $jq1("#bearingframesize").select2();
    $jq1("#shaftsealdiametermm").select2();
    $jq1("#mechanicalsealvendor").select2();
    $jq1("#bearingvendor").select2();
    $jq1("#material").select2();
    $jq1("#sealsystemvendor").select2();
    $jq1("#plan").select2();
    $jq1("#pipetube").select2();
    $jq1("#designpressurebar,#designtemperaturec").attr("min", "1");
    if (window.location.href.indexOf("NewTender") > 0) {
        $jq1("#designpressurebar,#designtemperaturec").val("1");
    }
    $jq1("#unitssiorus").trigger("change");
}



$jq1(document).on("click", "#btnCancelSaveAgent", function () {
    //SaveAgentDetails(); 
    $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").removeClass("active");
});
$jq1(document).on("click", ".agentDetailsPopup .customPopup .btnClosePopup", function () {
    //SaveAgentDetails();
    $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").removeClass("active");
});
$jq1(document).on("click", "#btnSaveAgentDetails", function () {
    if ($jq1.trim($jq1("#EndUserCountry").val()) == "" || $jq1.trim($jq1("#EndUserNAme").val()) == "") {
        alert("Please fill the mandatory fields and save again");
    }
    else {
        SaveAgentDetails();
        $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").removeClass("active");
    }
});

function SaveAgentDetails() {
    $jq1("#endusername").val($jq1("#EndUserNAme").val());
    $jq1("#endusercountry").val($jq1("#EndUserCountry").val());
    $jq1("#enduserstreet").val($jq1("#EndUserStreet").val());
    $jq1("#enduserpostcode").val($jq1("#EndUserPostcode").val());
    $jq1("#endusertitle").val($jq1("#EndUserTitle").val());
    $jq1("#endusercontactpersonname").val($jq1("#EndUserContactPersonName").val());
    $jq1("#enduseremailaddress").val($jq1("#EndUserContactEmailAddress").val());
    $jq1("#endusercontactnumber").val($jq1("#EndUserContactPhoneNumber").val());
}
function ShowAgentDetails() {
    $jq1("#EndUserNAme").val($jq1("#endusername").val());
    $jq1("#EndUserCountry").val($jq1("#endusercountry").val());
    $jq1("#EndUserStreet").val($jq1("#enduserstreet").val());
    $jq1("#EndUserPostcode").val($jq1("#enduserpostcode").val());
    $jq1("#EndUserTitle").val($jq1("#endusertitle").val());
    $jq1("#EndUserContactPersonName").val($jq1("#endusercontactpersonname").val());
    $jq1("#EndUserContactEmailAddress").val($jq1("#enduseremailaddress").val());
    $jq1("#EndUserContactPhoneNumber").val($jq1("#endusercontactnumber").val());
}



var flagAllocate = true, allocatedTo = "", roleId = "";
function AllocateTenderToRole() {
    if ($jq1.trim($jq1("#notificationMessage").val()) != "") {
        if (flagAllocate) {
            $jq1(this).addClass("selected");
            var text = $jq1(this).text();
            var id = $jq1(this).data("roleid");
            $jq1("#allocateToanotherGroup > .btn-group > .btn:first-child").text("Allocated to " + allocatedTo);
            $jq1("#allocateToanotherGroup > .btn-group > .btn:first-child").attr("data-roleid", id);

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=ALLOCATETENDER',
                type: 'POST',
                async: false,
                data: {
                    TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()),
                    NewTenderId: $jq1.trim((G() + G() + "-" + G() + "-" + G() + "-" +
                        G() + "-" + G() + G() + G()).toUpperCase()),
                    Message: $jq1.trim($jq1("#notificationMessage").val()),
                    Username: $jq1.trim($jq1("#paraUserName").data("loginuserid")),
                    UserRole: $jq1.trim(roleId),
                    Sender: $jq1.trim($jq1("#paraUserName .username").text()),
                    Location: $jq1.trim($jq1(".location").text()),
                    Customer: $jq1.trim($jq1("#customername").val()),
                    AssiGnBy: $jq1(".user-information .role").data("roleid"),
                },
                success: function (data) {
                    alert("This tender has been allocated to " + allocatedTo);
                    window.location.href = "TenderManagement1.aspx";
                }
            });

        }

    }
    else {
        //if (flagAllocate) {
        $jq1(this).addClass("selected");
        var text = $jq1(this).text();
        var id = $jq1(this).data("roleid");
        $jq1("#allocateToanotherGroup > .btn-group > .btn:first-child").text("Allocated to " + allocatedTo);
        $jq1("#allocateToanotherGroup > .btn-group > .btn:first-child").attr("data-roleid", id);

        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=ALLOCATETENDER',
            type: 'POST',
            async: false,
            data: {
                TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()),
                NewTenderId: $jq1.trim((G() + G() + "-" + G() + "-" + G() + "-" +
                    G() + "-" + G() + G() + G()).toUpperCase()),
                Message: "A tender has been allocated to you",
                Username: $jq1.trim($jq1("#paraUserName").data("loginuserid")),
                UserRole: $jq1.trim(roleId),
                Sender: $jq1.trim($jq1("#paraUserName .username").text()),
                Location: $jq1.trim($jq1(".location").data("locationid")),
                Customer: $jq1.trim($jq1("#customername").val()),
                AssiGnBy: $jq1(".user-information .role").data("roleid"),
            },
            success: function (data) {
                //alert(data)
                $jq1("#MessageModal .close").trigger("click");
                window.location.href = "TenderManagement1.aspx";
            }
        });

        //}
    }

}


function ReturnFalse() {
    flagAllocate = false;
}



function CheckValidTender() {
    if ($jq1.trim($jq1("#txtTenderId").val()) == '' || $jq1.trim($jq1("#txtItemId").val()) == '' || $jq1.trim($jq1("#ProjectId").text()) == '' || $jq1.trim($jq1("#tenderGuid").val()) == '') {
        return false;
    }
    else {
        return true;
    }
}




function initializeInputValues() {
    $jq1("#sealsystemsuppliedby,#sealsystemvendor,#plan,#pipetube").attr("disabled", "disabled").attr("data-required", "false");
    $jq1("#sealsystemsuppliedby,#sealsystemvendor,#plan,#pipetube").removeClass("validate");
    $jq1("#sealsystemvendor,#plan,#pipetube").attr("disabled", "disabled").attr("data-required", "false");
    $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").attr("disabled", "disabled").attr("data-required", "false");
    $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").removeClass("validate");
    $jq1("#address").attr("disabled", "disabled").attr("data-required", "false");
}

$jq1(document).on("change", "#couplingsuppliedby", function () {
    if ($jq1.trim($jq1(this).val()) != "SULZER") {
        $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").removeClass("validate");
        $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").val("0");
        $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").trigger("change");
        $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").attr("disabled", "disabled").attr("data-required", "false");
        $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").removeClass("validate");
    }
    else {
        $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").attr("data-required", "true");
        $jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").removeAttr("disabled");
        //$jq1("#balancing,#couplingvendor,#motorpowerkw,#spacer,#spacerlengthmm,#recommendedspacerlengthmm,#material").addClass("validate");
    }
});

function ValidateIfEndUserIsAgent() {
    if ($jq1.trim($jq1("#enduser").val()) != "2") {
        $jq1("#endusercountry,#endusername").val("");
        $jq1("#endusercountry,#endusername").attr("disabled", "disabled").attr("data-required", "false");
        $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").removeClass("active");
    }
    else {
        $jq1("#endusercountry,#endusername").removeAttr("disabled");
        $jq1("#endusercountry,#endusername").attr("data-required", "true");
        $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").addClass("active");

    }
}

$jq1(document).on("click", ".viewAgentInfobtn", function () {
    ShowAgentDetails();
    $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").addClass("active");
});

$jq1(document).on("change", "#enduser", function () {
    var elem = $jq1(this);
    if ($jq1.trim($jq1(this).val()) != "2") {
        if ($jq1(".viewAgentInfobtn").length >= 0) {
            $jq1(".form-group").children().remove(".viewAgentInfobtn");
        }
        $jq1("#endusercountry,#endusername").removeClass("validate");
        $jq1("#endusercountry,#endusername").attr("disabled", "disabled").attr("data-required", "false");
        $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").removeClass("active");
        elem.removeClass("agent");
    }
    else {
        if ($jq1(".viewAgentInfobtn").length <= 0) {
            elem.parents(".form-group").prepend('<a class="viewAgentInfobtn" href="javascript:;">View<br/>details</a>');
        }
        $jq1("#endusercountry,#endusername").removeAttr("disabled");
        $jq1("#endusercountry,#endusername").attr("data-required", "true");
        if (flagNewTender != 1) {
            $jq1(".overlay.agentDetailsPopup,.agentDetailsPopup .customPopup").addClass("active");
        }
        flagNewTender = 0;
        ShowAgentDetails();
        elem.addClass("agent");
    }
});

/**------------------- Common Method Starts ------------------------**/
function ValidateInputs() {
    $jq1('input[data-required="true"]:visible,input[type="hidden"][data-required="true"]').each(function () {
        var elem = $jq1(this);
        if ($jq1.trim(elem.val()) == '')
            elem.addClass("validate");
        else
            elem.removeClass("validate");
    });
    $jq1('select[data-required="true"]:visible').each(function () {
        var elem = $jq1(this);
        if ($jq1.trim(elem.val()) == '0')
            elem.addClass("validate");
        else
            elem.removeClass("validate");
    });
    if ($jq1(".validate").length > 0)
        return false;
    return true;
}
function DisableAllInputs() {
    if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0) {
        $jq1('input,select').each(function () {
            var elem = $jq1(this);
            elem.attr("disabled", "disabled");

        });
    }
    else {
        $jq1('.tabs-content-wrapper input,.tabs-content-wrapper select').each(function () {
            var elem = $jq1(this);
            elem.attr("disabled", "disabled");

        });
    }
}
function ValidateAllInputs() {
    var flagI = true;
    $jq1('input[data-required="true"]').each(function () {
        var elem = $jq1(this);
        if ($jq1.trim(elem.val()) == '') {
            flagI = false;
            return flagI;
        }

    });
    $jq1('select[data-required="true"]').each(function () {
        var elem = $jq1(this);
        if ($jq1.trim(elem.val()) == '0') {
            flagI = false;
            return flagI;
        }

    });
    return flagI;
}
function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}
/**------------------- Common Method Ends ------------------------**/




var SearchddValue = "";
$jq1(document).ajaxComplete(function () {

    if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0)
        ShowSubmitButton();
    else if (window.location.href.indexOf("EditTender") > 0) {
        ShowSubmitButton();
        //if (parseInt($jq1("h1").data("status")) >= 3) {
       
            if ($jq1.trim($jq1("h1").data("status")) == "true")
                $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
       
        
        //}
    }
    if ($jq1(".review-controls-wrapper").length > 0) {
        $jq1("#file").parents(".form-group").hide();
        $jq1(".tabs-wrapper").hide();
    }

    if ($jq1(".review").hasClass("active") || $jq1("#parameters li.active").attr("data-hassubnavigation") == "false") {
        $jq1(".tabs-wrapper").hide();
    }
    else
        $jq1(".tabs-wrapper:hidden").show();
    $jq1(".form-group input[type='hidden']").prev("label").hide();


});
var datachange = false;
/*----------Generate tender code starts--------------------*/
$jq1(document).on("click", "a.btn-generateTender", function () {
    GeneratePDFFromHTML($jq1.trim($jq1("#tenderGuid").val()));
});

$jq1(document).on("click", "a.btn-generateFirmTender", function () {
    //if ($jq1("#firmTenderGuid").data("tenderstatus") >= 2) {
    //UpdateParentTenderStatus();
    //GenerateTenderVersion();
    //$jq1("#firmTenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
    // G() + "-" + G() + G() + G()).toUpperCase());
    //    $jq1(".btn-SaveAllFormData").trigger("click");
    //    GeneratePDFFromHTML($jq1.trim($jq1("#firmTenderGuid").val()));

    //    GetLastestChildTenderDetails();
    //}
    //else {
    GeneratePDFFromHTML($jq1.trim(getUrlVars()["code"]));
    //}

});


function GeneratePDFFromHTML(tenderGuid) {

    // if (ValidateInputs()) {
    $jq1(".loader").removeClass("fadeAway");
    $jq1(".error-message-wrapper").removeClass("active");
    var tender = {
        TenderType: $jq1("input[name='tenderType']:checked").next("span").text(),
        TenderId: $jq1("#txtTenderId").val(),
        ProjectId: $jq1("#ProjectId").text(),
        CreatedBy: $jq1(".user-information .username").text(),
        TenderUniqueId: tenderGuid
    };
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=CONVERTTOPDFFROMHTML',
        cache: false,
        async: false,
        data: {
            UserNameLogin: getCookie("UserName"),
            TenderType: false,
            TenderId: $jq1("#txtTenderId").val(),
            ProjectId: $jq1("#ProjectId").text(),
            CreatedBy: $jq1(".user-information .username").text(),
            // DateOfCreation: d.getDate(),
            TenderUniqueId: tenderGuid,
            UserName: $jq1(".user-information .username").text(),
            Role: $jq1(".role").text(),
            Location: $jq1(".location").text(),
            Customer: $jq1("#customername").val(),
            CustomerId: $jq1("#drpSearchCustomer").val(),
            Title: $jq1("#title").val(),
            Contact: $jq1("#contact").val(),
            Street: $jq1("#streetnumber").val(),
            PostalCode: $jq1("#postalcodecity").val(),
            Country: $jq1("#countryofinstallation").val(),
            CustomersReference: $jq1("#customerreferencerfq").val(),
            Material_Class: $jq1("#materialclass option:selected").text(),
            Shaft_Seal_Diameter: $jq1("#shaftsealdiametermm option:selected").text(),
            Shaft_Seal_Diameter_1: $jq1("#currencyeurorusd option:selected").text(),
            Bearing_Frame_Size: $jq1("#bearingframelengthmm option:selected").text(),
            Bearing_Isolator_Vendor: $jq1("#bearingvendor option:selected").text(),
            Price: "BUDGET PRICE for " + $jq1("#numberofequalunits option:selected").text() + " Kits: " + $jq1("#NumberofEqualUnits option:selected").text(),
            Validity_Offer: $jq1("#validityperiodofthetender option:selected").text(),
            SiteMeasurement: $jq1("#sitemeasurement option:selected").text(),
            NACEcomplianceonlyUpgradeKit: $jq1("#nacecomplianceonlyupgradekit option:selected").text(),
            ATEXRequiredonlyUpgradeKit: $jq1("#atexrequiredonlyupgradekit option:selected").text(),
            Suppliedby: $jq1("#couplingsuppliedby").val(),
            Material: $jq1("#material option:selected").text(),
            ItemId: $jq1("#txtItemId").val(),
            PreojectDescription: $jq1("#projectdescription").val(),
            Currency: $jq1("#currencyeurorusd option:selected").text(),
            //LeadTime: "Delivery time EXW Sulzer factory: " + $jq1("#txtLeadTime").val(),
            RequiredMaterialCertificate: $jq1("#requiredmaterialcertificate option:selected").text(),
        },
        success: function (data) {
            window.open(data, '_blank');
            $jq1("#downloadPdf").attr("download", data);
            $jq1("#downloadPdf").trigger("click");
            var obj = {};
            setTimeout(function () {
                $jq1(".loader").addClass("fadeAway");
            }, 2000);
            //$jq1(".tabs-content-wrapper .form-group").each(function () {
            //    obj[$jq1(this).find("label").text()] = $jq1(this).children().last().val();
            //});
            //$jq1.each(obj, function (index, value) {
            //    $jq1.ajax({
            //        url: 'ServiceHandler.ashx?CBH=SAVEFORMDATA',
            //        cache: false,
            //        async: false,
            //        data: { TenderId: $jq1("#txtTenderId").val(), ParameterName: value, ParameterValue: index, Guid: $jq1("#tenderGuid").val() },
            //        dataType: 'json',
            //        success: function (data) {

            //            var HtmlMainNavigation = "<div>";
            //            $jq1.each(data, function (i) {
            //                HtmlMainNavigation += "<div class='form-group'><label for='#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "'>" + data[i].Label + "</label><input type='text' id=" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "  /></div>";
            //            });
            //            HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
            //            $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);


            //        }
            //    });
            //}); 
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=SAVEQUOTATION',
                cache: false,
                type: 'POST',
                async: false,
                data: {
                    TenderUniqueId: tenderGuid,
                },
                success: function () {
                    setTimeout(function () {
                        $jq1(".loader").addClass("fadeAway");
                    }, 2000);

                }

            });
        }
    });


}
/*----------Generate tender code ends--------------------*/



/**--------------- Form Generation starts --------------**/
function GetMainNavigation() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=MAINNAVIGATION',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            var d;
            var HtmlMainNavigation = "<ul class='wizard'>";
            $jq1.each(data, function (i) {
                HtmlMainNavigation += "<li class='" + ((data[i].IsEnabled == true) ? "" : "disabled") + "' data-mainMenuId=" + data[i].UniqueSymbol + " data-hasSubnavigation=" + data[i].HasSubNavigation + "><a href='javascript:;'><span class='circle'>" + (i + 1) + "</span><span class='text'>" + data[i].Description + "</span></a></li>";
                d = i + 1;
            });
            //HtmlMainNavigation += "<li class='review disabled' data-mainmenuid='0' data-hassubnavigation='false' class='active'><a href='javascript:;'><span class='circle'>" + (d + 1) + "</span><span class='text'>Review</span></a></li></ul>";
            $jq1("#parameters").html(HtmlMainNavigation);
        }
    });
}
function GetAllSubnavigation() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETALLSUBNAV',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            var HtmlMainNavigation = "<ul>";
            $jq1.each(data, function (i) {
                HtmlMainNavigation += (data[i].AppendPumpTypeBefore == true) ? "<li data-mainmenuid='" + data[i].MainTabId + "' data-subTabId='" + data[i].UniqueSymbol + "' ><a href='javascript:;' >" + getCookie("PumpType") + " " + data[i].Subnav + "</a></li>" : "<li data-mainmenuid='" + data[i].MainTabId + "' data-subTabId='" + data[i].UniqueSymbol + "' ><a href='javascript:;' >" + data[i].Subnav + "</a></li>";
                //HtmlMainNavigation += "<li data-mainmenuid='" + data[i].MainTabId + "' data-subTabId='" + data[i].UniqueSymbol + "' ><a href='javascript:;' >" + data[i].Subnav + "</a></li>";
            });
            HtmlMainNavigation += "</ul>";
            $jq1(".dynamic-content-wrapper .tabs-wrapper").html(HtmlMainNavigation);
        }
    });
}
function GetAllFormAttributes() {
    //if (window.location.href.indexOf("NewTender") >= 0) {
    //    //TENDER ID IS BEING CREATED FOR A NEW TENDER
    //    //if ($jq1.trim($jq1("#tenderGuid").val()) == '') {
    //        $jq1("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
    //            G() + "-" + G() + G() + G()).toUpperCase());
    //    //}
    //} 

    //ALL THE FORM ATTRIBUTES ARE BEING PULLED FROM THE DATABASE
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETALLFORMATTRIBUTES',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            var HtmlMainNavigation = "<div>";
            $jq1.each(data, function (i) {
                var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();

                if (data[i].FieldTypeId != "3") {
                    HtmlMainNavigation += "<div class='form-group' data-mainmenuid='" + data[i].MainTabId + "' data-subMenu='" + data[i].SubTabId + "'>";
                    HtmlMainNavigation += "<label for='#" + id + "'>" + data[i].Label + "</label>";
                }
                else {
                    HtmlMainNavigation += "<div class='form-group hide' data-mainmenuid='" + data[i].MainTabId + "' data-subMenu='" + data[i].SubTabId + "'>";
                    HtmlMainNavigation += "<label for='#" + id + "' class='hide'>" + data[i].Label + "</label>";
                }

                HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].FieldSymbol, data[i].IsRequired) + "</div>";
            });
            HtmlMainNavigation += "<div class='review-controls-wrapper'>";
            HtmlMainNavigation += "<div class='button-wrapper'>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-PreviousFormData'>Previous</a>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-SaveSubFormData'>Save</a>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-NextFormData'>Next</a>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-SubmitFormData hide'>See Pricing</a>";
            HtmlMainNavigation += "</div>";
            //HtmlMainNavigation += "<a href='javascript:;' class='btn-allocate'>Allocate to</a>";
            //HtmlMainNavigation += "<a href='javascript:;' class='btn-editEndUserInfo'>View end user details</a>";
            HtmlMainNavigation += "</div>";
            $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

            //DROPDOWN VALUES ARE BEING POPULATED FROM THE DATABASE
            LoadDataForDropdown();


            //EDIT SCREEN VALUES TO BE POPULATED
            if (window.location.href.indexOf("NewTender") <= 0) {

                $jq1("#tenderGuid").val(getUrlVars()["code"]).promise().then(function () {
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                        cache: false,
                        async: false,
                        dataType: 'json',
                        data: { UniqueId: $jq1.trim($jq1("#tenderGuid").val()) },
                        success: function (data) {
                            var tenderId, itemId, customerId, projectId, tenderStatus, Awardeddate,tenderType;
                            $jq1.each(data, function (i) {
                                var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
                                if (data[i].ParameterIdentity == "enduser") {
                                    if (data[i].ParameterValue == "2") {
                                        $jq1("#" + id).parents(".form-group").prepend("<a class='viewAgentInfobtn' href='javascript:;'>View<br/>details</a>");
                                        $jq1("#" + id).addClass("agent");
                                    }
                                }

                                $jq1("#" + id).val(data[i].ParameterValue);
                                tenderId = data[i].TenderId;
                                itemId = data[i].ItemId;
                                customerId = data[i].CustomerId;
                                projectId = data[i].ProjectId;
                                tenderStatus = data[i].Status;
                                Awardeddate = data[i].EstimatedAwardDate;
                                tenderType = data[i].TenderType;
                                console.log("Tender id" + tenderId + ",item id" + itemId + "customerid:" + customerId);;
                            });
                            $jq1("#txtTenderId").val(tenderId);
                            $jq1("#txtItemId").val(itemId);
                            $jq1("#ProjectId").text(projectId);
                            var date = new Date(Awardeddate);
                            var dateToBeUpdated = new Date(date.getFullYear(), date.getMonth(), date.getDate());


                            $jq1("#txtForecasteDate").datepicker({
                                format: "dd-mm-yyyy"
                            });
                            $jq1("#txtForecasteDate").datepicker('setDate', dateToBeUpdated);
                            //var formatedDateOfCreation = new Date(Awardeddate);
                            $jq1("#txtForecasteDate").val(FormatMonthInDigits(date.getMonth()) + "/" + date.getDate() + "/" + date.getFullYear());
                            $jq1("h1").attr("data-status", tenderStatus);
                            $jq1("h1").attr("data-tenderType", tenderType);
                            console.log("TenderId: " + tenderId + " ItemId: " + itemId + " CustomerId: " + customerId);
                            $jq1.when($jq1("#drpSearchCustomer").val(customerId)).then(function () {
                                $jq1("#drpSearchCustomer").trigger("change");

                                MakeddSearchable();
                                ShowSubmitButton();
                                UpdateFirmGuid();
                                EnableFirmTender();

                                //if (parseInt($jq1("h1").data("status")) >= 3)
                                //    $jq1("#parameters .wizard li:nth-child(5)").trigger("click");
                                //else
                                //    $jq1("#parameters .wizard li:first-child").trigger("click");

                            });

                        }

                    });
                });
                //console.log($jq1.trim($jq1("#tenderGuid").val()));


            }
            else {
                if (window.location.href.indexOf("code=") > 0) {
                    flagNewTender = 1;
                    //if ($jq1.trim($jq1("#tenderGuid").val()) == '') {

                    //}

                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                        cache: false,
                        async: false,
                        dataType: 'json',
                        data: { UniqueId: getUrlVars()["code"] },
                        success: function (data) {
                            var tenderId, itemId, customerId, projectId;
                            $jq1.each(data, function (i) {
                                var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
                                if (data[i].parameteridentity == "enduser") {
                                    if (data[i].parametervalue == "2") {
                                        $jq1("#" + id).parents(".form-group").prepend("<a class='viewagentinfobtn' href='javascript:;'>view<br/>details</a>");
                                        $jq1("#" + id).addclass("agent");
                                    }

                                }

                                console.log("Id of " + data[i].Label + " is " + id);
                                $jq1("#" + id).val(data[i].ParameterValue);
                                tenderId = data[i].TenderId;
                                itemId = data[i].ItemId;
                                customerId = data[i].CustomerId;
                                projectId = data[i].ProjectId
                            });
                            if ($jq1("#parameters .wizard li:nth-child(5)").hasClass("active")) {
                                $jq1("#txtTenderId").val(tenderId);
                            }

                            //$jq1("#txtItemId").val(itemId);
                            //$jq1("#ProjectId").text(projectId);
                            //$jq1("#tenderGuid").val("");
                            $jq1("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
                                G() + "-" + G() + G() + G()).toUpperCase());
                            console.log("TenderId: " + tenderId + " ItemId: " + itemId + " CustomerId: " + customerId);
                            $jq1.when($jq1("#drpSearchCustomer").val(customerId)).then(function () {
                                $jq1("#drpSearchCustomer").trigger("change");
                                MakeddSearchable();

                            });
                            //$jq1("#parameters .wizard li:not(:first-child)").addClass("disabled");

                        }

                    });
                }


            }
            if ($jq1("#parameters .wizard li:nth-child(3)").hasClass("active") == false) {
                MakeddSearchable();
            }


        }
    });

}

function AllFormAttributes() {

    //ALL THE FORM ATTRIBUTES ARE BEING PULLED FROM THE DATABASE
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETALLFORMATTRIBUTES',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            var HtmlMainNavigation = "<div>";
            $jq1.each(data, function (i) {
                var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();

                if (data[i].FieldTypeId != "3") {
                    HtmlMainNavigation += "<div class='form-group' data-mainmenuid='" + data[i].MainTabId + "' data-subMenu='" + data[i].SubTabId + "'>";
                    HtmlMainNavigation += "<label for='#" + id + "'>" + data[i].Label + "</label>";
                }
                else {
                    HtmlMainNavigation += "<div class='form-group hide' data-mainmenuid='" + data[i].MainTabId + "' data-subMenu='" + data[i].SubTabId + "'>";
                    HtmlMainNavigation += "<label for='#" + id + "' class='hide'>" + data[i].Label + "</label>";
                }

                HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].FieldSymbol, data[i].IsRequired) + "</div>";
            });
            HtmlMainNavigation += "<div class='review-controls-wrapper'>";
            HtmlMainNavigation += "<div class='button-wrapper'>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-PreviousFormData'>Previous</a>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-SaveAllFormData'>Save</a>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-NextFormData'>Next</a>";
            HtmlMainNavigation += "<a href='javascript:;' class='btn-SubmitFirmData'>See Pricing</a>";
            HtmlMainNavigation += "</div>";
            //HtmlMainNavigation += "<a href='javascript:;' class='btn-allocate'>Allocate to</a>";
            //HtmlMainNavigation += "<a href='javascript:;' class='btn-editEndUserInfo'>View end user details</a>";
            HtmlMainNavigation += "</div>";
            $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

            //DROPDOWN VALUES ARE BEING POPULATED FROM THE DATABASE
            LoadDataForDropdown();


            //EDIT SCREEN VALUES TO BE POPULATED
            if (window.location.href.indexOf("NewTender") <= 0) {
                //if ($jq1.trim(getUrlVars()["code"]) == $jq1.trim($jq1("#tenderGuid").val())) {
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                    cache: false,
                    async: false,
                    dataType: 'json',
                    data: { UniqueId: $jq1.trim(getUrlVars()["code"]) },
                    success: function (data) {
                        var tenderId, itemId, customerId, projectId, Awardeddate;
                        $jq1.each(data, function (i) {
                            var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
                            if (data[i].ParameterIdentity == "enduser") {
                                if (data[i].ParameterValue == "2") {
                                    $jq1("#" + id).parents(".form-group").prepend("<a class='viewAgentInfobtn' href='javascript:;'>View<br/>details</a>");
                                    $jq1("#" + id).addClass("agent");
                                }
                            }

                            $jq1("#" + id).val(data[i].ParameterValue);
                            tenderId = data[i].TenderId;
                            itemId = data[i].ItemId;
                            customerId = data[i].CustomerId;
                            projectId = data[i].ProjectId
                            Awardeddate = data[i].EstimatedAwardDate;
                            console.log("Tender id" + tenderId + ",item id" + itemId + "customerid:" + customerId);;
                        });
                        if ($jq1("#parameters .wizard li:nth-child(5)").hasClass("active")) {
                            $jq1("#txtTenderId").val(tenderId);
                            if (hasChild == 0) {
                                $jq1("#txtTenderId").val($jq1("#txtTenderId").val());
                            }
                        }
                        var date = new Date(Awardeddate);
                        var dateToBeUpdated = new Date(date.getFullYear(), date.getMonth(), date.getDate());


                        $jq1("#txtForecasteDate").datepicker({
                            format: "dd-mm-yyyy"
                        });
                        $jq1("#txtForecasteDate").datepicker('setDate', dateToBeUpdated);
                        $jq1("#txtItemId").val(itemId);
                        $jq1("#ProjectId").text(projectId);
                        console.log("TenderId: " + tenderId + " ItemId: " + itemId + " CustomerId: " + customerId);
                        $jq1.when($jq1("#drpSearchCustomer").val(customerId)).then(function () {
                            $jq1("#drpSearchCustomer").trigger("change");

                            MakeddSearchable();
                            ShowSubmitButton();
                            if (hasChild == 1)
                                //ShowFirmSubmitButton();
                            EnableFirmTender();
                        });

                    }

                });
                //}
                //  $jq1("#tenderGuid").val(getUrlVars()["code"]).promise().then(function () {

                //});
                //console.log($jq1.trim($jq1("#tenderGuid").val()));


            }
            else {
                if (window.location.href.indexOf("code=") > 0) {
                    flagNewTender = 1;
                    //if ($jq1.trim($jq1("#tenderGuid").val()) == '') {

                    //}

                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                        cache: false,
                        async: false,
                        dataType: 'json',
                        data: { UniqueId: getUrlVars()["code"] },
                        success: function (data) {
                            var tenderId, itemId, customerId, projectId;
                            $jq1.each(data, function (i) {
                                var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
                                if (data[i].parameteridentity == "enduser") {
                                    if (data[i].parametervalue == "2") {
                                        $jq1("#" + id).parents(".form-group").prepend("<a class='viewagentinfobtn' href='javascript:;'>view<br/>details</a>");
                                        $jq1("#" + id).addclass("agent");
                                    }

                                }

                                console.log("Id of " + data[i].Label + " is " + id);
                                $jq1("#" + id).val(data[i].ParameterValue);
                                tenderId = data[i].TenderId;
                                itemId = data[i].ItemId;
                                customerId = data[i].CustomerId;
                                projectId = data[i].ProjectId
                            });
                            //$jq1("#txtTenderId").val(tenderId);
                            //$jq1("#txtItemId").val(itemId);
                            //$jq1("#ProjectId").text(projectId);
                            //$jq1("#tenderGuid").val("");
                            $jq1("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
                                G() + "-" + G() + G() + G()).toUpperCase());
                            console.log("TenderId: " + tenderId + " ItemId: " + itemId + " CustomerId: " + customerId);
                            $jq1.when($jq1("#drpSearchCustomer").val(customerId)).then(function () {
                                $jq1("#drpSearchCustomer").trigger("change");
                                MakeddSearchable();

                            });
                            //$jq1("#parameters .wizard li:not(:first-child)").addClass("disabled");

                        }

                    });
                }
            }

            MakeddSearchable();
            EnableFirmTender();
        }
    });

}



/**--------------- Form Generation ends --------------**/
$jq1(window).on("load", function () {
    flagAllocate = true;
    var currentRole = $jq1(".user-information .role").data("roleid");
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETALLROLES',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            var HTmlData = "";
            $jq1(data).each(function (i) {
                if (data[i].RoleId != 6 && data[i].RoleId != 8 && data[i].RoleId != currentRole) {
                    HTmlData += "<li data-roleid='" + data[i].RoleId + "'><a href='javascript:;'>";
                    HTmlData += data[i].Role;
                    HTmlData += "</a></li>";
                }

            });
            $jq1(".allocation-button .dropdown-menu").html(HTmlData);
        }
    });

    $jq1("#unitssiorus").trigger("change");
    if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0)
        ShowSubmitButton();

});

//For the designpressure
function PopulatePressureUnits() {
    var HTMLUnits = "";
    HTMLUnits += "<option value='1'>bar</option>";
    HTMLUnits += "<option value='2'>psi</option>";
    $jq1("#unitsOfPressure").append(HTMLUnits);
}

//For the designpressure
function PopulateTemperatureUnits() {
    var HTMLUnits = "";
    HTMLUnits += "<option value='1'>°C</option>";
    HTMLUnits += "<option value='2'>°F</option>";
    $jq1("#unitsOftemperature").append(HTMLUnits);
}

function UpdateStatusOfTender(TenderId) {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=RETURNSTATUS',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
            TenderUniqueId: TenderId
        },
        success: function (data) {
            $jq1("h1").attr("data-status", data[0].Status);
            $jq1("h1").attr("data-tendertype", data[0].TenderType);
        }
    });
}
$jq1(document).ready(function () {
    flagFirst = 0;
    if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0)
        flagcheck = 0;
    else
        flagcheck = 1;

    if (window.location.href.indexOf("EditTender.aspx") > 0 && window.location.href.indexOf("?code=") > 0) {
        UpdateStatusOfTender(getUrlVars()["code"]);
    }


    PageCreation();


    $jq1(document).on("change", "#drpSearchCustomer", function () {
        var id = $jq1(this).val();
        $jq1("#customerid").val(id);
        if (id != "0") {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=GETCUSTOMERBYID',
                cache: false,
                async: false,
                data: { Id: id },
                dataType: 'json',
                success: function (data) {
                    var HtmlMainNavigation = "<div>";

                    $jq1("input#contact").val(data[0].FirstName + " " + data[0].LastName);
                    $jq1("input#streetnumber").val(data[0].StreetNumber);
                    $jq1("input#title").val(data[0].Gender == true ? "Mr" : "Miss");
                    $jq1("input#postalcodecity").val(data[0].PostalCodeCity);
                    var text = data[0].PumpManufacturer;
                    var value;
                    $jq1("input#projectdescription").val(data[0].ProjectDescription);
                    $jq1("input#sapcustomersreference").val(data[0].CustomersReference);
                    //$jq1("input#enduser").val(data[0].EndUser);
                    $jq1("#country").val(data[0].Country);
                    $jq1("#customername").val(data[0].Customer);
                }
            });
        }
        else {
            $jq1("input#contact").val("");
            $jq1("input#streetnumber").val("");
            $jq1("input#postalcodecity").val("");
            $jq1("input#projectdescription").val("");
            $jq1("input#sapcustomersreference").val("");
            $jq1("#validityperiodofthetender").val('0');
        }


    });
    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());


    $jq1('.date').datepicker({
        format: "dd-mm-yyyy"
    });
    $jq1('.date').datepicker('setDate', today);

    
    $jq1(document).on("change", "#unitssiorus", function () {
        var elem = $jq1(this);
        if (elem.val() == "SI") {
            $jq1("#unitsOfPressure").val("1");
            $jq1("#unitsOftemperature").val("1");
            $jq1("#unitsOfPressure").parents(".form-group").find("label").html("Design Pressure (max: 40 bar)");
            $jq1("#unitsOftemperature").parents(".form-group").find("label").html("Design Temperature (max: 200 °C)");
        }
        else if (elem.val() == "US") {
            $jq1("#unitsOfPressure").val("2");
            $jq1("#unitsOftemperature").val("2");
            $jq1("#unitsOfPressure").parents(".form-group").find("label").html("Design Pressure (max: 580 psi)");
            $jq1("#unitsOftemperature").parents(".form-group").find("label").html("Design Temperature (max: 392°F)");
        }
        else {
            $jq1("#unitsOfPressure").val("0");
            $jq1("#unitsOftemperature").val("0");
        }
    });
    var objData = [];
    $jq1(document).on("click", ".btn-SubmitFormData", function () {
        /*------------  Added by Soumya (Starts) ----------*/
        var currencyExchangeRate;
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=CURRENCYEXCHANGERATE',
            type: 'POST',
            async: false,
            data: {
                CountryCode: $jq1.trim($jq1("#currencySelected").val())
            },
            dataType: 'json',
            success: function (data) {
                currencyExchangeRate = data[0].Value
            }
        });
        /*------------  Added by Soumya (Ends) ----------*/
        flagAllocate = true;
        var cost = 0;
        var HTMLData = "";
        //HTMLData += "<tbody>";
        objData = [];
        $jq1("ul.wizard li.active").next().removeClass("disabled");
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=NEWOHXPRICINGDATA',
            cache: false,
            async: false,
            type: 'POST',
            data: {
                TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()),
                CostCurrency: $jq1.trim($jq1("#currencyeurorusd").val()),
                Balancing: $jq1.trim($jq1("#balancing").val()),
                CouplingVendor: $jq1.trim($jq1("#couplingvendor").val()),
                Type: $jq1.trim($jq1("#type").val()),
                Vendor: $jq1.trim($jq1("#bearingvendor").val()),
                Material: $jq1.trim($jq1("#material").val()),
                SealSystemVendor: $jq1.trim($jq1("#sealsystemvendor").val()),
                PipeTube: $jq1.trim($jq1("#pipetube").val()),
                Plan: $jq1.trim($jq1("#plan").val()),
                MechanicalSealVendor: $jq1.trim($jq1("#mechanicalsealvendor").val()),
                ShaftSealDiameter: $jq1.trim($jq1("#shaftsealdiametermm").val()),
                BearingFrameSize: $jq1.trim($jq1("#bearingframesize").val()),
                MechanicalSeal: $jq1.trim($jq1("#mechanicalseal").val()),
                MLE: $jq1.trim($jq1("#mle").val()),
                SpacerLength: $jq1.trim($jq1("#spacerlengthmm").val()),
                Spacer: $jq1.trim($jq1("#spacer").val()),
                PowerPerSpeed: $jq1.trim(($jq1("#motorpowerkw").val() / $jq1("#speedrpm").val()))

            },
            dataType: 'json',
            success: function (data) {

                var totalCost = 0;
                $jq1(data).each(function (i) {
                    var dataPair = {};
                    dataPair["Id"] = data[i].Id;
                    dataPair["ProductId"] = data[i].ProductId;
                    dataPair["dataId"] = data[i].DataColumnId;
                    dataPair["ProductName"] = data[i].Product;
                    dataPair["BearingFrameSize"] = data[i].BearingFrameSize;
                    dataPair["ShaftSealDiameter"] = data[i].ShaftSealDiameter;
                    dataPair["SealSystemPlan"] = data[i].SealSystemPlan;
                    dataPair["Material"] = data[i].Material;
                    dataPair["Vendor"] = data[i].Vendor;
                    dataPair["CouplingType"] = data[i].CouplingType;
                    dataPair["Powerperrpm"] = data[i].Powerperrpm;
                    dataPair["Spacer"] = data[i].Spacer;
                    dataPair["SpacerLength"] = data[i].SpacerLength;
                    dataPair["Balancing"] = data[i].Balancing;
                    dataPair["MechanicalSeal"] = data[i].MechanicalSeal;
                    dataPair["PipeorTube"] = data[i].PipeorTube;
                    dataPair["MLE"] = data[i].MLE;
                    dataPair["Notes"] = data[i].Notes;
                    //Added by Soumya to update the cost as per the selected currency unit
                    if (data[i].Qty != 0 && typeof data[i].Qty != undefined) {
                        dataPair["CostPerQty"] = parseFloat(parseFloat(currencyExchangeRate) * parseFloat(data[i].CostPerQty)).toFixed(2);
                        //To calculate the net cost according to the exchange rate
                        //dataPair["NetCost"] = data[i].NetCost;
                        dataPair["NetCost"] = parseFloat(parseFloat(currencyExchangeRate) * parseFloat(data[i].CostPerQty) * parseFloat(data[i].Qty)).toFixed(2);
                    }
                    dataPair["Qty"] = data[i].Qty;
                    dataPair["Currency"] = data[i].Currency;
                    objData.push(dataPair);
                });
            }
        });


        HTMLData += "<button type='button' id='btnAdd' style='height: 33px; width: 160px; margin-right: 5px;' class='btn btn-primary classAdd'>Add More</button>";
        HTMLData += "<div class='scrollTable'>";
        HTMLData += "<table Id='tblproductPricing' class='tblProduct'>";
        HTMLData += "<thead> <tr>";
        var j = 0;
        $jq1(objData).each(function (i) {
            if (i == 0) {
                for (var Key in objData[i]) {
                    var dataCol1 = Key;
                    j++;
                    if (j > 3)
                        HTMLData += "<th style='width: 100px;'>" + dataCol1 + "</th>";
                    else
                        HTMLData += "<th class='hidden' data-visible='false'>" + dataCol1 + "</th>";
                }
                HTMLData += "<th style='width: 200px;'>Remove Row</th>";
            }
        });
        HTMLData += "</tr> </thead>";

        HTMLData += "<tbody>";


        $jq1(objData).each(function (i) {
            HTMLData += "<tr class='pricing-data' id=" + objData[i].Id + ">";

            for (var Key in objData[i]) {
                if (objData[i].ProductId != 0 && objData[i].dataId != 0) {
                    if (Key == "Notes") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 200px;' name='txt_" + Key + "' class='form'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "Qty") {

                        HTMLData += "<td>";
                        HTMLData += "<input type='number' style='width: 50px;' class='qty' name='txt_" + Key + "' min='0' value='" + objData[i].Qty + "' />";
                        HTMLData += "</td>";

                    }
                    else if (Key == "Id") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "ProductId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "dataId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    //Added by Soumya
                    else if (Key == "Currency") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "' class='form'  value='" + $jq1.trim($jq1("#currencySelected").val()) + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "NetCost") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' class='netCost' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "'   value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }

                    else {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "' class='form' value='" + objData[i][Key] + " ' readonly='true'></input>";
                        HTMLData += "</td>";
                    }

                }
                else {

                    if (Key == "Id") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' class='fetchid' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "ProductId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "dataId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }

                    else if (Key == "NetCost") {
                        HTMLData += "<td >";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' class='netCost' name='txt_" + Key + "'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }

                    else if (Key == "Notes") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 200px;' name='txt_" + Key + "' class='form'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    //Added by Soumya
                    else if (Key == "Currency") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "' class='form'  value='" + $jq1.trim($jq1("#currencySelected").val()) + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key != "Qty") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px;'  name='txt_" + Key + "' class='form' value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else {
                        HTMLData += "<td>";
                        HTMLData += "<input type='number' style='width: 50px;' class='qty' name='txt_" + Key + "' min='0' value='" + objData[i].Qty + "'  />";
                        HTMLData += "</td>";
                    }
                }
            }


            if (objData[i].ProductId == 0 && objData[i].dataId == 0)
                HTMLData += "<td><button type='button' id='btnDelete' style='width: 100px; height: 30px;'  class='deleteProduct btn btn btn-danger btn-xs'>Remove</button></td>";
            else
                HTMLData += "<td></td>";

            HTMLData += "</tr > ";
        });

        HTMLData += "</tbody > ";
        HTMLData += "</table>";
        HTMLData += "</div>";

        HTMLData += "<div class='totalCost'>";
        HTMLData += "<p><span class='bold-text'>Total cost:</span><input type='text' value='" + cost + "' id='totalCost' disabled /><span class='currencyCode'>" + $jq1.trim($jq1("#currencyeurorusd").val()) + "</span></p>";
        HTMLData += "</div>";
        HTMLData += "<div class='button-wrapper'>";
        HTMLData += "<a href='javascript:;' class='btn btn-primary btnReviewForm'>Review</a>";
        HTMLData += "<a href='javascript:;' class='btn btn-primary btnSavePricing'>Save</a>";
        HTMLData += "</div>";
        $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html("<div style='height:80vh;overflow-y:scroll;padding-right:30px'>" + HTMLData + "</div>");
        $jq1(".tabs-wrapper").hide();
        $jq1(".tabs-content-wrapper").addClass("topBorder");

        $jq1("#parameters .wizard li").removeClass("active");
        $jq1("#parameters .wizard li:nth-child(2)").addClass("active");

        var tempCost = 0;
        $jq1("#tblproductPricing tr").each(function (i, v) {
            if (i >= 1) {
                var row = $jq1(this);
                tempCost += parseFloat(row.find("input").eq(19).val());
            }
        });

        $jq1("#totalCost").val(tempCost);
    });

    //Added by Soumya
    $jq1(document).on("change", ".qty", function () {
        $jq1(".qty").trigger("keyup");
    });
    //Added by Soumya
    $jq1(document).on("change", ".costPerQty", function () {
        var Row = $jq1(this).closest("tr");
        var yourqty = Row.find("input").eq(20).val();
        var qtyPerUnit = Row.find("input").eq(18).val();
        var NetCost = parseFloat(yourqty) * parseFloat(qtyPerUnit);
        Row.find("input").eq(19).val(NetCost);

        var tempCost = 0;
        $jq1("#tblproductPricing tr").each(function (i, v) {
            if (i >= 1) {
                var row = $jq1(this);
                tempCost += parseFloat(row.find("input").eq(19).val());
            }
        });

        $jq1("#totalCost").val(tempCost);

    });
    $jq1(document).on("keyup", ".qty", function () {
        var Row = $jq1(this).closest("tr");
        console.log(Row);
        var yourqty = Row.find("input").eq(20).val();
        var qtyPerUnit = Row.find("input").eq(18).val();

        var NetCost = parseFloat(yourqty) * parseFloat(qtyPerUnit);

        Row.find("input").eq(19).val(NetCost);

        var tempCost = 0;
        $jq1("#tblproductPricing tr").each(function (i, v) {
            if (i >= 1) {
                var row = $jq1(this);
                tempCost += parseFloat(row.find("input").eq(19).val());
            }
        });

        $jq1("#totalCost").val(tempCost);
    });


    $jq1(document).on("click", ".classAdd", function () {

        var HTMLData = '';
        $jq1(objData).each(function (i) {
            if (i == 0) {
                HTMLData += "<tr class='pricing-data' id='0'>";
                for (var Key in objData[i]) {

                    if (Key == "Id") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' class='fetchid' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='0'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "ProductId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='0'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "dataId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='0'></input>";
                        HTMLData += "</td>";
                    }

                    else if (Key == "NetCost") {
                        HTMLData += "<td >";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' class='netCost' name='txt_" + Key + "'  value=''></input>";
                        HTMLData += "</td>";
                    }

                    else if (Key == "Notes") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 200px;' name='txt_" + Key + "' class='form'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    //Added by Soumya
                    else if (Key == "CostPerQty") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px;'  name='txt_" + Key + "' class='form costPerQty' value=''></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "Currency") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;'  name='txt_" + Key + "' class='form currency' value='" + $jq1.trim(objData[i][Key]) + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key != "Qty") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px;'  name='txt_" + Key + "' class='form' value=''></input>";
                        HTMLData += "</td>";
                    }
                    else {
                        HTMLData += "<td>";
                        HTMLData += "<input type='number' style='width: 50px;' class='qty' name='txt_" + Key + "' min='0' value='1' />";
                        HTMLData += "</td>";
                    }

                }
                HTMLData += "<td><button type='button' id='btnDelete' style='width: 100px; height: 30px;'  class='deleteProduct btn btn btn-danger btn-xs'>Remove</button></td>";
                HTMLData += "</tr> ";
            }
        });

        $jq1('#tblproductPricing').append(HTMLData); // Adding these controls to Main table class  
    });


    $jq1(document).on("click", ".deleteProduct", function () {
        var Row = $jq1(this).closest("tr");
        console.log(Row);
        var yourCell = Row.find('.fetchid');
        var IDforDelet = yourCell.val();
        console.log(IDforDelet);
        if (IDforDelet == 0) {
            $jq1(this).closest("tr").remove(); // closest used to remove the respective 'tr' in which I have my controls   
        }
        else {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=DELTEDATAINTABLE',
                type: "POST",
                async: false,
                dataType: 'html',
                data: { Id: IDforDelet },
                success: function (data) {

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
            });
            $jq1(this).closest("tr").remove();
        }
    });


    $jq1(document).on("click", ".btnSavePricing", function () {

        var data = Array();
        $jq1("#tblproductPricing tr").each(function (i, v) {
            if (i >= 1) {
                var row = $jq1(this);
                TableData = new Array();
                TableData = {
                    Id: row.find("input").eq(0).val(),
                    ProductId: row.find("input").eq(1).val(),
                    DataColumnId: row.find("input").eq(2).val(),
                    TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()),
                    Product: row.find("input").eq(3).val(),
                    BearingFrameSize: row.find("input").eq(4).val(),
                    ShaftSealDiameter: row.find("input").eq(5).val(),
                    SealSystemPlan: row.find("input").eq(6).val(),
                    Material: row.find("input").eq(7).val(),
                    Vendor: row.find("input").eq(8).val(),
                    CouplingType: row.find("input").eq(9).val(),
                    Powerperrpm: row.find("input").eq(10).val(),
                    Spacer: row.find("input").eq(11).val(),
                    SpacerLength: row.find("input").eq(12).val(),
                    Balancing: row.find("input").eq(13).val(),
                    MechanicalSeal: row.find("input").eq(14).val(),
                    PipeorTube: row.find("input").eq(15).val(),
                    MLE: row.find("input").eq(16).val(),
                    Notes: row.find("input").eq(17).val(),
                    CostPerQty: row.find("input").eq(18).val(),
                    NetCost: row.find("input").eq(19).val(),
                    Qty: row.find("input").eq(20).val(),
                    Currency: row.find("input").eq(21).val()
                }
                data.push(TableData);

            }
        });

        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=ADDDATAINTABLE',
            type: "POST",
            async: false,
            dataType: 'html',
            data: { ValStr: JSON.stringify(data) },
            success: function (data) {
                console.log(data);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + " " + errorThrown);
            },
        });

        alert("Saved");
        $jq1("#btn-SubmitFormData").trigger("click");
    });


    $jq1(document).on("click", ".btn-SubmitFirmData", function () {
        /*------------  Added by Soumya (Starts) ----------*/
        var currencyExchangeRate;
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=CURRENCYEXCHANGERATE',
            type: 'POST',
            async: false,
            data: {
                CountryCode: $jq1.trim($jq1("#currencySelected").val())
            },
            dataType: 'json',
            success: function (data) {
                currencyExchangeRate = data[0].Value
            }
        });
        /*------------  Added by Soumya (Ends) ----------*/
        flagAllocate = true;
        var cost = 0;
        var HTMLData = "";
        //HTMLData += "<tbody>";
        objData = [];
        $jq1("ul.wizard li.active").next().removeClass("disabled");
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=NEWOHXPRICINGDATA',
            cache: false,
            async: false,
            type: 'POST',
            data: {
                TenderUniqueId: $jq1.trim(getUrlVars()["code"]),
                CostCurrency: $jq1.trim($jq1("#currencyeurorusd").val()),
                Balancing: $jq1.trim($jq1("#balancing").val()),
                CouplingVendor: $jq1.trim($jq1("#couplingvendor").val()),
                Type: $jq1.trim($jq1("#type").val()),
                Vendor: $jq1.trim($jq1("#bearingvendor").val()),
                Material: $jq1.trim($jq1("#material").val()),
                SealSystemVendor: $jq1.trim($jq1("#sealsystemvendor").val()),
                PipeTube: $jq1.trim($jq1("#pipetube").val()),
                Plan: $jq1.trim($jq1("#plan").val()),
                MechanicalSealVendor: $jq1.trim($jq1("#mechanicalsealvendor").val()),
                ShaftSealDiameter: $jq1.trim($jq1("#shaftsealdiametermm").val()),
                BearingFrameSize: $jq1.trim($jq1("#bearingframesize").val()),
                MechanicalSeal: $jq1.trim($jq1("#mechanicalseal").val()),
                MLE: $jq1.trim($jq1("#mle").val()),
                SpacerLength: $jq1.trim($jq1("#spacerlengthmm").val()),
                Spacer: $jq1.trim($jq1("#spacer").val()),
                PowerPerSpeed: $jq1.trim(($jq1("#motorpowerkw").val() / $jq1("#speedrpm").val()))

            },
            dataType: 'json',
            success: function (data) {

                var totalCost = 0;
                $jq1(data).each(function (i) {
                    var dataPair = {};
                    dataPair["Id"] = data[i].Id;
                    dataPair["ProductId"] = data[i].ProductId;
                    dataPair["dataId"] = data[i].DataColumnId;
                    dataPair["ProductName"] = data[i].Product;
                    dataPair["BearingFrameSize"] = data[i].BearingFrameSize;
                    dataPair["ShaftSealDiameter"] = data[i].ShaftSealDiameter;
                    dataPair["SealSystemPlan"] = data[i].SealSystemPlan;
                    dataPair["Material"] = data[i].Material;
                    dataPair["Vendor"] = data[i].Vendor;
                    dataPair["CouplingType"] = data[i].CouplingType;
                    dataPair["Powerperrpm"] = data[i].Powerperrpm;
                    dataPair["Spacer"] = data[i].Spacer;
                    dataPair["SpacerLength"] = data[i].SpacerLength;
                    dataPair["Balancing"] = data[i].Balancing;
                    dataPair["MechanicalSeal"] = data[i].MechanicalSeal;
                    dataPair["PipeorTube"] = data[i].PipeorTube;
                    dataPair["MLE"] = data[i].MLE;
                    dataPair["Notes"] = data[i].Notes;
                    //Added by Soumya to update the cost as per the selected currency unit
                    if (data[i].Qty != 0 && typeof data[i].Qty != undefined) {
                        dataPair["CostPerQty"] = parseFloat(parseFloat(currencyExchangeRate) * parseFloat(data[i].CostPerQty)).toFixed(2);
                        //To calculate the net cost according to the exchange rate
                        //dataPair["NetCost"] = data[i].NetCost;
                        dataPair["NetCost"] = parseFloat(parseFloat(currencyExchangeRate) * parseFloat(data[i].CostPerQty) * parseFloat(data[i].Qty)).toFixed(2);
                    }
                    dataPair["Qty"] = data[i].Qty;
                    dataPair["Currency"] = data[i].Currency;
                    objData.push(dataPair);
                });
            }
        });


        HTMLData += "<button type='button' id='btnAdd' style='height: 33px; width: 160px; margin-right: 5px;' class='btn btn-primary classAdd'>Add More</button>";
        HTMLData += "<div class='scrollTable'>";
        HTMLData += "<table Id='tblproductPricing' class='tblProduct'>";
        HTMLData += "<thead> <tr>";
        var j = 0;
        $jq1(objData).each(function (i) {
            if (i == 0) {
                for (var Key in objData[i]) {
                    var dataCol1 = Key;
                    j++;
                    if (j > 3)
                        HTMLData += "<th style='width: 100px;'>" + dataCol1 + "</th>";
                    else
                        HTMLData += "<th class='hidden' data-visible='false'>" + dataCol1 + "</th>";
                }
                HTMLData += "<th style='width: 200px;'>Remove Row</th>";
            }
        });
        HTMLData += "</tr> </thead>";

        HTMLData += "<tbody>";


        $jq1(objData).each(function (i) {
            HTMLData += "<tr class='pricing-data' id=" + objData[i].Id + ">";

            for (var Key in objData[i]) {
                if (objData[i].ProductId != 0 && objData[i].dataId != 0) {
                    if (Key == "Notes") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 200px;' name='txt_" + Key + "' class='form'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "Qty") {

                        HTMLData += "<td>";
                        HTMLData += "<input type='number' style='width: 50px;' class='qty' name='txt_" + Key + "' min='0' value='" + objData[i].Qty + "' />";
                        HTMLData += "</td>";

                    }
                    else if (Key == "Id") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "ProductId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "dataId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    //Added by Soumya
                    else if (Key == "Currency") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "' class='form'  value='" + $jq1.trim($jq1("#currencySelected").val()) + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "NetCost") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' class='netCost' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "'   value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }

                    else {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "' class='form' value='" + objData[i][Key] + " ' readonly='true'></input>";
                        HTMLData += "</td>";
                    }

                }
                else {

                    if (Key == "Id") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' class='fetchid' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "ProductId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key == "dataId") {
                        HTMLData += "<td class='hidden'>";
                        HTMLData += "<input type='text' style='width: 0px; visibility: collapse;' name='txt_" + Key + "' class='hidden'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }

                    else if (Key == "NetCost") {
                        HTMLData += "<td >";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' class='netCost' name='txt_" + Key + "'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }

                    else if (Key == "Notes") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 200px;' name='txt_" + Key + "' class='form'  value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    //Added by Soumya
                    else if (Key == "Currency") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px; background-color: #87CEFA; pointer-events:none;' name='txt_" + Key + "' class='form'  value='" + $jq1.trim($jq1("#currencySelected").val()) + "'></input>";
                        HTMLData += "</td>";
                    }
                    else if (Key != "Qty") {
                        HTMLData += "<td>";
                        HTMLData += "<input type='text' style='width: 100px;'  name='txt_" + Key + "' class='form' value='" + objData[i][Key] + "'></input>";
                        HTMLData += "</td>";
                    }
                    else {
                        HTMLData += "<td>";
                        HTMLData += "<input type='number' style='width: 50px;' class='qty' name='txt_" + Key + "' min='0' value='" + objData[i].Qty + "'  />";
                        HTMLData += "</td>";
                    }
                }
            }


            if (objData[i].ProductId == 0 && objData[i].dataId == 0)
                HTMLData += "<td><button type='button' id='btnDelete' style='width: 100px; height: 30px;'  class='deleteProduct btn btn btn-danger btn-xs'>Remove</button></td>";
            else
                HTMLData += "<td></td>";

            HTMLData += "</tr > ";
        });

        HTMLData += "</tbody > ";
        HTMLData += "</table>";
        HTMLData += "</div>";

        HTMLData += "<div class='totalCost'>";
        HTMLData += "<p><span class='bold-text'>Total cost:</span><input type='text' value='" + cost + "' id='totalCost' disabled /><span class='currencyCode'>" + $jq1.trim($jq1("#currencyeurorusd").val()) + "</span></p>";
        HTMLData += "</div>";
        HTMLData += "<div class='button-wrapper'>";
        HTMLData += "<a href='javascript:;' class='btn btn-primary btnFirmReviewForm'>Review</a>";
        HTMLData += "<a href='javascript:;' class='btn btn-primary btnSaveFirmPricing'>Save</a>";
        HTMLData += "</div>";
        $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html("<div style='height:80vh;overflow-y:scroll;padding-right:30px'>" + HTMLData + "</div>");
        $jq1(".tabs-wrapper").hide();
        $jq1(".tabs-content-wrapper").addClass("topBorder");

        $jq1("#parameters .wizard li").removeClass("active");
        $jq1("#parameters .wizard li:nth-child(6)").addClass("active");
        EnableFirmTender();

        var tempCost = 0;
        $jq1("#tblproductPricing tr").each(function (i, v) {
            if (i >= 1) {
                var row = $jq1(this);
                tempCost += parseFloat(row.find("input").eq(19).val());
            }
        });

        $jq1("#totalCost").val(tempCost);
    });

    $jq1(document).ajaxComplete(function () {
        if ($jq1(".topBorder").length > 0) {
            $jq1(".tabs-wrapper").hide();
        }

    });
    $jq1(document).on("click", ".btnReviewForm", function () {
        $jq1("#parameters .wizard li").removeClass("active");
        $jq1("#parameters .wizard li:nth-child(3)").addClass("active");
        var id = $jq1.trim($jq1("#tenderGuid").val());
        GetAllFormAttributes();
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
            cache: false,
            async: false,
            dataType: 'json',
            data: { UniqueId: id },
            success: function (data) {
                var tenderId, itemId, customerId, projectId, AwardedDate;
                $jq1.each(data, function (i) {
                    var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
                    console.log("Id of " + data[i].Label + " is " + id + "and its value is" + data[i].ParameterValue);
                    $jq1("#" + id).val(data[i].ParameterValue);
                    tenderId = data[i].TenderId;
                    itemId = data[i].ItemId;
                    customerId = data[i].CustomerId;
                    projectId = data[i].ProjectId;
                    AwardedDate = data[i].EstimatedAwardDate;
                });
                if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0) {
                    $jq1("#txtTenderId").val(tenderId);
                    $jq1("#txtItemId").val(itemId);
                    $jq1("#ProjectId").text(projectId);
                    $jq1("#txtForecasteDate").val(AwardedDate);
                    console.log("TenderId: " + tenderId + " ItemId: " + itemId + " CustomerId: " + customerId);
                    $jq1.when($jq1("#drpSearchCustomer").val(customerId)).then(function () {
                        $jq1("#drpSearchCustomer").trigger("change");

                        //MakeddSearchable();

                    });
                }



            }

        });
        PopulatePressureUnits();
        PopulateTemperatureUnits();
        DisableAllInputs();

        $jq1(".tabs-content-wrapper").addClass("topBorder");

        $jq1("#unitssiorus").trigger("change");
        //$jq1(".review-controls-wrapper .button-wrapper").html("<a href='javascript:;' class='btn btn-primary btn-generateTender'>Generate Quote</a>");
        $jq1(".review-controls-wrapper .button-wrapper").html("<a href='javascript:;' class='btn btn-primary btn-viewQuote'>Generate Quote</a>");
        $jq1(".tabs-wrapper").hide();


    });

    $jq1(document).on("click", ".btnFirmReviewForm", function () {
        $jq1("#parameters .wizard li").removeClass("active");
        $jq1("#parameters .wizard li:nth-child(7)").addClass("active");
        var id = $jq1.trim(getUrlVars()["code"]);
        AllFormAttributes();
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
            cache: false,
            async: false,
            dataType: 'json',
            data: { UniqueId: id },
            success: function (data) {
                var tenderId, itemId, customerId, projectId, AwardedDate;
                $jq1.each(data, function (i) {
                    var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
                    console.log("Id of " + data[i].Label + " is " + id + "and its value is" + data[i].ParameterValue);
                    $jq1("#" + id).val(data[i].ParameterValue);
                    tenderId = data[i].TenderId;
                    itemId = data[i].ItemId;
                    customerId = data[i].CustomerId;
                    projectId = data[i].ProjectId;
                    AwardedDate = data[i].EstimatedAwardDate;
                });
                if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0) {
                    $jq1("#txtTenderId").val(tenderId);
                    $jq1("#txtItemId").val(itemId);
                    $jq1("#ProjectId").text(projectId);
                    var date = new Date(Awardeddate);
                    var dateToBeUpdated = new Date(date.getFullYear(), date.getMonth(), date.getDate());


                    $jq1("#txtForecasteDate").datepicker({
                        format: "dd-mm-yyyy"
                    });
                    $jq1("#txtForecasteDate").datepicker('setDate', dateToBeUpdated);
                    //var formatedDateOfCreation = new Date(Awardeddate);
                    $jq1("#txtForecasteDate").val(FormatMonthInDigits(date.getMonth()) + "/" + date.getDate() + "/" + date.getFullYear());
                    $jq1.when($jq1("#drpSearchCustomer").val(customerId)).then(function () {
                        $jq1("#drpSearchCustomer").trigger("change");

                        //MakeddSearchable();

                    });
                }



            }

        });
        PopulatePressureUnits();
        PopulateTemperatureUnits();
        DisableAllInputs();

        $jq1(".tabs-content-wrapper").addClass("topBorder");

        $jq1("#unitssiorus").trigger("change");
        //$jq1(".review-controls-wrapper .button-wrapper").html("<a href='javascript:;' class='btn btn-primary btn-generateTender'>Generate Quote</a>");
        $jq1(".review-controls-wrapper .button-wrapper").html("<a href='javascript:;' class='btn btn-primary btn-viewFirmQuote'>Generate Quote</a>");
        $jq1(".tabs-wrapper").hide();
        $jq1("#parameters .wizard li").removeClass("active");
        $jq1("#parameters .wizard li:nth-child(7)").addClass("active");
    });

    $jq1(document).on("click", ".allocateTenderpopup .customPopup .btnClosePopup,#allocateToanotherGroup1 .dropdown-menu li", function () {
        $jq1(".overlay,.customPopup").removeClass("active");
    });
    $jq1(document).on("click", ".allocation-button .dropdown-menu li a", function () {
        if (CheckValidTender()) {
            allocatedTo = $jq1(this).text();
            roleId = $jq1(this).parents("li").data("roleid");
            //Change By Akash
            var modal = $jq1("#MessageModal .modal-header");
            console.log(modal);
            modal.find('.modal-title').html("Message For Tender Allocat To : " + allocatedTo);
            //Change By Akash
            $jq1(".messageModal").trigger("click");
            $jq1(".allocation-button .dropdown-menu li a").removeClass("selected");


        }
        else {
            alert("Please create a tender first");
        }

    });

    $jq1(document).on("change", ".inputProductQuantity", function () {
        var cost = (parseFloat($jq1(this).parents(".tblProduct").find("td[data-column='Cost']").text()) * parseFloat($jq1(this).val()));
        var tempCost = 0;
        $jq1(this).parents(".tblProduct").find(".netCost").text(cost);
        $jq1(".tblProduct").each(function () {
            tempCost += parseFloat($jq1(this).find(".netCost").text());
        });
        $jq1("#totalCost").val(tempCost);
    });

    $jq1(document).on("change", '#mechanicalseal', function () {
        var elem = $jq1(this);
        if (elem.val() == "Single") {
            $jq1("#sealsystemsuppliedby,#sealsystemvendor,#plan,#pipetube").removeClass("validate");
            $jq1("#sealsystemsuppliedby,#sealsystemvendor,#plan,#pipetube").val("0");
            $jq1("#sealsystemsuppliedby,#sealsystemvendor,#plan,#pipetube").trigger("change");
            $jq1("#sealsystemsuppliedby,#sealsystemvendor,#plan,#pipetube").attr("disabled", "disabled").attr("data-required", "false");
            $jq1("#sealsystemsuppliedby,#sealsystemvendor,#plan,#pipetube").removeClass("validate");
        }
        else {
            $jq1("#sealsystemsuppliedby").removeAttr("disabled").attr("data-required", "true");
            if ($jq1("#sealsystemsuppliedby").val() == "Sulzer") {
                $jq1("#sealsystemvendor").removeAttr("disabled").attr("data-required", "true");
                $jq1("#plan").removeAttr("disabled").attr("data-required", "true");
                $jq1("#pipetube").removeAttr("disabled").attr("data-required", "true");
            }

        }
    });

    $jq1(document).on("click", ".btn-viewQuote", function () {
        $jq1(".btnReviewForm").trigger("click");
        $jq1(".dynamic-content-wrapper .form-group,.review-controls-wrapper").hide();
        var HTMLData = "<div class='content'><p>The quote has been generated, you can download the quote from below</p><div class='button-wrapper'><a href='javascript:;' class='btn btn-primary btn-generateTender'>Download Quote</a></div></div>";
        $jq1(".dynamic-content-wrapper .tabs-content-wrapper").append(HTMLData);
        $jq1(".tabs-wrapper").hide();
        $jq1(".tabs-content-wrapper").addClass("topBorder");
        $jq1(".fixed-information-for-tender .form-group").show();

        $jq1("#parameters .wizard li").removeClass("active");
        $jq1("#parameters .wizard li:nth-child(4)").addClass("active");
    });

});

$jq1(document).on("click", ".btn-viewFirmQuote", function () {
    $jq1(".btnFirmReviewForm").trigger("click");
    $jq1(".dynamic-content-wrapper .form-group,.review-controls-wrapper").hide();
    var HTMLData = "<div class='content'><p>The quote has been generated, you can download the quote from below</p><div class='button-wrapper'><a href='javascript:;' class='btn btn-primary btn-generateFirmTender'>Download Quote</a></div></div>";
    $jq1(".dynamic-content-wrapper .tabs-content-wrapper").append(HTMLData);
    $jq1(".tabs-wrapper").hide();
    $jq1(".tabs-content-wrapper").addClass("topBorder");
    $jq1(".fixed-information-for-tender .form-group").show();
    $jq1("#parameters .wizard li").removeClass("active");
    $jq1("#parameters .wizard li:nth-child(8)").addClass("active");
});



$jq1('.date').on('changeDate', function (ev) {
    $jq1(this).datepicker('hide');
});

function PageCreation() {
    //GET THE MAIN WIZARD FROM DATABASE
    GetMainNavigation();
    GetAllSubnavigation();
    //GetAllFormAttributes();

    if (window.location.href.indexOf("EditTender.aspx") > 0 && window.location.href.indexOf("?code") > 0) {
        if ($jq1.trim($jq1("h1").data("tendertype")) == "true") {
            SetDefaultInputValues();
            EnableFirmTender();
            if ($jq1(".viewpage").length > 0) {
                DisableAllInputs();
            }

            $jq1("#parameters .wizard li:nth-child(5)").trigger("click");
        }
        else {
            $jq1("#parameters .wizard li:first-child").trigger("click");
            SetDefaultInputValues();
            ShowSubmitButton();
            if ($jq1(".viewpage").length > 0) {
                DisableAllInputs();
            }
        }

    }
    else {
        $jq1("#parameters .wizard li:first-child").trigger("click");
        SetDefaultInputValues();
        ShowSubmitButton();
        if ($jq1(".viewpage").length > 0) {
            DisableAllInputs();
        }
    }


}

function SetDefaultInputValues() {
    //SET THE DEFAULT CUSTOMER TYPE
    //$jq1(CUSTOMERTYPEINPUT).val(1);
    if (window.location.search.indexOf("code") >= 0) {
        $jq1('#mechanicalseal').trigger("change");
        $jq1("#couplingsuppliedby").trigger("change");
        $jq1("#sealsystemsuppliedby").trigger("change");
        if (window.location.search.indexOf("NewTender.aspx") <= 0)
            $jq1("#enduser").trigger("change");

    }
    else {
        $jq1(CUSTOMERTYPEINPUT).val(1);
        setTimeout(function () {
            initializeInputValues();
        }, 1000);
    }

}


function loadFormDataOnLoad() {
    if (window.location.search.indexOf("code") >= 0) {
        $jq1("#tenderGuid").val(getUrlVars()["code"]);
        var mainMenuId = $jq1("#parameters .wizard > li:first-child").data("mainmenuid");
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=SUBNAVIGATION',
            cache: false,
            async: false,
            data: { MainTabId: mainMenuId },
            dataType: 'json',
            success: function (data) {
                var HtmlMainNavigation = "<div><hr style='margin-top:10px; border-top: 1px solid black;width: 102.8%;margin-left: -1.4%;'/></div><ul>";
                $jq1.each(data, function (i) {
                    HtmlMainNavigation += "<li data-subMenuId=" + data[i].Id + " data-mainMenuId=" + data[i].MainTabId + "><a href='javascript:;'>" + data[i].Subnav + "</a></li>";
                });
                HtmlMainNavigation += "</ul>";
                $jq1(".dynamic-content-wrapper .tabs-wrapper").html(HtmlMainNavigation);
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATA',
                    cache: false,
                    async: false,
                    data: { MainTabId: $jq1("#parameters .wizard > li:first-child").data("mainmenuid"), SubNavId: $jq1(".dynamic-content-wrapper .tabs-wrapper ul > li:first-child").data("submenuid") },
                    dataType: 'json',
                    success: function (data) {

                        var HtmlMainNavigation = "<div>";
                        $jq1.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group' data-section='" + data[i].SectionCaption + "' data-productId='" + data[i].ProductId + "'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].FieldSymbol) + "</div>";
                        });
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' id='btnPreviousTenderDetails'>Previous</a><a href='javascript:;' class='btn-SaveSubFormData'>Save & Continue</a><a href='javascript:;' class='btn-AllocateToAdvanceEngineering'>Allocate to advance engineering</a></div></div>";
                        HtmlMainNavigation += "<div class='main-button-wrapper'><a href='javascript:;' class='btn btn-primary btn-submit'>Submit</a></div>";
                        $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
                        $jq1(".dynamic-content-wrapper .tabs-wrapper ul li:first-child").addClass("active");


                        //added
                        $jq1.ajax({
                            url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                            cache: false,
                            async: false,
                            data: { MainTabId: $jq1("#parameters .wizard > li:first-child").data("mainmenuid"), SubNavId: $jq1(".dynamic-content-wrapper .tabs-wrapper ul > li:first-child").data("submenuid"), UniqueId: getUrlVars()["code"] },
                            dataType: 'json',
                            success: function (data) {
                                var HtmlMainNavigation = "<div>";

                                $jq1.each(data, function (i) {

                                    $jq1("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                                    if ($jq1("select#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).length > 0) {
                                        if (data[i].Label == "Pump Type") {
                                            LoadPumpType();
                                        }
                                        var drpvalue = "<Option value=" + data[i].ParameterValue + ">" + data[i].ParameterValue + "</Option>";
                                        $jq1("#drpPumpType").html(drpvalue);
                                        $jq1("select#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                                        //$jq1("select#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).attr("disabled", true);
                                    }
                                    if (data[i].ParameterName == "CustomerId") {
                                        $jq1("#drpSearchCustomer").val(data[i].ParameterValue);
                                        SearchddValue = data[i].ParameterValue;
                                    }
                                    if (i == 0) {
                                        $jq1("#txtTenderId").val(data[i].TenderId);
                                        $jq1("#txtItemId").val(data[i].ItemId);
                                        var date = new Date(data[i].EstimatedAwardDate);
                                        var dateToBeUpdated = new Date(date.getFullYear(), date.getMonth(), date.getDate());


                                        $jq1("#txtForecasteDate").datepicker({
                                            format: "dd-mm-yyyy"
                                        });
                                        $jq1("#txtForecasteDate").datepicker('setDate', dateToBeUpdated);
                                        //var formatedDateOfCreation = new Date(Awardeddate);
                                        $jq1("#txtForecasteDate").val(FormatMonthInDigits(date.getMonth()) + "/" + date.getDate() + "/" + date.getFullYear());
                                        $jq1("label#ProjectId").text(data[i].ProjectId);
                                    }
                                    //$jq1("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).attr("disabled", true);
                                });

                            }
                        });
                    },
                    complete: function () {
                        $jq1(".form-group").each(function (i) {
                            if ($jq1.trim($jq1(this).data("section")) != 'null' && $jq1.trim($jq1(this).data("section")) != '' && $jq1.trim($jq1(this).data("section")) != null) {
                                var sectionName = $jq1(this).data("section");
                                if ($jq1("h2[class='" + $jq1.trim(sectionName) + "']").length <= 0)
                                    $jq1("<h2 class='" + $jq1.trim(sectionName) + "'>" + sectionName + "</h2>").insertBefore($jq1(".form-group[data-section='" + sectionName + "']").first());
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        var mainMenuId = $jq1("#parameters .wizard > li:first-child").data("mainmenuid");
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=SUBNAVIGATION',
            cache: false,
            async: false,
            data: { MainTabId: mainMenuId },
            dataType: 'json',
            success: function (data) {

                var HtmlMainNavigation = "<hr style='margin-top:10px; border-top: 1px solid black;width: 102.8%;margin-left: -1.4%;'/><ul>";
                $jq1.each(data, function (i) {
                    HtmlMainNavigation += "<li data-subMenuId=" + data[i].Id + " data-mainMenuId=" + data[i].MainTabId + "><a href='javascript:;'>" + data[i].Subnav + "</a></li>";
                });
                HtmlMainNavigation += "</ul>";
                $jq1(".dynamic-content-wrapper .tabs-wrapper").html(HtmlMainNavigation);
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATA',
                    cache: false,
                    async: false,
                    data: { MainTabId: $jq1("#parameters .wizard > li:first-child").data("mainmenuid"), SubNavId: $jq1(".dynamic-content-wrapper .tabs-wrapper ul > li:first-child").data("submenuid") },
                    dataType: 'json',
                    success: function (data) {

                        var HtmlMainNavigation = "<div>";
                        $jq1.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group' data-section='" + data[i].SectionCaption + "' data-productId='" + data[i].ProductId + "'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].FieldSymbol) + "</div>";
                        });
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a><a href='javascript:;' class='btn-AllocateToAdvanceEngineering disabled'>Allocate to advance engineering</a></div></div>";
                        $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                        $jq1(".dynamic-content-wrapper .tabs-wrapper ul li:first-child").addClass("active");

                        LoadDataForDropdown();

                    },
                    complete: function () {
                        $jq1(".form-group").each(function (i) {
                            if ($jq1.trim($jq1(this).data("section")) != 'null' && $jq1.trim($jq1(this).data("section")) != '' && $jq1.trim($jq1(this).data("section")) != null) {
                                var sectionName = $jq1(this).data("section");
                                if ($jq1("h2[class='" + $jq1.trim(sectionName) + "']").length <= 0)
                                    $jq1("<h2 class='" + $jq1.trim(sectionName) + "'>" + sectionName + "</h2>").insertBefore($jq1(".form-group[data-section='" + sectionName + "']").first());
                            }
                        });
                    }
                });
            }
        });
    }


}

function GetHTMLBYTYPE(fieldType, id, tableName, showAutoComplete, takeTableValues, lblId, required) {
    if (fieldType == 1)
        return "<input class='inputValue' type='text' id='" + id + "' data-required='" + required + "' />";
    if (fieldType == 3)
        return "<input class='inputValue' type='hidden' id='" + id + "' />";
    if (fieldType == 4) {
        if (id == 'designpressurebar')
            return "<input class='inputValue' type='number' onkeydown='javascript: return event.keyCode == 69 ? false : true' min='0' id='" + id + "' data-required='" + required + "' /><select id='unitsOfPressure' data-required='" + required + "' disabled></select>";
        else if (id == 'designtemperaturec')
            return "<input class='inputValue' type='number' onkeydown='javascript: return event.keyCode == 69 ? false : true' min='0' id='" + id + "' data-required='" + required + "' /><select id='unitsOftemperature' data-required='" + required + "' disabled></select>";
        else
            return "<input class='inputValue' type='number' onkeydown='javascript: return event.keyCode == 69 ? false : true' id='" + id + "' />";
    }

    if (fieldType == 2) {
        if (takeTableValues)
            return "<select class='inputValue' data-required='" + required + "' data-lblId='" + lblId + "' id='" + id + "' data-tb='" + tableName + "' class='" + ((showAutoComplete) ? "autocomplete" : "") + "'></select>";
        else
            return "<select class='inputValue' data-required='" + required + "' data-lblId='" + lblId + "' id='" + id + "' class='" + ((showAutoComplete) ? "autocomplete" : "") + "'></select>";
    }

    if (fieldType == 6)

        return "<input class='inputValue' type='file' id='" + id + "' multiple data-required='" + required + "'></label>";
    return "";

}


function LoadDataForDropdown() {


    if (window.location.href.indexOf("?code") >= 0) {
        $jq1("select").each(function () {
            var elem = $jq1(this);
            if ($jq1.trim($jq1(this).attr("data-tb")) != '') {
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETTABLEDATA',
                    cache: false,
                    async: false,
                    data: { Table: elem.attr("data-tb") },
                    dataType: 'json',
                    success: function (data) {
                        var dataCol = Object.keys(data[0])[1];
                        var HtmlMainNavigation = "<option value='0'>---- Select ----</option>";

                        $jq1.each(data, function (i) {
                            if (dataCol == "Customer") {
                                HtmlMainNavigation += "<option value='" + data[i].Id + "'>" + data[i][dataCol] + "</option>";
                            }
                            else {
                                if (typeof data[i].Id != "undefined") {
                                    HtmlMainNavigation += "<option value='" + data[i]["Id"] + "'>" + data[i][dataCol] + "</option>";
                                }
                                else if (typeof data[i].FormAttributeId == "undefined")
                                    HtmlMainNavigation += "<option value='" + data[i][dataCol] + "'>" + data[i][dataCol] + "</option>";
                                else {
                                    if ($jq1.trim($jq1(elem).data("lblid")) == $jq1.trim(data[i].FormAttributeId))
                                        HtmlMainNavigation += "<option value='" + data[i][dataCol] + "' data-id='" + data[i].FormAttributeId + "'>" + data[i][dataCol] + "</option>";
                                }
                            }

                        });
                        if ($jq1(elem).children("option").length < 1) {
                            $jq1(elem).html(HtmlMainNavigation);
                        }
                        //$jq1(elem).html("");
                        //$jq1(elem).html(HtmlMainNavigation);
                        //HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        //$jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                    },
                    error: function (data) {
                        var dataCol = Object.keys(data[0])[1];
                        var HtmlMainNavigation = "";
                    }
                });

            }
            else {
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETDDVALUES',
                    cache: false,
                    async: false,
                    data: { LblId: elem.attr("data-lblid") },
                    dataType: 'json',
                    success: function (data) {
                        var HtmlMainNavigation = "<option value='0'>---- Select ----</option>";
                        $jq1.each(data, function (i) {
                            HtmlMainNavigation += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";

                        });
                        $jq1(elem).html(HtmlMainNavigation);
                        //PopulateBalancingValues(); 
                        //HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        //$jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                    }
                });
            }
        });
        $jq1("select#Customer").trigger("change");


    }
    else {
        $jq1("select").each(function () {
            var elem = $jq1(this);
            if ($jq1.trim($jq1(this).attr("data-tb")) != '') {
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETTABLEDATA',
                    cache: false,
                    async: false,
                    data: { Table: elem.attr("data-tb") },
                    dataType: 'json',
                    success: function (data) {
                        var dataCol = Object.keys(data[0])[1];
                        if (elem.attr("data-tb") == "tblCustomerInformation")
                            console.log(dataCol);
                        var HtmlMainNavigation = "<option value='0'>---- Select ----</option>";

                        $jq1.each(data, function (i) {
                            if (dataCol == "Customer") {
                                HtmlMainNavigation += "<option value='" + data[i].Id + "'>" + data[i]["UniqueIdentity"] + "</option>";
                            }
                            else {
                                if (typeof data[i].Id != "undefined") {
                                    HtmlMainNavigation += "<option value='" + data[i]["Id"] + "'>" + data[i][dataCol] + "</option>";
                                }
                                else if (typeof data[i].FormAttributeId == "undefined")
                                    HtmlMainNavigation += "<option value='" + data[i][dataCol] + "'>" + data[i][dataCol] + "</option>";
                                else {
                                    if ($jq1.trim($jq1(elem).data("lblid")) == $jq1.trim(data[i].FormAttributeId))
                                        HtmlMainNavigation += "<option value='" + data[i][dataCol] + "' data-id='" + data[i].FormAttributeId + "'>" + data[i][dataCol] + "</option>";
                                }
                            }

                        });
                        //$jq1("#CustomerName").select2()
                        //$j = jQuery.noConflict();
                        $j("#drpSearchCustomer").select2();
                        if ($jq1(elem).children("option").length < 1) {

                            $jq1(elem).html(HtmlMainNavigation);
                        }

                        // $jq1("#drpSearchCustomer").html(HtmlMainNavigation);
                        //HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        //$jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                    }
                });

            }
            else {
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETDDVALUES',
                    cache: false,
                    async: false,
                    data: { LblId: elem.attr("data-lblid") },
                    dataType: 'json',
                    success: function (data) {
                        var HtmlMainNavigation = "<option value='0'>---- Select ----</option>";
                        $jq1.each(data, function (i) {
                            HtmlMainNavigation += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";

                        });
                        $jq1(elem).html(HtmlMainNavigation);
                        //HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        //$jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                    }
                });
            }
        });
    }
    PopulateBalancingValues();


    //new



    //if (window.location.url.indexOf("?code") >= 0)
    //    $jq1("select#Customer").val("1").trigger("change");
    //else 
    // if (window.location.href.indexOf("?code") >= 0) {
    //$jq1("select#Customer").val($jq1("select#Customer").attr("data-lblid")).text($jq1("select option[value='" + $jq1("select#Customer").attr("data-lblid") + "']").text());
    //$jq1("select#Customer").trigger("change"); 
    //}

}

$jq1(document).on("change", ".fixed-information-for-tender input[name='tenderType']", function () {
    if ($jq1("input#rbFirmTender:checked").length == 1) {
        $jq1(".forscaste").removeClass("hide");
        $jq1(".forscaste input").removeClass("hide");
    }
    else {
        $jq1(".forscaste").addClass("hide");
        $jq1(".forscaste input").addClass("hide");
        $jq1(".forscaste input").removeClass("required");
    }
});

function LoadPumpType() {
    var jsonObj = [];
    var customerData = {};
    customerData["PumpManufacturer"] = $jq1("#OriginalPumpManufacturer option:selected").val();
    jsonObj.push(customerData);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=LOADPUMPTYPE',
        cache: false,
        async: false,
        dataType: 'html',
        data: {
            data: JSON.stringify(jsonObj)
        },
        success: function (data) {
            if (data.length > 0) {
                var jsonData = JSON.parse(data);
                var drpPumpType = "<Option value='0'>Select</Option>";
                for (i in jsonData) {
                    drpPumpType += "<Option value='" + jsonData[i].Id + "'>" + jsonData[i].PumpType + "</Option>";
                }
                $jq1("#PumpType").html(drpPumpType);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert(textStatus + " " + errorThrown);
        },
    });
}

function SaveFormData(showLoader) {
    if (window.location.href.indexOf("NewTender") > -1) {
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=LATESTPROJECTID',
            cache: false,
            async: false,
            dataType: 'json',
            success: function (data) {
                //var htmlOptions = "<option value='0'>Select</option>";
                var uniqunum;
                var k = data.length;
                if (k <= 0) {
                    $jq1("#ProjectId").text("RES_OHX_" + $jq1(".location-code").text() + "_001");

                }
                else {
                    uniqunum = data[0].ProjectId.split("_");
                    $jq1("#ProjectId").text("RES_OHX_" + $jq1(".location-code").text() + "_" + pad((parseInt(uniqunum[uniqunum.length - 1]) + 1), 3));
                }



            }
        });

    }
    if (showLoader == 1) {
        $jq1(".loader").removeClass("fadeAway");
    }


    if ($jq1.trim($jq1("#tenderGuid").val()) == '') {
        $jq1("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
            G() + "-" + G() + G() + G()).toUpperCase());
    }
    if (window.location.href.indexOf("Edit") == -1) {
        if ($jq1.trim($jq1("#txtTenderId").val()) != '' && $jq1.trim($jq1("#tenderGuid").val()) != '' && $jq1.trim($jq1("#txtItemId").val()) != '') {
            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=SAVETENDER',
                cache: false,
                async: false,
                data: {
                    TenderId: $jq1("#txtTenderId").val(),
                    Guid: $jq1("#tenderGuid").val(),
                    ProjectId: $jq1("#ProjectId").text(),
                    ErpId: $jq1("#txtERPId").val(),
                    createdBy: $jq1(".username").text(),
                    tenderType: $jq1("input[name='tenderType']:checked").next("span").text(),
                    tenderInRole: $jq1(".role").text(),
                    tenderLocationCode: $jq1(".location-code").text(),
                    tenderTypeToFilter: "active",
                    ItemId: $jq1("#txtItemId").val(),
                },
                dataType: 'json',
                success: function (data) {
                    $jq1(".error-message-wrapper").removeClass("active");
                },
                error: function (data) {
                    $jq1(".error-message-wrapper").removeClass("active");
                }
            });
        }


    }

    $jq1("#tenderGuid").addClass('updatedOnce');
    var obj = {};
    $jq1(".tabs-content-wrapper .form-group").each(function () {
        if ($jq1(this).find(".autocomplete").length > 0) {
            obj[$jq1(this).find("label").text()] = $jq1(this).children(".autocomplete").val();
        }
        else
            obj[$jq1(this).find("label").text()] = $jq1(this).children().last().val();
    });
    var tenderId = $jq1("#txtTenderId").val();

    $jq1.each(obj, function (index, value) {
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=SAVEFORMDATA',
            cache: false,
            async: false,
            data: { TenderId: tenderId, ParameterName: value, ParameterValue: index, Guid: $jq1("#tenderGuid").val(), ProductId: $jq1.trim($jq1("#" + $jq1.trim(index.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ''))).parents(".form-group").data("productid")) },
            dataType: 'json',
            success: function (data) {

                var HtmlMainNavigation = "<div>";
                $jq1.each(data, function (i) {
                    HtmlMainNavigation += "<div class='form-group'><label for='#" + data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase() + "'>" + data[i].Label + "</label><input type='text' id=" + data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase() + "></div>";
                });
                HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a><a href='javascript:;' class='btn-AllocateToAdvanceEngineering disabled'>Allocate to advance engineering</a></div></div>";
                $jq1(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

            }
        });
    });
    if (showLoader == 1) {
        setTimeout(function () {
            $jq1(".loader").addClass("fadeAway");
            if ($jq1(".tabs-wrapper li.active:last-child").length == 1)
                $jq1("div#parameters .wizard li.active").next("li").find("a").trigger("click");

        }, 2000);
        datachange = true;
    }
}

function ValidateDesignParameters() {

    if ($jq1("#unitssiorus").val() != DefaultDropdownValue && $jq1.trim($jq1("#designpressurebar").val()) != '' && $jq1.trim($jq1("#designtemperaturec").val()) != '') {
        if ($jq1("#unitssiorus").val() == "US" && $jq1.trim($jq1("#designpressurebar").val()) > 580) {
            $jq1(".overlay.allocateTenderpopup,.allocateTenderpopup .customPopup").addClass("active");
            return false;
        }
        if ($jq1("#unitssiorus").val() == "US" && $jq1.trim($jq1("#designtemperaturec").val()) > 392) {
            $jq1(".overlay.allocateTenderpopup,.allocateTenderpopup .customPopup").addClass("active");
            return false;
        }
        if ($jq1("#unitssiorus").val() == "SI" && $jq1.trim($jq1("#designpressurebar").val()) > 40) {
            $jq1(".overlay.allocateTenderpopup,.allocateTenderpopup .customPopup").addClass("active");
            return false;
        }
        if ($jq1("#unitssiorus").val() == "SI" && $jq1.trim($jq1("#designtemperaturec").val()) > 200) {
            $jq1(".overlay.allocateTenderpopup,.allocateTenderpopup .customPopup").addClass("active");
            return false;
        }
        return true;
    }
    else {
        return true;
    }
}


//SAVE BUDGET TENDER
$jq1(document).on("click", ".btn-SaveSubFormData", function () {

    var elem = $jq1(this);
    //Validate only if it is Sales team
    if ($jq1(".user-information .role").data("roleid") == "1" || $jq1(".user-information .role").data("roleid") == "7") {
        if (ValidateDesignParameters() == false) {
            return false;
        }
    }
    flagcheck = 1;
    //VALIDATE BASIC FIELDS FOR TENDER CREATION
    if ($jq1.trim($jq1(TENDERIDINPUT).val()) == "" || $jq1.trim($jq1(ITEMIDINPUT).val()) == "" || $jq1.trim($jq1("#drpSearchCustomer").val()) == DefaultDropdownValue) {
        if ($jq1.trim($jq1(TENDERIDINPUT).val()) == "")
            $jq1(TENDERIDINPUT).addClass(CLASSFORVALIDATION);
        if ($jq1.trim($jq1(ITEMIDINPUT).val()) == "")
            $jq1(ITEMIDINPUT).addClass(CLASSFORVALIDATION);
        if ($jq1.trim($jq1(SEARCHCUSTOMERINPUT).val()) == DefaultDropdownValue)
            $jq1(SEARCHCUSTOMERTEXTINPUT).addClass(CLASSFORVALIDATION);
        alert(MESSAGEFOREMPLTYFIELDS);
        return false;
    }
    else {
        $jq1(TENDERIDINPUT).removeClass(CLASSFORVALIDATION);
        $jq1(ITEMIDINPUT).removeClass(CLASSFORVALIDATION);
        $jq1(SEARCHCUSTOMERTEXTINPUT).removeClass(CLASSFORVALIDATION);
        if (ValidateInputs()) {
            var roleId = $jq1(ROLEVARIABLE).data("roleid");
            var locationId = $jq1(LOCATIONVARIABLE).data("locationid");
            var tenderDetails = [];
            $jq1(".tabs-content-wrapper .form-group").each(function (i) {
                var tempOrder = {};
                tempOrder["TenderUniqueId"] = $jq1.trim($jq1(TENDERUNIQUEIDHIDDENINPUT).val());
                tempOrder["ParameterName"] = $jq1(this).find("label").text();
                tempOrder["ParameterValue"] = $jq1(this).find(".inputValue").val();
                tempOrder["ParameterIdentity"] = $jq1(this).find(".inputValue").attr("id");
                tenderDetails.push(tempOrder);
            });
            var ProjectId = "", ProjectNumber = 0;
            if ($jq1.trim($jq1("#ddProject").val()) == "0") {
                //GET LATEST PROJECTID
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=RETURNPROJECTID',
                    type: 'POST',
                    async: false,
                    data: {
                        LocationCode: $jq1.trim($jq1(".legalentity").text())
                    },
                    success: function (data) {
                        ProjectId = $jq1.trim(data);
                        $jq1("#ProjectId").text(ProjectId);
                        if ($jq1.trim(ProjectId) != '' && typeof ProjectId != undefined) {
                            var arrySplittedProjectId = ProjectId.split("_");
                            ProjectNumber = arrySplittedProjectId[arrySplittedProjectId.length - 1];
                        }

                    }
                });

            }
            else {
                //lOGIC TO CREATE A TENDER INSIDE THE PROJECT
                if ($jq1("#ddProject").length > 0)
                    ProjectId = $jq1.trim($jq1("#ddProject").val());
                else
                    ProjectId = $jq1.trim($jq1("#ProjectId").text());
                ProjectNumber = 0;
            }
            if ($jq1.trim(ProjectId) != '') {
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=CREATEBUDGETTENDER',
                    type: 'POST',
                    cache: false,
                    async: false,
                    data: {
                        TenderId: $jq1(TENDERIDINPUT).val(),
                        ProjectId: ProjectId,
                        ProjectNumber: ProjectNumber,
                        TenderUniqueId: $jq1.trim($jq1(TENDERUNIQUEIDHIDDENINPUT).val()),
                        ItemId: $jq1(ITEMIDINPUT).val(),
                        CustomerId: $jq1(SEARCHCUSTOMERINPUT).val(),
                        TenderType: "False", // FOR BUDGET TENDER
                        RoleId: roleId,
                        CreatedBy: $jq1(USERNAMELABEL).text(),
                        ModifiedBy: $jq1(USERNAMELABEL).text(),
                        LocationId: locationId,
                        LegalEntity: locationId,
                        CURRENCY: "",
                        LocationCode: $jq1.trim($jq1(".location-code").text()),
                        PumpType: getCookie("PumpType"),
                        CreadtedById: $jq1.trim($jq1("#paraUserName").data("loginuserid")),
                        ParentTenderUniqueId: '0',
                        IsAssignedBackByTenderingTeam: "False" // Initailly to indicate sales cannot generate the tender 
                    },
                    success: function (data) {
                        if (data.indexOf("|pid") < 0) {
                            alert(data);
                        }
                        else {
                            $jq1("#ProjectId").text(data.split("|pid")[0]);
                            if (data) {

                                $jq1.ajax({
                                    url: 'ServiceHandler.ashx?CBH=SAVEBUDGETTENDERDETAILS',
                                    type: 'POST',
                                    cache: false,
                                    async: false,
                                    data: {
                                        data: JSON.stringify(tenderDetails)
                                        //data: tblToSort
                                    },
                                    success: function (data) {
                                        if (data) {

                                            alert("Saved");
                                            $jq1("#txtItemId,#txtTenderId,#ddProject,#txtForecasteDate").attr("disabled", "disabled");
                                            ShowSubmitButton();
                                            if (window.location.href.indexOf("&r=") > 0 && window.location.href.indexOf("?code=")) {
                                                UpdateMarkAsRead($jq1.trim(getUrlVars()["code"]));
                                            }
                                        }
                                        else {
                                            alert("Something went wrong! Please try again");
                                        }
                                    }
                                });

                            }
                            else {
                                alert("Something went wrong! Please try again");
                            }
                        }

                    }
                });
            }

        }

        else {
            alert("Please fill the necessary fields");
        }

    }
});


$jq1(document).on("click", ".btn-SaveAllFormData", function () {
    flagcheck = 1;
    var elem = $jq1(this);
    //Validate only if it is Sales team
    if ($jq1(".user-information .role").data("roleid") == "1" || $jq1(".user-information .role").data("roleid") == "7") {
        if (ValidateDesignParameters() == false) {
            return false;
        }
    }

    //VALIDATE BASIC FIELDS FOR TENDER CREATION
    if ($jq1.trim($jq1(TENDERIDINPUT).val()) == "" || $jq1.trim($jq1(ITEMIDINPUT).val()) == "" || $jq1.trim($jq1("#drpSearchCustomer").val()) == DefaultDropdownValue) {
        if ($jq1.trim($jq1(TENDERIDINPUT).val()) == "")
            $jq1(TENDERIDINPUT).addClass(CLASSFORVALIDATION);
        if ($jq1.trim($jq1(ITEMIDINPUT).val()) == "")
            $jq1(ITEMIDINPUT).addClass(CLASSFORVALIDATION);
        if ($jq1.trim($jq1(SEARCHCUSTOMERINPUT).val()) == DefaultDropdownValue)
            $jq1(SEARCHCUSTOMERTEXTINPUT).addClass(CLASSFORVALIDATION);
        alert(MESSAGEFOREMPLTYFIELDS);
        return false;
    }
    else {
        $jq1(TENDERIDINPUT).removeClass(CLASSFORVALIDATION);
        $jq1(ITEMIDINPUT).removeClass(CLASSFORVALIDATION);
        $jq1(SEARCHCUSTOMERTEXTINPUT).removeClass(CLASSFORVALIDATION);
        if (ValidateInputs()) {
            UpdateParentTenderStatus();
            //var parentTenderUniqueId = $jq1.trim(getUrlVars()["code"]);
            //GenerateTenderVersion(); 
            //$jq1("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
            //    G() + "-" + G() + G() + G()).toUpperCase());

            var tenderDetails = [];
            $jq1(".tabs-content-wrapper .form-group").each(function (i) {
                var tempOrder = {};
                tempOrder["TenderUniqueId"] = $jq1.trim(getUrlVars()["code"]);
                tempOrder["ParameterName"] = $jq1(this).find("label").text();
                tempOrder["ParameterValue"] = $jq1(this).find(".inputValue").val();
                tempOrder["ParameterIdentity"] = $jq1(this).find(".inputValue").attr("id");
                tenderDetails.push(tempOrder);
            });
            //var ProjectId = "RES_" + $jq1.trim(getCookie("PumpType")) + "_" + $jq1.trim($jq1(".location-code").text());
            //$jq1("#ProjectId").text($jq1.trim($jq1(PROJECTHIDDENINPUT).text()));
            var roleId = $jq1(ROLEVARIABLE).data("roleid");
            var locationId = $jq1(LOCATIONVARIABLE).data("locationid");

            $jq1.ajax({
                url: 'ServiceHandler.ashx?CBH=CREATEFIRMTENDER',
                type: 'POST',
                cache: false,
                async: false,
                data: {
                    TenderId: $jq1(TENDERIDINPUT).val(),
                    ProjectId: $jq1.trim($jq1(PROJECTHIDDENINPUT).text()),
                    TenderUniqueId: $jq1.trim(getUrlVars()["code"]),
                    ItemId: $jq1(ITEMIDINPUT).val(),
                    CustomerId: $jq1(SEARCHCUSTOMERINPUT).val(),
                    TenderType: "True", // FOR BUDGET TENDER
                    RoleId: roleId,
                    CreatedBy: $jq1(USERNAMELABEL).text(),
                    ModifiedBy: $jq1(USERNAMELABEL).text(),
                    LocationId: locationId,
                    LegalEntity: locationId,
                    CURRENCY: "",
                    LocationCode: $jq1.trim($jq1(".location-code").text()),
                    PumpType: getCookie("PumpType"),
                    CreadtedById: $jq1.trim($jq1("#paraUserName").data("loginuserid")),
                    ParentTenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()),
                    IsAssignedBackByTenderingTeam: "False" // Initailly to indicate sales cannot generate the tender 
                },
                success: function (data) {
                    if (data.indexOf("|pid") < 0) {
                        alert(data);
                    }
                    else {
                        $jq1("#ProjectId").text(data.split("|pid")[0]);
                        if (data) {

                            $jq1.ajax({
                                url: 'ServiceHandler.ashx?CBH=SAVEBUDGETTENDERDETAILS',
                                type: 'POST',
                                cache: false,
                                async: false,
                                data: {
                                    data: JSON.stringify(tenderDetails)
                                    //data: tblToSort
                                },
                                success: function (data) {
                                    if (data) {

                                        alert("Saved");
                                        $jq1("#txtItemId,#txtTenderId,#txtForecasteDate").attr("disabled", "disabled");
                                       // ShowFirmSubmitButton();
                                        //GenerateTenderVersion();
                                    }
                                    else {
                                        alert("Something went wrong! Please try again");
                                    }
                                }
                            });

                        }
                        else {
                            alert("Something went wrong! Please try again");
                        }
                    }

                }
            });
        }

        else {
            alert("Please fill the necessary fields");
        }

    }





});


//TENDER WIZARD PREVIOUS BUTTON CLICK
$jq1(document).on("click", ".btn-PreviousFormData", function () {
    var elem = $jq1(this);
    if (!elem.hasClass("disabled")) {
        $jq1(".tabs-wrapper ul > li.active").prev("li").trigger("click");
        $jq1(".btn-NextFormData").removeClass("disabled");
        if ($jq1(".tabs-wrapper ul > li.active:first-child").length > 0) {
            elem.addClass("disabled");
        }
        else {
            elem.removeClass("disabled");
        }
    }
});

function ShowSubmitButton() {
    //EnableFirmTender();
    if (window.location.href.indexOf("EditTender") < 0) {
        if (flagcheck == 0) {
            if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0) {
                if (ValidateAllInputs()) {
                    $jq1(".btn-SubmitFormData").removeClass("hide");
                    $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").removeClass("disabled");

                }
                else {
                    $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                    $jq1(".btn-SubmitFormData").addClass("hide");
                }
            }
            else {
                $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                $jq1(".btn-SubmitFormData").addClass("hide");
            }
        }
        else {
            if (ValidateAllInputs()) {
                $jq1(".btn-SubmitFormData").removeClass("hide");
                $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").removeClass("disabled");
            }
            else {
                $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                $jq1(".btn-SubmitFormData").addClass("hide");
            }
        }

    }
    if (window.location.href.indexOf("EditTender") > 0) {
        if ($jq1.trim($jq1("h1").data("tendertype")) == "true")
            $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
        else {
            if (flagcheck == 0) {
                if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0) {
                    if (ValidateAllInputs()) {
                        $jq1(".btn-SubmitFormData").removeClass("hide");
                        $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").removeClass("disabled");

                    }
                    else {
                        $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                        $jq1(".btn-SubmitFormData").addClass("hide");
                    }
                }
                else {
                    $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                    $jq1(".btn-SubmitFormData").addClass("hide");
                }
            }
            else {
                if (ValidateAllInputs()) {
                    $jq1(".btn-SubmitFormData").removeClass("hide");
                    $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").removeClass("disabled");
                }
                else {
                    $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                    $jq1(".btn-SubmitFormData").addClass("hide");
                }
            }
        }
    }

    $jq1("#currencyeurorusd").trigger("change");
    
}


function EnableFirmTender() {
    //Logic to enable the firm tender section for edit
    if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {

        var status = $jq1("h1").data("status");
        var tenderType = $jq1("h1").data("tendertype");
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=CHECKFIRMACCESSBYROLE',
            type: 'POST',
            async: false,
            data: {
                RoleId: $jq1(".user-information .role").attr("data-roleid")
            },
            dataType: 'json',
            success: function (data) {

                if (data[0].HasAccess && $jq1.trim(tenderType) == "true") {
                    $jq1("#parameters .wizard li:nth-child(5)").removeClass("disabled");

                    $jq1("#parameters .wizard li:nth-child(4),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(1)").addClass("disabled");
                }
                else {
                    $jq1("#parameters .wizard li:nth-child(5)").addClass("disabled");
                    $jq1("#parameters .wizard li:nth-child(4),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(1)").removeClass("disabled");
                }


            }
        });


        $jq1("#txtItemId,#txtTenderId,#txtForecasteDate").attr("disabled", "disabled");
    }
}

function ShowFirmSubmitButton() {
    if (flagcheck == 0) {
        if (window.location.href.indexOf("NewTender") <= 0 && window.location.href.indexOf("code") <= 0) {
            if (ValidateAllInputs()) {
                $jq1(".btn-SubmitFirmData").removeClass("hide");
                $jq1("#parameters .wizard li:nth-child(5),#parameters .wizard li:nth-child(6),#parameters .wizard li:nth-child(7),#parameters .wizard li:nth-child(8)").removeClass("disabled");

            }
            else {
                $jq1("#parameters .wizard li:nth-child(5),#parameters .wizard li:nth-child(6),#parameters .wizard li:nth-child(7),#parameters .wizard li:nth-child(8)").addClass("disabled");
                $jq1(".btn-SubmitFirmData").addClass("hide");
            }
        }
        else {
            $jq1("#parameters .wizard li:nth-child(5),#parameters .wizard li:nth-child(6),#parameters .wizard li:nth-child(7),#parameters .wizard li:nth-child(8)").addClass("disabled");
            $jq1(".btn-SubmitFirmData").addClass("hide");
        }
    }
    else {
        if (ValidateAllInputs()) {
            $jq1(".btn-SubmitFirmData").removeClass("hide");
            $jq1("#parameters .wizard li:nth-child(5),#parameters .wizard li:nth-child(6),#parameters .wizard li:nth-child(7),#parameters .wizard li:nth-child(8)").removeClass("disabled");
            $jq1("#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(1),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
        }
        else {
            $jq1("#parameters .wizard li:nth-child(5),#parameters .wizard li:nth-child(6),#parameters .wizard li:nth-child(7),#parameters .wizard li:nth-child(8)").addClass("disabled");
            $jq1(".btn-SubmitFirmData").addClass("hide");
        }
    }

    //Logic to enable the firm tender section for edit
    if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
        var status = $jq1("h1").data("status");
        var tenderType = $jq1("h1").data("tendertype");
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=CHECKFIRMACCESSBYROLE',
            type: 'POST',
            async: false,
            data: {
                RoleId: $jq1(".user-information .role").attr("data-roleid")
            },
            dataType: 'json',
            success: function (data) {
                if (data[0].HasAccess && $jq1.trim(tenderType) == "true") {
                    $jq1("#parameters .wizard li:nth-child(5)").removeClass("disabled");
                    $jq1("#parameters .wizard li:nth-child(1),#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                }
                else {
                    $jq1("#parameters .wizard li:nth-child(5)").addClass("disabled");
                }
            }
        });
    }
}


//TENDER WIZARD NEXT BUTTON CLICK
$jq1(document).on("click", ".btn-NextFormData", function () {

    var elem = $jq1(this);
    if (!elem.hasClass("disabled")) {
        $jq1(".tabs-wrapper ul > li.active").next("li").trigger("click");
        $jq1(".btn-PreviousFormData").removeClass("disabled");
        if ($jq1(".tabs-wrapper ul > li.active:last-child").length > 0) {
            $jq1(this).addClass("disabled");

        }
        else {
            $jq1(this).removeClass("disabled");

        }

    }

});



function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}




//$jq1(document).on("change", "select#drpSearchCustomer", function () {
//    var id = $jq1(this).val();
//    $jq1("#customerid").val(id);
//    if (id != "0") {
//        $jq1.ajax({
//            url: 'ServiceHandler.ashx?CBH=GETCUSTOMERBYID',
//            cache: false,
//            async: true,
//            data: { Id: id },
//            dataType: 'json',
//            success: function (data) {
//                var HtmlMainNavigation = "<div>";
//                debugger;
//                $jq1("input#contact").val(data[0].FirstName + " " + data[0].LastName);
//                $jq1("input#streetnumber").val(data[0].StreetNumber);
//                $jq1("input#title").val(data[0].Gender == true ? "Mr" : "Miss");
//                $jq1("input#postalcodecity").val(data[0].PostalCodeCity);
//                var text = data[0].PumpManufacturer;
//                var value;
//                $jq1("input#projectdescription").val(data[0].ProjectDescription);
//                $jq1("input#sapcustomersreference").val(data[0].CustomersReference);
//                $jq1("input#enduser").val(data[0].EndUser);
//                $jq1("#country").val(data[0].Country);
//                $jq1("#customername").val(data[0].Customer);
//            }
//        });
//    }
//    else {
//        $jq1("input#contact").val("");
//        $jq1("input#streetnumber").val("");
//        $jq1("input#postalcodecity").val("");
//        $jq1("input#projectdescription").val("");
//        $jq1("input#sapcustomersreference").val("");
//        $jq1("#validityperiodofthetender").val('0');
//    }


//});





function LoadValidationPeriod() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=LOADVALIDATIONPERIOD',
        cache: false,
        async: false,
        dataType: 'html',
        success: function (data) {
            var jsonData = JSON.parse(data);

            var drpValidationPeriod = "<Option value='0'>Select</Option>"
            for (i in jsonData) {

                drpValidationPeriod += "<Option value='" + jsonData[i].Id + "'>" + jsonData[i].ValidationPeriod + " Days</Option>";
            }
            $jq1("#ValidityperiodoftheTender").html(drpValidationPeriod);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert(textStatus + " " + errorThrown);
        },
    });
}

$jq1(document).on("click", ".btn-AllocateToAdvanceEngineering:not(.disabled)", function () {

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=UPDATETENDERROLE',
        cache: false,
        async: false,
        data: {
            TenderId: $jq1("#txtTenderId").val(),
            TenderUniqueId: $jq1("#tenderGuid").val(),
            UserName: $jq1(".username").text(),
            Role: $jq1(".role").text(),
            Location: $jq1(".location").text(),
            Customer: $jq1("#drpSearchCustomer").val(),

        },
        dataType: 'json',
        success: function (data) {
            alert("Tender assigned to advance engineering team");

        }
    });
});
$jq1(document).on("change", "#File", function () {
    var fileUpload = $jq1("#File").get(0);

    if (fileUpload.files.length > 0) {
        var uploadedfiles = fileUpload.files;

        var UploadedFileList = "<tr><th style='width: 85%;text-align: left;background-color: #091540 !important;color: white;font-size: 16px;'>File Name</th><th style='width: 87%;text-align: left;background-color: #091540 !important;color: white;font-size: 16px;'>Actions</th></tr>"

        for (var i = 0; i < uploadedfiles.length; i++) {

            UploadedFileList += "<tr id='tr_" + i + "'><td style='text-align: left;padding: 7px 9px !important;font-size: 14px;'>" + uploadedfiles[i].name + "</td><td style='text-align: left;padding: 7px 9px !important;font-size: 14px;'><input type='image' src='Images/Delete.png' style='width: 20px; height: 20px; margin-left: 18px;outline: none;padding:0px;border: 0px' onclick='RemoveFileFromList(" + i + ");'/></td></tr>";
        }

        UploadedFileList += "<tr style='text-align: right;'><td colspan='2'><button type='button' id='btnUpload' class='btn modal-title' style='width: 20%;background-color: #5cb85c; color: white' onclick='UploadFiles();'>Upload Files</button></td></tr>";
        $jq1("#tblUploadedFiles").html(UploadedFileList);
        $jq1(".divPopup").insertBefore($jq1(".button-wrapper"));
        $jq1("#tblUploadedFiles").css("display", "inline-block");
        $jq1("#btnUpload").removeAttr("disabled");
        //$jq1("#btnUpload").removeAttr("disabled");
    }
});


function UploadFiles() {
    // Checking whether FormData is available in browser 
    if ($jq1("#txtTenderId").val() != "") {
        if ($jq1("#ProjectId").text() != "") {
            if (window.FormData !== undefined) {
                var fileUpload = $jq1("#File").get(0);

                if (fileUpload.files.length > 0) {
                    var uploadedfiles = fileUpload.files;

                    // Create FormData object  
                    var fileData = new FormData();

                    // Looping over all files and add it to FormData object  
                    for (var i = 0; i < uploadedfiles.length; i++) {
                        if ($jq1("#tblUploadedFiles td:contains(" + uploadedfiles[i].name + ")").length > 0) {
                            fileData.append(uploadedfiles[i].name, uploadedfiles[i]);
                        }
                    }

                    //Adding one more key to FormData object  
                    fileData.append('ProjectId', $jq1("#ProjectId").text());
                    fileData.append('TenderId', $jq1("#txtTenderId").val());

                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=UPLOADFILES',
                        type: "POST",
                        data: fileData,
                        async: false,
                        contentType: false,
                        dataType: 'json',
                        processData: false,
                        success: function (err) {
                            if (err.responseText == "success") {
                                toastr.success('Documents uploaded successfully!', 'Success', { timeOut: 5000 });
                                $jq1('button.close').trigger("click");
                            }
                            else {
                                toastr.error('Something went wrong, Please try again!', 'Error', { timeOut: 5000 })
                            }
                        },
                        error: function (err) {
                            //alert(err.statusText);
                            if (err.responseText == "Success") {
                                toastr.success('Documents uploaded successfully!', 'Success', { timeOut: 5000 });
                                //$jq1('button.close').trigger("click");
                                //$jq1("#btnDeleteFiles").attr("disabled", "disabled");
                            }
                            else {
                                toastr.error('Something went wrong, Please try again!', 'Error', { timeOut: 5000 })
                            }
                        }
                    });
                }
                else {
                    toastr.error('Please select at least one file!', 'Error', { timeOut: 5000 })
                }
                document.getElementById("loadingDiv").style.display = "none";
            } else {
                toastr.error('FormData is not supported.!', 'Error', { timeOut: 5000 })
            }
        }
        else {
            toastr.error('Please endter project Id.!', 'Error', { timeOut: 5000 })
        }
    }
    else {
        toastr.error('Please endter tender Id.!', 'Error', { timeOut: 5000 })
    }
}

function RemoveFileFromList(id) {
    $jq1('table#tblUploadedFiles tr#tr_' + id).remove();
    if (document.getElementById("tblUploadedFiles").getElementsByTagName("tr").length > 1) {
        $jq1("#tblUploadedFiles").css("display", "inline-block");
        $jq1("#btnUpload").removeAttr("disabled");
    }
    else {
        $jq1("#tblUploadedFiles").css("display", "none");
        $jq1("#FileUpload1").val("");
        $jq1("#btnUpload").attr("disabled", "disabled");

    }
}


/**------------------ Control Interaction Starts -------------------**/
$jq1(document).on("click", "#parameters .wizard li", function () {
    var elem = $jq1(this);
    if (!elem.hasClass("disabled")) {
        $jq1("#parameters .wizard li").removeClass("active");
        elem.addClass("active");
        $jq1(".form-data").hide();
        var MainNavId = elem.data("mainmenuid");
        $jq1("h2").text(elem.find(".text").text());
        $jq1('.form-data .tabs-content-wrapper .form-group').hide();

        if (MainNavId == "1" || MainNavId == "5") {
            if (MainNavId == "1") {
                if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                    $jq1("#tenderGuid").val(getUrlVars()["code"]);
                }


                $jq1('.form-data .tabs-content-wrapper .form-group[data-mainmenuid="' + MainNavId + '"]').show();
                if (elem.data("hassubnavigation") == false) {
                    $jq1(".tabs-wrapper").hide();
                }
                else {
                    GetAllFormAttributes();
                    if (window.location.href.indexOf("NewTender.aspx") > 0 && window.location.href.indexOf("?code") < 0) {
                        if ($jq1.trim($jq1("#tenderGuid").val()) != "") {
                            $jq1.ajax({
                                url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                                cache: false,
                                async: false,
                                dataType: 'json',
                                data: { UniqueId: $jq1.trim($jq1("#tenderGuid").val()) },
                                success: function (data) {
                                    var tenderId, itemId, customerId, projectId, tenderStatus, AwardedDate,tenderType;
                                    $jq1.each(data, function (i) {
                                        var id = data[i].FieldIdentityName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
                                        if (data[i].ParameterIdentity == "enduser") {
                                            if (data[i].ParameterValue == "2") {
                                                $jq1("#" + id).parents(".form-group").prepend("<a class='viewAgentInfobtn' href='javascript:;'>View<br/>details</a>");
                                                $jq1("#" + id).addClass("agent");
                                            }
                                        }

                                        $jq1("#" + id).val(data[i].ParameterValue);
                                        tenderId = data[i].TenderId;
                                        itemId = data[i].ItemId;
                                        customerId = data[i].CustomerId;
                                        projectId = data[i].ProjectId;
                                        tenderStatus = data[i].Status;
                                        AwardedDate = data[i].EstimatedAwardDate;
                                        tenderType = data[i].TenderType;
                                    });
                                    $jq1("#txtTenderId").val(tenderId);
                                    $jq1("#txtItemId").val(itemId);
                                    $jq1("#ProjectId").text(projectId);
                                    var date = new Date(Awardeddate);
                                    var dateToBeUpdated = new Date(date.getFullYear(), date.getMonth(), date.getDate());


                                    $jq1("#txtForecasteDate").datepicker({
                                        format: "dd-mm-yyyy"
                                    });
                                    $jq1("#txtForecasteDate").datepicker('setDate', dateToBeUpdated);
                                    //var formatedDateOfCreation = new Date(Awardeddate);
                                    $jq1("#txtForecasteDate").val(FormatMonthInDigits(date.getMonth()) + "/" + date.getDate() + "/" + date.getFullYear());
                                    $jq1("h1").attr("data-status", tenderStatus);
                                    $jq1("h1").attr("data-tenderType", tenderType);
                                    $jq1.when($jq1("#drpSearchCustomer").val(customerId)).then(function () {
                                        $jq1("#drpSearchCustomer").trigger("change");

                                        MakeddSearchable();
                                        ShowSubmitButton();
                                        


                                        //if (parseInt($jq1("h1").data("status")) >= 3)
                                        //    $jq1("#parameters .wizard li:nth-child(5)").trigger("click");
                                        //else
                                        //    $jq1("#parameters .wizard li:first-child").trigger("click");

                                    });

                                }

                            });
                        }
                        else {
                            $jq1("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
                                G() + "-" + G() + G() + G()).toUpperCase());
                        }
                    }

                    $jq1(".tabs-wrapper li:first-child").trigger("click");
                    $jq1(".tabs-wrapper").show();
                    $jq1(".tabs-content-wrapper").removeClass("topBorder");
                    $jq1("#parameters .wizard li:nth-child(1),#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                }
            }
            else {
                //if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                //    $jq1("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
                //        G() + "-" + G() + G() + G()).toUpperCase());
                //} 
                $jq1('.form-data .tabs-content-wrapper .form-group[data-mainmenuid="' + MainNavId + '"]').show();
                if (elem.data("hassubnavigation") == false) {
                    $jq1(".tabs-wrapper").hide();
                }
                else {
                   // $jq1.when(GetLastestChildTenderDetails()).then(function () {
                    AllFormAttributes();
                    
                        $jq1(".tabs-wrapper li:first-child").trigger("click");
                        $jq1(".tabs-wrapper").show();
                        $jq1(".tabs-content-wrapper").removeClass("topBorder");
                        $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
                        $jq1("#parameters .wizard li:nth-child(5),#parameters .wizard li:nth-child(6),#parameters .wizard li:nth-child(7),#parameters .wizard li:nth-child(8)").removeClass("disabled");
                   // });

                }
            }

        }
        else if (MainNavId == "2" || MainNavId == "6") {
            if (MainNavId == "2") {
                if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                    $jq1("#tenderGuid").val(getUrlVars()["code"]);
                }
                $jq1(".btn-SubmitFormData").trigger("click");
                $jq1(".currencyCode").text($jq1.trim($jq1("#currencySelected").val()));
            }
            if (MainNavId == "6") {
                if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                    $jq1("#tenderGuid").val(getUrlVars()["code"]);
                }
                $jq1.when(GetLastestChildTenderDetails()).then(function () {
                    $jq1(".btn-SubmitFirmData").trigger("click");
                    $jq1(".currencyCode").text($jq1.trim($jq1("#currencySelected").val()));
                });
                $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
            }


        }
        else if (MainNavId == "3" || MainNavId == "7") {
            if (MainNavId == "3") {
                if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                    $jq1("#tenderGuid").val(getUrlVars()["code"]);
                }
                $jq1(".btnReviewForm").trigger("click");
            }
            if (MainNavId == "7") {
                if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                    $jq1("#tenderGuid").val(getUrlVars()["code"]);
                }
                $jq1.when(GetLastestChildTenderDetails()).then(function () {
                    $jq1(".btnFirmReviewForm").trigger("click");
                });
                $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
            }

        }
        else if (MainNavId == "4" || MainNavId == "8") {
            if (MainNavId == "4") {
                if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                    $jq1("#tenderGuid").val(getUrlVars()["code"]);
                }
                $jq1(".btn-viewQuote").trigger("click");
            }
            if (MainNavId == "8") {
                if (window.location.href.indexOf("EditTender") > 0 && window.location.href.indexOf("?code=") > 0) {
                    $jq1("#tenderGuid").val(getUrlVars()["code"]);
                }

                $jq1.when(GetLastestChildTenderDetails()).then(function () {
                    $jq1(".btn-viewFirmQuote").trigger("click");
                });
                $jq1("#parameters .wizard li:first-child,#parameters .wizard li:nth-child(2),#parameters .wizard li:nth-child(3),#parameters .wizard li:nth-child(4)").addClass("disabled");
            }

        }
        $jq1(".form-data").fadeIn();
    }
});

$jq1(document).on("click", ".tabs-wrapper li", function () {
    $jq1('[data-required="true"]').removeClass("validate");
    $jq1('.error-message-wrapper').removeClass("active");
    var elem = $jq1(this);
    $jq1(".tabs-wrapper li").removeClass("active");
    elem.addClass("active");
    var MainNavId = elem.data("mainmenuid");
    var SubNavId = elem.data("subtabid");
    $jq1(".tabs-content-wrapper").hide();
    $jq1('.form-data .tabs-content-wrapper .form-group').hide();
    $jq1('.form-data .tabs-content-wrapper .form-group[data-mainmenuid="' + MainNavId + '"][data-submenu="' + SubNavId + '"]').show();
    $jq1(".tabs-content-wrapper").fadeIn();

    if ($jq1(".tabs-wrapper ul > li.active:first-child").length > 0)
        $jq1(".btn-PreviousFormData").addClass("disabled");
    else
        $jq1(".btn-PreviousFormData").removeClass("disabled");

    if ($jq1(".tabs-wrapper ul > li.active:last-child").length > 0) {
        $jq1(".btn-NextFormData").addClass("disabled");

    }

    else
        $jq1(".btn-NextFormData").removeClass("disabled");
});
/**------------------ Control Interaction Ends -------------------**/


/**------------------ Custom Validation Starts---------------------**/
$jq1(document).on("change", "#sealsystemsuppliedby", function () {
    var elem = $jq1(this);
    if (elem.val() != "Sulzer") {
        $jq1("#sealsystemvendor,#plan,#pipetube").removeClass("validate");
        $jq1("#sealsystemvendor,#plan,#pipetube").val("0");
        $jq1("#sealsystemvendor,#plan,#pipetube").trigger("change");
        $jq1("#sealsystemvendor,#plan,#pipetube").attr("disabled", "disabled").attr("data-required", "false");
    }
    else
        $jq1("#sealsystemvendor,#plan,#pipetube").removeAttr("disabled").attr("data-required", "true");
});



/**------------------ Validations to be added ------------------**/
function ValidateTender() {
    var i = 0;
    $jq1(".form-group").each(function () {
        var elem = $jq1(this);
        if ($jq1.trim(elem.find("select").val()) == $jq1.trim(DefaultDropdownValue))
            elem.find("select").addClass("validate");
        else
            elem.find("select").removeClass("validate");
    });
    if ($jq1("#currencyeurorusd").val() == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1("#numberofequalunits").val() == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1("#pricingcategory").val() == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1("#requiredmaterialcertificate").val() == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1("#mle").val() == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1("#sle").val() == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#shaftsealsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#mechanicalsealvendor").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#mechanicalseal").val()).toLowerCase() == "double" && $jq1.trim($jq1("#shaftsealsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#sealsystemvendor").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#mechanicalseal").val()).toLowerCase() == "double" && $jq1.trim($jq1("#shaftsealsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#plan").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#mechanicalseal").val()).toLowerCase() == "double" && $jq1.trim($jq1("#shaftsealsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#pipetube").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#servicecenter").val()) == "")
        i = 1;
    if ($jq1.trim($jq1("#levelrepairworkscope").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#designpressurebar").val()) == "")
        i = 1;
    if ($jq1.trim($jq1("#designtemperaturec").val()) == "")
        i = 1;
    if ($jq1.trim($jq1("#atexrequiredonlyupgradekit").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#nacecomplianceonlyupgradekit").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#sitemeasurement").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#balancing").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#couplingvendor").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#speedrpm").val()) == "")
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#motorpowerkw").val()) == "")
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#spacer").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#spacerlengthmm").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#recommendedspacerlengthmm").val()) == "")
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#couplingsuppliedby").val()).toLowerCase() == "sulzer" && $jq1.trim($jq1("#material").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
    if ($jq1.trim($jq1("#bearingvendor").val()) == $jq1.trim(DefaultDropdownValue))
        i = 1;
}
/**------------------ Validations to be added ------------------**/

/**------------------ Custom Validation Ends---------------------**/




 