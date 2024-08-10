import Guest from "@/Layouts/GuestLayout";

const Show = ({ collectionGroups, product }) => {
  return (
    <Guest collectionGroups={collectionGroups}>
      <div className="p-12">
        <pre>{JSON.stringify(product, null, 2)}</pre>
        <h2>{product.attribute_data.name.en}</h2>
      </div>
    </Guest>
  );
};

export default Show;
