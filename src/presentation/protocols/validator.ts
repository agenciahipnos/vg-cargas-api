import { ValidationResult } from 'joi'

export interface Validator {
  validate: (input: any) => ValidationResult
}
