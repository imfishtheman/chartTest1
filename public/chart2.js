google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

let movingMax = 1000
let movingDown = 300

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Mon', 122, 130, 125, 140],
    ['Tue', 138, 138, 155, 155],
    ['Wed', 155, 155, 177, movingDown],
    ['Thu', 177, 177, 166, 166],
    ['Fri', 166, 166, 122, 122]
    // Treat the first row as data.
  ], true);

  var options = {
    legend: 'none',
    bar: { groupWidth: '95%' }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
      risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
    },
    vAxis:{
        textPosition: 'out',
        direction: 1,
        //maxValue: movingMax,
        //minValue: 2
    }
  };
  console.log('redrawing')
  var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  
}


setInterval(function(){
    console.log("Ping")
    //movingMax -=movingMax;
    movingDown-=10;
    drawChart();
},1000)