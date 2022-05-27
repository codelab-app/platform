export abstract class BaseResource<R, Config> {
  constructor(protected _config: Config) {}

  abstract getInstance(): R
}
