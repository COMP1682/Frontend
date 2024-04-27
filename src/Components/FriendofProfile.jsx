import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setFriends } from 'State';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { Fragment, useEffect, useState } from 'react';
// import { array } from 'yup';

const FriendofProfile = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { userId } = useParams();
  const [flagMine, setFlagMine] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    if (friends != null && Array.isArray(friends)) {
      setIsFriend(friends.find((friend) => friend._id === friendId));
    } else {
      setFriends(false);
    }
  }, [isFriend]);

  useEffect(() => {
    if (userId === _id) {
      setFlagMine(true);
    } else {
      setFlagMine(false);
    }
  }, [userId]);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/addRemoveFriend/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate('/chat', { state: { friendId: friendId } });
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {!isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton> */}
    </FlexBetween>
  );
};

export default FriendofProfile;
