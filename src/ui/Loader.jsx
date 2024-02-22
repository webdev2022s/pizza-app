export default function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-yellow-600/25 backdrop-blur-sm">
      <img src="./pizzaloading.svg" alt="pizza svg" className="logo" />;
      {/* <div className="loader"></div> */}
    </div>
  );
}
