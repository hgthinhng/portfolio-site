import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GeistSans, GeistMono, sourceSerif } from "@/app/fonts";
import { SiteHeader } from "@/components/layout/site-header";
import { LenisProvider } from "@/components/motion/lenis-provider";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hgthinhng.vercel.app'),
  title: {
    default: 'Hung Thinh Nguyen',
    template: '%s — Hung Thinh Nguyen',
  },
  description:
    'Investment analyst · Systems builder · AI-solutions consultant · Finance educator',
  openGraph: {
    type: 'website',
    siteName: 'Hung Thinh Nguyen',
    title: 'Hung Thinh Nguyen',
    description:
      'Investment analyst · Systems builder · AI-solutions consultant · Finance educator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hung Thinh Nguyen',
    description:
      'Investment analyst · Systems builder · AI-solutions consultant · Finance educator',
  },
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
        <LenisProvider>
          <NextIntlClientProvider messages={messages}>
            <SiteHeader />
            {children}
          </NextIntlClientProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
