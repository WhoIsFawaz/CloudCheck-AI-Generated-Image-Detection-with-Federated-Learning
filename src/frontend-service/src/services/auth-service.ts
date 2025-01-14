import { UsersServiceClient } from "./grpc/auth/auth_grpc_web_pb";
import {
  CreateUserDto,
  FindOneUserDto,
  LoginRequest,
  UpdateUserDto,
} from "./grpc/auth/auth_pb";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const DEMO_USER = {
  validated: true,
  token: "demo-token",
  userid: "1",
  username: "johndoe",
  name: "John Doe",
  email: "john@example.com",
};

const client = new UsersServiceClient(
  `${process.env.NEXT_PUBLIC_ENVOY_URL}/auth` || "http://localhost:8080",
  null,
  null
);

interface LoginPayload {
  Username: string;
  Password: string;
}

interface RegisterPayload extends LoginPayload {
  Name: string;
  Email: string;
}

interface ProfilePayload {
  UserID: string | number;
}

interface UpdateProfilePayload {
  userid: string | number;
  name?: string;
  password?: string;
  email?: string;
}

interface ProfileResponse {
  username: string;
  name: string;
  email: string;
}

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_ENVOY_URL}/auth` || "http://localhost:8080";
  }

  private async tryGrpc<T>(
    operation: () => Promise<T>,
    fallback: () => Promise<T>
  ): Promise<T> {
    if (DEMO_MODE) {
      return fallback();
    }

    try {
      return await operation();
    } catch (error) {
      console.warn("gRPC call failed, falling back to REST:", error);
      return fallback();
    }
  }

  login = async (
    payload: LoginPayload
  ): Promise<{
    validated: boolean;
    token: string;
    userid: string;
  }> => {
    return this.tryGrpc(
      // gRPC implementation
      () =>
        new Promise((resolve, reject) => {
          const request = new LoginRequest();
          request.setUsername(payload.Username);
          request.setPassword(payload.Password);

          client.login(request, null, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                validated: response.getValidated(),
                token: response.getAccesstoken(),
                userid: response.getUserid().toString(),
              });
            }
          });
        }),
      // REST fallback
      async () => {
        if (DEMO_MODE) {
          return {
            validated: true,
            token: DEMO_USER.token,
            userid: DEMO_USER.userid,
          };
        }

        const response = await fetch(`${this.baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        return {
          validated: data.validated,
          token: data.token,
          userid: data.userid.toString(),
        };
      }
    );
  };

  register = async (
    credentials: RegisterPayload
  ): Promise<{ userid: string }> => {
    return this.tryGrpc(
      // gRPC implementation
      () =>
        new Promise((resolve, reject) => {
          const request = new CreateUserDto();
          request.setUsername(credentials.Username);
          request.setName(credentials.Name);
          request.setPassword(credentials.Password);
          request.setEmail(credentials.Email);

          client.createUser(request, null, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                userid: response.getUserid().toString(),
              });
            }
          });
        }),
      // REST fallback
      async () => {
        if (DEMO_MODE) {
          return {
            userid: DEMO_USER.userid,
          };
        }

        const response = await fetch(`${this.baseUrl}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        const data = await response.json();
        return {
          userid: data.userid.toString(),
        };
      }
    );
  };

  getProfile = async (payload: ProfilePayload): Promise<ProfileResponse> => {
    return this.tryGrpc(
      // gRPC implementation
      () =>
        new Promise((resolve, reject) => {
          const request = new FindOneUserDto();
          request.setUserid(Number(payload.UserID));

          client.findOneUser(request, null, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                username: response.getUsername(),
                name: response.getName(),
                email: response.getEmail(),
              });
            }
          });
        }),
      // REST fallback
      async () => {
        if (DEMO_MODE) {
          return {
            username: DEMO_USER.username,
            name: DEMO_USER.name,
            email: DEMO_USER.email,
          };
        }

        const response = await fetch(`${this.baseUrl}/api/auth/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ UserID: payload.UserID }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        return response.json();
      }
    );
  };

  deleteProfile = async (payload: ProfilePayload): Promise<ProfileResponse> => {
    return this.tryGrpc(
      // gRPC implementation
      () =>
        new Promise((resolve, reject) => {
          const request = new FindOneUserDto();
          request.setUserid(Number(payload.UserID));

          client.removeUser(request, null, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                username: response.getUsername(),
                name: response.getName(),
                email: response.getEmail(),
              });
            }
          });
        }),
      // REST fallback
      async () => {
        if (DEMO_MODE) {
          return {
            username: DEMO_USER.username,
            name: DEMO_USER.name,
            email: DEMO_USER.email,
          };
        }

        const response = await fetch(
          `${this.baseUrl}/api/auth/profile/delete`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ UserID: payload.UserID }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete profile");
        }

        return response.json();
      }
    );
  };

  updateProfile = async (
    newInfo: UpdateProfilePayload
  ): Promise<ProfileResponse> => {
    return this.tryGrpc(
      // gRPC implementation
      () =>
        new Promise((resolve, reject) => {
          const request = new UpdateUserDto();
          request.setUserid(Number(newInfo.userid));
          if (newInfo.name) request.setName(newInfo.name);
          if (newInfo.password) request.setPassword(newInfo.password);
          if (newInfo.email) request.setEmail(newInfo.email);

          client.updateUser(request, null, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                username: response.getUsername(),
                name: response.getName(),
                email: response.getEmail(),
              });
            }
          });
        }),
      // REST fallback
      async () => {
        if (DEMO_MODE) {
          return {
            username: DEMO_USER.username,
            name: newInfo.name || DEMO_USER.name,
            email: newInfo.email || DEMO_USER.email,
          };
        }

        const response = await fetch(
          `${this.baseUrl}/api/auth/profile/update`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newInfo),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        return response.json();
      }
    );
  };
}

export default new AuthService();
