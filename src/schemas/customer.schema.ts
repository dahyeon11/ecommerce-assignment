import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
    @Prop()
    id: string;
    
    @Prop()
    store: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    custom_fields_list: Array<object>;

    @Prop()
    custom_fields: Array<object>;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer)