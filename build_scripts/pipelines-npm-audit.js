// Usage: node pipelines-npm-audit [severities]
// Example: node pipelines-npm-audit moderate high critical

const exec = require('child_process').exec;

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const generateVulnerabilityMessage = (vulnerabilities, severity) => {
    var message = '';
    if (vulnerabilities[severity].length) {
        message += `\n${capitalize(severity)}: ${vulnerabilities[severity].length}`;
        vulnerabilities[severity].forEach(_ => {
            message += `\n- (${_.package}) | ${_.issue} | Patched in ${_.resolution} | (${_.dependency})`;
        });
    }
    return message;
};

const PACKAGE_COLUMN = 1;
const SEVERITY_COLUMN = 2;
const RESOLUTION_COLUMN = 3;
const ISSUE_COLUMN = 4;
const DEPENDENCY_COLUMN = 6;

const command = 'npm audit --parseable';
exec(command, (error, stdout) => {
    
    var vulnerabilities = {
        low: [],
        moderate: [],
        high: [],
        critical: []
    };

    const output = stdout.split('\n').map(_ => _.split('\t'));

    output.forEach(entry => {
        if (!vulnerabilities[entry[SEVERITY_COLUMN]])
            return;

        vulnerabilities[entry[SEVERITY_COLUMN]].push({
            package: entry[PACKAGE_COLUMN],
            resolution: entry[RESOLUTION_COLUMN],
            issue: entry[ISSUE_COLUMN],
            dependency: entry[DEPENDENCY_COLUMN]
        }); 
    });
        
    var warningMessage = generateVulnerabilityMessage(vulnerabilities, 'low') + generateVulnerabilityMessage(vulnerabilities, 'moderate');
    if (warningMessage)
        console.log(`##vso[task.logissue type=warning;]NPM Package Vulnerabilities:${warningMessage}`);

    var errorMessage = generateVulnerabilityMessage(vulnerabilities, 'high') + generateVulnerabilityMessage(vulnerabilities, 'critical');
    if (errorMessage)
        console.log(`##vso[task.logissue type=error;]NPM Package Vulnerabilities:${errorMessage}`);
});