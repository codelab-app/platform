// accepts a cdn url for es modules from popular cdn providers
export const cdnEsmRegex =
  /https?:\/\/(?:cdn\.)?(?:[\w-]+\.)+[\w-]+\/(?:[\w@%.-]+\/)*?[^/@]+@[^/]+\/\+\w+/
