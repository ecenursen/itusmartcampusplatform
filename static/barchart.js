google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawCharts);

airquality_colors = ['lawngreen','darkgreen','gold','orange','red']

window.onload = function() {
  document.getElementById("daily").focus();
  document.getElementById("morning").focus();
};
function drawCharts() {

      var data1 = google.visualization.arrayToDataTable([
        ['Time of Day', '', { role: 'style' }],
        ['Morning', 300, airquality_colors[0]],           
        ['Afternoon', 879, airquality_colors[1]],           
        ['Night', 1092, airquality_colors[2]]
      ]);

      var options1 = {
        title: 'Today',
        hAxis: {
          format: 'string'
        },
        colors: [''],
        vAxis: {
          title: 'Air Quality Level',
          format: 'decimal',
          viewWindow: {
            min: 100,
            max: 1400
          }
        }
      };

      var data2 = google.visualization.arrayToDataTable([
        ['Time of Day', '', { role: 'style' }],
        ['Morning', 600, airquality_colors[0]],           
        ['Afternoon', 1079, airquality_colors[2]],           
        ['Night', 1292, airquality_colors[3]]
      ]);

      var options2 = {
        title: 'Yesterday',
        hAxis: {
          format: 'string'
        },
        colors: [''],
        vAxis: {
          title: 'Air Quality Level',
          format: 'decimal',
          viewWindow: {
            min: 100,
            max: 1400
          }
        }
      };

      var data3 = google.visualization.arrayToDataTable([
        ['Time of Day', '', { role: 'style' }],
        ['Morning', 300, airquality_colors[0]],           
        ['Afternoon', 679, airquality_colors[0]],           
        ['Night', 892, airquality_colors[1]]
      ]);

      var options3 = {
        title: 'Two days before',
        hAxis: {
          format: 'string'
        },
        colors: [''],
        vAxis: {
          title: 'Air Quality Level',
          format: 'decimal',
          viewWindow: {
            min: 100,
            max: 1400
          }
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div_1'));
      chart.draw(data1, options1);

      var chart2 = new google.visualization.ColumnChart(
        document.getElementById('chart_div_2'));
      chart2.draw(data2, options2);

      var chart3 = new google.visualization.ColumnChart(
        document.getElementById('chart_div_3'));
      chart3.draw(data3, options3);
    }
