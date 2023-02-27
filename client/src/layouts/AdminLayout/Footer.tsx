import { FC } from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const Footer: FC = () => {
  return (
    <footer className="px-4 py-8 flex justify-center items-center">
      <AiOutlineCopyright />
      <span> 2022 Produced by The Food Order</span>
    </footer>
  );
};

export default Footer;
