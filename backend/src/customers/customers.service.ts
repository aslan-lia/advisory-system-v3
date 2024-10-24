import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async createCustomer(createCustomerDto: { customer_name: string, contact_email: string }): Promise<Customer> {
    const newCustomer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(newCustomer);
  }
}
