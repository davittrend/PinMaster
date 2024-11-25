import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function BoardSelector() {
  const { boards, toggleBoardSelection } = useStore();
  const [search, setSearch] = useState('');
  
  const filteredBoards = boards.filter(board =>
    board.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search boards..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        {filteredBoards.map((board) => (
          <div
            key={board.id}
            className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
          >
            <input
              type="checkbox"
              checked={board.selected}
              onChange={() => toggleBoardSelection(board.id)}
              className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            />
            <div className="ml-3">
              <h4 className="font-medium text-gray-900">{board.name}</h4>
              <p className="text-sm text-gray-500">{board.pinCount} pins</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}