import { Injectable, ServiceUnavailableException, BadRequestException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SignInCustomerDto } from './dto/signIn-custimer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from 'src/schemas/customer.schema';
import { CreateCustomFieldDto } from './dto/create-customField.dto';
import { UpdateCustomFieldDto } from './dto/update-customField.dto';
import { TokenService } from 'src/util/token';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private readonly tokenService: TokenService
  ) {}
  
  async signUp(createCustomerDto: CreateCustomerDto) {
    const isDuplicatedCustomer = await this.customerModel.exists({email: createCustomerDto.email})

    if(!isDuplicatedCustomer){
      const createdCustomer = await new this.customerModel(createCustomerDto).save()
      //return createdCustomer
      if(createdCustomer){
        return { message: 'successful' }
      } else {
        throw new ServiceUnavailableException({ message: 'a network-related or database instance-specific error occurred while inserting new data' })
      }
    } else {
      return new BadRequestException({ message: 'invalid value for property' })
    }
    
  }

  async signIn(signInCustomerDto: SignInCustomerDto) {
    const customer = await this.customerModel.findOne({ id: signInCustomerDto.id, password: signInCustomerDto.password })
    //const { password, custom_fields, custom_fields_list, ...payload} = customer 프로토타입이 이상하다.. 추후 공부 필요
    const payload: {} = {
      _id: customer['_id'],
      id: customer.id,
      name: customer.name,
      store: customer.store
    }
    const accessToken = await this.tokenService.generateAccessToken(payload)
    return { message: 'successful', accessToken: accessToken, customer: customer }
  }

  async updateCustomer(updateCustomerDto: UpdateCustomerDto) {
    try {
      const updatedUser = await this.customerModel.findOneAndUpdate({$where: updateCustomerDto.email}, updateCustomerDto)
      return { message: 'successful', customer: updatedUser }
    } catch (err) {
      throw new ServiceUnavailableException({ message: 'a network-related or database instance-specific error occurred while inserting new data' })
    }
  }

  async deleteCustomer() {
    const deletedCustomer = this.customerModel.deleteOne({email: 'email'})
    if(deletedCustomer){
      return { message: 'successful' }
    } else {
      return { message: 'a network-related or database instance-specific error occurred while inserting new data' }
    }
  }

  async isDuplicated(id: string) {
    const isDuplicatedCustomer = await this.customerModel.exists({email: id})
    if(!isDuplicatedCustomer){
      return { message: 'This email address is now available' }
    } else {
      return { message: 'This email address is duplicated' }
    }
  }

  async getAccessToken() {
    return ''
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
