"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/lib/firebase/clientApp';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import type { ITechnician } from '@/models/Technician';

interface AuthContextType {
  user: User | null;
  technician: ITechnician | null;
  loading: boolean;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  refetchTechnician: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [technician, setTechnician] = useState<ITechnician | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchTechnician(firebaseUser: User) {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`/api/technicians/${firebaseUser.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const techData = await response.json();
        setTechnician(techData);
      } else {
        setTechnician(null);
      }
    } catch (error) {
      console.error('Error fetching technician profile:', error);
      setTechnician(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        await fetchTechnician(firebaseUser);
      } else {
        setTechnician(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setTechnician(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getIdToken = async () => {
    if (!user) return null;
    return user.getIdToken();
  };

  const refetchTechnician = async () => {
    if (user) await fetchTechnician(user);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, technician, loading, signOut: handleSignOut, getIdToken, refetchTechnician }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};