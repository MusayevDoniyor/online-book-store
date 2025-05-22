import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from 'src/common/guards/passport-strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput) {
    const existingUser = await this.userRepo.findOne({
      where: { email: registerInput.email },
    });

    if (existingUser)
      throw new ConflictException(
        `User already exists with this email: ${registerInput.email}`,
      );

    const user = this.userRepo.create(registerInput);

    await this.userRepo.save(user);

    return {
      message: 'User registered successfully',
      user,
    };
  }

  async login(loginInput: LoginInput) {
    const user = await this.userRepo.findOne({
      where: { email: loginInput.email },
    });

    if (!user) throw new UnauthorizedException('User unauthorized');

    const isPasswordValid = await bcrypt.compare(
      loginInput.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException(
        'Invalid credentials. Incorrect user password',
      );

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '12h',
    });

    return {
      message: 'User signed in successfully',
      token,
      user,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
