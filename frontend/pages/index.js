import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/profiles`)
      .then(res => res.json())
      .then(data => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profiles:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm py-6 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">PRME</h1>
          <p className="text-xs text-gray-500">Principles for Responsible Management Education</p>
        </div>
        <div className="text-right">
          <div className="text-sm md:text-base font-semibold text-green-600">AACSB</div>
          <p className="text-xs text-gray-500">ACCREDITED</p>
        </div>
      </header>

      {/* Main Contentt */}
      <div className="py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
            Student Portal - Student Profiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {profiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
