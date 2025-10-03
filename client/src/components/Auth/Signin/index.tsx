"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

const Signin = ({ open, onClose, switchToSignup }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const router = useRouter();
  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
      } else {
        console.log("Login successful:", data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.customer));

        onClose();
        router.push("/");
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
          sx: { overflow: "visible" },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 1 }}>
          <div className="flex justify-end items-center">
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Card className="flex flex-col sm:is-[450px]">
            <CardContent className="p-4 sm:!p-6 pt-2 sm:pt-3">
              <Link href="/" className="flex justify-center items-center mbe-6">
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
                <div>
                  <Typography className="mbs-1">
                    Please sign-in to your account and start the adventure
                  </Typography>
                </div>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <TextField
                    autoFocus
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    id="outlined-adornment-password"
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
                                isPasswordShown
                                  ? "ri-eye-off-line"
                                  : "ri-eye-line"
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className="flex justify-between items-center gap-x-3 gap-y-1 flex-wrap">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Remember me"
                    />
                    <Typography
                      className="text-end"
                      color="primary"
                      component={Link}
                      href="/forgot-password"
                    >
                      Forgot password?
                    </Typography>
                  </div>
                  {error && <Typography color="error">{error}</Typography>}
                  <Button
                    fullWidth
                    variant="contained"
                    className="submitButton"
                    type="submit"
                  >
                    Log In
                  </Button>
                  <div className="flex justify-center items-center flex-wrap gap-2">
                    <Typography>New on our platform?</Typography>
                    <Typography
                      component="span"
                      color="primary"
                      className="cursor-pointer"
                      onClick={switchToSignup}
                    >
                      Create an account
                    </Typography>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Signin;
