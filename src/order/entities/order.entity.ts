import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Users } from 'src/auth/entities/user.entity';
import { Books } from 'src/book/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Orders {
  @Field(() => String, { description: 'Order ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.orders, { eager: true })
  user: Users;

  @Field(() => [Books])
  @ManyToMany(() => Books, { eager: true })
  @JoinTable()
  books: Books[];

  @Field(() => Float)
  @Column({ type: 'float' })
  total_price: number;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;
}
