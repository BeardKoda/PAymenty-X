!(function(o) {
    "use strict";
    var r = function(o) {
            for (var r = []; r.length < o; ) {
                var a =
                    (r.length > 0 ? r[r.length - 1] : 50) +
                    10 * Math.random() -
                    5;
                a < 0 ? (a = 0) : a > 100 && (a = 100),
                    r.push(Math.round(100 * a) / 100);
            }
            return r;
        },
        a = function(o, r) {
            for (var a = [], e = 1; a.length < o; ) a.push(r + " " + e), e++;
            return a;
        };
    o.fn.chart.init = function() {
        o("#chart-line").chart({
            type: "line",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                datasets: [
                    {
                        label: "Sales",
                        data: [8, 5, 13, 35, 13, 9, 20, 12, 8, 10, 12, 8],
                        fill: !0,
                        lineTension: 0.4,
                        backgroundColor: hexToRGB(app.color.primary, 0.2),
                        borderColor: app.color.primary,
                        borderWidth: 2,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0,
                        borderJoinStyle: "miter",
                        pointBorderColor: app.color.primary,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 2,
                        pointHoverRadius: 4,
                        pointHoverBackgroundColor: app.color.primary,
                        pointHoverBorderColor: "#fff",
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 10,
                        spanGaps: !1
                    }
                ]
            },
            options: {}
        }),
            o("#chart-bar").chart({
                type: "bar",
                data: {
                    labels: [
                        "2001",
                        "2002",
                        "2003",
                        "2004",
                        "2005",
                        "2006",
                        "2007"
                    ],
                    datasets: [
                        {
                            label: "Sales",
                            data: [20, 15, 25, 40, 115, 50, 35],
                            fill: !0,
                            backgroundColor: hexToRGB(app.color.warn, 0.4),
                            borderColor: app.color.warn,
                            borderWidth: 2
                        }
                    ]
                },
                options: { stacked: !0 }
            }),
            o("#chart-radar").chart({
                type: "radar",
                data: {
                    labels: ["A", "B", "C", "D", "E", "F", "G"],
                    datasets: [
                        {
                            label: "Sales1",
                            data: [28, 48, 40, 19, 96, 27, 100],
                            fill: !0,
                            lineTension: 0,
                            backgroundColor: hexToRGB(app.color.accent, 0.4),
                            borderColor: app.color.accent,
                            borderWidth: 2,
                            borderJoinStyle: "miter",
                            pointBorderColor: app.color.accent,
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 2,
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: app.color.accent,
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 2,
                            pointRadius: 3
                        },
                        {
                            label: "Sales2",
                            data: [65, 59, 90, 81, 56, 55, 40],
                            backgroundColor: hexToRGB(app.color.warn, 0.4),
                            borderColor: app.color.warn,
                            borderWidth: 2,
                            borderJoinStyle: "miter",
                            pointBorderColor: app.color.warn,
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 2,
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: app.color.warn,
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 2,
                            pointRadius: 3
                        }
                    ]
                },
                options: {
                    scale: {
                        angleLines: {
                            color: "rgba(120,130,140,0.1)",
                            lineWidth: 2
                        }
                    }
                }
            }),
            o("#chart-polar").chart({
                type: "polarArea",
                data: {
                    labels: ["A", "B", "C"],
                    datasets: [
                        {
                            data: [20, 12, 5],
                            borderColor: "transparent",
                            backgroundColor: [
                                app.color.primary,
                                app.color.warn,
                                app.color.accent
                            ],
                            label: "Sales"
                        }
                    ]
                },
                options: {
                    responsive: !0,
                    legend: { position: "right" },
                    scale: {
                        angleLines: {
                            color: "rgba(120,130,140,0.1)",
                            lineWidth: 2
                        }
                    }
                }
            }),
            o("#chart-pie").chart({
                type: "pie",
                data: {
                    labels: ["A", "B"],
                    datasets: [
                        {
                            data: [20, 10],
                            borderColor: "transparent",
                            backgroundColor: [
                                app.color.primary,
                                "rgba(255,255,255,0)"
                            ]
                        },
                        {
                            data: [20, 12],
                            borderColor: "transparent",
                            backgroundColor: [
                                hexToRGB(app.color.primary, 0.6),
                                "rgba(255,255,255,0)"
                            ]
                        },
                        {
                            data: [20, 15],
                            borderColor: "transparent",
                            backgroundColor: [
                                hexToRGB(app.color.primary, 0.4),
                                "rgba(255,255,255,0)"
                            ]
                        },
                        {
                            data: [2, 20],
                            borderColor: "transparent",
                            backgroundColor: [
                                hexToRGB(app.color.primary, 0.2),
                                "rgba(255,255,255,0)"
                            ]
                        }
                    ]
                },
                options: { legend: { labels: { boxWidth: 12 } } }
            }),
            o("#chart-doughnut").chart({
                type: "doughnut",
                data: {
                    labels: ["Search engine", "Social media", "Direct"],
                    datasets: [
                        {
                            data: [20, 5, 75],
                            borderColor: "transparent",
                            backgroundColor: [
                                app.color.primary,
                                hexToRGB(app.color.primary, 0.6),
                                hexToRGB(app.color.primary, 0.2)
                            ],
                            label: "Trafic"
                        }
                    ]
                },
                options: {
                    legend: { position: "left", labels: { boxWidth: 12 } },
                    cutoutPercentage: 75
                }
            }),
            o("#chart-bubble").chart({
                type: "bubble",
                data: {
                    labels: ["A", "B"],
                    datasets: [
                        {
                            data: [
                                { x: 10, y: 30, r: 8 },
                                { x: 20, y: 10, r: 8 },
                                { x: 30, y: 5, r: 5 },
                                { x: 40, y: 40, r: 4 },
                                { x: 50, y: 35, r: 10 },
                                { x: 60, y: 20, r: 8 },
                                { x: 70, y: 30, r: 15 },
                                { x: 80, y: 50, r: 4 }
                            ],
                            backgroundColor: [
                                app.color.primary,
                                app.color.warn,
                                app.color.accent,
                                app.color.primary,
                                app.color.accent,
                                app.color.warn,
                                app.color.primary,
                                app.color.accent
                            ],
                            label: "Sales"
                        }
                    ]
                },
                options: {}
            }),
            o("#chart-line-line").chart({
                type: "bar",
                data: {
                    labels: ["A", "B", "C", "D", "E", "F"],
                    datasets: [
                        {
                            label: "Sales1",
                            type: "line",
                            data: [18, 5, 4, 10, 2, 5, 20],
                            fill: !0,
                            backgroundColor: hexToRGB(app.color.primary, 0.2),
                            borderColor: hexToRGB(app.color.primary, 1),
                            borderWidth: 2,
                            borderJoinStyle: "miter",
                            pointBorderColor: hexToRGB(app.color.primary, 1),
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 2,
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: hexToRGB(
                                app.color.primary,
                                1
                            ),
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 1,
                            pointRadius: 3
                        },
                        {
                            label: "Sales2",
                            type: "line",
                            data: [5, 10, 31, 14, 12, 5, 10],
                            fill: !1,
                            borderDash: [3, 3],
                            backgroundColor: hexToRGB(app.color.accent, 0.2),
                            borderColor: hexToRGB(app.color.accent, 1),
                            borderWidth: 2,
                            borderJoinStyle: "miter",
                            pointBorderColor: "#fff",
                            pointBackgroundColor: hexToRGB(app.color.accent, 1),
                            pointBorderWidth: 2,
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: hexToRGB(
                                app.color.accent,
                                1
                            ),
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 1,
                            pointRadius: 3
                        }
                    ]
                },
                options: {}
            }),
            o("#chart-line-bar").chart({
                type: "bar",
                data: {
                    labels: ["A", "B", "C", "D", "E", "F", "G"],
                    datasets: [
                        {
                            label: "Sales2",
                            type: "bar",
                            data: [5, 10, 31, 14, 12, 5, 10],
                            backgroundColor: hexToRGB(app.color.primary, 0.2),
                            borderColor: hexToRGB(app.color.primary, 1),
                            borderWidth: 2,
                            borderJoinStyle: "miter"
                        },
                        {
                            label: "Sales1",
                            type: "line",
                            data: [0, 6, 3, 10, 2, 3, 0],
                            fill: !0,
                            backgroundColor: hexToRGB(app.color.warn, 0.2),
                            borderColor: hexToRGB(app.color.warn, 1),
                            borderWidth: 2,
                            borderJoinStyle: "miter",
                            pointBorderColor: hexToRGB(app.color.warn, 1),
                            pointBackgroundColor: hexToRGB(app.color.warn, 1),
                            pointBorderWidth: 2,
                            pointRadius: 3
                        }
                    ]
                }
            }),
            o("#chart-doughnut-2").chart({
                type: "doughnut",
                data: {
                    labels: ["Cross sell", "Up sells"],
                    datasets: [
                        {
                            data: [20, 5],
                            borderColor: "transparent",
                            backgroundColor: [
                                app.color.primary,
                                app.color.warn
                            ],
                            label: "Sales"
                        }
                    ]
                },
                options: {
                    legend: { position: "right", labels: { boxWidth: 12 } },
                    cutoutPercentage: 70
                }
            }),
            o("#chart-bar-2").chart({
                type: "bar",
                data: {
                    labels: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12"
                    ],
                    datasets: [
                        {
                            label: "Sales2",
                            type: "bar",
                            data: [
                                15,
                                8,
                                20,
                                14,
                                35,
                                15,
                                10,
                                20,
                                14,
                                18,
                                14,
                                12
                            ],
                            borderColor: "rgba(120,130,140,0.2)",
                            borderWidth: 1,
                            borderJoinStyle: "miter",
                            backgroundColor: [
                                "rgba(120,130,140,0.2)",
                                app.color.primary,
                                "rgba(120,130,140,0.2)",
                                "rgba(120,130,140,0.2)",
                                app.color.warn
                            ]
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{ display: !0 }],
                        yAxes: [{ display: !1 }]
                    },
                    legend: { display: !1 }
                }
            }),
            o("#chart-line-2").chart({
                type: "line",
                data: {
                    labels: ["M", "T", "T", "S", "F", "S", "S"],
                    datasets: [
                        {
                            label: "Sales2",
                            data: [15, 8, 20, 14, 35, 15, 20],
                            fill: !0,
                            backgroundColor: hexToRGB(app.color.primary, 0.1),
                            borderColor: app.color.primary,
                            borderWidth: 2,
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0,
                            borderJoinStyle: "miter",
                            pointBorderColor: app.color.primary,
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 2,
                            pointHoverRadius: 4,
                            pointHoverBackgroundColor: app.color.primary,
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 2,
                            pointRadius: [0, 4, 0, 0, 4, 0, 0],
                            pointHitRadius: 10,
                            spanGaps: !1
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{ display: !0 }],
                        yAxes: [{ display: !1 }]
                    },
                    legend: { display: !1 }
                }
            }),
            o("#chart-line-3").chart({
                type: "line",
                data: {
                    labels: ["M", "T", "T", "S", "F", "S", "S"],
                    datasets: [
                        {
                            label: "Sales2",
                            data: [15, 8, 20, 14, 35, 15, 20],
                            fill: !0,
                            backgroundColor: hexToRGB(app.color.primary, 0.1),
                            borderColor: app.color.primary,
                            borderWidth: 2,
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0,
                            borderJoinStyle: "miter",
                            pointBorderColor: app.color.primary,
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 2,
                            pointHoverRadius: 4,
                            pointHoverBackgroundColor: app.color.primary,
                            pointHoverBorderColor: "#fff",
                            pointHoverBorderWidth: 2,
                            pointRadius: [0, 4, 0, 0, 4, 0, 0],
                            pointHitRadius: 10,
                            spanGaps: !1
                        }
                    ]
                }
            }),
            o("#chart-doughnut-3").chart({
                type: "doughnut",
                data: {
                    labels: [
                        "Nature",
                        "Nature",
                        "Food and Drink",
                        "Model Released",
                        "Animals/Wildlife",
                        "Abstract"
                    ],
                    datasets: [
                        {
                            data: [20, 5, 15, 10, 15, 20],
                            borderColor: "transparent",
                            backgroundColor: [
                                app.color.primary,
                                hexToRGB(app.color.primary, 0.6),
                                hexToRGB(app.color.primary, 0.2)
                            ],
                            label: "Trafic"
                        }
                    ]
                },
                options: {
                    legend: {
                        position: "right",
                        labels: { boxWidth: 2, usePointStyle: !0 }
                    },
                    cutoutPercentage: 75
                }
            }),
            o("#chart-line-4").chart({
                type: "line",
                data: {
                    labels: a(60, ""),
                    datasets: [
                        {
                            label: "Dataset",
                            data: r(60),
                            fill: !0,
                            backgroundColor: hexToRGB(app.color.warn, 0.15),
                            pointRadius: 0,
                            pointBackgroundColor: "#fff",
                            tension: 0.3,
                            borderColor: app.color.warn,
                            borderWidth: 2.5
                        }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{ display: !1 }],
                        yAxes: [{ display: !0 }]
                    },
                    legend: { display: !1 }
                }
            });
    };
})(jQuery);
