import Image from "next/image";
import Button from "./components/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center max-w-1/2 sm:items-start">
        <div className="flex flex-row gap-[128px] w-full">
          <div className="flex flex-col gap-[32px] flex-1">
            <h1 className="text-7xl/24">Belajar Bahasa Isyarat Kapan Saja, Di Mana Saja</h1>
            <p className="text-xl">
              Bergabung dengan komunitas belajar bahasa isyarat untuk memperluas
              aksesibilitas
            </p>
            <Button
              children={"Bergabung sekarang"}
              onClick={undefined}
            ></Button>
          </div>
          <div className="flex-shrink-0">
            <Image
              className="w-auto h-auto"
              src="/home.webp"
              alt="asd"
              width={380}
              height={300}
            />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
