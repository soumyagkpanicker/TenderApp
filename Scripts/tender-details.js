$(document).on("click", "a.btn-generateTender", function () {
    GeneratePDFFromHTML();
});
$(document).ajaxComplete(function () {
    $(".form-group input[type='hidden']").prev("label").hide();
    if ($(".review-controls-wrapper").length > 0) {
        $("#File").parents(".form-group").hide();
        $(".tabs-wrapper").hide();
    }
    $("input,select").each(function (i) {
        $(this).attr("disabled", "true");
    });
});

function GeneratePDFFromHTML() {

    if (ValidateInputs()) {
        $(".loader").removeClass("fadeAway");
        $(".error-message-wrapper").removeClass("active");
        var tender = {
            TenderType: $("input[name='tenderType']:checked").next("span").text(),
            TenderId: $("#txtTenderId").val(),
            ProjectId: $("#ProjectId").text(),
            ERPId: $("#txtERPId").val(),
            CreatedBy: $(".user-information .username").text(),
            // DateOfCreation: d.getDate(),
            TenderUniqueId: $("#tenderGuid").val()
        };
        $.ajax({
            url: 'ServiceHandler.ashx?CBH=REVIEWFORMDATA',
            cache: false,
            async: true,
            data: { UniqueId: $("#tenderGuid").val() },
            dataType: 'json',
            success: function (data) {
                var HtmlMainNavigation = "<div>";
                $.each(data, function (i) {
                    $("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                });

            }
        });
        $.ajax({
            url: 'ServiceHandler.ashx?CBH=CONVERTTOPDFFROMHTML',
            cache: false,
            async: true,
            data: {
                TenderType: $("input[name='tenderType']:checked").next("span").text(),
                TenderId: $("#txtTenderId").val(),
                ProjectId: $("#ProjectId").text(),
                ERPId: $("#txtERPId").val(),
                CreatedBy: $(".user-information .username").text(),
                // DateOfCreation: d.getDate(),
                TenderUniqueId: $("#tenderGuid").val(),
                UserName: $(".user-information .username").text(),
                Role: $(".role").text(),
                Location: $(".location").text(),
                Customer: $("#Contact").val()
            },
            dataType: 'json',
            success: function (data) {
                var obj = {};
                $(".tabs-content-wrapper .form-group").each(function () {
                    obj[$(this).find("label").text()] = $(this).children().last().val();
                });
                $.each(obj, function (index, value) {
                    $.ajax({
                        url: 'ServiceHandler.ashx?CBH=SAVEFORMDATA',
                        cache: false,
                        async: true,
                        data: { TenderId: $("#txtTenderId").val(), ParameterName: value, ParameterValue: index, Guid: $("#tenderGuid").val() },
                        dataType: 'json',
                        success: function (data) {

                            var HtmlMainNavigation = "<div>";
                            $.each(data, function (i) {
                                HtmlMainNavigation += "<div class='form-group'><label for='#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "'>" + data[i].Label + "</label><input type='text' id=" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "></div>";
                            });
                            HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                            $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                        }
                    });
                });

            }
        });
        setTimeout(function () {
            $(".loader").addClass("fadeAway");
        }, 2000);
    }
    else {
        $(".error-message-wrapper").addClass("active");
    }

}
function ValidateInputs() {
    $("input[type='text']").each(function () {
        var elem = $(this);
        if ($.trim(elem.val()) == '')
            elem.addClass("validate");
        else
            elem.removeClass("validate");
    });
    if ($(".validate").length > 0)
        return false;
    return true;
}



function GetAllFormAttributes() {
    if ($.trim($("#tenderGuid").val()) == '') {
        $("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
            G() + "-" + G() + G() + G()).toUpperCase());
    }
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=GETALLFORMATTRIBUTES',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            var HtmlMainNavigation = "<div>";
            $.each(data, function (i) {
                var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
            });
            HtmlMainNavigation += "<div class='review-controls-wrapper'><div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div><div class='button-wrapper'><a href='javascript:;' class='btn-generateTender'>Generate Tender</a></div></div>";
            $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
            LoadDataForDropdown();
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=REVIEWFORMDATA',
                cache: false,
                async: true,
                data: { UniqueId: $("#tenderGuid").val() },
                dataType: 'json',
                success: function (data) {
                    var HtmlMainNavigation = "<div>";
                    $.each(data, function (i) {
                        $("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                        $("select#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                    });

                }
            });
        }
    });
}
function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}
$(document).ready(function () {
    setTimeout(function () {
        if (window.location.href.indexOf("NewTender") > -1) {
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=LATESTPROJECTID',
                cache: false,
                async: true,
                dataType: 'json',
                success: function (data) {
                    //var htmlOptions = "<option value='0'>Select</option>";
                    var uniqunum = data[0].ProjectId.split("_");
                    $("#ProjectId").text("RES_OHX_" + $(".location-code").text() + "_" + pad((parseInt(uniqunum[uniqunum.length - 1]) + 1), 3));
                }
            });

        }
    }, 3000);
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=MAINNAVIGATION',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            var d;
            var HtmlMainNavigation = "<ul class='wizard'>";
            $.each(data, function (i) {
                HtmlMainNavigation += "<li data-mainMenuId=" + data[i].Id + " data-hasSubnavigation=" + data[i].HasSubNavigation + "><a href='javascript:;'><span class='circle'>" + (i + 1) + "</span><span class='text'>" + data[i].Description + "</span></a></li>";
                d = i + 1;
            });
            HtmlMainNavigation += "<li class='review disabled' data-mainmenuid='0' data-hassubnavigation='false' class='active'><a href='javascript:;'><span class='circle'>" + (d + 1) + "</span><span class='text'>Review</span></a></li></ul>";
            $("#parameters").html(HtmlMainNavigation);
            $("#parameters .wizard > li:first-child").trigger("click");
            loadFormDataOnLoad();
        }
    });

});


