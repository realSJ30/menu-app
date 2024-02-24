import { db } from "@/firebase/firebase.config";
import { onValue, ref } from "firebase/database";
import { Box, List, Plus, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

import DashboardTabs from "@/components/custom/dashboard-tab";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { IOptions, ItemColumn } from "@/global.types";
import { useAuth } from "@/hooks/use-auth";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { useItemModal } from "@/hooks/use-item-modal";
import { useSizeModal } from "@/hooks/use-size-modal";
import ModalProviders from "@/providers/modal.provider";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const itemModal = useItemModal();
  const categoryModal = useCategoryModal();
  const sizeModal = useSizeModal();
  const [items, setItems] = useState<ItemColumn[]>([]);
  const [categories, setCategories] = useState<IOptions[]>([]);
  const [sizes, setSizes] = useState<IOptions[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categoryRef = ref(db, `${currentUser!.uid}/categories`);
    const formattedCategories: IOptions[] = [];
    onValue(categoryRef, (snapshot) => {
      const categoriesItems = snapshot.val();
      // eslint-disable-next-line prefer-const
      for (let id in categoriesItems) {
        formattedCategories.push({ id, ...categoriesItems[id] });
      }
      setCategories(formattedCategories.reverse());
    });
  }, [categoryModal.toggleFetch]);

  useEffect(() => {
    const sizeRef = ref(db, `${currentUser!.uid}/size`);
    const formattedSizes: IOptions[] = [];
    onValue(sizeRef, (snapshot) => {
      const sizeItems = snapshot.val();
      // eslint-disable-next-line prefer-const
      for (let id in sizeItems) {
        formattedSizes.push({ id, ...sizeItems[id] });
      }
      setSizes(formattedSizes.reverse());
    });
  }, [sizeModal.toggleFetch]);

  useEffect(() => {
    setLoading(true);
    const menuItemsRef = ref(db, `${currentUser!.uid}/menu`);
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
      setLoading(false);
    });
    return () => {
      setItems([]);
    };
  }, [itemModal.toggleFetch]);

  return (
    <Container>
      <ModalProviders />
      <div className="flex flex-col mt-36 px-4 lg:px-6 xl:px-0">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl">Dashboard</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={categories.length === 0 || sizes.length === 0}
                className="cursor-pointer"
                onClick={() => {
                  itemModal.setDefaultItem(null);
                  itemModal.onOpen();
                }}
              >
                <Utensils className="mr-2 h-4 w-4" />
                Menu Item
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  categoryModal.setDefaultCategory(null);
                  categoryModal.onOpen();
                }}
              >
                <Box className="mr-2 h-4 w-4" />
                Category
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  sizeModal.setDefaultSize(null);
                  sizeModal.onOpen();
                }}
              >
                <List className="mr-2 h-4 w-4" />
                Size
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {loading ? (
          <div className="flex flex-col space-y-3 mt-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
        ) : (
          <DashboardTabs
            categoryItems={categories}
            menuItems={items}
            sizeItems={sizes}
          />
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
