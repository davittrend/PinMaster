import React from 'react';
import { Layout } from 'lucide-react';
import { PinterestBoard } from '../../store/slices/boardsSlice';

interface BoardsListProps {
  boards: PinterestBoard[];
}

export function BoardsList({ boards }: BoardsListProps) {
  if (boards.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <Layout className="w-12 h-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No boards found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Create some boards on Pinterest to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Available Boards</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h4 className="font-medium text-gray-900">{board.name}</h4>
            {board.description && (
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{board.description}</p>
            )}
            <a
              href={board.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-700"
            >
              View on Pinterest
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
