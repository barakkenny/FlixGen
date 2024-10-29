import { useRef, useState } from "react";
import Header from "./Header";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { checkValidData } from "@/utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const userName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const HandleAuthBtn = () => {
    console.log(userName.current.value);
    console.log(email.current.value);
    console.log(password.current.value);

    const message = checkValidData(
      userName.current.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
  };

  return (
    <div>
      <Header />

      <div className="flex items-center justify-center mt-8 text-white">
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
                ref={userName}
                type="text"
                className="border-grey border-grey bg-transparent text-white text-20 w-full h-14 rounded"
                placeholder="Full Name"
              />
            )}
            <Input
              ref={email}
              type="email"
              className="border-grey bg-transparent text-white text-20 w-full h-14 rounded"
              placeholder="Email"
            />
            <Input
              ref={password}
              type="password"
              className="border-grey bg-transparent text-white text-20 w-full h-14 rounded"
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

          <Link>
            <h4 className="text-white hover:underline text-center hover:text-[#ada49d] mt-4">
              Forgot password?
            </h4>
          </Link>
          <div className="flex items-center gap-2 mt-5">
            <Checkbox className="text-20 border-white" />
            <h4>Remember me</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
