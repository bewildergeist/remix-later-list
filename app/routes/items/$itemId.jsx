import { useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getRecordById } from "~/helpers/airtable.js";

export async function loader({ params }) {
  const item = await getRecordById(params.itemId);
  return json(item);
}

export default function MoviePage() {
  const item = useLoaderData();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{item.fields.Title}</h1>
      <code>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </code>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="font-bold text-red-500">
      {error.name}: {error.message}
    </h1>
  );
}
