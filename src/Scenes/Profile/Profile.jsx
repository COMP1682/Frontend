import { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'Scenes/Navbar/Navbar';
import FriendListWidget from 'Scenes/Widgets/FriendListWidget';
import MyPostWidget from 'Scenes/Widgets/MyPostWidget';
import PostsWidget from 'Scenes/Widgets/PostsWidget';
import UserWidget from 'Scenes/Widgets/UserWidget';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const getUser = async () => {
    const response = await fetch(
      // api
      `http://localhost:3001/users/getUser/${userId}`,
      {
        method: 'GET',
        headers: { Authorization: `${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };


  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
