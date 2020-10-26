const pointColor = "rgb(200, 200, 255)";

exports.defaultChartOptions = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Blood Glucose Level',
            pointBackgroundColor: pointColor,
            pointBorderColor: pointColor,
            borderColor: 'rgb(0, 0, 255)',
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            fontColor: '#fff',
            text: "Blood Glucose Levels (mg/dL)"
        },
        legend: {
            display: false
        }
    }
};