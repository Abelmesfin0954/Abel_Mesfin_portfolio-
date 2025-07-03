"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, CheckCircle } from "lucide-react";

const products = [
  {
    name: "Starter Website",
    price: "$499",
    amount: "499",
    features: ["3 Custom Pages", "Mobile Responsive", "Basic SEO Setup", "1 Month Support"],
    popular: false,
    icon: <Zap className="w-6 h-6 text-blue-500" />
  },
  {
    name: "Business Website",
    price: "$999",
    amount: "999",
    features: ["5-7 Custom Pages", "CMS Integration", "Advanced SEO", "3 Months Support", "Basic Analytics"],
    popular: true,
    icon: <ShoppingCart className="w-6 h-6 text-purple-500" />
  },
  {
    name: "E-Commerce Pro",
    price: "$2499",
    amount: "2499",
    features: [
      "10+ Custom Pages",
      "Product Management",
      "Payment Gateway",
      "6 Months Support",
      "Advanced Analytics",
      "Marketing Setup"
    ],
    popular: false,
    icon: <CheckCircle className="w-6 h-6 text-green-500" />
  }
];

export default function ProductList() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (productName: string, amount: string) => {
    setLoading(true);
    const tx_ref = `tx-${Date.now()}`;

    try {
      const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_CHAPA_SECRET_KEY` // Replace this with your real secret key
        },
        body: JSON.stringify({
          amount,
          currency: "ETB",
          email: "abelmesfin@example.com",  // Replace with real customer email if known
          first_name: "Abel",
          last_name: "Mesfin",
          tx_ref,
          callback_url: "https://yourdomain.com/api/callback", // Optional: for verifying success
          return_url: "https://yourdomain.com/thank-you", // Required: after payment
          customization: {
            title: productName,
            description: `Payment for ${productName}`
          }
        })
      });

      const data = await response.json();

      if (data.status === "success") {
        window.location.href = data.data.checkout_url;
      } else {
        alert("Payment failed. Please try again.");
        console.log(data);
      }
    } catch (error) {
      alert("Error connecting to Chapa");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500"
        >
          Ready-Made Solutions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Purchase a package with secure card payment or local wallets.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:-translate-y-2 ${
              product.popular
                ? "border-blue-500 dark:border-blue-400 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-900"
                : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            }`}
          >
            {product.popular && (
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
            )}
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">{product.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                <span className="text-gray-500 dark:text-gray-400"> / one-time</span>
              </div>

              <ul className="mb-8 space-y-3 flex-grow">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(product.name, product.amount)}
                disabled={loading}
                className={`mt-auto w-full py-3 rounded-lg font-medium transition-colors ${
                  product.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {loading ? "Processing..." : product.popular ? "Get Started" : "Choose Plan"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
