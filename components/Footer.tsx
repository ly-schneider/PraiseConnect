import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background text-text pt-2 px-6">
      <ul className="flex items-center justify-between">
        <li>
          <Link href="/impressum" className="text text-muted underline">
            Impressum
          </Link>
        </li>
        <li>
          <Link
            href="/datenschutzrichtlinien"
            className="text text-muted underline"
          >
            Datenschutz
          </Link>
        </li>
        <li>
          <p
            className="text text-muted text-xs"
          >
            © {new Date().getFullYear()} PraiseConnect
          </p>
        </li>
      </ul>
    </footer>
  );
}
