import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { IOptions } from "@/global.types";

interface CategoryTableProps {
  data: IOptions[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  return (
    <>
      <hr />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default CategoryTable;
