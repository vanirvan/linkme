"use client";

import { useMediaQuery } from "usehooks-ts";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { LinkDialogForm } from "./LinkDialogForm";

export function LinkDialog() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isDialogOpen, setDialogOpen, setDialogData, dialogOpenType] =
    useLinkDialogStore((state) => [
      state.isOpen,
      state.setOpen,
      state.setData,
      state.openType,
    ]);

  const dialogInteractOutside = () => {
    setDialogData(null);
  };

  return isDesktop ? (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent onInteractOutside={dialogInteractOutside}>
        <DialogHeader>
          <DialogTitle>
            {dialogOpenType === "add"
              ? "Add new Link"
              : dialogOpenType === "edit"
                ? "Edit Link"
                : "Delete Link"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {dialogOpenType === "delete" ? (
          <DeleteConfirmation />
        ) : (
          <LinkDialogForm />
        )}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DrawerContent onInteractOutside={dialogInteractOutside}>
        <DrawerHeader>
          <DrawerTitle>
            {dialogOpenType === "add"
              ? "Add new Link"
              : dialogOpenType === "edit"
                ? "Edit Link"
                : "Delete Link"}
          </DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        {dialogOpenType === "delete" ? (
          <DeleteConfirmation />
        ) : (
          <LinkDialogForm />
        )}
      </DrawerContent>
    </Drawer>
  );
}
