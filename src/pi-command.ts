import { shellQuote, windowsShellQuote, type GetCliCommand, type ShellSpecific } from "@k8slens/ai-tools-contracts";

interface Shell {
  readonly quote: (value: string) => string;
  readonly inDir: (dir: string, command: string) => string;
}

// fish reads `\\` and `\'` as escapes inside single quotes, so a POSIX-quoted value is not safe there.
const fishQuote = (value: string) => `'${value.replace(/[\\']/g, "\\$&")}'`;

// PowerShell escapes a single quote inside single quotes by doubling it.
const powershellQuote = (value: string) => `'${value.replace(/'/g, "''")}'`;

const shells: ShellSpecific<Shell> = {
  posix: {
    quote: shellQuote,
    inDir: (dir, command) => `cd ${shellQuote(dir)} && ${command}`,
  },
  fish: {
    quote: fishQuote,
    inDir: (dir, command) => `cd ${fishQuote(dir)}; and ${command}`,
  },
  cmd: {
    quote: windowsShellQuote,
    inDir: (dir, command) => `cd /d ${windowsShellQuote(dir)} && ${command}`,
  },
  powershell: {
    quote: powershellQuote,
    inDir: (dir, command) => `Set-Location -LiteralPath ${powershellQuote(dir)} -ErrorAction Stop; ${command}`,
  },
};

const forEachShell = (build: (shell: Shell) => GetCliCommand): ShellSpecific<GetCliCommand> => ({
  posix: build(shells.posix),
  fish: build(shells.fish),
  cmd: build(shells.cmd),
  powershell: build(shells.powershell),
});

// pi has no `--` to end its options: an argument starting with "-" is read as a flag, and one
// starting with "@" as a file to attach. A leading space keeps such a prompt a message.
const asMessage = (prompt: string) => (/^[-@]/.test(prompt) ? ` ${prompt}` : prompt);

// pi has no option for its working directory, and discovers AGENTS.md from the one it starts in.
export const getPiCliCommand = forEachShell(({ quote, inDir }) => async (_di, { prompt, dir }) =>
  inDir(dir, prompt ? `pi ${quote(asMessage(prompt))}` : "pi"),
);

// `--continue` picks up the directory's most recent session, and starts a new one when there is none.
export const getPiResumeCliCommand = forEachShell(({ inDir }) => async (_di, { dir }) => inDir(dir, "pi --continue"));
