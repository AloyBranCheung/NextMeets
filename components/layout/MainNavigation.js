import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function MainNavigation() {
  const router = useRouter();
  const logoClickHandler = () => {
    router.replace("/");
  };

  return (
    <header className={classes.header}>
      <div onClick={logoClickHandler} className={classes.logo}>
        React Meetups
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
