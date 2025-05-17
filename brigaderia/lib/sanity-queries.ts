import { client } from './sanity'
import { Product } from '@/types/types'

export async function getProducts(lang: string): Promise<Product[]> {
  const query = `*[_type == "produto" && idioma == $lang]{
    _id,
    nome,
    preco,
    translationGroupId,
    "imagem": imagem.asset->url
  }`;

  const products = await client.fetch(query, { lang });

  return products.map((product: { _id: string; nome: string; preco: number; imagem: string, translationGroupId: string }) => ({
    _id: product._id,
    name: product.nome,
    price: product.preco,
    translationGroupId: product.translationGroupId,
    image: product.imagem,
  }));
}

export async function getProductByTranslationGroupId(
  groupId: string,
  lang: string
): Promise<Product | null> {
  console.log("lang", lang);
  const query = `*[_type == "produto" && translationGroupId == $groupId && idioma == $lang][0]{
    _id,
    nome,
    preco,
    translationGroupId,
    "imagem": imagem.asset->url
  }`;

  const productData = await client.fetch(query, { groupId, lang });

  if (!productData) return null;

  return {
    _id: productData._id,
    name: productData.nome,
    price: productData.preco,
    image: productData.imagem,
    translationGroupId: productData.translationGroupId
  };
}




