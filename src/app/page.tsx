import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center">
        <Image
          src="/logo.png"
          alt="DivTatva Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to DivTatva
        </h1>
      </main>
    </div>
  );
}
