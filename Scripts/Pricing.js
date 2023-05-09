$jq1(document).on("change", "#txtDiscountPercentage", function () {
    $jq1("#lblCalculatedAmount").text((parseFloat($jq1("#lblCalculatedAmount").text()) - parseFloat($jq1("#lblCalculatedAmount").text()) * parseFloat($jq1.trim($jq1("#txtDiscountPercentage").val())) / 100).toFixed(2));
});
function PricingFormSetup() {
    var currency = "USD";
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=READPRICINGDATA',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data1) { 
            var HTMLPanels = "<div class='panel-outer-wrapper'>";
            HTMLPanels += "<div class='Pricing-controls-wrapper'>";
            HTMLPanels += "<div class='form-controls'><label for='#txtStandardLeadTime'>Standard Lead Time</label><input type='text' id='txtStandardLeadTime' disabled /><span class='units'>weeks</span>";
            HTMLPanels += "<label for='#txtAdjustment'>Adjustment</label><input type='number' id='txtAdjustmentTime' /><span class='units'>weeks</span>";
            HTMLPanels += "<label for='#txtLeadTime'>Final Lead Time</label><input type='text' id='txtLeadTime' disabled /><span class='units'>weeks</span></div>";
            HTMLPanels += "<div class='form-controls'><label for='#txtSAPCustomerReference'>SAP Quotation Number</label><input type='text' id='txtSAPCustomerReference' /></div>";
            HTMLPanels += "</div>";
            HTMLPanels += "<div class='tblWrapper'>";
            HTMLPanels += "<table class='tblPricingProductData'>";
            HTMLPanels += "<thead>";
            HTMLPanels += "<tr>";
            HTMLPanels += "<th>DIN / Find Number</th>";
            HTMLPanels += "<th>Drawing Number</th>";
            HTMLPanels += "<th>Description</th>";
            HTMLPanels += "<th>Quantity/Pump</th>";
            HTMLPanels += "<th>Unit</th>";
            HTMLPanels += "<th>Cost</th>";
            HTMLPanels += "</tr>";
            HTMLPanels += "</thead>";
            HTMLPanels += "<tbody>";
            $jq1(data1).each(function (i) {
                HTMLPanels += "<tr>";
                HTMLPanels += "<td>" + data1[i].FindNumber+"</td>";
                HTMLPanels += "<td>" + data1[i].DrawingNumber + "</td>";
                HTMLPanels += "<td>" + data1[i].Description + "</td>";
                HTMLPanels += "<td>" + data1[i].Quantity + "</td>";
                HTMLPanels += "<td>" + data1[i].Unit + "</td>";
                HTMLPanels += "<td class='rmsp-val'>" + data1[i].Cost + "</td>";
                HTMLPanels += "</tr>";
            });
            HTMLPanels += "</tbody>";
            HTMLPanels += "</table>";
            $jq1(".pricing-data-wrapper").html(HTMLPanels);
            $jq1("#txtStandardLeadTime").val("6");
            $jq1("#txtAdjustmentTime").val(0);
            $jq1("#txtAdjustmentTime").attr("min", parseInt("-" + $jq1("#txtStandardLeadTime").val()));
            $jq1("#txtLeadTime").val(parseInt($jq1("#txtStandardLeadTime").val()) + parseInt($jq1("#txtAdjustmentTime").val()));
            if (!$jq1("#parameters .review").hasClass("active")) {

            $jq1(".dynamic-content-wrapper > *").hide();
        
            $jq1(".pricing-data-wrapper").show();

            }

            var discountControl = "";
            discountControl += "<div class='discountControlsWrapper'>";
            discountControl += "<div class='form-controls-wrapper'>";
            discountControl += "<label for='#txtDiscountPercentage'>Discount (%)</label>";
            discountControl += "<input type='number' id='txtDiscountPercentage' min='0' max='99' value='0' />";
            discountControl += "<a href='javascript:;' class='btn btn-primary' id='btnGetPrice'>Get Price</a>";
            discountControl += "<label id='lblAmount'>Amount: </label>";

            var q = 0;
            
                $jq1(".tblPricingProductData").each(function (i) {

                    q = q + parseInt($jq1.trim($jq1(this).find(".rmsp-val").text()));

                });
                discountControl += "<label id='lblCalculatedAmount'>" + q + " " + currency + "</label>";
                discountControl += "<a href='javascript:;' class='btn btn-primary' id='btnSaveQuotation'>Save & Continue</a>";
                discountControl += "<input type='checkbox' id='chxBoxIncludeDiscount' /><label>Show discount in quotation</label>";
                discountControl += "</div>";
                discountControl += "</div>";
                discountControl += "</div>";
                $jq1(".panel-outer-wrapper").append(discountControl);
               // setTimeout(function () {
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETTENDER',
                    cache: false,
                    async: true,
                    data: { TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()) },
                    dataType: 'json',
                    success: function (data) {
                        var htmlCurrencyCode = "";
                        var code = "";
                        $jq1.each(data, function (i) {
                            if ($jq1.trim(data[i].ParameterName) == $jq1.trim('Currency (EUR or USD)')) {
                                htmlCurrencyCode = "<span id='CurrencyCode'>" + data[i].ParameterValue + "</span>";
                                code = $jq1.trim(data[i].ParameterValue);
                            }
                        });

                        $jq1.ajax({
                            url: 'ServiceHandler.ashx?CBH=CURRENCYEXCHANGERATE',
                            cache: false,
                            async: true,
                            data: { CountryCode: code },
                            dataType: 'json',
                            success: function (data) {
                                var rate = data[0].Value;
                                var baseAmount = $jq1("#lblCalculatedAmount").text();
                                var result = parseInt(rate) * parseInt(baseAmount);
                                $jq1("#lblCalculatedAmount").text(result);
                                $jq1(htmlCurrencyCode + "<span id='ExchangeRate'>(Exchange Rate:" + rate + ")</span>").insertAfter($jq1("#lblCalculatedAmount"));
                            }
                        });

                    }
                });
                    $jq1.ajax({
                        url: 'ServiceHandler.ashx?CBH=GETTENDERDETAILS',
                        cache: false,
                        async: true,
                        data: {
                            TenderUniqueId: $jq1("#tenderGuid").val()
                        },
                        dataType: 'json',
                        success: function (data1) {
                            $jq1("#txtLeadTime").val(data1[0].LeadTime);
                            $jq1("#txtSAPCustomerReference").val(data1[0].SAPQuotationNumber);
                            setTimeout(function () {
                                $jq1("#txtDiscountPercentage").val(parseInt($jq1.trim(data1[0].Discount) == "" ? 0 : $jq1.trim(data1[0].Discount)));
                                $jq1("#btnGetPrice").trigger("click");
                            }, 3000);

                        }
                    });
           // }, 3000);


        }
    });
}
$jq1(document).on("click", "#btnSaveQuotation", function () {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=SAVEQUOTATION',
        cache: false,
        async: true,
        data: {
            TenderUniqueId: $jq1("#tenderGuid").val(),
            Quotation: $jq1("#lblCalculatedAmount").text(),
            QuotationNumber: $jq1.trim($jq1("#txtSAPCustomerReference").val()) == "" ? "" : $jq1("#txtSAPCustomerReference").val(),
            LeadTime: $jq1.trim($jq1("#txtLeadTime").val()) == "" ? "" : $jq1("#txtLeadTime").val(),
            Discount: $jq1.trim($jq1("#txtDiscountPercentage").val())
        },
        dataType: 'json',
        success: function (data1) {
            alert("Saved");
            $jq1("#parameters .review a").trigger("click");
        }
    });
});

