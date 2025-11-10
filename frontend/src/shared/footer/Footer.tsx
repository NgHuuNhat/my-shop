import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">My Shop</h2>
          <p className="text-gray-400 text-sm">
            Quality products, fast delivery, and excellent customer service. Your satisfaction is our priority.
          </p>
        </div>

        {/* Shop Links */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold">Shop</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-500 transition-colors">Products</Link></li>
            <li><Link href="/cart" className="hover:text-blue-500 transition-colors">Cart</Link></li>
            <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold">Support</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><Link href="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-blue-500 transition-colors">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-blue-500 transition-colors">Returns</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold">Follow Us</h3>
          <div className="flex gap-4 text-xl text-gray-400">
            <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-12"></div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} My Store. All rights reserved.
      </div>
    </footer>
  )
}
