export const PrevOrder = ({ prevOrderList }) => {
  return (
    <div>
      {prevOrderList.map((obj, index) => (
        <div key={index}></div>
      ))}
      <button onClick={() => console.log(prevOrderList)}>test</button>
    </div>
  );
};
