import * as grpcWeb from "grpc-web";
import {
  CreateUserDto,
  FindOneUserDto,
  LoginRequest,
  LoginResponse,
  ProtoUser,
  UpdateUserDto,
} from "./auth_pb";

export class UsersServiceClient {
  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  ) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options["format"] = "text";

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError, response: LoginResponse) => void
  ): grpcWeb.ClientReadableStream<LoginResponse> {
    return this.client_.rpcCall(
      this.hostname_ + "/auth.UsersService/Login",
      request,
      metadata || {},
      this.methodDescriptorLogin,
      callback
    );
  }

  createUser(
    request: CreateUserDto,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError, response: ProtoUser) => void
  ): grpcWeb.ClientReadableStream<ProtoUser> {
    return this.client_.rpcCall(
      this.hostname_ + "/auth.UsersService/CreateUser",
      request,
      metadata || {},
      this.methodDescriptorCreateUser,
      callback
    );
  }

  findOneUser(
    request: FindOneUserDto,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError, response: ProtoUser) => void
  ): grpcWeb.ClientReadableStream<ProtoUser> {
    return this.client_.rpcCall(
      this.hostname_ + "/auth.UsersService/FindOneUser",
      request,
      metadata || {},
      this.methodDescriptorFindOneUser,
      callback
    );
  }

  updateUser(
    request: UpdateUserDto,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError, response: ProtoUser) => void
  ): grpcWeb.ClientReadableStream<ProtoUser> {
    return this.client_.rpcCall(
      this.hostname_ + "/auth.UsersService/UpdateUser",
      request,
      metadata || {},
      this.methodDescriptorUpdateUser,
      callback
    );
  }

  removeUser(
    request: FindOneUserDto,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError, response: ProtoUser) => void
  ): grpcWeb.ClientReadableStream<ProtoUser> {
    return this.client_.rpcCall(
      this.hostname_ + "/auth.UsersService/RemoveUser",
      request,
      metadata || {},
      this.methodDescriptorRemoveUser,
      callback
    );
  }

  private client_: grpcWeb.GrpcWebClientBase;
  private hostname_: string;
  private credentials_: { [index: string]: string };
  private options_: { [index: string]: any };

  methodDescriptorLogin = new grpcWeb.MethodDescriptor(
    "/auth.UsersService/Login",
    grpcWeb.MethodType.UNARY,
    LoginRequest,
    LoginResponse,
    (request: LoginRequest) => request.serializeBinary(),
    LoginResponse.deserializeBinary
  );

  methodDescriptorCreateUser = new grpcWeb.MethodDescriptor(
    "/auth.UsersService/CreateUser",
    grpcWeb.MethodType.UNARY,
    CreateUserDto,
    ProtoUser,
    (request: CreateUserDto) => request.serializeBinary(),
    ProtoUser.deserializeBinary
  );

  methodDescriptorFindOneUser = new grpcWeb.MethodDescriptor(
    "/auth.UsersService/FindOneUser",
    grpcWeb.MethodType.UNARY,
    FindOneUserDto,
    ProtoUser,
    (request: FindOneUserDto) => request.serializeBinary(),
    ProtoUser.deserializeBinary
  );

  methodDescriptorUpdateUser = new grpcWeb.MethodDescriptor(
    "/auth.UsersService/UpdateUser",
    grpcWeb.MethodType.UNARY,
    UpdateUserDto,
    ProtoUser,
    (request: UpdateUserDto) => request.serializeBinary(),
    ProtoUser.deserializeBinary
  );

  methodDescriptorRemoveUser = new grpcWeb.MethodDescriptor(
    "/auth.UsersService/RemoveUser",
    grpcWeb.MethodType.UNARY,
    FindOneUserDto,
    ProtoUser,
    (request: FindOneUserDto) => request.serializeBinary(),
    ProtoUser.deserializeBinary
  );
}
