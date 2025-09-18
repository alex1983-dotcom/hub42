import React from "react";
import { FC } from "react";
import { BurgerButtonProps } from "../../types";
import { ReactComponent as Icon } from "../../assets/buttonBurger.svg";
import { ReactComponent as IconClosed } from "../../assets/buttonClose.svg";
import "./index.css";
export const BurgerButton: FC<BurgerButtonProps> = ({ isOpen, setOpen }) => {
   return (
      <button className="header__menu-button" onClick={() => setOpen(!isOpen)}>
         {isOpen ? <IconClosed /> : <Icon />}
      </button>
   );
};
