import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useItemModal } from "@/hooks/use-item-modal";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React, { useState } from "react";
import AlertModal from "../modals/alert-modal";

import { removeData } from "@/firebase/api";
import { ItemColumn } from "@/global.types";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

interface CellActionProps {
  data: ItemColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { setDefaultItem, onOpen, toggleFetch, setToggleFetch } =
    useItemModal();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const openUpdateModal = (data: ItemColumn) => {
    setDefaultItem(data);
    onOpen();
  };

  const onDelete = async () => {
    try {
      if (currentUser) {
        setLoading(true);
        removeData({
          path: `${currentUser.uid}/menu/${data.id}`,
        });
        setToggleFetch(!toggleFetch);
        toast({
          title: "Successfully Removed!",
          description: `Removed ${data.name} from menu.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
