import { getAiToolInjectableBunch, type AiToolDescriptionProps } from "@k8slens/ai-tools-contracts";
import { ClickableDiv } from "@k8slens/element-components";
import { OpenInBrowserIcon } from "@k8slens/icon";
import { useInject } from "@k8slens/use-inject";
import { openPiWebsiteInjectable } from "./open-pi-website.injectable";
import { getPiCliCommand, getPiResumeCliCommand } from "./pi-command";
import { PiIcon } from "./pi-icon";

const PiDescription = ({ isInstalled }: AiToolDescriptionProps) =>
  isInstalled ? <>The minimal terminal coding agent harness</> : <>Not found in PATH</>;

// One row, like Lens's own tools: the page it opens has the install command.
const PiInstallationInstructions = () => {
  const openPiWebsite = useInject(openPiWebsiteInjectable)();

  return (
    <ClickableDiv
      $onClick={openPiWebsite}
      $color="link"
      $flex={{ gap: "xs", verticalAlign: "center" }}
      $tooltip="npm install -g --ignore-scripts @earendil-works/pi-coding-agent"
    >
      Install pi
      <OpenInBrowserIcon $size="m" />
    </ClickableDiv>
  );
};

export default getAiToolInjectableBunch({
  kind: "pi-coding-agent",
  name: "Pi",
  orderNumber: 500,
  Icon: PiIcon,
  Description: PiDescription,
  InstallationInstructions: PiInstallationInstructions,

  getCliCommand: getPiCliCommand,
  getResumeCliCommand: getPiResumeCliCommand,

  // Building the external-terminal command needs the user's shell path, which no published
  // package hands out yet, so pi opens in Lens's own terminal only.
  getOpenToolInExternalTerminalCliCommand: async () => "",

  getAiToolIsInstalledCliCommand: {
    macos: () => "command -v pi",
    linux: () => "command -v pi",
    // In PowerShell `where` is Where-Object, which finds nothing and still succeeds.
    windows: () => "where.exe pi",
  },
});
