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
