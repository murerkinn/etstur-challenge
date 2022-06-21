import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartStore, Ticket } from './types'

const initialState: CartStore = {
  tickets: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTicketToCart(state: CartStore, action: PayloadAction<Ticket>) {
      const existingTicketIndex = state.tickets.findIndex(
        t =>
          t.event == action.payload.event && t.series == action.payload.series
      )

      if (existingTicketIndex == -1)
        state.tickets.push({ ...action.payload, quantity: 1 })
      else state.tickets[existingTicketIndex].quantity += 1
    },
    removeTicketFromCart(
      state: CartStore,
      action: PayloadAction<{ event: string; series: string }>
    ) {
      const ticketIndex = state.tickets.findIndex(
        t =>
          t.event === action.payload.event && t.series === action.payload.series
      )

      const ticket = state.tickets[ticketIndex]

      if (ticket.quantity > 1) state.tickets[ticketIndex].quantity -= 1
      else
        state.tickets = state.tickets.filter(
          t =>
            t.event !== action.payload.event &&
            t.series !== action.payload.series
        )
    },
  },
})

export const { addTicketToCart, removeTicketFromCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
