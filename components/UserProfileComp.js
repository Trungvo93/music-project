import HeaderProfileComp from "./HeaderProfileComp";
import PlaylistProfileComp from "./PlaylistProfileComp";
const UserProfileComp = () => {
  return (
    <div>
      {/* Header profile */}
      <HeaderProfileComp />
      {/* User playlist */}
      <div className='mx-3 my-5'>
        <PlaylistProfileComp />
      </div>
    </div>
  );
};

export default UserProfileComp;
