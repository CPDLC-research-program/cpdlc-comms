import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { socketService } from "../../../api/communications/socket/socketService";

export default function AtcConnection() {
  const { isConnectionPossible, setIsConnectionPossible } = useContext(UserContext);

  useEffect(() => {
    const handleConnect = () => setIsConnectionPossible(true);
    const handleDisconnect = () => setIsConnectionPossible(false);

    socketService.listen("connect", handleConnect);
    socketService.listen("disconnect", handleDisconnect);

    return () => {
      socketService.off("connect", handleConnect);
      socketService.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <div className="container flex flex-col items-start">
      <h2>Connection</h2>
      <div className="flex items-center justify-between w-full">
        <p className="secondary-text pt-[10px]">ATC Data Link</p>
        <label className="relative inline-block w-[49px] h-[31px] cursor-pointer">
          <input readOnly
            type="checkbox"
            className="sr-only peer"
            checked={isConnectionPossible}
            // onChange={(e) => setIsConnectionPossible(e.target.checked)}
          />
          <div className="absolute inset-0 bg-gray-300 peer-checked:bg-green rounded-md transition-colors duration-300"></div>
          <div
            className="absolute left-1 top-1 w-[24px] h-[24px] bg-light-gray text-white-80 font-sans text-[10px] not-italic font-semibold leading-normal flex items-center justify-center rounded-md
            transition-all duration-300 peer-checked:translate-x-[18px]
            before:content-['OFF'] peer-checked:before:content-['ON']"
          ></div>
        </label>
      </div>

      <div className="loader"></div>
    </div>
  );
}
