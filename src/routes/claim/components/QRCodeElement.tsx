import { UR, UREncoder } from "@gandlaf21/bc-ur";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

type QRCodeElementProps = {
  value?: string;
};

function QRCodeElement({ value }: QRCodeElementProps) {
  const [tokenPart, setTokenPart] = useState("");
  const [speed, setSpeed] = useState<"H" | "L">("H");
  const [size, setSize] = useState<"S" | "L">("L");

  useEffect(() => {
    // @ts-ignore
    let interval: NodeJS.Timeout;
    if (value) {
      const ur = UR.from(value);
      const maxFragmentLength = size === "L" ? 150 : 75;
      const firstSeqNum = 0;
      const urEncoder = new UREncoder(ur, maxFragmentLength, firstSeqNum);
      interval = setInterval(
        () => {
          setTokenPart(urEncoder.nextPart());
        },
        speed === "H" ? 100 : 250,
      );
    }
    return () => {
      clearInterval(interval);
    };
  }, [value, size, speed]);

  if (!tokenPart) {
    return (
      <div className="bg-zinc-700 p-2 rounded">
        <QRCode value={"1"} bgColor="#27272a" fgColor="#3f3f46" />
      </div>
    );
  }
  return (
    <div className="bg-white p-2 rounded">
      <QRCode value={tokenPart} />
    </div>
  );
}

export default QRCodeElement;
