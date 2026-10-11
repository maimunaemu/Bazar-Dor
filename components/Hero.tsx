import Image from "next/image";
import { banglaDate } from "@/lib/bn";

export default function Hero() {
return ( <section className="mx-auto max-w-6xl px-4 py-8 md:py-12"> <div className="grid items-center gap-6 rounded-[24px] border border-[#d1ddd3] bg-white p-5 md:grid-cols-2 md:p-8"> <div> <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
আজকের বাজার দর • {banglaDate()} </span>


      <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
        আজকের বাজারের দাম এক নজরে
      </h1>

      <p className="mt-3 max-w-md text-sm text-gray-600">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা — প্রয়োজনীয় পণ্যের দাম, দাম
        বাড়া-কমার হিসাব এবং বিভিন্ন বাজারের তুলনা এক জায়গায়।
      </p>

      <a
        href="#সব-পণ্য"
        className="btn mt-5 border-0 bg-brand text-white hover:bg-brand-dark btn-sm sm:btn-md"
      >
        সব পণ্য দেখুন
      </a>
    </div>

    <div className="flex justify-center md:justify-end">
      <Image
        src="/bazar-hero.png"
        alt="বাজারের ঝুড়িতে তাজা সবজি"
        width={420}
        height={320}
        priority
        className="h-auto w-full max-w-sm"
      />
    </div>
  </div>
</section>


);
}
