export interface ValidatorReturn {
  messages: [
    {
      field: string
      error: string
    }
  ]
}

export interface Validator {
  validate: (input: any) => ValidatorReturn
}