function loadFormDataOnLoad() {
    if (window.location.search.indexOf("code") >= 0) {
        $("#tenderGuid").val(getUrlVars()["code"]);
        var mainMenuId = $("#parameters .wizard > li:first-child").data("mainmenuid");
        $.ajax({
            url: 'ServiceHandler.ashx?CBH=SUBNAVIGATION',
            cache: false,
            async: true,
            data: { MainTabId: mainMenuId },
            dataType: 'json',
            success: function (data) {

                var HtmlMainNavigation = "<ul>";
                $.each(data, function (i) {
                    HtmlMainNavigation += "<li data-subMenuId=" + data[i].Id + " data-mainMenuId=" + data[i].MainTabId + "><a href='javascript:;'>" + data[i].Subnav + "</a></li>";
                    console.log(data[i].Description);
                });
                HtmlMainNavigation += "</ul>";
                $(".dynamic-content-wrapper .tabs-wrapper").html(HtmlMainNavigation);
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATA',
                    cache: false,
                    async: true,
                    data: { MainTabId: $("#parameters .wizard > li:first-child").data("mainmenuid"), SubNavId: $(".dynamic-content-wrapper .tabs-wrapper ul > li:first-child").data("submenuid") },
                    dataType: 'json',
                    success: function (data) {

                        var HtmlMainNavigation = "<div>";
                        $.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
                        });
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
                        $(".dynamic-content-wrapper .tabs-wrapper ul li:first-child").addClass("active");


                        //added
                        $.ajax({
                            url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                            cache: false,
                            async: true,
                            data: { MainTabId: $("#parameters .wizard > li:first-child").data("mainmenuid"), SubNavId: $(".dynamic-content-wrapper .tabs-wrapper ul > li:first-child").data("submenuid"), UniqueId: getUrlVars()["code"] },
                            dataType: 'json',
                            success: function (data) {
                                var HtmlMainNavigation = "<div>";
                                $.each(data, function (i) {
                                    $("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                                    $("#txtTenderId").val(data[i].TenderId);
                                    $("#txtERPId").val(data[i].ERPId);
                                    $("label#ProjectId").text(data[i].ProjectId);
                                });

                            }
                        });
                    }
                });
            }
        });
    }
    else {
        var mainMenuId = $("#parameters .wizard > li:first-child").data("mainmenuid");
        $.ajax({
            url: 'ServiceHandler.ashx?CBH=SUBNAVIGATION',
            cache: false,
            async: true,
            data: { MainTabId: mainMenuId },
            dataType: 'json',
            success: function (data) {

                var HtmlMainNavigation = "<ul>";
                $.each(data, function (i) {
                    HtmlMainNavigation += "<li data-subMenuId=" + data[i].Id + " data-mainMenuId=" + data[i].MainTabId + "><a href='javascript:;'>" + data[i].Subnav + "</a></li>";
                    console.log(data[i].Description);
                });
                HtmlMainNavigation += "</ul>";
                $(".dynamic-content-wrapper .tabs-wrapper").html(HtmlMainNavigation);

                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATA',
                    cache: false,
                    async: true,
                    data: { MainTabId: $("#parameters .wizard > li:first-child").data("mainmenuid"), SubNavId: $(".dynamic-content-wrapper .tabs-wrapper ul > li:first-child").data("submenuid") },
                    dataType: 'json',
                    success: function (data) {

                        var HtmlMainNavigation = "<div>";
                        $.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
                        });
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                        $(".dynamic-content-wrapper .tabs-wrapper ul li:first-child").addClass("active");

                        LoadDataForDropdown();

                    }
                });
            }
        });
    }


}

