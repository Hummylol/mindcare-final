import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href?: string }[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex h-16 gap-4 items-center rounded-2xl bg-gray-200 dark:bg-zinc-900 px-4",
        className
      )}
    >
      {items.map((item) =>
        item.href ? (
          <Link key={item.title} href={item.href}>
            <div className="h-12 w-12 flex items-center justify-center bg-white dark:bg-black rounded-full">
              {item.icon}
            </div>
          </Link>
        ) : (
          <div
            key={item.title}
            className="h-6 w-6 flex items-center justify-center bg-white dark:bg-black rounded-full cursor-pointer"
          >
            <ThemeToggle />
          </div>
        )
      )}
    </div>
  );
};
