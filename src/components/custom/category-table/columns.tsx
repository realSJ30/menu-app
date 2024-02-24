import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { IOptions } from "@/global.types";

export const columns: ColumnDef<IOptions>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
