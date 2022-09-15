import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getRecords, deleteRecordById } from "~/helpers/airtable.js";
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

export async function action({ request }) {
  const formData = await request.formData();
  if (formData.get("_action") === "delete") {
    try {
      await deleteRecordById(formData.get("id"));
    } catch (error) {
      console.error(error);
    }
  }
  return null;
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
                id={item.id}
                title={item.fields?.Title}
                href={item.fields?.URL}
                imageUrl={item.fields?.Image?.[0]?.url}
                category={item.fields?.Category}
                duration={item.fields?.Duration}
              />
            );
          })}
        </div>
      )}
      <Outlet />
      <Link
        to="new"
        className="absolute bottom-3 right-3 rounded-full border border-amber-400 bg-yellow-200 p-6 shadow-lg transition-colors hover:bg-yellow-300">
        <AddIcon />
      </Link>
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

function AddIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
