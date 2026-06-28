import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GeistSans, GeistMono, sourceSerif } from "@/app/fonts";
import { SiteHeader } from "@/components/layout/site-header";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Hung Thinh Nguyen",
  description: "Investment analyst · Systems builder · AI-solutions consultant · Finance educator",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable} ${sourceSerif.variable}`}>
      <body className="font-sans bg-bg text-fg">
        <SiteHeader />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
