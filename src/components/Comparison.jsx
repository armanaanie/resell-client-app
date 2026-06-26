import { Button } from "@heroui/react";
import Link from "next/link";
import { Scale, Sparkles } from "lucide-react";

const Comparison = () => {
return ( <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#760031] via-[#9f1239] to-[#D51C39] pt-8 md:p-12 shadow-2xl">


  {/* Animated Background */}
  <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
  <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#FEEC41]/20 blur-3xl animate-pulse" />

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

    {/* Left Content */}
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-[#FEEC41]" />
        <span className="text-[#FEEC41] font-semibold">
          Smart Product Comparison
        </span>
      </div>

       <h2
          className="text-5xl lg:my-15 my-5 font-bold"
          style={{
            fontFamily:
              "'DM Serif Display', serif",
          }}>
        Compare Products Side-by-Side
      </h2>

      <p className="text-white/80 text-lg">
        Find the best deal instantly by comparing
        <span className="font-semibold text-[#FEEC41]"> Price</span>,
        <span className="font-semibold text-[#FEEC41]"> Condition</span>,
        <span className="font-semibold text-[#FEEC41]"> Category</span>,
        and
        <span className="font-semibold text-[#FEEC41]"> Seller Rating</span>.
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
          🏆 Best Price
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
          ⭐ Smart Recommendation
        </span>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
          📊 Visual Comparison
        </span>
      </div>
    </div>

    {/* Right CTA */}
    <Link href="/compare">
      <Button
        size="lg"
        className="
          group
          bg-[#FEEC41]
          text-[#760031]
          font-bold
          px-8
          py-7
          text-lg
          shadow-xl
          hover:scale-110
          transition-all
          duration-300
        "
      >
        <Scale className="mr-2 transition-transform group-hover:rotate-12" />
        Compare Now
      </Button>
    </Link>

  </div>
</div>


);
};

export default Comparison;
