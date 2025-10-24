export type TicketResponse = {
  resumo: {
    open: number;
    inProgress: number;
    solved: number;
    timeAverageHours: number;
  };
  status: string[];
  priorities: string[];
  tickets: Ticket[];
};

export type Ticket = {
  id: string;
  priority: string;
  client: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
  responsible: string;
};
