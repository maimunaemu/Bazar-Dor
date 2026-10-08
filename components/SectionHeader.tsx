export default function SectionHeader({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-3 scroll-mt-32">
      <h2 className="text-lg font-bold">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}