import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => ID)
  @IsNotEmpty()
  categoryId: number;
}
