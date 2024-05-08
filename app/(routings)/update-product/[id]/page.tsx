"use client";
import withAuth from "@/app/withAuth";
import AddProduct from "@/components/AddProduct";

function Page() {
  return (
    <div>
      <h1 className="text-5xl px-9 pt-7 flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Update Product
      </h1>
      <AddProduct />
    </div>
  );
}
export default withAuth(Page);