function GetHTMLBYTYPE(fieldType, id, tableName, showAutoComplete, takeTableValues, lblId) {
    if (fieldType == 1)
        return "<input type='text' id='" + id + "' />";
    if (fieldType == 2) {
        if (takeTableValues)
            return "<select data-lblId='" + lblId + "' id='" + id + "' data-tb='" + tableName + "' class='" + ((showAutoComplete) ? "autocomplete" : "") + "'></select>";
        else
            return "<select data-lblId='" + lblId + "' id='" + id + "' class='" + ((showAutoComplete) ? "autocomplete" : "") + "'></select>";
    }

    if (fieldType == 6)
        return "<input type='file' id='" + id + "'></label>";
    return "";

}

function LoadDataForDropdown() {
    //new
    $("select").each(function () {
        var elem = $(this);
        if ($.trim($(this).attr("data-tb")) != '') {
            console.log($("select").length);
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=GETTABLEDATA',
                cache: false,
                async: false,
                data: { Table: elem.attr("data-tb") },
                dataType: 'json',
                success: function (data) {
                    var dataCol = Object.keys(data[0])[1];
                    var HtmlMainNavigation = "";
                    $.each(data, function (i) {
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
                                if ($.trim($(elem).data("lblid")) == $.trim(data[i].FormAttributeId))
                                    HtmlMainNavigation += "<option value='" + data[i][dataCol] + "' data-id='" + data[i].FormAttributeId + "'>" + data[i][dataCol] + "</option>";
                            }
                        }
                    });
                    $(elem).html(HtmlMainNavigation);
                    //HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                    //$(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                }
            });
        }
        else {
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=GETDDVALUES',
                cache: false,
                async: false,
                data: { LblId: elem.attr("data-lblid") },
                dataType: 'json',
                success: function (data) {
                    var HtmlMainNavigation = "";
                    $.each(data, function (i) {
                        console.log(data[i].DropdownValue);
                        HtmlMainNavigation += "<option value='" + data[i].DropdownValue + "'>" + data[i].DropdownValue + "</option>";

                    });
                    $(elem).html(HtmlMainNavigation);
                    //HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                    //$(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                }
            });
        }
    });
    $('select.autocomplete').select2();
    $("select#drpSearchCustomer").trigger("change");
}

