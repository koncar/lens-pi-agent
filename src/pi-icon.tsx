import { Svg, type SvgProps } from "@k8slens/element-components";

// A bold π, drawn in currentColor so it follows whatever renders it.
export const PiIcon = (props: SvgProps) => (
  <Svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 4.5h18v3.25H3zM6.25 7.75h3.25V19.5H6.25zM14 7.75h3.25v8.5c0 .75.35 1.1 1.1 1.1H20.5v2.15h-2.65c-2.5 0-3.85-1.3-3.85-3.75z" />
  </Svg>
);
