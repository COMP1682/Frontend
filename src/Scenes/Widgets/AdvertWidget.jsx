import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'Components/FlexBetween';
import WidgetWrapper from 'Components/WidgetWrapper';

const AdvertWidget = () => {
  const palette = useTheme();
  // const dark = palette.neutral.dark;
  // const main = palette.neutral.main;
  // const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={'gray'} variant='h5' fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={'gray'}>Create AD</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='auto'
        alt='advert'
        src='abc'
        style={{ borderRadius: '.75rem', margin: '.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={'gray'}>MikaCosmic</Typography>
        <Typography color={'gray'}>abc.com</Typography>
      </FlexBetween>
      <Typography m='0.5rem 0' color={'gray'}>
        Your pathway to stunning and immaculate beauty and make sure your skin is exfoliating skin and shining like light
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
