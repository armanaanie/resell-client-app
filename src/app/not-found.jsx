import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#760031] via-[#4a001f] to-[#1a000b] text-white px-6">

      <div className="text-center max-w-2xl">

        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <img
            src="https://illustrations.popsy.co/amber/crashed-error.svg"
            alt="404 Illustration"
            className="w-72 md:w-96 drop-shadow-2xl"
          />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-bold text-[#FEEC41]">404</h1>

        {/* Title */}
        <h2 className="text-3xl font-semibold mt-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-white/70 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link href="/">
          <button
            className="
              mt-8 px-8 py-3
              bg-gradient-to-r from-[#D51C39] to-[#FF6060]
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
              shadow-lg
            "
          >
            Back To Home
          </button>
        </Link>

      </div>
    </div>
  );
}