import { useState, useRef, useEffect } from 'react';

export default function CaseInsightsSection({ caseStudies }) {
  const [activeTab, setActiveTab] = useState('caseStudies');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Deflt casestudies
  const defaultCaseStudies = [
    { title: "ONDC Case Study", image: "https://picsum.photos/400/300?random=1" },
    { title: "Jal Jeevan Mission Case Study", image: "https://picsum.photos/400/300?random=2" },
    { title: "FinEasy Case Study", image: "https://picsum.photos/400/300?random=3" },
    { title: "Digital Transformation Case Study", image: "https://picsum.photos/400/300?random=4" },
    { title: "Smart City Initiative Case Study", image: "https://picsum.photos/400/300?random=5" }
  ];

  const studies = caseStudies || defaultCaseStudies;

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const moveBy = scrollRef.current.clientWidth;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -moveBy : moveBy,
      behavior: 'smooth',
    });
  };

  //  scroll position nd dot
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const pageWidth = scrollRef.current.clientWidth;
      const index = Math.round(scrollRef.current.scrollLeft / pageWidth);
      setActiveIndex(index);
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [studies.length]);

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;

    const moveBy = scrollRef.current.clientWidth;

    scrollRef.current.scrollTo({
      left: index * moveBy,
      behavior: 'smooth',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-16">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          Case Insights & Key Projects
        </h2>
        <div className="flex items-center bg-gray-100 rounded-full p-1">
          <button
            type="button"
            onClick={() => setActiveTab('caseStudies')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'caseStudies'
              ? 'bg-white shadow text-black'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Case Studies
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'projects'
              ? 'bg-white shadow text-black'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Projects
          </button>
        </div>
      </div>


      {activeTab === 'caseStudies' ? (
        <div>

          <div className="relative">
            <div
              ref={scrollRef}
              className="overflow-x-scroll scroll-smooth pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex gap-6" style={{ width: 'max-content' }}>
                {studies.map((study, index) => (
                  <div
                    key={index}
                    className="case-card bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    style={{
                      width: '320px',
                      flexShrink: 0,
                      scrollSnapAlign: 'start'
                    }}
                  >
                    <div className="p-4">
                      <div className="w-full h-56 bg-gray-100 rounded-xl overflow-hidden mb-4">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 px-2">
                        {study.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow Navigation */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg hover:bg-gray-50 transition-all"
              aria-label="Previous"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg hover:bg-gray-50 transition-all"
              aria-label="Next"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/*  Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {studies.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToCard(index)}
                className={`rounded-full transition-all duration-300 ${activeIndex === index
                  ? 'w-3 h-3 bg-gray-800'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Project empty*/
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Projects coming soon.
            </h3>
            <p className="text-gray-500">
              This section will showcase featured projects in the future.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
