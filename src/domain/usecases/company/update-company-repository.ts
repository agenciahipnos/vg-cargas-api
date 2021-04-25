import { CompanyModel } from '@/domain/models/company-model'

export interface UpdateCompanyRepository {
  update: (ompany: CompanyModel) => Promise<CompanyModel>
}
