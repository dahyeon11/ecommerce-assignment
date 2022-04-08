import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SignInCustomerDto } from './dto/signIn-custimer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { CreateCustomFieldDto } from './dto/create-customField.dto';
import { UpdateCustomFieldDto } from './dto/update-customField.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const createCustomer = new this.customerModel(createCustomerDto);
    return createCustomer.save();
  }

  async signIn(signInCustomerDto: SignInCustomerDto) {
    const customer = await this.customerModel.findOne({ id: signInCustomerDto.id, password: signInCustomerDto.password })
    return customer
  }

  async findAll() {
    try {
      const result = await this.customerModel.findOne({ id: 'dahyeon' })
      return result
    } catch (err) {
      console.log(err)
    }
  }

  async isDuplicated(id: string) {
    return `This action returns a #${id} customer`;
  }

  async createCustomFields(createCustomerDto: CreateCustomFieldDto) {
    return ''
  }

  async updateCustomFields(updateCustomerDto: UpdateCustomFieldDto) {
    return ''
  }

  async findCustomFields() {
    return ''
  }

  update(updateCustomerDto: UpdateCustomerDto) {
    return ``;
  }

  remove() {
    return ``;
  }
}
