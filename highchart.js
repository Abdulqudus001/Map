// var data = [
//     ['ng-ri', 12345],
//     ['ng-kt', 12445],
//     ['ng-so', 23455],
//     ['ng-za', 39876],
//     ['ng-yo', 47564],
//     ['ng-ke', 52345],
//     ['ng-ad', 62343],
//     ['ng-bo', 79876],
//     ['ng-ak', 83456],
//     ['ng-ab', 98776],
//     ['ng-im', 10567],
//     ['ng-by', 11898],
//     ['ng-be', 12898],
//     ['ng-cr', 13344],
//     ['ng-ta', 14455],
//     ['ng-kw', 15234],
//     ['ng-la', 16345],
//     ['ng-ni', 17566],
//     ['ng-fc', 18234],
//     ['ng-og', 19111],
//     ['ng-on', 20123],
//     ['ng-ek', 21123],
//     ['ng-os', 22123],
//     ['ng-oy', 23345],
//     ['ng-an', 24345],
//     ['ng-ba', 25564],
//     ['ng-go', 26123],
//     ['ng-de', 27432],
//     ['ng-ed', 28235],
//     ['ng-en', 29145],
//     ['ng-eb', 30467],
//     ['ng-kd', 31987],
//     ['ng-ko', 32678],
//     ['ng-pl', 33974],
//     ['ng-na', 34347],
//     ['ng-ji', 35790],
//     ['ng-kn', 36126]
// ];

var link = new Vue({
    el: "#app",
    data: {
            url: [
                'hello',
                'wtup'
            ],
            myURL: ""
    },
    methods: {
        addUrl(){
            this.url.push(this.myURL)
            Highcharts.mapChart('container', {
                chart: {
                    map: 'countries/ng/ng-all'
                },

                data: {
                     csvURL: link.myURL
                        beforeParse: function (csv) {
                            return csv.replace(/\n\n/g, '\n');
                        }
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
                    min: 0
                },

                series: [{
                    //data: data,
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
        }
    }
