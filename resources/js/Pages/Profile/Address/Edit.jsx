import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

const Edit = ({ auth, countries, states, address }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [formData, setFormData] = useState({
    id: address.id,
    customer_id: address.customer_id,
    title: address.title || "",
    first_name: auth.user.name || "",
    last_name: address.last_name || "",
    contact_email: auth.user.email || "",
    contact_phone: address.contact_phone || "",
    line_one: address.line_one || "",
    line_two: address.line_two || "",
    line_three: address.line_three || "",
    city: address.city || "",
    postcode: address.postcode || "",
    country: address.country || "",
    state: address.state || "",
    delivery_instructions: address.delivery_instructions || "",
  });

  // Gestisce il cambiamento del paese e aggiorna gli stati filtrati
  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    setFormData({ ...formData, country: countryId });
    const statesForCountry = states.filter(
      (state) => state.country_id === parseInt(countryId),
    );
    setFilteredStates(statesForCountry);
  };

  // Gestisce il cambiamento di tutti i campi del modulo
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestisce l'invio del modulo
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    router.patch(route("address.update"), formData);
  };

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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start gap-6"
            >
              <div>
                <InputLabel
                  htmlFor="personal_data"
                  value={"Personal information:"}
                />
                <div className="flex justify-start gap-6 mt-4">
                  <select
                    name="title"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    onChange={handleInputChange}
                    value={formData.title}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                  </select>
                  <TextInput
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-start gap-6 mt-4">
                  <TextInput
                    name="contact_email"
                    type="email"
                    placeholder="Email"
                    value={formData.contact_email}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="contact_phone"
                    type="text"
                    placeholder="Phone number"
                    value={formData.contact_phone}
                    onChange={handleInputChange}
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
                    value={formData.line_one}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="line_two"
                    type="text"
                    placeholder="Address 2"
                    value={formData.line_two}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="line_three"
                    type="text"
                    placeholder="Address 3"
                    value={formData.line_three}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-start gap-6 mt-4">
                  <TextInput
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="postcode"
                    type="text"
                    placeholder="Postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                  />
                  <select
                    name="country"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-60"
                    onChange={handleCountryChange}
                    value={formData.country}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="state"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    {filteredStates.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-start gap-6 mt-4">
                  <textarea
                    name="delivery_instructions"
                    placeholder="Delivery instructions"
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    value={formData.delivery_instructions}
                    onChange={handleInputChange}
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
