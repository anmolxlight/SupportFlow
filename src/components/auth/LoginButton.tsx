"use client"

import { useUser } from '@/components/auth/MockAuth';
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
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // Mock logout - in real implementation this would call Auth0 logout
            window.location.href = '/';
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </motion.div>
        </Button>
      </motion.div>
    );
  }

  return (
    <Button 
      variant="default"
      onClick={() => {
        // Mock login - in real implementation this would redirect to Auth0
        alert('Auth0 not configured. Please see AUTH0_SETUP.md for setup instructions.');
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2"
      >
        <LogIn className="h-4 w-4" />
        Login
      </motion.div>
    </Button>
  );
}