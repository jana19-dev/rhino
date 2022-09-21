import { json } from '@sveltejs/kit'
// import fs from 'fs'

import { chromium } from 'playwright'

export async function GET() {
	// const browser = await playwright.chromium.launch()
	const userDataDir = 'data'

	const context = await chromium.launchPersistentContext(userDataDir, {
		headless: false
	})

	const page = await context.newPage()

	// const cookiesString = fs.readFileSync('storageState.json')
	// const cookies = JSON.parse(cookiesString)
	// await page.context().addCookies(cookies.cookies)
	await page.goto('https://rbaccess.rogersbank.com/?product=ROGERSBRAND')
	// await page.locator('input[name="email"]').fill('jana.stc@gmail.com')
	// await page.locator('input[name="password"]').fill('Rajakumar')
	// await page.locator('button, input[type="button"], input[type="submit"] >> text="Login"').click()

	const balance = await page.locator('.card-dtl-balance-info').innerText()

	await page.screenshot({ path: 'example.png' })

	// Save signed-in state to 'storageState.json'.
	// await page.context().storageState({ path: 'storageState.json' })

	// await context.close()
	return json({
		royal_bank: balance
	})
}
