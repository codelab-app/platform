// Reusable panel library for Grafana dashboards
{
  // Standard log panel for viewing container logs
  logPanel(title, expr, gridPos):: {
    datasource: {
      type: 'loki',
      uid: '${datasource}',
    },
    gridPos: gridPos,
    id: null,
    options: {
      dedupStrategy: 'none',
      enableLogDetails: true,
      prettifyLogMessage: false,
      showCommonLabels: false,
      showLabels: false,
      showTime: true,
      sortOrder: 'Descending',
      wrapLogMessage: true,
    },
    targets: [
      {
        datasource: {
          type: 'loki',
          uid: '${datasource}',
        },
        editorMode: 'code',
        expr: expr,
        queryType: 'range',
        refId: 'A',
      },
    ],
    title: title,
    type: 'logs',
  },

  // Error log panel with filtering
  errorLogPanel(title, hostname, gridPos):: {
    datasource: {
      type: 'loki',
      uid: '${datasource}',
    },
    gridPos: gridPos,
    id: null,
    options: {
      dedupStrategy: 'none',
      enableLogDetails: true,
      prettifyLogMessage: false,
      showCommonLabels: false,
      showLabels: true,
      showTime: true,
      sortOrder: 'Descending',
      wrapLogMessage: true,
    },
    targets: [
      {
        datasource: {
          type: 'loki',
          uid: '${datasource}',
        },
        editorMode: 'code',
        expr: '{hostname="' + hostname + '"} |~ "error|ERROR|Error|fail|FAIL|Fail|exception|Exception|EXCEPTION"',
        queryType: 'range',
        refId: 'A',
      },
    ],
    title: title,
    type: 'logs',
  },

  // Pie chart for log volume
  logVolumePieChart(title, hostname, gridPos):: {
    datasource: {
      type: 'loki',
      uid: '${datasource}',
    },
    gridPos: gridPos,
    id: null,
    options: {
      showLegend: true,
      legend: {
        displayMode: 'list',
        placement: 'bottom',
      },
      pieType: 'pie',
      tooltip: {
        displayMode: 'single',
      },
    },
    targets: [
      {
        datasource: {
          type: 'loki',
          uid: '${datasource}',
        },
        editorMode: 'code',
        expr: 'sum by(container_name) (rate({hostname="' + hostname + '"}[$__interval]))',
        queryType: 'instant',
        refId: 'A',
      },
    ],
    title: title,
    type: 'piechart',
  },

  // Helper to create grid positions
  gridPos(x, y, w=12, h=8):: {
    x: x,
    y: y,
    w: w,
    h: h,
  },
}