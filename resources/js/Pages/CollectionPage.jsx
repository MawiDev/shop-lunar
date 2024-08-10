// resources/js/Pages/CollectionPage.jsx

import React from "react";
import { Head, Link } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";

export default function CollectionPage({
  collectionGroups,
  collection,
  collectionProducts,
}) {
  return (
    <Guest collectionGroups={collectionGroups}>
      <Head title={collection.attribute_data.name.en} />
      <div className="p-12">
        <h1 className="text-3xl font-bold mb-4">
          {collection.attribute_data.name.en}
        </h1>
        {collectionProducts.length ? (
          <div>
            {collectionProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.urls[0].slug}`}>
                <img
                  src={product.thumbnail.original_url}
                  alt={product.thumbnail.name}
                  width={300}
                />
                <h2>{product.attribute_data.name.en}</h2>
              </Link>
            ))}
          </div>
        ) : (
          <p>Nessun Prodotto in questa categoria</p>
        )}
      </div>
    </Guest>
  );
}
