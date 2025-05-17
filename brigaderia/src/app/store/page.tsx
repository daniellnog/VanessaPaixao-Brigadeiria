import { getProducts } from "@/lib/sanity-queries";
import { cookies } from "next/headers";
import StoreClient from "@/components/store/StoreClient"; // novo componente client-side

export const runtime = "nodejs"; // 👈 Força o ambiente correto

export default async function StorePage() {
  const cookieStore = cookies(); // <- isso é síncrono!
  const lang = cookieStore.get("language")?.value || "pt";

  const products = await getProducts(lang);

  return <StoreClient products={products} />;
}
