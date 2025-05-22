import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { Books } from 'src/book/entities/book.entity';
import { Users } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Books, Users])],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
