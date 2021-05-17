import { ValidationResult } from 'joi'

export class BadRequestValidation extends Error {
  private readonly validation_result: ValidationResult

  constructor (message: string, validation_result: ValidationResult) {
    super(message)
    this.name = 'BadRequestValidation'
    this.validation_result = validation_result
  }

  public getValidationResult (): ValidationResult {
    return this.validation_result
  }
}
