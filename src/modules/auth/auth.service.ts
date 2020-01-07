import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  static hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      timeCost: 5,
    });
  }

  static verifyPassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  async validateUser({
    email,
    password,
  }: LoginUserDto): Promise<UserEntity | undefined> {
    const user = (await this.userService.findOneBy({
      email,
      password: AuthService.hashPassword(password),
    })) as UserEntity;
    if (!user) {
      return null;
    }
    return user;
  }

  async signUp(userDto: CreateUserDto) {
    const { email, password } = userDto;
    // check that same username not registered
    const existsUser = await this.userService.findOneBy({ email });
    if (!existsUser) {
      const passwordHash = await AuthService.hashPassword(password);
      const user = await this.userService.create({
        ...userDto,
        password: passwordHash,
      });

      return this.signIn({ email: user.email, password });
    } else {
      throw new UnauthorizedException(
        'User with such email already registered',
      );
    }
  }

  async signIn({ email, password }): Promise<{ token: string }> {
    const existsUser = (await this.userService.findOneBy({
      email,
    })) as UserEntity;
    if (!existsUser) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordCorrect = await AuthService.verifyPassword(
      password,
      existsUser.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return {
      token: this.jwtService.sign({ id: existsUser.id }),
    };
  }
}
