import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from 'State';
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
    console.log("data1",data);
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
    console.log("data2",data);
    dispatch(setPosts({ posts: data }));
  };
  console.log('token', token)
  console.log("posts", posts)

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if(posts != null && Array.isArray(posts))
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
