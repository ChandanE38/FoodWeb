import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Refund & Cancellation Policy</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Order Cancellation Policy</h2>
              <p className="mb-4">
                Orders can be cancelled under the following conditions:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Before Restaurant Confirmation:</strong> Full refund available within 5 minutes of placing the order</li>
                <li><strong>After Restaurant Confirmation:</strong> Cancellation may not be possible once food preparation has started</li>
                <li><strong>Emergency Cancellations:</strong> Exceptional circumstances will be reviewed case-by-case</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Refund Eligibility</h2>
              <p className="mb-4">You are eligible for a refund in the following situations:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Order was cancelled before restaurant confirmation</li>
                <li>Restaurant is unable to fulfill the order</li>
                <li>Significant delay in delivery (over 60 minutes from estimated time)</li>
                <li>Wrong items delivered or missing items</li>
                <li>Food quality issues (spoiled, contaminated, or inedible food)</li>
                <li>Technical issues preventing order fulfillment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-gray-800 mb-4">3. Refund Process</h2>
              <p className="mb-4">Our refund process works as follows:</p>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Step 1: Report Issue</h4>
                <p className="text-blue-700">Contact our customer support within 24 hours of order delivery/cancellation</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Step 2: Investigation</h4>
                <p className="text-blue-700">Our team will investigate the issue and may contact the restaurant for clarification</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Step 3: Resolution</h4>
                <p className="text-blue-700">Approved refunds are processed within 5-7 business days to your original payment method</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Step 4: Confirmation</h4>
                <p className="text-blue-700">You will receive email and SMS confirmation once the refund is initiated</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Refund Amounts</h2>
              <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Situation</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Order cancelled before confirmation</td>
                    <td className="border border-gray-300 px-4 py-2">100% refund (including delivery charges)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Restaurant unable to fulfill</td>
                    <td className="border border-gray-300 px-4 py-2">100% refund (including delivery charges)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Significant delivery delay</td>
                    <td className="border border-gray-300 px-4 py-2">50% refund or full refund (case dependent)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Wrong/missing items</td>
                    <td className="border border-gray-300 px-4 py-2">Refund for affected items only</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Food quality issues</td>
                    <td className="border border-gray-300 px-4 py-2">100% refund (excluding delivery charges)</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Payment Gateway Refunds</h2>
              <p className="mb-4">
                All payments are processed through Razorpay, our secure payment gateway. Refund timelines 
                may vary based on your payment method:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
                <li><strong>Net Banking:</strong> 3-5 business days</li>
                <li><strong>UPI (Google Pay, PhonePe, etc.):</strong> 1-3 business days</li>
                <li><strong>Wallets:</strong> 1-3 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Non-Refundable Situations</h2>
              <p className="mb-4">Refunds will not be provided for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Change of mind after order confirmation</li>
                <li>Taste preferences or subjective food quality complaints</li>
                <li>Delivery delays due to customer unavailability</li>
                <li>Orders with customized items that were prepared as requested</li>
                <li>Failure to inform us of allergies or dietary restrictions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Promotional Discounts and Refunds</h2>
              <p className="mb-4">
                When refunding orders paid with promotional codes or discounts:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The actual amount paid will be refunded</li>
                <li>Promotional credits may be restored to your account</li>
                <li>Cashback offers may be reversed if applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact for Refunds</h2>
              <p className="mb-4">
                To request a refund or report an issue with your order:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><strong>Customer Support:</strong> support@foodweb.com</p>
                <p><strong>Refund Helpline:</strong> +91-XXXX-XXXX-XX</p>
                <p><strong>WhatsApp Support:</strong> +91-XXXX-XXXX-XX</p>
                <p><strong>Support Hours:</strong> 9:00 AM - 11:00 PM (All days)</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Chargeback Policy</h2>
              <p className="mb-4">
                We take chargebacks seriously and have established clear policies to protect both 
                customers and our business:
              </p>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-red-800 mb-2">Important Notice:</h4>
                <p className="text-red-700">
                  Initiating a chargeback without first contacting our customer support may result 
                  in account suspension and may affect your ability to place future orders.
                </p>
              </div>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Before Initiating Chargeback:</strong> Contact our support team within 48 hours of any issue</li>
                <li><strong>Valid Chargeback Reasons:</strong> Non-delivery of order, unauthorized charges, or service not as described</li>
                <li><strong>Chargeback Investigation:</strong> We will provide evidence of service delivery and order fulfillment to payment processors</li>
                <li><strong>False Chargebacks:</strong> Customers who initiate fraudulent chargebacks will have accounts permanently suspended</li>
                <li><strong>Documentation:</strong> All order communications, delivery confirmations, and service records are maintained for dispute resolution</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Business Information</h2>
              <p className="mb-4">
                This refund policy is implemented by:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p><strong>Business Name:</strong> FoodWeb Food Delivery Services</p>
                <p><strong>Business Registration:</strong> [Your Business Registration Number]</p>
                <p><strong>GST Registration:</strong> [Your GST Number]</p>
                <p><strong>FSSAI License:</strong> [Your FSSAI License Number]</p>
                <p><strong>Registered Address:</strong> [Your Complete Business Address]</p>
                <p><strong>Website:</strong> https://foodweb.com</p>
                <p><strong>Payment Processor:</strong> Razorpay Software Private Limited</p>
              </div>
              <p className="mb-4">
                We operate in full compliance with Consumer Protection Act, 2019, RBI guidelines 
                for payment aggregators, and other applicable regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Dispute Resolution</h2>
              <p className="mb-4">
                If you're not satisfied with our refund decision, you can escalate the matter through 
                the following channels:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Level 1:</strong> Contact our customer support team (response within 24 hours)</li>
                <li><strong>Level 2:</strong> Escalate to senior customer support manager (response within 48 hours)</li>
                <li><strong>Level 3:</strong> Contact our grievance officer at grievance@foodweb.com</li>
                <li><strong>Level 4:</strong> File complaint with National Consumer Helpline (1915) if unsatisfied</li>
              </ul>
              <p className="mb-4">
                We commit to resolving all refund disputes within 7-10 business days and maintaining 
                complete transparency throughout the process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact for Refunds</h2>
              <p className="mb-4">
                To request a refund or report an issue with your order:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><strong>Primary Support:</strong> support@foodweb.com</p>
                <p><strong>Refund Helpline:</strong> +91-[Your Phone Number]</p>
                <p><strong>WhatsApp Support:</strong> +91-[Your WhatsApp Number]</p>
                <p><strong>Grievance Officer:</strong> grievance@foodweb.com</p>
                <p><strong>Business Address:</strong> [Your Complete Registered Address]</p>
                <p><strong>Support Hours:</strong> 9:00 AM - 11:00 PM (All days)</p>
                <p><strong>Emergency Support:</strong> 24/7 for critical payment issues</p>
                <p><strong>Response Time:</strong> Maximum 24 hours for refund queries</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Policy Updates</h2>
              <p className="mb-4">
                This refund policy may be updated from time to time. We will notify customers of any 
                significant changes through email or app notifications.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;