import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center bg-neutral-100 text-neutral-900 md:mt-6">
      <h1 className="text-lg underline underline-offset-2 shadow-inner shadow-black px-5 py-2 rounded-md md:mb-6">
        Admin Page
      </h1>
      <p>What Would You Like To Do?</p>
      <div className="flex w-full justify-evenly items-center md:my-6">
        <Link
          className="px-5 py-2 rounded-md bg-green-500 text-white"
          href="/admin/create"
        >
          Create
        </Link>
        <Link
          className="px-5 py-1 rounded-md outline outline-blue-600 outline-offset-2 text-black"
          href="/admin/list"
        >
          List
        </Link>
        <Link
          className="px-5 py-2 rounded-md  bg-blue-500 text-white"
          href="/admin/edit"
        >
          Edit
        </Link>
        <Link
          className="px-5 py-2 rounded-md  bg-red-500 text-white"
          href="/admin/delete"
        >
          Delete
        </Link>
      </div>
    </div>
  );
}
