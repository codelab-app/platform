local g = import 'github.com/grafana/grafonnet/gen/grafonnet-v11.0.0/main.libsonnet';

local dashboard = g.dashboard;
local logs = g.panel.logs;
local var = dashboard.variable;

// Dashboard definition using Grafonnet
dashboard.new('Docker Logs')
+ dashboard.withUid('docker-logs')
+ dashboard.withTags(['docker', 'logs', 'monitoring', 'loki'])
+ dashboard.time.withFrom('now-1h')
+ dashboard.time.withTo('now')
+ dashboard.withTimezone('browser')
+ dashboard.withEditable(true)
+ dashboard.graphTooltip.withSharedCrosshair()

// Add variables
+ dashboard.withVariables([
  // Data source variable
  var.datasource.new('datasource', 'loki')
    + var.datasource.generalOptions.withLabel('Data Source')
    + var.datasource.withRegex(''),
    
  // Droplet/Hostname variable
  var.query.new('droplet')
    + var.query.generalOptions.withLabel('Droplet')
    + var.query.queryTypes.withLabelValues('hostname')
    + var.query.withDatasource('loki', '${datasource}')
    + var.query.withRefresh('time')
    + var.query.withSort('name')
    + var.query.selectionOptions.withIncludeAll(false)
    + var.query.selectionOptions.withMulti(false),
    
  // Container variable
  var.query.new('container')
    + var.query.generalOptions.withLabel('Container')
    + var.query.queryTypes.withLabelValues('container_name', '{hostname="$droplet"}')
    + var.query.withDatasource('loki', '${datasource}')
    + var.query.withRefresh('time')
    + var.query.withSort('name')
    + var.query.selectionOptions.withIncludeAll(true)
    + var.query.selectionOptions.withMulti(false),
])

// Add panels
+ dashboard.withPanels([
  // Single logs panel
  logs.new('Docker Logs')
  + logs.queryOptions.withDatasource('loki', '${datasource}')
  + logs.queryOptions.withTargets([
    g.query.loki.new('${datasource}', '{hostname="$droplet", container_name="$container"}'),
  ])
  + logs.gridPos.withX(0)
  + logs.gridPos.withY(0)
  + logs.gridPos.withW(24)
  + logs.gridPos.withH(20)
  + logs.options.withShowTime(true)
  + logs.options.withWrapLogMessage(true)
  + logs.options.withPrettifyLogMessage(false)
  + logs.options.withEnableLogDetails(true)
  + logs.options.withDedupStrategy('none')
  + logs.options.withSortOrder('Descending'),
])