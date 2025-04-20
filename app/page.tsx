"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { logoutUser } from "@/lib/auth";

type Exercise = {
  name: string | null;
  id: number;
  description: string | null;
  steps: any;
  equipment: string | null;
  image: string | null;
  gif: string | null;
  video: string | null;
  alternatives: any; 
  target: any;
};

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch('/api/exercises');
        const data = await res.json();
        setExercises(data);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/auth/login");
  };

  if (loading || !user && !isLoading) {
    return null;
  }

  console.log(exercises)

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Bienvenido a Next.js 14 + Firebase</h1>
      <p>Hola, {user?.email}</p>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </main>
  );
}