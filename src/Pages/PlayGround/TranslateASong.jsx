import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore, auth } from '../../firebase/firebase'; // auth fonksiyonunu doğru şekilde içe aktarın
import Loading from "../../Components/Loading";
import PlayGroundHeader from "../../Components/PlayGroundHeader";

export default function TranslateASong() {
  const [lyrics, setLyrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [newLyric, setNewLyric] = useState({
    title: "",
    lyrics: "",
    translated: "",
    language: "",
    translatedLanguage: "",
    author: "",
    "yt-link": "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => { // auth fonksiyonunu doğru şekilde çağırın
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    const fetchData = async () => {
      const data = await firestore.collection("lyrics").get();
      setLyrics(data.docs.map((doc) => {
        const lyricData = doc.data();
        return {
          ...lyricData,
          id: doc.id,
          date: lyricData.date.toDate().toLocaleDateString() 
        };
      }));
      setLoading(false);
    }
    fetchData();
    return () => unsubscribe();

  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLyric({ ...newLyric, [name]: value });
  };

  const addNewLyric = async () => {
    const lyricToAdd = {
      ...newLyric,
      translator: user.displayName,
      date: new Date(),
      likes: 0,
      dislikes: 0,
    };

    const docRef = await firestore.collection("lyrics").add(lyricToAdd);
    setLyrics([...lyrics, { ...lyricToAdd, id: docRef.id, date: lyricToAdd.date.toLocaleDateString() }]);
    setNewLyric({
      title: "",
      lyrics: "",
      translated: "",
      language: "",
      translatedLanguage: "",
      author: "",
      "yt-link": "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <PlayGroundHeader name={"Translated Songs"} />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Translate a Song</h1>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Create A New Lyrics</h2>
            <p className="text-gray-600">Submit new song lyrics and start translating!</p>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Song Title"
              value={newLyric.title}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="lyrics"
              placeholder="Original Lyrics"
              value={newLyric.lyrics}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              name="translated"
              placeholder="Translated Lyrics"
              value={newLyric.translated}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="language"
              placeholder="Original Language"
              value={newLyric.language}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="translatedLanguage"
              placeholder="Translated Language"
              value={newLyric.translatedLanguage}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={newLyric.author}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="yt-link"
              placeholder="Youtube Link"
              value={newLyric["yt-link"]}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg"
            />
            <button 
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              onClick={addNewLyric}
            >
              Add Lyrics
            </button>
          </form>
        </div>
        <hr className="my-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lyrics.map((lyric, index) => (
            <div className="bg-white shadow-md rounded-lg p-6" key={index}>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{lyric.title}</h3>
              </div>
              <div className="space-y-2">
                <p><strong>Language:</strong> {lyric.language} ➔ {lyric.translatedLanguage}</p>
                <p><strong>Author:</strong> {lyric.author}</p>
                <p><strong>Translator:</strong> {lyric.translator}</p>
                <p><strong>Date:</strong> {lyric.date}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-green-600">
                  <span className="mr-2">👍 {lyric.likes}</span>
                  <span>👎 {lyric.dislikes}</span>
                </div>
                <Link className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300" to={`/lyric/${lyric.id}`}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}