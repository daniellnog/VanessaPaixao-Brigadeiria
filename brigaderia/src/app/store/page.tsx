import Link from "next/link";
import { getProducts } from "@/lib/sanity-queries";
import { Product } from "@/types/types";

export default async function StorePage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: Product) => (
        <Link
          key={product._id}
          href={`/products/${product._id}`}
          className="bg-white shadow rounded-2xl p-4 group overflow-hidden cursor-pointer"
        >
          <div className="overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-600">€ {product.price}</p>
        </Link>
      ))}
    </div>
  );
}
