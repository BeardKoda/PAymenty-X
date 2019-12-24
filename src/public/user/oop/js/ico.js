(function($) {
    "use strict";

    // single bar chart
    var ctx = document.getElementById("singelBarChart");
    ctx.height = 100;
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Aug 2017", "Sep 2017", "Oct 2017", "Nov 2017", "Dec 2017", "Jan 2018", "Feb 2018"],
            datasets: [{
                label: "My First dataset",
                data: [40, 55, 75, 81, 56, 55, 40],
                borderColor: "#8EC8BC",
                borderWidth: "0",
                backgroundColor: "#8EC8BC"
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: !1
                    }
                }],
                xAxes: [{
                    // Change here
                    barPercentage: 0.2,
                    gridLines: {
                        display: !1
                    }
                }]
            },
            legend: {
                display: false,


            },
        }
    });


    //doughut chart
    var ctx = document.getElementById("doughutChart1");
    ctx.height = 100;
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [45, 25, 20],
                backgroundColor: [
                    "#F6931A",
                    "#1276A8",
                    "#B0B0B0",
                ],
                hoverBackgroundColor: [
                    "rgba(55,160,0,0.9)",
                    "rgba(55,160,0,0.7)",
                    "rgba(55,160,0,0.5)",
                ],

            }],
            labels: [
                "green",
                "green",
                "green",
            ],
        },
        options: {
            responsive: true,
            legend: {
                display: false,


            },
        },
    });


})(jQuery);