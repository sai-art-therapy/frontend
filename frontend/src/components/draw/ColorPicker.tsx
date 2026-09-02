import React from "react";

export const PALETTE_COLORS = [
  "#FF383C",
  "#FF8D28",
  "#FFCC00",
  "#34C759",
  "#0088FF",
  "#CB30E0",
  "#FFFFFF",
  "#000000",
];

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="flex items-center justify-center gap-[6px] py-[6px] px-[16px] bg-white overflow-x-auto select-none">
      {PALETTE_COLORS.map((color) => {
        const isSelected = selectedColor.toLowerCase() === color.toLowerCase();

        return (
          <button
            key={color}
            type="button"
            onClick={() => onSelectColor(color)}
            className={`flex w-[40px] h-[40px] px-[4px] justify-center items-center gap-[10px] rounded-[1000px] shrink-0 transition-colors ${
              isSelected ? "bg-black" : "bg-grey-50"
            }`}
          >
            <span
              className="w-[28px] h-[28px] shrink-0 aspect-square rounded-[1000px] border-[3px] border-white"
              style={{ backgroundColor: color }}
            />
          </button>
        );
      })}
    </div>
  );
};
