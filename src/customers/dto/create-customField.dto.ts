import { ApiProperty, ApiBody } from "@nestjs/swagger";


class CustomFieldItems{
    @ApiProperty()
    collection: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    attribute: string;
  }

export class CreateCustomFieldDto {
    @ApiProperty()
    custom_fields: Array<CustomFieldItems>
}

