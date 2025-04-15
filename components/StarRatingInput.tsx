import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | undefined>(undefined);

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const handleMouseOverStar = (value: number) => {
    setHover(value);
  };

  const handleMouseLeaveStar = () => {
    setHover(undefined);
  };

  const handleClickStar = (value: number) => {
    const newRating = rating === value ? 0 : value;
    setRating(newRating);
    setHover(undefined); // Reset hover explicitly for mobile devices
    onRatingChange(newRating); // Notify the parent of the new rating
  };

  const stars = [...Array(5).fill(0)];

  return (
    <div className="flex gap-1">
      {stars.map((_, index) => (
        <FaStar
          key={index}
          size={20}
          color={(hover || rating) > index ? colors.orange : colors.grey}
          onClick={() => handleClickStar(index + 1)}
          onMouseOver={() => handleMouseOverStar(index + 1)}
          onMouseLeave={handleMouseLeaveStar}
        />
      ))}
    </div>
  );
};

export default StarRating;
