"use client";

import { useState } from "react";
import {
  EllipsisIcon,
  GripHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";

interface ComponentProps {
  props: {
    id: number;
    title: string;
    link: string;
    order: number;
    createdAt: string;
  };
}

export function LinkCard({ props }: ComponentProps) {
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  const [setDialogOpen, setDialogData, setDialogOpenType] = useLinkDialogStore(
    (state) => [state.setOpen, state.setData, state.setOpenType],
  );

  const onEdit = () => {
    setDialogOpen(true);
    setDialogData(props);
    setDialogOpenType("edit");
  };

  const onDelete = () => {
    setDialogOpen(true);
    setDialogData(props);
    setDialogOpenType("delete");
  };

  return (
    <div
      className={`flex items-center justify-between gap-12 rounded bg-background-500 p-4 ${isGrabbing ? "cursor-grabbing" : null}`}
      onMouseDown={() => setIsGrabbing(true)}
      onMouseUp={() => setIsGrabbing(false)}
    >
      <div className="flex items-center gap-4">
        <div className="relative aspect-square w-4">
          <GripHorizontalIcon
            size={16}
            className={isGrabbing ? "cursor-grabbing" : "cursor-grab"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold">{props.title}</h1>
          <h2 className="break-all text-sm italic text-gray-500">
            {props.link}
          </h2>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <EllipsisIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={onEdit}
            className="group focus:bg-yellow-50"
          >
            <span>Edit</span>
            <DropdownMenuShortcut>
              <PencilIcon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="group focus:bg-red-50"
          >
            <span>Delete</span>
            <DropdownMenuShortcut>
              <Trash2Icon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
