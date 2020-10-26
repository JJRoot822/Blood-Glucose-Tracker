const fs    = require('fs');

const { readFile, writeFile } = require('./file-util.js');
const { dataJSONLocation    } = require('./constants.js');
const { defaultChartOptions } = require('./chart-util.js');

var chartContext = document.getElementById('chart').getContext('2d');

var chart;

var list      = document.getElementById('points');
var addBtn    = document.getElementById('add-btn');
var bglInput  = document.getElementById('bgl-input');
var dateInput = document.getElementById('date-input');

var data;

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
        chart.data.labels.push(`${element.date.month}/${element.date.day}/${element.date.year}`);
        chart.data.datasets.forEach(dataset => {
            dataset.data.push(element.level);
        });

        list.innerHTML += `<li>${element.date.month}/${element.date.day}/${element.date.year} - ${element.level}mg/dL</li>`;
    });

    chart.update();
}

const loadChart = context => {
    var chart = new Chart(context, defaultChartOptions);
    
    Chart.defaults.global.defaultFontColor = '#fff';

    return chart;
}

var chart = loadChart(chartContext);
loadChartData(chart);

addBtn.addEventListener('click', () => {
    data.push({ 
        level: parseInt(bglInput.value), 
        date: { 
            month: dateInput.value.split('-')[1], 
            day: dateInput.value.split('-')[2], 
            year: dateInput.value.split('-')[0] 
        } 
    });

    writeFile(dataJSONLocation, JSON.stringify(data));

    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    list.innerHTML = "";

    data.forEach(element => {
        chart.data.labels = [...chart.data.labels, `${element.date.month}/${element.date.day}/${element.date.year}`];
        chart.data.datasets.forEach(dataset => {
            dataset.data = [...dataset.data, element.level];
        });

        list.innerHTML += `<li>${element.date.month}/${element.date.day}/${element.date.year} - ${element.level}mg/dL</li>`;
    });

    chart.update();
});
