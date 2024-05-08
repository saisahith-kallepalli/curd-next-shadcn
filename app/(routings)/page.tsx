"use client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Product } from "@redux/interfaces/products";
import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, selectProducts } from "@/redux/slices/product";
import Link from "next/link";
import withAuth from "../withAuth";

function Home() {
  const products = useSelector((state: RootState) => selectProducts(state));
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(products);
  }, []);
  return (
    <>
      <div className="w-[90vw] m-auto my-4 flex items-center justify-between">
        <form className="w-[50%]">
          <div className="relative ">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <Link href={"/add-product"}>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </Link>
      </div>
      <div className="m-auto w-[90vw]">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Sales
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products
                  .filter((item) => item.productName.includes(search))
                  ?.map((item: Product) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ₹{item.price}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.sales}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item?.date}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Link href={`/update-product/${item.id}`}>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              onClick={() => {
                                dispatch(removeProduct(item.id));
                              }}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            {/* <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
export default withAuth(Home);
