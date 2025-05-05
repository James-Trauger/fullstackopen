import { JSX } from 'react';
import { NotificationType } from '../types';
interface NotificationProps {
  notification: NotificationType;
}

const Notification = (props: NotificationProps): JSX.Element => {
  const noti = props.notification;

  if (noti.kind === 'empty') {
    return <></>;
  }

  const style = {
    color: noti.kind === 'error' ? 'red' : 'green',
  };

  return <div style={style}>{noti.message}</div>;
};

export default Notification;
