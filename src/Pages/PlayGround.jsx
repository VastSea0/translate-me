import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Gamepad2Icon } from "lucide-react";
const games = [
  {
    title: "SwipeLingo",
    description: "Kelime kaydırma oyunu.",
    points: 30,
    hashtags: ["#kelime", "#kaydırma", "#oyun"],
    tags: ["Eğlenceli", "Zorlayıcı"],
    "language": "english",
    id: 1
  },
  {
    title: "Nihongo Sensei",
    description: "Geleneksel Japon ses sistemlerini öğrenin",
    points: 170,
    hashtags: ["#Japonca", "#Hiragana", "#Katakana"],
    tags: ["Eğitici", "Zor"],
    "language": "japanese",
    id: 2
  },
  {
    title: "数学の先生 (sūgaku no sensei) ",
    description: "Japonca sayıları öğrenin.",
    points: 200,
    hashtags: ["#sayısal", "#japon", "#kanji"],
    tags: ["Eğitici", "Japonca"],
    "language": "japanese",
    id : 3
  },
  {
    title: "Harf Seçme (Japonca)",
    description: "Doğru harfi seçin.",
    points: 120,
    hashtags: ["#harf", "#seçme", "#oyun"],
    tags: ["Eğitici", "Japonca"], 
    "language": "japanese",
    id: 4
  },
  {
    title: "Kelime Bulmaca",
    description: "Verilen ipuçlarına göre kelimeyi bulun.",
    points: 180,
    hashtags: ["#bulmaca", "#kelime", "#oyun"],
    tags: ["Eğlenceli", "Zorlayıcı"],
    "language": "turkish",
    id: 5
  },
  {
    title: "Şarkı Çevirme",
    description: "Sevdiğiniz şarkıları çevirin.",
    points: 160,
    hashtags: ["#şarkı", "#toplulık", "#oyun"],
    tags: ["Eğlenceli", "Sosyal"],
    "language": "all",
    id: 6
  }
];

export default function PlayGround() {
  const [languageFilter, setLanguageFilter] = useState("all");


  const handleLanguageFilterChange = (e) => {
    setLanguageFilter(e.target.value);
  }

  const filteredGames = languageFilter === "all" 
    ? games 
    : games.filter(game => game.language === languageFilter);

  return (
    <div className="container mx-auto mt-5 p-4">
      <h2 className="text-3xl font-bold mb-4">PlayGround</h2>
      <div className="mb-4 flex justify-center text-center">
        <select 
          value={languageFilter} 
          onChange={handleLanguageFilterChange}
          className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="english">English</option>
          <option value="japanese">Japanese</option>
          <option value="turkish">Turkish</option>
          <option value="german">German</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredGames.map((game, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
            <p className="text-gray-700 mb-4">{game.description}</p>
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                {game.points} Kelime/Karakter
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