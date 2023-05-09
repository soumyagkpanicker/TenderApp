var ArrayOfCheckedLEvels = [], dataOfParents = [];
var checkClicked = 0, chart;
var ArrayOfItemsClicked = ["Tenders"];
var chartFinalData = [{
    "id": "0",
    "name": "Tenders",
    "color": "#276FBF"
}];
//function getRandomColor() {
//    var letters = 'BCDEF'.split('');
//    var color = '#cc';
//    for (var i = 0; i < 4; i++) {
//        color += letters[Math.floor(Math.random() * letters.length)];
//    }
//    return color;
//}
//function getRandomColor() {
//    var letters = '0123456789ABCDEF';
//    var color = '#';
//    for (var i = 0; i < 6; i++) {
//        color += letters[Math.floor(Math.random() * 16)];
//    }
//    return color;
//}
//function getRandomColor() {
//    var max = 150;
//    var min = 100;
//    var green = Math.floor(Math.random() * (max - min + 1)) + min;
//    return "rgb(0,0,"+green+")";
//}
$jq1(document).on("change", ".other-options li .filter-checkbox", function () {
    ArrayOfItemsClicked = ["Tenders"];
    dataOfParents = [];
    var chartFinalData = [{
        "id": "0",
        "name": "Tenders",
        "color": "#276FBF"
    }];
    $elem = $jq1(this);
    if ($jq1(this).prop("checked")) {
        var arrayItem = {};
        checkClicked++;
        arrayItem["FilterType"] = $jq1(this).parents("li").data("columnname");
        arrayItem["FilterId"] = $jq1(this).parents("li").data("id");

        //Setting the array to filter
        ArrayOfCheckedLEvels.push(arrayItem);

        var cdata = false;
        if (ArrayOfCheckedLEvels.length > 1) {
            cdata = true;
            $jq1.each(ArrayOfCheckedLEvels, function (j) {
                console.log("FilterId: " + ArrayOfCheckedLEvels[j].FilterId);
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETDISTINCTCOLUMNVALUES',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: { ColumnValues: ArrayOfCheckedLEvels[j].FilterType },
                    success: function (data) {
                        $jq1.each(data, function (i) {

                            //if (!ArrayOfCheckedLEvels[j].FilterType in dataOfParents) {
                            var data1 = {};
                            data1["ParameterName"] = ArrayOfCheckedLEvels[j].FilterType;
                            data1["ParameterValue"] = data[i].ParameterValue.toString();
                            data1["FilterId"] = ArrayOfCheckedLEvels[j].FilterId;
                            data1["SeriesNumber"] = j;
                            //Data of the parents for where condition
                            dataOfParents.push(data1);
                            //}

                        });
                        $jq1.each(dataOfParents, function (i) {

                        });
                        console.log(dataOfParents);
                    }
                });
            });
        }

        // Getting the filtered data as per the condition
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=FILTERTENDERDATA',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                CheckExistingData: cdata,
                FilterSeries: JSON.stringify(ArrayOfCheckedLEvels),
                ExistingChartData: JSON.stringify(dataOfParents)
            },
            success: function (data) {

                //var jsonData = $jq1.parse(data);
                $jq1.each(data, function (i) {
                    var chartData = {}
                    chartData["id"] = data[i].Id;
                    chartData["name"] = data[i].Name;
                    chartData["value"] = data[i].Value;
                    chartData["parent"] = data[i].Parent;
                    //chartData["color"] = getRandomColor();
                    chartFinalData.push(chartData);
                });

                // Splice in transparent for the center circle
                Highcharts.getOptions().colors.splice(0, 0, 'transparent');
                //Highcharts.getOptions().colors.splice(0, 0, '#d5d5d5');
                chart = new Highcharts.chart('container', {

                    chart: {
                        height: '500',
                        margin: [0, 0, 0, 0]
                    },

                    credits: false,
                    exporting: { enabled: false },
                    title: {
                        text: ''
                    },
                    series: [{
                        type: "sunburst",
                        data: chartFinalData,
                        allowDrillToNode: true,
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function (event) {
                                    var name = this.name;
                                    var flag = false, index = 0;
                                    $jq1(ArrayOfItemsClicked).each(function (k, v) {
                                        if (k < ArrayOfItemsClicked.length) {
                                            console.log($jq1.trim(v) == $jq1.trim(name));
                                            if ($jq1.trim(v) == $jq1.trim(name)) {
                                                if ($jq1.trim(name) != "Tenders")
                                                    ArrayOfItemsClicked.splice(k, 1);
                                                index = k;
                                            }

                                        }

                                    });
                                    if (index == 0)
                                        ArrayOfItemsClicked.push(name);
                                    console.log(ArrayOfItemsClicked);
                                }
                            }
                        },

                        dataLabels: {
                            enabled: true,
                            alignTo: 'connectors',
                            format: '{point.name}' + '<br/>{point.value}',
                            style: {
                                textOverflow: "string"
                            },
                            connectorShape: 'crookedLine',
                            crookDistance: '70%',
                            filter: {
                                property: 'innerArcLength',
                                operator: '>',
                                value: 16
                            }
                        },
                        levels: [{
                            level: 1,
                            levelIsConstant: false,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            },
                            dataLabels: {
                                filter: {
                                    property: 'outerArcLength',
                                    operator: '>',
                                    value: 64
                                }
                            }
                        }, {
                            level: 2,
                            colorByPoint: false,
                            levelSize: {
                                unit: 'pixels',
                                value: 70
                            }, colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }

                        },
                        {
                            level: 3,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }

                        }, {
                            level: 4,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }
                        }, {
                            level: 5,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }
                        }, {
                            level: 6,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }
                        }]

                    }],
                    tooltip: {
                        headerFormat: "",
                        pointFormat: 'There are <b>{point.value}</b> tenders for <b>{point.name}</b>'
                    }
                });

                $jq1(".filter-options").removeClass("active");
            }
        });
    }
    else {
        $jq1.each(ArrayOfCheckedLEvels, function (i) {
            if (i < ArrayOfCheckedLEvels.length) {
                if (ArrayOfCheckedLEvels[i].FilterId == $elem.parents("li").data("id")) {
                    ArrayOfCheckedLEvels.splice(i, 1);
                }
            }

        });

        var cdata = false;
        if (ArrayOfCheckedLEvels.length > 1) {
            cdata = true;
            $jq1.each(ArrayOfCheckedLEvels, function (j) {
                console.log("FilterId: " + ArrayOfCheckedLEvels[j].FilterId);
                $jq1.ajax({
                    url: 'ServiceHandler.ashx?CBH=GETDISTINCTCOLUMNVALUES',
                    type: 'POST',
                    async: false,
                    dataType: 'json',
                    data: { ColumnValues: ArrayOfCheckedLEvels[j].FilterType },
                    success: function (data) {
                        $jq1.each(data, function (i) {
                            var data1 = {};
                            data1["ParameterName"] = ArrayOfCheckedLEvels[j].FilterType;
                            data1["ParameterValue"] = data[i].ParameterValue.toString();
                            data1["FilterId"] = ArrayOfCheckedLEvels[j].FilterId;
                            data1["SeriesNumber"] = j;
                            //Data of the parents for where condition
                            dataOfParents.push(data1);
                        });
                        $jq1.each(dataOfParents, function (i) {

                        });
                        console.log(dataOfParents);
                    }
                });
            });
        }

        // Getting the filtered data as per the condition
        $jq1.ajax({
            url: 'ServiceHandler.ashx?CBH=FILTERTENDERDATA',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                CheckExistingData: cdata,
                FilterSeries: JSON.stringify(ArrayOfCheckedLEvels),
                ExistingChartData: JSON.stringify(dataOfParents)
            },
            success: function (data) {
                //var jsonData = $jq1.parse(data);
                $jq1.each(data, function (i) {
                    var chartData = {}
                    chartData["id"] = data[i].Id;
                    chartData["name"] = data[i].Name;
                    chartData["value"] = data[i].Value;
                    chartData["parent"] = data[i].Parent;
                    //chartData["color"] = getRandomColor();
                    chartFinalData.push(chartData);
                });
                // Splice in transparent for the center circle
                Highcharts.getOptions().colors.splice(0, 0, 'transparent');
                //Highcharts.getOptions().colors.splice(0, 0, '#d5d5d5');
                chart = new Highcharts.chart('container', {

                    chart: {
                        height: '500',
                        margin: [0, 0, 0, 0]
                    },

                    credits: false,
                    exporting: { enabled: false },
                    title: {
                        text: ''
                    },
                    series: [{
                        type: "sunburst",
                        data: chartFinalData,
                        allowDrillToNode: true,
                        point: {
                            events: {
                                click: function (event) {
                                    var name = this.name;
                                    var flag = false, index = 0;
                                    $jq1(ArrayOfItemsClicked).each(function (k, v) {
                                        var name = this.name;
                                        var flag = false, index = 0;
                                        $jq1(ArrayOfItemsClicked).each(function (k, v) {
                                            if (k < ArrayOfItemsClicked.length) {
                                                console.log($jq1.trim(v) == $jq1.trim(name));
                                                if ($jq1.trim(v) == $jq1.trim(name)) {
                                                    if ($jq1.trim(name) != "Tenders") {
                                                        ArrayOfItemsClicked.splice(k, 1);
                                                        index = k;
                                                    }

                                                }

                                            }

                                        });
                                        if (index != 0)
                                            ArrayOfItemsClicked.push(name);
                                        console.log(ArrayOfItemsClicked);

                                    });
                                    console.log(ArrayOfItemsClicked);
                                }
                            }
                        },
                        cursor: 'pointer',
                        dataLabels: {
                            format: '{point.name}' + '<br/>{point.value}',
                            alignTo: 'connectors',
                            style: {
                                textOverflow: "string"
                            },
                            connectorShape: 'crookedLine',
                            crookDistance: '70%',
                            filter: {
                                property: 'innerArcLength',
                                operator: '>',
                                value: 16
                            }
                        },
                        levels: [{
                            level: 1,
                            levelIsConstant: false,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            dataLabels: {
                                filter: {
                                    property: 'outerArcLength',
                                    operator: '>',
                                    value: 64
                                }
                            }
                        }, {
                            level: 2,
                            colorByPoint: false,
                            levelSize: {
                                unit: 'pixels',
                                value: 70
                            }

                        },
                        {
                            level: 3,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }

                        }, {
                            level: 4,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            }, colorVariation: {
                                key: 'brightness',
                                to: 0.5
                            }
                        }, {
                            level: 5,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5
                            }
                        }, {
                            level: 6,
                            levelSize: {
                                unit: 'pixels',
                                value: 50
                            },
                            colorVariation: {
                                key: 'brightness',
                                to: 0.5
                            }
                        }]

                    }],
                    tooltip: {
                        headerFormat: "",
                        pointFormat: 'There are <b>{point.value}</b> tenders for <b>{point.name}</b>'
                    }
                });

                $jq1(".filter-options").removeClass("active");
            }
        });
    }



});


