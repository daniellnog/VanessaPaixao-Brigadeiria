import { getProductById } from "@/lib/sanity-queries";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  // Destructure the id after awaiting params
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-4">€ {product.price}</p>
        </div>
      </div>
    </div>
  );
}