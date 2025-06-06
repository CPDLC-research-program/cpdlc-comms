import { useContext, useEffect, useState } from "react";
import { RequestContext } from "../../../context/RequestContext";
import DownLinks from "../../../data/DownLinks.json";
import { LogsArray } from "../../../constants/logs";
import { MessageState } from "../../../interfaces/MessageState";
import { time } from "console";

export default function MessagePreview() {
  const { request } = useContext(RequestContext);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    //simule le delai d envoi
    if (isSending) {
      setTimeout(() => {
        setIsSent(true);
        setIsSending(false);
      }, 2000);
    }
  }, [isSending]);

  const formattedMessage = () => {
    const DMessage = DownLinks.find(
      (msg) => msg.Ref_Num.replace(/\s+/g, "") === request.messageRef,
    );
    if (!DMessage) return "";

    let result = DMessage.Message_Element;

    let levelIndex = 0;
    result = result.replace(/\[level\]/g, () => {
      if (request.arguments && levelIndex < request.arguments.length) {
        return request.arguments[levelIndex++];
      }
      return "[level]";
    });

    result = result.replace(/\[time\]/g, () => {
      if (request.timeSelected?.hh && request.timeSelected?.mm) {
        return `${request.timeSelected.hh}:${request.timeSelected.mm}`;
      }
      return "[time]";
    });

    result = result.replace(/\[position\]/g, () => {
      return request.positionSelected || "[position]";
    });

    return result.trim();
  };

  const addMessageLog = () => {
    LogsArray.push({
      id: (Math.random() * 1000000).toFixed(0).toString(),
      ref: request.messageRef,
      state: MessageState.OPENED,
      element: formattedMessage(),
    });
  };

  return (
    <div
      className="flex flex-col w-full p-4 gap-4 
                 border-[3px] border-[#539fd3]/50 
                 rounded-lg 
                 bg-gradient-to-b from-[#1e1e1e] to-[#1a1a1a] 
                 text-white shadow-sm"
    >
      <p className="text-white font-noto text-base not-italic font-normal leading-none uppercase">
        Preview
      </p>

      <div className="w-full px-4 py-3 rounded border-2 border-white-10 bg-medium-gray text-white/90 text-base">
        {formattedMessage()}
      </div>

      <div className="flex w-full gap-4">
        <button
          className={`flex-1 px-4 py-2 rounded bg-white-20 ${isSent ? "" : "hover:bg-white-10 cursor-pointer"}  text-white-80 font-semibold tracking-wide uppercase`}
        >
          Cancel
        </button>

        {!isSending && !isSent && (
          <button
            onClick={() => {
              setIsSending(true);
              addMessageLog();
            }}
            className="flex-1 px-4 py-2 rounded bg-dark-blue text-white-80 font-semibold tracking-wide hover:bg-dark-blue-50 transition-colors uppercase"
          >
            Send
          </button>
        )}
        {isSending && !isSent && (
          <button
            disabled
            className="flex-1 px-4 py-2 rounded bg-gray-400 text-white font-semibold tracking-wide relative uppercase"
          >
            Sending
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          </button>
        )}
        {isSent && (
          <button
            disabled
            className="flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded bg-green text-white font-semibold tracking-wide"
          >
            <span className="uppercase">Sent</span>
            <img src="/check.svg" alt="Check Icon" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
