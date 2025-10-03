"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

const Signup = ({ open, onClose, switchToSignin }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const darkImg = "/images/pages/auth-v1-mask-dark.png";
  const lightImg = "/images/pages/auth-v1-mask-light.png";
  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        console.log("User registered:", data);
        onClose();
        switchToSignin();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        sx={{
          zIndex: 9999,
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
        }}
        PaperProps={{
          sx: { overflow: "auto" },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 1 }}>
          <div className="flex justify-end items-center">
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <CardContent className="p-4 sm:!p-6 pt-2 sm:pt-3">
          <Link href="/" className="flex justify-center items-start mbe-6">
            <div className="flex justify-center items-center space-x-5 mb-5">
              <Image
                src="/images/logo/logo.jpg"
                alt="Logo"
                width={50}
                height={5}
                className="rounded-md"
              />
              <div>
                <div>Richard Sanches</div>
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-5">
            <Typography className="mbs-1">
              E-commerce website for Online Clothing Store
            </Typography>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <TextField autoFocus fullWidth label="First Name" name="fname" value={formData.fname} onChange={handleChange}/>
              <TextField autoFocus fullWidth label="Last Name" name="lname" value={formData.lname} onChange={handleChange} />
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange}/>
              <TextField autoFocus fullWidth label="Contact Number" name="contact" value={formData.contact} onChange={handleChange}/>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={isPasswordShown ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <i
                          className={
                            isPasswordShown ? "ri-eye-off-line" : "ri-eye-line"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link
                      className="text-primary"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              {error && <Typography color="error">{error}</Typography>}
              <Button 
              fullWidth 
              variant="contained"
              className="submitButton"
              type="submit">
                Sign Up
              </Button>
              <div className="flex justify-center items-center flex-wrap gap-2">
                <Typography>Already have an account?</Typography>
                <Typography
                  component="span"
                  color="primary"
                  className="cursor-pointer"
                  onClick={switchToSignin}
                >
                  Sign in instead
                </Typography>
              </div>
            </form>
          </div>
        </CardContent>
      </Dialog>
    </>
  );
};

export default Signup;
