import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

interface HoverInfoProps {
  showHoverInfo: boolean;
  setShowHoverInfo: (showHoverInfo: boolean) => void;
}

export function HoverInfo({ showHoverInfo, setShowHoverInfo }: HoverInfoProps) {
  return (
    <div className="flex items-center space-x-2 absolute top-7 left-5">
      <Switch
        id="suggestion-mode"
        onClick={() => {
          if (showHoverInfo) {
            toast.dismiss();
            toast("HoverInfo disabled", { duration: 1000 });
            setShowHoverInfo(false);
          } else {
            toast.dismiss();
            toast("HoverInfo enabled", { duration: 1000 });
            setShowHoverInfo(true);
          }
        }}
      />
      <Label htmlFor="airplane-mode" className="font-bold">
        HoverInfo
      </Label>
    </div>
  );
}
