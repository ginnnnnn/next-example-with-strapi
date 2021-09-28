import { NextApiHandler } from "next";
import cookie from "cookie";

const logoutHandler: NextApiHandler = (req, res) => {
  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        path: "/api",
        expires: new Date(0),
      })
    )
    .json({});
};

export default logoutHandler;
