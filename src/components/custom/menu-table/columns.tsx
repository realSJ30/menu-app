import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { ItemColumn } from "@/global.types";

export const columns: ColumnDef<ItemColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "sizes",
    header: "Size(s)",
  },
  {
    accessorKey: "price",
    header: "Price (PHP)",
    cell: ({ row }) => <p>{row.original.price.toFixed(2)}</p>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
