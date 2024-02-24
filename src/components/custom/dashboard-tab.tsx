import { IOptions, ItemColumn } from "@/global.types";
import { MenuSquare, TableProperties } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CardList from "./card-list";
import MenuTable from "./menu-table/menu-table";

interface DashboardTabsProps {
  menuItems: ItemColumn[];
  categoryItems: IOptions[];
  sizeItems: IOptions[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  menuItems,
  categoryItems,
  sizeItems,
}) => {
  const formattedMenuItems = menuItems.map((item) => ({
    ...item,
    sizes: item.sizesId.map(
      (id) => sizeItems.find((sizeItem) => sizeItem.id! === id)?.name || ""
    ),
    category:
      categoryItems.find((categoryItem) => categoryItem.id! === item.categoryId)
        ?.name || "",
  }));

  return (
    <Tabs defaultValue="table" className="w-full mt-4">
      <TabsList>
        <TabsTrigger value="table">
          <TableProperties />
        </TabsTrigger>
        <TabsTrigger value="card">
          <MenuSquare />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table">
        <MenuTable
          menuItems={formattedMenuItems}
          categoryItems={categoryItems}
          sizeItems={sizeItems}
        />
      </TabsContent>
      <TabsContent value="card">
        <CardList data={formattedMenuItems} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
