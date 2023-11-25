import React from "react";

interface UserDetailsProps {
  username: string;
  type: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ username, type }) => {
  return (
    <div className="flex items-center justify-start gap-3 text-xs mt-2">
      <h3 className="flex px-2 py-1 text-center w-auto text-yellow-500 bg-yellow-600/30 rounded-lg">
        {username}
      </h3>
      <h3 className="flex px-2 py-1 text-center w-auto text-green-500 bg-green-600/30 rounded-lg">
        {type}
      </h3>
    </div>
  );
};

export default UserDetails;
