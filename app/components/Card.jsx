import { Link } from "@remix-run/react";

export default function Card({ title, href, imageUrl, category, duration }) {
  return (
    <article className="my-4 overflow-hidden rounded-lg border border-l-slate-300  bg-white shadow-lg">
      <Link to={href}>
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
      </Link>
    </article>
  );
}
