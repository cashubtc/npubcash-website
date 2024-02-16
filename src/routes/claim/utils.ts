//@ts-ignore
import { decode as decodeInvoice } from "light-bolt11-decoder";
export async function createAuthHeader(url: string, method: string) {
  const event = {
    content: "",
    kind: 27235,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["u", url],
      ["method", method],
    ],
  };
  const signedEvent = await window.nostr.signEvent(event);
  return `Nostr ${btoa(JSON.stringify(signedEvent))}`;
}

export async function authedJsonRequest(
  url: string,
  authHeader: string,
  options?: RequestInit,
) {
  return fetch(url, {
    ...options,
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });
}

export function getInvoiceAmount(invoice: string) {
  const { sections } = decodeInvoice(invoice);
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].name === "amount") {
      return sections[i].value / 1000;
    }
  }
}

export async function requestUsernameInvoice(
  username: string,
  authHeader: string,
) {
  const res = await fetch("https://cashu-address.com/api/v1/info/username", {
    method: "PUT",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
  });
  if (res.status !== 402) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json() as Promise<{
    error: true;
    message: string;
    data: { paymentToken: string; paymentRequest: string };
  }>;
}

export async function getToken() {
  const event = {
    content: "",
    kind: 27235,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["u", "https://cashu-address.com/api/v1/claim"],
      ["method", "GET"],
    ],
  };
  const signedEvent = await window.nostr.signEvent(event);
  const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
  const res = await fetch("https://cashu-address.com/api/v1/claim", {
    headers: {
      Authorization: authHeader,
    },
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(data.message);
  }
  return data.data.token;
}

export async function getInfo() {
  const event = {
    content: "",
    kind: 27235,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["u", "https://cashu-address.com/api/v1/info"],
      ["method", "GET"],
    ],
  };
  const signedEvent = await window.nostr.signEvent(event);
  const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
  const res = await fetch("https://cashu-address.com/api/v1/info", {
    headers: {
      Authorization: authHeader,
    },
  });
  const data = (await res.json()) as {
    mintUrl: string;
    npub: string;
    username?: string;
  };
  return data;
}

export async function getBalance() {
  const event = {
    content: "",
    kind: 27235,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["u", "https://npub.cash/api/v1/balance"],
      ["method", "GET"],
    ],
  };
  const signedEvent = await window.nostr.signEvent(event);
  const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
  const res = await fetch("https://npub.cash/api/v1/balance", {
    headers: {
      Authorization: authHeader,
    },
  });
  const data = (await res.json()) as {
    error: boolean;
    data: number;
  };
  if (data.error) {
    throw new Error("Unable to get Balance");
  }
  if (!data.error) {
    return data.data;
  }
}
