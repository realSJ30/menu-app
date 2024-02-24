import React, { useEffect, useState } from "react";

import AlertModal from "@/components/custom/modals/alert-modal";
import { Input } from "@/components/ui/input";
import { removeData } from "@/firebase/api";
import { ItemColumn } from "@/global.types";
import { useItemModal } from "@/hooks/use-item-modal";
import { useToast } from "../ui/use-toast";
import SkeletonList from "./skeleton-list";
import MenuCard from "./menu-card";
import { ScrollArea } from "../ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";

interface CardListProps {
  data: ItemColumn[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const itemModal = useItemModal();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState<ItemColumn[]>([]);
  const [itemToDelete, setItemToDelete] = useState<ItemColumn | null>(null);

  const onDelete = async () => {
    try {
      if (currentUser) {
        if (itemToDelete) {
          setLoading(true);
          removeData({
            path: `${currentUser.uid}/menu/${itemToDelete.id}`,
          });
          itemModal.setToggleFetch(!itemModal.toggleFetch);
          toast({
            title: "Successfully Removed!",
            description: `Removed ${itemToDelete.name} from menu.`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    if (filter) {
      const filteredData = data.filter((menu) =>
        menu.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredMenuItems(filteredData);
    } else {
      setFilteredMenuItems(data);
    }
  };

  useEffect(() => {
    setFilteredMenuItems(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-y-6 mt-4">
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <Input
        onChange={handleFilter}
        placeholder="Search"
        className="w-full md:w-auto md:max-w-[350px]"
      />
      <hr />
      <ScrollArea className="w-full h-[850px] p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <SkeletonList length={10} />
          ) : filteredMenuItems.length === 0 ? (
            <div className="col-span-12 flex items-center justify-center ">
              <p className="text-center">No Result.</p>
            </div>
          ) : (
            filteredMenuItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                setItemToDelete={setItemToDelete}
                setOpen={setOpen}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardList;
