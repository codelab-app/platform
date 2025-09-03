export enum PackerImage {
  Api = 'api',
  Base = 'base', // Must be first - services depend on it
  ConsulServer = 'consul-server',
  Grafana = 'grafana',
  Landing = 'landing',
  Neo4j = 'neo4j',
  Sites = 'sites',
  Web = 'web',
}

export interface PackerBaseOptions {
  consulEncryptKey: string
}

export interface PackerBuildOptions extends PackerBaseOptions {
  digitaloceanApiToken: string
  images: Array<PackerImage>
}

export interface PackerValidateOptions extends PackerBaseOptions {
  digitaloceanApiToken: string
  images: Array<PackerImage>
}

export interface PackerGetLatestSnapshotOptions {
  digitaloceanApiToken: string
  service: string
}

export interface PackerCleanupOptions {
  digitaloceanApiToken: string
}
