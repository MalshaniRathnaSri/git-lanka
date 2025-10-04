export default function Topbar() {
  return (
    <header className="bg-white shadow p-4 flex justify-end">
      <div className="flex items-center gap-4">
        <span className="font-medium">Admin Name</span>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </header>
  );
}