/**----------------- PRICING TAB DESIGN LOGIC STARTS----------------------**/


function PricingFormSetup1() {
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=PRODUCTLIST',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            var currency = "";
            var HTMLPanels = "<div class='panel-outer-wrapper'>";
            HTMLPanels += "<div class='Pricing-controls-wrapper'>";

            HTMLPanels += "<div class='form-controls'><label for='#txtStandardLeadTime'>Standard Lead Time</label><input type='text' id='txtStandardLeadTime' disabled /><span class='units'>days</span>";
            HTMLPanels += "<label for='#txtAdjustment'>Adjustment</label><input type='number' id='txtAdjustmentTime' /><span class='units'>days</span>";
            HTMLPanels += "<label for='#txtLeadTime'>Final Lead Time</label><input type='text' id='txtLeadTime' disabled /><span class='units'>days</span></div>";
            HTMLPanels += "<div class='form-controls'><label for='#txtSAPCustomerReference'>SAP Quotation Number</label><input type='text' id='txtSAPCustomerReference' /></div>";
            HTMLPanels += "</div>";
            
            $jq1.each(data, function (i) {
                HTMLPanels += "<div class='panel-wrapper' data-productId='" + data[i].ProductId + "'>";
                HTMLPanels += "<h3 class='panel-heading'>" + data[i].ProductName + "</h3>";
                HTMLPanels += "<div class='panel-content' data-id='" + data[i].ProductName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '') + "'></div>";
                HTMLPanels += "</div>";
               
                $jq1(".pricing-data-wrapper").html(HTMLPanels);

                //Old Pricing code
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=PRODUCTPRICINGDATA',
                    cache: false,
                    async: true,
                    data: { ProductId: data[i].ProductId, TenderUniqueId: $jq1("#tenderGuid").val() },
                    dataType: 'json',
                    success: function (data1) {
                        var HTMLPricingData = "<table class='tblPricingProductData'>";
                        HTMLPricingData += "<thead><tr>";
                        $jq1.each(data1, function (i) {
                            if (data1[i].ParameterName.indexOf("Currency") > -1) {
                                currency = data1[i].ParameterValue;
                            }
                            HTMLPricingData += "<th>" + data1[i].ParameterName +"</th>";
                            console.log(data1[i].ParameterName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, ''));
                        });
                        HTMLPricingData += "<th class='rmsp'>RMSP</th></tr></thead><tbody></tbody></table>";
                        $jq1(".panel-wrapper[data-productid='" + data[i].ProductId + "'] .panel-content").html(HTMLPricingData);
                        //setTimeout(function () {
              
                       // }, 3000);
                        

                        
            $jq1(".dynamic-content-wrapper > *").hide();
            $jq1("#txtStandardLeadTime").val("6");
            $jq1("#txtAdjustmentTime").val(0);
            $jq1("#txtAdjustmentTime").attr("min", parseInt("-" + $jq1("#txtStandardLeadTime").val()));
            $jq1("#txtLeadTime").val(parseInt($jq1("#txtStandardLeadTime").val()) + parseInt($jq1("#txtAdjustmentTime").val()));
            $jq1(".pricing-data-wrapper").show();

                    }
                });


            });
            
            var discountControl = "";
            discountControl += "<div class='discountControlsWrapper'>";
            discountControl += "<div class='form-controls-wrapper'>";
            discountControl += "<label for='#txtDiscountPercentage'>Discount (%)</label>";
            discountControl += "<input type='number' id='txtDiscountPercentage' min='0' max='99' value='0' />";
            discountControl += "<a href='javascript:;' class='btn btn-primary' id='btnGetPrice'>Get Price</a>";
            discountControl += "<label id='lblAmount'>Amount: </label>";

            var q = 0;
            setTimeout(function () {
                $jq1(".tblPricingProductData").each(function (i) {

                    q = q + parseInt($jq1.trim($jq1(this).find(".rmsp-val").text()));

                });
                discountControl += "<label id='lblCalculatedAmount'>" + q + " " + currency + "</label>";
                discountControl += "<a href='javascript:;' class='btn btn-primary' id='btnSaveQuotation'>Save & Continue</a>";
                discountControl += "<input type='checkbox' id='chxBoxIncludeDiscount' /><label>Show discount in quotation</label>";
                discountControl += "</div>";
                discountControl += "</div>";
                discountControl += "</div>";
                $jq1(".panel-outer-wrapper").append(discountControl);
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETTENDER',
                    cache: false,
                    async: true,
                    data: { TenderUniqueId: $jq1.trim($jq1("#tenderGuid").val()) },
                    dataType: 'json',
                    success: function (data) {
                        var htmlCurrencyCode = "";
                        var code = "";
                        $jq1.each(data, function (i) {
                            if ($jq1.trim(data[i].ParameterName) == $jq1.trim('Currency (EUR or USD)')) {
                                htmlCurrencyCode = "<span id='CurrencyCode'>" + data[i].ParameterValue + "</span>";
                                code = $jq1.trim(data[i].ParameterValue);
                            }
                        });
                        
                        $jq1.ajax({
                            url: 'ServiceHandler.ashx?CBH=CURRENCYEXCHANGERATE',
                            cache: false,
                            async: true,
                            data: { CountryCode: code },
                            dataType: 'json',
                            success: function (data) {
                                var rate = data[0].Value;
                                var baseAmount = $jq1("#lblCalculatedAmount").text();
                                var result = parseFloat(rate) * parseFloat(baseAmount);
                                $jq1("#lblCalculatedAmount").text(result.toFixed(2));
                                $jq1(htmlCurrencyCode + "<span id='ExchangeRate'>(Exchange Rate:"+rate+")</span>").insertAfter($jq1("#lblCalculatedAmount"));
                            }
                        });
                       
                    }
                });
            },3000);
           
          
           
            

        }
    });


    if (window.location.href.indexOf("?code") > -1) {
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=GETTENDERDETAILS',
            cache: false,
            async: true,
            data: {
                TenderUniqueId: $jq1("#tenderGuid").val()
            },
            dataType: 'json',
            success: function (data1) {
                $jq1("#txtLeadTime").val(data1[0].LeadTime);
                $jq1("#txtSAPCustomerReference").val(data1[0].SAPQuotationNumber);
                setTimeout(function () {
                    $jq1("#txtDiscountPercentage").val(parseInt($jq1.trim(data1[0].Discount) == "" ? 0 : $jq1.trim(data1[0].Discount)));
                    $jq1("#btnGetPrice").trigger("click");
                }, 3000);
                
            }
        });
    }
}


