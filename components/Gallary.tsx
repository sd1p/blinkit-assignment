import useImages from "@/hooks/useImages";
import useCurrentUser from "@/hooks/useUser";
import Image from "next/image";

const Gallary = () => {
  const { data: currentUser } = useCurrentUser();

  const { data: images } = useImages(currentUser?.id);

  return !images || images.length == 0 ? (
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
