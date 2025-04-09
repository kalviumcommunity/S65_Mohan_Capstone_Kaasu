import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader, Lock, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import userAuthStore from '../stores/userAuthStore';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const { isSignupLoading, signup } = userAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) {
      errors.push('Username is required');
    } else if (formData.name.length < 3) {
      errors.push('Username must be at least 3 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }

    if (!formData.password) {
      errors.push('Password is required');
    } else if (formData.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (errors.length > 0) {
      toast.error(errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signup(
          formData.name,
          formData.email,
          formData.password
        );
        toast.success('Signup successful!');
        navigate('/');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={User} type="text" placeholder="Username" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <InputField icon={Mail} type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <PasswordField label="Password" field="password" formData={formData} showPassword={showPassword} setShowPassword={setShowPassword} setFormData={setFormData} />
          <PasswordField label="Confirm Password" field="confirmPassword" formData={formData} showPassword={showPassword} setShowPassword={setShowPassword} setFormData={setFormData} />
          <button type="submit" disabled={isSignupLoading} className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center">
            {isSignupLoading ? <Loader className="h-5 w-5 animate-spin" /> : 'Sign Up'}
          </button>
          <div className="text-center text-sm text-gray-600 mt-4 cursor-pointer">
            <a onClick={()=> navigate('/login')} className="hover:underline">
              Already Having an Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500" />
  </div>
);

const PasswordField = ({ label, field, formData, showPassword, setShowPassword, setFormData }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <Lock className="h-5 w-5 text-gray-400" />
    </div>
    <input type={showPassword[field] ? 'text' : 'password'} placeholder={label} value={formData[field]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500" />
    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))}>
      {showPassword[field] ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
    </button>
  </div>
);

export default Signup;