import { ApiProperty } from '@nestjs/swagger';

class UpdateCustomFieldItems{
    @ApiProperty()
    id: string;

    @ApiProperty()
    collection: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    attribute: string;
  }

export class UpdateCustomFieldDto {
    @ApiProperty()
    custom_fields: Array<UpdateCustomFieldItems>
}