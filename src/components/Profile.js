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
      <div style={{ width: "100%", display: "flex" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "1em",
            marginTop: "1em"
          }}
        >
          <p style={{ margin: "0 0.5em 0 0" }}>
            <b>{profile.id}</b>
          </p>
          <img
            height="50px"
            src={profile.images[0].url}
            alt={profile.id}
            style={{
              objectFit: "cover",
              borderRadius: "50%"
            }}
          />
        </span>
      </div>
    )
  );
};

export default Profile;
