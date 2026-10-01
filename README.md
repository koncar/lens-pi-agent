# Pi Agent for Lens

Adds [pi](https://github.com/earendil-works/pi), the minimal terminal coding agent harness, to Lens's AI tools. Once it is installed, pi appears next to Lens's own AI tools wherever you pick one, and Lens opens it wherever it opens an AI tool, building a Lens extension included.

## Features

- **Pi in the AI tool list.** Pick **Pi** from the AI tool button in the top bar, or in Preferences, like any other AI tool.
- **Opens where Lens opens AI tools.** Lens starts pi in its terminal, in the working directory it prepared. pi reads the `AGENTS.md` Lens writes there, so it starts with the cluster or extension context, and with your question when Lens has one.
- **Picks up where you left off.** When Lens restores a pi tab, for example after a restart, pi continues that directory's most recent session.
- **Tells you when pi is missing.** If pi is not on your `PATH`, it is shown as "Not found in PATH", with an **Install pi** link to its install instructions.

## Usage

1. Install pi, which needs Node.js 22.19 or later:

   ```sh
   npm install -g --ignore-scripts @earendil-works/pi-coding-agent
   ```

   Make sure pi can reach a model provider: run `pi` once in a terminal and sign in, or set your provider's API key.
2. In Lens, open the AI tool button in the top bar and select **Pi**.

Lens finds pi through your login shell's `PATH`. If you use a Node version manager, install pi under the Node version your shell uses by default.

Pi opens in Lens's own terminal only. Opening it in a separate terminal window is not supported yet.

What changed in each version is in [CHANGELOG.md](./CHANGELOG.md).
