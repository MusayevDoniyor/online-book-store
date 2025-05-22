import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guards/passport-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
