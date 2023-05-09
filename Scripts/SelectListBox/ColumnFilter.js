var count = 0;
function LoadColumnList(TableName) {
    $jq1("#ColumnListBox").html("");
    $jq1("#ColumnListBox").html('<label for="optional" id="employees" style="font-size: 16px; text-align: center; width: 225px;">Column List</label> <label for="selected" style="font-size: 16px; text-align: right; width: 235px;">Selected Columns</label> <br /> <select id="optional" style="font-size: 14px"> </select> <select id="selected" style="font-size: 14px"></select>');
    var jsonObj = [];
    var customerData = {};

    customerData["TableName"] = TableName;
    customerData["UserName"] = getCookie("UserName");

    jsonObj.push(customerData);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETCOLUMNNAMES',
        cache: false,
        async: false,
        dataType: 'html',
        data: {
            data: JSON.stringify(jsonObj)
        },
        success: function (data) {
            if (data == "Error") {
                toastr.error('Count not load column list!', 'Error', { timeOut: 5000 });
            }
            else {
                var jsonData = JSON.parse(data);
                var drpColumnList = "";
                var drpSelectedColumnList = "";
                var temp = 0;
                var COLUMN_NAME = "";

                if (jsonData.Table.length > 0) {
                    for (i in jsonData.Table) {
                        COLUMN_NAME = jsonData.Table[i].COLUMN_NAME;
                        drpSelectedColumnList += "<option value=" + COLUMN_NAME + ">" + COLUMN_NAME + "</option>";
                    }
                }

                for (i in jsonData.Table1) {
                    COLUMN_NAME = jsonData.Table1[i].COLUMN_NAME;
                    if (COLUMN_NAME != "") {
                        drpColumnList += "<option value=" + COLUMN_NAME + ">" + COLUMN_NAME + "</option>";
                    }
                }
                $jq1("#optional").html(drpColumnList);
                $jq1("#selected").html(drpSelectedColumnList);

                RemoveExtraColumns();

                for (i in jsonData.Table) {
                    $jq1("#optional option").each(function () {
                        if (jsonData.Table[i].COLUMN_NAME == this.innerHTML) {
                            $jq1(this).remove();
                        }
                    });
                }
                if (count == 0) {
                    $jq1("#optional").kendoListBox({
                        connectWith: "selected",
                        toolbar: {
                            tools: ["transferTo", "transferFrom", "transferAllTo", "transferAllFrom"]
                        }
                    });

                    $jq1("#selected").kendoListBox({
                        connectWith: "optional",
                        toolbar: {
                            tools: ["moveUp", "moveDown"]
                        }
                    });

                    $jq1("a[data-command='moveUp']").click(function () {
                        setTimeout(MoveSelected, 500);
                    });

                    $jq1("a[data-command='moveDown']").click(function () {
                        setTimeout(MoveSelected, 500);
                    });
                }
                count += 1;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
            document.getElementById("loadingDiv").style.display = "none";
        },
    });
}

function SaveColumns(TableName) {
    try {
        var jsonObj = [];
        var customerData = {};

        customerData["TableName"] = TableName;
        customerData["UserName"] = getCookie("UserName");
        var i = 0;
        $jq1("#selected").prev().find('ul > li').each(function () {
            customerData["Column" + i] = this.innerHTML;
            i += 1;
        });

        jsonObj.push(customerData);

        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=SAVECOLUMNNAMES',
            cache: false,
            async: false,
            dataType: 'html',
            data: {
                data: JSON.stringify(jsonObj)
            },
            success: function (data) {
                if (data == "Error") {
                    toastr.error('Count not load column list!', 'Error', { timeOut: 5000 });
                }
                else {
                    toastr.success('Columns saved successfully!', 'success', { timeOut: 5000 });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
                document.getElementById("loadingDiv").style.display = "none";
            },
        });
    } catch (e) {

    }
}

