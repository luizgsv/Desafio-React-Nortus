'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateTicketForm } from './create-ticket-form';

export function CreateTicketButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer rounded-full font-medium shadow-(--shadow-accent) hover:bg-accent/80 transition-all">
          Novo Ticket
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
        w-full max-w-md
        bg-background
        border border-border
        rounded-2xl
        p-4
        shadow-lg
        space-y-6
        max-h-[95vh]
        overflow-y-auto
        scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent
      "
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-semibold text-primary">Novo Ticket</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Preencha os dados abaixo para registrar um novo ticket na plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[70vh] pr-1">
          <CreateTicketForm onSuccess={() => setIsOpen(false)} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-6 text-foreground bg-transparent border border-border hover:bg-secondary/50 transition-colors"
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            form="add-ticket"
            type="submit"
            className="rounded-full px-6 bg-accent text-white shadow-(--shadow-accent) hover:bg-accent/80 transition-all"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
