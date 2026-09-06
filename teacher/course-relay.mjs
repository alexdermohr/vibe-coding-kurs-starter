#!/usr/bin/env node

import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, realpathSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const relayRoot = resolve(
  process.env.VIBE_RELAY_ROOT || join(homedir(), ".local", "share", "vibe-coding-kurs-relay")
);
const workspaceRoot = join(relayRoot, "workspaces");
const receiptRoot = join(relayRoot, "receipts");
const repository = "alexdermohr/vibe-coding-kurs-starter";

function fail(message) {
  console.error(`Relay-Fehler: ${message}`);
  process.exit(1);
}

function run(command, args, { cwd = repoRoot, capture = false, allowFailure = false } = {}) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.error) fail(`${command} konnte nicht gestartet werden: ${result.error.message}`);
  if (!allowFailure && result.status !== 0) {
    const detail = capture ? (result.stderr || result.stdout || "").trim() : "";
    fail(`${command} ${args.join(" ")} fehlgeschlagen${detail ? `: ${detail}` : ""}`);
  }
  return result;
}

function output(command, args, cwd = repoRoot) {
  return run(command, args, { cwd, capture: true }).stdout.trim();
}

function readOption(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) fail(`Option ${name} fehlt.`);
  return process.argv[index + 1];
}

function normalizeStudent(raw) {
  const slug = raw
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);
  if (!/^[a-z0-9][a-z0-9-]{1,23}$/.test(slug)) {
    fail("Pseudonym braucht mindestens zwei Buchstaben/Ziffern und darf Bindestriche enthalten.");
  }
  return slug;
}

function validateMessage(message) {
  const trimmed = message.trim();
  if (trimmed.length < 4 || trimmed.length > 72 || /[\r\n]/.test(trimmed)) {
    fail("Commit-Nachricht muss einzeilig und 4 bis 72 Zeichen lang sein.");
  }
  return trimmed;
}

function timestamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function validateWorkspace(raw) {
  if (!existsSync(raw)) fail("Workspace existiert nicht.");
  mkdirSync(workspaceRoot, { recursive: true });
  const root = realpathSync(workspaceRoot);
  const workspace = realpathSync(raw);
  if (workspace !== root && !workspace.startsWith(root + sep)) {
    fail("Workspace liegt nicht im verwalteten Relay-Bereich.");
  }
  const inside = output("git", ["rev-parse", "--is-inside-work-tree"], workspace);
  if (inside !== "true") fail("Workspace ist kein Git-Worktree.");
  return workspace;
}

function currentBranch(workspace) {
  const branch = output("git", ["branch", "--show-current"], workspace);
  if (!branch || branch === "main" || !branch.startsWith("relay/")) {
    fail(`Unsicherer Branch: ${branch || "(detached)"}. Erwartet wird relay/… und niemals main.`);
  }
  return branch;
}

function prepare() {
  const student = normalizeStudent(readOption("--student"));
  const stamp = timestamp().toLowerCase();
  const nonce = randomBytes(3).toString("hex");
  const branch = `relay/${student}-${stamp}-${nonce}`;
  const workspace = join(workspaceRoot, `${student}-${stamp}-${nonce}`);
  mkdirSync(workspaceRoot, { recursive: true });

  run("git", ["fetch", "--no-tags", "origin", "main"], { cwd: repoRoot, capture: true });
  run("git", ["worktree", "add", "-b", branch, workspace, "origin/main"], {
    cwd: repoRoot,
    capture: true,
  });

  console.log(JSON.stringify({ student, branch, workspace }, null, 2));
}

function preview() {
  const workspace = validateWorkspace(readOption("--workspace"));
  const branch = currentBranch(workspace);
  const status = output("git", ["status", "--short"], workspace);
  const stat = output("git", ["diff", "--no-ext-diff", "--stat"], workspace);
  const diff = output("git", ["diff", "--no-ext-diff", "--"], workspace);

  console.log(`Branch: ${branch}`);
  console.log(status || "Keine Änderungen.");
  if (stat) console.log(`\n${stat}`);
  if (diff) console.log(`\n${diff}`);
}

