import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('주문 정보 관련')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
		summary: '새로운 주문 생성',
		description: '사용자 지정 필드 데이터를 포함한 상품 정보를 입력하여 상품을 등록합니다.',
	})
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
		summary: '주문 정보 불러오기',
		description: '사용자 지정 필드 데이터를 포함한 상품 정보를 입력하여 상품을 등록합니다.',
	})
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('details/:id')
  @ApiOperation({
		summary: '상세 주문 정보',
		description: '사용자 지정 필드 데이터를 포함한 상품 정보를 입력하여 상품을 등록합니다.',
	})
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
		summary: '주문 정보 수정',
		description: '사용자 지정 필드 데이터를 포함한 상품 정보를 입력하여 상품을 등록합니다.',
	})
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
		summary: '주문 취소',
		description: '사용자 지정 필드 데이터를 포함한 상품 정보를 입력하여 상품을 등록합니다.',
	})
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
