import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/redux/interfaces/products";
import {
  addProduct,
  selectProducts,
  updateProduct,
} from "@/redux/slices/product";
import { RootState } from "@/redux/store";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Ban, Check } from "lucide-react";
export function Model(props: {
  id?: string;
  name: string;
  open: boolean;
  onHandleCloseDia: (open: boolean) => void;
}) {
  const { id, name, open, onHandleCloseDia } = props;
  const dispatch = useDispatch();
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
    console.log("first");
    if (id) {
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
    onHandleCloseDia(false);
  };
  useEffect(() => {
    if (id) {
      const product = products.find((product: Product) => product.id === id);
      if (product) {
        setProduct(product);
      }
    }
  }, []);

  return (
    <Dialog open={open}>
      <DialogTrigger className="w-[100%]" asChild>
        <Button
          onClick={() => onHandleCloseDia(true)}
          variant={!id ? "default" : "ghost"}>
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{name} product </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className=" grid  gap-5 p-1 sm:grid-cols-1 md:grid-cols-2 ">
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
                  setProduct((item) => ({
                    ...item,
                    productName: e.target.value,
                  }))
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
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onHandleProduct}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
