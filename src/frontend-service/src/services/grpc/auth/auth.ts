// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.29.0
// source: auth.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface UpdateUserDto {
  UserID: number;
  Name?: string | undefined;
  Password?: string | undefined;
  Email?: string | undefined;
}

export interface FindOneUserDto {
  UserID: number;
}

export interface Empty {
}

export interface LoginRequest {
  Username: string;
  Password: string;
}

export interface LoginResponse {
  Validated: boolean;
  AccessToken: string;
  UserID: number;
}

export interface Users {
  users: ProtoUser[];
}

export interface CreateUserDto {
  Username: string;
  Name: string;
  Password: string;
  Email: string;
}

export interface ProtoUser {
  UserID: number;
  Username: string;
  Name: string;
  Email: string;
}

function createBaseUpdateUserDto(): UpdateUserDto {
  return { UserID: 0, Name: undefined, Password: undefined, Email: undefined };
}

export const UpdateUserDto = {
  encode(message: UpdateUserDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UserID !== 0) {
      writer.uint32(8).int32(message.UserID);
    }
    if (message.Name !== undefined) {
      writer.uint32(18).string(message.Name);
    }
    if (message.Password !== undefined) {
      writer.uint32(26).string(message.Password);
    }
    if (message.Email !== undefined) {
      writer.uint32(34).string(message.Email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.UserID = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.Name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.Password = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.Email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserDto {
    return {
      UserID: isSet(object.UserID) ? globalThis.Number(object.UserID) : 0,
      Name: isSet(object.Name) ? globalThis.String(object.Name) : undefined,
      Password: isSet(object.Password) ? globalThis.String(object.Password) : undefined,
      Email: isSet(object.Email) ? globalThis.String(object.Email) : undefined,
    };
  },

  toJSON(message: UpdateUserDto): unknown {
    const obj: any = {};
    if (message.UserID !== 0) {
      obj.UserID = Math.round(message.UserID);
    }
    if (message.Name !== undefined) {
      obj.Name = message.Name;
    }
    if (message.Password !== undefined) {
      obj.Password = message.Password;
    }
    if (message.Email !== undefined) {
      obj.Email = message.Email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserDto>, I>>(base?: I): UpdateUserDto {
    return UpdateUserDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserDto>, I>>(object: I): UpdateUserDto {
    const message = createBaseUpdateUserDto();
    message.UserID = object.UserID ?? 0;
    message.Name = object.Name ?? undefined;
    message.Password = object.Password ?? undefined;
    message.Email = object.Email ?? undefined;
    return message;
  },
};

function createBaseFindOneUserDto(): FindOneUserDto {
  return { UserID: 0 };
}

export const FindOneUserDto = {
  encode(message: FindOneUserDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UserID !== 0) {
      writer.uint32(8).int32(message.UserID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FindOneUserDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFindOneUserDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.UserID = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FindOneUserDto {
    return { UserID: isSet(object.UserID) ? globalThis.Number(object.UserID) : 0 };
  },

  toJSON(message: FindOneUserDto): unknown {
    const obj: any = {};
    if (message.UserID !== 0) {
      obj.UserID = Math.round(message.UserID);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FindOneUserDto>, I>>(base?: I): FindOneUserDto {
    return FindOneUserDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FindOneUserDto>, I>>(object: I): FindOneUserDto {
    const message = createBaseFindOneUserDto();
    message.UserID = object.UserID ?? 0;
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseLoginRequest(): LoginRequest {
  return { Username: "", Password: "" };
}

export const LoginRequest = {
  encode(message: LoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Username !== "") {
      writer.uint32(10).string(message.Username);
    }
    if (message.Password !== "") {
      writer.uint32(18).string(message.Password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.Username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.Password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginRequest {
    return {
      Username: isSet(object.Username) ? globalThis.String(object.Username) : "",
      Password: isSet(object.Password) ? globalThis.String(object.Password) : "",
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    if (message.Username !== "") {
      obj.Username = message.Username;
    }
    if (message.Password !== "") {
      obj.Password = message.Password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginRequest>, I>>(base?: I): LoginRequest {
    return LoginRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(object: I): LoginRequest {
    const message = createBaseLoginRequest();
    message.Username = object.Username ?? "";
    message.Password = object.Password ?? "";
    return message;
  },
};

function createBaseLoginResponse(): LoginResponse {
  return { Validated: false, AccessToken: "", UserID: 0 };
}

export const LoginResponse = {
  encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Validated !== false) {
      writer.uint32(8).bool(message.Validated);
    }
    if (message.AccessToken !== "") {
      writer.uint32(18).string(message.AccessToken);
    }
    if (message.UserID !== 0) {
      writer.uint32(24).int32(message.UserID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.Validated = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.AccessToken = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.UserID = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginResponse {
    return {
      Validated: isSet(object.Validated) ? globalThis.Boolean(object.Validated) : false,
      AccessToken: isSet(object.AccessToken) ? globalThis.String(object.AccessToken) : "",
      UserID: isSet(object.UserID) ? globalThis.Number(object.UserID) : 0,
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    if (message.Validated !== false) {
      obj.Validated = message.Validated;
    }
    if (message.AccessToken !== "") {
      obj.AccessToken = message.AccessToken;
    }
    if (message.UserID !== 0) {
      obj.UserID = Math.round(message.UserID);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginResponse>, I>>(base?: I): LoginResponse {
    return LoginResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginResponse>, I>>(object: I): LoginResponse {
    const message = createBaseLoginResponse();
    message.Validated = object.Validated ?? false;
    message.AccessToken = object.AccessToken ?? "";
    message.UserID = object.UserID ?? 0;
    return message;
  },
};

function createBaseUsers(): Users {
  return { users: [] };
}

export const Users = {
  encode(message: Users, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      ProtoUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Users {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUsers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(ProtoUser.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Users {
    return {
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => ProtoUser.fromJSON(e)) : [],
    };
  },

  toJSON(message: Users): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => ProtoUser.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Users>, I>>(base?: I): Users {
    return Users.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Users>, I>>(object: I): Users {
    const message = createBaseUsers();
    message.users = object.users?.map((e) => ProtoUser.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateUserDto(): CreateUserDto {
  return { Username: "", Name: "", Password: "", Email: "" };
}

export const CreateUserDto = {
  encode(message: CreateUserDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Username !== "") {
      writer.uint32(10).string(message.Username);
    }
    if (message.Name !== "") {
      writer.uint32(18).string(message.Name);
    }
    if (message.Password !== "") {
      writer.uint32(26).string(message.Password);
    }
    if (message.Email !== "") {
      writer.uint32(34).string(message.Email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.Username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.Name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.Password = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.Email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateUserDto {
    return {
      Username: isSet(object.Username) ? globalThis.String(object.Username) : "",
      Name: isSet(object.Name) ? globalThis.String(object.Name) : "",
      Password: isSet(object.Password) ? globalThis.String(object.Password) : "",
      Email: isSet(object.Email) ? globalThis.String(object.Email) : "",
    };
  },

  toJSON(message: CreateUserDto): unknown {
    const obj: any = {};
    if (message.Username !== "") {
      obj.Username = message.Username;
    }
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.Password !== "") {
      obj.Password = message.Password;
    }
    if (message.Email !== "") {
      obj.Email = message.Email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateUserDto>, I>>(base?: I): CreateUserDto {
    return CreateUserDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateUserDto>, I>>(object: I): CreateUserDto {
    const message = createBaseCreateUserDto();
    message.Username = object.Username ?? "";
    message.Name = object.Name ?? "";
    message.Password = object.Password ?? "";
    message.Email = object.Email ?? "";
    return message;
  },
};

function createBaseProtoUser(): ProtoUser {
  return { UserID: 0, Username: "", Name: "", Email: "" };
}

export const ProtoUser = {
  encode(message: ProtoUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.UserID !== 0) {
      writer.uint32(8).int32(message.UserID);
    }
    if (message.Username !== "") {
      writer.uint32(18).string(message.Username);
    }
    if (message.Name !== "") {
      writer.uint32(26).string(message.Name);
    }
    if (message.Email !== "") {
      writer.uint32(34).string(message.Email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtoUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtoUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.UserID = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.Username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.Name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.Email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProtoUser {
    return {
      UserID: isSet(object.UserID) ? globalThis.Number(object.UserID) : 0,
      Username: isSet(object.Username) ? globalThis.String(object.Username) : "",
      Name: isSet(object.Name) ? globalThis.String(object.Name) : "",
      Email: isSet(object.Email) ? globalThis.String(object.Email) : "",
    };
  },

  toJSON(message: ProtoUser): unknown {
    const obj: any = {};
    if (message.UserID !== 0) {
      obj.UserID = Math.round(message.UserID);
    }
    if (message.Username !== "") {
      obj.Username = message.Username;
    }
    if (message.Name !== "") {
      obj.Name = message.Name;
    }
    if (message.Email !== "") {
      obj.Email = message.Email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProtoUser>, I>>(base?: I): ProtoUser {
    return ProtoUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProtoUser>, I>>(object: I): ProtoUser {
    const message = createBaseProtoUser();
    message.UserID = object.UserID ?? 0;
    message.Username = object.Username ?? "";
    message.Name = object.Name ?? "";
    message.Email = object.Email ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}