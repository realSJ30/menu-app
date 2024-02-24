import React from "react";
import SkeletonCard from "./skeleton-card";

interface SkeletonListProps {
  length: number;
}
const SkeletonList: React.FC<SkeletonListProps> = ({ length }) => {
  const randomArray = Array.from({ length }, (_, index) => index);
  return randomArray.map((array) => <SkeletonCard key={array} />);
};

export default SkeletonList;
