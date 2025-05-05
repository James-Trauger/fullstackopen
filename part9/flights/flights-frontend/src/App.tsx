import { JSX, useEffect, useState } from 'react';
import { DiaryEntry, NotificationType, EmptyNotification } from './types';
import diaryService from './services/diaryService';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

const App = (): JSX.Element => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] =
    useState<NotificationType>(EmptyNotification);

  useEffect(() => {
    diaryService.getAllDiaries().then((d) => setDiaries(d));
  }, []);

  const addDiaries = (newDiary: DiaryEntry) =>
    setDiaries(diaries.concat(newDiary));

  const notify = (noti: NotificationType) => {
    setNotification(noti);
    switch (noti.kind) {
      case 'empty':
        return;
      default:
        setTimeout(() => {
          setNotification(EmptyNotification);
        }, noti.time * 1000);
    }
  };

  return (
    <div>
      <h1>Diaries</h1>
      <Notification notification={notification} />
      <DiaryForm addNewDiary={addDiaries} notify={notify} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
