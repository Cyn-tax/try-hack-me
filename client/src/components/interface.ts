export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export interface TaskFormProps {
  task?: Task | null;
  isEditing?: boolean;
  onClose?: () => void;
}
