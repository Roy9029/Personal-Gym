"use client";

import { useState } from "react";
import { loginUser, registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import TransitionWrapper from "@/components/animations/transition";
import { Toaster, toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(0);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const Login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const Register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <section className="flex h-screen justify-center items-center bg-[#006ab4]">
      <div className="flex flex-col md:flex-row md:h-3/4 md:w-3/5 bg-white overflow-hidden">
        <div className="relative bg-black text-white flex items-center justify-center p-10 md:w-1/2 rounded-r-[3rem]">
        <TransitionWrapper animationKey={auth} className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/banner-gym.jpg"
              alt="Background"
              fill
              className="object-cover opacity-70 rounded-r-[3rem]"
              priority
            />
            <div className="absolute inset-0 bg-black/30 rounded-r-[3rem] z-[5]" />
          </div>
          <div className="flex flex-col w-full z-10 text-center text-whitebackdrop-blur-md px-6 py-4 rounded-xl">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {auth === 1 ? "Create your\nAccount" : "Welcome"}
            </h1>
            <div className="w-full flex items-center justify-center">
              <button className="w-2/5 border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-black/20" onClick={() => setAuth(auth === 1 ? 0 : 1)}>
                {auth === 1 ? "I already have an account" : "Register new account"}
              </button>
            </div>
          </div>
        </TransitionWrapper>
        </div>
        <div className="flex items-center justify-center p-10 bg-white md:w-1/2 relative">
        <TransitionWrapper animationKey={auth} className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-center">
              {auth === 1 ? "Sign Up" : "Login"}
            </h2>

            <form
              className="space-y-4"
              onSubmit={auth === 1 ? Register : Login}
            >
              {auth === 1 && (
                <>
                  <input type="text" placeholder="First name" className="w-full px-4 py-2 border rounded-md" />
                  <input type="text" placeholder="Last name" className="w-full px-4 py-2 border rounded-md" />
                </>
              )}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />

              {auth === 1 && (
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms" className="text-sm">
                    Accept <a href="#" className="underline">Terms & Conditions</a>
                  </label>
                </div>
              )}

              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                {auth === 1 ? "Join us →" : "Login"}
              </button>
            </form>

            <div className="flex items-center gap-2 text-center">
              <span className="w-full border-t" />
              <span className="text-sm text-gray-500">or</span>
              <span className="w-full border-t" />
            </div>

            <div className="space-y-3">
              <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
                <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                {auth === 1 ? "Sign up with Google" : "Login with Google"}
              </button>
              <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
                <img src="/icons/apple.svg" alt="Apple" className="w-5 h-5" />
                {auth === 1 ? "Sign up with Apple" : "Login with Apple"}
              </button>
            </div>
          </div>
        </TransitionWrapper>
        </div>
      </div>
      <Toaster
        position="top-right"
      />
    </section>
  )
}