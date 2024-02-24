import { signOutUser } from "@/firebase/auth";
import { CircleUserRound, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const { currentUser } = useAuth();
  const handleLogout = async () => {
    signOutUser();
  };

  const showLogout = () => {
    return !currentUser ? false : true;
  };
  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-white flex items-center justify-between p-8 border borde-b border-muted">
      <Link
        to="/"
        className="flex items-center gap-x-2 text-black hover:text-orange-600 transition-colors"
      >
        <ShoppingBasket size={20} />
        <p className="font-bold">MyMenu</p>
      </Link>

      {showLogout() && (
        <div className="flex gap-x-2">
          {" "}
          <div className="flex items-center gap-x-4 border border-dashed border-neutral-700 rounded-lg p-2 w-auto ">
            <CircleUserRound />
            <p className="text-sm">{currentUser?.email}</p>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
