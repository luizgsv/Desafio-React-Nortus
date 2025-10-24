import { create } from 'zustand';
import { Ticket } from '../models/tickets-response';

type TicketsStore = {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  responsibleFilter: string;
  setTickets: (tickets: Ticket[]) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  setResponsibleFilter: (responsible: string) => void;
  filterTickets: () => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
};

export const useTicketsStore = create<TicketsStore>((set, get) => ({
  tickets: [],
  filteredTickets: [],
  currentPage: 1,
  pageSize: 5,
  totalPages: 1,
  searchTerm: '',
  statusFilter: 'Todos',
  priorityFilter: 'Todos',
  responsibleFilter: 'Todos',

  setTickets: (tickets) =>
    set({
      tickets,
      filteredTickets: tickets,
      totalPages: Math.ceil(tickets.length / get().pageSize),
    }),

  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  setResponsibleFilter: (responsible) => set({ responsibleFilter: responsible }),

  filterTickets: () => {
    const { tickets, searchTerm, statusFilter, priorityFilter, responsibleFilter, pageSize } =
      get();

    const query = searchTerm.trim().toLowerCase();

    const filtered = tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.client.toLowerCase().includes(query) ||
        ticket.email.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query);

      const matchesStatus = statusFilter === 'Todos' || ticket.status === statusFilter;

      const matchesPriority = priorityFilter === 'Todos' || ticket.priority === priorityFilter;

      const matchesResponsible =
        responsibleFilter === 'Todos' || ticket.responsible === responsibleFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesResponsible;
    });

    set({
      filteredTickets: filtered,
      currentPage: 1,
      totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
    });
  },

  nextPage: () => {
    const { currentPage, totalPages } = get();
    if (currentPage < totalPages) set({ currentPage: currentPage + 1 });
  },

  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) set({ currentPage: currentPage - 1 });
  },

  firstPage: () => set({ currentPage: 1 }),

  lastPage: () => set({ currentPage: get().totalPages }),
}));
