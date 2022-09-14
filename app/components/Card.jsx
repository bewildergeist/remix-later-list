import { Form } from "@remix-run/react";

export default function Card({
  id,
  title,
  href,
  imageUrl,
  category,
  duration,
}) {
  return (
    <article className="relative my-4 max-w-lg overflow-hidden rounded-lg border border-l-slate-300 bg-white shadow-lg">
      <Form method="POST">
        <input type="hidden" name="id" value={id} />
        <button
          name="_action"
          value="delete"
          type="submit"
          title="Delete"
          className="absolute top-2 right-2 text-white opacity-60 transition-all hover:text-red-700 hover:opacity-80">
          <DeleteIcon />
        </button>
      </Form>
      <a href={href}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            width={800}
            className="block w-full"
          />
        ) : null}
        <div className="p-4">
          <h1 className="my-3 text-xl">{title}</h1>
          <div className="text-md flex flex-row items-center justify-between font-sans font-semibold text-slate-500">
            <span>{category}</span>
            <span>{duration} min.</span>
          </div>
        </div>
      </a>
    </article>
  );
}

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6">
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clipRule="evenodd"
      />
    </svg>
  );
}
