#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p src/services/grpc/auth

# Set environment variables for protoc plugins
export PATH=$PATH:./node_modules/.bin

# Run protoc command with exact versions that match the current frontend-service
protoc \
    --plugin=protoc-gen-grpc-web=./node_modules/.bin/protoc-gen-grpc-web \
    --js_out=import_style=commonjs:./src/services/grpc/auth \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/services/grpc/auth \
    --proto_path=../auth-service/proto \
    ../auth-service/proto/auth.proto

# Create index.ts file
cat > src/services/grpc/auth/index.ts << EOL
import { UsersServiceClient } from './auth_grpc_web_pb';
import {
  LoginRequest,
  LoginResponse,
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  ProtoUser,
} from './auth_pb';

export {
  UsersServiceClient,
  LoginRequest,
  LoginResponse,
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  ProtoUser,
};
EOL
