import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'State';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const post = [];

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
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      // api
      `http://localhost:3001/post/getUserPosts/${userId}`,
      {
        method: 'GET',
        headers: { Authorization: `${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if(post != null && Array.isArray(post))
  {
  return (
    <>  
      {posts.map(
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
          />
        )
      )}
    </>
  );
}
else
{
  return 123;
}
};

export default PostsWidget;
