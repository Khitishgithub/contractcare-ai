

"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';


const ManageVendor = () => {
  const router = useRouter();
  const handleCreateContract = () => {
    router.push('/dashboard/managevendor/createcontract');
  };
  const handleManageContract = () => {
    router.push('/dashboard/managevendor/managecontract');
  };

  return (
    <div>
        <div className="flex  justify-center space-x-4 mt-6">
        <Button 
          onClick={handleCreateContract}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
         CreateContract
        </Button>
        <Button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        onClick={handleManageContract}>
          ManageContract
        </Button>
      </div>
    </div>
  );
}

export default ManageVendor;
