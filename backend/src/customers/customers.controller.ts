import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')  // This means the route should be /customers
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: { customer_name: string, contact_email: string }) {
    return this.customersService.createCustomer(createCustomerDto);
  }
}
