import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import useCurrentUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Header = () => {
  const { data: currentUser } = useCurrentUser();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?.id as string,
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get pre-signed URL.");
      }

      const { url, fields } = await response.json();
      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed.");
      }

      toast.success("Upload successful!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Upload failed.");
    }
    setUploading(false);
    mutate(`/api/images/${currentUser.id}`);
  };

  const handleSignOut = () => {
    signOut();
    toast.success("Logged out Successfully!");
  };

  return (
    <div className="flex flex-col px-20 py-6">
      <div className="flex justify-between px-10">
        <div>
          <h1 className="font-bold bg-gradient-to-r from-purple-400 via-indigo-600-400 to-pink-500 inline-block text-transparent bg-clip-text">
            Hey, {currentUser?.username}
          </h1>
        </div>
        <div>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
      <div className="flex items-center justify-center py-10">
        <form className="flex flex-col " onSubmit={handleUpload}>
          <Label className="self-center" htmlFor="image">
            Upload Image
          </Label>
          <Input
            className="my-4"
            id="image"
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setFile(files[0]);
              }
            }}
            accept="image/png, image/jpeg"
          />
          <Button className="" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Header;
