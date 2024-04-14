import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'Components/Friend';
import WidgetWrapper from 'Components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'State';

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  // const friends = useSelector((state) => state.user.friends);
  const [friend, setFriend] = useState([]);
  // let friends = [];
  const { _id } = useSelector((state) => state.user);

  const getFriends = async () => {
    const response = await fetch(
      // api
      `http://localhost:3001/users/getUserFriends/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    setFriend(data.data);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    friend && (
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant='h5'
          fontWeight='500'
          sx={{ mb: '1.5rem' }}
        >
          Friend List
        </Typography>
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {friend
            .filter((item) => item._id !== _id)
            .map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
              />
            ))}
        </Box>
      </WidgetWrapper>
    )
  );

  // if (friends != null && Array.isArray(friends)) {
  //   return (
  //     <WidgetWrapper>
  //       <Typography
  //         color={palette.neutral.dark}
  //         variant='h5'
  //         fontWeight='500'
  //         sx={{ mb: '1.5rem' }}
  //       >
  //         Friend List
  //       </Typography>
  //       <Box display='flex' flexDirection='column' gap='1.5rem'>
  //         {friends.map((friend) => (
  //           <Friend
  //             key={friend._id}
  //             friendId={friend._id}
  //             name={`${friend.firstName} ${friend.lastName}`}
  //             subtitle={friend.occupation}
  //             userPicturePath={friend.picturePath}
  //           />
  //         ))}
  //       </Box>
  //     </WidgetWrapper>
  //   );
  // } else {
  //   return <></>;
  // }
};

export default FriendListWidget;
