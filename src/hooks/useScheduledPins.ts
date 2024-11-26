import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { 
  addScheduledPin, 
  updateScheduledPin, 
  removeScheduledPin 
} from '../store/slices/schedulerSlice';
import { validatePinData } from '../utils/validation';
import { isValidScheduleTime } from '../utils/date';
import toast from 'react-hot-toast';

export function useScheduledPins() {
  const dispatch = useDispatch();
  const { scheduledPins } = useSelector((state: RootState) => state.scheduler);

  const schedulePin = useCallback((pinData: any) => {
    const errors = validatePinData(pinData);
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }

    const scheduledTime = new Date(pinData.scheduledTime);
    if (!isValidScheduleTime(scheduledTime)) {
      toast.error('Scheduled time must be at least 5 minutes in the future');
      return false;
    }

    const newPin = {
      id: Date.now().toString(),
      ...pinData,
      status: 'pending' as const
    };

    dispatch(addScheduledPin(newPin));
    toast.success('Pin scheduled successfully');
    return true;
  }, [dispatch]);

  const updatePin = useCallback((pinId: string, updates: Partial<any>) => {
    const pin = scheduledPins.find(p => p.id === pinId);
    if (pin) {
      dispatch(updateScheduledPin({ ...pin, ...updates }));
    }
  }, [dispatch, scheduledPins]);

  const deletePin = useCallback((pinId: string) => {
    if (window.confirm('Are you sure you want to delete this scheduled pin?')) {
      dispatch(removeScheduledPin(pinId));
      toast.success('Pin deleted successfully');
    }
  }, [dispatch]);

  return {
    scheduledPins,
    schedulePin,
    updatePin,
    deletePin
  };
}