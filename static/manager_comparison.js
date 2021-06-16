google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawComparisonChart);

airquality_colors = ['lawngreen','darkgreen','gold','orange','red']


function drawComparisonChart() {

  var myInputs = JSON.parse(document.getElementById("pass_input").value);
  var mydata = JSON.parse(document.getElementById("pass_data").value);

  var data = new google.visualization.DataTable();
  
  data.addColumn('number', 'Day');
  data.addColumn('number', myInputs['input1']);
  data.addColumn('number', myInputs['input2']);
  data.addRows([
      [1,   80.8, 41.8],
      [2,  69.5, 32.4],
      [3,   57, 25.7],
      [4,  18.8, 10.5],
      [5,  17.6, 10.4],
      [6,   13.6,  7.7],
      [7,  12.3,  9.6],
      [8,  29.2, 10.6],
      [9,   42.9, 14.8],
      [10, 30.9, 11.6],
      [11,  7.9,  4.7],
      [12,   8.4,  5.2],
      [13,  6.3,  3.6],
      [14,  6.2,  3.4]
  ]);
  var options= {
    title: 'Comparision',
    titleTextStyle: {
      fontSize: 18, // 12, 18 whatever you 
      color: 'black',
    }
  };
  var chart = new google.charts.Line(document.getElementById('comparison'));
  chart.draw(data, google.charts.Line.convertOptions(options));
  
}

