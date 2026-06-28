import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <main className="min-h-dvh grid place-items-center">
      <h1>{t("title")}</h1>
    </main>
  );
}
