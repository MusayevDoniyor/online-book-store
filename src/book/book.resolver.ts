import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Books } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { BookResponse } from './dto/book.response';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Resolver(() => Books)
@UseGuards(GqlAuthGuard)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Mutation(() => BookResponse)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.create(createBookInput);
  }

  @Query(() => [Books], { name: 'books' })
  findAll() {
    return this.bookService.findAll();
  }

  @Query(() => Books, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.bookService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Mutation(() => BookResponse)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput.id, updateBookInput);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Mutation(() => BookResponse)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
