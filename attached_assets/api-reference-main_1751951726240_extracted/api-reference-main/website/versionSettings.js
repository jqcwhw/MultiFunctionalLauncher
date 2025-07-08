// @ts-check
import fs from "node:fs";

function getAvaloniaVerison (){
    try {
        const data = fs.readFileSync('./../AvaloniaVersion.txt', {encoding: 'utf8'});
        return data;
    }
    catch (e) {
        console.error(e);
    }
}

export const versionSettings = {
    current: getAvaloniaVerison(),
};