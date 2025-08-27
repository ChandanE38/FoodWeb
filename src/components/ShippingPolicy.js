import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Delivery Policy</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Delivery Coverage</h2>
              <p className="mb-4">
                We currently provide food delivery services to the following areas:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Metropolitan cities and surrounding suburbs</li>
                <li>Areas within a 25 km radius from partner restaurants</li>
                <li>Selected pin codes (check availability during checkout)</li>
                <li>Coverage areas are subject to change based on demand and logistics</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Note:</strong> Enter your delivery address during checkout to confirm if 
                  we deliver to your location.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Delivery Times</h2>
              <p className="mb-4">Our standard delivery times are:</p>
              <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Order Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Estimated Delivery Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Regular Orders</td>
                    <td className="border border-gray-300 px-4 py-2">30-45 minutes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Peak Hours (12-2 PM, 7-9 PM)</td>
                    <td className="border border-gray-300 px-4 py-2">45-60 minutes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Special Occasions</td>
                    <td className="border border-gray-300 px-4 py-2">60-90 minutes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Pre-orders</td>
                    <td className="border border-gray-300 px-4 py-2">As scheduled</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600">
                *Delivery times are estimates and may vary due to weather, traffic, or high demand.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Delivery Charges</h2>
              <p className="mb-4">Delivery charges are calculated based on:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Distance:</strong> Charges vary by delivery distance from restaurant</li>
                <li><strong>Order Value:</strong> Free delivery on orders above ₹299</li>
                <li><strong>Peak Hours:</strong> Additional surge charges may apply during peak times</li>
                <li><strong>Weather Conditions:</strong> Additional charges during extreme weather</li>
              </ul>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  <strong>Free Delivery:</strong> Enjoy free delivery on orders above ₹299 within 
                  our standard delivery zones.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Delivery Process</h2>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Step 1: Order Confirmation</h4>
                  <p className="text-orange-700">Restaurant confirms your order and begins preparation</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Step 2: Pickup</h4>
                  <p className="text-orange-700">Our delivery partner picks up your order from the restaurant</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Step 3: On the Way</h4>
                  <p className="text-orange-700">Track your order in real-time as it heads to your location</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Step 4: Delivery</h4>
                  <p className="text-orange-700">Contactless delivery at your doorstep</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Delivery Guidelines</h2>
              <p className="mb-4">For a smooth delivery experience:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate and complete delivery address with landmarks</li>
                <li>Ensure your phone is reachable during delivery</li>
                <li>Be available at the delivery location</li>
                <li>Provide access codes for gated communities or apartments</li>
                <li>Specify any special delivery instructions during checkout</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contactless Delivery</h2>
              <p className="mb-4">
                We prioritize safety with our contactless delivery service:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Orders are placed at your doorstep</li>
                <li>Delivery partner maintains safe distance</li>
                <li>Digital payment preferred to minimize contact</li>
                <li>Food is packed securely with safety seals</li>
                <li>Delivery partners follow all health and safety protocols</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Failed Delivery Attempts</h2>
              <p className="mb-4">If delivery cannot be completed due to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Customer unavailability after 10 minutes of waiting</li>
                <li>Incorrect or incomplete address information</li>
                <li>Unsafe delivery location conditions</li>
                <li>Customer refusal to accept the order</li>
              </ul>
              <p className="mb-4">
                The order will be returned to the restaurant, and refund policy will apply based on 
                the specific circumstances.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Food Safety During Delivery</h2>
              <p className="mb-4">We ensure food safety by:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Using insulated delivery bags to maintain temperature</li>
                <li>Providing sealed packaging from restaurants</li>
                <li>Training delivery partners on food handling</li>
                <li>Regular sanitization of delivery equipment</li>
                <li>Temperature monitoring for perishable items</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Special Delivery Services</h2>
              <p className="mb-4">We offer additional delivery options:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Scheduled Delivery:</strong> Pre-order for specific times</li>
                <li><strong>Priority Delivery:</strong> Faster delivery for urgent orders</li>
                <li><strong>Group Orders:</strong> Bulk deliveries for offices and events</li>
                <li><strong>Corporate Catering:</strong> Special arrangements for business needs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Delivery Partner Information</h2>
              <p className="mb-4">
                Our delivery partners are:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Trained and verified professionals</li>
                <li>Equipped with GPS tracking for real-time updates</li>
                <li>Insured for your peace of mind</li>
                <li>Available for customer support during delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Delivery Support</h2>
              <p className="mb-4">
                For delivery-related queries or issues:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><strong>Delivery Support:</strong> delivery@foodweb.com</p>
                <p><strong>Helpline:</strong> +91-XXXX-XXXX-XX</p>
                <p><strong>WhatsApp Support:</strong> +91-XXXX-XXXX-XX</p>
                <p><strong>Support Hours:</strong> 9:00 AM - 11:00 PM (All days)</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Policy Updates</h2>
              <p className="mb-4">
                This delivery policy may be updated to reflect changes in our service areas, 
                delivery times, or charges. Customers will be notified of significant changes 
                through our app and website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;