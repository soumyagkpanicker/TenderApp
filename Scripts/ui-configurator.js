$(document).ready(function () {
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=MAINNAVIGATION',
        cache: false,
        async: false,
        dataType: 'json',
        success: function (data) {
            var HtmlMainSelect = "<option value='0'>Select</option>";
            $.each(data, function (i) {
                HtmlMainSelect += "<option data-hasSubNav='" + data[i].HasSubNavigation +"' value='" + data[i].UniqueSymbol + "'>" + data[i].Description +"</option>";
            });
            $("#ddMainTabs").html(HtmlMainSelect);
        }
    });
});

$(document).on("change", "#ddMainTabs", function () {
    var id = $(this).val();
    var showSubNav = $("#ddMainTabs").find(":selected").data("hassubnav");
    if (showSubNav) {
        $.ajax({
            url: 'ServiceHandler.ashx?CBH=SUBNAVIGATION',
            cache: false,
            async: false,
            data: { MainTabId: id },
            dataType: 'json',
            success: function (data) {
                var HtmlSubSelect = "<option value='0'>Select</option>";
                $.each(data, function (i) {
                    HtmlSubSelect += "<option value='" + data[i].UniqueSymbol + "'>" + data[i].Subnav + "</option>";
                });
                $("#ddSubTabs").html(HtmlSubSelect);
                $("#ddSubTabs").parents(".control-wrap").removeClass("hide");
            }
        });
    }
    else
        $("#ddSubTabs").parents(".control-wrap").addClass("hide");
  
});

$(document).on("click", "#btnGetFields", function () {
    var mainTabId = $("#ddMainTabs :selected").val();
    var showSubNav = $("#ddMainTabs").find(":selected").data("hassubnav");
    var subNavId = showSubNav ? $("#ddSubTabs :selected").val():0;
    if (mainTabId != 0) {
        if (subNavId != 0) {
            //Code for both main and sub
            $.ajax({
                url: 'ServiceHandler.ashx?CBH=FORMDATA',
                cache: false,
                async: false,
                data: {
                    MainTabId: mainTabId,
                    SubNavId: subNavId
                },
                dataType: 'json',
                success: function (data) {
                    var HtmlSubSelect = "<thead><tr>";
                    HtmlSubSelect += "<th>Name</th>";
                    HtmlSubSelect += "<th>Type</th>";
                    HtmlSubSelect += "<th class='hide'>SortOrder</th>";
                    HtmlSubSelect += "</tr></thead><tbody>";
                    $.each(data, function (i) {
                        HtmlSubSelect += "<tr data-id='" + data[i].Id + "' data-OrderNumber='" + data[i].SortOrder +"'>";
                        HtmlSubSelect += "<td data-OrderNumber='" + data[i].SortOrder +"'>" + data[i].Label + "</td>";
                        HtmlSubSelect += (data[i].FieldTypeId == 1)?"<td>Textbox</td>":"<td>Other</td>";
                        HtmlSubSelect += "<td class='hide'>" + data[i].SortOrder + "</td>";
                        HtmlSubSelect += "</tr>";
                    });
                    HtmlSubSelect += "</tbody>";
                    $("#tblFormAttributes").html(HtmlSubSelect);
                    if ($("#btnSave").length <= 0) {
                        var btnSubSelect = "<div class='btn-wrapper result'>";
                        btnSubSelect += "<a href='javascript:;' class='btn btn-primary' id='btnSave'>Save Changes</a>"
                        btnSubSelect += "</div>";
                        $(btnSubSelect).insertAfter($("#tblFormAttributes"));
                       
                    }
                    $("#tblFormAttributes").tableDnD({
                        onDragClass: "myDragClass",
                        onDrop: function (table, row) {
                            var rows = table.tBodies[0].rows;
                            var debugStr = "Row dropped was " + row.id + ". New order: ";
                            for (var i = 0; i < rows.length; i++) {
                                debugStr += rows[i].id + " ";
                                console.log("Inside loop-dropped row: " + debugStr);
                            }
                            console.log("Outside loop dropped row:" + debugStr);
                        },
                        onDragStart: function (table, row) {
                            // console.log(table + row);
                        }
                    });
                    
                }
            });
        }
        else {
            //Code for main
        }
    }
    else {
        alert("Please select values to proceed");
    }
});

$(document).on("click", "#btnSave", function () {
    var ArraySortOrders=[],SortedArray=[];
    $("#tblFormAttributes tbody tr").each(function () {
        ArraySortOrders.push($(this).attr("data-ordernumber"));
    });
    $(ArraySortOrders.sort((a, b) => a - b)).each(function (i) {
        SortedArray.push(ArraySortOrders.sort((a, b) => a - b)[i]);        
    });
    tblToSort = [];
    $("#tblFormAttributes tbody tr").each(function (i) {
        tempOrder = {};
        console.log("ID: " + $(this).attr("data-id") + " SortOrder: " + $(this).attr("data-id"));
        tempOrder["Id"] = $(this).attr("data-id");
        tempOrder["SortOrder"] = SortedArray[i];
        tblToSort.push(tempOrder);
        //tblToSort.push('{"Id":"' + $(this).attr("data-id") + '","SortOrder":"' + SortedArray[i]+'"}');
    });
    $.ajax({
        url: 'ServiceHandler.ashx?CBH=REORDER',
        cache: false,
        async: false,
        data: {
            data: JSON.stringify(tblToSort)
            //data: tblToSort
        },
        success: function (data) {
            console.log(data);
        }
    });

});

function sortNumber(a, b) {
    return a - b;
}