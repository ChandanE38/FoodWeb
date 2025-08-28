import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using FoodWeb, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do 
                not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. About FoodWeb</h2>
              <p className="mb-4">
                FoodWeb is an online food ordering and delivery platform operated by:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p><strong>Business Name:</strong> FoodWeb Food Delivery Services</p>
                <p><strong>Business Type:</strong> Food Aggregator and Delivery Platform</p>
                <p><strong>Registration Number:</strong> [Your Business Registration Number]</p>
                <p><strong>GST Registration:</strong> [Your GST Number]</p>
                <p><strong>FSSAI License:</strong> [Your FSSAI License Number]</p>
                <p><strong>Registered Office:</strong> [Your Complete Business Address]</p>
                <p><strong>Website:</strong> https://foodweb.com</p>
                <p><strong>Customer Support:</strong> support@foodweb.com</p>
              </div>
              <p className="mb-4">
                We connect customers with restaurants and food vendors, facilitating the ordering process 
                and coordinating delivery through our partner network. We operate in full compliance with 
                applicable laws including Consumer Protection Act, 2019 and Food Safety Standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Service Description</h2>
              <p className="mb-4">
                FoodWeb is an online food ordering and delivery platform that connects customers 
                with restaurants and food vendors. We facilitate the ordering process and coordinate 
                delivery through our partner network.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
              <p className="mb-4">To use our service, you must:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be at least 18 years old or have parental consent</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not share your account with others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Payment Processing and Gateway Terms</h2>
              <p className="mb-4">Payment processing is handled by our authorized payment partner:</p>
              <div className="bg-orange-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-orange-800 mb-2">Payment Gateway Information:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-1">
                  <li><strong>Payment Processor:</strong> Razorpay Software Private Limited</li>
                  <li><strong>RBI Authorization:</strong> Authorized Payment Aggregator</li>
                  <li><strong>Security Compliance:</strong> PCI DSS Level 1 Certified</li>
                  <li><strong>Registration:</strong> CIN U72200KA2013PTC097389</li>
                </ul>
              </div>
              <p className="mb-4">By using our payment services, you agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate payment information for all transactions</li>
                <li>Only use payment methods that you are legally authorized to use</li>
                <li>Accept that payment processing is subject to Razorpay's terms and conditions</li>
                <li>Understand that failed transactions may take 3-7 business days for refund processing</li>
                <li>Authorize automatic payment processing for confirmed orders</li>
                <li>Accept liability for chargebacks due to unauthorized payment method usage</li>
              </ul>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="text-red-800">
                  <strong>Important:</strong> Using unauthorized payment methods or fraudulent cards 
                  may result in immediate account suspension and legal action.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Ordering and Payment</h2>
              <p className="mb-4">When placing an order:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All orders are subject to availability and restaurant acceptance</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment is processed securely through Razorpay</li>
                <li>You authorize us to charge your payment method for orders placed</li>
                <li>Orders cannot be cancelled once confirmed by the restaurant</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Delivery Terms</h2>
              <p className="mb-4">Regarding food delivery:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Delivery times are estimates and may vary based on location and demand</li>
                <li>You must be available to receive your order at the specified address</li>
                <li>Delivery charges are clearly displayed before order confirmation</li>
                <li>We are not liable for delays caused by weather or traffic conditions</li>
                <li>Special delivery instructions must be provided during ordering</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Food Safety and Quality</h2>
              <p className="mb-4">
                While we work with trusted restaurant partners, food preparation and initial quality 
                control is the responsibility of the restaurant. We encourage you to report any 
                food safety concerns immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Prohibited Uses</h2>
              <p className="mb-4">You may not use our service to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violate any local, state, or national laws</li>
                <li>Harass, abuse, or harm our delivery personnel</li>
                <li>Provide false information or impersonate others</li>
                <li>Attempt to compromise our platform's security</li>
                <li>Use the service for commercial purposes without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Merchant Obligations and Compliance</h2>
              <p className="mb-4">As a merchant operating this platform, we commit to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Maintain valid business registration and required licenses</li>
                <li>Comply with all applicable laws including Consumer Protection Act, 2019</li>
                <li>Maintain FSSAI certification for food safety compliance</li>
                <li>Process refunds in accordance with stated policies and timelines</li>
                <li>Maintain data security and privacy standards</li>
                <li>Provide accurate product descriptions and pricing</li>
                <li>Honor delivery commitments and service quality standards</li>
                <li>Cooperate with payment gateway security and fraud prevention measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Dispute Resolution and Chargeback Policy</h2>
              <p className="mb-4">For payment disputes and chargebacks:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All disputes must be reported within 48 hours of order delivery</li>
                <li>We will investigate all genuine disputes and provide resolution within 7 business days</li>
                <li>Chargeback claims will be contested with proper documentation when valid service was provided</li>
                <li>Customers initiating fraudulent chargebacks may have their accounts permanently suspended</li>
                <li>All dispute communications will be maintained for regulatory compliance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Liability and Disclaimers</h2>
              <p className="mb-4">
                FoodWeb acts as an intermediary between customers and restaurants. We are not liable for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Food quality, taste, or preparation methods</li>
                <li>Allergic reactions or dietary restrictions</li>
                <li>Delays in delivery beyond our reasonable control</li>
                <li>Actions of our delivery partners or restaurant partners</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Intellectual Property</h2>
              <p className="mb-4">
                All content on FoodWeb, including text, graphics, logos, and software, is owned by 
                FoodWeb or its licensors and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Termination</h2>
              <p className="mb-4">
                We reserve the right to terminate or suspend your account at any time for violations 
                of these terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">15. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><strong>Business Name:</strong> FoodWeb Food Delivery Services</p>
                <p><strong>Legal Contact:</strong> legal@foodweb.com</p>
                <p><strong>Customer Support:</strong> support@foodweb.com</p>
                <p><strong>Phone:</strong> +91-[Your Phone Number]</p>
                <p><strong>WhatsApp Support:</strong> +91-[Your WhatsApp Number]</p>
                <p><strong>Registered Address:</strong> [Your Complete Registered Address with PIN]</p>
                <p><strong>GST Number:</strong> [Your GST Registration Number]</p>
                <p><strong>FSSAI License:</strong> [Your FSSAI License Number]</p>
                <p><strong>Support Hours:</strong> 9:00 AM - 10:00 PM (All days)</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">16. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the service constitutes acceptance 
                of any changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;