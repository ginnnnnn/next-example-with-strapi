import { FunctionComponent } from "react";
import Link from "next/link";
import { useUser, useSignOut } from "../hooks/user";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const user = useUser();
  const signOut = useSignOut();

  console.log("[NavBar]: render", user);

  return (
    <nav className="px-2 py-1 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">
            <a>Next Shop</a>
          </Link>
        </li>
        <li role="separator" className="flex-1"></li>
        {user ? (
          <>
            <li>
              <Link href="/cart">
                <a>Cart</a>
              </Link>
            </li>
            <li>{user.name}</li>
            <li>
              <button onClick={signOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">
              <a>Sign In</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
