import type { ReactNode } from "react";

const symbols: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
  route: "M4 7h9a4 4 0 0 1 0 8H9a3 3 0 1 0 0 6h10M4 4v6M19 18v6",
  practice: "m13 2-9 12h7l-1 8 10-12h-7z",
  exam: "M7 3h8l4 4v14H5V3h2zm8 0v5h5M8 12h8M8 16h8",
  book: "M12 5C9 3 6 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1zm0 0v15",
  duo: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8-1a3 3 0 1 0 0-6M1 21v-3a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3m3-7h1a4 4 0 0 1 4 4v3",
  stats: "M4 20h16M7 17v-5m5 5V7m5 10V4",
  cards: "m6 5 13 2-2 13-13-2zm0 0 2-2 13 2-2 13",
  arrow: "M4 12h15m-6-6 6 6-6 6",
  trophy: "M8 4h8v6a4 4 0 0 1-8 0zm0 1H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 2v5m-4 2h8",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-15v5l3 2",
  spark: "M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z",
  menu: "M4 6h16M4 12h16M4 18h16",
  check: "m5 12 4 4 10-10",
  download: "M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3",
};
export function Icon({ name, size = 19 }: { name: string; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d={symbols[name] ?? symbols.spark} /></svg>;
}

export function Brand() {
  return <div className="brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span><div><strong>Sprachlabor</strong><small>DEUTSCH ZU ZWEIT</small></div></div>;
}
export function SectionHead({ code, title, detail, children }: { code: string; title: string; detail: string; children?: ReactNode }) {
  return <header className="section-head"><div><div className="eyebrow"><span className="signal" /> {code}</div><h1>{title}</h1><p>{detail}</p></div>{children}</header>;
}
