import React from "react";
import { FaStar } from "react-icons/fa";

const StarRatingDisplay = ({ rating }: { rating: number }) => {
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const stars = [...Array(5).fill(0)];

  rating = Math.round(rating); // Round the rating to the nearest integer

  return (
    <div className="flex gap-1">
      {stars.map((_, index) => (
        <FaStar
          key={index}
          size={20}
          color={rating > index ? colors.orange : colors.grey}
        />
      ))}
    </div>
  );
};

export default StarRatingDisplay;
