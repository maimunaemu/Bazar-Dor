export default function SectionHeader({
title,
subtitle,
direction,
id,
}: {
title: string;
subtitle?: string;
direction?: "up" | "down";
id?: string;
}) {
return ( <div id={id} className="mb-3 scroll-mt-32"> <h2 className="flex items-center gap-2 text-lg font-bold">
{direction === "up" && (
  <span className="text-red-600">▲</span>
)}
{direction === "down" && (
  <span className="text-green-600">▼</span>
)}
{title} </h2>


  {subtitle && (
    <p className="text-xs text-gray-500">{subtitle}</p>
  )}
</div>


);
}
