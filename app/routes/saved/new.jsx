import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { createRecord } from "~/helpers/airtable";

export async function action({ request }) {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData);
  await createRecord({
    ...fields,
    Duration: Number(formData.get("Duration")),
    Image: [
      {
        url: formData.get("Image"),
      },
    ],
  });
  return redirect("/saved");
}

export default function New() {
  return (
    <div className="fixed top-3 left-3 right-3 bottom-3 rounded border border-slate-300 bg-slate-100 p-5 shadow-md">
      <h1 className="mb-4 text-xl font-bold">Save an item</h1>
      <Form method="post">
        <Input type="text" name="Title" placeholder="Title" label="Title" />
        <Input type="text" name="URL" placeholder="URL" label="URL" />
        <Input
          type="text"
          name="Image"
          placeholder="Image URL"
          label="Image URL"
        />
        <Input
          type="number"
          name="Duration"
          placeholder="Duration"
          label="Duration"
        />
        <select name="Category" className="p-3">
          <option>Article</option>
          <option>Video</option>
          <option>Podcast</option>
          <option>Inspiration</option>
        </select>
        <div className="space-between mt-5 flex flex-row">
          <Link
            to="/saved"
            className="rounded border border-slate-400 bg-slate-200 py-2 px-3 shadow-sm">
            Cancel
          </Link>
          <button
            className="ml-3 rounded border border-blue-500 bg-blue-300 py-2 px-3 shadow-md"
            type="submit">
            Create
          </button>
        </div>
      </Form>
    </div>
  );
}

function Input({ type = "text", label, name, title, placeholder }) {
  return (
    <div className="my-4">
      <label for={name} className="mb-1 block font-semibold">
        {label}
      </label>
      <input
        className="w-1/2 rounded border border-slate-200 p-2"
        type={type}
        name={name}
        placeholder={placeholder ?? title}
      />
    </div>
  );
}
