import React from "react";

const Profile = ({ userName, imageSrc }) => {
  return (
    <div>
      <img
        src={imageSrc}
        alt={userName}
        style={{
          objectFit: "cover",
          borderRadius: "50%"
        }}
      />
      <h4>{userName}</h4>
    </div>
  );
};

export default Profile;
