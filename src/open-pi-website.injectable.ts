import { getInjectable2 } from "@k8slens/injectable";
import { openLinkInBrowserInjectionToken } from "@k8slens/electron-contracts";

export const piWebsiteUrl = "https://github.com/earendil-works/pi";

export const openPiWebsiteInjectable = getInjectable2({
  id: "lens-pi-agent-open-pi-website",
  consumptions: [openLinkInBrowserInjectionToken],
  instantiate: (di) => () => async () => {
    const openLinkInBrowser = di.inject(openLinkInBrowserInjectionToken)();

    await openLinkInBrowser(piWebsiteUrl);
  },
});
