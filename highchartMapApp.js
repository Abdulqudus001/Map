var link = new Vue({
    el: "#app",
    data: {
            url: [
                'hello',
                'wtup'
            ],
            myURL: "",
            format: "",
            checkFormat: "",
            text: ""
    },
    methods: {
        check(){
            if(this.format==""){
                this.text = "Please fill all required fields"
                var start = new Date().getTime();
                    for (var i = 0; i < 1e7; i++) {
                        if ((new Date().getTime() - start) > 1000){
                        break;
                        }
                    }
                this.text = ""
            }
            else{
                this.text = ""
            }
        },

        checkUrl(){
            var x = this.myURL.substring((link.myURL.length-4),(link.myURL.length))
            //var y = this.myURL.substring((link.myURL.length-4),(link.myURL.length))
            if(x.substring(x.length-3, x.length)=='csv')
                this.checkFormat='csv'
            else
                this.checkFormat=x
        },
        addUrl(){
            if(this.myURL=="" || this.format==""){
                this.text="Please fill all required fields"
            }
            else if(this.format=="csv"){
                function csvJSON1(csv){

                    var lines=csv.split('\r');
                    for(let i = 0; i<lines.length-1; i++){
                        lines[i] = lines[i].replace(/\s/,'')//delete all blanks
                    }

                    var result = [];

                    var headers=lines[0].split(",");

                    for(var i=1;i<lines.length-1;i++){

                        var obj = {};
                        var currentline=lines[i].split(",");
                        for(var j=0;j<headers.length;j++){
                            obj[headers[j].toString()] = currentline[j];
                        }
                        result.push(obj);
                    }
                    return result; //JavaScript object
                    //return JSON.stringify(result); //JSON
                }
                $.ajax({
                    type: "GET",
                    url: link.myURL,
                    dataType: "text",
                    success: function(data) {
                        console.log(csvJSON1(data))
                        Highcharts.mapChart('contain', {
                            chart: {
                                map: 'countries/ng/ng-all'
                            },

                            credits: {
                                enabled: false
                            },

                            title: {
                                text: 'Map of Nigeria showing population growth'
                            },

                            subtitle: {
                                text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/ng/ng-all.js">Nigeria</a>'
                            },

                            mapNavigation: {
                                enabled: true,
                                buttonOptions: {
                                    verticalAlign: 'bottom'
                                }
                            },

                            colorAxis: {
                                //min: 0
                                min: 1,
                                max: 100,
                                //type: 'logarithmic',
                                minColor: '#efecf3',
                                maxColor: '#990041'
                            },

                            series: [{
                                data: csvJSON1(data),
                                joinBy: ['hc-key',"State"],
                                name: 'Population',
                                states: {
                                    hover: {
                                        color: '#fff'
                                    }
                                },
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            }]
                        }); 
                        //processData(data);
                    }
                });
            }
            else{
                $.getJSON(link.myURL, function(data) {
                        //var data = DownloadJSON2CSV(data)
                        for(var i=0;i<data.length;i++)
                            console.log(data[i].value)
                Highcharts.mapChart('contain', {
                    chart: {
                        map: 'countries/ng/ng-all'
                    },

                    credits: {
                        enabled: false
                    },

                    title: {
                        text: 'Map of Nigeria showing population growth'
                    },

                    subtitle: {
                        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/ng/ng-all.js">Nigeria</a>'
                    },

                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },

                    colorAxis: {
                        min: 1,
                        max: 100,
                        //type: 'logarithmic',
                        minColor: '#efecf3',
                        maxColor: '#990041'
                    },

                    series: [{
                        data: data,
                        value: "Population",
                        joinBy: ['hc-key', 'State'],
                        name: 'Population',
                        states: {
                            hover: {
                                color: '#fff'
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }]
                });
                })
            }
        }
    }
})