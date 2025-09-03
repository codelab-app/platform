local g = import 'vendor/grafonnet/gen/grafonnet-v11.1.0/main.libsonnet';

local dashboard = g.dashboard;
local panel = g.panel;
local query = g.query;
local variable = g.dashboard.variable;

// Create the dashboard
dashboard.new('Docker Logs Dashboard')
+ dashboard.withUid('docker-logs-v2')
+ dashboard.withTags(['docker', 'logs', 'monitoring', 'loki'])
+ dashboard.withTimezone('browser')
+ dashboard.withEditable(true)
+ dashboard.time.withFrom('now-1h')
+ dashboard.time.withTo('now')

// Add variables
+ dashboard.withVariables([
  variable.datasource.new('datasource', 'loki')
  + variable.datasource.withLabel('Data Source'),
  
  variable.query.new('hostname')
  + variable.query.withLabel('Hostname')
  + variable.query.withDatasource('loki', '${datasource}')
  + variable.query.withQuery('label_values(hostname)')
  + variable.query.withRefresh(2)
  + variable.query.withSort(1)
  + variable.query.withIncludeAll(true)
  + variable.query.withMulti(false),
  
  variable.query.new('container')
  + variable.query.withLabel('Container')
  + variable.query.withDatasource('loki', '${datasource}')
  + variable.query.withQuery('label_values({hostname="$hostname"}, container_name)')
  + variable.query.withRefresh(2)
  + variable.query.withSort(1)
  + variable.query.withIncludeAll(true)
  + variable.query.withMulti(false),
])

// Add panels
+ dashboard.withPanels([
  // Main container logs panel
  panel.logs.new('Container Logs - $container on $hostname')
  + panel.logs.datasource.withType('loki')
  + panel.logs.datasource.withUid('${datasource}')
  + panel.logs.withTargets([
    query.loki.new('${datasource}', '{hostname="$hostname", container_name="$container"}')
  ])
  + panel.logs.options.withShowTime(true)
  + panel.logs.options.withSortOrder('Descending')
  + panel.logs.options.withWrapLogMessage(true)
  + panel.logs.options.withEnableLogDetails(true)
  + panel.logs.gridPos.withX(0)
  + panel.logs.gridPos.withY(0)
  + panel.logs.gridPos.withW(12)
  + panel.logs.gridPos.withH(8),
  
  // Log volume by container pie chart
  panel.pieChart.new('Log Volume by Container')
  + panel.pieChart.withDatasource('loki', '${datasource}')
  + panel.pieChart.withQueries([
    query.loki.new('${datasource}', 'sum by(container_name) (rate({hostname="$hostname"}[$__interval]))')
    + query.loki.withQueryType('instant')
  ])
  + panel.pieChart.options.withShowLegend(true)
  + panel.pieChart.options.withPieType('pie')
  + panel.pieChart.gridPos.withX(12)
  + panel.pieChart.gridPos.withY(0)
  + panel.pieChart.gridPos.withW(12)
  + panel.pieChart.gridPos.withH(8),
  
  // Error logs panel
  panel.logs.new('Error Logs - All Containers on $hostname')
  + panel.logs.withDatasource('loki', '${datasource}')
  + panel.logs.withQueries([
    query.loki.new('${datasource}', '{hostname="$hostname"} |~ "error|ERROR|Error|fail|FAIL|Fail|exception|Exception|EXCEPTION"')
  ])
  + panel.logs.options.withShowTime(true)
  + panel.logs.options.withSortOrder('Descending')
  + panel.logs.options.withWrapLogMessage(true)
  + panel.logs.options.withShowLabels(true)
  + panel.logs.gridPos.withX(0)
  + panel.logs.gridPos.withY(8)
  + panel.logs.gridPos.withW(24)
  + panel.logs.gridPos.withH(8),
  
  // Log rate time series
  panel.timeSeries.new('Log Rate by Container')
  + panel.timeSeries.withDatasource('loki', '${datasource}')
  + panel.timeSeries.withQueries([
    query.loki.new('${datasource}', 'rate({hostname="$hostname"}[5m]) by (container_name)')
    + query.loki.withLegendFormat('{{container_name}}')
  ])
  + panel.timeSeries.options.tooltip.withMode('multi')
  + panel.timeSeries.options.legend.withShowLegend(true)
  + panel.timeSeries.options.legend.withPlacement('bottom')
  + panel.timeSeries.gridPos.withX(0)
  + panel.timeSeries.gridPos.withY(16)
  + panel.timeSeries.gridPos.withW(24)
  + panel.timeSeries.gridPos.withH(8),
  
  // Service-specific panels
  panel.logs.new('API Server Logs')
  + panel.logs.withDatasource('loki', '${datasource}')
  + panel.logs.withQueries([
    query.loki.new('${datasource}', '{hostname="api"}')
  ])
  + panel.logs.options.withShowTime(true)
  + panel.logs.options.withSortOrder('Descending')
  + panel.logs.gridPos.withX(0)
  + panel.logs.gridPos.withY(24)
  + panel.logs.gridPos.withW(12)
  + panel.logs.gridPos.withH(8),
  
  panel.logs.new('Web Application Logs')
  + panel.logs.withDatasource('loki', '${datasource}')
  + panel.logs.withQueries([
    query.loki.new('${datasource}', '{hostname="web"}')
  ])
  + panel.logs.options.withShowTime(true)
  + panel.logs.options.withSortOrder('Descending')
  + panel.logs.gridPos.withX(12)
  + panel.logs.gridPos.withY(24)
  + panel.logs.gridPos.withW(12)
  + panel.logs.gridPos.withH(8),
  
  panel.logs.new('Landing Page Logs')
  + panel.logs.withDatasource('loki', '${datasource}')
  + panel.logs.withQueries([
    query.loki.new('${datasource}', '{hostname="landing"}')
  ])
  + panel.logs.options.withShowTime(true)
  + panel.logs.options.withSortOrder('Descending')
  + panel.logs.gridPos.withX(0)
  + panel.logs.gridPos.withY(32)
  + panel.logs.gridPos.withW(12)
  + panel.logs.gridPos.withH(8),
  
  panel.logs.new('Sites Server Logs')
  + panel.logs.withDatasource('loki', '${datasource}')
  + panel.logs.withQueries([
    query.loki.new('${datasource}', '{hostname="sites"}')
  ])
  + panel.logs.options.withShowTime(true)
  + panel.logs.options.withSortOrder('Descending')
  + panel.logs.gridPos.withX(12)
  + panel.logs.gridPos.withY(32)
  + panel.logs.gridPos.withW(12)
  + panel.logs.gridPos.withH(8),
  
  panel.logs.new('Neo4j Database Logs')
  + panel.logs.withDatasource('loki', '${datasource}')
  + panel.logs.withQueries([
    query.loki.new('${datasource}', '{hostname="neo4j"}')
  ])
  + panel.logs.options.withShowTime(true)
  + panel.logs.options.withSortOrder('Descending')
  + panel.logs.gridPos.withX(0)
  + panel.logs.gridPos.withY(40)
  + panel.logs.gridPos.withW(24)
  + panel.logs.gridPos.withH(8),
])