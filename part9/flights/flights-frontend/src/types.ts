export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface NotificationSuccess {
  message: string;
  time: number;
  kind: 'success';
}

export interface NotificationError {
  message: string;
  time: number;
  kind: 'error';
}

interface NotificationEmpty {
  kind: 'empty';
}

export type NotificationType =
  | NotificationEmpty
  | NotificationSuccess
  | NotificationError;

export const EmptyNotification: NotificationEmpty = {
  kind: 'empty',
};
