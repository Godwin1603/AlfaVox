import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FormError from '../components/ui/FormError';

const Profile: React.FC = () => {
  const { user, updateProfile, error, clearError, isLoading } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [nameError, setNameError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError('');
    if (error) clearError();
    if (isSuccess) setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }
    
    try {
      await updateProfile(name);
      setIsSuccess(true);
    } catch (err) {
      // Error handled by context
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-64px)] bg-gray-50 py-10"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-600 to-indigo-700">
            <h1 className="text-xl font-semibold text-white">Your Profile</h1>
            <p className="mt-1 max-w-2xl text-sm text-indigo-100">
              Manage your personal information
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-3xl font-medium border-4 border-white shadow-lg">
                {user?.name?.charAt(0)}
              </div>
            </div>
            
            <div className="mt-6">
              {error && <FormError error={error} />}
              
              {isSuccess && (
                <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
                  <div className="flex">
                    <div>
                      <p className="text-sm text-green-700">
                        Profile updated successfully!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal details.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <Input
                        label="Full name"
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        error={nameError}
                      />
                    </div>
                    
                    <div className="col-span-6 sm:col-span-4">
                      <Input
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        value={user?.email || ''}
                        disabled
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Email cannot be changed.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="mr-3"
                      onClick={() => setName(user?.name || '')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isLoading}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your account preferences and settings.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notifications" className="font-medium text-gray-700">Email notifications</label>
                  <p className="text-gray-500">Receive email notifications for account updates and security alerts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;