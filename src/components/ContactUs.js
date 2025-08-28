import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message. We will get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with FoodWeb - We're here to help you 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h2>
            
            {/* Primary Business Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 text-sm">🏢</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">FoodWeb Food Delivery Services</p>
                    <p className="text-sm text-gray-600">Online Food Ordering and Delivery Platform</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 text-sm">📧</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">support@foodweb.com</p>
                    <p className="text-sm text-gray-600">General inquiries and customer support</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 text-sm">📱</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">+91-[Your Phone Number]</p>
                    <p className="text-sm text-gray-600">24/7 Customer Support Helpline</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 text-sm">📍</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">[Your Complete Business Address]</p>
                    <p className="text-sm text-gray-600">[City, State, PIN Code]</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal and Registration Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Business Registration:</strong> [Your Business Registration Number]</p>
                <p><strong>GST Registration:</strong> [Your GST Number]</p>
                <p><strong>FSSAI License:</strong> [Your FSSAI License Number]</p>
                <p><strong>Website:</strong> https://foodweb.com</p>
                <p><strong>Incorporated:</strong> [Year of Incorporation]</p>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Contacts</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Customer Support</span>
                  <span className="text-blue-600">support@foodweb.com</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Legal & Compliance</span>
                  <span className="text-blue-600">legal@foodweb.com</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Refunds & Payments</span>
                  <span className="text-blue-600">refunds@foodweb.com</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Privacy Officer</span>
                  <span className="text-blue-600">privacy@foodweb.com</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Grievance Officer</span>
                  <span className="text-blue-600">grievance@foodweb.com</span>
                </div>
              </div>
            </div>

            {/* Payment Gateway Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Processing</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-800 mb-2">Payment Gateway Partner:</p>
                <p><strong>Razorpay Software Private Limited</strong></p>
                <p className="text-sm text-blue-700">RBI Authorized Payment Aggregator</p>
                <p className="text-sm text-blue-700">PCI DSS Level 1 Compliant</p>
                <p className="text-sm text-blue-700 mt-2">
                  All payments are processed securely through Razorpay's encrypted platform
                </p>
              </div>
            </div>

            {/* Support Hours */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Hours</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-medium text-green-800">Customer Support:</p>
                <p className="text-green-700">Monday - Sunday: 9:00 AM - 11:00 PM</p>
                <p className="font-medium text-green-800 mt-2">Emergency Support:</p>
                <p className="text-green-700">24/7 for payment and delivery issues</p>
                <p className="font-medium text-green-800 mt-2">Response Time:</p>
                <p className="text-green-700">Email: Within 24 hours | Phone: Immediate</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="general">General Inquiry</option>
                  <option value="orders">Order Issues</option>
                  <option value="payments">Payment Problems</option>
                  <option value="refunds">Refund Requests</option>
                  <option value="delivery">Delivery Issues</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="legal">Legal & Compliance</option>
                  <option value="partnership">Restaurant Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 font-medium"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> For urgent matters related to orders or payments, 
                please call our 24/7 helpline at +91-[Your Phone Number] or 
                WhatsApp us for immediate assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I track my order?</h3>
              <p className="text-gray-600 text-sm">
                You can track your order in real-time through our app or by logging into 
                your account on our website.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit/debit cards, UPI payments, net banking, 
                digital wallets, and cash on delivery.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How long does delivery take?</h3>
              <p className="text-gray-600 text-sm">
                Standard delivery time is 30-45 minutes. During peak hours, 
                it may take up to 60 minutes.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I cancel my order?</h3>
              <p className="text-gray-600 text-sm">
                Orders can be cancelled within 5 minutes of placement. 
                After restaurant confirmation, cancellation may not be possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;