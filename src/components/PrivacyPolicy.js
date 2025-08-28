import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                place an order, or contact us. This may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name, email address, phone number, and delivery address</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Process and fulfill your food orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Process payments securely through our payment gateway</li>
                <li>Improve our services and user experience</li>
                <li>Send you promotional communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Payment Information Security</h2>
              <p className="mb-4">
                We use Razorpay (owned by Razorpay Software Private Limited) as our payment processor. 
                Your payment information is encrypted and processed securely according to PCI DSS standards. 
                We do not store your complete credit card or debit card information on our servers.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Payment Gateway Information:</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-1">
                  <li><strong>Payment Processor:</strong> Razorpay Software Private Limited</li>
                  <li><strong>Registration:</strong> CIN U72200KA2013PTC097389</li>
                  <li><strong>Address:</strong> First Floor, SJR Cyber, Laskar Hosur Road, Adugodi, Bengaluru - 560030</li>
                  <li><strong>Compliance:</strong> RBI Authorized Payment Aggregator</li>
                  <li><strong>Security Standards:</strong> PCI DSS Level 1 Compliant</li>
                </ul>
              </div>
              <p className="mb-4">
                When you make a payment through our platform, the following information may be collected 
                and processed by Razorpay:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Payment card details (encrypted and tokenized)</li>
                <li>Bank account information for UPI/Net Banking transactions</li>
                <li>Mobile wallet information</li>
                <li>Transaction amount and currency</li>
                <li>Merchant transaction reference</li>
                <li>Device and browser information for fraud prevention</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Delivery partners to fulfill your orders</li>
                <li>Payment processors (Razorpay) to process transactions</li>
                <li>Service providers who assist in operating our platform</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of promotional communications</li>
                <li>Request a copy of your personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience, remember your 
                preferences, and analyze site usage. You can control cookie settings through your 
                browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Business Information</h2>
              <p className="mb-4">
                This website is operated by FoodWeb, a food delivery service. Our business details:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p><strong>Business Name:</strong> FoodWeb Food Delivery Services</p>
                <p><strong>Business Type:</strong> Food Delivery and Online Restaurant Platform</p>
                <p><strong>Registration:</strong> [Your Business Registration Number]</p>
                <p><strong>GST Number:</strong> [Your GST Registration Number]</p>
                <p><strong>FSSAI License:</strong> [Your FSSAI License Number]</p>
                <p><strong>Website:</strong> https://foodweb.com</p>
                <p><strong>Business Address:</strong> [Your Complete Business Address]</p>
              </div>
              <p className="mb-4">
                We are committed to operating in full compliance with applicable laws and regulations 
                including the Information Technology Act, 2000, Consumer Protection Act, 2019, and 
                Food Safety and Standards Act, 2006.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><strong>Privacy Officer:</strong> [Your Privacy Officer Name]</p>
                <p><strong>Email:</strong> privacy@foodweb.com</p>
                <p><strong>Customer Support:</strong> support@foodweb.com</p>
                <p><strong>Phone:</strong> +91-[Your Phone Number]</p>
                <p><strong>WhatsApp:</strong> +91-[Your WhatsApp Number]</p>
                <p><strong>Business Address:</strong> [Your Complete Registered Address with PIN]</p>
                <p><strong>Support Hours:</strong> 9:00 AM - 10:00 PM (All days)</p>
                <p><strong>Response Time:</strong> We respond to privacy queries within 48 hours</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;