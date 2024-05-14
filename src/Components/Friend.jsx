import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setFriends } from 'State';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { Fragment, useEffect, useState } from 'react';
// import { array } from 'yup';

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  handleAddFriend,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { data } = useSelector((state) => state.friends);
  const { userId } = useParams();
  const [flagMine, setFlagMine] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    if (userId === _id) {
      setFlagMine(true);
    } else {
      setFlagMine(false);
    }
  }, [userId]);

  useEffect(() => {
    if (data !== undefined && Array.isArray(data)) {
      // setIsFriend(data.find((friend) => friend._id === friendId));
      const addFriend = data.some((friend) => friend._id === friendId);
      if (addFriend) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    }
  }, [isFriend]);

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
    window.location.reload();
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

      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
