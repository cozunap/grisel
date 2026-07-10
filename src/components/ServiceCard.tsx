interface ServiceCardProps {
  image: string;
  title: string;
  subtitle: string;
  href?: string;
}

export default function ServiceCard({ image, title, subtitle, href = '#' }: ServiceCardProps) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden aspect-[3/4]"
    >
      <img
        src={image}
        alt={`${title} - Premium spa services in Maryland`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/75 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="font-serif text-2xl text-white">{title}</h3>
        <p className="mt-2 text-[11px] font-semibold tracking-card uppercase text-white/70">
          {subtitle}
        </p>
      </div>
    </a>
  );
}
