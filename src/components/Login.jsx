import { useRef, useState } from "react";
import Header from "./Header";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { checkValidData } from "@/utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";  
import { auth } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from '@/utils/userSlice'
import { USER_AVATAR } from "@/utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const HandleAuthBtn = () => {

    const message = checkValidData(email.current.value, password.current.value);
     setErrorMessage(message);
    console.log(email.current.value);
    console.log(password.current.value);

    if(message) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, name.current.value, email.current.value, password.current.value)
  .then((userCredential) => {
    updateProfile(auth.currentUser, {
      displayName: name.current.value, photoURL: USER_AVATAR
    }).then(() => {
      const { uid, email, displayName, photoURL} = auth.currentUser;
      dispatch(addUser ({
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      }))
      
    }).catch((error) => {
      setErrorMessage(error.message)
    });
    // Signed up 
    const user = userCredential.user;
    console.log(user)
  })

  

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode +""+ errorMessage)
  });
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        return user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode +"-"+ errorMessage)
      });
    }

  };

  return (
    <div className="bg-[url('/sci-fi.jpg')] bg-center bg-cover w-full h-screen">
      <Header />

      <div className="flex items-center justify-center mt-8 text-white font-inter">
        <div className="bg-black w-[33%] px-20 py-2 bg-opacity-80 rounded">
          <h2 className="text-white mt-10 text-3xl font-medium">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            action=""
            className=" flex flex-col gap-8 mt-8"
          >
            {!isSignInForm && (
              <Input
                ref={name}
                type="text"
                className="border-grey border-grey bg-transparent text-white text-20 w-full h-14 rounded"
                placeholder="Full Name"
              />
            )}
            <Input
              ref={email}
              type="email"
              className="border-grey bg-transparent font-bold text-white text-20 w-full h-14 rounded"
              placeholder="Email"
            />
            <Input
              ref={password}
              type="password"
              className="border-grey bg-transparent font-bold text-white text-20 w-full h-14 rounded"
              placeholder="Password"
            />
            <p className="text-red-500 font-bold">{errorMessage}</p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={HandleAuthBtn}
                className="bg-[#e50914] hover:bg-red-800 py-6"
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </Button>
            </div>
            <p className="cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm
                ? "New to FlixGen? Sign Up Now"
                : "Already registered? Sign In Now"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
