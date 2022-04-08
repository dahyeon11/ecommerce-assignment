import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order {
    @Prop()
    id: string;
    
    @Prop()
    store: string;

    @Prop()
    status: string;

    @Prop()
    customer: string;

    @Prop()
    products: string[];

    @Prop()
    price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order)