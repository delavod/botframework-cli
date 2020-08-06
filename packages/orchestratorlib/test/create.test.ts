/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {LabelResolver} from '../src/labelresolver';
import {OrchestratorCreate} from '../src/create';
const sinon: any = require('sinon');

describe('OrchestratorCreate Tests', () => {
  beforeEach(() => {
    sinon.stub(LabelResolver, 'createAsync');
    sinon.stub(LabelResolver, 'addExamples');
    sinon.stub(LabelResolver, 'createSnapshot');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('runAsync', async () => {
    await OrchestratorCreate.runAsync(
      './fixtures/dispatch',
      './fixtures',
      './fixtures',
      true);
  });
});
