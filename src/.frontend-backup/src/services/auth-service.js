import { UsersServiceClient } from "./grpc/auth/auth_grpc_web_pb";
import {
  LoginRequest,
  UpdateUserDto,
  CreateUserDto,
  FindOneUserDto,
} from "./grpc/auth/auth_pb";

const auth_client = new UsersServiceClient(
  `${process.env.REACT_APP_ENVOY_URL}/auth`,
  null,
  null
);

class AuthService {
  login = async (payload) => {
    let message = new LoginRequest();
    message.setUsername(payload.Username);
    message.setPassword(payload.Password);

    return new Promise((resolve, reject) => {
      // gRPC
      auth_client.login(message, null, (err, response) => {
        if (err) {
          // If an error occurs, reject the promise and pass the error to the `.catch()` handler.
          reject(err);
        } else {
          resolve({
            validated: response.getValidated(),
            token: response.getAccesstoken(),
            userid: response.getUserid(),
          });
        }
      });
    });
  };

  register = async (credentials) => {
    let message = new CreateUserDto();
    message.setUsername(credentials.Username);
    message.setName(credentials.Name);
    message.setPassword(credentials.Password);
    message.setEmail(credentials.Email);

    return new Promise((resolve, reject) => {
      // gRPC
      auth_client.createUser(message, null, (err, response) => {
        if (err) {
          // If an error occurs, reject the promise and pass the error to the `.catch()` handler.
          reject(err);
        } else {
          resolve({
            userid: response.getUserid(),
          });
        }
      });
    });
  };

  getProfile = async (payload) => {
    let message = new FindOneUserDto();
    message.setUserid(payload.UserID);

    return new Promise((resolve, reject) => {
      // gRPC
      auth_client.findOneUser(message, null, (err, response) => {
        if (err) {
          // If an error occurs, reject the promise and pass the error to the `.catch()` handler.
          reject(err);
        } else {
          resolve({
            username: response.getUsername(),
            name: response.getName(),
            email: response.getEmail(),
          });
        }
      });
    });
  };

  deleteProfile = async (payload) => {
    let message = new FindOneUserDto();
    message.setUserid(payload.UserID);

    return new Promise((resolve, reject) => {
      // gRPC
      auth_client.removeUser(message, null, (err, response) => {
        if (err) {
          // If an error occurs, reject the promise and pass the error to the `.catch()` handler.
          reject(err);
        } else {
          resolve({
            username: response.getUsername(),
            name: response.getName(),
            email: response.getEmail(),
          });
        }
      });
    });
  };
  
  updateProfile = async (newInfo) => {
    let message = new UpdateUserDto();
    message.setUserid(newInfo.userid);
    if ('name' in newInfo) message.setName(newInfo.name);
    if ('password' in newInfo) message.setPassword(newInfo.password);
    if ('email' in newInfo) message.setEmail(newInfo.email);

    return new Promise((resolve, reject) => {
      // gRPC
      auth_client.updateUser(message, null, (err, response) => {
        if (err) {
          // If an error occurs, reject the promise and pass the error to the `.catch()` handler.
          reject(err);
        } else {
          resolve({
            username: response.getUsername(),
            name: response.getName(),
            email: response.getEmail(),
          });
        }
      });
    });
  };
}

export default new AuthService();
