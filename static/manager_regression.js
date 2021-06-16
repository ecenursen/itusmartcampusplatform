google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

airquality_colors = ['lawngreen','darkgreen','gold','orange','red']


function drawChart() {

  var myInputs = JSON.parse(document.getElementById("pass_input").value);
  var mydata = JSON.parse(document.getElementById("pass_data").value)['data'];
  console.log(mydata)
  var data = google.visualization.arrayToDataTable(mydata);
  var options = {
    hAxis: {minValue: 0, maxValue: 15},
    vAxis: {minValue: 0, maxValue: 15},
    chartArea: {width:'65%'},
    title:"Regression",
    hAxis: {title: 'Air Quality'},
    vAxis: {title: 'Population'},
    titleTextStyle: {
      fontSize: 18, // 12, 18 whatever you 
      color: 'black',
    },
    trendlines: {
      0: {
        type: 'linear',
        showR2: true,
        visibleInLegend: true
      }
    }
  };

  var chartLinear = new google.visualization.ScatterChart(document.getElementById('regression'));
  chartLinear.draw(data, options);
 
}