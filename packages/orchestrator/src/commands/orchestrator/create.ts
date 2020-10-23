/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from 'path';
import {Command, CLIError, flags} from '@microsoft/bf-cli-command';
import {Orchestrator, OrchestratorHelper, Utility} from '@microsoft/bf-orchestrator';
import {OrchestratorSettings} from '../../utils/settings';

export default class OrchestratorCreate extends Command {
  static description: string = 'Creates Orchestrator example file from .lu/.qna files, which represent bot modules';

  static examples: Array<string> = [`
    $ bf orchestrator:create 
    $ bf orchestrator:create --in ./path/to/file/
    $ bf orchestrator:create --in ./path/to/file/ --out ./path/to/output/
    $ bf orchestrator:create --in ./path/to/file/ --out ./path/to/output/ --model ./path/to/model/directory`]

  static flags: flags.Input<any> = {
    in: flags.string({char: 'i', description: 'The path to source label files from where orchestrator example file will be created from. Default to current working directory.'}),
    out: flags.string({char: 'o', description: 'Path where generated orchestrator snapshot file will be placed. Default to current working directory.'}),
    model: flags.string({char: 'm', description: 'Path to Orchestrator base model directory.'}),
    hierarchical: flags.boolean({description: 'Add hierarchical labels based on lu/qna file name.'}),
    fullEmbeddings: flags.boolean({description: 'Use full embeddings.'}),
    force: flags.boolean({char: 'f', description: 'If --out flag is provided with the path to an existing file, overwrites that file.', default: false}),
    debug: flags.boolean({char: 'd'}),
    help: flags.help({char: 'h', description: 'Orchestrator create command help'}),
  }

  async run(): Promise<number> {
    const {flags}: flags.Output = this.parse(OrchestratorCreate);
    const cwd: string = process.cwd();
    const input: string = path.resolve(flags.in || cwd);
    const output: string = path.resolve(flags.out || cwd);
    const baseModelPath: string = flags.model;

    Utility.toPrintDebuggingLogToConsole = flags.debug;
    Utility.debuggingLog(`inputPathConfiguration=${input}`);
    Utility.debuggingLog(`outputPath=${output}`);

    try {
      OrchestratorSettings.init(cwd, baseModelPath, output, cwd);
      const retPayload: any = await Orchestrator.createAsync(
        OrchestratorSettings.ModelPath,
        OrchestratorHelper.getLuInputs(input),
        flags.hierarchical,
        flags.fullEmbeddings);
      OrchestratorSettings.persist();
    } catch (error) {
      throw (new CLIError(error));
    }

    /*
    OrchestratorHelper.writeCreateOutputFile(output, retPayload);
    const settingsFile: string = path.join(output, 'orchestrator.settings.json');
    OrchestratorHelper.writeToFile(settingsFile, JSON.stringify(retPayload.settings, null, 2));
    this.log(`orchestrator.settings.json is written to ${settingsFile}`);

    const outPath: string = OrchestratorHelper.getOutputPath(outputPath, inputPathConfiguration);
    const resolvedFilePath: string = OrchestratorHelper.writeToFile(outPath, snapshot);
    if (Utility.isEmptyString(resolvedFilePath)) {
      Utility.writeToConsole(`ERROR: failed writing the snapshot to file ${resolvedFilePath}`);
    } else {
      Utility.writeToConsole(`Snapshot written to ${resolvedFilePath}`);
    }
    */
    return 0;
  }
}
