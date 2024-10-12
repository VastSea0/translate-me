import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/firebase';
import { User, Mail, Edit2, Camera, Award, Clock, Save } from 'lucide-react';
import Loading from '../Components/Loading';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = firestore.collection('users').doc(authUser.uid);
        const userData = await userRef.get();
        if (userData.exists) {
          const data = userData.data();
          setUser(data);
          setFormData({
            displayName: data.displayName || '',
            email: data.email || '',
            bio: data.bio || '',
          });
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setUpdateError('');

    try {
      const userRef = firestore.collection('users').doc(user.userId);
      await userRef.update({
        displayName: formData.displayName,
        bio: formData.bio,
      });

      setUser(prev => ({
        ...prev,
        displayName: formData.displayName,
        bio: formData.bio,
      }));

      setUpdateSuccess(true);
      setEditing(false);
    } catch (error) {
      setUpdateError('Profil güncellenirken bir hata oluştu.');
    }
  };

  if (loading) {
    return (
       <Loading />
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div variant="destructive">
          <div>
            Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 bg-blue-600">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
              <User size={64} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {editing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                ) : user.displayName}
              </h1>
              <div className="mt-1 flex items-center text-gray-500">
                <Mail size={16} className="mr-2" />
                {user.email}
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {editing ? (
                <Save size={16} className="mr-2" />
              ) : (
                <Edit2 size={16} className="mr-2" />
              )}
              {editing ? 'Kaydet' : 'Düzenle'}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hakkımda
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Hakkımda</h2>
              <p className="mt-2 text-gray-600">
                {user.bio || 'Henüz bir bio eklenmemiş.'}
              </p>
            </div>
          )}

          {updateSuccess && (
            <div className="mt-4">
              <div>
                Profiliniz başarıyla güncellendi!
              </div>
            </div>
          )}

          {updateError && (
            <div variant="destructive" className="mt-4">
              <div>{updateError}</div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200">
          <div className="px-8 py-6">
            <h2 className="text-lg font-semibold text-gray-900">İstatistikler</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-blue-500" />
                  <span className="ml-2 text-sm text-gray-500">Skor</span>
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {user.userScore || 0}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-blue-500" />
                  <span className="ml-2 text-sm text-gray-500">Katılım Tarihi</span>
                </div>
                <div className="mt-2 text-sm">
                  {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'Bilinmiyor'}
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}