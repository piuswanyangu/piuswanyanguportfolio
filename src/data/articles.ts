export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] };

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  status: "draft" | "published";
  coverImage?: { src: string; alt: string; width: number; height: number };
  body: readonly ArticleBlock[];
  relatedServiceSlug: string;
};

export const articles: readonly Article[] = [
  {
    title: "What a small business needs before getting a website",
    slug: "what-a-small-business-needs-before-getting-a-website",
    excerpt: "A practical checklist for preparing your goals, content, and customer journey before website work begins.",
    category: "Websites",
    author: "Pius Wanyangu",
    publishedAt: "2026-09-27",
    status: "draft",
    relatedServiceSlug: "software-development",
    body: [
      { type: "paragraph", text: "A website project becomes easier when the business decisions are clear before design and development begin. You do not need a technical specification, but you should know what the website must help people do." },
      { type: "heading", text: "Start with one primary goal" },
      { type: "paragraph", text: "Decide whether the main goal is to receive enquiries, explain services, show previous work, sell products, or help customers find information. A clear priority keeps the pages and calls to action focused." },
      { type: "heading", text: "Prepare the essentials" },
      { type: "list", items: ["Your business name and a short description", "The services or products you want to present", "Accurate contact details and operating information", "Real photographs, brand files, or examples you are allowed to use", "A simple idea of who the website is for"] },
      { type: "heading", text: "Think through the customer journey" },
      { type: "paragraph", text: "Imagine a first-time visitor. Consider what they need to understand, what may make them hesitate, and the action they should take next. This helps determine the right pages and content." },
      { type: "heading", text: "Agree on ownership and maintenance" },
      { type: "paragraph", text: "Before work starts, clarify who will own the domain, hosting account, website content, and source files. Also decide who will handle future updates so the website remains accurate." },
    ],
  },
  {
    title: "Signs your shop needs a stock and sales management system",
    slug: "signs-your-shop-needs-a-stock-and-sales-management-system",
    excerpt: "Common operational signs that basic notes or disconnected spreadsheets are no longer enough.",
    category: "Business Software",
    author: "Pius Wanyangu",
    publishedAt: "2026-09-27",
    status: "draft",
    relatedServiceSlug: "software-development",
    body: [
      { type: "paragraph", text: "A stock and sales system is useful when daily records are becoming difficult to maintain consistently. The need usually appears through repeated operational problems rather than a single large failure." },
      { type: "heading", text: "Records are spread across several places" },
      { type: "paragraph", text: "If purchases, stock counts, and sales are recorded in different books, phones, or files, checking the current position takes too long and mistakes become harder to trace." },
      { type: "heading", text: "You cannot quickly answer basic questions" },
      { type: "list", items: ["Which products are running low?", "What sold today or this week?", "Which items move slowly?", "Do the recorded quantities match the physical stock?"] },
      { type: "heading", text: "Repeated work is consuming time" },
      { type: "paragraph", text: "Copying the same information into several records, recalculating totals, or preparing reports manually can signal that one consistent workflow would be more practical." },
      { type: "heading", text: "Define the workflow before choosing software" },
      { type: "paragraph", text: "List how stock enters the shop, how sales are recorded, who needs access, and which reports matter. This prevents buying or building features that do not fit the real operation." },
    ],
  },
  {
    title: "How to organize daily sales records in Excel",
    slug: "how-to-organize-daily-sales-records-in-excel",
    excerpt: "A simple structure for keeping sales entries consistent, reviewable, and easier to summarize.",
    category: "Data",
    author: "Pius Wanyangu",
    publishedAt: "2026-09-27",
    status: "draft",
    relatedServiceSlug: "data-entry",
    body: [
      { type: "paragraph", text: "A useful sales sheet should make each transaction easy to record and later review. Consistency matters more than complicated formulas." },
      { type: "heading", text: "Use one row for each sale" },
      { type: "paragraph", text: "Keep headings in the first row and record each sale on a new row. Useful columns may include date, receipt or reference number, product, quantity, unit price, total, payment method, and notes." },
      { type: "heading", text: "Keep formats consistent" },
      { type: "list", items: ["Enter dates in one format", "Use the same product names each time", "Record numbers as numbers rather than adding words", "Leave notes for unusual adjustments instead of changing past entries silently"] },
      { type: "heading", text: "Separate entry from summaries" },
      { type: "paragraph", text: "Keep the daily transaction table as the source record. Build totals or summaries in another sheet so the original entries remain easy to inspect." },
      { type: "heading", text: "Review and back up the file" },
      { type: "paragraph", text: "Check for missing dates, blank totals, duplicate entries, and inconsistent names. Keep a backup in a controlled location and limit editing access to the people who need it." },
    ],
  },
];

export const publishedArticles = articles.filter((article) => article.status === "published");
export function getArticleBySlug(slug: string) { return articles.find((article) => article.slug === slug); }
