import * as core from "@actions/core";
import * as cache from "@actions/cache";
import * as github from "@actions/github";
import fs from "fs";

// const fs = require('fs').promises;

import { Inputs, Outputs, OutputName, LastStatusPath, DateNowPath} from "./constants";
// import { dateNow } from "./utils";
// import * as utils from "./utils/actionUtils";


async function run(): Promise<void> {
    try {
        const uniqueKey = core.getInput(Inputs.Key) || "default_key";
        const dateNow = (new Date()).toISOString();
        await fs.promises.writeFile(DateNowPath , (new Date()).toISOString());
        await fs.promises.writeFile(LastStatusPath , `::set-output name=${OutputName}::default`);
        const paths = [ LastStatusPath ];
        const primaryKey = `${github.context.runId}-${uniqueKey}-${dateNow}`;
        const restoreKeys = [ `${github.context.runId}-${uniqueKey}` ];
        const cacheKey = await cache.restoreCache(
            paths, 
            primaryKey,
            restoreKeys);
        // core.saveState
        const LastRunStatus = await fs.promises.readFile(LastStatusPath);
        console.log(`LastRunStatus = ${LastRunStatus}`);
        console.log(`cacheKey = ${cacheKey}`);
        console.log(`primaryKey = ${primaryKey}`);
        // if (primaryKey === cacheKey){
        //     core.setOutput(Outputs.LastRunStatus, );
        // }
        core.setOutput(Outputs.LastRunStatus, "HEY output");
  
    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();

export default run;