import React from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export function LoginScreen() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center max-w-md px-6"
      >
        <h1 className="text-4xl font-serif mb-6 tracking-widest text-white/90">AWAKENING</h1>
        <p className="text-white/60 mb-12 leading-relaxed font-light">
          A companion grown from your words. Connect to begin the journey.
        </p>
        
        <button
          onClick={handleLogin}
          className="flex items-center justify-center space-x-3 w-full py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 text-white/80 hover:text-white"
        >
          <LogIn size={20} />
          <span className="tracking-widest uppercase text-sm">Connect with Google</span>
        </button>
      </motion.div>
    </div>
  );
}
