import React from 'react';
import { Board } from '../../types'; // Create this if you haven't

interface BoardsListProps {
boards: Board[];
}

export function BoardsList({ boards }: BoardsListProps) {
if (!boards.length) {
  return (
    <div className="text-center py-6">
      <p className="text-gray-500">No boards available</p>
    </div>
  );
}

return (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">Boards</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {boards.map((board) => (
        <div
          key={board.id}
          className="flex items-center p-4 bg-gray-50 rounded-lg"
        >
          {board.image_thumbnail_url && (
            <img
              src={board.image_thumbnail_url}
              alt={board.name}
              className="w-12 h-12 rounded object-cover mr-4"
            />
          )}
          <div>
            <h4 className="font-medium">{board.name}</h4>
            <p className="text-sm text-gray-500">
              {board.pin_count || 0} pins
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
