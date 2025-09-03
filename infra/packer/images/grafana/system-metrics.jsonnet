local panels = import 'lib/panels.libsonnet';

// System metrics dashboard with log rate analysis
{
  annotations: {
    list: [
      {
        builtIn: 1,
        datasource: {
          type: 'grafana',
          uid: '-- Grafana --',
        },
        enable: true,
        hide: true,
        iconColor: 'rgba(0, 211, 255, 1)',
        name: 'Annotations & Alerts',
        type: 'dashboard',
      },
    ],
  },
  editable: true,
  fiscalYearStartMonth: 0,
  graphTooltip: 0,
  links: [],
  panels: [
    // Log rate time series
    {
      datasource: {
        type: 'loki',
        uid: '${datasource}',
      },
      gridPos: panels.gridPos(0, 0, 24, 8),
      id: 1,
      options: {
        legend: {
          calcs: [],
          displayMode: 'list',
          placement: 'bottom',
          showLegend: true,
        },
        tooltip: {
          mode: 'multi',
          sort: 'none',
        },
      },
      targets: [
        {
          datasource: {
            type: 'loki',
            uid: '${datasource}',
          },
          editorMode: 'code',
          expr: 'rate({hostname=~".+"}[5m]) by (hostname)',
          legendFormat: '{{hostname}}',
          queryType: 'range',
          refId: 'A',
        },
      ],
      title: 'Log Rate by Hostname',
      type: 'timeseries',
    },
    
    // Container count stat panel
    {
      datasource: {
        type: 'loki',
        uid: '${datasource}',
      },
      gridPos: panels.gridPos(0, 8, 6, 4),
      id: 2,
      options: {
        orientation: 'auto',
        reduceOptions: {
          values: false,
          calcs: ['lastNotNull'],
        },
        text: {},
        textMode: 'auto',
      },
      targets: [
        {
          datasource: {
            type: 'loki',
            uid: '${datasource}',
          },
          editorMode: 'code',
          expr: 'count(count by (container_name)({hostname=~".+"}))',
          queryType: 'instant',
          refId: 'A',
        },
      ],
      title: 'Active Containers',
      type: 'stat',
    },
    
    // Total log lines stat
    {
      datasource: {
        type: 'loki',
        uid: '${datasource}',
      },
      gridPos: panels.gridPos(6, 8, 6, 4),
      id: 3,
      options: {
        orientation: 'auto',
        reduceOptions: {
          values: false,
          calcs: ['sum'],
        },
        text: {},
        textMode: 'auto',
      },
      targets: [
        {
          datasource: {
            type: 'loki',
            uid: '${datasource}',
          },
          editorMode: 'code',
          expr: 'sum(count_over_time({hostname=~".+"}[1h]))',
          queryType: 'instant',
          refId: 'A',
        },
      ],
      title: 'Total Logs (1h)',
      type: 'stat',
    },
    
    // Error count stat
    {
      datasource: {
        type: 'loki',
        uid: '${datasource}',
      },
      gridPos: panels.gridPos(12, 8, 6, 4),
      id: 4,
      options: {
        orientation: 'auto',
        reduceOptions: {
          values: false,
          calcs: ['sum'],
        },
        text: {},
        textMode: 'auto',
      },
      fieldConfig: {
        defaults: {
          thresholds: {
            mode: 'absolute',
            steps: [
              { color: 'green', value: null },
              { color: 'yellow', value: 10 },
              { color: 'red', value: 50 },
            ],
          },
        },
      },
      targets: [
        {
          datasource: {
            type: 'loki',
            uid: '${datasource}',
          },
          editorMode: 'code',
          expr: 'sum(count_over_time({hostname=~".+"} |~ "error|ERROR|fail|FAIL"[1h]))',
          queryType: 'instant',
          refId: 'A',
        },
      ],
      title: 'Error Count (1h)',
      type: 'stat',
    },
    
    // Droplet count
    {
      datasource: {
        type: 'loki',
        uid: '${datasource}',
      },
      gridPos: panels.gridPos(18, 8, 6, 4),
      id: 5,
      options: {
        orientation: 'auto',
        reduceOptions: {
          values: false,
          calcs: ['lastNotNull'],
        },
        text: {},
        textMode: 'auto',
      },
      targets: [
        {
          datasource: {
            type: 'loki',
            uid: '${datasource}',
          },
          editorMode: 'code',
          expr: 'count(count by (hostname)({hostname=~".+"}))',
          queryType: 'instant',
          refId: 'A',
        },
      ],
      title: 'Active Droplets',
      type: 'stat',
    },
    
    // Top logging containers table
    {
      datasource: {
        type: 'loki',
        uid: '${datasource}',
      },
      gridPos: panels.gridPos(0, 12, 12, 8),
      id: 6,
      options: {
        showHeader: true,
      },
      targets: [
        {
          datasource: {
            type: 'loki',
            uid: '${datasource}',
          },
          editorMode: 'code',
          expr: 'topk(10, sum by (hostname, container_name) (count_over_time({hostname=~".+"}[1h])))',
          format: 'table',
          queryType: 'instant',
          refId: 'A',
        },
      ],
      title: 'Top 10 Logging Containers',
      type: 'table',
    },
    
    // Recent errors table
    {
      datasource: {
        type: 'loki',
        uid: '${datasource}',
      },
      gridPos: panels.gridPos(12, 12, 12, 8),
      id: 7,
      options: {
        showHeader: true,
      },
      targets: [
        {
          datasource: {
            type: 'loki',
            uid: '${datasource}',
          },
          editorMode: 'code',
          expr: 'topk(10, sum by (hostname, container_name) (count_over_time({hostname=~".+"} |~ "error|ERROR|fail|FAIL"[1h])))',
          format: 'table',
          queryType: 'instant',
          refId: 'A',
        },
      ],
      title: 'Top 10 Error Sources',
      type: 'table',
    },
  ],
  schemaVersion: 39,
  tags: ['system', 'metrics', 'monitoring', 'loki'],
  templating: {
    list: [
      {
        current: {
          selected: false,
          text: 'Loki',
          value: 'Loki',
        },
        hide: 0,
        includeAll: false,
        label: 'Data Source',
        multi: false,
        name: 'datasource',
        options: [],
        query: 'loki',
        refresh: 1,
        regex: '',
        skipUrlSync: false,
        type: 'datasource',
      },
    ],
  },
  time: {
    from: 'now-3h',
    to: 'now',
  },
  timepicker: {},
  timezone: 'browser',
  title: 'System Metrics Overview',
  uid: 'system-metrics',
  version: 1,
  weekStart: '',
}