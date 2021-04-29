import { Company } from '@/domain/entities/company'
import { CompanyModel } from '@/domain/models/company-model'
import { CreateCompanyRepository } from '@/domain/usecases/company/create-company-repository'
import { CompanyMongo } from '@/infra/db/mongodb/schemas/company-schema'

export class CreateCompanyRepositoryImpl implements CreateCompanyRepository {
  async create (company: Company): Promise<CompanyModel> {
    const create_company = await CompanyMongo.create(company)
    if (create_company) {
      return create_company
    }
  }
}
