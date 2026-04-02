export function FloatingSocialBar() {
// Social links to match Angular reference global-social-sidebar
const socialLinks = [
  { icon: 'fab fa-linkedin-in', href: 'https://eg.linkedin.com/school/misr-university-for-science-and-technology/', label: 'LinkedIn', color: '#1f3769' },
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/Must.University', label: 'Facebook', color: '#1f3769' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/must_university/', label: 'Instagram', color: '#1f3769' },
  { icon: 'fab fa-x-twitter', href: 'https://twitter.com/must_university', label: 'X (Twitter)', color: '#1f3769' },
  { icon: 'fab fa-whatsapp', href: 'https://chat.whatsapp.com/BdekmLTYMbR9M9ibkl703w', label: 'WhatsApp', color: '#25D366' },
];

  return (
    /* الحاوية الرئيسية: مثبتة في اليمين، منتصف الشاشة عمودياً */
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[999] pointer-events-auto">
      {socialLinks.map(({ icon, href, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center 
                     bg-white shadow-md
                     hover:shadow-lg
                     hover:scale-110
                     transition-all duration-300 ease-in-out group"
          style={{ color: color }}
          aria-label={label}
        >
          <i className={`${icon} text-lg md:text-xl transition-transform duration-200 group-hover:scale-110`}></i>
        </a>
      ))}
    </div>
  );
}