import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutline,
} from '@mui/icons-material';
import { Box, Divider, Typography, IconButton, useTheme,InputBase,Button } from '@mui/material';
import FlexBetween from 'Components/FlexBetween';
import Friend from 'Components/Friend';
import WidgetWrapper from 'Components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'State';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState('');
  
  const dispatch = useDispatch;
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  let isValidUser = false;

  if(loggedInUserId === postUserId)
  {
    isValidUser = true;
  }

    // for(let subComment of comments)
    // {
    //   if(loggedInUserId === subComment.userId)
    //   {
    //     Object.assign(subComment, {isValidUserComment:true});
    //     console.log(subComment);
    //   }
    // }



  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:3001/post/likePost/${postId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    window.location.reload(false);
    // const updatedPost = await response.json();
    // dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    const response = await fetch(
      `http://localhost:3001/post/deletePost/${postId}`,
      {
        method: 'delete',
        headers: {
          Authorization: `${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    if(response.status == "200")
    {
    window.location.reload(false);
    }
  };
  const deleteComment = async (commentid, event) => {
    console.log("commentId",commentid);
    const response = await fetch(
      `http://localhost:3001/post/deleteComment/${commentid}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    if(response.status == "200")
    {
    window.location.reload(false);
    }
  };

  const handleComment = async () => {
    const formData = new FormData();
    formData.append('userId', loggedInUserId);
    formData.append('postId', postId);
    formData.append('comment',comment);
    
    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let data = JSON.stringify(object);

    const response = await fetch(
      // api
      // `http://localhost:3001/posts`,
      `http://localhost:3001/post/addComment/${postId}`,
      {
        method: 'POST',
        headers: { Authorization: `${token}` },
        body: data,
      }
    );
    setComment('');
    if(response.status == "200")
    {
    window.location.reload(false);
    }
  };

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          
          {isValidUser && (
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={deletePost}>
            <DeleteOutline />
            </IconButton>
          </FlexBetween>
          )}   
          

          

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

        </FlexBetween>
        
          
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <FlexBetween gap='1.5rem'>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
          <Button
          disabled={!comment}
          onClick={handleComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          SEND
        </Button>
      </FlexBetween>

      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment.userName}
              </Typography>
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment.comment}
              </Typography>
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment.Date}
              </Typography>

              {comment?.isValidUserComment && (<FlexBetween gap='0.3rem'>
              <IconButton onClick={deleteComment}>
              <DeleteOutline />
              </IconButton>
            </FlexBetween>)}
              
            </Box>
          ))}
          <Divider />
        </Box>
      )}

    </WidgetWrapper>
  );
};

export default PostWidget;
