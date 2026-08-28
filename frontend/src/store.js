import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  portfolio: null,
  
  setUser: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, portfolio: null });
  },

  setPortfolio: (portfolio) => set({ portfolio }),
  
  updatePortfolioContent: (contentUpdate) => set((state) => {
    if (!state.portfolio) {
      return { portfolio: { content: contentUpdate } };
    }
    return {
      portfolio: {
        ...state.portfolio,
        content: {
          ...state.portfolio.content,
          ...contentUpdate
        }
      }
    };
  })
}));
