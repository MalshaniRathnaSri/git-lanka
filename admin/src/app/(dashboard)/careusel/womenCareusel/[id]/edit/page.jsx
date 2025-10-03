import WomenCareuselForm from "@/components/WomenCareuselForm"

async function getWomenCareusel(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/WomenCareusel/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch carousel")
  return res.json()
}

export default async function EditWomenCareuselPage({ params }) {
  const { id } = params
  const data = await getWomenCareusel(id)

  return (
    <div className="p-6">
      <WomenCareuselForm mode="edit" initialData={data} />
    </div>
  )
}
