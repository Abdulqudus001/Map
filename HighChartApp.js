var link = new Vue({
    el: "#app",
    data: {
            url: [
                'hello',
                'wtup'
            ],
            myURL: "",
            format: ""
    },
    methods: {
        addUrl(){
            this.url.push(this.myURL)
            if(this.format=="csv"){
                Highcharts.chart('container', {
                chart: {
                    scrollablePlotArea: {
                        minWidth: 700
                    }
                },

                data: {
                    //csvURL: 'https://rawgit.com/Abdulqudus001/Map/master/analytics.csv',
                    csvURL: link.myURL,
                    beforeParse: function (csv) {
                        return csv.replace(/\n\n/g, '\n');
                    }
                    
                },

                title: {
                    text: 'Daily sessions at www.highcharts.com'
                },

                subtitle: {
                    text: 'Source: Google Analytics'
                },

                credits: {
                    enable: false
                },

                xAxis: {
                    tickInterval: 7 * 24 * 3600 * 1000, // one week
                    tickWidth: 0,
                    gridLineWidth: 1,
                    labels: {
                        align: 'left',
                        x: 3,
                        y: -3
                    }
                },

                yAxis: [{ // left y axis
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'left',
                        x: 3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }, { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        x: -3,
                        y: 16,
                        format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                }],

                legend: {
                    align: 'left',
                    verticalAlign: 'top',
                    borderWidth: 0
                },

                tooltip: {
                    shared: true,
                    crosshairs: true
                },

                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        dashStyle: "Dot",
                        point: {
                            events: {
                                click: function (e) {
                                    hs.htmlExpand(null, {
                                        pageOrigin: {
                                            x: e.pageX || e.clientX,
                                            y: e.pageY || e.clientY
                                        },
                                        headingText: this.series.name + " in " + e.point.month,
                                        maincontentText:this.y + ' people',
                                        width: 200
                                    });
                                }
                            }
                        },
                        marker: {
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: 'All sessions',
                    month: "Month",
                    lineWidth: 4,
                    marker: {
                        radius: 4
                    }
                }, {
                    name: 'New users'
                }]
                });   
            }
            else{
                $.getJSON(link.myURL, function(data) {
                    console.log(data)
                      function DownloadJSON2CSV(objArray)
                        {
                            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

                            var str = '';

                            for (var i = 0; i < array.length; i++) {
                                var line = '';

                                for (var index in array[i]) {
                                    line += array[i][index] + ',';
                                }

                                // Here is an example where you would wrap the values in double quotes
                                // for (var index in array[i]) {
                                //    line += '"' + array[i][index] + '",';
                                // }

                                line.slice(0,line.Length-1); 

                                str += line + '\r\n';
                            }
                            return str
                            //window.open( "data:text/csv;charset=utf-8," + escape(str))
                        }
                    //exports(DownloadJSON2CSV) 
                    var data = DownloadJSON2CSV(data)
                    console.log(data)
                    Highcharts.chart('container', {
                        data:{
                            csv: data
                        },
                        chart: {
                            scrollablePlotArea: {
                            minWidth: 700
                            }   
                        },

                        title: {
                            text: 'Daily sessions at www.highcharts.com'
                        },

                        subtitle: {
                            text: 'Source: Google Analytics'
                        },

                        credits: {
                            enabled: false
                        },

                        xAxis: {
                            //tickInterval: 7 * 24 * 3600 * 1000, // one week
                            // tickWidth: 0,
                            gridLineWidth: 1,
                            labels: {
                                align: 'right',
                                x: 16,
                                y: -3,
                                format: '{value}'
                            }
                        },

                        yAxis: [{ // left y axis
                            title: {
                                text: null
                            },
                            labels: {
                                align: 'left',
                                x: 3,
                                y: 16,
                                format: '{value:.,0f}'
                            },
                            showFirstLabel: false
                        }, { // right y axis
                            linkedTo: 0,
                            gridLineWidth: 0,
                            opposite: true,
                            title: {
                                text: null
                            },
                            labels: {
                                align: 'right',
                                x: -3,
                                y: 16,
                                format: '{value:.,0f}'
                            },
                            showFirstLabel: false
                        }],

                        legend: {
                            align: 'left',
                            verticalAlign: 'top',
                            borderWidth: 0
                        },

                        tooltip: {
                            shared: true,
                            crosshairs: true
                        },

                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                dashStyle: "LongDot",
                                point: {
                                    events: {
                                        click: function (e) {
                                            hs.htmlExpand(null, {
                                                pageOrigin: {
                                                    x: e.pageX || e.clientX,
                                                    y: e.pageY || e.clientY
                                                },
                                                headingText: this.series.name,
                                                maincontentText:this.y + ' people',
                                                width: 200
                                            });
                                        }
                                    }
                                },
                                marker: {
                                    lineWidth: 1
                                }
                            }
                        },
                        series: [{
                            name: 'All sessions',
                            lineWidth: 4,
                            marker: {
                                radius: 4
                            }
                        }, {
                            name: 'New users'
                        }]
                    });

                });
            }
        }
    }
});
//export {DownloadJSON2CSV}