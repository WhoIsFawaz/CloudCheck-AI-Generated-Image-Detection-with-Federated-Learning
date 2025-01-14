// @ts-nocheck
import * as jspb from "google-protobuf";

export class LoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): LoginRequest;
  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: LoginRequest
  ): LoginRequest.AsObject;
  static serializeBinaryToWriter(
    message: LoginRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(
    message: LoginRequest,
    reader: jspb.BinaryReader
  ): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    username: string;
    password: string;
  };
}

export class LoginResponse extends jspb.Message {
  getValidated(): boolean;
  setValidated(value: boolean): LoginResponse;
  getAccesstoken(): string;
  setAccesstoken(value: string): LoginResponse;
  getUserid(): number;
  setUserid(value: number): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: LoginResponse
  ): LoginResponse.AsObject;
  static serializeBinaryToWriter(
    message: LoginResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(
    message: LoginResponse,
    reader: jspb.BinaryReader
  ): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    validated: boolean;
    accesstoken: string;
    userid: number;
  };
}

export class CreateUserDto extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): CreateUserDto;
  getName(): string;
  setName(value: string): CreateUserDto;
  getPassword(): string;
  setPassword(value: string): CreateUserDto;
  getEmail(): string;
  setEmail(value: string): CreateUserDto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserDto.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreateUserDto
  ): CreateUserDto.AsObject;
  static serializeBinaryToWriter(
    message: CreateUserDto,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserDto;
  static deserializeBinaryFromReader(
    message: CreateUserDto,
    reader: jspb.BinaryReader
  ): CreateUserDto;
}

export namespace CreateUserDto {
  export type AsObject = {
    username: string;
    name: string;
    password: string;
    email: string;
  };
}

export class UpdateUserDto extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): UpdateUserDto;
  getName(): string;
  setName(value: string): UpdateUserDto;
  getPassword(): string;
  setPassword(value: string): UpdateUserDto;
  getEmail(): string;
  setEmail(value: string): UpdateUserDto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserDto.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: UpdateUserDto
  ): UpdateUserDto.AsObject;
  static serializeBinaryToWriter(
    message: UpdateUserDto,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserDto;
  static deserializeBinaryFromReader(
    message: UpdateUserDto,
    reader: jspb.BinaryReader
  ): UpdateUserDto;
}

export namespace UpdateUserDto {
  export type AsObject = {
    userid: number;
    name: string;
    password: string;
    email: string;
  };
}

export class FindOneUserDto extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): FindOneUserDto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FindOneUserDto.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: FindOneUserDto
  ): FindOneUserDto.AsObject;
  static serializeBinaryToWriter(
    message: FindOneUserDto,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): FindOneUserDto;
  static deserializeBinaryFromReader(
    message: FindOneUserDto,
    reader: jspb.BinaryReader
  ): FindOneUserDto;
}

export namespace FindOneUserDto {
  export type AsObject = {
    userid: number;
  };
}

export class ProtoUser extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): ProtoUser;
  getUsername(): string;
  setUsername(value: string): ProtoUser;
  getName(): string;
  setName(value: string): ProtoUser;
  getEmail(): string;
  setEmail(value: string): ProtoUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProtoUser.AsObject;
  static toObject(includeInstance: boolean, msg: ProtoUser): ProtoUser.AsObject;
  static serializeBinaryToWriter(
    message: ProtoUser,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ProtoUser;
  static deserializeBinaryFromReader(
    message: ProtoUser,
    reader: jspb.BinaryReader
  ): ProtoUser;
}

export namespace ProtoUser {
  export type AsObject = {
    userid: number;
    username: string;
    name: string;
    email: string;
  };
}
