import React from 'react';
import { Crown, MapPin, Phone, Mail, Clock, Heart, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-700 to-rose-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-700/40">
                <Crown className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Saltanat <span className="text-red-500">Restaurant</span>
              </span>
            </div>
            <p className="leading-relaxed text-neutral-400">
              Preserving regal culinary flavors with authentic charcoal barbecue, slow-cooked biryanis, and unmatched hygiene.
            </p>
            <div className="flex items-center gap-2 text-red-400">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>100% Halal Certified Kitchen</span>
            </div>
          </div>

          {/* Col 2: Timings */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Kitchen Timings</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Mon - Thu: 12:00 PM - 1:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Fri - Sun: 12:30 PM - 2:30 AM</span>
              </div>
              <p className="text-red-400 font-semibold pt-1">🔥 Late night deliveries active!</p>
            </div>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Reach Us</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>ASF Campus / Main Boulevard, Karachi</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>restaurantbussines337@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links & Admin Portal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu-section" className="hover:text-red-400 transition duration-150">Signature Menu</a>
              </li>
              <li>
                <a href="#order-section" className="hover:text-red-400 transition duration-150">Order Online</a>
              </li>
              <li>
                <a href="#about-section" className="hover:text-red-400 transition duration-150">Our Story & Reviews</a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Admin Dashboard Portal →</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© 2026 Saltanat Restaurant. All rights reserved. SMIT Hackathon Project.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for SMIT Modern Web & App Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
}
