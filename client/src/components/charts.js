const HorizontalBar = {

}

window.onload = function () {
  window.myRadar = new Chart(document.getElementById("statusChart").getContext("2d")).Radar(radarChartData, {
      title: {
        display: true,
        text: 'Gigi Hadid Characteristic'
      }
  });
  var G2 = document.getElementById("canvas2").getContext("2d");
  window.myBar = new Chart(G2).HorizontalBar(barChartData, {
      responsive: true
  });
}