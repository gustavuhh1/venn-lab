"use client";
import { motion } from "motion/react";
import { LayoutTextFlip } from "../../components/ui/layout-text-flip";

export function TextFlipHome({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          duration={5000}
          text={title || "Bem vindo ao"}
          words={[
            "Espaço Venn",
            "Venn Lab",
            "Mundo dos Conjuntos",
            "Venn Space",
          ]}
        />
      </motion.div>
      <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
        {subtitle}
      </p>
    </div>
  );
}
