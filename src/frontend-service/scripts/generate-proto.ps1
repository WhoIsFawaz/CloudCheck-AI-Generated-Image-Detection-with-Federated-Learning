# Create output directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "src\services\grpc\auth"

# Set environment variables for protoc plugins
$env:PATH = "$env:PATH;$pwd\node_modules\.bin"

# Run protoc command with exact versions that match the current frontend-service
protoc `
    --plugin=protoc-gen-grpc-web=.\node_modules\.bin\protoc-gen-grpc-web.cmd `
    --js_out=import_style=commonjs:.\src\services\grpc\auth `
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:.\src\services\grpc\auth `
    --proto_path=..\auth-service\proto `
    ..\auth-service\proto\auth.proto

# Create index.ts file
$indexContent = @"
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
"@

Set-Content -Path "src\services\grpc\auth\index.ts" -Value $indexContent
