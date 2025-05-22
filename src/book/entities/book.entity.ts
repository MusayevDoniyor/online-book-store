import { ObjectType, Field, Float } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Books {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Book ID' })
  id: string;

  @Column({ nullable: false })
  @Field(() => String, { description: 'Book title' })
  title: string;

  @Column({ nullable: false })
  @Field(() => String, { description: 'Book author' })
  author: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String, { description: 'Book description' })
  description: string;

  @Column({ nullable: false })
  @Field(() => Float, { description: 'Book price' })
  price: number;

  @Column({ default: true })
  @Field(() => Boolean, { description: 'Book available' })
  is_available: Boolean;

  @CreateDateColumn()
  @Field(() => Date, {
    description: 'Book created time',
  })
  created_at: Date;
}
