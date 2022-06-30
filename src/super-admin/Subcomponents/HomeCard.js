import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function HomeCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={(_e)=>props.hrefCallback(props.component)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
