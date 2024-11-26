import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Calendar, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useBoards } from '../../hooks/useBoards';
import { useScheduledPins } from '../../hooks/useScheduledPins';

export function PinScheduler() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { boards } = useBoards();
  const { schedulePin } = useScheduledPins();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = schedulePin({
      title,
      description,
      link,
      imageUrl,
      boardId: selectedBoard,
      scheduledTime
    });

    if (success) {
      // Reset form
      setTitle('');
      setDescription('');
      setLink('');
      setImageUrl('');
      setScheduledTime('');
      setSelectedBoard('');
    }
  };

  // Rest of the component remains the same...
  // (The UI part of the component stays unchanged)
}