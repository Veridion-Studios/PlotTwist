import { Merriweather } from "next/font/google";
import GameScreen from "@/components/GameScreen";
import fs from "fs";
import path from "path";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function PlayPage() {
  const filePath = path.join(process.cwd(), "data", "mysteries", "manuscript.json");
  let mystery;

  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    mystery = JSON.parse(fileContents);
  } catch {
    return <p>Mystery not found.</p>;
  }

  return (
    <div className={merriweather.className}>
      <GameScreen mystery={mystery} />
    </div>
  );
}
