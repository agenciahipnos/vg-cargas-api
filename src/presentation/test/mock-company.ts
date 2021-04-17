import { Company } from '@/domain/entities/company'
import { CompanyModel } from '@/domain/models/company-model'
import { CreateCompanyRepository } from '@/domain/usecases/company/create-company-repository'

export const mockCompanyModel = (): CompanyModel => ({
  _id: 'any_id',
  address: [],
  freight: [],
  name: 'any_name',
  cnpj: 'any_cnpj',
  departament: 'any_departament',
  phone: 'any_phone'
})

export const mockCreateCompany = (): CreateCompanyRepository => {
  class CreateCompanyStub implements CreateCompanyRepository {
    async create (company: Company): Promise<CompanyModel> {
      return Promise.resolve(mockCompanyModel())
    }
  }
  return new CreateCompanyStub()
}
