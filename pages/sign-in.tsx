import { useRouter } from "next/router";

import { FormEventHandler, FunctionComponent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/Page";
import { fetchJson } from "../lib/api";
import { User } from "../lib/user";
import { useSignIn } from "../hooks/user";

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
interface SignInPageProps {}

const SignInPage: FunctionComponent<SignInPageProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // await sleep(2000);
    const isSuccess = await signIn(email, password);
    if (isSuccess) {
      router.push("/");
    }
  };
  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            required={true}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            required={true}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {signInError && <p className="text-red-700">Invalid credentials</p>}
        {signInLoading ? (
          <p className="text-red-700">Loading ...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
};

export default SignInPage;
