import HeaderProfileComp from "@/features/leftSide/menuInfor/userProfile/HeaderProfileComp";
import PlaylistProfileComp from "@/features/leftSide/menuInfor/userProfile/PlaylistProfileComp";
import RecentlyProfileComp from "@/features/leftSide/menuInfor/userProfile/RecentlyProfileComp";
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
