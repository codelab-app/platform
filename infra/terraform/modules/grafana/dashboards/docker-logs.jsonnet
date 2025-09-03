local panels = import 'lib/panels.libsonnet';

// Define services to monitor
local services = [
  { name: 'api', title: 'API Server' },
  { name: 'web', title: 'Web Application' },
  { name: 'landing', title: 'Landing Page' },
  { name: 'sites', title: 'Sites Server' },
  { name: 'neo4j', title: 'Neo4j Database' },
  { name: 'grafana', title: 'Grafana' },
];

// Dashboard definition
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
    // Row 0: Overview panels
    // Log rate graph (left)
    panels.logRateGraph(
      'Log Rate Over Time',
      'sum by(container_name) (rate({hostname="$hostname"}[5m]))',
      panels.gridPos(0, 0, 12, 8)
    ),
    
    // Log volume pie chart (right)
    panels.logVolumePieChart(
      'Log Volume by Container',
      '$hostname',
      panels.gridPos(12, 0, 12, 8)
    ),
    
    // Row 1: Health and distribution
    // Container health table (left)
    panels.containerHealthTable(
      'Container Health Status',
      '$hostname',
      panels.gridPos(0, 8, 12, 8)
    ),
    
    // Log level distribution (right)
    panels.logLevelDistribution(
      'Log Level Distribution (5m)',
      '$hostname',
      panels.gridPos(12, 8, 12, 8)
    ),
    
    // Row 2: Container logs
    // Dynamic container logs panel
    panels.logPanel(
      'Container Logs - $container on $hostname',
      '{hostname="$hostname", container_name="$container"}',
      panels.gridPos(0, 16, 24, 8)
    ),
    
    // Row 3: Error and warning logs
    // Error logs panel (left)
    panels.errorLogPanel(
      'Error Logs - All Containers',
      '$hostname',
      panels.gridPos(0, 24, 12, 8)
    ),
    
    // Warning/Alert logs panel (right)
    panels.alertWarningLogPanel(
      'Warning & Alert Logs - All Containers',
      '$hostname',
      panels.gridPos(12, 24, 12, 8)
    ),
  ] + [
    // Generate service-specific panels (starting at row 4)
    panels.logPanel(
      services[i].title + ' Logs',
      '{hostname="' + services[i].name + '"} | container_name="' + services[i].name + '"',
      panels.gridPos(
        (i % 2) * 12,  // x position: 0 or 12
        32 + std.floor(i / 2) * 8,  // y position: start at row 4 (y=32)
        12,  // width
        8  // height
      )
    )
    for i in std.range(0, std.length(services) - 1)
  ],
  schemaVersion: 39,
  tags: ['docker', 'logs', 'monitoring', 'loki'],
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
      {
        current: {},
        datasource: {
          type: 'loki',
          uid: '${datasource}',
        },
        definition: 'label_values(hostname)',
        hide: 0,
        includeAll: true,
        label: 'Hostname',
        multi: false,
        name: 'hostname',
        options: [],
        query: 'label_values(hostname)',
        refresh: 2,
        regex: '',
        skipUrlSync: false,
        sort: 1,
        type: 'query',
      },
      {
        current: {},
        datasource: {
          type: 'loki',
          uid: '${datasource}',
        },
        definition: 'label_values({hostname="$hostname"}, container_name)',
        hide: 0,
        includeAll: true,
        label: 'Container',
        multi: false,
        name: 'container',
        options: [],
        query: 'label_values({hostname="$hostname"}, container_name)',
        refresh: 2,
        regex: '',
        skipUrlSync: false,
        sort: 1,
        type: 'query',
      },
    ],
  },
  time: {
    from: 'now-1h',
    to: 'now',
  },
  timepicker: {},
  timezone: 'browser',
  title: 'Docker Logs Dashboard',
  uid: 'docker-logs',
  version: 1,
  weekStart: '',
}