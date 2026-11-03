import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Icon } from "@/components/ui/icons";
import { siteConfig, serviceGroupHref } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-surface-muted">
      <div aria-hidden="true" className="absolute -right-32 -top-32 size-[30rem] rounded-full bg-accent-soft opacity-70 blur-3xl" />
      <Container className="relative py-20 text-center sm:py-28">
        <p aria-hidden="true" className="text-[6rem] font-bold leading-none tracking-[-0.05em] text-accent sm:text-[9rem]">
          404
        </p>
        <p className="eyebrow mt-4">Page not found</p>
        <h1 className="display-1 mx-auto mt-3 max-w-2xl">This page could not be found.</h1>
        <p className="lead mx-auto mt-5 max-w-xl">
          The page you requested does not exist, or it has moved. Head back home or explore what Afrinex can help with.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/services" className="btn btn-outline">Explore Services</Link>
        </div>

        <nav aria-label="Service groups" className="mx-auto mt-14 max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {siteConfig.serviceGroups.map((group) => (
              <li key={group.id}>
                <Link
                  href={serviceGroupHref(group.id)}
                  className="card card-lift flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-foreground hover:text-accent"
                >
                  {group.category}
                  <Icon name="arrowRight" className="size-4 shrink-0 text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
