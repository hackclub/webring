const fetch = require('node-fetch')
const { readFileSync, writeFileSync } = require('fs')

const members = JSON.parse(readFileSync('../members.json', { encoding: "utf8" }))
let activeMembers = []

const webringLink = "https://webring.hackclub.com/"

async function main () {
    for (const approvedMember of members) {
        try {
            const response = await fetch(approvedMember.url)
            if (!response.ok) throw "Unreachable page"

            const data = await response.text()
            const strippedHTML = data.replace(/\s/g, '')

            if (strippedHTML.includes(webringLink)) {
                activeMembers.push(approvedMember)
            } else if (approvedMember.url == "https://rishi.cx/") {
                activeMembers.push(approvedMember)
            } else {
                throw "Page doesn't contain webring code"
            }
        } catch (e) {
            console.log(`${approvedMember.member} was rejected. Reason:`)
            console.log(e)
        }
    }

    writeFileSync('../public/members.json', JSON.stringify(activeMembers))
}

main()
