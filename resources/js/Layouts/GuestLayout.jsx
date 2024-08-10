import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children, collectionGroups }) {
  return (
    <>
      <nav className="flex justify-between gap-6 items-center px-6 border-b-2">
        <h1 className="text-2xl">Macraman</h1>
        <div className="flex">
          {collectionGroups.map((collecGroup) => {
            // Filtra le collezioni per il gruppo corrente
            const filteredCollections = collecGroup.collections;

            return (
              <div key={collecGroup.id} className="group relative">
                <button
                  className={`flex justify-center w-full px-12 py-4 text-sm font-medium text-gray-700 hover:underline ${filteredCollections.length > 0 ? "cursor-default" : null}`}
                >
                  {collecGroup.name}
                </button>

                {filteredCollections.length > 0 && (
                  <div className="hidden group-hover:block absolute bg-white z-10 w-full ring-1 ring-black ring-opacity-5">
                    <ul className="py-1">
                      {filteredCollections.map((collection) => (
                        <li key={collection.id}>
                          <Link
                            href={`/collection/${collection.slug}`} // Usa lo slug per il link
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {collection.name}{" "}
                            {/* Mostra il nome della collezione */}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <p>login</p>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
