import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchJson } from "../lib/api";
import { User } from "../lib/user";

const USER_QUERY_KEY = "user";

interface SignInVariables {
  email: string;
  password: string;
}
interface UseSignInResult {
  signIn: (email: string, password: string) => Promise<boolean>;
  signInError: boolean;
  signInLoading: boolean;
}

//sign in
export const useSignIn = (): UseSignInResult => {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, SignInVariables>(
    ({ email, password }) =>
      fetchJson("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
  );
  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (err) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
};
//sign out
export const useSignOut = (): (() => Promise<void>) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson("/api/logout"));
  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData(USER_QUERY_KEY, undefined);
  };
};

//get user with jwt
export const useUser = () => {
  const query = useQuery<User>(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson("/api/user");
      } catch (err) {
        //not signed in
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000,
    }
  );
  return query.data;
};
