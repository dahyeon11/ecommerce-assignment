import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    store: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
