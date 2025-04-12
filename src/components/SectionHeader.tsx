
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  alignment?: "left" | "center";
}

export const SectionHeader = ({
  title,
  subtitle,
  alignment = "center",
}: SectionHeaderProps) => {
  return (
    <div className={cn(
      "space-y-2 mb-10",
      alignment === "center" ? "text-center" : "text-left"
    )}>
      <h2 className="text-3xl md:text-4xl font-bold">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg">{subtitle}</p>
      <div className={cn(
        "h-1 bg-gradient-to-r from-purple to-neon-pink rounded-full w-16 mt-4",
        alignment === "center" ? "mx-auto" : ""
      )} />
    </div>
  );
};
