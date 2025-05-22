import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => [String], {
    description: 'Book IDs',
  })
  bookIDs: string[];
}
