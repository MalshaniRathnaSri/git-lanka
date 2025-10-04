// import { FaHome, FaUser, FaInbox , FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 hover:text-blue-600">
          {/* <FaHome />  */}Dashboard
        </Link>
        <Link href="/products" className="flex items-center gap-2 hover:text-blue-600">
          {/* <FaInbox /> Products */}Products
        </Link>
        <Link href="/customers" className="flex items-center gap-2 hover:text-blue-600">
          {/* <FaUser /> Customers */}Customers
        </Link>
        <Link href="/orders" className="flex items-center gap-2 hover:text-blue-600">
          {/* <FaShoppingCart /> Orders */} Orders
        </Link>
      </nav>
    </aside>
  );
}
