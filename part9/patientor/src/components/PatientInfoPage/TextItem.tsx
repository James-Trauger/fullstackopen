import { ListItemText, Typography } from '@mui/material';

interface TextItemProps {
  primary: string;
  secondary?: string;
}

const TextItem = (props: TextItemProps) => {
  const primary = props.primary;
  const secondary = props.secondary;
  return (
    <ListItemText
      primary={<Typography sx={{ fontSize: 20 }}>{primary}</Typography>}
      secondary={
        <Typography sx={{ marginLeft: '1rem' }}>{secondary}</Typography>
      }
    />
  );
};

export default TextItem;
