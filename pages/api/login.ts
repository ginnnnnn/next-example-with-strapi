import cookie from "cookie";
import { NextApiHandler } from "next";
import { fetchJson } from "../../lib/api";
import { User } from "../../lib/user";

const { CMS_URL } = process.env;

const LoginHandler: NextApiHandler<User> = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  try {
    const {
      jwt,
      user,
    }: { jwt: string; user: { username: string; id: number } } =
      await fetchJson(`${CMS_URL}/auth/local`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({ identifier: email, password: password }),
      });
    //TODO
    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api",
          httpOnly: true,
        })
      )
      .status(200)
      .json({ id: user.id, name: user.username });
  } catch (err) {
    res.status(401).end();
  }
};

export default LoginHandler;
