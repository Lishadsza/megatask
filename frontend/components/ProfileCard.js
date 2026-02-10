import Link from 'next/link';

export default function ProfileCard({ profile }) {
  return (
    <Link href={`/profile/${profile.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group">
        
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 h-24 md:h-28 relative"></div>

        
        <div className="relative px-6 pb-6 pt-0">
         
          <div className="flex justify-center -mt-12 md:-mt-14 mb-4">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Name and Details */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
              {profile.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mb-4">
              {profile.gender || 'Male'} | {profile.age || '25'} | {profile.pronouns || 'He/Him'}
            </p>

            {/* Download  Button */}
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all group-hover:border-orange-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download My Resume
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
