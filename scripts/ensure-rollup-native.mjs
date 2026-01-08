import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { arch, platform, report } from 'node:process';

const isMusl = () => {
  try {
    return !report.getReport().header.glibcVersionRuntime;
  } catch {
    return false;
  }
};

const isLinuxX64 = platform === 'linux' && arch === 'x64';
if (!isLinuxX64) {
  process.exit(0);
}

const pkg = isMusl() ? '@rollup/rollup-linux-x64-musl' : '@rollup/rollup-linux-x64-gnu';
const require = createRequire(import.meta.url);

try {
  require.resolve(pkg);
  process.exit(0);
} catch {
  // Fall through to install.
}

execSync(`npm install --no-save --ignore-scripts ${pkg}`, {
  stdio: 'inherit',
  env: {
    ...process.env,
    npm_config_ignore_scripts: '1',
    npm_config_audit: 'false',
    npm_config_fund: 'false',
  },
});
