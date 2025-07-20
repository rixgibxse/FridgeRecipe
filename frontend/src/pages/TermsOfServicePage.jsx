import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsOfServicePage = () => {
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
            <FileText size={32} className="text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using FridgeRecipe, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily use FridgeRecipe for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times. You are responsible for safeguarding the password 
              and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use our service:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Content</h2>
            <p className="text-gray-700 mb-4">
              Our service allows you to save and organize recipes. You are responsible for the content 
              you save and must ensure you have the right to use such content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and bar access to the service immediately, 
              without prior notice or liability, under our sole discretion, for any reason whatsoever 
              and without limitation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us at{' '}
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

export default TermsOfServicePage;