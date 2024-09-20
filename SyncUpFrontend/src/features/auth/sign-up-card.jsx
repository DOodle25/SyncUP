// import React from "react";
// import { useState } from "react";
// import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const SignUpCard = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSignInClick = () => {
//     navigate("/signin");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add sign-up logic here
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#5C3B58] p-4">
//       <Card className="w-full max-w-md p-6 shadow-md bg-white">
//         <CardContent>
//           <Typography variant="h5" className="text-left mb-2">
//             Create an account
//           </Typography>
//           <Typography variant="body2" className="text-left text-gray-500 mb-6">
//             Fill in the details below to create an account
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
//             <TextField
//               label="Confirm Password"
//               variant="outlined"
//               type="password"
//               fullWidth
//               required
//               name="confirmPassword"
//               value={formData.confirmPassword}
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
//               Sign Up
//             </Button>
//           </form>
//           <Typography variant="body2" className="text-left mt-6" sx={{ marginTop:"14px" }}>
//             Already have an account?{" "}
//             <a href="#" onClick={handleSignInClick} className="text-blue-500 hover:underline">
//               Sign in
//             </a>
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignUpCard;

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUpCard = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSignInClick = () => {
//     navigate("/signin");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       console.error("Passwords do not match");
//       // Handle error (e.g., show a message to the user)
//       return;
//     }
//     try {
      
//       await axios.post("http://localhost:5000/api/auth/signup", formData); // Adjust endpoint as needed
//       navigate("/signin"); // Redirect to sign-in page
//     } catch (error) {
//       console.error("Sign-up error:", error);
//       // Handle error (e.g., show a message to the user)
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#5C3B58] p-4">
//       <Card className="w-full max-w-md p-6 shadow-md bg-white">
//         <CardContent>
//           <Typography variant="h5" className="text-left mb-2">
//             Create an account
//           </Typography>
//           <Typography variant="body2" className="text-left text-gray-500 mb-6">
//             Fill in the details below to create an account
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
//             <TextField
//               label="Confirm Password"
//               variant="outlined"
//               type="password"
//               fullWidth
//               required
//               name="confirmPassword"
//               value={formData.confirmPassword}
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
//               Sign Up
//             </Button>
//           </form>
//           <Typography
//             variant="body2"
//             className="text-left mt-6"
//             sx={{ marginTop: "14px" }}
//           >
//             Already have an account?{" "}
//             <a
//               href="#"
//               onClick={handleSignInClick}
//               className="text-blue-500 hover:underline"
//             >
//               Sign in
//             </a>
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignUpCard;




import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleRequestOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register-otp", {
        email: formData.email,
      });
      setIsOtpSent(true);
    } catch (error) {
      setError("Error sending OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isOtpSent) {
      setError("Please request an OTP first.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/signin");
    } catch (error) {
      setError("Registration error. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#5C3B58] p-4">
      <Card className="w-full max-w-md p-4 shadow-md bg-white" sx={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}}>
        <CardContent>
          <Typography variant="h5" className="text-left mb-2">
            Create an account
          </Typography>
          <Typography variant="body2" className="text-left text-gray-500 mb-6" >
            Fill in the details below to create an account
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
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
              label="Name"
              variant="outlined"
              fullWidth
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mb-4"
            />
            {isOtpSent && (
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                required
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="mb-4"
              />
            )}
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mb-4"
            />
            <Button
              type="button"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "black", boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px;" }}
              className="bg-black text-white hover:bg-gray-800 py-2"
              onClick={handleRequestOtp}
            >
              Request OTP
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "black", boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px;" }}
              className="bg-black text-white hover:bg-gray-800 py-2"
            >
              Sign Up
            </Button>
          </form>
          <Typography
            variant="body2"
            className="text-left mt-6"
            sx={{ marginTop: "14px" }}
          >
            Already have an account?{" "}
            <a
              href="#"
              onClick={handleSignInClick}
              className="text-blue-500 hover:underline"
            >
              Sign in
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpCard;
