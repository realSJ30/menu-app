import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useItemModal } from "@/hooks/use-item-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/custom/modals";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { pushData, updateData } from "@/firebase/api";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebase/firebase.config";
import { IOptions } from "@/global.types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSizeModal } from "@/hooks/use-size-modal";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  name: z.string().min(2).max(16),
  price: z.coerce.number().min(1),
  sizesId: z.array(z.string()).nonempty(),
  categoryId: z.string().nonempty(),
  stock: z.coerce.number().min(0),
});

const ItemModal = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const { isOpen, onClose, defaultItem, toggleFetch, setToggleFetch } =
    useItemModal();
  const sizeModal = useSizeModal();
  const categoryModal = useCategoryModal();
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState<IOptions[]>([]);
  const [categories, setCategories] = useState<IOptions[]>([]);

  const defaultValues = {
    name: "",
    price: 1,
    sizesId: [],
    categoryId: "",
    stock: 0,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSetCategory = (id: string) => {
    const newCategory = categories.find((category) => category.id === id)!.id!;
    form.setValue("categoryId", newCategory);

    form.clearErrors("categoryId");
  };

  const handleSetSizes = (size: IOptions) => {
    const currentValue = form.getValues("sizesId");
    const newValue = currentValue.find((val) => val === size.id)
      ? currentValue.filter((val) => val !== size.id)
      : [...currentValue, size.id];
    form.setValue("sizesId", newValue as [string, ...string[]]);
    form.clearErrors("sizesId");
  };

  const handleIncrement = () => {
    const currentValue = form.getValues("stock");
    form.setValue("stock", +currentValue + 1);
  };

  const handleDecrement = () => {
    const currentValue = form.getValues("stock");
    if (currentValue > 0) {
      form.setValue("stock", +currentValue - 1);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (currentUser) {
        if (!defaultItem) {
          pushData({
            data: values,
            path: `${currentUser.uid}/menu`,
          });
          toast({
            title: "Succefully Added!",
            description: `Added ${values.name} to menu.`,
          });
        } else {
          updateData({
            data: values,
            path: `${currentUser.uid}/menu/${defaultItem.id}`,
          });
          toast({
            title: "Succefully Updated!",
            description: `Updated ${values.name}.`,
          });
        }
      }
      setToggleFetch(!toggleFetch);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      form.reset(defaultValues);
      onClose();
    }
  };

  useEffect(() => {
    if (defaultItem) {
      form.reset(defaultItem);
    } else {
      form.reset(defaultValues);
    }
  }, [form, defaultItem]);

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

  return (
    <Modal
      title="Create Item"
      description="Add a new item in your menu."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Item name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      className="flex flex-wrap justify-start"
                      value={field.value}
                    >
                      {sizes.map((size) => (
                        <ToggleGroupItem
                          key={size.id}
                          value={size.id!}
                          variant="outline"
                          onClick={() => handleSetSizes(size)}
                        >
                          <div>{size.name}</div>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={handleSetCategory}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((value) => (
                          <SelectItem key={value.id!} value={value.id!}>
                            {value.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl className="w-auto flex items-center">
                    <div className="flex items-center gap-x-2 w-1/2">
                      <Button
                        onClick={handleDecrement}
                        type="button"
                        variant="secondary"
                        className="rounded-full"
                      >
                        <Minus size={12} />
                      </Button>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder=""
                        {...field}
                      />
                      <Button
                        onClick={handleIncrement}
                        type="button"
                        variant="secondary"
                        className="rounded-full"
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end space-x-2">
              <Button
                type="button"
                disabled={loading}
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default ItemModal;
