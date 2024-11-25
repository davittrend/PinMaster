import { create } from 'zustand';
import type { PinterestAccount, Board, ScheduledPin } from '../types/pinterest';

interface Store {
  accounts: PinterestAccount[];
  boards: Board[];
  scheduledPins: ScheduledPin[];
  selectedAccount: string | null;
  addAccount: (account: PinterestAccount) => void;
  setBoards: (boards: Board[]) => void;
  toggleBoardSelection: (boardId: string) => void;
  addScheduledPin: (pin: ScheduledPin) => void;
  setSelectedAccount: (accountId: string) => void;
}

export const useStore = create<Store>((set) => ({
  accounts: [],
  boards: [],
  scheduledPins: [],
  selectedAccount: null,
  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),
  setBoards: (boards) => set({ boards }),
  toggleBoardSelection: (boardId) =>
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? { ...board, selected: !board.selected }
          : board
      ),
    })),
  addScheduledPin: (pin) =>
    set((state) => ({ scheduledPins: [...state.scheduledPins, pin] })),
  setSelectedAccount: (accountId) => set({ selectedAccount: accountId }),
}));