import { ApiProperty } from "@nestjs/swagger";

export class SignInCustomerDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    password: string;
}
