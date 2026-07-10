export default function AnnouncementBar() {
  return (
    <div className="w-full h-10 bg-dark-brown flex items-center justify-center px-4">
      <p className="text-xs font-semibold tracking-nav uppercase text-white text-center">
        THIS AND EVERY SATURDAY, 10% OFF ALL SKIN CARE.{" "}
        <a
          href="#booking"
          className="text-warm-gold underline hover:opacity-80 transition-opacity duration-200"
        >
          BOOK THIS WEEK →
        </a>
      </p>
    </div>
  );
}
