const fs    = require('fs');

const { 
    readFile, 
    writeFile 
} = require('./file-util.js');

const { 
    dataJSONLocation 
} = require('./constants.js');

const { 
    resetData,
    defaultChartOptions 
} = require('./chart-util.js');

var chartContext = document.getElementById('chart').getContext('2d');

var chart;

var list      = document.getElementById('points');
var addBtn    = document.getElementById('add-btn');
var bglInput  = document.getElementById('bgl-input');
var dateInput = document.getElementById('date-input');

var data;

const loadChart = context => {
    var chart = new Chart(context, defaultChartOptions);
    
    Chart.defaults.global.defaultFontColor = '#fff';

    return chart;
}

const loadChartData = chart => {
    list.innerHTML = "";

    var filePath = dataJSONLocation;
    
    if (fs.existsSync(filePath)) {
        data = readFile(filePath);
    } else {
        writeFile(filePath, "[]");
        data = readFile(filePath);
    }

    data.forEach(element => {
        let dateString = `${element.date.month}/${element.date.day}/${element.date.year}`
        chart.data.labels = [...chart.data.labels, dateString];
        chart.data.datasets.forEach(dataset => {
             dataset.data = [...dataset.data, element.level];
        });

        list.innerHTML += `<li>${element.date.month}/${element.date.day}/${element.date.year} - ${element.level}mg/dL</li>`;
    });

    chart.update();
}

var chart = loadChart(chartContext);
loadChartData(chart);

addBtn.addEventListener('click', () => {
    let date = dateInput.value;
    let [ year, month, day ] = date.split("-");
    let level = parseInt(bglInput.value);
    let bgData = { level: level, date: { month: month, day: day, year: year } };

    data = [...data, bgData];

    writeFile(dataJSONLocation, JSON.stringify(data));
    resetData(chart, list);

    data.forEach(element => {
        chart.data.labels = [...chart.data.labels, `${element.date.month}/${element.date.day}/${element.date.year}`];
        chart.data.datasets.forEach(dataset => {
            dataset.data = [...dataset.data, element.level];
        });

        list.innerHTML += `<li>${element.date.month}/${element.date.day}/${element.date.year} - ${element.level}mg/dL</li>`;
    });

    chart.update();
});
