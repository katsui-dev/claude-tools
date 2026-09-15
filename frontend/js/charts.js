/**
 * Chart.js ラッパー。色はデザイントークンに合わせる。
 */
window.App = window.App || {};

App.Charts = (function () {
  var instances = {};
  var COLORS = {
    navy: '#17304F',
    green: '#1B9A6C',
    yellow: '#D9A400',
    orange: '#E0791F',
    red: '#D6483F',
    grid: '#E4E9F1',
    text: '#6C7686'
  };

  function destroy(canvasId) {
    if (instances[canvasId]) {
      instances[canvasId].destroy();
      delete instances[canvasId];
    }
  }

  function baseOptions(extra) {
    var opts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { color: COLORS.text, boxWidth: 10, font: { size: 11 } } },
        tooltip: { backgroundColor: '#17304F', padding: 10, cornerRadius: 8 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: COLORS.text, font: { size: 11 } } },
        y: { grid: { color: COLORS.grid }, ticks: { color: COLORS.text, font: { size: 11 } } }
      }
    };
    return Object.assign(opts, extra || {});
  }

  function createBudgetTrendChart(canvasId, monthly) {
    destroy(canvasId);
    var ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;
    instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthly.map(function (m) { return m.month; }),
        datasets: [
          { label: '予算', data: monthly.map(function (m) { return m.budget; }), backgroundColor: 'rgba(23,48,79,0.18)', borderRadius: 4, order: 2 },
          { label: '実績', data: monthly.map(function (m) { return m.actual; }), backgroundColor: COLORS.green, borderRadius: 4, order: 1 }
        ]
      },
      options: baseOptions()
    });
  }

  function createDoughnut(canvasId, items) {
    destroy(canvasId);
    var ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;
    var palette = [COLORS.navy, COLORS.green, COLORS.yellow, COLORS.orange, COLORS.red];
    instances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: items.map(function (i) { return i.name; }),
        datasets: [{
          data: items.map(function (i) { return i.amount !== undefined ? i.amount : i.value; }),
          backgroundColor: items.map(function (_, i) { return palette[i % palette.length]; }),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: { legend: { position: 'bottom', labels: { color: COLORS.text, boxWidth: 10, font: { size: 11 }, padding: 14 } } }
      }
    });
  }

  function createLineTrend(canvasId, labels, datasets) {
    destroy(canvasId);
    var ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;
    var palette = [COLORS.navy, COLORS.green, COLORS.orange];
    instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets.map(function (ds, i) {
          return {
            label: ds.label,
            data: ds.data,
            borderColor: palette[i % palette.length],
            backgroundColor: palette[i % palette.length],
            tension: 0.35,
            pointRadius: 3,
            fill: false
          };
        })
      },
      options: baseOptions()
    });
  }

  return {
    createBudgetTrendChart: createBudgetTrendChart,
    createDoughnut: createDoughnut,
    createLineTrend: createLineTrend,
    destroy: destroy
  };
})();