$jq1(document).ready(function () {
    ArrayOfCheckedLEvels = [];

    //DrawSunburstChart();
});

//$jq1(document).ready(function () {
//    var data = [{
//        'id': '0',
//        'parent': '',
//        'name': 'Tenders'
//    }, {
//        'id': '1',
//        'parent': '0',
//        'name': 'Budget',
//        'value': 22
//    }, {
//        'id': '2',
//        'parent': '0',
//        'name': 'Firm',
//        'value': 2
//    }, {
//        'id': '3',
//        'parent': '1',
//        'name': 'US',
//        'value': 10
//    },
//    {
//        'id': '4',
//        'parent': '2',
//        'name': 'Europe',
//        'value': 1
//    }, {
//        'id': '5',
//        'parent': '3',
//        'name': 'InProgress',
//        'value': 5
//    }];
//    Highcharts.getOptions().colors.splice(0, 0, '#d5d5d5');
//    chart = new Highcharts.chart('container', {

//        chart: {
//            height: '400'
//        },
//        credits: false,
//        exporting: { enabled: false },
//        title: {
//            text: 'Tenders'
//        },
//        series: [{
//            type: "sunburst",
//            data: data,
//            allowDrillToNode: true,
//            cursor: 'pointer',
//            dataLabels: {
//                format: '{point.name}',
//                filter: {
//                    property: 'innerArcLength',
//                    operator: '>',
//                    value: 16
//                }
//            },
//            levels: [{
//                level: 1,
//                levelIsConstant: false,
//                dataLabels: {
//                    filter: {
//                        property: 'outerArcLength',
//                        operator: '>',
//                        value: 64
//                    }
//                }
//            }, {
//                level: 2,
//                colorByPoint: false