function AddNewRow(TableName) {

    var jsonObj = [];
    var customerData = {};

    customerData["TableName"] = TableName;
    customerData["UserName"] = getCookie("UserName");

    jsonObj.push(customerData);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=GETCOLUMNNAMES',
        cache: false,
        async: false,
        dataType: 'html',
        data: {
            data: JSON.stringify(jsonObj)
        },
        success: function (data) {
            if (data == "Error") {
                toastr.error('Count not load column list!', 'Error', { timeOut: 5000 });
            }
            else {
                var jsonData = JSON.parse(data);
                var drpColumnList = "";
                var COLUMN_NAME = "";
                var BalnkValue = 0;
                var NotSelectValue = 0;
                var SelectList = new Array();
                ///Not allowed to add more row then columns
                if ($jq1('#FilterControls').find('input:text').length == jsonData.Table.length) {
                    toastr.error('Not allowed to add more row!', 'Warning', { timeOut: 5000 });
                    return;
                }

                ///Not allowed to add New row if select value not set
                if ($jq1('#FilterControls').find('select').length >= 1) {
                    $jq1('#FilterControls').find('select').each(function () {
                        if ($jq1(this).val() == "Select") {
                            toastr.error('Select value inside SelectBox!', 'Warning', { timeOut: 5000 });
                            NotSelectValue++;
                            return;
                        }
                        else {
                            SelectList.push($jq1(this).val());
                        }
                    });
                }

                if (NotSelectValue == 0) {
                    ///Not allowed to add New row if text value not added
                    if ($jq1('#FilterControls').find('input:text').length >= 1) {
                        $jq1('#FilterControls').find('input:text').each(function () {
                            if ($jq1(this).val() == "") {
                                toastr.error('Enter value inside textbox!', 'Warning', { timeOut: 5000 });
                                BalnkValue++;
                                return;
                            }
                        });
                    }
                }

                if (NotSelectValue == 0 && BalnkValue == 0) {

                    if (jsonData.Table.length > 0) {
                        var ddlCustomers = $jq1("<select />");
                        drpColumnList += "<option value='Select'>----Select----</option>";
                        for (i in jsonData.Table) {
                            COLUMN_NAME = jsonData.Table[i].COLUMN_NAME;
                            var FindVal = 0;
                            for (j = 0; j < SelectList.length; j++) {
                                if (SelectList[j] == COLUMN_NAME) {
                                    FindVal = 1;
                                }
                            }
                            if (FindVal == 0)
                                drpColumnList += "<option value=" + COLUMN_NAME + ">" + COLUMN_NAME + "</option>";
                        }
                    }

                    ddlCustomers.append(drpColumnList);

                    ddlCustomers.css("width", "220px");

                    //Reference the container DIV.
                    var dvContainer = $jq1("#FilterControls")

                    //Add the DropDownList to DIV.
                    var div = $jq1("<div />");
                    div.append(ddlCustomers);

                    //Create a Remove Button.
                    var InputBox = $jq1("<input type = 'text' style='width:400px;margin:8px; margin-left:5px; margin-right:5px; margin-top:5px;' value=' '/>");
                    //Add the Remove Buttton to DIV.
                    div.append(InputBox);

                    var btnRemove = $jq1("<input type = 'button' class='btn btn-danger' value = 'Remove' style='margin-bottom:5px;'/>");
                    btnRemove.click(function () {
                        $jq1(this).parent().remove();
                    });

                    //Add the Remove Buttton to DIV.
                    div.append(btnRemove);

                    //Add the DIV to the container DIV.
                    dvContainer.append(div);
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.error('Something went wrong please try again!', 'Error', { timeOut: 5000 });
            document.getElementById("loadingDiv").style.display = "none";
        },
    });
}

function SaveDefaultColumns(TableName) {
    var jsonObj = [];
    var customerData = {};

    customerData["TableName"] = TableName;
    customerData["UserName"] = getCookie("UserName");

    jsonObj.push(customerData);

    $jq1.ajax({
        url: 'ServiceHandler.ashx?CBH=SAVEDAULTCOLUMNS',
        cache: false,
        async: false,
        data: {
            data: JSON.stringify(jsonObj)
        },
        dataType: 'html',
        success: function (data) {
            if (data == "Error") {

            }
            else {
                count = 0;
                LoadColumnList(TableName);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastr.success('Profile details saved successfully!', 'Success', { timeOut: 5000 });
        },
    });
}