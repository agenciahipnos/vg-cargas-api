export interface DeleteFreightRepository {
  delete: (id: string) => Promise<boolean>
}
