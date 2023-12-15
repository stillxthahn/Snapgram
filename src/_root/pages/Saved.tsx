import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import React from "react";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser()
  const savedPosts = currentUser?.save.map((savePost: Models.Document) => ({
    ...savePost.post,
    creator: {
      imageUrl: currentUser.imageUrl,
    }
  }))
    .reverse();
  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="save"
          className="inver-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full justify-center max-w-5xl gap-9">
          {savedPosts.length === 0 ? (
            <p className="text-light-4">No saved posts</p>
          ) : (
            <GridPostList posts={savedPosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
