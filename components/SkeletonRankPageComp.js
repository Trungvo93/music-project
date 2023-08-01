import { Skeleton } from "antd";
const SkeletonRankPageComp = () => {
  return (
    <div>
      {Array.from({ length: 10 }, (value, index) => (
        <div className='flex flex-nowrap gap-3 my-3' key={index}>
          <Skeleton.Avatar active size='large' shape='circle' />
          <Skeleton.Input active size='large' block={true} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonRankPageComp;
