import React, { useState } from 'react';

const Login = ({ onLogin }: { onLogin: (name: string, email: string) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, email);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-4xl font-semibold mb-8 text-center">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="name" className="font-semibold text-lg">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md px-4 py-3 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="font-semibold text-lg">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md px-4 py-3 w-full mt-1 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

