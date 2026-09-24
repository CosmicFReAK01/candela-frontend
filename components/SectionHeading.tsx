export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="inline-block text-xs font-mono font-bold uppercase tracking-[.18em] text-[#9E7444] bg-[#C69C6D]/15 px-3.5 py-1 rounded-full border border-[#C69C6D]/30">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-heading font-extrabold text-[#242424] tracking-tight md:text-5xl leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-base leading-relaxed text-[#5A5E62] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}