/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// import assert = require('assert');

import * as path from 'path';
import * as fs from 'fs';

import {} from 'mocha';

import {OrchestratorEvaluate} from '../src/evaluate';
import {Utility} from '../src/utility';
import {UnitTestHelper} from './utility.test';

describe('Test Suite - evaluate', () => {
  it('Test.0000 OrchestratorEvaluate.runAsync()', async function () {
    Utility.toPrintDebuggingLogToConsole = UnitTestHelper.getDefaultUnitTestDebuggingLogFlag();
    this.timeout(UnitTestHelper.getDefaultUnitTestTimeout());
    Utility.debuggingLog(`process.cwd()=${process.cwd()}`);
    const inputPath: string = './resources/data/Columnar/Email.blu';
    const outputPath: string = './resources/data/Columnar/OrchestratorEvaluate_Email';
    const nlrPath: string = '';
    const ambiguousClosenessParameter: number = Utility.DefaultAmbiguousClosenessParameter;
    const lowConfidenceScoreThresholdParameter: number = Utility.DefaultLowConfidenceScoreThresholdParameter;
    const multiLabelPredictionThresholdParameter: number = Utility.DefaultMultiLabelPredictionThresholdParameter;
    const unknownLabelPredictionThresholdParameter: number = Utility.DefaultUnknownLabelPredictionThresholdParameter;
    const trainingSetScoreOutputFile: string = path.join(outputPath, 'orchestrator_training_set_scores.txt');
    const trainingSetSummaryOutputFile: string = path.join(outputPath, 'orchestrator_training_set_summary.html');
    const labelsOutputFilename: string = path.join(outputPath, 'orchestrator_labels.txt');
    await OrchestratorEvaluate.runAsync(
      inputPath,
      outputPath,
      nlrPath,
      ambiguousClosenessParameter,
      lowConfidenceScoreThresholdParameter,
      multiLabelPredictionThresholdParameter,
      unknownLabelPredictionThresholdParameter);
    const toCleanUpAfterUnitTest: boolean = UnitTestHelper.getDefaultUnitTestCleanUpFlag();
    if (toCleanUpAfterUnitTest) {
      Utility.deleteFile(trainingSetScoreOutputFile);
      Utility.deleteFile(trainingSetSummaryOutputFile);
      Utility.deleteFile(labelsOutputFilename);
      fs.rmdirSync(outputPath);
    }
  });
});

