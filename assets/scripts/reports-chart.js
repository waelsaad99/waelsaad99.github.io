$(document).ready(function () {
    if ($('#reports__chart').length) {
        Highcharts.chart('reports__chart', {
            chart: {
                // Edit chart spacing
                spacingBottom: 0,
                spacingTop: 35,
                spacingLeft: 16,
                spacingRight: 20,
                // Explicitly tell the width and height of a chart
                width: null,
                height: null
            },
            yAxis: {
                gridLineColor: '#67859E',
                title: {
                    text: ""
                }
            },
            plotOptions: {
                line: {
                    color: "#fff"
                }
            },
            series: [{
                name: "",
                data: [5, 20, 25, 50, 37, 70, 75, 50, 55, 60, 90]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 767
                    },
                    chartOptions: {
                        chart: {
                            height: 300
                        }
                    }
                }]
            }
        });
    }
})