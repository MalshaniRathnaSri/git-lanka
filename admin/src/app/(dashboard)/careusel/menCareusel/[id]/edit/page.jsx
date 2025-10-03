import MenCareuselForm from "@/components/MenCareuselForm"

async function getMenCareusel(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/MenCareusel/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch carousel")
  return res.json()
}

export default async function EditMenCareuselPage({ params }) {
  const { id } = params
  const data = await getMenCareusel(id)

  return (
    <div className="p-6">
      <MenCareuselForm mode="edit" initialData={data} />
    </div>
  )
}
