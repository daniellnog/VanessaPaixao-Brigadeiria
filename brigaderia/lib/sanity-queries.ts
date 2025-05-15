import { client } from './sanity'
import { Product } from '@/types/types'

export async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "produto"]{
    _id,
    nome,
    preco,
    "imagem": imagem.asset->url,
    slug
  }`

  const products = await client.fetch(query);

  // Fazendo o mapeamento para o tipo Product
  return products.map((product: { _id: string; nome: string; preco: string; imagem: string; }) => ({
    _id: product._id,
    name: product.nome,  // Mapeando 'nome' para 'name'
    price: product.preco, // Mapeando 'preco' para 'price'
    image: product.imagem,  // Mapeando 'imagem' para 'image'
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const query = `*[_type == "produto" && _id == $id][0]{
    _id,
    nome,
    preco,
    "image": imagem.asset->url
  }`;

  const productData = await client.fetch(query, { id });

  if (!productData) return null;

  const product: Product = {
    _id: productData._id,
    name: productData.nome,
    price: productData.preco,
    image: productData.image,
  };

  return product;
}



