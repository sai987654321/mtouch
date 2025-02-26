

export default function ProductDetailPage({ product }:any) {

if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="w-full h-full bg-white">
    <div className="w-[80%] h-full mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="border border-gray-300 p-5  bg-white">
          <img src={product.image} alt={""} className="w-full h-auto object-cover " />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-black">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg text-black font-semibold mt-4">Rs {product.price}</p>
        </div>
      </div>
    </div>
    </div>
  );
}
