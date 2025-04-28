import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface FormErrorProps {
  error: string | null;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
      <div className="flex items-center">
        <AlertOctagon className="h-5 w-5 text-red-500 mr-2" />
        <span className="text-sm text-red-700">{error}</span>
      </div>
    </div>
  );
};

export default FormError;