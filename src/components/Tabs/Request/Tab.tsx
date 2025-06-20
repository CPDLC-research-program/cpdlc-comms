import { useState } from "react";
import { RequestProvider } from "../../../context/RequestContext";
import MessagePreview from "./MessagePreview";
import RouteModificationRequest from "./RequestCategories/RouteModificationRequest/RouteModificationRequest";
import { OffsetRequest } from "./RequestCategories/OffsetRequest/OffsetRequest";
import { SpeedRequest } from "./RequestCategories/SpeedRequest.tsx/SpeedRequest";
import { WhenCanWeRequest } from "./RequestCategories/WhenCanWeRequest/WhenCanWeRequest";
import { ClearanceRequest } from "./RequestCategories/ClearanceRequest/ClearanceRequest";
import { VmcDescentRequest } from "./RequestCategories/VmcDescentRequest/VmcDescentRequest";
import { VoiceContactRequest } from "./RequestCategories/VoiceContactRequest/VoiceContactRequest";
import { FreeTextRequest } from "./RequestCategories/FreeTextRequest/FreeTextRequest";
import AltitudeRequest from "./RequestCategories/AltitudeRequest/AltitudeRequest";

export default function RequestTab() {
  const [preview, setPreview] = useState(false);
  return (
    <RequestProvider>
      <div className={`flex flex-col h-full px-4 pt-4 gap-4 text-white relative ${preview ? "overflow-y-hidden" : ""}`}>
        <div className="flex flex-row items-center justify-between">
          <h1>request</h1>
        </div>
        <div className="flex flex-col gap-4 disable">
          <AltitudeRequest
            disabled={preview}
            onSend={() => setPreview(true)}
          />
        </div>
        <div className="flex flex-col gap-4 disable">
          <RouteModificationRequest
            disabled={preview}
            onSend={() => setPreview(true)}
          />
        </div>
        <div className="flex flex-col gap-4 disable">
          <OffsetRequest
            disabled={preview}
            onSend={() => setPreview(true)}
          />
        </div>
        <div className="flex flex-col gap-4 disable">
          <SpeedRequest
            disabled={preview}
            onSend={() => setPreview(true)}
          />
        </div>
        <div className="flex flex-col gap-4 disable">
          <WhenCanWeRequest
            disabled={preview}
            onSend={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
          <ClearanceRequest
            disabled={preview}
            onSend={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
        <VmcDescentRequest
            disabled={preview}
            onSend={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
        <VoiceContactRequest
            disabled={preview}
            onSend={() => setPreview(true)}
        />
        </div>
        <div className="flex flex-col gap-4 disable">
        <FreeTextRequest
            disabled={preview}
            onSend={() => setPreview(true)}
        />
        </div>
        {preview && (
          // <div className="flex flex-col gap-4 mt-auto mb-2.5">
          <div className="absolute bottom-[0px] left-0 w-full px-2 z-50">
           <div className="bg-[#1e1e1e]/95 backdrop-blur-sm shadow-[0_-10px_10000px_rgba(43,43,43,1)] rounded-t-md border-t border-white/10">
            <MessagePreview />
          </div>
          </div>
        )}
      </div>
    </RequestProvider>
  );
}
