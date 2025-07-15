"use client"

import { useUser } from '@auth0/nextjs-auth0/client';
import { motion } from 'framer-motion';
import { LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LoginButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2"
      >
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="text-sm">{user.name}</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <motion.a
            href="/api/auth/logout"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </motion.a>
        </Button>
      </motion.div>
    );
  }

  return (
    <Button variant="default" asChild>
      <motion.a
        href="/api/auth/login"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2"
      >
        <LogIn className="h-4 w-4" />
        Login
      </motion.a>
    </Button>
  );
}