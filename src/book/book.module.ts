import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  providers: [BookResolver, BookService],
})
export class BookModule {}
