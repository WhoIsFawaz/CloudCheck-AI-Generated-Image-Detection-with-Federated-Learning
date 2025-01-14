import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { UpdateUserDto, LoginResponse, ProtoUser, Users } from 'proto/auth';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  parseProtouser(data: User): ProtoUser {
    return {
      UserID: data.UserID,
      Username: data.Username,
      Name: data.Name,
      Email: data.Email,
    };
  }

  parseProtouserArray(data: User[]): Users {
    const protoUsers: ProtoUser[] = data.map((user) => ({
      UserID: user.UserID,
      Username: user.Username,
      Name: user.Name,
      Email: user.Email,
    }));

    return {
      users: protoUsers,
    };
  }

  async create(data: Prisma.UserCreateInput): Promise<ProtoUser> {
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        Password: hashedPassword
      },
    });

    return this.parseProtouser(user);
  }

  async findAll(): Promise<Users> {
    return this.parseProtouserArray(await this.prisma.user.findMany());
  }

  async findOne(
    UserID: Prisma.UserWhereUniqueInput,
  ): Promise<ProtoUser | null> {
    const user = await this.prisma.user.findUnique({
      where: UserID,
    });

    return user ? this.parseProtouser(user) : null;
  }

  async update(
    UserID: Prisma.UserWhereUniqueInput,
    UpdateUserDto: UpdateUserDto,
  ): Promise<ProtoUser> {
    return this.parseProtouser(
      await this.prisma.user.update({
        where: UserID,
        data: UpdateUserDto,
      }),
    );
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<ProtoUser> {
    return this.parseProtouser(
      await this.prisma.user.delete({
        where,
      }),
    );
  }

  async validateUser(
    Username: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        Username: Username,
      },
    });

    if (user && (await bcrypt.compare(password, user.Password))) {
      // bcrypt for password hashing
      const payload = { Username: user.Username, sub: user.UserID };
      return {
        Validated: true,
        AccessToken: await this.jwtService.signAsync(payload),
        UserID: user.UserID,
      };
    }
    return {
      Validated: false,
      AccessToken: '-1',
      UserID: -1,
    };
  }
}
