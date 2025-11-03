import React, { useState } from "react";
import { DesignStyles } from "./Assets";

const SliderStyle = () => {
  const [selectedStyle, setSelectedStyle] = useState("");

  return (
    <div className="mb-8 w-full max-w-6xl mx-auto px-4">
      <label className="text-2xl font-semibold text-white mb-5 block text-center">
        Select a Style
      </label>

      <div
        className="
          grid 
          grid-cols-1           
          sm:grid-cols-2          
          lg:grid-cols-3          
          gap-6                   
        "
      >
        {DesignStyles.map((style, index) => (
          <button
            key={index}
            onClick={() => setSelectedStyle(style.styleName)}
            className={`relative w-full aspect-[16/9] rounded-2xl border-2 transition-all overflow-hidden shadow-lg ${
              selectedStyle === style.styleName
                ? "border-white scale-[1.02]"
                : "border-zinc-700 hover:border-white"
            }`}
          >
            <img
              src={style.bannerImage}
              alt={style.styleName}
              className="w-full h-full object-cover hover:scale-105 transition-all"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-base text-center py-2 font-medium backdrop-blur-sm">
              {style.styleName}
            </div>

            {selectedStyle === style.styleName && (
              <div className="absolute inset-0 bg-white/10 scale-200 " />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SliderStyle;
