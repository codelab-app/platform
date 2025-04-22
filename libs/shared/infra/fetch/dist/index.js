const o = async (e, n = {}) => {
  const t = await fetch(e, n);
  if (!t.ok)
    throw new Error(await t.text());
  return t;
}, a = async (e, n, t) => (e.setHeaders({
  Accept: "application/graphql-response+json",
  Connection: "keep-alive",
  "Content-Type": "application/json"
}), await e.request(n.toString(), t));
export {
  o as fetchWithAuth,
  a as gqlRequest
};
