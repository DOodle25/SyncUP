import React from "react";
import { useState } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";

const SignUpCard = ({ setState }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignInClick = () => {
    setState("signIn");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign-up logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#5C3B58] p-4">
      <Card className="w-full max-w-md p-6 shadow-md bg-white">
        <CardContent>
          <Typography variant="h5" className="text-left mb-2">
            Create an account
          </Typography>
          <Typography variant="body2" className="text-left text-gray-500 mb-6">
            Fill in the details below to create an account
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
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "black" }}
              className="bg-black text-white hover:bg-gray-800 py-2"
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" className="text-left mt-6" sx={{ marginTop:"14px" }}>
            Already have an account?{" "}
            <a href="#" onClick={handleSignInClick} className="text-blue-500 hover:underline">
              Sign in
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};


export default SignUpCard;
