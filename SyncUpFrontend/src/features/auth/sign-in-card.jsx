// import React from "react";
// import { useState } from "react";
// import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
// import { FaGoogle, FaGithub } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const SignInCard = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSignUpClick = () => {
//     navigate("/signup");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add sign-in logic here
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#5C3B58] p-4">
//       <Card className="w-full max-w-md p-6 shadow-md bg-white">
//         <CardContent>
//           <Typography variant="h5" className="text-left mb-2">
//             Login to continue
//           </Typography>
//           <Typography variant="body2" className="text-left text-gray-500 mb-6">
//             Use your email or another service to continue
//           </Typography>
//           <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               required
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mb-4"
//             />
//             <TextField
//               label="Password"
//               variant="outlined"
//               type="password"
//               fullWidth
//               required
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mb-4"
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{ backgroundColor: "black" }}
//               className="bg-black text-white hover:bg-gray-800 py-2"
//             >
//               Continue
//             </Button>
//           </form>
//           <div className="mt-6 space-y-2">
//             <Button
//               fullWidth
//               variant="outlined"
//               startIcon={<FaGoogle className="size-5 absolute top-1.5 left-2.5" />}
//               className="py-2 border-gray-300 hover:bg-gray-100"
//               sx={{ borderColor: "#D1D5DB", color : "#000000" }}
//             >
//               Continue with Google
//             </Button>
//             <Button
//               fullWidth
//               variant="outlined"
//               startIcon={<FaGithub className="size-5 absolute top-1.5 left-2.5" />}
//               className="py-2 border-gray-300 hover:bg-gray-100"
//               sx={{ borderColor: "#D1D5DB", color : "#000000" }}
//             >
//               Continue with GitHub
//             </Button>
//           </div>
//           <Typography variant="body2" className="text-left mt-6" sx={{ marginTop:"14px" }}>
//             Don’t have an account?{" "}
//             <a href="#" onClick={handleSignUpClick} className="text-blue-500 hover:underline">
//               Sign up
//             </a>
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignInCard;


import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const SignInCard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (which triggers a GET request)
    e.preventDefault();  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', formData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#5C3B58] p-4">
      <Card className="w-full max-w-md p-6 shadow-md bg-white" sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;" }}>
        <CardContent>
          <Typography variant="h5" className="text-left mb-2">
            Login to continue
          </Typography>
          <Typography variant="body2" className="text-left text-gray-500 mb-6">
            Use your email or another service to continue
          </Typography>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mb-4"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mb-4"
            />
            <Button
              type="submit"  // Ensure this is "submit", and no onClick is needed
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "black", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;" }}
              className="bg-black text-white hover:bg-gray-800 py-2"
            >
              Continue
            </Button>
          </form>
          <div className="mt-6 space-y-2">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaGoogle className="size-5 absolute top-1.5 left-2.5" />}
              className="py-2 border-gray-300 hover:bg-gray-100"
              sx={{ borderColor: "#D1D5DB", color: "#000000" }}
            >
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaGithub className="size-5 absolute top-1.5 left-2.5" />}
              className="py-2 border-gray-300 hover:bg-gray-100"
              sx={{ borderColor: "#D1D5DB", color: "#000000" }}
            >
              Continue with GitHub
            </Button>
          </div>
          <Typography variant="body2" className="text-left mt-6" sx={{ marginTop: "14px" }}>
            Don’t have an account?{" "}
            <a href="#" onClick={handleSignUpClick} className="text-blue-500 hover:underline">
              Sign up
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInCard;
