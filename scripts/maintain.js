const fetch = require("node-fetch")
const { readFileSync, writeFileSync } = require("fs")

const puppeteer = require("puppeteer")

const members = JSON.parse(
    readFileSync("../members.json", { encoding: "utf8" })
)
let activeMembers = []

const webringLink = "https://webring.hackclub.com/"

async function checkWithBrowser(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url)

    let containsLink = false

    if ((await page.content()).replace(/\s/g, "").includes(webringLink))
        containsLink = true

    await browser.close()

    return containsLink
}

async function main() {
    for (const approvedMember of members) {
        console.debug(`Trying ${approvedMember.member}`)
        try {
            const response = await fetch(approvedMember.url)
            if (!response.ok) throw "Unreachable page"

            if (approvedMember.bypass) {
                console.debug(
                    `${approvedMember.member}'s page is marked with \`"bypass": true\``
                )
                activeMembers.push(approvedMember)
                continue
            }

            const data = await response.text()
            const strippedHTML = data.replace(/\s/g, "")

            if (strippedHTML.includes(webringLink)) {
                activeMembers.push(approvedMember)
            } else {
                // some sites might use plain react, which means we need to
                // actually open the page in a browser and then search the
                // rendered HTML from the browser
                console.debug(
                    `${approvedMember.member}'s page didn't contain the code in the HTML, but let's render it in the browser to be sure it's not there.`
                )
                if (await checkWithBrowser(approvedMember.url)) {
                    activeMembers.push(approvedMember)
                } else {
                    throw "Page doesn't contain webring code"
                }
            }
        } catch (e) {
            console.log(`${approvedMember.member} was rejected. Reason:`)
            console.log(e)
        }
    }

    writeFileSync("../public/members.json", JSON.stringify(activeMembers))
}

main()
