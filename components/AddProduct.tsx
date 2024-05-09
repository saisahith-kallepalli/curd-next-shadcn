"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { Ban, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addProduct, updateProduct, selectProducts } from "@slices/product";
import { Product } from "@redux/interfaces/products";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useParams, usePathname, useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
export default function AddProduct() {
  
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const products = useSelector((state: RootState) => selectProducts(state));
  const [product, setProduct] = useState<Product>({
    id: "",
    productName: "",
    price: 0,
    status: "Active",
    sales: 0,
    date: "",
  });
  const onHandleProduct = () => {
    if (pathName.includes("update-product")) {
      dispatch(
        updateProduct({ ...product, date: new Date().toLocaleString() })
      );
    } else {
      dispatch(
        addProduct({
          ...product,
          id: uuidv4(),
          date: new Date().toLocaleString(),
        })
      );
    }
    router.push("/");
  };
  useEffect(() => {
    if (pathName.includes("update-product")) {
      const id = params.id;
      const product = products.find((product: Product) => product.id === id);
      if (product) {
        setProduct(product);
      }
    }
  }, []);

  return (
    <div className=" grid  sm:grid-cols-1 md:grid-cols-2 gap-5 p-10">
      <Card className="">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Name and Price of the product</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input
            id="name"
            type="text"
            className="w-full h-30"
            placeholder="Product Name"
            required
            value={product.productName}
            onChange={(e) =>
              setProduct((item) => ({ ...item, productName: e.target.value }))
            }
          />
          <Input
            id="price-1"
            type="number"
            placeholder="Product Price"
            className="w-full "
            value={product.price}
            onChange={(e) =>
              setProduct((item) => ({
                ...item,
                price: Number(e.target.value),
              }))
            }
          />
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>Sales</CardTitle>
          <CardDescription>Sales and Status of the product</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Select
            value={product.status}
            onValueChange={(value) =>
              setProduct((item) => ({ ...item, status: value }))
            }>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="InActive">InActive</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            id="sales"
            type="number"
            placeholder="Number of Sales"
            className="w-full "
            value={product.sales}
            onChange={(e) =>
              setProduct((item) => ({
                ...item,
                sales: Number(e.target.value),
              }))
            }
          />
        </CardContent>
      </Card>
      <div className="">
        <Link href="/">
          <Button size="sm" className="h-8 gap-1 ml-3">
            <Ban className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Cancel
            </span>
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 ml-3"
          type="submit"
          onClick={onHandleProduct}>
          <Check className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Submit
          </span>
        </Button>
      </div>
    </div>
  );
}