//            },
//            {
//                level: 3

//            }, {
//                level: 4
//            }]

//        }],
//        tooltip: {
//            headerFormat: "",
//            pointFormat: 'There are <b>{point.value}</b> tenders for <b>{point.name}</b>'
//        }
//    });

//});


//$jq1(document).on("change",".other-options li .filter-checkbox",function(){
//$jq1(".filter-options").removeClass("active");
//var elem = $jq1(this);
//if(checkClicked>1){
//chart.destroy();}
//    var filterArray = [];
//    $jq1(".other-options li .filter-checkbox").each(function () {
//        var chbxElem = $jq1(this);
//        if (chbxElem.prop("checked")) {
//            filterArray.push(chbxElem.parents("li").data("id"));
//        }
//    });

//    $jq1.each(filterArray, function (i) {
//        console.log(filterArray[i]);
//    });
//    //console.log(filterArray);

//if (elem.prop("checked") == true) {
//    checkClicked++;

//var dataId = elem.parents("li").data("id");
//var filterData = [];
//var filteredData = {};
//    filteredData["id"] = "0.0";
//    filteredData["parent"] = "";
//    filteredData["name"] = "Tenders";
//    filteredData["color"] = "#fff";
//    filterData.push(filteredData);

//if(dataId == '1')
//{
//    $jq1.ajax({
//        url: 'ServiceHandler.ashx?CBH=FILTERTENDERDATA',
//        cache: false,
//        type:'POST',
//        async: false,
//        data: {
//            FilterType: dataId,
//        },
//        dataType: 'json',
//        success: function (data) {
//            $jq1.each(data, function (i) {
//                var filteredData = {};
//                filteredData["id"] = i + "." + (i+1);
//                filteredData["parent"] = "0.0";
//                filteredData["name"] = data[i].ParameterName;
//                filteredData["value"] = data[i].ParameterValue;
//                filterData.push(filteredData);
//            });
//            if (checkClicked > 1) {
//                chart.destroy();
//            }
//            CreateSunburstChart(filterData); 
//        },
//        error: function (data) {
//            $jq1(".error-message-wrapper").removeClass("active");
//        }
//    });
//}
//if(dataId == '2')
//{

