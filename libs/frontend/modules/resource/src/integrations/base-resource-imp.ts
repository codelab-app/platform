export abstract class BaseResourceImp<R, Config> {
  constructor(protected _config: Config) {}

  abstract getInstance(): R
}
