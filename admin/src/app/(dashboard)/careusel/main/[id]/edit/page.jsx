import MainCareuselForm from "@/components/MainCareuselForm"

async function getMainCareusel(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/MainCareusel/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch carousel")
  return res.json()
}

export default async function EditMainCareuselPage({ params }) {
  const { id } = params
  const data = await getMainCareusel(id)

  return (
    <div className="p-6">
      <MainCareuselForm mode="edit" initialData={data} />
    </div>
  )
}
