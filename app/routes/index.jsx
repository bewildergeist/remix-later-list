import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getRecords } from "~/helpers/airtable.js";
import Card from "~/components/Card";

export async function loader({ request }) {
  const records = await getRecords();
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const recordsToShow =
    category === "All" || !category
      ? records
      : records.filter((record) => record.fields.Category === category);
  return json(recordsToShow);
}

export default function Index() {
  const savedItems = useLoaderData();

  return (
    <div>
      <nav className="mb-6 w-full overflow-x-auto whitespace-nowrap text-lg font-semibold shadow-xl">
        <HeaderLink category="All" label="All" />
        <HeaderLink category="Article" label="Articles" />
        <HeaderLink category="Video" label="Videos" />
        <HeaderLink category="Podcast" label="Podcasts" />
        <HeaderLink category="Inspiration" label="Inspiration" />
      </nav>
      {savedItems.length === 0 ? (
        <p className="my-8 text-center text-lg text-slate-500">
          Nothing saved yet
        </p>
      ) : (
        <div className="mx-4 mt-4 mb-8">
          {savedItems.map((item) => {
            return (
              <Card
                key={item.id}
                title={item.fields?.Title}
                href={`/items/${item.id}`}
                imageUrl={item.fields?.Image?.[0]?.url}
                category={item.fields?.Category}
                duration={item.fields?.Duration}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function HeaderLink({ category, label }) {
  return (
    <Link
      className="mx-3 inline-block px-3 py-4 transition-colors hover:text-slate-500"
      to={`?category=${category}`}>
      {label}
    </Link>
  );
}
