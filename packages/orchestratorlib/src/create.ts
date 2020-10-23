/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from 'path';

import {Label} from './label';
import {LabelResolver} from './labelresolver';
import {OrchestratorHelper} from './orchestratorhelper';
import {UtilityLabelResolver} from './utilitylabelresolver';
import {Utility} from './utility';

export class OrchestratorCreate {
  // eslint-disable-next-line max-params
  public static async runAsync(
    baseModelPath: string,
    inputs: any[],
    hierarchical: boolean = false,
    fullEmbeddings: boolean = false): Promise<any> {
    Utility.debuggingLog(`baseModelPath=${baseModelPath}`);
    Utility.debuggingLog(`hierarchical=${hierarchical}`);
    Utility.debuggingLog(`fullEmbeddings=${fullEmbeddings}`);
    if (!baseModelPath || baseModelPath.length === 0) {
      throw new Error('Please provide path to Orchestrator model');
    }
    
    baseModelPath = path.resolve(baseModelPath);
    
    Utility.debuggingLog('OrchestratorCreate.runAsync(), ready to call LabelResolver.createAsync()');
    await LabelResolver.createAsync(baseModelPath);
    Utility.debuggingLog('OrchestratorCreate.runAsync(), after calling LabelResolver.createAsync()');
    UtilityLabelResolver.resetLabelResolverSettingUseCompactEmbeddings(fullEmbeddings);
    const processedUtteranceLabelsMap: {
      'utteranceLabelsMap': Map<string, Set<string>>;
      'utteranceLabelDuplicateMap': Map<string, Set<string>>;
      'utteranceEntityLabelsMap': Map<string, Label[]>;
      'utteranceEntityLabelDuplicateMap': Map<string, Label[]>; } =
      await OrchestratorHelper.getUtteranceLabelsMap(inputPathConfiguration, hierarchical);
    LabelResolver.addExamples(processedUtteranceLabelsMap);

    const snapshot: any = LabelResolver.createSnapshot();
  }
}
