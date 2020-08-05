/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {expect, test} from '@oclif/test';

describe('orchestrator:test', () => {
  test
  .stdout()
  .command(['orchestrator:test'])
  .it('Test.0000 orchestrator:test', (_ctx: any) => {
    // expect(ctx.stdout).to.contain('test');
  });

  test
  .stdout()
  .command(['orchestrator:test', '--help'])
  .it('Test.0001 orchestrator:test --help', (ctx: any) => {
    expect(ctx.stdout).to.contain('help');
  });

  // ---- NOTE-NEED-NLR ---- test
  // ---- NOTE-NEED-NLR ---- .stdout()
  // ---- NOTE-NEED-NLR ---- .command(['orchestrator:test', '--debug', '--in=resources/data/Columnar/Email.blu', '--test=resources/data/Columnar/EmailTest.txt', '--out=resources/data/Columnar/OrchestratorModelForTestCommand_Email'])
  // ---- NOTE-NEED-NLR ---- .it('Test.0002 orchestrator:test EmailTest.txt', (ctx: any) => {
  // ---- NOTE-NEED-NLR ----   expect(ctx.stdout).to.contain('Email');
  // ---- NOTE-NEED-NLR ---- });
});
