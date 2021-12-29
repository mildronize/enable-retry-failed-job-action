import * as core from "@actions/core";
import * as cache from "@actions/cache";
import * as github from "@actions/github";
import fs from "fs";

// const fs = require('fs').promises;

import { Inputs, Outputs } from "./constants";
// import * as utils from "./utils/actionUtils";

const OutputName = "last_run_status";
const LastStatusPath = "last_run_status";

async function run(): Promise<void> {
    try {
        const uniqueKey = core.getInput(Inputs.Key) || "default_key";
        const dateNow = (new Date()).toISOString();
        const paths = [ LastStatusPath ];
        const primaryKey = `${github.context.runId}-${uniqueKey}-${dateNow}`;
        const cacheId  = await cache.saveCache(
            paths, 
            primaryKey);
        console.log(`cacheId = ${cacheId}`);
        console.log(`primaryKey = ${primaryKey}`);
        const LastRunStatus = await fs.promises.readFile(LastStatusPath);
        console.log(`LastRunStatus = ${LastRunStatus}`);
    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();

export default run;