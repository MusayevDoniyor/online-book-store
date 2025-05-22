import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Repository } from 'typeorm';
import { Books } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookResponse } from './dto/book.response';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Books)
    private bookRepo: Repository<Books>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<BookResponse> {
    const book = this.bookRepo.create(createBookInput);
    await this.bookRepo.save(book);

    return {
      message: 'Book created successfully 📚',
      book,
    };
  }

  async findAll() {
    const books: Books[] = await this.bookRepo.find();
    return books.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  }

  async findOne(id: string) {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(
    id: string,
    updateBookInput: UpdateBookInput,
  ): Promise<BookResponse> {
    const book = await this.findOne(id);

    const isEmpty = Object.keys(updateBookInput).length === 0;
    if (isEmpty) {
      return {
        message: 'Nothing to update ⚠️',
        book,
      };
    }

    Object.assign(book, updateBookInput);

    await this.bookRepo.save(book);

    return {
      message: 'Book updated successfully ✅',
      book,
    };
  }

  async remove(id: string): Promise<BookResponse> {
    const book = await this.findOne(id);

    await this.bookRepo.remove(book);

    return {
      message: 'Book deleted successfully',
      book,
    };
  }
}
