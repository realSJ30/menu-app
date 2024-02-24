import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import AlertModal from "../modals/alert-modal";

import { removeData } from "@/firebase/api";
import { IOptions, ItemColumn } from "@/global.types";
import { useSizeModal } from "@/hooks/use-size-modal";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebase/firebase.config";
import { useItemModal } from "@/hooks/use-item-modal";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

interface CellActionProps {
  data: IOptions;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { currentUser } = useAuth();
  const itemModal = useItemModal();
  const { toast } = useToast();
  const { setDefaultSize, onOpen, toggleFetch, setToggleFetch } =
    useSizeModal();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ItemColumn[]>([]);

  const openUpdateModal = (data: IOptions) => {
    setDefaultSize(data);
    onOpen();
  };

  const onDelete = async () => {
    try {
      const isUsedInItems = items.find((item) =>
        item.sizesId.includes(data.id!)
      );
      if (!isUsedInItems) {
        setLoading(true);
        removeData({
          path: `${currentUser?.uid}/size/${data.id}`,
        });
        setToggleFetch(!toggleFetch);
        toast({
          title: "Successfully Removed!",
          description: `Removed ${data.name} in sizes.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error Occured!",
          description: `Cannot remove ${data.name} as it is being used.`,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const menuItemsRef = ref(db, `${currentUser?.uid}/menu`);
    onValue(menuItemsRef, (snapshot) => {
      const formattedMenuItems: ItemColumn[] = [];
      const menuItems = snapshot.val();
      // eslint-disable-next-line prefer-const
      for (let id in menuItems) {
        formattedMenuItems.push({
          id,
          ...menuItems[id],
        });
      }
      setItems(formattedMenuItems.reverse());
    });
    return () => {
      setItems([]);
    };
  }, [itemModal.toggleFetch]);

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openUpdateModal(data)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <div className="flex text-red-600 hover:text-red-700">
              <Trash className="mr-2 h-4 w-4" />
              Remove
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