$(document).on("click", "#parameters .wizard > li", function () {
    $(".error-message-wrapper").removeClass("active");
    var elem = $(this);
    if (window.location.href.indexOf("?code") > -1) {

        /***------------ Pricing Code ---------------**/
        if ($.trim($(this).find(".text").text()) == pricingTabName) {
            $("#parameters .wizard > li").removeClass("active");
            $(this).addClass("active");
            PricingFormSetup();
            return false;
        }
        else {
            $(".dynamic-content-wrapper > *").show();
            $(".pricing-data-wrapper").hide();

        }

    }
    else {
        if (!$(this).hasClass('disabled')) {
            /***------------ Pricing Code ---------------**/
            if ($.trim($(this).find(".text").text()) == pricingTabName) {
                $("#parameters .wizard > li").removeClass("active");
                $(this).addClass("active");
                PricingFormSetup();
                return false;
            }
            else {
                $(".dynamic-content-wrapper > *").show();
                $(".pricing-data-wrapper").hide();

            }
        }
    }
    if (!$(this).hasClass("review")) {

        $("#parameters .wizard > li").removeClass("active");
        $(this).addClass("active");
        $("h2").text($("#parameters .wizard li.active > a .text").text());
        var mainMenuId = $(this).data("mainmenuid");
        if ($(this).attr("data-hassubnavigation") == "false") {
            $(".tabs-wrapper").hide();
            var subMenuId = "0";
            if (window.location.search.indexOf("code") >= 0) {
                $("#tenderGuid").val(getUrlVars()["code"]);

                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATA',
                    cache: false,
                    async: true,
                    data: { MainTabId: mainMenuId, SubNavId: subMenuId },
                    dataType: 'json',
                    success: function (data) {
                        var HtmlMainNavigation = "<div>";
                        $.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
                        });
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
                        LoadDataForDropdown();
                        //added
                        $.ajax({
                            url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                            cache: false,
                            async: true,
                            data: { MainTabId: mainMenuId, SubNavId: subMenuId, UniqueId: getUrlVars()["code"] },
                            dataType: 'json',
                            success: function (data) {
                                var HtmlMainNavigation = "<div>";
                                $.each(data, function (i) {
                                    $("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                                    //HtmlMainNavigation += "<div class='form-group'><label for='#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "'>" + data[i].Label + "</label><input type='text' id=" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + " value='" + data[i].ParameterValue + "'></div>";
                                });

                            }
                        });
                    }
                });



            }
            else {
                $(".dynamic-content-wrapper .tabs-wrapper ul li").removeClass("active");

                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATA',
                    cache: false,
                    async: true,
                    data: { MainTabId: mainMenuId, SubNavId: subMenuId },
                    dataType: 'json',
                    success: function (data) {

                        var HtmlMainNavigation = "<div>";
                        $.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
                        });
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
                        LoadDataForDropdown();
                    }
                });
            }
        }
        else {

            $.ajax({
                url: 'ServiceHandler.ashx?CBH=SUBNAVIGATION',
                cache: false,
                async: true,
                data: { MainTabId: mainMenuId },
                dataType: 'json',
                success: function (data) {

                    var HtmlMainNavigation = "<ul>";
                    $.each(data, function (i) {
                        HtmlMainNavigation += "<li data-subMenuId=" + data[i].Id + " data-mainMenuId=" + data[i].MainTabId + "><a href='javascript:;'>" + data[i].Subnav + "</a></li>";
                        console.log(data[i].Description);
                    });
                    HtmlMainNavigation += "</ul>";
                    $(".dynamic-content-wrapper .tabs-wrapper").html(HtmlMainNavigation);
                    $(".tabs-wrapper").show();
                    $(".tabs-wrapper ul > li:first-child").trigger("click");
                }
            });
        }
    }



    else {
        if (!$(this).hasClass("disabled")) {
            $("#parameters .wizard > li").removeClass("active");
            $(this).addClass("active");
            $("#parameters .wizard > li").removeClass("active");
            $(this).addClass("active");
            $("h2").text($("#parameters .wizard li.active > a .text").text());
            $(".tabs-wrapper").hide();
            if (window.location.href.indexOf("?code") > -1) {
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=REVIEWFORMDATA',
                    cache: false,
                    async: true,
                    data: { UniqueId: $("#tenderGuid").val() },
                    dataType: 'json',
                    success: function (data) {
                        var HtmlMainNavigation = "<div>";
                        $.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
                        });
                        //Needs to be added - <div class='button-wrapper'><a href='javascript:;' class='btn-generateTender'>Generate Tender</a></div></div>
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
                        LoadDataForDropdown();
                        $.ajax({
                            url: 'ServiceHandler.ashx?CBH=REVIEWFORMDATA',
                            cache: false,
                            async: true,
                            data: { UniqueId: getUrlVars()["code"] },
                            dataType: 'json',
                            success: function (data) {
                                var HtmlMainNavigation = "<div>";
                                $.each(data, function (i) {
                                    $("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                                });

                            }
                        });
                    }
                });
            }
            else {
                //Review
                GetAllFormAttributes();

            }
        }
        else {
            if (window.location.search.indexOf("code") >= 0) {
                $("#parameters .wizard > li").removeClass("active");
                $(this).addClass("active");
                GetAllFormAttributes();
            }

            else
                return false;

        }

    }
});
$(document).on("click", ".dynamic-content-wrapper .tabs-wrapper ul li", function () {
    $(".dynamic-content-wrapper .tabs-wrapper ul li").removeClass("active");
    $(this).addClass("active");
    var mainMenuId = $(this).data("mainmenuid");
    var subMenuId = $(this).data("submenuid");
    if (window.location.search.indexOf("code") >= 0) {
        $("#tenderGuid").val(getUrlVars()["code"]);
        $.ajax({
            url: 'ServiceHandler.ashx?CBH=SUBNAVIGATION',
            cache: false,
            async: true,
            data: { MainTabId: mainMenuId },
            dataType: 'json',
            success: function (data) {
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=FORMDATA',
                    cache: false,
                    async: true,
                    data: { MainTabId: mainMenuId, SubNavId: subMenuId },
                    dataType: 'json',
                    success: function (data) {
                        var HtmlMainNavigation = "<div>";
                        $.each(data, function (i) {
                            var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                            HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                            HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
                        });
                        HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                        $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
                        LoadDataForDropdown();
                        //added
                        $.ajax({
                            url: 'ServiceHandler.ashx?CBH=FORMDATABYUIQUEID',
                            cache: false,
                            async: true,
                            data: { MainTabId: mainMenuId, SubNavId: subMenuId, UniqueId: getUrlVars()["code"] },
                            dataType: 'json',
                            success: function (data) {
                                var HtmlMainNavigation = "<div>";
                                $.each(data, function (i) {
                                    $("input#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '')).val(data[i].ParameterValue);
                                    //HtmlMainNavigation += "<div class='form-group'><label for='#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "'>" + data[i].Label + "</label><input type='text' id=" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + " value='" + data[i].ParameterValue + "'></div>";
                                });

                            }
                        });
                    }
                });


            }
        });
    }
    else {
        $.ajax({
            url: 'ServiceHandler.ashx?CBH=FORMDATA',
            cache: false,
            async: true,
            data: { MainTabId: mainMenuId, SubNavId: subMenuId },
            dataType: 'json',
            success: function (data) {

                var HtmlMainNavigation = "<div>";
                $.each(data, function (i) {
                    var id = data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
                    HtmlMainNavigation += "<div class='form-group'><label for='#" + id + "'>" + data[i].Label + "</label>";
                    HtmlMainNavigation += GetHTMLBYTYPE(data[i].FieldTypeId, id, data[i].MultipleValuesTableName, data[i].ShowAutoComplete, data[i].TakeValuesFromTable, data[i].Id) + "</div>";
                });
                HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);
                LoadDataForDropdown();
            }
        });
    }

});
$(document).on("change", ".fixed-information-for-tender input[name='tenderType']", function () {
    if ($("input#rbFirmTender:checked").length == 1) {
        $(".forscaste").removeClass("hide");
        $(".forscaste input").removeClass("hide");
    }
    else {
        $(".forscaste").addClass("hide");
        $(".forscaste input").addClass("hide");
        $(".forscaste input").removeClass("required");
    }
});
$(document).on("click", ".btn-SaveSubFormData", function () {
    if (window.location.href.indexOf("Edit") == -1) {

        $(".fixed-information-for-tender input[type='text']").each(function () {
            if ($.trim($(this).val()) == '' && !$(this).hasClass("hide")) {
                $(this).addClass("required");
            }
            else {
                $(this).removeClass("required");

            }

        });
        if ($("input[type='text'].required").length <= 0) {
            $("#parameters li.review").removeClass("disabled").attr("data-tenderId", $("#txtTenderId").val());
            $("#parameters li.review").attr("data-tenderUniqueId", $("#tenderGuid").val());
        }

        // }
    }
    if ($("input[type='text'].required").length <= 0) {
        $(".loader").removeClass("fadeAway");

        if ($.trim($("#tenderGuid").val()) == '') {
            $("#tenderGuid").val((G() + G() + "-" + G() + "-" + G() + "-" +
                G() + "-" + G() + G() + G()).toUpperCase());
        }
        if (window.location.href.indexOf("Edit") == -1) {
            if ($.trim($("#txtTenderId").val()) != '' && $.trim($("#tenderGuid").val()) != '' && $.trim($("#txtERPId").val()) != '') {
                $.ajax({
                    url: 'ServiceHandler.ashx?CBH=SAVETENDER',
                    cache: false,
                    async: true,
                    data: {
                        TenderId: $("#txtTenderId").val(),
                        Guid: $("#tenderGuid").val(),
                        ProjectId: $("#ProjectId").text(),
                        ErpId: $("#txtERPId").val(),
                        createdBy: $(".username").text(),
                        tenderType: $("input[name='tenderType']:checked").next("span").text(),
                        tenderInRole: $(".role").text(),
                        tenderLocationCode: $(".location-code").text(),
                        tenderTypeToFilter: "active"
                    },
                    dataType: 'json',
                    success: function (data) {

                    }
                });
            }


        }

        $("#tenderGuid").addClass('updatedOnce');
        var obj = {};
        $(".tabs-content-wrapper .form-group").each(function () {
            obj[$(this).find("label").text()] = $(this).children().last().val();
        });
        var tenderId = $("#txtTenderId").val();

        $.each(obj, function (index, value) {
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=SAVEFORMDATA',
                cache: false,
                async: true,
                data: { TenderId: tenderId, ParameterName: value, ParameterValue: index, Guid: $("#tenderGuid").val() },
                dataType: 'json',
                success: function (data) {

                    var HtmlMainNavigation = "<div>";
                    $.each(data, function (i) {
                        HtmlMainNavigation += "<div class='form-group'><label for='#" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "'>" + data[i].Label + "</label><input type='text' id=" + data[i].Label.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "></div>";
                    });
                    HtmlMainNavigation += "<div class='button-wrapper'><a href='javascript:;' class='btn-SaveSubFormData'>Save information</a></div></div>";
                    $(".dynamic-content-wrapper .tabs-content-wrapper").html(HtmlMainNavigation);

                }
            });
        });

        setTimeout(function () {
            $(".loader").addClass("fadeAway");
        }, 2000);
    }
    else
        return false;
});
function G() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}




