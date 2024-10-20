import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2Icon } from "lucide-react";
const games = [
  {
    title: "SwipeLingo",
    description: "Kelime kaydırma oyunu.",
    points: 100,
    hashtags: ["#kelime", "#kaydırma", "#oyun"],
    tags: ["Eğlenceli", "Zorlayıcı"],
    id: 1
  },
  {
    title: "4'lü Olasılıklı Kelime Seçme",
    description: "Doğru kelimeyi seçin.",
    points: 150,
    hashtags: ["#kelime", "#seçme", "#oyun"],
    tags: ["Eğitici", "Zor"],
    id: 2
  },
  {
    title: "Cümle Çevirme",
    description: "Cümleleri doğru çevirin.",
    points: 200,
    hashtags: ["#çeviri", "#cümle", "#oyun"],
    tags: ["Eğitici", "Öğretici"],
    id : 3
  },
  {
    title: "Harf Seçme (Japonca)",
    description: "Doğru harfi seçin.",
    points: 120,
    hashtags: ["#harf", "#seçme", "#oyun"],
    tags: ["Eğitici", "Japonca"], 
    id: 4
  },
  {
    title: "Kelime Bulmaca",
    description: "Verilen ipuçlarına göre kelimeyi bulun.",
    points: 180,
    hashtags: ["#bulmaca", "#kelime", "#oyun"],
    tags: ["Eğlenceli", "Zorlayıcı"],
    id: 5
  }
];

export default function PlayGround() {
  return (
    <div className="container mx-auto mt-5 p-4">
      <h2 className="text-3xl font-bold mb-4">PlayGround</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {games.map((game, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
            <p className="text-gray-700 mb-4">{game.description}</p>
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                {game.points} Puan
              </span>
              {game.hashtags.map((hashtag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {hashtag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap">
              {game.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-green-200 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
              <Link
                to={`/playground/${game.id}`}
                className="bg-blue-600 text-white text-sm font-semibold px-2.5 py-1 rounded ml-auto"
                >
                <span className="">
                    <Gamepad2Icon size={32} />
                </span>
            
                </Link>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}