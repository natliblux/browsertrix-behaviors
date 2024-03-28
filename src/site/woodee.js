import { BackgroundBehavior } from "../lib/behavior";
import { awaitLoad, sleep, xpathNode, xpathString, RestoreState, waitUnit, waitUntil } from "../lib/utils";
import { behaviorLog, installBehaviors } from "../lib/utils";


// ===========================================================================
export class WoodeeFlipbookBehavior extends BackgroundBehavior {
	static isMatch() {
		return window.location.href.match(/https:\/\/.*woodee\.lu.*flipbook.*/);
	}

	static get name() {
		return "Woodee Flipbook";
	}

	constructor() {
		super();

		this._donePromise = new Promise((resolve) => this._flipDone = resolve);
	}


	async start() {
		await awaitLoad();

		const origLoc = window.location.href;

		this.log("[Test - " + origLoc + "] " + Date.now() + " Starting woodee behavior...");

		// Continue until there are no more pages to flip
		await this.flipAllPages();

		this.log("[Test - " + origLoc + "] " + Date.now() + " Finished woodee behavior.");

		// Done
		this._flipDone();
	}

	async flipAllPages() {
		const origLoc = window.location.href;

		// Get the total amount of pages in the flipbook on this page. This information is contained within the
		// element with the class 'page-num'. It has the form "Page x of y".
		this.maxPage = document.querySelector('span.page-num').textContent.split(" ")[4];

		var shouldContinue = true;
		while (shouldContinue) {
			// Save the current page number
			//const previousPage = document.querySelector('span.page-num').textContent.split(" ")[2];

			// Page flip
			let click = await document.querySelector('i.fa-angle-right').click();

			// Wait until the page has flipped, i.e., if the "current page" is different than the "previous page".
			//waitUntil(() => (parseInt(document.querySelector('span.page-num').textContent.split(" ")[2], 10) !== parseInt(previousPage, 10)), 75),
			await sleep(3000);
			window.focus();

			// Finally, check if we have reached the last page.
			shouldContinue = (parseInt(document.querySelector('span.page-num').textContent.split(" ")[2], 10) < parseInt(this.maxPage, 10));

			this.log("[Test - " + origLoc + "] " + Date.now() + " " + document.querySelector('span.page-num').textContent);
		}
	}


	done() {
		return this._donePromise;
	}

}
