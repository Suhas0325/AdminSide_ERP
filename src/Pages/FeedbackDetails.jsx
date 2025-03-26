import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackDetails() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8080/api/admin/getFeedback')
      .then(response => {
        setFeedbackData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Get unique courses
  const courses = [...new Set(feedbackData.map(fb => fb.courseName))];

  // Get unique faculties for the selected course
  const faculties = feedbackData
    .filter(fb => fb.courseName === selectedCourse)
    .map(fb => fb.facultyName)
    .filter((value, index, self) => self.indexOf(value) === index);

  // Get feedback for selected course & faculty
  const filteredFeedback = feedbackData.filter(
    fb => fb.courseName === selectedCourse && fb.facultyName === selectedFaculty
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Feedback Data...</h2>
          <p className="text-gray-500">Please wait while we fetch the latest feedback</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Feedback Analytics Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive insights into student feedback for courses and faculty members
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Selection Panel */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="max-w-5xl mx-auto">
              {/* Course Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Select a Course
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {courses.map(course => (
                    <button
                      key={course}
                      onClick={() => { setSelectedCourse(course); setSelectedFaculty(null); }}
                      className={`p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${selectedCourse === course ? 'bg-white text-indigo-600 shadow-lg' : 'bg-indigo-700 text-white hover:bg-indigo-800 shadow-md'}`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>

              {/* Faculty Selection */}
              {selectedCourse && (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Select Faculty Member
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {faculties.map(faculty => (
                      <button
                        key={faculty}
                        onClick={() => setSelectedFaculty(faculty)}
                        className={`p-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${selectedFaculty === faculty ? 'bg-white text-indigo-600 shadow-lg' : 'bg-indigo-700 text-white hover:bg-indigo-800 shadow-md'}`}
                      >
                        {faculty}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feedback Display */}
          {selectedFaculty && (
            <div className="p-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                    Feedback Analysis for <span className="text-indigo-600">{selectedCourse}</span> by <span className="text-purple-600">{selectedFaculty}</span>
                  </h2>
                  <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {filteredFeedback.length} {filteredFeedback.length === 1 ? 'Response' : 'Responses'}
                  </div>
                </div>

                {filteredFeedback.length > 0 ? (
                  <div className="space-y-6">
                    {filteredFeedback.map((fb, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
                      >
                        {/* Student Info Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-100">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              {fb.studentName} 
                              <span className="text-gray-500 font-normal ml-2">({fb.studentId})</span>
                            </h3>
                            <div className="flex items-center mt-1 space-x-4">
                              <span className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {fb.timeTaken}s
                              </span>
                              <span className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                CGPA: {fb.cgpa}
                              </span>
                              <span className="flex items-center text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Attendance: {fb.attendance}%
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                              Submitted
                            </span>
                          </div>
                        </div>

                        {/* Feedback Responses */}
                        <div>
                          <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Feedback Responses
                          </h4>
                          <div className="space-y-4">
                            {Object.entries(fb.feedback).map(([questionId, response]) => (
                              <div key={questionId} className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium text-gray-800">{response.question}</p>
                                <p className="mt-1 text-gray-700 pl-4 border-l-2 border-indigo-300">
                                  {response.answer}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No Feedback Found</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      There are no feedback submissions for {selectedFaculty} in {selectedCourse} yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!selectedCourse && (
            <div className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Select a Course to Begin</h3>
                <p className="text-gray-600 mb-6">
                  Choose a course from the options above to view detailed feedback analytics
                </p>
                <div className="animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackDetails;