export const validatePinData = (data: {
  title: string;
  description: string;
  imageUrl?: string;
  imageFile?: File;
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
  if (!data.boardId) {
    errors.push('Board selection is required');
  }
  if (!data.scheduledTime) {
    errors.push('Schedule time is required');
  }

  // Changed image validation to consider both imageUrl and imageFile
  if (!data.imageUrl && !data.imageFile && !data.imagePreview) {
    errors.push('Image is required');
  }

  return errors;
};
