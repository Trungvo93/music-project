import HeaderProfileComp from "./HeaderProfileComp";
import PlaylistProfileComp from "./PlaylistProfileComp";
import RecentlyProfileComp from "./RecentlyProfileComp";
const UserProfileComp = () => {
  return (
    <div>
      {/* Header profile */}
      <HeaderProfileComp />
      {/* User playlist */}
      <div className='mx-3 my-5'>
        <PlaylistProfileComp />
      </div>
      <div className='mx-3 my-5'>
        <RecentlyProfileComp />
      </div>
    </div>
  );
};

export default UserProfileComp;
