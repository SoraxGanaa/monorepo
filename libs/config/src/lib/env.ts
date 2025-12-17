export const API_BASE_URL =
  process.env["INTERNAL_API_BASE_URL"] || // SSR үед (cluster дотор)
  process.env["NEXT_PUBLIC_API_BASE_URL"] || // browser үед
  "";
