import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase/firebase';
import { User, Mail, Edit2, Save, Award, Clock} from 'lucide-react';
import { Fire } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
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
    return <Loading />;
  }

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8 text-center"
      >
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> Bu sayfayı görüntülemek için giriş yapmanız gerekmektedir.</span>
        </div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className=" bg-green-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
        <div className="relative h-48 bg-green-500">
          <motion.div 
            className="absolute -bottom-16 left-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="w-32 h-32 rounded-full border-4 border-white bg-yellow-400 flex items-center justify-center">
              <User size={64} className="text-white" />
            </div>
          </motion.div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <motion.div className="flex justify-between items-start" variants={itemVariants}>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {editing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="border-b-2 border-green-500 focus:outline-none focus:border-green-700 bg-transparent"
                  />
                ) : user.displayName}
              </h1>
              <div className="mt-2 flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                {user.email}
              </div>
            </div>
            <motion.button
              onClick={() => setEditing(!editing)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {editing ? (
                <Save size={16} className="mr-2" />
              ) : (
                <Edit2 size={16} className="mr-2" />
              )}
              {editing ? 'Kaydet' : 'Düzenle'}
            </motion.button>
          </motion.div>

          {editing ? (
            <motion.form onSubmit={handleSubmit} className="mt-6" variants={itemVariants}>
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
                    className="mt-1 block w-full border-2 border-green-300 rounded-md shadow-sm p-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Değişiklikleri Kaydet
                  </motion.button>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div className="mt-6" variants={itemVariants}>
              <h2 className="text-xl font-semibold text-gray-900">Hakkımda</h2>
              <p className="mt-2 text-gray-600">
                {user.bio || 'Henüz bir bio eklenmemiş.'}
              </p>
            </motion.div>
          )}

          {updateSuccess && (
            <motion.div 
              className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Profiliniz başarıyla güncellendi!
            </motion.div>
          )}

          {updateError && (
            <motion.div 
              className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {updateError}
            </motion.div>
          )}
        </div>

        <motion.div className="border-t border-gray-200" variants={itemVariants}>
          <div className="px-8 py-6">
            <h2 className="text-2xl font-semibold text-gray-900">İstatistikler</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <motion.div 
                className="bg-yellow-100 p-4 rounded-lg shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <span className="ml-2 text-sm font-medium text-gray-500">Skor</span>
                </div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {user.userScore || 0}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-blue-100 p-4 rounded-lg shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <span className="ml-2 text-sm font-medium text-gray-500">Katılım Tarihi</span>
                </div>
                <div className="mt-2 text-sm font-medium text-gray-900">
                  {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'Bilinmiyor'}
                </div>
              </motion.div>

              <motion.div 
                className="bg-red-100 p-4 rounded-lg shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <div className="flex items-center">
                  <Fire className="h-8 w-8 text-red-500" />
                  <span className="ml-2 text-sm font-medium text-gray-500">Öğrenme Serisi</span>
                </div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {user.learningStreak || 0} gün
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}