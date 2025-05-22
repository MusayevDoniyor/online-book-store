import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'Book title' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;

  @Field(() => String, { description: 'Book author' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  author: string;

  @Field(() => String, { description: 'Book description' })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  description: string;

  @Field(() => Number, { description: 'Book price' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
