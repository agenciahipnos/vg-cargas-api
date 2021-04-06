export interface DeleteUserRepository {
  delete: (id: string) => Promise<boolean>
}
