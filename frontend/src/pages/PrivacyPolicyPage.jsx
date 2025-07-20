import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center mb-4">
            <Shield size={32} className="text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Account information (name, email address)</li>
              <li>Recipe preferences and favorites</li>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to provide, maintain, and improve our services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide personalized recipe recommendations</li>
              <li>To maintain your account and preferences</li>
              <li>To communicate with you about our services</li>
              <li>To improve our platform and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to access, update, or delete your personal information. 
              You can do this through your account settings or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:19210999@bsi.ac.id" className="text-purple-600 hover:text-purple-800">
                19210999@bsi.ac.id
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;