///**-------------- Generate panels -------------**/
    
//}
/**----------------- PRICING TAB DESIGN LOGIC ENDS----------------------**/


/**----------------- PRICING CALCULATION STARTS ------------------------*/
$jq1(document).on("click", "#btnGetPrice", function () {
    //var totalPrice=0;
    //$jq1(".tblPricingProductData td:nth-child(5)").each(function () {
        
    //    totalPrice = parseInt(totalPrice) + parseInt($jq1.trim($jq1(this).text()));
    //    console.log($jq1.trim($jq1(this).text()));
        
    //});
    //if ($jq1.trim($jq1("#txtDiscountPercentage").val()) == '') {
    //    $jq1("#lblCalculatedAmount").text(totalPrice);
    //}
    //else {
    //    $jq1("#lblCalculatedAmount").text(totalPrice - totalPrice * parseInt($jq1.trim($jq1("#txtDiscountPercentage").val()))/100);
    //}
    $jq1("#lblCalculatedAmount").text((parseFloat($jq1("#lblCalculatedAmount").text()) - parseFloat($jq1("#lblCalculatedAmount").text()) * parseFloat($jq1.trim($jq1("#txtDiscountPercentage").val())) / 100).toFixed(2));
    
});
/**----------------- PRICING CALCULATION ENDS ------------------------*/

$jq1(document).ready(function () {
    
    /**----------------- DROPDOWN FOR THE BASE CURRENCY STARTS ---------------**/
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=ALLCURRENCIES',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            var HTMLCurrencyCodeDropdowns = "";
            $jq1.each(data, function (i) {
                HTMLCurrencyCodeDropdowns += "<option value='" + data[i].CurrencyCodes + "'>" + data[i].CurrencyCodes+"</option>";
            });
            $jq1("#ddBaseCurrency").html(HTMLCurrencyCodeDropdowns);
        }
    });
    /**----------------- DROPDOWN FOR THE BASE CURRENCY ENDS ---------------**/

    /**----------------- CURRENCY EXCHANGE TABLE STARTS ---------------**/
    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=CURRENCYEXCHANGETABLE',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            var HTMLCurrencyTable = "<table id='tblCurrencyTable'>";
            HTMLCurrencyTable += "<thead>";
            HTMLCurrencyTable += "<tr>";
            HTMLCurrencyTable += "<th>Course</th>";
            $jq1.each(data, function (i) {
                HTMLCurrencyCodeDropdowns += "<option value='" + data[i].CurrencyCodes + "'>" + data[i].CurrencyCodes + "</option>";
            });
            $jq1(".currencyExchangeTableWrapper").html(HTMLCurrencyTable);
        }
    });
     /**----------------- CURRENCY EXCHANGE TABLE ENDS ---------------**/
});


$jq1(document).on("change", "#txtAdjustmentTime", function () {
    $jq1("#txtLeadTime").val(parseInt($jq1("#txtStandardLeadTime").val()) + parseInt($jq1("#txtAdjustmentTime").val()));
});
