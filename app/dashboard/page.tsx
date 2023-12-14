import DropzoneComponent from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

const Dashboard = async () => {
  const { userId } = auth();

  const docResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="border-t">
      <DropzoneComponent />

      <section className="container space-y-5 mt-12">
        <h2 className="font-bold">All Files</h2>

        <div className="">
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
