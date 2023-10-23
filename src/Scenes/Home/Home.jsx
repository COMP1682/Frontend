import { Box, useMediaQuery } from '@mui/material';
import Navbar from 'Scenes/Navbar/Navbar';
import AdvertWidget from 'Scenes/Widgets/AdvertWidget';
import FriendListWidget from 'Scenes/Widgets/FriendListWidget';
import MyPostWidget from 'Scenes/Widgets/MyPostWidget';
import PostsWidget from 'Scenes/Widgets/PostsWidget';
import UserWidget from 'Scenes/Widgets/UserWidget';
import { useSelector } from 'react-redux';

const Home = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <AdvertWidget />
            <Box m='2rem 0' />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
