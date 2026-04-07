import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinksBarProps {
  className?: string;
}

export function LinksBar({ className = '' }: LinksBarProps) {
  const links: Array<{ id: string; label: string }> = [
    { id: '', label: 'Home' },
    { id: 'academics', label: 'Academics' },
    { id: 'questionnaires', label: 'Questionnaires' },
    { id: 'resources', label: 'Resources' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'contact-us', label: 'Contact Us' },
  ];

  return (
    <div className={`flex space-x-8 ${className}`}>
      {links.map((link) => (
        <NavLink
          key={link.id}
          to={`/${link.id}`}
          className={({ isActive }) => 
            `text-white text-lg font-medium hover:text-green-400 transition-colors duration-300 px-4 py-2 border-none bg-transparent cursor-pointer no-underline ${
              isActive ? 'text-green-400 ring-2 ring-green-400/50 rounded-md' : ''
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
