import { Field, ObjectType } from '@nestjs/graphql';
import { Books } from '../entities/book.entity';

@ObjectType()
export class BookResponse {
  @Field(() => String, { description: 'Book response description' })
  message: string;

  @Field(() => Books, { description: 'Book response data' })
  book: Books;
}
