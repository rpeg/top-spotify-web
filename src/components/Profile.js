import React, { useState, useEffect } from "react";
import axios from "axios";

import { isEmpty } from "lodash";

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await axios
        .get("http://localhost:3000/my-profile")
        .catch(err => console.log(err));

      setProfile(result.data);
    };

    fetchProfile();
  }, []);

  return (
    !isEmpty(profile) && (
      <div>
        <img
          src={profile.images[0].url}
          alt={profile.id}
          style={{
            objectFit: "cover",
            borderRadius: "50%"
          }}
        />
        <h4>{profile.id}</h4>
      </div>
    )
  );
};

export default Profile;
