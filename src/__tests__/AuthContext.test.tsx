// __tests__/AuthContext.test.tsx

import { render, waitFor } from "@testing-library/react";
import { AuthContext, AuthProvider } from "../contexts/userAuth";
import { api } from "../services/api";

jest.mock("../services/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("AuthContext", () => {
  it("should sign in successfully", async () => {
    const signInResponse = {
      data: {
        data: {
          token: "fake-token",
          user: {
            id: "1",
            username: "testuser",
            email: "cuscuz@mailinator.com",
            first_name: "Test",
            last_name: "User",
            is_active: true,
            is_staff: false,
            is_superuser: false,
            last_login: "2021-01-01T00:00:00Z",
            created_at: "2021-01-01T00:00:00Z",
            updated_at: "2021-01-01T00:00:00Z",
          },
        },
      },
    };

    mockedApi.post.mockResolvedValueOnce(signInResponse);

    const { result } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => {
            context?.signIn({
              email: "cuscuz@mailinator.com",
              password: "12345678Aa",
            });
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(result?.current?.isAuthenticated).toBe(true);
      expect(result?.current?.user.email).toBe("cuscuz@mailinator.com");
    });
  });

  it("should handle sign in failure", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    const { result } = render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => {
            context?.signIn({
              email: "cuscuz@mailinator.com",
              password: "wrongpassword",
            });
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(result?.current?.isAuthenticated).toBe(false);
      expect(result?.current?.errorLogin).toBe(true);
    });
  });
});
