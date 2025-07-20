import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

const CookiePolicyPage = () => {
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
            <Cookie size={32} className="text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
          </div>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you 
              visit our website. They are widely used to make websites work more efficiently and provide 
              information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies for several reasons:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Session Cookies</h3>
                <p className="text-gray-700">
                  These are temporary cookies that remain in your browser until you leave the website. 
                  They help us maintain your session and remember your preferences during your visit.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Persistent Cookies</h3>
                <p className="text-gray-700">
                  These cookies remain on your device for a set period or until you delete them. 
                  They help us remember your preferences for future visits.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Third-Party Cookies</h3>
                <p className="text-gray-700">
                  We may use third-party services that place cookies on your device to provide 
                  analytics and improve our services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Browser settings: Most browsers allow you to refuse cookies or delete existing ones</li>
              <li>Opt-out tools: Some third-party services provide opt-out mechanisms</li>
              <li>Privacy settings: You can adjust your privacy preferences in your browser</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Please note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Updates to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our use of cookies, please contact us at{' '}
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

export default CookiePolicyPage;