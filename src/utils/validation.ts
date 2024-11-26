export const validatePinData = (data: {
  title: string;
  description: string;
  imageUrl: string;
  boardId: string;
  scheduledTime: string;
}) => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push('Title is required');
  }
  if (!data.description?.trim()) {
    errors.push('Description is required');
  }
  if (!data.imageUrl) {
    errors.push('Image is required');
  }
  if (!data.boardId) {
    errors.push('Board selection is required');
  }
  if (!data.scheduledTime) {
    errors.push('Schedule time is required');
  }

  return errors;
};