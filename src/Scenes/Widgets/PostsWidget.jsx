import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'State';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [data, setData] = useState([]);
  const [handleCmtFlg, setHandleCmtFlg] = useState(false);
  const [flagLiked, setFlagLiked] = useState(false);
  const [isAddFriend, setIsAddFriend] = useState(false);

  const handleCmt = () => {
    setHandleCmtFlg(!handleCmt);
  };

  const handleAddFriend = () => {
    setIsAddFriend(!isAddFriend);
  };

  const getPosts = async () => {
    const response = await fetch(
      // api
      `http://localhost:3001/post/getPost/`,
      {
        method: 'GET',
        headers: { Authorization: `${token}` },
      }
    );
    const data = await response.json();

    if (data != null) {
      for (let post of data) {
        const responseComment = await fetch(
          `http://localhost:3001/post/getComments/${post._id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
              'Content-type': 'application/json',
            },
          }
        );

        if (responseComment.status == 200) {
          const dataComment = await responseComment.json();
          for (let comment of dataComment) {
            if (loggedInUserId === comment.userId) {
              comment.isValidUserComment = true;
            }
          }
          post.comments = [].concat(dataComment);
        }
      }
    }
    dispatch(setPosts({ posts: data }));
    setData(data);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      // api
      `http://localhost:3001/post/getUserPost/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = await response.json();

    
    if (data != null) {
      for (let post of data) {
        const responseComment = await fetch(
          `http://localhost:3001/post/getComments/${post._id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `${token}`,
              'Content-type': 'application/json',
            },
          }
        );

        if (responseComment.status == 200) {
          const dataComment = await responseComment.json();
          for (let comment of dataComment) {
            if (loggedInUserId === comment.userId) {
              comment.isValidUserComment = true;
            }
          }
          post.comments = [].concat(dataComment);
        }
      }
    }

    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [flagLiked, posts]);
  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isAddFriend]);

  return isProfile ? (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            handleCmt={handleCmt}
            setFlagLiked={setFlagLiked}
            flagLiked={flagLiked}
            handleAddFriend={handleAddFriend}
          />
        )
      )}
    </>
  ) : (
    posts?.map(
      ({
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }) => (
        <PostWidget
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
          handleCmt={handleCmt}
          setFlagLiked={setFlagLiked}
          flagLiked={flagLiked}
          handleAddFriend={handleAddFriend}
        />
      )
    )
  );
};

export default PostsWidget;
