import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-400">
      <div className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-8">
          <h2 className="text-[#111111] font-bold text-3xl">My Shop</h2>
          <p className="space-y-4 text-gray-400 text-sm font-medium">
            Quality products, fast delivery, and excellent customer service. Your satisfaction is our priority.
          </p>
        </div>

        {/* Shop Links */}
        <div className="space-y-8">
          <h3 className="text-[#111111] font-bold">Shop</h3>
          <ul className="space-y-4 text-gray-400 text-sm font-medium">
            <li><Link href="/" className="hover:text-[#111111] transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-[#111111] transition-colors">Products</Link></li>
            <li><Link href="/cart" className="hover:text-[#111111] transition-colors">Cart</Link></li>
            <li><Link href="/about" className="hover:text-[#111111] transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-8">
          <h3 className="text-[#111111] font-bold">Support</h3>
          <ul className="space-y-4 text-gray-400 text-sm font-medium">
            <li><Link href="/faq" className="hover:text-[#111111] transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-[#111111] transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-[#111111] transition-colors">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-[#111111] transition-colors">Returns</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-8">
          <h3 className="text-[#111111] font-bold">Follow Us</h3>
          <div className="flex gap-4 text-xl text-gray-400 font-medium">
            <a href="#" className="hover:text-blue-500 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="border-t border-gray-800 mt-12"></div> */}

      {/* Copyright */}
      <div className="py-16 text-center text-gray-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} My Store. All rights reserved. nhat200901@gmail.com
      </div>
    </footer>
  )
}
