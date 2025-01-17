import React, { useState, useRef } from 'react';
import { Camera, Edit2, MapPin, Briefcase, Mail, Link as LinkIcon, Save, X, Loader2 } from 'lucide-react';
import { useProfile, ProfileData } from '../contexts/ProfileContext';

export function Profile() {
  const { profile, loading, updateProfile, uploadProfileImage } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!profile) {
    return <div>Error loading profile</div>;
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const downloadURL = await uploadProfileImage(file);
        setEditedProfile(prev => ({
          ...(prev || profile),
          photoURL: downloadURL
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        // Add error handling UI here
      }
    }
  };

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedProfile) return;
    
    setIsSaving(true);
    try {
      await updateProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      // Add error handling UI here
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(null);
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setEditedProfile(prev => ({
      ...(prev || profile),
      [field]: value
    }));
  };

  const displayData = editedProfile || profile;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
      {/* Rest of the component remains the same, but update the data binding */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      <div className="relative px-6 pb-6">
        <div className="relative -mt-24 mb-4">
          <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden relative bg-gray-100">
            <img
              src={displayData.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <button
                onClick={handlePhotoClick}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white"
              >
                <Camera className="w-6 h-6" />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="absolute top-2 right-6 space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="space-y-4">
          {isEditing ? (
            <input
              type="text"
              value={displayData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="text-2xl font-bold text-gray-900 w-full border-b border-gray-300 focus:border-indigo-500 focus:ring-0"
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-900">{displayData.fullName}</h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={displayData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-lg text-gray-600 w-full border-b border-gray-300 focus:border-indigo-500 focus:ring-0"
            />
          ) : (
            <p className="text-lg text-gray-600">{displayData.title}</p>
          )}

          <div className="flex items-center space-x-4 text-gray-500">
            {isEditing ? (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <input
                  type="text"
                  value={displayData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="border-b border-gray-300 focus:border-indigo-500 focus:ring-0"
                />
              </div>
            ) : (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {displayData.location}
              </span>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            {isEditing ? (
              <textarea
                value={displayData.about}
                onChange={(e) => handleChange('about', e.target.value)}
                className="w-full h-32 border rounded-md p-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-600">{displayData.about}</p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Experience</h2>
            {isEditing ? (
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <input
                  type="text"
                  value={displayData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className="flex-1 border-b border-gray-300 focus:border-indigo-500 focus:ring-0"
                />
              </div>
            ) : (
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                {displayData.experience}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
            <div className="space-y-2">
              {isEditing ? (
                <>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <input
                      type="email"
                      value={displayData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-indigo-500 focus:ring-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <input
                      type="url"
                      value={displayData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-indigo-500 focus:ring-0"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {displayData.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <LinkIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <a href={displayData.website} className="text-indigo-600 hover:text-indigo-500">
                      {displayData.website}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
