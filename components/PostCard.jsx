/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-80 object-cover shadow-lg rounded-t-lg lg:rounded-lg w-full"
        />
      </div>
      <h1 className="transition duration-200 text-center mb-8 cursor-pointer hover:text-cyan-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            src={post.author.photo.url}
            alt={post.author.name}
            className="align-middle rounded-full"
            height="30px"
            width="30px"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {" "}
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-dray">
          <span>{moment(post.createdAt).format("DD.MM.YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">{post.excerpt}</p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-200 transform hover:-translate-y-1 inline-block bg-cyan-600 text-lg font-medium rounded-full text-white px-8 py-4 cursor-pointer hover:bg-cyan-500">Continue Reading</span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
