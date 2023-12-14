"use client";

import React, { useState } from "react";
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
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Input } from "./ui/input";
import toast from 'react-hot-toast';

const RenameModal = () => {
  const { user } = useUser();
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);

  const [input, setInput] = useState("");

  const renameFile = async () => {
    if (!user || !fileId) return;

    const toastId = toast.loading("Renaming...")

    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
    });

    toast.success("Renamed successfully", {
      id: toastId
    })

    setInput("");
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
        </DialogHeader>
        <div className="flex justify-end space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;

// const DeleteModal = () => {

//   async function deleteFile() {
//     if (!user || !fileId) return;

//     const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

//     try {
//       // Check if the file exists in storage
//       await getMetadata(fileRef);
//       await deleteObject(fileRef);
//       await deleteDoc(doc(db, "users", user.id, "files", fileId));
//       setIsDeleteModalOpen(false);
//     } catch (error) {
//       if (error.code === "storage/object-not-found") {
//         alert("File not found in storage.");
//         await deleteDoc(doc(db, "users", user.id, "files", fileId));
//         setIsDeleteModalOpen(false);
//       } else {
//         alert(`Error deleting file:${error.message}`);
//         await deleteDoc(doc(db, "users", user.id, "files", fileId));
//         setIsDeleteModalOpen(false);
//       }
//     }
//   }

// };