//    $jq1.ajax({
//        url: 'ServiceHandler.ashx?CBH=FILTERTENDERDATA',
//        cache: false,
//        type: 'POST',
//        async: false,
//        data: {
//            FilterType: dataId,
//        },
//        dataType: 'json',
//        success: function (data) {
//            $jq1.each(data, function (i) {
//                var filteredData = {};
//                filteredData["id"] = i + "." + (i + 1);
//                filteredData["parent"] = "1.1";
//                filteredData["name"] = data[i].ParameterName;
//                filteredData["color"] = "#25" + i + "1B2"; 
//                filteredData["value"] = data[i].ParameterValue;
//                filterData.push(filteredData);
//            });
//            if (checkClicked > 1) {
//                chart.destroy();
//            }
//            CreateSunburstChart(filterData);
//        },
//        error: function (data) {
//            $jq1(".error-message-wrapper").removeClass("active");
//        }
//    });
////CreateSunburstChart(data); 
//}
//}
//else{

//}
//});

//function CreateSunburstChart(data){

//// Splice in transparent for the center circle
//Highcharts.getOptions().colors.splice(0, 0, '#d5d5d5');
//chart = new Highcharts.chart('container', {

//    chart: {
//        height: '400'
//    },
//credits: false,
//exporting: { enabled: false },
//    title: {
//        text: 'Tenders'
//    },
//    series: [{
//        type: "sunburst",
//        data: data,
//        allowDrillToNode: true,
//        cursor: 'pointer',
//        dataLabels: {
//            format: '{point.name}',
//            filter: {
//                property: 'innerArcLength',
//                operator: '>',
//                value: 16
//            }
//        },
//        levels: [{
//            level: 1,
//            levelIsConstant: false,
//            dataLabels: {
//                filter: {
//                    property: 'outerArcLength',
//                    operator: '>',
//                    value: 64
//                }
//            }
//        }, {
//            level: 2,
//            colorByPoint: false

//        },
//        {
//            level: 3

//        }, {
//            level: 4
//        }]

//    }],
//    tooltip: {
//        headerFormat: "",
//        pointFormat: 'There are <b>{point.value}</b> tenders for <b>{point.name}</b>'
//    }
//});

//var H = Highcharts;

//H.seriesTypes.sunburst.prototype.pointClass.prototype.setVisible = H.seriesTypes.pie.prototype.pointClass.prototype.setVisible

//H.addEvent(H.Legend, 'afterGetAllItems', function (e) {
//    e.allItems.splice(1, 1);
//    e.allItems.splice(2, 1);
//});

//}