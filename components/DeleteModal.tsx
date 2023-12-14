"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, getMetadata, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

const DeleteModal = () => {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId] = useAppStore(
    (state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
    ]
  );

  async function deleteFile() {
    if (!user || !fileId) return;

    const toastId = toast.loading("Deleting...");

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      // Check if the file exists in storage
      await getMetadata(fileRef);
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "users", user.id, "files", fileId));
      toast.success("File deleted successfully", {
        id: toastId,
      });
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("File not found in storage, can't delete file", {
        id: toastId
      });
      await deleteDoc(doc(db, "users", user.id, "files", fileId));
      setIsDeleteModalOpen(false);
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            variant={"destructive"}
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
