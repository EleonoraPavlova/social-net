import React from 'react';
import './index.scss';
import Banner from "../../components/Banner/Banner";
import { FormPosts } from "./FormPosts/FormPosts";
import { Post } from "./Post/Post";
import { PostItem } from "../../state/initialState"
import { UsersInfo } from "../../common/UsersComponents/UsersInfo/UsersInfo";
import { useAppSelector } from "src/state/hooks/hooks-selectors";


export const Profile = () => {
  const postsData = useAppSelector<PostItem[]>(state => state.profilePage)

  let posts = postsData.map((post: PostItem) =>
    <Post key={post.id} post={post} />)

  return (<div className="content">
    <Banner />
    <UsersInfo />
    <FormPosts />
    {posts}
  </div>)
}