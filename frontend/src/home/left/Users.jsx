import React from "react";
import ChatUser from "./ChatUser";

// Example users data
const users = [
  {
    id: 1,
    name: "Sanjeet Mijar",
    email: "ssnjitm6@domain.com",
    avatar: "https://img.daisyui.com/images/profile/demo/gordon@192.webp",
  },
  {
    id: 2,
    name: "Alex Smith",
    email: "alex@domain.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@domain.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "John Doe",
    email: "john@domain.com",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 5,
    name: "Emily Clark",
    email: "emily@domain.com",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 6,
    name: "Michael Brown",
    email: "michael@domain.com",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    id: 7,
    name: "Sophia Lee",
    email: "sophia@domain.com",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: 8,
    name: "David Kim",
    email: "david@domain.com",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: 9,
    name: "Olivia Wilson",
    email: "olivia@domain.com",
    avatar: "https://randomuser.me/api/portraits/women/69.jpg",
  },
  {
    id: 10,
    name: "Liam Martinez",
    email: "liam@domain.com",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
  },
];


function Users({ selectedUserId, onSelectUser }) {
  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <ChatUser
          key={user.id}
          user={user}
          selected={user.id === selectedUserId}
          onClick={() => onSelectUser(user)}
        />
      ))}
    </div>
  );
}

export default Users;
