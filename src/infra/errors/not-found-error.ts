export class NotFoundError extends Error {
  private readonly code: number

  constructor (error: string, code: number) {
    super(error)
    this.name = 'NotFoundError'
    this.code = code
  }

  public getCode (): number {
    return this.code
  }
}

export const NotFoundErrorFactory = (name: string): NotFoundError => {
  const error_table = {
    user: {
      code: 40401,
      message: 'User not found!'
    }
  }
  const error_instance = error_table[name]
  return new NotFoundError(error_instance.message, error_instance.code)
}
