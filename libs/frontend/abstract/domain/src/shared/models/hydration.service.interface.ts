export interface IHydrateable<Dto, Model> {
  hydrate(dto: Dto): Model
}
