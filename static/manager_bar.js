google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawTitleSubtitle);

airquality_colors = ['lawngreen','darkgreen','gold','orange','red']


function drawTitleSubtitle() {
  
  var myInputs = JSON.parse(document.getElementById("pass_input").value);
  
  var data = new google.visualization.DataTable();
  var data = google.visualization.arrayToDataTable([
    ['Days', myInputs['input1'], myInputs['input2']],
    ['2021-02-03', 300, 1000],           
    ['2021-02-04', 879,1293],           
    ['2021-02-05', 1092, 3023]
  ]);

  var options = {
    chart:{
      title: 'BarChart',
      titleTextStyle: {
        fontSize: 18, 
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
  var materialChart = new google.charts.Bar(document.getElementById('bars'));
  materialChart.draw(data, options);

}