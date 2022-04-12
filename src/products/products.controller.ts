import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('products')
@ApiTags('상품 정보 관련')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
		summary: '새로운 상품 등록',
		description: '사용자 지정 필드 데이터를 포함한 상품 정보를 입력하여 상품을 등록합니다.',
	})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
		summary: '상품 정보 불러오기',
		description: '상품 정보를 불러옵니다.',
	})
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/details/:id')
  @ApiOperation({
		summary: '상품 상세 정보 불러오기',
		description: '해당 상품의 상세정보를 가져옵니다.',
	})
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
		summary: '상품 정보 수정',
		description: '사용자 지정 필드 정보를 포함한 상품 정보를 수정합니다.',
	})
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
		summary: '상품 삭제',
		description: '등록된 상품을 삭제합니다.',
	})
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
