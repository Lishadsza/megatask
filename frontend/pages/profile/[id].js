import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CaseInsightsSection from '../../components/CaseInsightsSection';

export default function ProfileDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const scrollToVideo = () => {
    const videoSection = document.getElementById('visual-resume-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (!id) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/profiles/${id}`)
      .then(res => {
        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setProfile(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Profile not found</p>
          <Link href="/">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Back to Profiles
            </button>
          </Link>
        </div>
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


      <div className="relative bg-gradient-to-r from-orange-400 to-orange-600 h-64 md:h-72 flex items-center justify-center">
        {/* Contact*/}
        <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 flex flex-row gap-3 md:gap-4">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 md:gap-2 text-white hover:bg-white/10 transition-all px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/50">
            <svg className="w-4 h-4 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span className="text-xs md:text-sm font-medium">Email</span>
          </a>
          <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 md:gap-2 text-white hover:bg-white/10 transition-all px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/50">
            <svg className="w-4 h-4 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="text-xs md:text-sm font-medium">Phone</span>
          </a>
        </div>

        {/* Profile Image*/}
        <div className="absolute bottom-0 translate-y-1/2 flex justify-center">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-8 border-white shadow-xl"
          />
        </div>

        {/* Download Resume Button */}
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2">
          <button className="px-4 py-2 md:px-6 md:py-2.5 bg-transparent hover:bg-white/10 text-white font-medium rounded-full text-xs md:text-sm transition-all flex items-center justify-center gap-2 border-2 border-white">
            <svg className="w-4 h-4 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            <span className="whitespace-nowrap">Download My Resume</span>
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="text-center px-4 mb-8 mt-24 md:mt-32">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {profile.name}
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-6">
          {profile.gender} | {profile.age} | {profile.pronouns}
        </p>

        {/* Watch Visual Resume Button */}
        <button
          onClick={scrollToVideo}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-6 rounded-full transition-all text-sm md:text-base"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch my Visual Resume Now
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm border-b border-gray-200">
          <button className="px-2 md:px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap">
            Core Skills & Technical Proficiencies
          </button>
          <button className="px-2 md:px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap">
            Professional Journey & Internship Roles
          </button>
          <button className="px-2 md:px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap">
            Case Insights & Key Projects
          </button>
          <button className="px-2 md:px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap">
            Learning & Academic Milestones
          </button>
          <button className="px-2 md:px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-all whitespace-nowrap">
            Endorsements from Mentors & Peers
          </button>
        </div>
      </div>

      {/* About  */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-lg p-6 md:p-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base text-center">
            {profile.about}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-8">
          {profile.skills && profile.skills.map((skill, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center opacity-30 hover:opacity-100 transition-all"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 object-contain grayscale"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Case Studis*/}
      <CaseInsightsSection caseStudies={profile.caseStudies} />

      {/* Visual Resume*/}
      <div id="visual-resume-section" className="max-w-5xl mx-auto px-4 mb-12 scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          Visual Resume
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={profile.videoUrl}
              title="Visual Resume"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Connect  */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
            Connect with {profile.name}
          </h2>
          <button className="bg-white hover:bg-gray-50 text-orange-500 font-medium py-3 px-6 md:px-8 rounded-full transition-all inline-flex items-center justify-center gap-2 text-sm md:text-base w-full max-w-xs md:w-auto">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download My Resume</span>
          </button>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center mt-6 md:mt-8">
          <a href={`mailto:${profile.email}`} className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm md:text-base font-medium">Email</span>
          </a>
          <a href={`tel:${profile.phone}`} className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm md:text-base font-medium">Phone</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm md:text-base font-medium">GitHub</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="text-sm md:text-base font-medium">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pb-8 md:pb-12">
        <Link href="/">
          <button className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 transition-colors text-base md:text-base">
            <span>←</span> Back to Profiles
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        © 2024 NMIMS BANGALORE
      </footer>
    </div>
  );
}
