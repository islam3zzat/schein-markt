import Image from "next/image";
import spinner from "@/assets/loader.gif";

const LoadingPage = () => {
  const sideLength = 150;
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image
        src={spinner}
        alt="Loading..."
        width={sideLength}
        height={sideLength}
      />
    </div>
  );
};

export default LoadingPage;
