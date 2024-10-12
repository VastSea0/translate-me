import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase/firebase';
import Loading from '../Components/Loading';
import PlayGroundHeader from '../Components/PlayGroundHeader';

export default function Song() {
  const { id } = useParams();
  const [lyric, setLyric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchLyric = async () => {
      const doc = await firestore.collection('lyrics').doc(id).get();
      if (doc.exists) {
        setLyric(doc.data());
        const commentsSnapshot = await firestore.collection('lyrics').doc(id).collection('comments').get();
        setComments(commentsSnapshot.docs.map(doc => doc.data()));
      }
      setLoading(false);
    };
    fetchLyric();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!lyric) {
    return <div className="container mx-auto mt-5 p-4">Şarkı bulunamadı.</div>;
  }

  const handleLike = async () => {
    await firestore.collection('lyrics').doc(id).update({
      likes: lyric.likes + 1
    });
    setLyric({ ...lyric, likes: lyric.likes + 1 });
  };

  const handleDislike = async () => {
    await firestore.collection('lyrics').doc(id).update({
      dislikes: lyric.dislikes + 1
    });
    setLyric({ ...lyric, dislikes: lyric.dislikes + 1 });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      text: comment,
      timestamp: new Date()
    };
    await firestore.collection('lyrics').doc(id).collection('comments').add(newComment);
    setComments([...comments, newComment]);
    setComment('');
  };

  return (
    <>
            <PlayGroundHeader name={"lyricser"} />
   
    <div className="container mx-auto mt-5 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{lyric.title}</h1>
          <p className="text-gray-700 mt-2"><strong>Author:</strong> {lyric.author}</p>
          <p className="text-gray-700"><strong>Translator:</strong> {lyric.translator}</p>
          <p className="text-gray-700"><strong>Date:</strong> {lyric.date.toDate().toLocaleDateString()}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Original Lyrics</h2>
          <p className="text-gray-900 whitespace-pre-line mt-2">{lyric.lyrics}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Translated Lyrics</h2>
          <p className="text-gray-900 whitespace-pre-line mt-2">{lyric.translated}</p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center text-green-600">
            <button onClick={handleLike} className="mr-4 flex items-center">
              👍 <span className="ml-2">{lyric.likes}</span>
            </button>
            <button onClick={handleDislike} className="flex items-center">
              👎 <span className="ml-2">{lyric.dislikes}</span>
            </button>
          </div>
          <iframe 
          width="560" 
          height="315" 
          src={`https://www.youtube.com/embed/${lyric['yt-link']}?si=34R2smBJtZ8mEy4R`} 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen>
            
          </iframe>
    
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="4"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
          <div className="mt-6">
            {comments.map((comment, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <p className="text-gray-800">{comment.text}</p>
                <p className="text-gray-600 text-sm">{new Date(comment.timestamp.seconds * 1000).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}