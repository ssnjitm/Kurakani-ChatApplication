import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),

  acceptedChats: [],
  setAcceptedChats: (chats) => set({ acceptedChats: chats }),

  messages: {}, // { userId: [messages] }
  setMessages: (userId, msgs) => set((state) => ({
    messages: { ...state.messages, [userId]: msgs },
  })),
  addMessage: (userId, msg) => set((state) => ({
    messages: {
      ...state.messages,
      [userId]: [...(state.messages[userId] || []), msg],
    },
  })),

  // Optionally: loading/error states
  loadingChats: false,
  setLoadingChats: (loading) => set({ loadingChats: loading }),
  chatError: '',
  setChatError: (err) => set({ chatError: err }),
}));

export default useChatStore;
