import React from "react";
type props = {
  loading: boolean;
};
const OutlineSection = ({ loading }: props) => {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl">Slider Outline</h2>
      {loading && (
        <div>
          {/* {
          [1,2,3,4,5].map((item,index)=>{
            <Skeloten/>
          })
        } */}
        </div>
      )}
    </div>
  );
};

export default OutlineSection;
