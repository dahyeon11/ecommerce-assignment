import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SignInCustomerDto } from './dto/signIn-custimer.dto';
import { ApiTags, ApiOperation, ApiParam, ApiOkResponse, ApiForbiddenResponse, ApiBearerAuth, ApiFoundResponse, ApiHeader } from '@nestjs/swagger';
import { CreateCustomFieldDto } from './dto/create-customField.dto';
import { UpdateCustomFieldDto } from './dto/update-customField.dto';

@Controller('customers')
@ApiTags('회원 정보 및 개인 설정 관련')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({
		summary: '고객 회원 가입',
		description: '회원 가입요청을 보냅니다.',
	})
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get(':id')
  @ApiOperation({
		summary: '고객 고유 ID 중복 검사',
		description: '고객 고유 ID의 중복 여부를 검사합니다.',
	})
	@ApiParam({
		name: 'id',
		required: true,
		description: '중복 검사를 시행할 ID 값',
	})
	@ApiOkResponse({ description: 'available' })
	@ApiForbiddenResponse({
		description: 'This customer id is already being used',
	})
  isDuplicated(@Param('id') id: string) {
    return this.customersService.isDuplicated(id);
  }

  @Post('/signin')
  @ApiOperation({
		summary: '로그인',
		description: '로그인 요청을 통해 토큰을 가져옵니다.',
	})
  signIn(@Body() signInCustomerDto: SignInCustomerDto) {
    return this.customersService.signIn(signInCustomerDto);
  }

  @Patch()
  @ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		}
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({
		summary: '고객 정보 수정',
		description: '고객 정보 수정',
	})
  update(@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(updateCustomerDto);
  }

  @Delete()
  @ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		}
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({
		summary: '고객 회원 탈퇴',
		description: '고객 회원 탈퇴',
	})
  remove() {
    return this.customersService.remove();
  }

  @Post('/settings/custom-fields')
  @ApiOperation({
		summary: '사용자 정의 필드 생성',
		description: '사용자 정의 필드를 생성합니다.',
	})
  @ApiBearerAuth('accessToken')
  createCustomFields(@Body() createCustomFieldDto: CreateCustomFieldDto) {
    return this.customersService.createCustomFields(createCustomFieldDto);
  }

  @Patch('/settings/custom-fields')
  @ApiOperation({
		summary: '사용자 정의 필드 정책 수정',
		description: '생성된 사용자 정의 필드의 정책(갯수, 속성 일체)을 수정합니다.',
	})
  @ApiBearerAuth('accessToken')
  updateCustomFields(@Body() updateCustomFieldDto: UpdateCustomFieldDto) {
    return this.customersService.updateCustomFields(updateCustomFieldDto);
  }

  @Get('/settings/custom-fields')
  @ApiOperation({
		summary: '사용자 정의 필드 정책 불러오기',
		description: '정의된 사용자 정의 필드 정책을 가져옵니다.',
	})
  @ApiBearerAuth('accessToken')
  @ApiFoundResponse({
		description: 'successful',
		schema: {
			example: [{
				id: 'f2e97d26-84d3-4210-aad9-826071c09837',
				collection: 'product',
        type: 'date',
				attribute: '유통기한',
			}],
		},
	})
  findCustomFields() {
    return this.customersService.findCustomFields();
  }

  @Delete('/settings/custom-fields')
  @ApiOperation({
		summary: '사용자 정의 필드 비활성화',
		description: '사용자 정의 필드 기능을 비활성화 합니다.',
	})
  @ApiBearerAuth('accessToken')
  removeCustomFields(@Body() signInCustomerDto: SignInCustomerDto) {
    return this.customersService.signIn(signInCustomerDto);
  }

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiOperation({
		summary: '고객 정보 및 엑세스 토큰 갱신',
		description: '발급된 리프레시 토큰을 이용해 엑세스 토큰을 갱신하며 고객정보를 최신화 합니다.',
	})
  findAll() {
    return this.customersService.findAll();
  }




}
