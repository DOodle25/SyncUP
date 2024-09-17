import * as React from "react";
import { useState } from "react";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

const AuthScreen = () => {
  const [state, setState] = useState("signIn");

  return (
    <div className="h-full flex item0center justify-center bg-[#5C3B58]">
      <div className="mid:h-auto md:w-[420px]">
        {state === "signIn" ? <SignInCard setState={setState}/> : <SignUpCard setState={setState}/>}
      </div>
    </div>
  );
};

export default AuthScreen;
