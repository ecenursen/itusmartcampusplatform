google.charts.load('current', {'packages':['line','corechart','bar']});
google.charts.setOnLoadCallback(drawCharts);

airquality_colors = ['lawngreen','darkgreen','gold','orange','red']


function drawCharts() {
  var myInputs = JSON.parse(document.getElementById("pass_input").value);
  console.log("myvar");
  console.log(myInputs);
  var mydata = JSON.parse(document.getElementById("pass_data").value)['data'];
  
  var dataRegression = google.visualization.arrayToDataTable(mydata);
  var optionsRegression = {
    hAxis: {minValue: 0, maxValue: 15},
    vAxis: {minValue: 0, maxValue: 15},
    chartArea: {width:'50%'},
    title:"Regression",
    titleTextStyle: {
      fontSize: 18, // 12, 18 whatever you 
      color: 'black',
    },
    hAxis: {title: 'Air Quality February'},
    vAxis: {title: 'Air Quality March'},
    trendlines: {
      0: {
        type: 'linear',
        showR2: true,
        visibleInLegend: true
      }
    }
  };
  var chartRegression = new google.visualization.ScatterChart(document.getElementById('regression_small'));
  chartRegression.draw(dataRegression, optionsRegression);


  var dataComparison = new google.visualization.DataTable();
  dataComparison.addColumn('number', 'Day');
  dataComparison.addColumn('number', "Air Quality February");
  dataComparison.addColumn('number', "Air Quality March");
  for (var i = 1; i<31;i++){
    console.log(mydata[i])
    dataComparison.addRow([i,mydata[i][0],mydata[i][1]]);
  }
  var optionsComparison = {
    title: 'Comparision',
    titleTextStyle: {
      fontSize: 18, // 12, 18 whatever you 
      color: 'black',
    }
  };
  var chartComparison = new google.charts.Line(document.getElementById('comparison_small'));
  chartComparison.draw(dataComparison, google.charts.Line.convertOptions(optionsComparison));


  var dataBar = new google.visualization.DataTable();
  dataBar.addColumn('number', 'Day');
  dataBar.addColumn('number', "Air Quality February");
  dataBar.addColumn('number', "Air Quality March");
  for (var i = 1; i<31;i++){
    dataBar.addRow([i,mydata[i][0],mydata[i][1]]);
  }

  var optionsBar = {
    chart:{
      title: 'BarChart',
      titleTextStyle: {
        fontSize: 18, // 12, 18 whatever you 
        color: 'black',
      }
    },
  
    hAxis: {
      format: 'string'
    },
    vAxis: {
      format: 'decimal',
    }
  };
  var chartBar = new google.charts.Bar(document.getElementById('bar_small'));
  chartBar.draw(dataBar, optionsBar);

  
  var dataPies1 = google.visualization.arrayToDataTable([
    ['Air Quality February', 'Hours per Day',{ role: 'style' }],
    ['Perfect',     4,airquality_colors[0]],
    ['Good',      12,airquality_colors[1]],
    ['Moderate',  2,airquality_colors[2]],
    ['Dangerous to Sensitive', 2,airquality_colors[3]],
    ['Dangerous',   0,airquality_colors[4]]
  ]);
  var optionsPies1 = {
    title: 'Air Quality February Pie Chart',
    titleTextStyle: {
      fontSize: 12, // 12, 18 whatever you 
      color: 'black',
    }
  };
  var chartPie1 = new google.visualization.PieChart(document.getElementById('pie_small_1'));
  chartPie1.draw(dataPies1, optionsPies1);

  var dataPies2 = google.visualization.arrayToDataTable([
    ['Air Quality March', 'Hours per Day',{ role: 'style' }],
    ['Perfect',     4,airquality_colors[0]],
    ['Good',  12,airquality_colors[1]],
    ['Moderate',  32,airquality_colors[2]],
    ['Dangerous to Sensitive', 22,airquality_colors[3]],
    ['Dangerous',   10,airquality_colors[4]]
  ]);
  var optionsPies2 = {
    title: 'Air Quality March Pie Chart',
    titleTextStyle: {
      fontSize: 12, // 12, 18 whatever you 
      color: 'black',
    }
  };

  var chartPie2 = new google.visualization.PieChart(document.getElementById('pie_small_2'));
  chartPie2.draw(dataPies2, optionsPies2);

}
