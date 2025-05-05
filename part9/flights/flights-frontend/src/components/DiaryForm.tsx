import { JSX, useState } from 'react';
import { DiaryEntry, NewDiaryEntry, NotificationType } from '../types';
import diaryService from '../services/diaryService';
import { AxiosError } from 'axios';

interface DiaryFormProps {
  addNewDiary: (newDiary: DiaryEntry) => void;
  notify: (noti: NotificationType) => void;
}

const DiaryForm = (props: DiaryFormProps): JSX.Element => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const changeInput = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);
  };

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
    };

    if (comment) {
      newDiaryEntry.comment = comment;
    }

    diaryService
      .createDiary(newDiaryEntry)
      .then((addedDiary) => {
        props.addNewDiary(addedDiary);
        props.notify({
          message: 'new entry added',
          kind: 'success',
          time: 5,
        });
      })
      .catch((error: AxiosError) => {
        props.notify({
          message: JSON.stringify(error.response?.data),
          kind: 'error',
          time: 5,
        });
      });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          {' '}
          date
          <input type="date" value={date} onChange={changeInput(setDate)} />
        </div>
        <div>
          {' '}
          Visibility:
          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={changeInput(setVisibility)}
          />
          <label>great</label>
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={changeInput(setVisibility)}
          />
          <label>good</label>
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={changeInput(setVisibility)}
          />
          <label>ok</label>
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={changeInput(setVisibility)}
          />
          <label>poor</label>
        </div>
        <div>
          weather
          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={changeInput(setWeather)}
          />
          <label>sunny</label>
          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={changeInput(setWeather)}
          />
          <label>rainy</label>
          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={changeInput(setWeather)}
          />
          <label>cloudy</label>
          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={changeInput(setWeather)}
          />
          <label>stormy</label>
          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={changeInput(setWeather)}
          />
          <label>windy</label>
        </div>
        <div>
          {' '}
          comment
          <input value={comment} onChange={changeInput(setComment)} />
        </div>
        <button type={'submit'}>add diary</button>
      </form>
    </div>
  );
};

export default DiaryForm;
