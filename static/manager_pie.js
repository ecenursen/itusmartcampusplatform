google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

airquality_colors = ['lawngreen','darkgreen','gold','orange','red']

function drawChart() {

    var myInputs = JSON.parse(document.getElementById("pass_input").value);

    var data1 = google.visualization.arrayToDataTable([
        ['Air Quality', 'Hours per Day',{ role: 'style' }],
        ['Perfect',     4,airquality_colors[0]],
        ['Good',      12,airquality_colors[1]],
        ['Moderate',  2,airquality_colors[2]],
        ['Dangerous to Sensitive', 2,airquality_colors[3]],
        ['Dangerous',   0,airquality_colors[4]]
      ]);
    var options1 = {
        title: 'Air Quality Pie Chart',
        titleTextStyle: {
          fontSize: 12, // 12, 18 whatever you 
          color: 'black',
        },
        colors: ['']
    };
    var chart1 = new google.visualization.PieChart(document.getElementById('pie_1'));
    chart1.draw(data1, options1);

    
    var data2 = google.visualization.arrayToDataTable([
        ['Population', 'Hours per Day',{ role: 'style' }],
        ['Empty',     4,airquality_colors[0]],
        ['Less Population',  12,airquality_colors[1]],
        ['Normal',  32,airquality_colors[2]],
        ['Crowded', 22,airquality_colors[3]],
        ['Very Crowded',   10,airquality_colors[4]]
    ]);
    var options2 = {
        title: 'Population Pie Chart',
        titleTextStyle: {
          fontSize: 12, // 12, 18 whatever you 
          color: 'black',
        },
        colors: ['']
    };

    var chart2 = new google.visualization.PieChart(document.getElementById('pie_2'));
    chart2.draw(data2, options2);
}