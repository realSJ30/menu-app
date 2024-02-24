import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { pushData, updateData } from "@/firebase/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSizeModal } from "@/hooks/use-size-modal";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  name: z.string().min(2).max(16),
});

const SizeModal = () => {
  const { currentUser } = useAuth();
  const {
    isOpen,
    onClose,
    defaultSize,
    setDefaultSize,
    toggleFetch,
    setToggleFetch,
  } = useSizeModal();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    name: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (defaultSize) {
      form.reset(defaultSize);
    } else {
      form.reset(defaultValues);
    }
  }, [form, defaultSize]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (currentUser) {
        setLoading(true);
        if (!defaultSize) {
          pushData({
            data: values,
            path: `${currentUser.uid}/size`,
          });
        } else {
          updateData({
            data: values,
            path: `${currentUser.uid}/size/${defaultSize.id}`,
          });
        }
      }
      setToggleFetch(!toggleFetch);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
      setDefaultSize(defaultValues);
    }
  };

  return (
    <Modal
      title="Create Size"
      description="Add new size in your menu."
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
                  <FormLabel>Size name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
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

export default SizeModal;
