import CategoryModal from "@/components/custom/modals/category-modal";
import ItemModal from "@/components/custom/modals/item-modal";
import SizeModal from "@/components/custom/modals/size-modal";

const ModalProviders = () => {
  return (
    <>
      <SizeModal />
      <ItemModal />
      <CategoryModal />
    </>
  );
};

export default ModalProviders;
