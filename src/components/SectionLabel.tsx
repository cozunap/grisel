interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-semibold tracking-section uppercase text-warm-gold ${className}`}
    >
      — {text}
    </p>
  );
}
