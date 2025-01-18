import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser, setToken } from "@/store/slices/authSlice";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
  
    try {
      // API call to login
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          email: username,
          password,
        }
      );
      const { user, token } = response.data;

      dispatch(setUser(user));
      dispatch(setToken(token));

      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white grid md:grid-cols-2 grid-cols-1">
      <div className="p-6 md:p-12 space-y-6 flex flex-col">
        <Logo size="fit" className="mx-auto md:mx-0" />
        <div className="flex-grow flex items-center justify-center flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Welcome!
          </h1>
          <p className="text-gray-300 text-center md:text-left">
            To keep connected with us please login with your username password
          </p>
        </div>
      </div>
      <div className="bg-white/10 p-6 md:p-12 backdrop-blur-lg">
        <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" className="bg-white/5" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="bg-white/5"
                required
              />
            </div>
          </div>
          <Button
            className="w-full bg-[#DC2626] hover:bg-[#B91C1C]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
