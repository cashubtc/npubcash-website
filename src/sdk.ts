import { hexToBytes } from "@noble/hashes/utils";
import { NCSDK, Nip07Signer, Nip46Signer } from "cashu-address-sdk";

type SdkMethod = "nip07" | "nip46" | "ncrypt" | null;

export async function setupSdk(): Promise<
  { method: SdkMethod; sdk?: NCSDK } | undefined
> {
  const method = localStorage.getItem("sdk-method") as SdkMethod;
  if (method === "nip07") {
    return { method, sdk: new NCSDK("https://npub.cash", new Nip07Signer()) };
  }
  if (method === "nip46") {
    const connectionConfig = localStorage.getItem("nip46-config");
    console.log("No config found...");
    if (!connectionConfig) {
      return undefined;
    }
    const parsedConfig = JSON.parse(connectionConfig) as {
      connectionString: string;
      clientSecret: string;
    };
    const signer = new Nip46Signer(
      parsedConfig.connectionString,
      hexToBytes(parsedConfig.clientSecret),
    );
    await signer.connect();
    return { method, sdk: new NCSDK("https://npub.cash", signer) };
  }
  if (method === "ncrypt") {
    return { method };
  }
}
