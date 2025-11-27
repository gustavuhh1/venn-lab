"use client";
import { IntersectThreeIcon } from "@phosphor-icons/react";
import { Button } from "../../components/ui/moving-border";

export function MovingBorderButton({ text }: { text: string }) {
  return (
    <div>
      <Button
        borderRadius="1rem"
        className="btn-primary bg-#2563eb border-neutral-200"
      >
        {text}
        <IntersectThreeIcon size={20} weight="duotone" />
      </Button>
    </div>
  );
}

{/* <button type="button" className="btn-primary gap-2">
  Acessar Laboratório <IntersectThreeIcon size={20} weight="duotone" />
</button>; */}



