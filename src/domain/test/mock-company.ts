import { Company } from '../entities/company'

export const mockCompany = (): Company => ({
  address: [
    {
      cep: 'any_cep',
      state: 'any_state',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      street: 'street',
      number: 'any_number',
      observations: 'any_string'
    }
  ],
  freight: [],
  name: 'any_name',
  cnpj: 'any_cnpj',
  departament: 'any_departament',
  phone: 'any_phone'
})
