import * as fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

export class Tools {
    public static readonly APP_TEMPLATE_RELATIVE_PATH: string = "/templates";
    public static readonly CLI_TEMPLATE_RELATIVE_PATH: string = "/src/templates";

    /**
     * Used by the getAppRootPath function to not rexecute the command shell if is already executed
     */
    private static appRootPath: string;

    /**
     * Get the cli root path
     */
    public static getCliRooPath(): string {
        return path.join(__dirname, '../../..');
    }

    public static getAppRootPath(): Promise<string> {
        return new Promise((resolve, reject) => {

            if (this.appRootPath) {
                resolve(this.appRootPath);
            } else {
                exec('npm prefix', (error, stdout: string, stderr: string) => {
                    if (error) {
                        reject(error);
                    }
                    stdout = stdout.replace('\n', '');
                    this.appRootPath = stdout;
                    resolve(stdout);
                });
            }
        });
    }

    /**
     * 
     * @param templateName the general template name to search in framework directory or cli directory
     * @param cliTemplateName the cli template name if is different of the general template name
     */
    public static async getTemplate(templateName: string, cliTemplateName?: string): Promise<string> {
        const appRootPath = await Tools.getAppRootPath();
        templateName = this.normalizeTemplate(templateName);

        let tmp = path.join(appRootPath, this.APP_TEMPLATE_RELATIVE_PATH, templateName);
        // if the developer as overrided the model template
        if (fs.existsSync(tmp)) {
            return tmp;
        } else { // use the built-in template
            const templateNameTolook = cliTemplateName ? this.normalizeTemplate(cliTemplateName) : templateName;
            let tmp = path.join(Tools.getCliRooPath(), this.CLI_TEMPLATE_RELATIVE_PATH, templateNameTolook);

            if (fs.existsSync(tmp)) {
                return tmp;
            }
        }

        throw new Error('No template');
    }

    private static normalizeTemplate(name: string) {
        // return path.extname(name) ? name : name + '.ts.twig';
        return name + '.ts.twig';
    }
}