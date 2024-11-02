import { useEffect} from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "@/utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error")
      });
  };

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayNmae: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="px-24 py-4 flex justify-between ">
      <Link to="/">
        <h1 className="text-2xl font-bold text-red-600">FlixGen</h1>
      </Link>
      {user && (
        <div className="flex gap-6">
          <img
            className="w-8 rounded-full"
            src={user?.photoURL}
            alt="user-image"
          />
          <Button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
