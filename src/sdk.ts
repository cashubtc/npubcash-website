import { hexToBytes } from "@noble/hashes/utils";
import { NCSDK, Nip07Signer, Nip46Signer } from "cashu-address-sdk";

export async function setupSdk() {
  const method = localStorage.getItem("sdk-method") as
    | "nip07"
    | "nip46"
    | undefined;
  console.log(method);
  if (method === "nip07") {
    return new NCSDK("https://npub.cash", new Nip07Signer());
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
    return new NCSDK("https://npub.cash", signer);
  }
}
