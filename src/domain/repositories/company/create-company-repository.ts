import { Company } from '@/domain/entities/company'
import { CompanyModel } from '@/domain/models/company-model'

export interface CreateCompanyRepository {
  create: (company: Company) => Promise<CompanyModel>
}
