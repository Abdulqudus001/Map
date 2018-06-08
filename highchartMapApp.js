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
            text: "",
            category: "",
            year: ""
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
                        var plot = csvJSON1(data);
                        if(link.category !=="" && link.year !== ""){
                            var states = []
                            var val = []
                            var test = $.grep(plot,function(n){
                                return n.Period==link.year
                            })

                            var test1 = $.grep(test,function(m){
                                return m.State!=="National"
                            })
                            var test2 = $.grep(test1,function(m){
                                return m.State!=="North-Central"
                            })
                            var test3 = $.grep(test2,function(m){
                                return m.State!=="North-West"
                            })
                            var test4 = $.grep(test3,function(m){
                                return m.State!=="North-East"
                            })
                            var test5 = $.grep(test4,function(m){
                                return m.State!=="South-West"
                            })
                            var test6 = $.grep(test5,function(m){
                                return m.State!=="South-South"
                            })
                            var test7 = $.grep(test6,function(m){
                                return m.State!=="South-East"
                            })

                            x = link.category
                            var value = "value",
                            state = "state"
                            test7.forEach(function(element){
                                val.push(element[x])
                                states.push(element.State)
                            })
                            
                            var set=[]

                            for(i=0;i<val.length;i++){
                                states[14]="Federal Capital Territory"
                                states[25]="Nassarawa"
                                var newSet = {
                                    "State": states[i],
                                    "value": val[i]
                                }
                                set.push(newSet)
                            }
                            console.log(set)

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
                                    data: set,
                                    value: "Population",
                                    joinBy: ['name', 'State'],
                                    name: link.category+ " in the year " + link.year,
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
                        }
                        
                    }
                });
            }
            else{
                $.getJSON(link.myURL, function(data) {
                    var plot = data;
                    if(link.category !=="" && link.year !== ""){
                            var states = []
                            var val = []
                            var test = $.grep(plot,function(n){
                                return n.Period==link.year
                            })

                            var test1 = $.grep(test,function(m){
                                return m.State!=="National"
                            })
                            var test2 = $.grep(test1,function(m){
                                return m.State!=="North-Central"
                            })
                            var test3 = $.grep(test2,function(m){
                                return m.State!=="North-West"
                            })
                            var test4 = $.grep(test3,function(m){
                                return m.State!=="North-East"
                            })
                            var test5 = $.grep(test4,function(m){
                                return m.State!=="South-West"
                            })
                            var test6 = $.grep(test5,function(m){
                                return m.State!=="South-South"
                            })
                            var test7 = $.grep(test6,function(m){
                                return m.State!=="South-East"
                            })

                            x = link.category
                            var value = "value",
                            state = "state"
                            test7.forEach(function(element){
                                val.push(element[x])
                                states.push(element.State)
                            })
                            
                            var set=[]

                            for(i=0;i<val.length;i++){
                                states[14]="Federal Capital Territory"
                                states[25]="Nassarawa"
                                var newSet = {
                                    "State": states[i],
                                    "value": val[i]
                                }
                                set.push(newSet)
                            }
                            console.log(set)

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
                            data: set,
                            value: "Population",
                            joinBy: ['name', 'State'],
                            name: link.category+ " in the year " + link.year,
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
                    }
                
                })
            }
        }
    }
})