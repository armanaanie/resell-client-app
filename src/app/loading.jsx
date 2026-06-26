export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#760031] via-[#4a001f] to-[#1a000b] px-6 py-10 text-white">

      {/* Page Title Skeleton */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="h-10 w-1/3 bg-white/10 rounded-xl animate-pulse" />
        <div className="h-4 w-1/2 bg-white/10 rounded-xl mt-3 animate-pulse" />
      </div>

      {/* Product Grid Skeleton */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/10 border border-white/10 rounded-3xl p-4 backdrop-blur-xl"
          >
            {/* Image Skeleton */}
            <div className="h-48 w-full bg-white/10 rounded-2xl animate-pulse" />

            {/* Title */}
            <div className="h-5 w-3/4 bg-white/10 rounded mt-4 animate-pulse" />

            {/* Category */}
            <div className="h-4 w-1/2 bg-white/10 rounded mt-2 animate-pulse" />

            {/* Price */}
            <div className="h-6 w-1/3 bg-white/10 rounded mt-4 animate-pulse" />

            {/* Button */}
            <div className="h-10 w-full bg-white/10 rounded-2xl mt-5 animate-pulse" />
          </div>
        ))}

      </div>
    </div>
  );
}