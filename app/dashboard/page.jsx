
"use client"

import { Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import ResponsiveDrawer from './_components/ResponsiveDrawer';
import { UserButton } from '@clerk/nextjs';

const ManageVendor = () => {
  const router = useRouter();

  const handleStartAddVendor = () => {
    router.push('/dashboard/addvendor');
  };
  const handleStartManageVendor = () => {
    router.push('/dashboard/managevendor');
  };

  return (
    <div className="flex flex-col items-center space-y-4">

      {/* <ResponsiveDrawer /> */}
      <h1 className="text-center text-4xl">
        Dashboard
      </h1>
      <UserButton/> 
      
      <div className="flex space-x-4 mt-6">
        <Button 
          onClick={handleStartAddVendor}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Vendor
        </Button>
        <Button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        onClick={handleStartManageVendor}>
          Manage Vendor
        </Button>
      </div>

      
    </div>
  );
}

export default ManageVendor;
