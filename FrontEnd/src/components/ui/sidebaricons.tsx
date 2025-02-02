import { ReactNode } from "react";

interface IconProps {
  icon: ReactNode;
  onClick: () => void;
  selected?: boolean;
}

export const Sidebaricons = ({ icon, onClick,}: IconProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-2 rounded-lg`}
    >
      {icon}
    </div>
  );
};


