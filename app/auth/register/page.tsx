"use client";

import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="p-4 space-y-4">
    //   <h2 className="text-lg font-semibold">Crear cuenta</h2>
    //   {error && <p className="text-red-500">{error}</p>}
    //   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" />
    //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="border p-2 w-full" />
    //   <button type="submit" className="bg-green-500 text-white px-4 py-2">Registrarse</button>
    // </form>

    <section className="flex h-screen min-h-screen justify-center items-center">
      <div className="flex flex-col md:flex-row h-3/4 w-3/5">

        <div className="relative bg-black text-white flex items-center justify-center p-10 w-1/2">
          <div className="absolute inset-0">
            <Image
              src="/background.jpg"
              alt="Background"
              fill
              className="object-cover opacity-70"
            />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Create your<br />Account</h1>
            <p className="text-lg">Share your artwork<br />and Get projects!</p>
          </div>
        </div>

        <div className="flex items-center justify-center p-10 bg-white w-1/2">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-center">Sign Up</h2>

            <form className="space-y-4">
              <input type="text" placeholder="First name" className="w-full px-4 py-2 border rounded-md" />
              <input type="text" placeholder="Last name" className="w-full px-4 py-2 border rounded-md" />
              <input type="email" placeholder="Email address" className="w-full px-4 py-2 border rounded-md" />
              <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" />

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" className="text-sm">Accept <a href="#" className="underline">Terms & Conditions</a></label>
              </div>

              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                Join us →
              </button>
            </form>

            <div className="flex items-center gap-2 text-center">
              <span className="w-full border-t" />
              <span className="text-sm text-gray-500">or</span>
              <span className="w-full border-t" />
            </div>

            <div className="space-y-3">
              <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </button>
              <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
                <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" />
                Sign up with Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}