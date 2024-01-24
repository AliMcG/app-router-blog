"use client";

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@/_components/Button';
import Typography from '@mui/material/Typography';
import { api } from "~/trpc/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #CFE1FF',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmDeleteModal({ id }: {id:string}) {
  const router = useRouter()
  const { mutate: deleteMutate } = api.post.delete.useMutation({
    onSuccess: () => {
      toast.success("Blog deleted");
      handleClose()
      router.push('/blog')
    },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const DeleteButton = () => {
    return (
      <Button text={'Delete'} textColour={'text-red-500'} onClick={() => deleteMutate({ id })} />
    );
  };

  return (
    <div>
      <Button onClick={handleOpen} text={"Delete"} textColour={'text-red-600'}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <p className='flex justify-end gap-4'>Are you sure you want to delete?</p>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className='flex justify-end gap-4'>
              <Button text={'Cancel'} onClick={handleClose} textColour={'text-slate-600'} />
             <DeleteButton />
              </div>
             
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Toaster />
    </div>
  );
}