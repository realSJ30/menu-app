import React from "react";
import { useItemModal } from "@/hooks/use-item-modal";
import { Refrigerator, Trash, Pencil } from "lucide-react";
import { ItemColumn } from "@/global.types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface MenuCardProps {
  item: ItemColumn;
  setItemToDelete: React.Dispatch<React.SetStateAction<ItemColumn | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuCard: React.FC<MenuCardProps> = ({
  item,
  setItemToDelete,
  setOpen,
}) => {
  const itemModal = useItemModal();
  const openUpdateModal = (data: ItemColumn) => {
    itemModal.setDefaultItem(data);
    itemModal.onOpen();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <div className="flex flex-col text-sm gap-y-2">
          <p className="text-lg font-semibold text-neutral-600">
            {item.category}
          </p>
          <div className="flex flex-wrap gap-x-1">
            {item.sizes?.map((size) => (
              <Badge key={size} variant="outline">
                {size}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-x-2">
            <Refrigerator size={22} className="text-neutral-500" />
            <p>{item.stock}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex items-center justify-between w-full">
          <p className="text-neutral-400 text-base font-semibold">
            PHP
            <span className="ml-2 text-black text-xl">
              {item.price.toFixed(2)}
            </span>
          </p>
          <div className="flex items-center gap-x-4">
            <Button
              onClick={() => {
                setItemToDelete(item);
                setOpen(true);
              }}
              size="icon"
              variant="destructive"
            >
              <Trash size={18} />
            </Button>
            <Button onClick={() => openUpdateModal(item)} size="icon">
              <Pencil size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
