import { getSession } from "@/lib/Session";
import NavigationLoggedOut from "./NavigationLoggedOut";
import NavigationLoggedIn from "./NavigationLoggedIn";

export default async function NavigationHandler() {
  const session = await getSession();

  return session ? (
    <NavigationLoggedIn session={session} />
  ) : (
    <NavigationLoggedOut />
  );
}