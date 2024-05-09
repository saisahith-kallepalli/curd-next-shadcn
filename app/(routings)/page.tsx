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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Model } from "@/components/Model";

function Home() {
  const products = useSelector((state: RootState) => selectProducts(state));
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const onHandleCloseDia = (open: boolean) => {
    setOpen(open);
  };
  const handlePagination = () => {
    if (page * 10 < products.length) {
      setPage((p) => p + 1);
    } else {
      setPage((p) => (p <= 1 ? p : p - 1));
    }
  };
  useEffect(() => {
    console.log(products);
  }, []);
  const pageNumbers = () => {
    const numberPages = [];
    for (let i = 1; i <= Math.ceil(products.length % 10) + 1; i++) {
      numberPages.push(
        <PaginationItem>
          <PaginationLink href="#">{i}</PaginationLink>
        </PaginationItem>
      );
    }
    return numberPages;
  };
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
        {/* <PlusCircle className="h-3.5 w-3.5" /> */}
        <Model
          name="Add Product"
          open={open}
          onHandleCloseDia={onHandleCloseDia}
        />
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
                  .slice((page - 1) * 10, page * 10)
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
                            <DropdownMenuLabel>
                              <Model
                                id={item.id}
                                name="Edit"
                                open={open}
                                onHandleCloseDia={onHandleCloseDia}
                              />
                            </DropdownMenuLabel>

                            <DropdownMenuItem
                              className="mx-3 h-10 mb-2"
                              onClick={() => {
                                dispatch(removeProduct(item.id));
                              }}>
                              <Button variant="ghost" className="">
                                Delete
                              </Button>
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
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                {pageNumbers()}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={handlePagination} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
export default withAuth(Home);
