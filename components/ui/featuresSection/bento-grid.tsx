import { cn } from "@/components/ui/featuresSection/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

const isRTLCheck = (text: string): boolean => {
  return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text); // Hebrew, Arabic, and Persian ranges in Unicode
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,

}: {
  className?: string;
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input shadow-none p-4 bg-[var(--feature-container-background)] dark:border-white/[0.2] border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="transition duration-200">
        <div className="font-bold text-[--foreground] mb-2 mt-2" style={{fontSize: "18px", direction: isRTLCheck(title) ? 'rtl' : 'ltr'}}>
          {title}
        </div>
        <div className="font-normal text-m text-[--featureDescriptionColor]" style={{direction: isRTLCheck(description) ? 'rtl' : 'ltr'}}>
          {description}
        </div>
      </div>
    </div>
  );
};
