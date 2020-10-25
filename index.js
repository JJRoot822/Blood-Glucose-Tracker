const fs    = require('fs');
const path  = require('path');
const os    = require('os');
const fetch = require('node-fetch');

var ctx = document.getElementById('chart').getContext('2d');

var chart;

var list      = document.getElementById('points');
var addBtn    = document.getElementById('add-btn');
var bglInput  = document.getElementById('bgl-input');
var dateInput = document.getElementById('date-input');

var chart;
var data;

const createFile = () => {
    fs.writeFileSync(path.join(os.homedir(), 'data.json'), "");
}

const readFile = filePath => {
    var fileContent = fs.readFileSync(filePath,{ encoding: 'utf-8' });

    return JSON.parse(fileContent);
}

const writeFile = (filePath, contentToWrite) => {
    fs.writeFileSync(filePath, contentToWrite, (err) => {
        if (err) throw err;
        console.log(`${contentToWrite} has been written to ${filePath}`);
    });
}

const loadChartData = () => {
    list.innerHTML = "";

    var filePath = path.join(os.homedir(), 'data.json');
    
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

const loadChart = () => {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Blood Glucose Level',
                pointBackgroundColor: '200, 200, 255',
                pointBorderColor: '200, 200, 255',
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
    });
    
    Chart.defaults.global.defaultFontColor = '#fff';
}

loadChart();
loadChartData();

addBtn.addEventListener('click', () => {
    data.push({ 
        level: parseInt(bglInput.value), 
        date: { 
            month: dateInput.value.split('-')[1], 
            day: dateInput.value.split('-')[2], 
            year: dateInput.value.split('-')[0] 
        } 
    });

    writeFile(path.join(os.homedir(), 'data.json'), JSON.stringify(data));

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
