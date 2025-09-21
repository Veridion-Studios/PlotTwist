import { Merriweather } from "next/font/google";
import fs from "fs";
import path from "path";
import GameScreen from "@/components/GameScreen";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // Choose weights you need
});

export default async function PlayPage({ params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), "data/mysteries", `${params.id}.json`);

  if (!fs.existsSync(filePath)) {
    return <p>Mystery not found.</p>;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const mystery = JSON.parse(raw);

  return (
    <div className={merriweather.className}>
      <GameScreen mystery={JSON.parse(JSON.stringify(mystery))} />
    </div>
  );
}
