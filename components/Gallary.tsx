import useImages from "@/hooks/useImages";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

const Gallary = () => {
  const { data: images } = useImages("33aac4c1-be9e-44c9-88ef-8c04e9437b46");

  return !images ? (
    <>
      <div className="flex justify-center">
        <div>
          <p>No images uploaded</p>
        </div>
      </div>
    </>
  ) : (
    <div className="flex flex-shrink-0 flex-wrap w-full gap-3 px-10 ">
      {images.map((image: any) => {
        return (
          <Image
            key={image?.id}
            className="rounded-md object-cover w-40 h-40"
            src={image?.uri}
            alt="img"
            width={150}
            height={150}
          />
        );
      })}
    </div>
  );
};

export default Gallary;
