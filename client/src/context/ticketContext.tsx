import {createContext} from "react" ;

export type TicketData = {
    ticket: number
    setTicket:(c: number) => void
  }

export const TicketContext = createContext<TicketData>({
    ticket: 0,
    setTicket: () => {}
});