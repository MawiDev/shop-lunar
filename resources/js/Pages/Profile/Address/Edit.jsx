import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Edit = ({ auth }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Address
        </h2>
      }
    >
      <Head title="Address" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <form className="flex flex-col items-start gap-6">
              <div>
                <InputLabel
                  htmlFor="personal_data"
                  value={"Personal information:"}
                />
                <div className="flex justify-start gap-6 mt-4">
                  <select
                    name="title"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                  </select>
                  <TextInput
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    defaultValue={auth.user.name}
                  />
                  <TextInput
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                  />
                </div>
                <div className="flex justify-start gap-6 mt-4">
                  <TextInput
                    name="contact_email"
                    type="email"
                    placeholder="Email"
                    defaultValue={auth.user.email}
                  />
                  <TextInput
                    name="contact_phone"
                    type="text"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div>
                <InputLabel
                  htmlFor="address_data"
                  value={"Shipping address:"}
                />
                <div className="flex justify-start gap-6 mt-4">
                  <TextInput
                    name="line_one"
                    type="text"
                    placeholder="Address 1"
                  />
                  <TextInput
                    name="line_two"
                    type="text"
                    placeholder="Address 2"
                  />
                  <TextInput
                    name="line_three"
                    type="text"
                    placeholder="Address 3"
                  />
                </div>
                <div className="flex justify-start gap-6 mt-4">
                  <TextInput name="city" type="text" placeholder="City" />
                  <TextInput
                    name="postcode"
                    type="number"
                    placeholder="postcode"
                  />
                </div>
                <div className="flex justify-start gap-6 mt-4">
                  <textarea
                    name="delivery_istructions"
                    type="text"
                    placeholder="Delivery istructions"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
