type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeading({
  eyebrow,
  title,
  description,
}: PageHeadingProps) {
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h1 className={`${eyebrow ? "mt-4" : ""} text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl`}>
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