function submit() {
  const student = normalizeStudent(readOption("--student"));
  const message = validateMessage(readOption("--message"));
  const workspace = validateWorkspace(readOption("--workspace"));
  const branch = currentBranch(workspace);

  if (!branch.startsWith(`relay/${student}-`)) {
    fail(`Branch ${branch} gehört nicht zum Pseudonym ${student}.`);
  }
  if (!output("git", ["status", "--porcelain"], workspace)) {
    fail("Es gibt keine Änderung zum Einreichen.");
  }

  console.log("1/4 Tests ausführen …");
  run("npm", ["test"], { cwd: workspace });

  console.log("2/4 Änderung speichern …");
  run("git", ["add", "-A"], { cwd: workspace });
  const staged = run("git", ["diff", "--cached", "--quiet"], {
    cwd: workspace,
    capture: true,
    allowFailure: true,
  });
  if (staged.status === 0) fail("Nach git add ist keine Änderung übrig.");
  if (staged.status !== 1) {
    const detail = (staged.stderr || staged.stdout || "").trim();
    fail(`Staging-Diff konnte nicht geprüft werden${detail ? `: ${detail}` : ""}`);
  }
  run(
    "git",
    [
      "-c",
      `user.name=Kurs-Relay (${student})`,
      "-c",
      `user.email=relay+${student}@users.noreply.github.com`,
      "commit",
      "-m",
      message,
    ],
    { cwd: workspace }
  );

  console.log("3/4 Eigenen Branch hochladen …");
  run("git", ["push", "--set-upstream", "origin", branch], { cwd: workspace });

  console.log("4/4 Pull Request öffnen …");
  const commit = output("git", ["rev-parse", "HEAD"], workspace);
  const prResult = run(
    "gh",
    [
      "pr",
      "create",
      "--repo",
      repository,
      "--base",
      "main",
      "--head",
      branch,
      "--title",
      `Schüler-Relay: ${message}`,
      "--body",
      [
        "Unter-13-Kurspilot über die kontrollierte Lehrer-Relay-Identität.",
        "",
        `Pseudonym: ${student}`,
        `Branch: ${branch}`,
        "Tests vor dem Push: npm test (grün)",
        "",
        "Keine Schüler-Credentials wurden verwendet.",
      ].join("\n"),
    ],
    { cwd: workspace, capture: true }
  );
  const prUrl = prResult.stdout.trim().split(/\s+/).at(-1);
  if (!/^https:\/\/github\.com\/alexdermohr\/vibe-coding-kurs-starter\/pull\/\d+$/.test(prUrl || "")) {
    fail("GitHub hat keine erwartete Pull-Request-URL zurückgegeben.");
  }

  mkdirSync(receiptRoot, { recursive: true });
  const receipt = {
    schema_version: 1,
    student,
    branch,
    commit,
    pr_url: prUrl,
    tests: "npm test: pass",
    created_at: new Date().toISOString(),
  };
  const receiptPath = join(receiptRoot, `${branch.replaceAll("/", "_")}.json`);
  writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + "\n", { mode: 0o600 });
  console.log(JSON.stringify({ ...receipt, receipt: receiptPath }, null, 2));
}

function cleanup() {
  const workspace = validateWorkspace(readOption("--workspace"));
  const branch = currentBranch(workspace);
  if (output("git", ["status", "--porcelain"], workspace)) {
    fail("Workspace ist nicht sauber; Cleanup wird verweigert.");
  }
  run("git", ["worktree", "remove", workspace], { cwd: repoRoot });
  run("git", ["branch", "-D", branch], { cwd: repoRoot });
  console.log(`Lokaler Worktree und Branch entfernt: ${workspace} (${branch})`);
}

const command = process.argv[2];
if (command === "prepare") prepare();
else if (command === "preview") preview();
else if (command === "submit") submit();
else if (command === "cleanup") cleanup();
else {
  console.log(`Kurs-Relay\n\nprepare --student <pseudonym>\npreview --workspace <pfad>\nsubmit --student <pseudonym> --workspace <pfad> --message <committext>\ncleanup --workspace <pfad>`);
  if (command && !["--help", "-h"].includes(command)) process.exitCode = 1;
}
