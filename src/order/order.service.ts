import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Books } from 'src/book/entities/book.entity';
import { Users } from 'src/auth/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepo: Repository<Orders>,
    @InjectRepository(Books)
    private bookRepo: Repository<Books>,
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
  ) {}

  async create(userId: string, createOrderInput: CreateOrderInput) {
    const user = await this.userRepo.findOneOrFail({
      where: { id: userId },
    });

    const books = await this.bookRepo.findBy({
      id: In(createOrderInput.bookIDs),
    });

    const not_available_books: Books[] = books.filter(
      (book) => !book.is_available,
    );

    if (not_available_books.length > 0)
      throw new BadRequestException(
        `Quyidagi kitoblar mavjud emas: ${not_available_books.map((b) => b.title).join(', ')}`,
      );

    const total_price = books.reduce((sum, books) => sum + books.price, 0);

    const order = this.orderRepo.create({
      user,
      books,
      total_price,
    });

    books.forEach((book) => (book.is_available = false));

    await this.bookRepo.save(books);

    return await this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({
      relations: ['user', 'books'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Orders> {
    return this.orderRepo.findOneOrFail({
      where: { id },
      relations: ['user', 'books'],
    });
  }
}
