import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { IOptions } from "@/global.types";

interface SizeTableProps {
  data: IOptions[];
}

const SizeTable: React.FC<SizeTableProps> = ({ data }) => {
  return (
    <>
      <hr />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default SizeTable;
