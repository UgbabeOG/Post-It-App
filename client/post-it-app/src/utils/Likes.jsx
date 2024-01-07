const Likes = ({ numberOfLikes, threadId }) => {
  const handleLikeFunction = () => {
    alert("You just liked the post!");
  };

  return (
    <div className="likes__container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 likesBtn"
        onClick={handleLikeFunction}
      >
        {/*--other UI elements*/}
      </svg>
    </div>
  );
};
