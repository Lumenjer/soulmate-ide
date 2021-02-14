import "@szhsin/react-menu/dist/index.css";

import { FaUsb, FaWifi } from "react-icons/fa";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxCircleFill,
  RiIndeterminateCircleLine,
} from "react-icons/ri";

import soulmateName from "~/utils/soulmateName";

const SoulmateMenuItem = ({
  soulmate,
  selected,
  allowUsb,
  disabled,
  className,
}) => {
  if (soulmate.type === "usb" && allowUsb) disabled = false;
  const CheckboxIcon = selected
    ? RiCheckboxCircleFill
    : RiCheckboxBlankCircleFill;
  const ConnectionIcon = soulmate.type === "usb" ? FaUsb : FaWifi;

  return (
    <div
      className={classnames(
        "flex flex-row text-xs text-sm whitespace-pre space-x-2 items-center",
        className
      )}
    >
      {!disabled ? (
        <CheckboxIcon className="flex-shrink-0 w-4 h-4 text-purple-600" />
      ) : (
        <RiIndeterminateCircleLine className="flex-shrink-0 w-4 h-4" />
      )}

      <span className="leading-snug">
        <span className="truncate">{soulmateName(soulmate)}</span>
        {soulmate.config?.version && (
          <span className="ml-2 font-mono align-baseline text-2xs">
            (v{soulmate.config?.version})
          </span>
        )}
      </span>

      <ConnectionIcon className="w-4 h-4 ml-auto" />
    </div>
  );
};

export default SoulmateMenuItem;
