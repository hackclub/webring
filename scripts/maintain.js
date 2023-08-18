import fetch from "node-fetch"
import chalk from "chalk"
import puppeteer from "puppeteer"

import { readFileSync, writeFileSync } from "fs"

const members = JSON.parse(
    readFileSync("../members.json", { encoding: "utf8" })
)

let activeMembers = []

const webringLink = "https://webring.hackclub.com"

async function checkWithBrowser(url, webringLink) {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()

    await page.goto(url)

    let content = await page.content()

    content = content.replace(/<!--[\s\S]*?-->/g, "")

    writeFileSync("test.html", content)

    const containsLink = content.replace(/\s/g, "").includes(webringLink)

    await browser.close()

    return containsLink
}

async function main() {
    // sort the members by their name alphabetically
    // members.sort((a, b) => {
    //     if (a.member < b.member) return -1
    //     if (a.member > b.member) return 1
    //     return 0
    // })

    let counter = 1

    for (const approvedMember of members) {
        console.debug(
            `(${chalk.blue(
                `${counter}/${members.length}`
            )}) Trying ${chalk.bold(`${approvedMember.member}`)}`
        )

        counter += 1

        try {
            const response = await fetch(approvedMember.url)
            if (!response.ok) throw "Unreachable page"

            if (approvedMember.bypass) {
                console.log(
                    chalk.green(
                        ` - ${chalk.bold(
                            `${approvedMember.member}'s`
                        )} page is marked with \`"bypass": true\``
                    )
                )

                activeMembers.push(approvedMember)

                continue
            }

            const data = await response.text()
            let strippedHTML = data.replace(/\s/g, "")

            strippedHTML = strippedHTML.replace(/<!--[\s\S]*?-->/g, "")

            if (strippedHTML.includes(webringLink)) {
                console.log(
                    chalk.green(
                        ` - ${chalk.bold(
                            `${approvedMember.member}'s`
                        )} page is active`
                    )
                )

                activeMembers.push(approvedMember)
            } else {
                // some sites might use plain react, which means we need to
                // actually open the page in a browser and then search the
                // rendered HTML from the browser

                console.warn(
                    chalk.yellow(
                        ` - ${chalk.bold(
                            `${approvedMember.member}'s`
                        )} page didn't contain the code in the HTML, but let's render it in the browser to be sure it's not there.`
                    )
                )

                if (await checkWithBrowser(approvedMember.url)) {
                    console.log(
                        chalk.green(
                            ` - ${chalk.bold(
                                `${approvedMember.member}'s`
                            )} page is active`
                        )
                    )

                    activeMembers.push(approvedMember)
                } else {
                    throw "Page doesn't contain webring code"
                }
            }
        } catch (e) {
            console.error(
                chalk.red(
                    ` - ${chalk.bold(
                        `${approvedMember.member}`
                    )} was rejected. Reason:`
                )
            )

            console.error(chalk.red(`   - ${e}`))
        }
    }

    writeFileSync("../public/members.json", JSON.stringify(activeMembers))
}

main()

// checkWithBrowser("https://iunstable0.com", webringLink).then(console.log)
