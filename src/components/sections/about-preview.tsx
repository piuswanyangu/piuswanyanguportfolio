import Link from "next/link";
import { Container } from "@/components/layout/container";

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-heading"
      className="section-enter border-t border-border py-14 sm:py-18 lg:py-20"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20">
          <div>
            <h2
              id="about-preview-heading"
              className="max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              About Afrinex
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-foreground">
              Afrinex Solutions provides practical digital assistance, data
              services, software development, AI-powered solutions, and automation.
            </p>
            <p className="mt-5 leading-7 text-muted-foreground">
              The company is founded by Pius Wanyangu, a software engineer focused
              on building useful systems and helping people work more effectively
              with technology.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-accent underline decoration-border underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
            >
              About the company
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
