import Guest from "@/Layouts/GuestLayout";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ collectionGroups }) {
  return (
    <Guest collectionGroups={collectionGroups}>
      <Head title="Home" />
      <div className="p-12">
        <h1>Homepage</h1>
      </div>
    </Guest>
  );
}
