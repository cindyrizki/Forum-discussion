$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44312/API/Users/Views",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];

            $.each(result, function (key, val) {
                series.push(val.views);
                label.push(val.title);
            })
            var options = {
                series: [{
                    name: "Count ",
                    data: series
                }],
                chart: {
                    height: 230,
                    foreColor: "#ccc",
                    type: "area",
                    stacked: true,
                    toolbar: {
                        autoSelected: "pan",
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 5,
                    colors: ["#000524"],
                    strokeColor: "#00BAEC",
                    strokeWidth: 3
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        enabled: true,
                        opacityFrom: 0.55,
                        opacityTo: 0
                    }
                },
                yaxis: {
                    title: {
                        text: 'Views',
                        align: 'Center'
                    },
                },
                xaxis: {
                    title: {
                        text: 'Title',
                        align: 'Center'
                    },
                    categories: label
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " Views"
                        }
                    }
                }
            };
            var chart = new ApexCharts(document.querySelector("#chartViews"), options);
            chart.render();
        }
    })
});

$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44312/API/Users/Replies",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];

            $.each(result, function (key, val) {
                series.push(val.value);
                label.push(val.disId);
            })
            var options = {
                series: [{
                    name: "Count ",
                    data: series
                }],
                chart: {
                    height: 280,
                    type: "area",
                    stacked: true
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 5,
                    colors: ["#000524"],
                    strokeColor: "#00BAEC",
                    strokeWidth: 3
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100]
                    }
                },
                yaxis: {
                    title: {
                        text: 'Comment',
                        align: 'Center'
                    },
                },
                xaxis: {
                    title: {
                        text: 'Discussion ID',
                        align: 'Center'
                    },
                    categories: label
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " Comments"
                        }
                    }
                }
            };
            var chart = new ApexCharts(document.querySelector("#chartReplies"), options);
            chart.render();
        }
    })
});

//ApexChart Jumlah Post Diskusi yang dibuat oleh Member
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44312/API/Users/UserDis",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];

            $.each(result, function (key, val) {
                series.push(val.value);
                label.push(val.userId);
            })

            var options = {
                series: [{
                    name: "Count ",
                    data: series
                }],
                chart: {
                    height: 300,
                    type: 'bar',
                    stacked: true
                },
                dataLabels: {
                    enabled: false
                },
                yaxis: {
                    title: {
                        text: 'Post Discussion',
                        align: 'Center'
                    },
                },
                xaxis: {
                    title: {
                        text: 'Member ID',
                        align: 'Center'
                    },
                    categories: label
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " Post"
                        }
                    }
                }
            }
            var chart = new ApexCharts(document.querySelector("#chartUserDis"), options);
            chart.render();
        }
    })
});

//ApexChart Jumlah Kategori yang dipilih di Post Diskusi
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44312/API/Users/CatDis",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];

            $.each(result, function (key, val) {
                series.push(val.value);
                label.push(val.categoryName);
            });
            var options = {
                chart: {
                    type: 'pie'
                },
                series: series,
                labels: label
            }
            var chart = new ApexCharts(document.querySelector("#chartCatDis"), options);
            chart.render();
        }
    });
});

//ApexChart Gender
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44312/API/Users/Gender",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];
            $.each(result, function (key, val) {
                series.push(val.value);
                if (val.gender == 0) {
                    label.push("Male");
                } else {
                    label.push("Female");
                }
            });
            var options = {
                chart: {
                    type: 'donut'
                },
                series: series,
                labels: label,
            }
            var chart = new ApexCharts(document.querySelector("#chartGender"), options);
            chart.render();
        }
    });
});