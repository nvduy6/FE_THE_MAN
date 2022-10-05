import { Posts } from "../models/post";
import instance from "./Config";
export const getAll = (page: any, limit: any): Promise<Posts[]> => {
  return instance.post("/posts", { page, limit });
};
export const getAllPost =():Promise<Posts[]>=>{
  return instance.get("/post");
}
export const remove = (id: string): Promise<Posts> => {
  return instance.delete(`/post/${id}`);
};

export const add = (post: Posts): Promise<Posts> => {
  return instance.post("/post", post);
};

export const get = (id: string): Promise<Posts> => {
  return instance.get(`/post/${id}`);
};

export const update = (post: Posts): Promise<Posts> => {
  return instance.put(`/post/${post._id}`, post);
};
