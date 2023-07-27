const page = ({ params }) => {
  return (
    <div>
      Enter
      <h1>{params.id}</h1>
    </div>
  );
};

export default page;
