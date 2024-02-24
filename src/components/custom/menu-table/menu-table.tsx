import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IOptions, ItemColumn } from "@/global.types";
import React from "react";
import { columns } from "./columns";
import CategoryTable from "../category-table/category-table";
import SizeTable from "../size-table/category-table";

interface MenuTableProps {
  menuItems: ItemColumn[];
  categoryItems: IOptions[];
  sizeItems: IOptions[];
}
const MenuTable: React.FC<MenuTableProps> = ({
  menuItems,
  categoryItems,
  sizeItems,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <Tabs defaultValue="menu" className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="size">Size</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <hr />
          <DataTable searchKey="name" columns={columns} data={menuItems} />
        </TabsContent>
        <TabsContent value="category">
          <CategoryTable data={categoryItems} />
        </TabsContent>
        <TabsContent value="size">
          <SizeTable data={sizeItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuTable;
