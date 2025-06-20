import MessageContainer from "./MessageContainer";
import { useContext, useEffect, useState } from "react";
import MessageDisplayTab from "./MessageDisplayTab";
import OptionBar from "./OptionBar";
import SelectDropdown from "../../General/SelectDropdown";
import { LogsArray } from "../../../constants/logs";
import { LogsContext } from "../../../context/LogsContext";

export default function LogsTab() {
  const [value, setValue] = useState("FILTER BY");
  const { logs, setFilterBy, currentLog, setCurrentLog } = useContext(LogsContext);

  const findMessageById = (id) => {
    return LogsArray.find((msg) => msg.id === id);
  };
  
  useEffect(() => {
    console.log("current logs:", logs);
    
  }, []);

  return (
    <div className="flex flex-col h-full">
      {!currentLog && (
        <div className="flex flex-col h-full px-4 pt-4 gap-4 text-white">
          <div className="flex flex-row items-center justify-between">
            <h1>message log</h1>
            <SelectDropdown
              options={[
                "NEW",
                "OPENED",
                "ACCEPTED",
                "REJECTED",
                "STANDBY",
                "TIME OUT",
              ]}
              value={value}
              onChange={() => {
                setValue(value);
                setFilterBy(value);
                }
              }
              icon="/fans-button.svg"
            />
          </div>
          <div className="flex-grow overflow-y-auto">
            <MessageContainer messages={logs} />
          </div>
        </div>
      )}
      {currentLog && (
        <div className="flex flex-col h-full px-4 pt-4 gap-4 text-white">
          <div className="flex flex-row items-center justify-between">
            <div
              onClick={() => setCurrentLog(null)}
              className="flex gap-0 text-white rounded cursor-pointer justify-center items-center"
            >
              <img
                src="/arrow-back.svg"
                alt="icon"
                className="w-auto h-[25px]"
              />
              <h1>message log</h1>
            </div>
          </div>
          <div className="flex flex-col h-full gap-4">
            <div className="rounded w-full">
              <MessageDisplayTab message={currentLog} />
            </div>
            <div className="mt-auto mb-4">
              <OptionBar message={currentLog} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}