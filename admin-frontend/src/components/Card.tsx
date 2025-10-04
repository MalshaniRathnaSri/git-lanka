export default function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center justify-center">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
