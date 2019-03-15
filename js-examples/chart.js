$(document).ready(function() {
    var options = {
        type: 'bar',
        data: {
            labels: ["Beta Value", "Charlie Value", "Delta Value"],
            datasets: [{
                label: 'Awesome Dataset',
                data: [ 302, 175, 50],
                backgroundColor: "rgba(75, 192, 192, 1)"
            }]
        }
    };
    var testChart = new Chart($("#testChart"), options);
    var data = [
        {
            'Chrome 54.0': 5,
            'Edge 14.14393': 5,
            'Firefox 49.0': 5,
            'Firefox 64.0': 5,
            'Internet Explorer 11.0': 5,
            'Safari 10.1': 5
        }
    ];
    options.data.labels = [];
    options.data.datasets = [{
        label: 'Tests by Browser',
        data: [],
        backgroundColor: "rgba(75, 192, 192, 1)"
    }];

    for (var i in data) {
        for (var y in data[i]) {
            if (i == 0) {
                options.data.labels.push(y);
            }
            options.data.datasets[i].data.push(data[i][y]);
        }
    }
    testChart.update();
});

$(document).ready(function() {
    var options = {
        type: 'bar',
        data: {
            labels: ["Beta Value", "Charlie Value", "Delta Value"],
            datasets: [{
                label: 'Awesome Dataset',
                data: [ 302, 175, 50],
                backgroundColor: "rgba(75, 192, 192, 1)"
            }]
        }
    };
    var failureChart = new Chart($("#failureChart"), options);
    var data = [{ 'Firefox 49.0': 1, 'Safari 10.1': 1 }];
    options.data.labels = [];
    options.data.datasets = [{
        label: 'Test Failures by Browser',
        data: [],
        backgroundColor: "rgba(222, 31, 24, 1)"
    }];

    for (var i in data) {
        for (var y in data[i]) {
            if (i == 0) {
                options.data.labels.push(y);
            }
            options.data.datasets[i].data.push(data[i][y]);
        }
    }
    failureChart.update();
});