$(document).on("change", "select#drpSearchCustomer", function () {
    var id = $(this).val();
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=GETCUSTOMERBYID',
        cache: false,
        async: true,
        data: { Id: id },
        dataType: 'json',
        success: function (data) {
            var HtmlMainNavigation = "<div>";
            $("input#Contact").val(data[0].FirstName + " " + data[0].LastName);
            $("input#StreetNumber").val(data[0].StreetNumber);
            //console.log(data[0].Gender);
            //console.log(data[0].Gender == true ? "Mr" : "Miss");
            $("input#Title").val(data[0].Gender == true ? "Mr" : "Miss");
            //$("input#Title").val(data[0].Gender);
            $("input#PostalCodeCity").val(data[0].PostalCodeCity);
            $("input#Pumpmanufacturer").val(data[0].PumpManufacturer);
            $("input#Projectdescription").val(data[0].ProjectDescription);
            $("input#PumpType").val(data[0].PumpType);
            $("input#SAPCustomersReference").val(data[0].CustomersReference);
            $("input#EndUser").val(data[0].EndUser);
            //console.log(data[0].ValidityPeriod);

            var drpValidationPeriod = "<option value=0>Select</option>"
            drpValidationPeriod += "<option value=" + data[0].ValidityPeriod + ">" + data[0].ValidityPeriod + " Days</option>";
            $("#ValidityperiodoftheTender").html(drpValidationPeriod);
            $("#ValidityperiodoftheTender").val(data[0].ValidityPeriod);
            $("#Country").val(data[0].Country);
            $("#CustomerName").val(data[0].Customer);

        }
    });

});